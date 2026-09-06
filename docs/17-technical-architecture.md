# 17 · TECHNICAL ARCHITECTURE

> **Estado:** DEFINITIVO para MVP tras iteración con el promotor.
> **Última revisión:** tras decisiones D-006, D-011, D-012, D-013, D-014, D-015.
> **Principio:** stack mínimo viable que reutilice lo que ya existe.

---

## 1. Stack MVP (definitivo)

```
┌─────────────────────────────────────────────────┐
│                                                 │
│   LANDING + CHAT    → GitHub Pages              │
│                        (cliente del promotor     │
│                         adaptado)               │
│                                                 │
│   SYSTEM PROMPT     → /system-prompts/          │
│                        asesor-camper.md         │
│                                                 │
│   KNOWLEDGE         → /knowledge/productos/     │
│                        *.md (en el repo)        │
│                                                 │
│   BASE DE DATOS     → Supabase                  │
│                        (Postgres + REST + RLS)  │
│                                                 │
│   LLM               → API directa desde         │
│                        navegador (MVP)          │
│                        Cloudflare Worker (F1+)  │
│                                                 │
│   EMAIL             → MailerLite o Brevo        │
│   ANALYTICS         → Plausible                 │
│   TRACKING          → UTM en URLs               │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Componentes

| Capa | Tecnología | Por qué |
|---|---|---|
| Front | **GitHub Pages + chat client existente** | Ya existe, gratis, controlado |
| Catálogo (datos) | **Supabase (Postgres)** | REST API auto, RLS, MCP disponible para futuro |
| Catálogo (conocimiento) | **`.md` en el repo** | Editable, versionable, ideal para LLM |
| LLM | **API directa navegador** (MVP) | Velocidad, 0 código |
| Email | **MailerLite o Brevo** | RGPD, gratis hasta cierto volumen |
| Analytics | **Plausible** | RGPD, simple |

---

## 2. Por qué este stack y no otro (resumen de decisiones)

| Decisión | Motivo |
|---|---|
| **NO Shopify** | El modelo no es e-commerce directo. El asistente IA no cabe en Liquid. |
| **NO Next.js** | Ya hay chat client funcional. Next.js añade aprendizaje sin valor en MVP. |
| **NO Airtable** | MCP no oficial, escala limitada, sin RLS. |
| **NO n8n en MVP** | El chat client hace el trabajo directamente. n8n llega en fase 1+ si se necesita. |
| **NO MCP en MVP** | Para 30–50 productos, REST directo es más simple. MCP cuando crezca. |
| **SÍ Supabase** | Postgres serio, REST auto, RLS, free tier, MCP oficial para futuro. |
| **SÍ .md knowledge** | Idóneo para que el LLM "lea" conocimiento rico. |
| **SÍ browser-direct LLM** | Velocidad máxima en MVP; key restringida minimiza riesgo. |

> Ver `23-decisions-log.md` decisiones D-006, D-011–D-015 para detalle completo.

---

## 3. Arquitectura de datos

### 3.1. Modelo dual: estructurado (Supabase) + narrativo (.md)

```
┌─────────────────────────────────────────────────┐
│                                                 │
│   SUPABASE (datos que cambian)                  │
│   • precio                                      │
│   • stock / disponibilidad                      │
│   • URL afiliada                                │
│   • comisión                                    │
│   • categorías / tags                           │
│   • vehiculos_compatibles                       │
│   • leads (CPL)                                 │
│   • eventos (analytics)                         │
│                                                 │
│   ↓ El chat client QUERIES con hard filters     │
│                                                 │
│   .MD (conocimiento estable)                    │
│   • descripción rica                            │
│   • casos de uso                                │
│   • ventajas / inconvenientes                  │
│   • compatibilidades narrativas                 │
│   • reviews resumidas                           │
│   • instrucciones de instalación                │
│                                                 │
│   ↓ El chat client FETCHEA tras query           │
│                                                 │
│   LLM recibe:                                   │
│   - Requisitos parseados (JSON)                 │
│   - Productos candidatos (Supabase)             │
│   - Contexto narrativo (.md por producto)       │
│   - System prompt (.md del asesor)              │
│                                                 │
└─────────────────────────────────────────────────┘
```

### 3.2. Por qué `.md` y no Supabase Storage

- Editable en cualquier editor.
- Versionable con git.
- Diff-friendly (revisar cambios en PRs).
- El LLM los lee directamente sin pre-procesamiento.
- Búsqueda full-text nativa del repo si se necesita.

### 3.3. Esquema Supabase

Ver `26-integration-guide.md` para el SQL completo. 3 tablas:

- `productos` — catálogo con hard filters
- `leads` — CPL
- `eventos` — analytics básico

---

## 4. Flujo del chat (MVP)

```
1. Usuario pregunta algo
   ↓
2. Chat client envía al LLM con system prompt
   (parsing: "¿qué necesita el usuario?")
   ↓
3. LLM devuelve JSON estructurado
   { vehiculo, presupuesto_max, prioridades[], restricciones[] }
   ↓
4. Chat client query a Supabase REST
   WHERE precio <= presupuesto_max
   AND categoria IN (prioridades)
   AND vehiculos_compatibles @> [vehiculo]
   AND disponible = true
   ↓
5. Chat client fetch de .md para top 5 candidatos
   ↓
6. Chat client envía al LLM con:
   - System prompt (asesor-camper.md)
   - Requisitos JSON
   - Lista de productos con su .md context
   ↓
7. LLM genera respuesta estructurada
   (Te recomiendo / No recomiendo / Accesorio complementario)
   ↓
8. Chat client renderiza respuesta
   con botones de afiliado (Supabase tiene URL afiliada)
   + opt-in email (MailerLite)
   + evento affiliate_clicked → Supabase
```

---

## 5. Seguridad

### 5.1. API key del LLM (riesgo asumido)

En MVP, la API key viaja en el bundle JS de GitHub Pages. Mitigaciones inmediatas:

- API key con límite de gasto (30€/mes).
- Rate limit configurado.
- Key distinta de la de desarrollo.
- Inyectada en build time vía GitHub Actions con secret.
- Rotación mensual o ante sospecha de abuso.

### 5.2. Supabase RLS (Row Level Security)

Activado en todas las tablas:

- `productos`: lectura pública (`select` permitido a todos).
- `leads`: insert anónimo permitido **solo** si `consentimiento_rgpd = true`. Lectura solo con `service_role`.
- `eventos`: insert anónimo permitido. Lectura solo con `service_role`.

### 5.3. RGPD

Ver `18-security-privacy.md` para detalle. Lo crítico:

- Banner de cookies (solo si hay cookies no esenciales).
- Consentimiento explícito para CPL.
- Privacy by design.
- Servidor Supabase en región EU.

---

## 6. Coste técnico estimado (MVP)

| Concepto | Coste/mes |
|---|---|
| GitHub Pages | 0€ |
| Dominio (opcional) | 1€/mes |
| Supabase free | 0€ |
| MailerLite free (< 1.000 subs) | 0€ |
| Plausible (trial o self-host) | 0€ |
| LLM API con límite 30€/mes | 0–30€ |
| **TOTAL** | **0–31€/mes** |

**Pay-as-you-grow:** Supabase empieza a cobrar con > 500MB o > 50k rows. Airtable-style decisiones innecesarias: el límite es generoso para MVP.

---

## 7. Roadmap técnico

### MVP (mes 1)

- Adaptar chat client existente al vertical camper.
- Cargar system prompt + primeros 30 productos en Supabase.
- Crear 30 `.md` de productos.
- Landing simple en GitHub Pages con CTA al chat.
- Email opt-in funcional.

### Fase 1 (mes 2–3)

- Cloudflare Worker como proxy para esconder la API key.
- 50 productos + 50 `.md`.
- CPL funcionando con 1–2 partners.
- Analytics completos (Plausible + tabla eventos).
- Primeros experimentos paid.

### Fase 2 (mes 3–6)

- MCP de Supabase para queries más limpias.
- n8n para workflows async (email, CPL, retargeting).
- Generación dinámica de páginas SEO.
- Cuenta de usuario opcional.

### Fase 3 (mes 6+)

- Multi-país (LatAm).
- Knowledge Graph formal.
- Catálogo migrado a Postgres especializado si > 5.000 productos.
- API pública / MCP server.

---

## 8. Pendiente

- [x] Stack definitivo.
- [ ] Crear proyecto Supabase.
- [ ] Configurar RLS.
- [ ] Adaptar chat client.
- [ ] Crear primeros 30 `.md` de producto.
- [ ] Configurar banner de cookies.
- [ ] Alta en Amazon Associates.
- [ ] Alta en Awin.
- [ ] Primer experimento 1.
