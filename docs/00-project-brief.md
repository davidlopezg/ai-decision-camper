# 00 · PROJECT BRIEF

> **Estado:** BORRADOR INICIAL — Pendiente de validación con el promotor del proyecto.
> **Versión:** 0.1
> **Última actualización:** Fase 0 (pre-investigación)

---

## 1. Nombre provisional

**AI DECISION COMMERCE** (nombre comercial pendiente).

También referido internamente como **"Motor de Decisión de Compra"** o **"Asistente de Compra Inteligente"**.

---

## 2. Visión

Convertirse en el **experto digital de confianza** que ayuda a una persona concreta a decidir qué necesita comprar dentro de un problema o categoría específica — empezando por el mercado español y expandiéndose después a Latinoamérica.

No somos una tienda. No somos un comparador tradicional. No somos un chatbot generalista.

**Somos un asistente especializado que convierte una necesidad difusa en una recomendación justificada, trazable y rentable.**

---

## 3. Misión del MVP

Demostrar, antes de invertir en ingeniería pesada, que existe:

1. una demanda real de recomendación estructurada en un vertical concreto;
2. una vía de monetización viable (afiliación + CPL);
3. un ciclo de tráfico → recomendación → clic → conversión rentable;
4. una base de conocimiento mantenible con herramientas accesibles (no-code + agentes).

---

## 4. Modelo de negocio objetivo

```
TRÁFICO
  → USUARIO CON UNA NECESIDAD
  → ASISTENTE DE IA
  → PREGUNTAS PARA ENTENDER SU SITUACIÓN
  → REQUISITOS ESTRUCTURADOS
  → MOTOR DE MATCHING
  → PRODUCTOS/SERVICIOS RECOMENDADOS
  → ENLACES DE AFILIACIÓN / LEADS
  → COMISIÓN
  → TRACKING
  → RETARGETING
  → NUEVAS COMPRAS / RELACIÓN A LARGO PLAZO
```

**Vías de monetización priorizadas:**

1. Afiliación (click → compra → comisión)
2. CPL (presupuesto, instalación, financiación, taller)
3. Servicios (cuando aplique)
4. Leads cualificados
5. Suscripciones premium (futuro)
6. B2B (futuro)

---

## 5. Mercado objetivo

**Fase 1:** España.
**Fase 2:** México → Colombia → Chile → Argentina → resto LatAm.

Idioma inicial: español (variante peninsular).
Arquitectura multi-país desde el día 1 (no por contenido, sí por datos).

---

## 6. Categorías candidatas

1. Energía solar doméstica + baterías
2. Camper / vanlife
3. Home gym premium
4. Aerotermia / climatización
5. Vehículos eléctricos / carga doméstica

La elección del vertical inicial está documentada en `02-vertical-selection.md` y resumida en `DECISION-REPORT.md`.

---

## 7. Principios rectores

1. **No programar antes de validar.** Investigación → decisión → MVP mínimo → primer experimento → optimización.
2. **Documentar cada decisión** con fecha, motivo, datos y riesgo.
3. **Distinguir dato verificado de hipótesis.** Nunca presentar una hipótesis como verdad.
4. **Confianza antes que comisión.** Si un producto paga más pero es peor para el usuario, se descarta o se順位 con motivo explícito.
5. **IA para comprender y explicar, no para inventar.** Datos críticos (precios, compatibilidades, certificaciones) siempre desde fuente estructurada.
6. **No-code + agentes primero.** Solo construir ingeniería pesada cuando el negocio esté demostrado.

---

## 8. Stack previsto (orientativo, no definitivo)

**Fase 0–1 (validación):**

- Front: Next.js o Webflow + CMS sencillo (Headless o no-code).
- Catálogo: Airtable / Sheets / Postgres.
- Orquestación: n8n / Make.
- IA: API de un LLM líder (con prompt + function calling).
- Analítica: Plausible / PostHog / GA4 según RGPD.
- Email: Brevo / MailerLite / Resend.
- Pagos/CMS: Stripe + Shopify (si se justifica).

**Fase 2+ (escala):**

- Backend propio, Knowledge Graph, MCP server, integración con plataformas de agente.

La decisión tecnológica final está en `17-technical-architecture.md` (pendiente).

---

## 9. Riesgos estructurales

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| El vertical elegido no tiene monetización suficiente | Media | Alto | Validar con matriz + experimento 1 antes de invertir. |
| Cambio regulatorio (subvenciones, normativa) | Alta (en solar/aerotermia) | Alto | Arquitectura multi-país + monitor normativo. |
| Competidor copia el modelo | Media | Medio | Velocidad + datos propios + comunidad. |
| Afiliados cierran el programa | Baja-Media | Medio | Diversificar redes + CPL directo. |
| Proveedor de IA cambia precios/condiciones | Media | Medio | Diseño agnóstico de proveedor. |
| RGPD / sanción | Baja | Muy alto | DPO externo + privacy by design. |

---

## 10. Gobernanza del proyecto

- **Promotor (tú):** decisiones estratégicas, approve/reject de hipótesis, asignación de recursos.
- **Agente principal (yo):** investigación, documentación, propuesta, ejecución técnica y operativa.
- **Agentes especializados (10):** investigación, afiliación, producto, SEO, UX, desarrollo, QA, analítica, retargeting, legal/seguridad.

Cada agente tiene un documento /docs de responsabilidad.

---

## 11. Lo que NO es este proyecto

- ❌ Una tienda online tradicional.
- ❌ Un chatbot genérico que recomienda cosas.
- ❌ Un comparador de precios clásico (PcComponentes, Idealo).
- ❌ Un marketplace.
- ❌ Una red de afiliados al estilo Awin.
- ❌ Un proyecto que asume tráfico porque "el SEO ya vendrá".

---

## 12. Próximo paso inmediato

Leer `DECISION-REPORT.md` y aprobar / rechazar / pedir más datos sobre la recomendación de vertical.

Si se aprueba: arrancar `EXPERIMENTO 1` documentado en `25-validation-log.md`.
