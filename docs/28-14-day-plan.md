# 28 · PLAN OPERATIVO DE 14 DÍAS

> **Filosofía:** el promotor dirige, los agentes ejecutan. El objetivo es **conseguir las primeras 10 ventas de afiliación** con el MVP mínimo antes de construir nada más.
> **Tope:** 500-1.000€ y 2-3 semanas antes de validar.
> **Coste técnico:** 0€. Coste principal: Google Ads (50-100€).

---

## Resumen ejecutivo

| Fase | Días | Qué se hace | Quién ejecuta |
|---|---|---|---|
| **0 · Decisiones** | 1-2 | Validar vertical + investigación profunda de mercado y afiliados | Promotor aprueba · Agente investiga |
| **1 · Catálogo y reglas** | 3-5 | Cargar 30 productos en Supabase + escribir `.md` + reglas de decisión | Agente 100% |
| **2 · Construir MVP** | 6-9 | Landing + chat + tracking + textos legales | Agente construye · Promotor revisa |
| **3 · Tráfico real** | 10-14 | Google Ads + medir funnel + iterar | Agente configura · Promotor aprueba gasto |

**Al final del día 14**, decisión GO/ITERATE/PIVOT basada en datos reales.

---

## Reglas del juego

1. **El promotor NO programa.** Solo aprueba, decide, valida.
2. **El agente entrega drafts revisables** en <30 min por el promotor.
3. **Cada noche de los 14 días:** 15 min de sincronización. ¿Qué se hizo? ¿Qué falta? ¿Hay blockers?
4. **Regla de stop:** si se llega al día 14 con <10 ventas y CTR <5%, pausa de 1 semana, revisar, decidir.
5. **Tope de gasto:** €500-1000. Si se llega al 80% del tope sin señales, parar y revisar.

---

## FASE 0 · Decisiones (Días 1-2)

### Día 1 — Decisión de vertical + setup inicial

**Objetivo del día:** vertical confirmado, cuentas creadas.

**🟦 AGENTE (yo):**
- 1 página de brief validando Camper como vertical (10 min para que tú lo leas).
- Setup técnico: crear Supabase, GitHub Pages si no existe, herramientas de tracking.
- Lista de verificación de cuentas a crear.

**🟩 PROMOTOR (tú):**
- Lee el brief de validación (10 min).
- Aprueba o cambia el vertical.
- Crea las cuentas (Supabase, Amazon Associates, Awin, MailerLite, Plausible). Tiempo: 1 hora.

**Entregable:** Vertical confirmado. Cuentas creadas. URL de Supabase y keys guardadas en lugar seguro.

---

### Día 2 — Investigación profunda

**Objetivo del día:** tenemos lista de 30-50 productos camper con URLs, precios y programas de afiliación.

**🟦 AGENTE:**
- Investiga y documenta los **programas de afiliación activos** en España para Camper: Amazon ES (categorías neveras, placas, baterías), Awin (Leroy Merlin, Bricomart, Aki), tiendas especializadas (Dometic, Victron, Engel, Narbonne) si tienen programa.
- Genera lista de **30-50 productos candidatos** con URL, precio actual, categoría, vehículo compatible, comisión estimada, fuente (Amazon / tienda / marca).
- Análisis de **5 competidores principales**: CamperLam, NathanVan, Viviendocamper, Furgovw Tienda, etc. Qué hacen bien, qué hacen mal, qué no hacen.
- Top 10 **keywords long-tail** con intención de compra en Google Keyword Planner (o estimación si no tienes la herramienta).

**🟩 PROMOTOR:**
- Revisa el shortlist de productos (30 min).
- Marca los 30-50 que te parezcan más relevantes para el MVP.
- Aporta conocimiento propio: marcas que conoces, tiendas donde compras, errores típicos que has visto.
- Aprueba los competidores analizados.

**Entregable:** Lista cerrada de 30-50 productos camper. Top 10 keywords de paid. Análisis de competencia en 1 página.

---

## FASE 1 · Catálogo y reglas (Días 3-5)

### Día 3 — Catálogo estructurado en Supabase

**Objetivo:** los 30-50 productos están en una base de datos limpia, listos para ser consultados.

**🟦 AGENTE:**
- Ejecuta el SQL de `26-integration-guide.md` en Supabase (tablas `productos`, `leads`, `eventos` con RLS).
- Carga los 30-50 productos uno a uno con todos los campos (categoría, precio, vehículos compatibles, capacidades, dimensiones, peso, tags, nivel de usuario, URL producto, URL afiliada, programa, comisión).
- Verifica que cada producto tiene coherencia: no hay precios descabellados, no hay duplicados, no hay categorías vacías.
- Te entrega un CSV + link al SQL Editor para que puedas verificar.

**🟩 PROMOTOR:**
- Revisa el CSV (15-30 min).
- Corrige precios o URLs que veas desactualizados.
- Marca productos que NO deberían estar y por qué.

**Entregable:** Tabla `productos` con 30-50 filas reales, RLS activado.

---

### Día 4 — Knowledge de productos (los `.md`)

**Objetivo:** cada producto tiene una ficha rica en Markdown que el LLM pueda leer.

**🟦 AGENTE:**
- Genera los 30-50 `.md` de productos siguiendo la plantilla de los 3 ejemplos existentes (`dometic-cfx3-55.md`, `victron-bluesolar-100w.md`, `varta-dual-purpose-agm-95ah.md`).
- Para cada producto, recopila: descripción, datos técnicos, casos de uso, cuándo NO comprarlo, ventajas, inconvenientes, compatibilidades, productos complementarios, precio orientativo, programa de afiliación, reviews resumidas.
- Usa scraping ligero de Amazon ES y webs de marcas (sin sobrecargar).
- Coloca todos los `.md` en `docs/knowledge/productos/`.

**🟩 PROMOTOR:**
- Revisa 5-10 `.md` aleatorios (15 min).
- Verifica que el tono es correcto y la información es real.
- Si encuentras errores, los corriges y pides regenerar.

**Entregable:** 30-50 `.md` listos en `/knowledge/productos/`.

---

### Día 5 — Reglas de decisión

**Objetivo:** tenemos 20-50 reglas técnicas codificadas que el motor usará para recomendar.

**🟦 AGENTE:**
- Investiga y documenta las **reglas de compatibilidad y dimensionamiento** típicas en camper. Ejemplos:
  - "¿Nevera de compresor? Necesita batería ≥100Ah o placa solar ≥100W."
  - "¿Placa solar ≥200W? Necesita regulador MPPT ≥20A."
  - "¿Batería LiFePO4? Necesita cargador específico."
  - "¿Inversor ≥1000W? Necesita batería ≥200Ah o cableado reforzado."
  - "¿Cocina de gas en habitáculo? Necesita ventilación obligatoria."
- Codifica las reglas en Supabase (vistas SQL o tabla `reglas` con condiciones).
- Documenta cada regla con: nombre, descripción, severidad (HARD/BLOCKING vs SOFT/WARNING), fuente, fecha.

**🟩 PROMOTOR:**
- Revisa la lista de reglas (15 min).
- Aporta las reglas que conoces de tu experiencia (ej. "yo sé que tal placa no va bien con tal inversor porque...").
- Marca las reglas que te parecen críticas vs las discutibles.

**Entregable:** 20-50 reglas documentadas y operativas en Supabase.

---

## FASE 2 · Construir MVP (Días 6-9)

### Día 6 — Landing

**Objetivo:** landing pública con el copy correcto, lista para captar tráfico.

**🟦 AGENTE:**
- Crea la landing en HTML/CSS simple o Webflow (tú decides según tu comodidad).
- Copy basado en el posicionamiento D-017: "decision engine multitienda". Ejemplos:
  - Hero: "Te decimos exactamente qué necesita tu camper y dónde comprarlo."
  - Subtítulo: "No vendemos. Decidimos por ti entre Amazon, tiendas especializadas e instaladores locales."
  - CTA: "Configura tu kit en 2 minutos"
- Incluye disclaimer de afiliación visible.
- Diseño limpio pero creíble, no LLM genérico.

**🟩 PROMOTOR:**
- Revisa el copy (15 min).
- Sugiere cambios de tono si no te representa.
- Aprueba el diseño final.

**Entregable:** Landing publicada en GitHub Pages o Webflow.

---

### Día 7 — Chat funcional

**Objetivo:** el chat responde preguntas y devuelve recomendaciones coherentes.

**🟦 AGENTE:**
- Adapta tu chat client existente al nuevo dominio (camper advisor).
- Integra el system prompt `system-prompts/asesor-camper.md`.
- Implementa el flujo completo:
  1. Pregunta del usuario → LLM parser → JSON requisitos.
  2. JSON → query Supabase con hard filters.
  3. Top candidatos → fetch `.md` de contexto.
  4. Contextos + requisitos → LLM explicación.
  5. Render markdown + botones de afiliado.
- Tests internos: 5 preguntas distintas, verifica que el JSON es válido y las recomendaciones son coherentes.

**🟩 PROMOTOR:**
- Hace las 5 preguntas de prueba tú mismo (15 min).
- Evalúa si la respuesta es útil o hay alucinaciones.
- Si hay alucinaciones, las reportas y el agente ajusta el system prompt.

**Entregable:** Chat funcional en producción con al menos 5 preguntas respondidas correctamente.

---

### Día 8 — Afiliación, tracking y legal

**Objetivo:** los clics cuentan, los emails se capturan, los textos legales están publicados.

**🟦 AGENTE:**
- Convierte los enlaces de Amazon/tienda en enlaces de afiliado (con tu tag de Amazon Associates, tu ID de Awin, etc.).
- Implementa tracking: cada clic en un producto genera un evento `affiliate_clicked` en Supabase con `producto_id`, `programa`, `session_id`.
- Email opt-in: formulario simple en landing conectado a MailerLite.
- Banner de cookies con consentimiento (RGPD).
- Genera los textos legales mínimos (aviso legal, política de privacidad, política de cookies) adaptados al proyecto. ⚠️ Deberás revisarlos con un abogado antes de escalar, pero para MVP son suficientes.
- Disclaimer de afiliación + disclaimer de IA visibles.

**🟩 PROMOTOR:**
- Verifica que todos los enlaces llevan a Amazon / tienda correcta (10 min).
- Lee los textos legales (15 min). Si algo te chirría, lo marcas.
- Aprueba el opt-in email (qué dice, cuándo se envía).

**Entregable:** Tracking funcionando. Textos legales publicados. Disclaimer visible.

---

### Día 9 — QA final + soft launch

**Objetivo:** el MVP está listo para recibir tráfico real.

**🟦 AGENTE:**
- 5 preguntas de prueba finales (las del plan de testing en `22-testing-plan.md`).
- Verifica que no hay alucinaciones en 20 conversaciones.
- Verifica que el LLM no inventa precios ni compatibilidades.
- Lighthouse check en la landing.
- Verifica RLS en Supabase (no se puede escribir desde fuera sin token).
- Smoke test del flujo completo.

**🟩 PROMOTOR:**
- Navegas el sitio completo como si fueras un usuario (20 min).
- Verificas que todo carga, los enlaces funcionan, los textos legales están enlazados.
- Le das el visto bueno final o pides ajustes.

**Entregable:** MVP aprobado por el promotor. Listo para tráfico real.

---

## FASE 3 · Tráfico real (Días 10-14)

### Día 10 — Setup Google Ads

**Objetivo:** campaña lista para lanzar mañana.

**🟦 AGENTE:**
- Investiga 10-15 keywords long-tail con intención de compra para Camper en España. Ejemplos:
  - "mejor nevera portátil para furgoneta"
  - "kit solar furgoneta cuánto cuesta"
  - "batería auxiliar para camper"
  - "qué necesito para camperizar una furgo"
  - "nevera compresor furgoneta precio"
- Crea campaña en Google Ads con las keywords, copy adaptado, presupuesto diario €5-7.
- Configura conversión: clic en affiliate_linked (evento Supabase) o email capturado.
- Crea 3-4 anuncios por ad group con variaciones de copy.

**🟩 PROMOTOR:**
- Aprueba keywords y copy (15 min).
- Aprueba presupuesto total (€50-100 para los 4-5 días).
- Aprueba el límite de gasto diario.

**Entregable:** Campaña aprobada en Google Ads. Presupuesto diario activado.

---

### Día 11 — Lanzamiento

**Objetivo:** primer día de tráfico real. Datos empezando a llegar.

**🟦 AGENTE:**
- Activa la campaña.
- Monitoriza primeras 6 horas (CTR, impresiones, primeras visitas).
- Configura alertas de presupuesto (email al 50% y 80%).
- Comparte la URL del sitio en tus redes personales (esto NO es Google Ads, es tu propio canal).
- Primer reporte diario al final del día.

**🟩 PROMOTOR:**
- Comparte en tus redes (LinkedIn, Twitter/X, Instagram, Facebook, grupos de camper). 30 min.
- Responde a quien pregunte en comentarios o DMs.

**Entregable:** Campaña activa. Primer reporte diario con: impresiones, clics, CTR, visitas a landing, inicio del chat, finalizaciones.

---

### Día 12-13 — Observación e iteración

**Objetivo:** ver cómo se comporta el funnel real, hacer ajustes.

**🟦 AGENTE (cada día):**
- Reporte diario al promotor: tráfico, comportamiento, primeras señales.
- Análisis del funnel: ¿dónde se cae la gente? ¿Qué pregunta hace? ¿Qué producto ve más?
- Ajustes sobre la marcha:
  - Pausar keywords con CTR bajo.
  - Activar nuevas keywords si aparecen búsquedas relevantes.
  - Ajustar copy de ads si CTR < 2%.
  - Reportar alucinaciones si las hay (el promotor hace pregunta → agente evalúa respuesta).
- Propuesta de ajuste al promotor cada noche.

**🟩 PROMOTOR:**
- Lee el reporte diario (10 min).
- Aprueba o rechaza ajustes (5 min).
- Aporta intuiciones: "¿has visto que mucha gente pregunta por X?" → ajustar keywords.

**Entregable:** Reportes diarios. Ajustes aplicados. Datos acumulándose.

---

### Día 14 — Primera evaluación

**Objetivo:** GO / ITERATE / PIVOT basado en datos.

**🟦 AGENTE:**
- Compila TODOS los datos de los 4 días:
  - CTR, CPC, CPA por clic.
  - Visitas a landing, % que abre el chat.
  - % que completa la recomendación.
  - CTR a enlace de afiliado.
  - Emails capturados.
  - Cualquier conversión si la hay.
- Identifica **el embudo de fuga principal**: ¿dónde se pierde la gente?
- Propone **3 acciones concretas** para la semana 3 si la decisión es ITERATE.
- Si hay señales de GO, propone la siguiente capa.

**🟩 PROMOTOR:**
- Lee el reporte final (20 min).
- Decide:
  - **GO** (10 ventas conseguidas o CTR >15% + tráfico estable) → escalar.
  - **ITERATE** (2-3 métricas fallan pero hay señales positivas) → otra semana de experimentación.
  - **PIVOT** (métricas muy por debajo de umbrales) → cambiar vertical o modelo.
- Aprueba presupuesto para la siguiente fase (si aplica).

**Entregable:** Reporte final con datos. Decisión documentada en `23-decisions-log.md` (D-025).

---

## Criterios de éxito al día 14

| Métrica | Umbral GO | Umbral ITERATE | Umbral PIVOT |
|---|---|---|---|
| Visitas a landing | ≥500 | 200-500 | <200 |
| CTR Google Ads | ≥3% | 1-3% | <1% |
| % que inicia chat | ≥25% | 10-25% | <10% |
| % que completa recomendación | ≥50% | 25-50% | <25% |
| CTR a enlace afiliado | ≥15% | 5-15% | <5% |
| Emails capturados | ≥30 | 10-30 | <10 |
| Ventas de afiliación | ≥10 | 1-10 | 0 |

**Reglas:**
- 4-5 métricas en GO → escalar la siguiente capa.
- 2-3 en GO y resto en ITERATE → otra semana de optimización.
- 1 o menos en GO → PIVOT.

---

## Coste total estimado del plan

| Concepto | Coste |
|---|---|
| Supabase (free) | 0€ |
| GitHub Pages | 0€ |
| MailerLite (free) | 0€ |
| Plausible (trial) | 0€ |
| Dominio (opcional, para landing) | 0-12€ |
| **Google Ads (5 días)** | **50-100€** |
| Amazon Associates / Awin (gratis) | 0€ |
| **TOTAL** | **50-112€** |

**Por debajo del tope de 500€.** Margen amplio para iterar.

---

## Tracking diario (qué mides cada día)

```sql
-- Query rápida en Supabase para el reporte diario
SELECT 
  DATE(created_at) as dia,
  COUNT(DISTINCT session_id) FILTER (WHERE evento = 'page_view') as visitas,
  COUNT(DISTINCT session_id) FILTER (WHERE evento = 'assistant_started') as iniziaron,
  COUNT(DISTINCT session_id) FILTER (WHERE evento = 'assistant_completed') as completaron,
  COUNT(DISTINCT session_id) FILTER (WHERE evento = 'affiliate_clicked') as clicaron_afiliado,
  COUNT(DISTINCT session_id) FILTER (WHERE evento = 'email_captured') as emails
FROM eventos
WHERE created_at > NOW() - INTERVAL '5 days'
GROUP BY 1
ORDER BY 1 DESC;
```

---

## Sincronización diaria (15 min, hora fija)

Cada noche a las 21:00 (o la hora que elijas):

```
15 min de sincronización:

1. ¿Qué hizo el agente hoy? (5 min)
2. ¿Qué hizo el promotor hoy? (5 min)
3. ¿Hay blockers? (3 min)
4. ¿Qué se hace mañana? (2 min)
```

Esto puede ser por escrito (chat), audio, o videollamada. Lo que sea más cómodo. Lo importante es que **no se acumule la desincronización**.

---

## Riesgos del plan y mitigaciones

| Riesgo | Probabilidad | Mitigación |
|---|---|---|
| CPC de Google Ads muy alto en vertical camper | Media | Pausar keywords caras, probar long-tail más específicas. |
| Google Ads no aprueba la cuenta por policies | Baja | Tener landing clara con disclaimers desde el inicio. |
| El LLM alucina en producción | Media | Tests diarios las primeras 2 semanas. Iterar system prompt. |
| Amazon Associates tarda en aprobar | Media | Empezar el alta el día 1. Tener plan B con otros programas. |
| El tráfico llega pero no convierte | Alta | Iterar copy, ajustar keywords, mejorar recomendación. |
| El promotor se desanima si no hay resultados inmediatos | Alta | Recordar que el objetivo es 10 ventas, no 100. Foco en funnel, no en revenue absoluto. |

---

## Qué NO se hace en estos 14 días

❌ Cuenta de usuario obligatoria.
❌ Aplicación móvil.
❌ Knowledge graph formal (más allá de las 30-50 reglas).
❌ API pública.
❌ MCP server.
❌ Multi-país.
❌ Suscripción premium.
❌ Marketplace.
❌ Optimización SEO profunda (después de validar).
❌ Generación masiva de contenido (después de validar).
❌ n8n, Cloudflare Worker, proxy (solo si surge necesidad).

---

## Pendiente inmediato

- [ ] Confirmar fecha de inicio del plan (¿lunes?).
- [ ] Reservar 1 hora diaria para sincronización.
- [ ] Leer este documento completo.
- [ ] Ejecutar Día 1.
