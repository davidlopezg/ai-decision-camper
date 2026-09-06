# 24 · ASSUMPTIONS LOG

> Formato: ASSUMPTION · STATUS · VALIDACIÓN · IMPACTO SI FALLA

> **⚠️ Regla:** ninguna hipótesis se convierte en verdad por estar usada en una simulación. Todas deben validarse con experimentos.

---

## A-001 — Vertical Camper tiene demanda suficiente en España

| Campo | Contenido |
|---|---|
| Assumptions | Hay demanda suficiente de usuarios buscando información y productos de camper / vanlife en España. |
| Status | HIPÓTESIS |
| Datos que la sugieren | Tendencia creciente post-2020. Presencia de grandes influencers. Comunidades activas. Mercado secundario robusto. |
| Validación | Experimento 1: tráfico SEO + medición de recomendaciones iniciadas. |
| Impacto si falla | Si no hay demanda, no hay revenue. Reabrir decisión vertical. |

---

## A-002 — AOV de productos camper = 1.500€

| Campo | Contenido |
|---|---|
| Assumptions | La compra media por usuario único (primer kit) ronda 1.500€. |
| Status | HIPÓTESIS |
| Validación | Análisis del ticket medio real en Amazon ES para categorías camper + validación con tienda especializada. |
| Impacto si falla | Revenue/visitante cambia proporcionalmente. |

---

## A-003 — Comisión efectiva de afiliación Camper = 5%

| Campo | Contenido |
|---|---|
| Assumptions | Combinando Amazon Associates + Awin + programas directos, la comisión efectiva media será del 5%. |
| Status | HIPÓTESIS |
| Validación | Mapear comisiones reales por categoría en Amazon ES + Awin tras acceso. |
| Impacto si falla | Revenue afiliación cambia proporcionalmente. Si baja a 3%, revenue cae 40%. |

---

## A-004 — CPL medio Camper = 40€

| Campo | Contenido |
|---|---|
| Assumptions | Un lead cualificado de servicio camper vale 40€ para el partner. |
| Status | HIPÓTESIS |
| Validación | Contactar 5–10 talleres / instaladores reales y sondear willingness-to-pay. |
| Impacto si falla | Si CPL real es 20€, revenue cae 50%. Si es 60€, sube 50%. |

---

## A-005 — Tasa de inicio del asistente = 30%

| Campo | Contenido |
|---|---|
| Assumptions | De cada 100 visitantes cualificados, 30 inician el asistente. |
| Status | HIPÓTESIS |
| Validación | Experimento 1: medir tras 1.000 visitantes. |
| Impacto si falla | Lineal sobre todo el funnel. |

---

## A-006 — Tasa de finalización del asistente = 65%

| Campo | Contenido |
|---|---|
| Assumptions | De los que inician, 65% completan. |
| Status | HIPÓTESIS |
| Validación | Experimento 1. |
| Impacto si falla | Muy sensible. Si baja a 40%, revenue cae 38%. |

---

## A-007 — CTR hacia afiliado = 25%

| Campo | Contenido |
|---|---|
| Assumptions | De los que completan la recomendación, 25% clican al menos un enlace afiliado. |
| Status | HIPÓTESIS |
| Validación | Experimento 1. |
| Impacto si falla | Lineal. |

---

## A-008 — Conversión del comercio destino = 4%

| Campo | Contenido |
|---|---|
| Assumptions | El 4% de los clics en afiliado terminan en compra. |
| Status | HIPÓTESIS |
| Validación | Datos de programa afiliado + experimento 1. |
| Impacto si falla | Lineal sobre revenue afiliación. |

---

## A-009 — Tasa CPL (lead submission) = 15%

| Campo | Contenido |
|---|---|
| Assumptions | El 15% de los que completan dejan sus datos para CPL. |
| Status | HIPÓTESIS |
| Validación | Experimento 1 + 2. |
| Impacto si falla | Muy sensible. Si baja a 5%, revenue CPL cae 67%. |

---

## A-010 — LTV Camper a 24 meses = 300€

| Campo | Contenido |
|---|---|
| Assumptions | Un usuario cualificado genera 300€ en 24 meses combinando afiliación + CPL + recurrencia. |
| Status | HIPÓTESIS |
| Validación | Medición continua desde mes 6. |
| Impacto si falla | Determina CAC máximo permitido. |

---

## A-011 — Coste IA por recomendación = 0,40€

| Campo | Contenido |
|---|---|
| Assumptions | Una recomendación completa cuesta 0,40€ en API de LLM (input + output tokens). |
| Status | SUPOSICIÓN |
| Validación | Test con Claude / GPT-4o-mini y conteo real de tokens. |
| Impacto si falla | Lineal sobre coste. Si sube a 1€, margen cae de 1,04€ a 0,44€/visitante. |

---

## A-012 — Se puede validar el modelo con < 500€ en 8 semanas

| Campo | Contenido |
|---|---|
| Assumptions | El MVP completo (landing + asistente + tracking) es viable con menos de 500€ en coste directo. |
| Status | SUPOSICIÓN |
| Validación | Tras 8 semanas, comparar coste real vs presupuesto. |
| Impacto si falla | Si es más caro, requiere recortar scope o aumentar presupuesto. |

---

## A-013 — Hay ≥ 5 partners CPL serios contactables en Camper ES

| Campo | Contenido |
|---|---|
| Assumptions | Existen al menos 5 instaladores / talleres camper en España dispuestos a pagar CPL. |
| Status | HIPÓTESIS |
| Validación | Contactar 10 candidatos. |
| Impacto si falla | Si no hay partners, CPL = 0. Motor queda en afiliación pura. |

---

## A-014 — El tráfico SEO orgánico es viable en 6–12 meses

| Campo | Contenido |
|---|---|
| Assumptions | Es posible rankear en Google ES para keywords long-tail de configuración camper en 6–12 meses. |
| Status | HIPÓTESIS |
| Validación | Análisis de keywords + auditoría de competidores en SEO. |
| Impacto si falla | Aumenta dependencia de paid traffic. Sube CAC. |

---

## A-015 — LLM mainstream puede producir recomendaciones seguras y explicadas

| Campo | Contenido |
|---|---|
| Assumptions | Un LLM de 2025, con function calling + buen prompt, puede producir recomendaciones útiles sin inventar specs críticas. |
| Status | SUPOSICIÓN |
| Validación | Test A/B con usuarios reales. |
| Impacto si falla | Calidad del producto cae. Hay que volver a plantillas o invertir más en prompt engineering. |

---

## A-016 — RGPD permite el modelo con consentimiento explícito

| Campo | Contenido |
|---|---|
| Assumptions | El modelo de tracking + email + retargeting es RGPD-compliant si se implementa correctamente. |
| Status | SUPOSICIÓN |
| Validación | Revisión con abogado / DPO externo (fase 2 si el proyecto avanza). |
| Impacto si falla | Obliga a rediseñar tracking. Reduce CPL y email LTV. |

---

## A-017 — La expansión a LatAm es viable tras validar ES

| Campo | Contenido |
|---|---|
| Assumptions | Tras validar ES, replicar el modelo en MX / CO / AR / CL tiene sentido económico. |
| Status | HIPÓTESIS |
| Validación | Análisis específico de cada país cuando llegue fase 2. |
| Impacto si falla | Reduce TAM total. |

---

## Pendiente

- [ ] Convertir cada A-XXX en una métrica concreta a medir en experimento 1.
- [ ] Revisar trimestralmente cuáles siguen vigentes y cuáles deben corregirse.
