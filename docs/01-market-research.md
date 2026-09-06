# 01 · INVESTIGACIÓN DE MERCADO — Tendencias AI Commerce 2024–2026

> **Estado:** BORRADOR INICIAL — basado en conocimiento del modelo hasta enero 2026.
> **Fuentes citadas:** donde estén disponibles. Las afirmaciones sin fuente se marcan como **HIPÓTESIS** o **PENDIENTE DE VALIDACIÓN**.

---

## ⚠️ Nota epistemológica importante

Mi ventana de conocimiento fiable llega hasta aproximadamente enero 2026. Lo que sé sobre el segundo semestre de 2025 y enero 2026 proviene de:

- Patrones de tendencia consolidados.
- Anuncios públicos de empresas (cuando los hubo).
- Reportes de industria publicados antes de mi corte.

**NO tengo acceso a datos en tiempo real** (Google Trends actual, comisiones vigentes esta semana, tráfico SimilarWeb actualizado a hoy). Por tanto:

- Datos macro (mercado total, crecimiento): **DATO / TENDENCIA** (verificable en informes públicos).
- Datos micro (EPC, conversión exacta, comisiones específicas vigentes hoy): **HIPÓTESIS / NO VERIFICADO HOY** — deben contrastarse antes de tomar decisiones económicas firmes.
- Datos que solo se pueden medir empíricamente (¿la gente clica? ¿convierte?): **PENDIENTE DE EXPERIMENTO**.

---

## 1. Lo que está pasando en Estados Unidos (2024–2026)

> Mercado a observar, no a copiar literalmente. Objetivo: extraer patrones de monetización y comportamiento.

### 1.1. Tendencia macro: "Agentic Commerce"

**DATO VERIFICADO (tendencia):** A partir de 2024, varias empresas de US empezaron a posicionar productos bajo el paraguas de "agentic commerce" — asistentes que toman decisiones de compra (totales o parciales) en nombre del usuario.

**Modelos observados:**

| Empresa / Categoría | Qué hace | Modelo de monetización | Estado |
|---|---|---|---|
| **AI shopping assistants generalistas** (varios) | Chat que compara productos | Affiliate + lead-gen | Activos |
| **Product discovery agents** | Búsqueda conversacional por producto | Affiliate | Activos |
| **Personal shopping stylists** (varios) | Recomendación por estilo/perfil | Affiliate + suscripción | Activos |
| **Comparadores con IA** | Comparativa + ranking | Affiliate | Activos |
| **Creado por retailers** (Amazon Rufus, Walmart Sparky) | Asistente dentro del retailer | Aumento de conversión propio | Activos |
| **Phia** (extensión) | Compara precios mientras navegas | Affiliate + deals | Activo (validar status exacto) |
| **ShopMy** | Plataforma para creators con enlaces shoppable | Fee transaccional + creator earnings | Activo |
| **Bazaarvoice / PowerReviews con IA** | Análisis de reviews con IA | B2B | Activo |

> ⚠️ **PENDIENTE DE VALIDACIÓN:** статус exacto, métricas concretas (MAU, GMV, retención) y rondas de financiación recientes. Tratar como referencia direccional, no benchmark financiero.

### 1.2. Patrones que se repiten

**DATO OBSERVADO:**

1. **El affiliate sigue siendo el motor de monetización principal** en shopping AI. Pocos modelos B2C logran cobrar al usuario directamente.
2. **El usuario no paga por la recomendación**, pero paga con su atención, sus datos y su clic final.
3. **El valor diferencial está en la curación**, no en la información: Internet ya tiene la información; el reto es sintetizarla y personalizarla.
4. **El "verificado" y la trazabilidad** son cada vez más importantes (transparencia editorial, declaración de relaciones comerciales — FTC y, en España, regulación publicitaria).
5. **Las plataformas de agente (ChatGPT, Gemini, Perplexity, Claude) empiezan a tener plugins / acciones de compra**, pero la conversión real desde ahí todavía es marginal.

### 1.3. Protocolos relevantes

- **MCP (Model Context Protocol)** — Introducido por Anthropic en 2024. Estándar abierto para que un modelo exponga herramientas/datos. **HIPÓTESIS operativa:** en 2025–2026 podemos exponer nuestra base de productos como un servidor MCP, lo que permitiría que LLMs externos la consulten. **PERO:** que exista el estándar no garantiza distribución.
- **UCP (Universal Commerce Protocol?)** — Estándares emergentes de commerce agent-ready. **PENDIENTE DE VALIDACIÓN** de nombre exacto y madurez real.
- **Agentic commerce APIs (Google, OpenAI, Stripe, Coinbase)** — Stripe lanzó en 2024 un SDK de "agentic commerce". **PENDIENTE DE VALIDACIÓN** de madurez y casos de uso reales en producción.

---

## 2. Lo que NO está funcionando bien (y por qué importa)

**INTERPRETACIÓN basada en observación del mercado:**

1. **Los chatbots que recomiendan "lo más vendido" o "el más popular" pierden credibilidad rápido.** El usuario percibe que detrás hay marketing.
2. **Los comparadores tradicionales (tabla + filtro) tienen el problema de la parálisis de elección** — demasiadas columnas, demasiadas opciones.
3. **Las recomendaciones sin explicación son ignoradas o desconfiadas.** "Te recomiendo X" sin motivo se descarta.
4. **Los motores de búsqueda verticales (Amazon, Google Shopping) priorizan al vendedor, no al usuario.** El usuario lo sabe.
5. **El SEO programático a escala (generar 10.000 páginas con IA) está siendo devaluado por Google** (helpful content update). Las páginas finas no rankean a largo plazo.

---

## 3. Lo que SÍ está funcionando (señales débiles pero relevantes)

**OBSERVACIÓN:**

1. **Asistentes que hacen preguntas antes de recomendar.** Reducen parálisis y aumentan confianza.
2. **Curación humana + IA.** El editor firma y la IA ayuda a escalar.
3. **Comunidades verticales** (Reddit, Discord, foros) que generan tráfico SEO long-tail real.
4. **Vídeo comparativo honesto.** YouTube sigue siendo top-of-funnel masivo para decisiones de compra.
5. **Email transaccional contextual** ("vimos que miraste X, ha pasado Y") mejor que email promocional genérico.

---

## 4. Oportunidades detectadas en español

> **INTERPRETACIÓN (no dato verificado):** combinación de observación + análisis de huecos.

1. **Escasa oferta de AI shopping vertical en español.** Los comparadores tradicionales están (PcComponentes, Idealo, Kelkoo) pero ninguno combina asistente conversacional + recomendación explicada + afiliación/CPL.
2. **El usuario español desconfía más de las recomendaciones显而易见 de Amazon** porque conoce el sesgo.
3. **Latinoamérica está infraservida por AI commerce.** Las recomendaciones en español-latam son casi inexistentes adaptadas al contexto local.
4. **Categorías con alta complejidad de decisión y poca competencia AI-asistida:** solar doméstico, aerotermia, camperización, instalación de wallbox.
5. **El mercado español de CPL es fuerte** (instalación, reformas, energía, formación) pero fragmentado — los profesionales locales necesitan leads cualificados y los usuarios necesitan orientación.

---

## 5. Riesgos macro del mercado AI commerce

| Riesgo | Probabilidad | Impacto | Comentario |
|---|---|---|---|
| Google introduce una respuesta AI que cubre nuestras keywords | Alta | Alto | Requiere estrategia de marca + comunidad, no solo SEO. |
| Plataformas de agente cierran / cambian acceso API | Media | Alto | Diseño agnóstico, multi-proveedor. |
| Saturación de "AI wrappers" en el usuario | Alta | Medio | Diferenciación = curación + datos propios + comunidad. |
| Regulación publicitaria más estricta (declaración de afiliados, transparencia IA) | Alta | Medio | Compliance como ventaja competitiva. |
| Cambio en comportamiento de búsqueda (zero-click aumenta) | Alta | Alto | Diversificar adquisición (comunidad, email, vídeo). |

---

## 6. Conclusiones — qué llevamos al Decision Report

1. **El modelo affiliate sigue siendo viable** y es el camino más rápido a ingresos.
2. **El CPL es donde está el dinero serio** en categorías complejas (solar, aerotermia, instalación).
3. **El usuario valora la explicación** más que la rapidez.
4. **El SEO programático genérico está muerto**; gana el contenido profundo, verificado y firmado.
5. **MCP / UCP son una oportunidad futura**, no un canal de adquisición ahora.
6. **El mercado español tiene un hueco claro** en vertical specialist AI shopping assistants.
7. **LatAm es la expansión natural**, no opcional.

---

## 7. Pendiente de validación

- [ ] Métricas concretas de Phia, ShopMy y otros (tráfico, conversión).
- [ ] Madurez real de MCP / UCP en producción (enero 2026).
- [ ] Casos de éxito verificables de CPL en España por vertical.
- [ ] Datos actualizados de Google Trends ES por categoría.
- [ ] Comisiones vigentes hoy (no las de hace 6 meses).

Estos puntos se abordarán con los **experimentos 1–6** o con investigación dirigida posterior.
