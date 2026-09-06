# HANDOFF PACKAGE — AI Decision Commerce (Camper / Vanlife)

> **Para:** agente que va a revisar y dar feedback.
> **Sobre:** proyecto AI Decision Commerce, vertical Camper / Vanlife.
> **Estado:** documentación completa + decisiones cerradas, pendiente de revisión externa antes de programar.
> **Tiempo de lectura estimado:** 15–25 minutos para dar feedback útil.

---

## 1. Resumen ejecutivo en 30 segundos

Proyecto: **motor de recomendación + afiliación + CPL** para España, focalizado en el vertical **Camper / Vanlife**.

El usuario llega a una landing, abre un chat conversacional, le hace preguntas sobre su vehículo y necesidades, y el sistema le devuelve una recomendación personalizada de 1–3 productos con explicación trazable ("te lo recomiendo por A, B, C; no te recomiendo X por D, E"). Los productos llevan enlaces de afiliado (Amazon, Awin) y, en categorías con instalación, un formulario CPL para que un instalador local le contacte.

**Diferenciador:** no vendemos, recomendamos con justificación. La IA interpreta y explica, los datos estructurados controlan las restricciones críticas.

---

## 2. Contexto del promotor

- Persona técnica con experiencia en:
  - Web (HTML/CSS, ha hecho páginas).
  - n8n (lo domina).
  - Una **app de hábitos funcional** con chat client propio, system prompts en `.md`, e integración con API LLM (la misma que se va a usar aquí).
- **Limitaciones reconocidas:** "algo" de código (no experto). Sin experiencia previa con Shopify, Next.js ni frameworks pesados.
- **Recurso escaso:** tiempo (8–12 h/semana estimadas).

---

## 3. Decisiones cerradas (15)

> Ver `docs/23-decisions-log.md` para detalle completo de cada una. Resumen aquí:

### Bloque metodología (D-001, D-002)
- **D-001:** No programar antes de validar con experimento real.
- **D-002:** 26 archivos de documentación como estándar del proyecto.

### Bloque vertical / mercado (D-003, D-004, D-007)
- **D-003:** Vertical primario = **CAMPER / VANLIFE** (puntuación matriz 7,35/10, líder entre 5 candidatos).
- **D-004:** Aerotermia queda en cola como segundo vertical si Camper valida.
- **D-007:** Lanzar en español peninsular / España. LatAm fase 2+.

### Bloque modelo de negocio (D-005, D-010)
- **D-005:** **Modelo mixto: afiliación + CPL** simultáneamente.
- **D-010:** **Confianza > comisión** (política innegociable).

### Bloque arquitectura técnica (D-006, D-011–D-015) — el corazón de la discusión
- **D-006:** Stack MVP = **GitHub Pages + Supabase + `.md` knowledge + LLM browser-direct**.
- **D-011:** **NO usar Shopify** en MVP (modelo no es e-commerce directo).
- **D-012:** Componentes concretos: chat GitHub Pages, Supabase como BBDD, `.md` en repo como knowledge, MailerLite, Plausible.
- **D-013:** **NO usar MCP ni n8n en MVP** (añadir cuando catálogo >200 o >5 fuentes externas).
- **D-014:** API key del LLM expuesta en el bundle JS de GitHub Pages en MVP (con límite de gasto). Proxy Cloudflare Worker o n8n en fase 1+.
- **D-015:** Datos críticos (precio, stock) en Supabase, conocimiento narrativo (descripción, reviews, compatibilidades) en `.md`.

### Bloque alcance MVP (D-008, D-009)
- **D-008:** Catálogo de **30–50 productos** (no miles).
- **D-009:** **No checkout propio** en MVP.

---

## 4. Arquitectura técnica — diagrama

```
┌──────────────────────────────────────────────┐
│  GitHub Pages                                │
│  ┌────────────────────────────────────────┐  │
│  │ Landing + chat client (existente)      │  │
│  │  • Carga system prompt (.md)           │  │
│  │  • Parser LLM → requisitos JSON        │  │
│  │  • Query Supabase REST (hard filters)  │  │
│  │  • Fetch .md de productos candidatos   │  │
│  │  • LLM explicación final              │  │
│  │  • Render + botones afiliado + tracking│  │
│  └────────────────────────────────────────┘  │
└──────────┬────────────────┬──────────────────┘
           │                │
           ↓                ↓
┌──────────────────┐  ┌─────────────────────────┐
│ Supabase (Postgres)│ │ /knowledge/productos/*.md│
│ • productos       │  │ (descripciones, reviews,  │
│ • leads (CPL)     │  │  compatibilidades, etc.)  │
│ • eventos         │  └─────────────────────────┘
│ (todas con RLS)   │             │
└──────────────────┘             │
                                 ↓
                          ┌──────────────┐
                          │ LLM API      │
                          │ (navegador)  │
                          └──────────────┘
```

---

## 5. Stack y dependencias

| Capa | Tecnología | Coste |
|---|---|---|
| Front / hosting | GitHub Pages (existente) | 0€ |
| Chat client | JS propio del promotor (adaptado) | 0€ |
| System prompt | `/system-prompts/asesor-camper.md` | 0€ |
| Knowledge base | `/knowledge/productos/*.md` en repo | 0€ |
| BBDD | Supabase (Postgres + REST + RLS) free tier | 0€ |
| LLM | API del proveedor actual (con límite 30€/mes) | 0–30€/mes |
| Email | MailerLite o Brevo (free < 1.000 subs) | 0€ |
| Analytics | Plausible (trial / cloud EU) | 0€ |
| **TOTAL** | | **0–31€/mes** |

**Lo que se descartó explícitamente:** Shopify, Next.js, Vercel, Webflow, Airtable, MCP, n8n (todos en MVP).

---

## 6. Unit economics (resumen)

| Métrica | Valor |
|---|---|
| AOV camper | ~1.500€ |
| Comisión afiliación media efectiva | ~5% |
| CPL medio estimado | ~40€ |
| Revenue / 1.000 visitantes cualificados | ~1.316€ |
| Beneficio neto / 1.000 visitantes | ~1.038€ |
| Costes mensuales infraestructura | ~30€ |
| LTV 24 meses estimado por usuario | ~250–350€ |
| CAC máximo permitido | ~150€ / usuario cualificado |

Detalle completo: `docs/06-unit-economics.md`.

> ⚠️ **Todas estas cifras son HIPÓTESIS BASE**, no mediciones reales. Se validan en experimento 1.

---

## 7. Hipótesis clave a validar (17 documentadas)

> Ver `docs/24-assumptions-log.md` completo. Las más sensibles:

| ID | Hipótesis | Cómo se valida |
|---|---|---|
| A-001 | Hay demanda suficiente en Camper ES | Experimento 1: medir visitantes reales |
| A-003 | Comisión afiliación efectiva = 5% | Confirmar en Amazon Associates + Awin |
| A-006 | Tasa finalización asistente = 65% | Medir en experimento 1 |
| A-009 | Tasa CPL submission = 15% | Medir en experimento 1 |
| A-010 | LTV 24m = 300€ | Medir mensualmente desde mes 6 |
| A-013 | Hay ≥5 partners CPL serios contactables | Contactar 10 candidatos en experimento 2 |
| A-014 | SEO orgánico viable en 6–12 meses | Análisis keywords + auditoría competidores |

---

## 8. Plan de validación

> Ver `docs/25-validation-log.md` completo.

**Experimento 1 (MVP + tráfico, 4 semanas):**
- 500 visitantes en 30 días.
- ≥25% inician asistente, ≥50% completan, ≥10% CTR afiliado, ≥30 emails.
- 5 leads CPL enviados.
- ≥1 conversión confirmada.

**Gates de decisión:**
- GATE 1: existe demanda.
- GATE 2: existe monetización suficiente.
- GATE 3: hay partners CPL.
- GATE 4: la recomendación es mejor que una búsqueda normal.
- GATE 5: usuarios interactúan.
- GATE 6: usuarios hacen clic.
- GATE 7: hay ventas/leads.
- GATE 8: la economía permite comprar tráfico.
- GATE 9: el modelo escala.

---

## 9. Roadmap

| Fase | Timing | Hito |
|---|---|---|
| Setup | Días 1–3 | Supabase + cuentas + límites API |
| MVP | Sem 1–2 | Chat funcional + 30 productos + .md + landing |
| Optimización | Sem 3–8 | Iterar datos reales + CPL real |
| Escala nacional | Mes 3–6 | Cloudflare Worker + n8n + 100 productos |
| Decisión estratégica | Mes 6–12 | ¿2º vertical o LatAm? |
| Expansión | Mes 12+ | México primero, luego resto LatAm |

Detalle: `docs/21-roadmap.md`.

---

## 10. Material disponible para revisión

El agente de feedback tiene a su disposición:

| Documento | Contenido |
|---|---|
| `docs/README.md` | Índice y rutas de lectura |
| `docs/DECISION-REPORT.md` | Executive summary original |
| `docs/23-decisions-log.md` | 15 decisiones con motivo, datos, riesgo, reversibilidad |
| `docs/24-assumptions-log.md` | 17 hipótesis con status y plan de validación |
| `docs/25-validation-log.md` | 6 experimentos diseñados |
| `docs/02-vertical-selection.md` | Matriz cuantitativa de los 5 verticales |
| `docs/03-competitor-analysis.md` | Competencia por vertical |
| `docs/04-affiliate-programs.md` | Programas de afiliación |
| `docs/05-business-model.md` | Modelo de negocio detallado |
| `docs/06-unit-economics.md` | Unit economics con 3 escenarios |
| `docs/09-product-requirements.md` | Requisitos MVP |
| `docs/10-product-data-model.md` | Modelo de datos |
| `docs/11-recommendation-engine.md` | Motor de recomendación |
| `docs/12-ai-architecture.md` | Uso de IA |
| `docs/13-retargeting.md` | Retargeting |
| `docs/14-seo-strategy.md` | SEO |
| `docs/15-content-strategy.md` | Contenido |
| `docs/16-analytics.md` | Tracking y métricas |
| `docs/17-technical-architecture.md` | Stack y arquitectura |
| `docs/18-security-privacy.md` | RGPD, seguridad |
| `docs/19-legal-risks.md` | Riesgos legales |
| `docs/20-mvp-scope.md` | Alcance MVP |
| `docs/21-roadmap.md` | Roadmap |
| `docs/22-testing-plan.md` | Plan de testing |
| `docs/26-integration-guide.md` | **Setup paso a paso con SQL y código copy-paste** |
| `docs/system-prompts/asesor-camper.md` | System prompt del LLM |
| `docs/knowledge/productos/dometic-cfx3-55.md` | Ejemplo de ficha de producto |
| `docs/knowledge/productos/victron-bluesolar-100w.md` | Ejemplo de ficha de producto |
| `docs/knowledge/productos/varta-dual-purpose-agm-95ah.md` | Ejemplo de ficha de producto |

---

## 11. Lo que necesito del agente de feedback

Feedback concreto, ordenado por prioridad, sobre estas 6 preguntas:

### Pregunta 1 — Selección de vertical (CRÍTICA)
¿La elección de **CAMPER / VANLIFE** está sólidamente justificada?
- ¿La matriz ponderada en `02-vertical-selection.md` es razonable?
- ¿Consideras que **AEROTERMIA** debería ser el vertical primario dado su mayor revenue/visitante (3,14€ vs 1,04€)?
- ¿Hay algún vertical no considerado que merezca análisis?

### Pregunta 2 — Arquitectura técnica (CRÍTICA)
¿La decisión de **GitHub Pages + Supabase + .md + LLM browser-direct** es correcta para este perfil de promotor y este proyecto?
- ¿El chat client existente + Supabase REST cubre los requisitos?
- ¿La API key expuesta en GitHub Pages es un riesgo aceptable en MVP?
- ¿Falta algo crítico (CDN, observabilidad, backups)?
- ¿El dual `.md` + Supabase es el patrón correcto, o debería ser todo Supabase?

### Pregunta 3 — Modelo de monetización
¿La combinación **afiliación + CPL** es la correcta para Camper?
- ¿El mix 50/30/20 (afiliación/CPL/recurrencia) es realista?
- ¿La regla de "confianza > comisión" es operativa o necesita más detalle?

### Pregunta 4 — Unit economics
¿Las cifras de `06-unit-economics.md` son **razonables** como hipótesis base?
- ¿Qué variables están más infra o sobreestimadas?
- ¿La sensibilidad al CTR y al AOV es la correcta?
- ¿El LTV de 300€ es defendible?

### Pregunta 5 — Plan de validación
¿El **Experimento 1** está bien diseñado para validar la tesis?
- ¿Falta alguna métrica crítica?
- ¿Los criterios de éxito son los adecuados?
- ¿El timeline de 4 semanas es realista?

### Pregunta 6 — Riesgos y puntos ciegos
¿Qué riesgos importantes **no he visto**?
- Regulatorios (AI Act, RGPD en AI, normativa publicidad).
- De mercado (Phia/ShopMy llegan a español).
- De ejecución (chat client no soporta el flujo esperado).
- De modelo (la recurrencia asumida en camper no es tal).
- De seguridad (más allá de la API key expuesta).

---

## 12. Formato esperado del feedback

Por favor, estructura la respuesta así:

```
PARA CADA PREGUNTA (1-6):
  • Veredicto: APROBADO / APROBADO CON CAMBIOS / RECHAZADO
  • Puntos fuertes (1-3 bullets)
  • Puntos débiles / riesgos (1-3 bullets)
  • Cambios concretos sugeridos (si aplica)
  • Pregunta de seguimiento (si aplica)

AL FINAL:
  • TOP 3 RIESGOS QUE NO HE VISTO
  • TOP 3 RECOMENDACIONES DE MAYOR IMPACTO
  • VEREDICTO GLOBAL: PROCEDER / PAUSAR / PIVOTAR
```

---

## 13. Limitaciones conocidas del propio handoff

- Mi ventana de conocimiento llega a enero 2026. Datos de comisiones, normativas y mercado **pueden haber cambiado** desde entonces.
- Las cifras de unit economics son **hipótesis**, no mediciones reales. Marqué explícitamente cuáles son HIPÓTESIS, SUPOSICIONES o DATOS OBSERVADOS en cada doc.
- No tengo acceso a tráfico en tiempo real (SimilarWeb, Google Trends ahora).
- El **conocimiento del promotor** sobre su propio chat client es lo que él dice. Si el feedback cuestiona aspectos que dependen de cómo funciona ese chat, habrá que validar con él.

---

## 14. Cómo cargar este handoff en otro agente

Copia y pega todo este archivo (`docs/HANDOFF.md`) en el prompt de inicio del otro agente, junto con:

> "Acabo de terminar la fase de documentación de un proyecto AI Decision Commerce (vertical Camper / Vanlife). Necesito tu feedback crítico sobre las 6 preguntas de la sección 11. Estructura tu respuesta según el formato de la sección 12. No asumas nada: cuestiona lo que veas débil y valida lo que veas sólido."

Si el otro agente necesita acceso a documentos específicos, están listados en la sección 10 con rutas absolutas.

---

**Empieza por:** sección 11 → sección 3 (decisiones) → sección 4 (arquitectura) → sección 6 (unit economics) → sección 8 (plan de validación) → secciones que necesites para profundizar.
