# 📂 Documentación — AI Decision Commerce (vertical Camper / Vanlife)

> **Estado:** Stack definitivo aprobado.
> **Vertical:** Camper / Vanlife.
> **MVP:** 1–2 semanas. **Coste:** 0–31€/mes.
> **Próximo paso:** ejecutar `26-integration-guide.md`.

---

## 🚦 Cómo leer esta documentación

**Si tienes 2 minutos:**
→ Lee `DECISION-REPORT.md`.

**Si tienes 30 minutos:**
→ Lee en este orden:
1. `DECISION-REPORT.md`
2. `00-project-brief.md`
3. `02-vertical-selection.md`
4. `06-unit-economics.md`
5. `20-mvp-scope.md`
6. `26-integration-guide.md`

**Si vas a programar:**
→ Empieza por `26-integration-guide.md` (tiene el código).

---

## 🎯 La decisión en una línea

```
VERTICAL:   Camper / Vanlife
MODELO:     Afiliación (Amazon + Awin) + CPL (instaladores, talleres)
STACK:      GitHub Pages + Supabase + .md knowledge + LLM browser-direct
COSTE:      0–31€/mes
TIEMPO MVP: 1–2 semanas
```

---

## 📑 Índice de documentos

### 🚀 Estrategia

| Doc | Descripción |
|---|---|
| `DECISION-REPORT.md` | **Executive summary + decisión recomendada.** Empieza aquí. |
| `00-project-brief.md` | Brief del proyecto. |
| `23-decisions-log.md` | **15 decisiones** con motivo, datos, riesgo. |
| `24-assumptions-log.md` | 17 hipótesis con plan de validación. |
| `25-validation-log.md` | 6 experimentos diseñados. |
| `21-roadmap.md` | Roadmap actualizado. |

### 🔍 Investigación

| Doc | Descripción |
|---|---|
| `01-market-research.md` | AI commerce 2024–2026. |
| `02-vertical-selection.md` | Matriz cuantitativa. |
| `03-competitor-analysis.md` | Competencia por vertical. |
| `04-affiliate-programs.md` | Programas de afiliación. |

### 💼 Negocio

| Doc | Descripción |
|---|---|
| `05-business-model.md` | Vías de monetización. |
| `06-unit-economics.md` | Unit economics. |
| `07-user-personas.md` | Personas prioritarias. |
| `08-user-flows.md` | Flujos de usuario. |

### 🛠 Producto y arquitectura

| Doc | Descripción |
|---|---|
| `09-product-requirements.md` | Requisitos MVP. |
| `10-product-data-model.md` | Modelo de datos. |
| `11-recommendation-engine.md` | Motor de recomendación. |
| `12-ai-architecture.md` | Uso de IA. |
| `13-retargeting.md` | Retargeting. |
| `16-analytics.md` | Tracking y métricas. |
| `17-technical-architecture.md` | Stack y arquitectura. |
| `20-mvp-scope.md` | Alcance del MVP. |
| `26-integration-guide.md` | **Setup paso a paso del MVP.** |

### 📈 Marketing

| Doc | Descripción |
|---|---|
| `14-seo-strategy.md` | SEO. |
| `15-content-strategy.md` | Contenido. |

### ⚖️ Legal

| Doc | Descripción |
|---|---|
| `18-security-privacy.md` | RGPD. |
| `19-legal-risks.md` | Riesgos legales. |

### 🧪 QA

| Doc | Descripción |
|---|---|
| `22-testing-plan.md` | Plan de testing. |

### 🧠 Recursos operativos

| Doc | Descripción |
|---|---|
| `system-prompts/asesor-camper.md` | ⚙️ System prompt del LLM. |
| `knowledge/productos/dometic-cfx3-55.md` | 🛒 Ejemplo de ficha de producto. |
| `knowledge/productos/victron-bluesolar-100w.md` | 🛒 Ejemplo de ficha de producto. |
| `knowledge/productos/varta-dual-purpose-agm-95ah.md` | 🛒 Ejemplo de ficha de producto. |

---

## 🧭 Reglas del proyecto

1. **No se programa sin aprobación previa del Decision Report.** ✅ APROBADO
2. **Cada decisión se documenta en `23-decisions-log.md`.**
3. **Cada hipótesis se documenta en `24-assumptions-log.md`.**
4. **Cada experimento se documenta en `25-validation-log.md`.**
5. **La confianza del usuario está por encima del revenue.**
6. **La IA interpreta y explica, no inventa datos críticos.**
7. **El método es:** demanda → monetización → MVP → tráfico → ventas → optimización → escala.

---

## 🏗️ Arquitectura definitiva (resumen visual)

```
┌─────────────────────────────────────────────┐
│  LANDING + CHAT      GitHub Pages           │
│  (chat client existente del promotor)       │
└──────────────┬──────────────────────────────┘
               │
   ┌───────────┼───────────────┐
   ↓           ↓               ↓
┌──────┐  ┌──────────┐  ┌──────────────┐
│.md   │  │ Supabase │  │ LLM API      │
│know. │  │ REST     │  │ (navegador)  │
└──────┘  └──────────┘  └──────────────┘
```

**Lo que el chat client hace en cada pregunta:**

1. Pregunta → LLM → JSON de requisitos.
2. JSON → Supabase → productos candidatos (hard filters).
3. IDs → fetch `.md` → contextos narrativos.
4. Contextos → LLM → recomendación explicada.
5. Render con botones de afiliado + tracking.

---

## 🗓 Próximo paso inmediato

1. Crear proyecto Supabase (15 min).
2. Ejecutar SQL de `26-integration-guide.md` (5 min).
3. Adaptar chat client con el código de `26-integration-guide.md` (1–2 h).
4. Cargar 30 productos en Supabase + 30 `.md` (2–3 h, 3 ya listos).
5. Smoke test con 5 preguntas distintas (30 min).
6. Deploy a GitHub Pages (15 min).
7. **Experimento 1** (4 semanas, ver `25-validation-log.md`).
