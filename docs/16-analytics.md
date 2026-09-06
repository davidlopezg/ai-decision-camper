# 16 · ANALYTICS

> **Estado:** DEFINITIVO para MVP.
> **Stack:** Plausible (tráfico web) + tabla `eventos` en Supabase (eventos custom).

---

## 1. Stack analytics MVP

| Herramienta | Función | Coste |
|---|---|---|
| **Plausible** (Cloud EU o self-host) | Tráfico web agregado, fuentes, páginas vistas | 0–9€/mes |
| **Supabase tabla `eventos`** | Eventos custom del funnel, retención, coste LLM | Incluido en free tier |
| **Dashboard interno** (fase 1) | Query a `eventos` para construir vistas | A construir |

> ❌ No usar Google Analytics 4 sin consent mode avanzado (cuesta RGPD).
> ❌ No usar Mixpanel/Amplitude en MVP (caros + RGPD complicado).

---

## 2. Eventos clave (mínimo MVP)

12 eventos que el chat client dispara:

| # | Evento | Cuándo | Metadata útil |
|---|---|---|---|
| 1 | `page_view` | Carga de página | url, referer |
| 2 | `chat_opened` | Primera vez que abre el chat | — |
| 3 | `assistant_started` | Primera pregunta enviada | session_id |
| 4 | `assistant_question` | Cada respuesta del usuario | numero_pregunta |
| 5 | `assistant_completed` | Última pregunta respondida | num_preguntas_totales |
| 6 | `assistant_abandoned` | Salida sin completar | num_preguntas_respondidas |
| 7 | `recommendation_viewed` | Resultados renderizados | num_candidatos |
| 8 | `product_detail_viewed` | Click en producto de la lista | producto_id |
| 9 | `affiliate_clicked` | Click en enlace afiliado | producto_id, programa |
| 10 | `lead_submitted` | CPL enviado | categoria, partner |
| 11 | `email_captured` | Email dejado | punto (landing|chat|lead) |
| 12 | `return_visit` | Sesión con cookie existente | — |

Eventos extra (recomendados):

| Evento | Cuándo | Para qué |
|---|---|---|
| `llm_call` | Cada llamada al LLM | Medir coste, latencia |
| `error_occurred` | Cualquier error | Detectar bugs |
| `cpl_prompt_shown` | Cuando se ofrece CPL | Medir conversión a lead |

---

## 3. Implementación técnica

### 3.1. Schema de la tabla `eventos`

Ya creada en el setup de Supabase (ver `26-integration-guide.md`):

```sql
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
```

### 3.2. Cliente JS

```javascript
// js/analytics.js
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';

const headers = {
  'apikey': SUPABASE_ANON_KEY,
  'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=minimal'
};

export async function track(evento, metadata = {}) {
  const payload = {
    session_id: getSessionId(),
    evento,
    metadata,
    user_agent: navigator.userAgent.substring(0, 200),
    referer: document.referrer?.substring(0, 200) || null
  };
  
  // Fire-and-forget; no bloquea la UI
  fetch(`${SUPABASE_URL}/rest/v1/eventos`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  }).catch(err => console.warn('Track error:', err));
}

function getSessionId() {
  const key = 'adc_session';
  let id = localStorage.getItem(key);
  if (!id) {
    id = 'sess_' + Math.random().toString(36).substring(2, 15);
    localStorage.setItem(key, id);
  }
  return id;
}
```

### 3.3. Uso en el chat

```javascript
// Al iniciar una conversación
track('assistant_started');

// Al completarla
track('assistant_completed', { num_preguntas: 7 });

// Al hacer click en afiliado
button.addEventListener('click', () => {
  track('affiliate_clicked', { producto_id: 'dometic-cfx3-55', programa: 'amazon' });
});
```

### 3.4. RGPD

Los eventos se almacenan con `session_id` anónimo (UUID random en `localStorage`). **No** se almacenan datos personales en la tabla `eventos` (nombre, email, etc. van en `leads` con consentimiento explícito).

Si el usuario borra cookies o pide derecho al olvido: se elimina su `session_id` de `eventos` y su fila de `leads`.

---

## 4. Métricas críticas

### 4.1. Acquisition

- Sesiones únicas / mes.
- Fuentes de tráfico (Plausible).
- CPC y CPA por canal paid (manual).
- **Visitantes cualificados** = aquellos con `assistant_started` o > 30s en página.

### 4.2. Engagement

- **Tasa inicio asistente** = `count(assistant_started)` / sesiones únicas.
- **Tasa finalización** = `count(assistant_completed)` / `count(assistant_started)`.
- **Preguntas respondidas** media (de `assistant_question`).
- **Tiempo medio** en el asistente (de timestamps).
- **Tasa de abandono por pregunta** = detectar en qué pregunta se van.

### 4.3. Commerce

- **CTR a afiliado** = `count(affiliate_clicked)` / `count(recommendation_viewed)`.
- **CVR comercio** = ventas / clics (datos del programa afiliado).
- **AOV** (datos del programa).
- **Comisión media**.
- **EPC** = total comisiones / total clics.

### 4.4. CPL

- **Leads generados / mes**.
- **Tasa de submission** = `count(lead_submitted)` / `count(assistant_completed)`.
- **CPL medio**.
- **Calidad del lead** (feedback del partner).

### 4.5. Retention

- **Return rate** = sesiones con `return_visit = true` / sesiones totales.
- **Email open rate** (MailerLite).
- **Repeat recommendations**.

### 4.6. Economía

- **Revenue / 1.000 visitantes cualificados** (métrica clave del brief).
- **Coste IA / visitante** = `sum(tokens_in + tokens_out) * precio_token / visitantes`.
- **CAC real vs plan**.
- **LTV real** a 30/90/180 días.

---

## 5. Queries SQL útiles

### Funnel completo de conversión

```sql
with funnel as (
  select 
    count(distinct session_id) filter (where evento = 'page_view') as visitantes,
    count(distinct session_id) filter (where evento = 'assistant_started') as iniziaron,
    count(distinct session_id) filter (where evento = 'assistant_completed') as completaron,
    count(distinct session_id) filter (where evento = 'recommendation_viewed') as vieron_reco,
    count(distinct session_id) filter (where evento = 'affiliate_clicked') as clicaron,
    count(distinct session_id) filter (where evento = 'lead_submitted') as leads,
    count(distinct session_id) filter (where evento = 'email_captured') as emails
  from eventos
  where created_at > now() - interval '30 days'
)
select 
  visitantes,
  iniziaron,
  round(100.0 * iniziaron / nullif(visitantes, 0), 1) as pct_inicio,
  completaron,
  round(100.0 * completaron / nullif(iniziaron, 0), 1) as pct_finalizacion,
  vieron_reco,
  round(100.0 * vieron_reco / nullif(completaron, 0), 1) as pct_vieron_reco,
  clicaron,
  round(100.0 * clicaron / nullif(vieron_reco, 0), 1) as pct_ctr,
  leads,
  emails
from funnel;
```

### Coste de IA por día

```sql
select 
  date_trunc('day', created_at) as dia,
  count(*) as num_llamadas,
  sum((metadata->>'tokens_in')::int + (metadata->>'tokens_out')::int) as tokens_totales,
  -- ajustar con precio real del proveedor
  sum(((metadata->>'tokens_in')::int + (metadata->>'tokens_out')::int) * 0.000003) as coste_usd
from eventos
where evento = 'llm_call'
  and created_at > now() - interval '30 days'
group by 1
order by 1 desc;
```

### Top productos por clicks

```sql
select 
  e.producto_id,
  p.nombre,
  count(*) as clicks,
  count(distinct e.session_id) as sesiones_unicas
from eventos e
left join productos p on p.id = e.producto_id
where e.evento = 'affiliate_clicked'
  and e.created_at > now() - interval '30 days'
group by e.producto_id, p.nombre
order by clicks desc
limit 20;
```

### Productos más vistos pero menos clicados (gap de conversión)

```sql
with vistos as (
  select producto_id, count(*) as num_vistas
  from eventos
  where evento = 'product_detail_viewed'
    and created_at > now() - interval '30 days'
  group by producto_id
),
clicados as (
  select producto_id, count(*) as num_clics
  from eventos
  where evento = 'affiliate_clicked'
    and created_at > now() - interval '30 days'
  group by producto_id
)
select 
  v.producto_id,
  p.nombre,
  v.num_vistas,
  coalesce(c.num_clics, 0) as num_clics,
  round(100.0 * coalesce(c.num_clics, 0) / v.num_vistas, 1) as conversion_pct
from vistos v
left join clicados c using (producto_id)
left join productos p on p.id = v.producto_id
where v.num_vistas >= 10
order by conversion_pct asc;
```

---

## 6. Dashboard semanal (MVP)

Un simple HTML que ejecuta las queries SQL anteriores y las muestra en tablas:

```html
<!-- /admin/dashboard.html (proteger con auth básico) -->
<script type="module">
  import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../js/config.js';
  
  const query = `
    [pegar la query del funnel aquí]
  `;
  
  const r = await fetch(`${SUPABASE_URL}/rest/v1/rpc/ejecutar_sql`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_SERVICE_KEY, // ⚠️ service_role solo aquí
      'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  });
  
  // Renderizar resultados
</script>
```

**Para MVP, basta con revisar manualmente las queries desde el SQL Editor de Supabase** una vez a la semana.

---

## 7. Alertas y revisiones

| Frecuencia | Acción |
|---|---|
| Diaria | Revisar CTR y finalización del día. |
| Semanal | Dashboard + notas + experimento a iterar. |
| Mensual | Revisar unit economics vs hipótesis. Actualizar `24-assumptions-log.md`. |
| Trimestral | Decisión go/no-go + ajustar roadmap. |

---

## 8. Pendiente

- [x] Schema de eventos definido.
- [ ] Wrapper `analytics.js`.
- [ ] Disparar los 12 eventos clave.
- [ ] Dashboard semanal automático (fase 1).
- [ ] Configurar Plausible.
