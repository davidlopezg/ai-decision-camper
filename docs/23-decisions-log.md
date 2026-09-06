# 23 · DECISIONES LOG

> Formato: cada decisión relevante se registra con fecha, motivo, datos, riesgo, reversibilidad.

---

## D-001 — Adoptar metodología "no programar antes de validar"

| Campo | Contenido |
|---|---|
| Fecha | Inicio del proyecto |
| Decisión | No se escribe código hasta tener el Decision Report aprobado y los gates 1–2 validados. |
| Alternativas consideradas | (a) Empezar directamente con Shopify + landing; (b) empezar a programar el motor completo. |
| Motivo | El brief del promotor lo exige explícitamente. Reduce riesgo de construir algo sin mercado. |
| Datos que la respaldan | Principio de "validar antes de construir". Patrón de startups AI commerce fallidas por exceso de tecnología temprana. |
| Riesgo | Pérdida de velocidad si la fase de investigación se alarga. |
| Reversibilidad | Alta. Una vez validado, se puede pasar a desarrollo sin pérdida. |
| Responsable | Agente principal. |

---

## D-002 — Crear estructura documental en /docs con 26 archivos

| Campo | Contenido |
|---|---|
| Fecha | Inicio del proyecto |
| Decisión | Adoptar la estructura de 26 docs definida por el promotor. |
| Motivo | Estandariza la documentación. Permite auditoría. Evita olvidos. |
| Datos | — |
| Riesgo | Sobre-documentación que frene ejecución. Mitigación: docs esenciales primero, resto progresivamente. |
| Reversibilidad | Alta. |
| Responsable | Agente principal. |

---

## D-003 — Vertical primario: CAMPER / VANLIFE

| Campo | Contenido |
|---|---|
| Fecha | Fase de investigación |
| Decisión | Empezar por el vertical Camper / Vanlife en lugar de Solar, Aerotermia, Home Gym o VE Carga. |
| Alternativas | Solar (revenue/visit mayor pero mayor riesgo); Aerotermia (CPL alto pero requiere partners de instalación desde el día 1); Home gym (catálogo fácil pero mercado saturado); VE Carga (mercado aún pequeño en ES). |
| Motivo | Mejor combinación global de matriz (7,35/10): recurrencia alta (LTV), bajo riesgo regulatorio, contenido orgánico viable, capacidad de diferenciación clara vía IA, viable en solitario, expansión a LatAm posible. |
| Datos que la respaldan | Matriz cuantitativa (ver `02-vertical-selection.md`). Unit economics conservador de 1,04€/visitante. |
| Riesgo | AOV bajo. Dependencia inicial fuerte de Amazon Associates. Estacionalidad. |
| Reversibilidad | Media. Migrar a otro vertical tras experimento 1 es posible pero costoso en tiempo. |
| Responsable | Agente principal + aprobación del promotor. |

---

## D-004 — No descartar Aerotermia como vertical secundario

| Campo | Contenido |
|---|---|
| Fecha | Fase de investigación |
| Decisión | Mantener Aerotermia como candidato firme a segundo vertical si Camper valida. |
| Motivo | Revenue/visitante más alto del set (3,14€). Demanda real con subvenciones activas. |
| Riesgo | Necesita músculo de partners de instalación. No viable como MVP solo. |
| Reversibilidad | Alta. |
| Responsable | Agente principal. |

---

## D-005 — Modelo mixto: afiliación + CPL

| Campo | Contenido |
|---|---|
| Fecha | Fase de investigación |
| Decisión | El modelo será mixto (afiliación como vía rápida + CPL como vía alta). No elegir uno solo. |
| Motivo | Concentrarse solo en afiliación dejaría dinero sobre la mesa en verticales complejos. Solo CPL requiere masa crítica de partners. |
| Datos | Tablas en `05-business-model.md` y `06-unit-economics.md`. |
| Riesgo | Complejidad operativa mayor. Necesidad de dos pipelines. |
| Reversibilidad | Media. |
| Responsable | Agente principal. |

---

## D-006 — Stack MVP inicial: GitHub Pages + Supabase + .md + LLM

| Campo | Contenido |
|---|---|
| Fecha | Fase de validación |
| Decisión | Construir el MVP reutilizando el chat client propio del promotor sobre GitHub Pages. Datos en Supabase. Conocimiento de productos en `.md`. LLM en navegador vía API directa con key restringida. |
| Alternativas | (a) Next.js + Vercel + Airtable + n8n (mi propuesta inicial, sobre-arquitecturada); (b) Webflow + n8n; (c) Shopify como catálogo backend. |
| Motivo | (1) El promotor ya tiene chat client funcional y experiencia con `.md` y LLM. (2) Reutilizar infraestructura existente minimiza tiempo y coste. (3) Supabase da Postgres serio + API auto + MCP oficial + RLS para RGPD, free tier suficiente. (4) Browser-direct acelera el time-to-market; el proxy se añade en fase 1 cuando llegue tráfico real. |
| Datos | El promotor tiene app de hábitos funcionando con este patrón. La fricción principal de cualquier stack más complejo era la curva de aprendizaje innecesaria. |
| Riesgo | (a) La API key queda expuesta en GitHub Pages si no se inyecta bien en build time. Mitigable con key restringida por gasto y rotación. (b) Sin proxy, hay latencia variable. (c) Si el catálogo crece > 5.000 productos, el bundle JS se vuelve pesado. |
| Reversibilidad | Alta. Migrar a Next.js o añadir Cloudflare Worker como proxy es viable sin reescritura. |
| Responsable | Promotor + agente principal. |

---

## D-007 — Idioma y mercado iniciales: español peninsular, España

| Campo | Contenido |
|---|---|
| Fecha | Fase de validación |
| Decisión | Idioma inicial español de España. No lanzar LatAm hasta validar. |
| Motivo | El promotor conoce mejor el mercado ES. Comunidad camper ES es grande y verificable. LatAm se aborda como fase 2 con datos de la fase 1. |
| Riesgo | Diferir LatAm puede perder ventana. Pero lanzarlo sin validar es peor. |
| Reversibilidad | Alta. |
| Responsable | Promotor. |

---

## D-008 — Catálogo MVP: 30–50 productos, no miles

| Campo | Contenido |
|---|---|
| Fecha | Fase de MVP |
| Decisión | Limitar el catálogo del MVP a 30–50 productos curados a mano. |
| Motivo | Mantenibilidad. Calidad sobre cantidad. Suficiente para configurar 3–8 kits coherentes. Ampliable tras demanda validada. |
| Riesgo | Escasa percepción de variedad. Mitigable con buena categorización y buen copy. |
| Reversibilidad | Alta. |
| Responsable | Agente de catálogo (3). |

---

## D-009 — No implementar checkout propio en MVP

| Campo | Contenido |
|---|---|
| Fecha | Fase de arquitectura |
| Decisión | Monetizar solo por afiliación + CPL. No construir checkout propio. |
| Motivo | El modelo no es e-commerce. Construir checkout añade complejidad legal, fiscal, técnica, sin ventaja económica clara en fase 1. |
| Riesgo | Si el afiliado rechaza cookies largas o baja comisiones, menos margen. |
| Reversibilidad | Media. Checkout se puede añadir después. |
| Responsable | Agente principal. |

---

## D-010 — Priorizar confianza sobre comisión

| Campo | Contenido |
|---|---|
| Fecha | Política general |
| Decisión | Si dos productos son equivalentes para el usuario, se puede priorizar el de mayor comisión. **Nunca** recomendar un producto claramente peor solo porque paga más. |
| Motivo | La confianza del usuario es el activo más valioso del proyecto. Destruirla por comisión destruye el negocio a medio plazo. |
| Riesgo | Pérdida de revenue a corto plazo. Aceptable. |
| Reversibilidad | Baja — es un principio, no una palanca. |
| Responsable | Promotor + agente principal. |

---

## D-011 — NO usar Shopify

| Campo | Contenido |
|---|---|
| Fecha | Confirmación de stack |
| Decisión | Shopify queda descartado como plataforma del MVP. |
| Motivo | (a) El modelo no es e-commerce directo sino afiliación + CPL. (b) El asistente conversacional con ramificación y razonamiento no cabe en Liquid sin pelearse. (c) Shopify penaliza sitios que "parecen tiendas pero solo recomiendan" según sus ToS. (d) Coste innecesario (29–299€/mes + apps). (e) Vendor lock-in alto. |
| Riesgo | Si en fase 2+ abrimos venta directa, evaluamos Shopify como backend de catálogo (headless) con Next.js como front. |
| Reversibilidad | Alta. Shopify se puede añadir como capa de catálogo en fase 2 sin tocar el front. |
| Responsable | Promotor + agente principal. |

---

## D-012 — Arquitectura final MVP: chat client GitHub Pages + Supabase + .md + LLM

| Campo | Contenido |
|---|---|
| Fecha | Confirmación de stack tras iteración con el promotor |
| Decisión | Adoptar la arquitectura descrita en `17-technical-architecture.md` versión revisada y en `26-integration-guide.md`. |
| Componentes | (1) Chat client en GitHub Pages reutilizado del proyecto de hábitos del promotor. (2) Supabase como base de datos (Postgres + Auth + RLS + Storage) y como hosting de leads/eventos. (3) `.md` por producto en `/docs/knowledge/productos/` para contexto rico que el LLM inyecta. (4) LLM llamado directamente desde el navegador en MVP, con key restringida por gasto. (5) MailerLite o Brevo para email. (6) Plausible para analytics. |
| Excluido | Next.js, Vercel, Shopify, Webflow, Airtable, MCP (de momento), n8n (de momento). |
| Motivo | (a) Reutiliza el chat client existente. (b) Coste inicial 0€/mes. (c) Time-to-market: 1–2 semanas en lugar de 4–6. (d) Cumple todos los requisitos RGPD con RLS. (e) Supabase escala a millones si el proyecto crece. |
| Riesgo | API key expuesta en GitHub Pages si no se gestiona correctamente. Mitigación: key con límite de gasto, rate limit, restricción por dominio si el proveedor lo permite. En fase 1+ se mete Cloudflare Worker o n8n como proxy (5–15 min). |
| Reversibilidad | Alta. Migración a Next.js o añadir proxy no requiere reescritura del chat client. |
| Responsable | Promotor. |

---

## D-013 — No usar MCP ni n8n en MVP

| Campo | Contenido |
|---|---|
| Fecha | Confirmación de stack |
| Decisión | El MVP funcionará sin MCP (Model Context Protocol) y sin n8n como orquestador. Las queries a Supabase se harán directamente desde el chat client vía REST API. |
| Motivo | (a) MCP añade una capa de indirección que solo aporta valor cuando hay > 5–10 herramientas externas. (b) n8n añade un servidor más a mantener y desplegar. (c) Para 30–50 productos y un solo vertical, las queries REST directas son suficientes y más rápidas de depurar. |
| Cuándo revertir | Cuando: (1) el catálogo crezca > 200 productos, (2) haya > 3 fuentes de datos externas, (3) los workflows async (email, CPL) se vuelvan complejos. Estimación: mes 3–6. |
| Riesgo | Acoplamiento entre chat client y Supabase. Mitigable con una capa de fetch wrapper. |
| Reversibilidad | Alta. Migrar a MCP es un refactor incremental. |
| Responsable | Promotor. |

---

## D-014 — Browser-direct API call en MVP, proxy en fase 1+

| Campo | Contenido |
|---|---|
| Fecha | Confirmación de seguridad |
| Decisión | En MVP, el chat client llama al LLM directamente desde el navegador usando una API key inyectada en build time. En fase 1 (cuando llegue tráfico real), se añade Cloudflare Worker o n8n como proxy. |
| Motivo | Velocidad de implementación. Con la key restringida por gasto, el riesgo financiero está acotado a unos pocos euros en el peor caso. |
| Riesgo | La key queda visible en el bundle JS servido por GitHub Pages. Aunque `SUPABASE_ANON_KEY` es pública por diseño, la LLM API key no debería serlo. |
| Mitigaciones inmediatas | (1) Crear API key específica para producción con límite de gasto (30€/mes MVP). (2) Configurar rate limit en el proveedor. (3) Inyectar la key en build time vía GitHub Actions con secret, no commitear el `.env`. (4) Rotar la key mensualmente o ante sospecha de abuso. |
| Mitigación fase 1+ | Cloudflare Worker gratis (5 min) o n8n (15 min) como proxy. La key vive en el worker/n8n, nunca en el navegador. |
| Reversibilidad | Alta. Cambio a proxy es de 1–2 horas. |
| Responsable | Promotor. |

---

## D-015 — Knowledge de productos en `.md` + datos estructurados en Supabase

| Campo | Contenido |
|---|---|
| Fecha | Confirmación de arquitectura de datos |
| Decisión | El conocimiento rico de cada producto vive en un `.md` específico (`/knowledge/productos/[slug].md`). Los datos estructurados críticos (precio, stock, comisión, URL afiliada, categorías) viven en Supabase. |
| Motivo | (a) Los `.md` son ideales para que el LLM "lea" descripciones, casos de uso, reviews, ventajas/inconvenientes. (b) Supabase es ideal para datos que cambian (precio, stock) y que el LLM **no debe** memorizar. (c) Permite actualizar conocimiento sin tocar código (editar `.md` en el repo). (d) Versionable con git. |
| Flujo | El chat client: (1) parsea requisitos con el LLM, (2) hace query a Supabase con hard filters, (3) para cada candidato top, carga su `.md`, (4) pasa los `.md` al LLM para que genere la explicación. |
| Riesgo | Si el `.md` queda desactualizado respecto al producto real, el LLM puede mezclar datos viejos con nuevos. Mitigable con fecha de revisión visible en cada `.md` y auditoría trimestral. |
| Reversibilidad | Alta. Migrar `.md` a Supabase Storage o a una base vectorial es trivial. |
| Responsable | Promotor + agente de catálogo. |

---

## D-016 — El motor de recomendación NO es la ventaja competitiva

| Campo | Contenido |
|---|---|
| Fecha | Revisión estratégica post-decisión de validación |
| Decisión | Dejar de posicionar el proyecto como "AI shopping assistant". Reposicionar como **"capa de decisión independiente, multitienda"**. |
| Motivo | (a) Amazon, ChatGPT, Google, Gemini, Perplexity pueden hacer recomendaciones con IA. (b) Una web de productos + un chatbot que recomienda es commoditizable. (c) El usuario lo sabe. |
| Lo que SÍ defendible | La **inteligencia de decisión sobre un problema concreto** (ej. "diseñar el sistema eléctrico de una camper"), independientemente de dónde se compre. |
| Implicación | El LLM no es el producto. El conocimiento técnico, las reglas, las compatibilidades, los casos reales, son el producto. El LLM es la interfaz. |
| Riesgo | Si el posicionamiento es difuso, podemos parecer "otra cosa más". Mitigación: comunicar muy claramente QUÉ problema resolvemos y por qué. |
| Reversibilidad | Baja — afecta a posicionamiento, copy, marca. |
| Responsable | Promotor. |

---

## D-017 — Posicionamiento: decision layer multitienda (no "Amazon con IA")

| Campo | Contenido |
|---|---|
| Fecha | Revisión estratégica |
| Decisión | El proyecto NO vende. **Decide qué comprar y dónde**, optimizando para el usuario, no para un comercio. |
| Modelo | Affiliate multitienda: el clic puede ir a Amazon, a tienda especializada, a un instalador local, etc. CPL cuando aplique. El usuario compra donde sea; nosotros cobramos por la decisión. |
| Diferenciador explícito | "Amazon te enseña 15 baterías. Nosotros te decimos cuál necesitas y dónde comprarla mejor." |
| Implicación en copy | Decir siempre "recomendamos", "sugerimos", "decidimos", no "vendemos" ni "tenemos". |
| Implicación en partners | Cualquier programa de afiliación sirve, no solo Amazon. Awin, Impact, CJ, programas directos. |
| Riesgo | Cero beneficio si la decisión es trivial. Aceptable: elegimos verticales donde la decisión NO es trivial. |
| Reversibilidad | Media. Si el mercado pide otra cosa, se reorienta. |
| Responsable | Promotor. |

---

## D-018 — Knowledge graph + reglas + datos reales = el moat real

| Campo | Contenido |
|---|---|
| Fecha | Revisión estratégica |
| Decisión | El activo defendible es el **conocimiento técnico acumulado**, no la tecnología. |
| Capas de conocimiento (de más a menos defendible): | |
| 1. Reglas técnicas | Compatibilidades, dimensionamiento. Se codifican en Supabase. |
| 2. Knowledge graph | Batería A → compatible con → Inversor B. Más semántico que un catálogo plano. |
| 3. Casos reales | 10.000 configuraciones de personas reales con necesidades reales. Dataset propio, no replicable. |
| 4. Datos de comportamiento | Qué pregunta la gente, qué compara, qué abandona, qué acaba comprando. Solo se consigue con tráfico real. |
| 5. Distribución | SEO, YouTube, comunidades, newsletter, marca, agentes. |
| Implicación | Invertir en conocimiento antes que en tecnología brillante. Cada producto nuevo se documenta con rigor. |
| Riesgo | El conocimiento sin distribución no llega. La distribución sin conocimiento destruye confianza. Ambos hacen falta. |
| Reversibilidad | Baja — el conocimiento es acumulativo. |
| Responsable | Promotor + agente de catálogo. |

---

## D-019 — Reemplazar el Experimento 0 (manual) por validación con tráfico real

| Campo | Contenido |
|---|---|
| Fecha | Revisión estratégica |
| Decisión | Olvidar el enfoque de "20 entrevistas manuales". Validar con **tráfico real de Google Ads** sobre búsquedas con intención de compra. |
| Motivo | (a) Las entrevistas son buenas para insight cualitativo pero caras y lentas. (b) "Compraría esto" dicho en entrevista ≠ compra real. (c) El comportamiento real (clic, compra) es la única señal válida. (d) El promotor prefiere construir y medir, no entrevistar. |
| Nuevo método | (1) Construir MVP mínimo en 7-14 días. (2) Invertir €50-100 en Google Ads sobre keywords long-tail con intención de compra. (3) Medir funnel real: visita → inicio → finalización → clic → compra. (4) Decidir GO/ITERATE/PIVOT con datos. |
| Lo que se descarta | Manual questionnaires, manual recommendations, interview scripts. |
| Coste máximo antes de validar | €500-1000 + 2-3 semanas. |
| Riesgo | Gastar algo de dinero en ads sin conversión clara. Mitigación: presupuesto pequeño, keywords muy long-tail, esperar 2 semanas para tener datos significativos. |
| Reversibilidad | Total. |
| Responsable | Promotor. |

---

## D-020 — El promotor dirige, los agentes ejecutan

| Campo | Contenido |
|---|---|
| Fecha | Revisión estratégica |
| Decisión | El promotor hace **exclusivamente** de director del proyecto: aprueba, decide, valida. **Los agentes hacen el trabajo pesado**: investigación, catálogo, código, tests, contenido, SEO, analítica, automatizaciones. |
| División de roles | |
| PROMOTOR | (a) Aprueba vertical, productos, copy, keywords. (b) Revisa recomendaciones antes de publicar. (c) Decide GO/ITERATE/PIVOT con datos. (d) Es la voz de la marca. |
| AGENTE | (a) Investigación de mercado y competencia. (b) Búsqueda de programas de afiliación. (c) Recopilación y estructuración del catálogo. (d) Extracción de características. (e) Creación de reglas de decisión. (f) Programación del MVP. (g) Tests anti-alucinación. (h) SEO y contenido. (i) Analítica y tracking. (j) Automatizaciones. |
| Implicación | El agente (yo, en este caso) trabaja en paralelo muchas tareas y entrega "drafts" que el promotor revisa y aprueba. |
| Riesgo | Que el promotor apruebe sin leer. Mitigación: cada entregable debe ser revisable en <30 min. |
| Reversibilidad | Alta. |
| Responsable | Promotor. |

---

## D-021 — Objetivo = 10 ventas de afiliación antes de construir la siguiente capa

| Campo | Contenido |
|---|---|
| Fecha | Revisión estratégica |
| Decisión | Antes de invertir en API, MCP, knowledge graph formal, expansión, etc., el objetivo es **conseguir 10 ventas reales de afiliación** con el MVP. |
| Por qué | (a) Si no conseguimos 10 ventas con el MVP mínimo, no las conseguiremos tampoco con más tecnología. (b) Si conseguimos 10, tenemos una señal fuerte de product-market fit. (c) Cada venta valida un canal, un público, un mensaje. |
| Implicación | La primera capa se construye pequeña y se mejora basada en datos de venta. La siguiente capa (API, MCP, etc.) se justifica solo cuando haya demanda real. |
| Trigger de siguiente capa | (1) 10 ventas. (2) O 100 conversaciones completadas con CTR >15%. (3) Lo que llegue primero. |
| Riesgo | Sub-construir y dejar escapar una oportunidad. Mitigación: monitorizar también el LTV si hay recurrencia. |
| Reversibilidad | Total. |
| Responsable | Promotor. |

---

## D-022 — Tope económico y temporal antes de validar

| Campo | Contenido |
|---|---|
| Fecha | Revisión estratégica |
| Decisión | **No gastar más de 500-1.000€ ni más de 2-3 semanas** hasta tener señales reales de tracción. |
| Qué entra en el gasto | Dominio, herramientas, APIs, pequeños experimentos publicitarios, alguna suscripción. |
| Qué NO entra | Desarrollo externo, contrataciones, infraestructura cara. |
| Trigger de stop | (a) Se llega al gasto máximo sin conversiones. (b) Se llega al tiempo máximo sin tráfico. (c) El funnel muestra un agujero bloqueante (ej. CTR < 1%). |
| Reversibilidad | Total. |
| Responsable | Promotor. |

---

## D-023 — Plan operativo de 14 días, día a día

| Campo | Contenido |
|---|---|
| Fecha | Aprobación del plan |
| Decisión | Ejecutar el plan documentado en `28-14-day-plan.md`. Cada día tiene objetivos, tareas del agente, tareas del promotor y entregables. |
| Estructura | FASE 0 (días 1-2): decisiones + investigación. FASE 1 (días 3-5): catálogo + conocimiento + reglas. FASE 2 (días 6-9): construcción del MVP. FASE 3 (días 10-14): tráfico + validación. |
| Por qué | El promotor ha pedido explícitamente un plan día a día. Reduce ambigüedad, fija expectativas, permite corregir curso temprano. |
| Riesgo | Plans rígidos se rompen ante la realidad. Mitigación: revisión diaria de 15 min para ajustar. |
| Reversibilidad | Alta. Cualquier día puede cambiarse. |
| Responsable | Promotor + agente. |

---

## D-024 — Sustituir el antiguo "Experimento 0 manual" por el plan de 14 días

| Campo | Contenido |
|---|---|
| Fecha | Revisión estratégica |
| Decisión | El antiguo Experimento 0 (manual, 20 entrevistas) queda **descartado**. Se reemplaza por el plan operativo de 14 días del D-023. |
| Implicaciones | (a) `27-experiment-7day.md` queda obsoleto pero archivado por si se quiere volver a usar. (b) La arquitectura técnica del MVP (D-006, D-011–D-015) se ejecuta según el plan, no según el antiguo enfoque. |
| Reversibilidad | Total. |
| Responsable | Promotor. |

---

## Pendiente de decisión

- [ ] Naming del proyecto.
- [ ] Identidad visual (logo, paleta).
- [ ] Dominio.
- [ ] Fecha de inicio del plan de 14 días.
