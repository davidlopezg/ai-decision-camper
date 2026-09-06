# 26 · GUÍA DE INTEGRACIÓN — Setup concreto del MVP

> **Estado:** DEFINITIVO para MVP.
> **Audiencia:** promotor + desarrollador que adaptará el chat client.
> **Tiempo estimado de setup:** 1–2 días. **Coste:** 0€.

---

## 1. Resumen del stack

```
┌──────────────────────────────────────────┐
│  GitHub Pages (chat client adaptado)    │
│  /system-prompts/asesor-camper.md       │
│  /knowledge/productos/*.md              │
└──────────────────────────────────────────┘
              ↓ REST
┌──────────────────────────────────────────┐
│  Supabase                               │
│  - productos (catálogo)                 │
│  - leads (CPL)                          │
│  - eventos (analytics)                  │
└──────────────────────────────────────────┘
              ↓ API directa
┌──────────────────────────────────────────┐
│  LLM (MiniMax u otro proveedor)         │
└──────────────────────────────────────────┘
```

---

## 2. Setup Supabase (15–30 minutos)

### 2.1. Crear proyecto

1. Ir a https://supabase.com → Sign up.
2. New project:
   - Name: `ai-decision-camper`
   - Database password: (guardar bien, no se puede recuperar)
   - Region: **West EU (Ireland)** o **Central EU (Frankfurt)** para RGPD.
3. Esperar ~2 minutos a que se aprovisione.

### 2.2. Ejecutar schema SQL

1. SQL Editor (icono en sidebar).
2. New query.
3. Pegar este SQL completo:

```sql
-- ============================================
-- TABLA 1: productos
-- ============================================
create table productos (
  id text primary key,
  nombre text not null,
  marca text not null,
  modelo text not null,
  categoria text not null,
  precio numeric not null,
  precio_anterior numeric,
  comision_pct numeric not null default 0,
  url_afiliada text not null,
  url_producto text not null,
  programa text not null,
  disponible boolean not null default true,
  vehiculos_compatibles text[] default '{}',
  capacidad_litros numeric,
  potencia_w numeric,
  capacidad_ah numeric,
  peso_kg numeric,
  dimensiones_cm text,
  descripcion_md_path text,
  tags text[] default '{}',
  nivel_usuario text default 'principiante',
  fecha_actualizacion timestamptz default now(),
  fuente text
);

create index idx_productos_categoria on productos(categoria);
create index idx_productos_precio on productos(precio);
create index idx_productos_tags on productos using gin(tags);
create index idx_productos_vehiculos on productos using gin(vehiculos_compatibles);

-- ============================================
-- TABLA 2: leads (CPL)
-- ============================================
create table leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  nombre text,
  email text not null,
  telefono text,
  codigo_postal text,
  provincia text,
  vehiculo_tipo text,
  presupuesto_estimado numeric,
  categoria_interes text,
  mensaje text,
  consentimiento_rgpd boolean not null,
  consentimiento_marketing boolean default false,
  session_id text,
  productos_vistos text[] default '{}',
  partner_asignado text,
  estado text default 'nuevo',
  valor_cpl numeric
);

create index idx_leads_estado on leads(estado);
create index idx_leads_created on leads(created_at desc);

-- ============================================
-- TABLA 3: eventos (analytics)
-- ============================================
create table eventos (
  id bigserial primary key,
  created_at timestamptz default now(),
  session_id text not null,
  evento text not null,
  categoria text,
  producto_id text,
  metadata jsonb default '{}'::jsonb,
  user_agent text,
  referer text
);

create index idx_eventos_session on eventos(session_id);
create index idx_eventos_tipo on eventos(evento);
create index idx_eventos_created on eventos(created_at desc);

-- ============================================
-- VISTA ÚTIL: productos populares por clicks
-- ============================================
create view productos_populares as
  select producto_id, count(*) as clicks
  from eventos
  where evento = 'affiliate_clicked'
    and created_at > now() - interval '30 days'
  group by producto_id
  order by clicks desc;

-- ============================================
-- RLS: Row Level Security (RGPD)
-- ============================================
alter table productos enable row level security;
alter table leads enable row level security;
alter table eventos enable row level security;

-- Productos: lectura pública
create policy "productos read" on productos
  for select using (true);

-- Leads: insert solo si consentimiento_rgpd = true
create policy "leads insert anonimo" on leads
  for insert with check (consentimiento_rgpd = true);

-- Eventos: insert libre
create policy "eventos insert anonimo" on eventos
  for insert with check (true);
```

4. Click "Run".

### 2.3. Obtener claves

1. Settings → API.
2. Copiar:
   - `Project URL` → `SUPABASE_URL`
   - `anon public` key → `SUPABASE_ANON_KEY` (es pública, puede ir en el cliente)
   - `service_role` key → `SUPABASE_SERVICE_KEY` (**NUNCA** exponer al cliente, solo para backend / scripts de admin)

---

## 3. Adaptar el chat client (1–2 horas)

### 3.1. Estructura del repo

```
.
├── index.html              ← landing
├── chat.html               ← chat propiamente
├── js/
│   ├── chat.js             ← lógica principal
│   ├── supabase.js         ← wrapper de Supabase
│   └── llm.js              ← wrapper del LLM
├── css/
│   └── styles.css
├── system-prompts/
│   └── asesor-camper.md
└── knowledge/
    └── productos/
        ├── dometic-cfx3-55.md
        ├── victron-bluesolar-100w.md
        └── varta-dual-purpose-agm-95ah.md
```

### 3.2. Código de ejemplo: `js/llm.js`

```javascript
// Configuración — la API key va aquí SOLO en MVP
const LLM_API_KEY = import.meta.env.VITE_LLM_API_KEY; // inyectado en build
const LLM_ENDPOINT = 'https://api.minimaxi.com/v1/text/chatcompletion_v2'; // ajustar según proveedor

export async function llamarLLM(mensajes, opts = {}) {
  const response = await fetch(LLM_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${LLM_API_KEY}`
    },
    body: JSON.stringify({
      model: opts.modelo || 'MiniMax-Text-01',
      messages,
      temperature: opts.temperatura ?? 0.4,
      max_tokens: opts.maxTokens ?? 1500
    })
  });
  
  if (!response.ok) {
    throw new Error(`LLM error: ${response.status}`);
  }
  
  const data = await response.json();
  return data.choices[0].message.content;
}
```

### 3.3. Código de ejemplo: `js/supabase.js`

```javascript
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const headers = {
  'apikey': SUPABASE_ANON_KEY,
  'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json'
};

export async function buscarProductos(filtros) {
  const params = new URLSearchParams();
  
  if (filtros.precioMax) params.append('precio', `lte.${filtros.precioMax}`);
  if (filtros.categorias?.length) params.append('categoria', `in.(${filtros.categorias.join(',')})`);
  if (filtros.vehiculo) params.append('vehiculos_compatibles', `cs.{${filtros.vehiculo}}`);
  params.append('disponible', 'eq.true');
  params.append('select', '*');
  params.append('limit', '20');
  
  const r = await fetch(`${SUPABASE_URL}/rest/v1/productos?${params}`, { headers });
  return r.json();
}

export async function guardarLead(lead) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
    method: 'POST',
    headers: { ...headers, 'Prefer': 'return=minimal' },
    body: JSON.stringify(lead)
  });
  return r.ok;
}

export async function registrarEvento(evento) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/eventos`, {
    method: 'POST',
    headers: { ...headers, 'Prefer': 'return=minimal' },
    body: JSON.stringify(evento)
  });
  return r.ok;
}
```

### 3.4. Código de ejemplo: `js/chat.js` (núcleo)

```javascript
import { llamarLLM } from './llm.js';
import { buscarProductos, registrarEvento } from './supabase.js';

const sessionId = getOrCreateSessionId();

async function cargarSystemPrompt() {
  return await fetch('/system-prompts/asesor-camper.md').then(r => r.text());
}

async function parsearRequisitos(pregunta, systemPrompt) {
  const prompt = systemPrompt + '\n\nResponde SOLO con un JSON válido con esta estructura:\n' +
    '{ "vehiculo": "furgoneta|coche|otro", "presupuesto_min": number, "presupuesto_max": number, "prioridades": ["nevera","placa","bateria",...], "restricciones": ["no_obra","sin_gas",...] }';
  
  const respuesta = await llamarLLM([
    { role: 'system', content: prompt },
    { role: 'user', content: pregunta }
  ], { temperatura: 0.2 });
  
  // Limpiar markdown si el LLM lo añade
  const limpio = respuesta.replace(/```json|```/g, '').trim();
  return JSON.parse(limpio);
}

async function cargarContextoProducto(productoId) {
  try {
    return await fetch(`/knowledge/productos/${productoId}.md`).then(r => r.text());
  } catch {
    return `[Sin descripción detallada disponible para ${productoId}]`;
  }
}

async function generarRecomendacion(pregunta, requisitos, candidatos, systemPrompt) {
  const contextos = await Promise.all(
    candidatos.slice(0, 5).map(async p => ({
      ...p,
      contexto: await cargarContextoProducto(p.id)
    }))
  );
  
  const contextoTexto = contextos.map(c => `
### ${c.nombre} (${c.precio}€)
${c.contexto}
`).join('\n');
  
  const mensajeUsuario = `
PREGUNTA ORIGINAL DEL USUARIO: "${pregunta}"

REQUISITOS EXTRAÍDOS:
${JSON.stringify(requisitos, null, 2)}

PRODUCTOS CANDIDATOS (tras filtros hard):
${contextoTexto}

Genera la recomendación siguiendo el formato definido en el system prompt.
Responde en español peninsular.
`;
  
  return await llamarLLM([
    { role: 'system', content: systemPrompt },
    { role: 'user', content: mensajeUsuario }
  ], { temperatura: 0.5, maxTokens: 2000 });
}

export async function manejarPreguntaUsuario(pregunta) {
  await registrarEvento({
    session_id: sessionId,
    evento: 'assistant_started',
    user_agent: navigator.userAgent,
    referer: document.referrer
  });
  
  const systemPrompt = await cargarSystemPrompt();
  
  // PASO 1: parsear
  const requisitos = await parsearRequisitos(pregunta, systemPrompt);
  
  // PASO 2: hard filters
  const candidatos = await buscarProductos({
    precioMax: requisitos.presupuesto_max,
    categorias: requisitos.prioridades,
    vehiculo: requisitos.vehiculo
  });
  
  await registrarEvento({
    session_id: sessionId,
    evento: 'recommendation_viewed',
    metadata: { num_candidatos: candidatos.length }
  });
  
  // PASO 3: explicación con contexto
  const respuesta = await generarRecomendacion(pregunta, requisitos, candidatos, systemPrompt);
  
  return {
    texto: respuesta,
    candidatos,
    sessionId
  };
}

function getOrCreateSessionId() {
  const key = 'adc_session';
  let id = localStorage.getItem(key);
  if (!id) {
    id = 'sess_' + crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}
```

### 3.5. Renderizar la respuesta con CTAs

```javascript
async function renderizarRespuesta(resultado, contenedor) {
  const { texto, candidatos, sessionId } = resultado;
  
  // 1. Convertir markdown básico a HTML
  contenedor.innerHTML = markdownToHtml(texto);
  
  // 2. Añadir botones de afiliado debajo
  const ctas = document.createElement('div');
  ctas.className = 'cta-afiliados';
  ctas.innerHTML = `
    <h3>Productos mencionados</h3>
    ${candidatos.slice(0, 3).map(p => `
      <div class="cta-producto">
        <strong>${p.nombre}</strong> — ${p.precio}€
        <a href="${p.url_afiliada}" 
           target="_blank" 
           rel="sponsored noopener"
           data-producto="${p.id}">
          Ver en ${p.programa}
        </a>
      </div>
    `).join('')}
    <p class="disclaimer-afiliacion">
      🔍 Estos enlaces son de afiliado. Si compras, recibimos una comisión sin que afecte al precio.
    </p>
  `;
  contenedor.appendChild(ctas);
  
  // 3. Tracking de clicks
  ctas.querySelectorAll('a[data-producto]').forEach(a => {
    a.addEventListener('click', () => {
      registrarEvento({
        session_id: sessionId,
        evento: 'affiliate_clicked',
        producto_id: a.dataset.producto
      });
    });
  });
}
```

---

## 4. Variables de entorno (`.env` local + GitHub Actions)

### 4.1. `.env` local (NO commitear)

```bash
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
VITE_LLM_API_KEY=sk-...
```

`.gitignore`:
```
.env
.env.local
.env.production
```

### 4.2. GitHub Actions para deploy

`.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Inject secrets as env
        run: |
          echo "VITE_SUPABASE_URL=${{ secrets.SUPABASE_URL }}" >> .env.production
          echo "VITE_SUPABASE_ANON_KEY=${{ secrets.SUPABASE_ANON_KEY }}" >> .env.production
          echo "VITE_LLM_API_KEY=${{ secrets.LLM_API_KEY }}" >> .env.production
      
      - name: Build
        run: |
          npm install
          npm run build
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## 5. Seguridad de la API key

### 5.1. Configurar la API key del proveedor LLM

En el dashboard del proveedor:

- **Límite de gasto mensual:** 30€ (suficiente para MVP).
- **Rate limit:** 60 req/min.
- **Restricción por dominio (si el proveedor lo soporta):** tu GitHub Pages URL.
- **Alertas de uso:** configuradas para notificar al 50% y 80% del límite.

### 5.2. .gitignore estricto

Verificar que `.env`, `.env.local` y similares nunca se commitean.

### 5.3. Rotación

Rotar la API key:
- Mensualmente como rutina.
- Inmediatamente ante cualquier sospecha de abuso.

---

## 6. RGPD — textos legales mínimos

Antes de publicar, tener listos y enlazados desde el footer:

- Aviso legal.
- Política de privacidad (incluye: tratamiento de datos por Supabase EU, proveedor LLM en US con SCC firmadas).
- Política de cookies.
- Disclaimer de afiliación.
- Disclaimer IA (recomendaciones generadas con asistencia de IA + verificación humana).

Ver `18-security-privacy.md` para detalle.

---

## 7. Checklist de lanzamiento

```
□ Supabase proyecto creado y SQL ejecutado
□ RLS activado y políticas creadas
□ SUPABASE_URL y SUPABASE_ANON_KEY configuradas
□ API key LLM creada con límite de gasto
□ .env configurado localmente
□ GitHub Actions configurado para deploy
□ .gitignore estricto verificado
□ /system-prompts/ y /knowledge/ en el repo
□ Chat client adaptado con las 3 piezas (llm, supabase, chat)
□ Landing con CTA al chat
□ Email opt-in conectado a MailerLite o Brevo
□ Banner de cookies (si hay cookies no esenciales)
□ Textos legales publicados (aviso, privacidad, cookies)
□ Disclaimer de afiliación visible
□ Disclaimer IA visible
□ Plausible instalado en el HTML
□ Eventos clave registrándose en Supabase
□ 5 preguntas de prueba contestadas correctamente
□ 1 usuario real fuera del círculo del promotor ha probado
□ Primer experimento 1 diseñado
```

---

## 8. Primer experimento (resumen)

Una vez lanzado, **Experimento 1** (ver `25-validation-log.md`):

- Traer 500 visitantes en 30 días.
- Medir:
  - Tasa de inicio del asistente.
  - Tasa de finalización.
  - CTR a afiliado.
  - Emails capturados.
  - (Opcional) algún lead CPL si hay partner.

**Go/No-Go** tras 4 semanas con datos.

---

## 9. Troubleshooting común

| Síntoma | Causa probable | Solución |
|---|---|---|
| 401 desde Supabase | Key incorrecta o RLS bloqueando | Verificar `.env`, revisar policies |
| LLM responde en inglés | System prompt no se carga | Verificar ruta `/system-prompts/asesor-camper.md` |
| LLM alucina precios | System prompt débil | Reforzar "nunca inventes precios, lee del contexto" |
| Bundle JS expone la key | Variable no inyectada en build | Verificar GitHub Actions, no commitear `.env` |
| Eventos no se guardan | Falta `Consentimiento_rgpd = true` en leads (no en eventos) | Eventos van sin restricción |

---

## 10. Pendiente inmediato

- [ ] Crear cuenta Supabase.
- [ ] Crear cuenta MailerLite / Brevo.
- [ ] Verificar límite de gasto en API LLM.
- [ ] Adaptar el chat client con el código de arriba.
- [ ] Cargar 30 `.md` de productos (ya hay 3 ejemplos en `/knowledge/productos/`).
- [ ] Probar localmente.
- [ ] Deploy.
