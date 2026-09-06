# 08 · USER FLOWS

> **Estado:** BORRADOR INICIAL — pendiente de wireframe + experimentación.
> **Tres flujos críticos:** RECOMENDAR → COMPRAR / RECOMENDAR → NO COMPRAR → RETARGETING / COMPRAR → CROSS-SELL.

---

## Flujo 1 — Recomendación → Compra (camino feliz)

```
[TRÁFICO]
  ↓ Google / TikTok / YouTube / Directo / Email
[LANDING]
  ↓ El usuario lee el pitch + CTA "Configura tu kit"
[INICIO DEL ASISTENTE]
  ↓ Saludo + pregunta 1: "¿Qué quieres conseguir?"
[PREGUNTAS — secuenciales o por bloques]
  ↓ Vehículo, presupuesto, uso, restricciones, prioridades
[REQUISITOS ESTRUCTURADOS]
  ↓ El sistema muestra: "Entendido. Buscas X, con Y, sin Z."
[RESULTADOS]
  ↓ Top 3 configuraciones / productos con explicación
  ↓ "¿Por qué sí?" + "¿Por qué no las alternativas?"
[DETALLE DE PRODUCTO]
  ↓ Ficha + compatibilidades + accesorios complementarios
[CTA — CLICK AFILIADO]
  ↓ "Comprar en [tienda]" / "Quiero que me contacte un instalador"
[FIN — TRACKING]
  ↓ Evento "affiliate_click" o "lead_submitted"
```

---

## Flujo 2 — Recomendación → No compra → Retargeting

```
[FLUJO 1 hasta RESULTADOS]
  ↓
[NAVEGACIÓN / SALIDA]
  ↓ Usuario no clica afiliado / cierra la web
[TRACKING]
  ↓ Segmento: "completó recomendación pero no clicó"
  ↓ Pixel + email (si dejó email opcional) + lista de retargeting
[RETARGETING — día 1–3]
  ↓ Email: "¿Sigues dudando? Aquí tu recomendación guardada."
  ↓ Anuncio contextual: "Vimos que buscabas nevera portátil. Esta semana, -15% en Amazon."
[RETARGETING — día 7–14]
  ↓ Cambio de ángulo: "Otra persona con tu perfil eligió X. ¿Quieres ver por qué?"
  ↓ Nueva pregunta: "¿Tienes alguna duda nueva?"
[RETARGETING — día 30]
  ↓ Si inactivo: "Hemos actualizado tu configuración con productos nuevos. Mira."
  ↓ Si reactiva: volver al flujo 1
```

---

## Flujo 3 — Compra → Cross-sell → Recurrencia

```
[FLUJO 1 → CLICK AFILIADO → COMPRA CONFIRMADA — si tracking]
  ↓
[POST-COMPRA — día 3]
  ↓ Email: "¿Cómo fue la compra? ¿Necesitas accesorios?"
  ↓ Recomendación: "Compraste una nevera. Esto encaja perfecto con ella."
[POST-COMPRA — día 30]
  ↓ "¿Has estrenado ya [producto]? Aquí van 3 consejos."
  ↓ Cross-sell suave: kit de mantenimiento, organizador, etc.
[POST-COMPRA — día 90]
  ↓ "¿Buscas el siguiente paso?"
  ↓ Sugerencia: placa solar, batería auxiliar, mejora.
[POST-COMPRA — día 365]
  ↓ "¿Tu vehículo se ha quedado pequeño? Mira estos modelos."
  ↓ Refuerzo de recurrencia.
```

---

## Flujo 4 — CPL (Solicitud de contacto profesional)

```
[RESULTADOS]
  ↓
[CTA SECUNDARIO]
  ↓ "¿Quieres que un instalador / taller te contacte sin compromiso?"
[FORMULARIO MÍNIMO]
  ↓ Nombre, email, código postal, vehículo (opcional), breve descripción
[CONSENTIMIENTO RGPD]
  ↓ Checkbox obligatorio + link a política
[ENVÍO A PARTNER]
  ↓ Sistema envía lead al partner según zona + categoría
  ↓ Notificación al usuario: "Hemos enviado tu solicitud. Te contactarán en 24–48h."
[SEGUIMIENTO]
  ↓ Día 7: "¿Te contactaron? ¿Cómo fue la experiencia?"
  ↓ Calidad del lead → ajustar partner.
```

---

## Flujo 5 — Cuenta opcional y guardado

```
[USUARIO ACEPTA CREAR CUENTA — opcional]
  ↓ Email + password / magic link
[GUARDAR]
  ↓ Recomendación, vehículo, presupuesto, restricciones
[RE-ENTRADA]
  ↓ "Hola Carlos, ¿quieres retomar tu kit anterior o empezar uno nuevo?"
[ALERTAS]
  ↓ "El producto X ha bajado de precio."
  ↓ "Hay una incompatibilidad con tu config — mira la actualización."
```

> ⚠️ La cuenta opcional es **fase 2**, no MVP. Para el MVP, basta con cookie + email opcional para retargeting.

---

## Eventos clave (tracking)

Eventos mínimos que debe registrar el sistema desde el día 1:

| Evento | Cuándo | Para qué |
|---|---|---|
| `visitor` | Cualquier visita | Base de todo |
| `session_start` | Inicio de sesión | Engagement |
| `category_view` | Visita a landing de categoría | Intención |
| `assistant_started` | Primera pregunta respondida | Engagement |
| `assistant_completed` | Última pregunta respondida | Conversión funnel |
| `assistant_abandoned` | Salida sin completar | Optimización |
| `recommendation_viewed` | Ve resultados | Engagement |
| `product_detail_viewed` | Ve ficha | Intención alta |
| `affiliate_clicked` | Clic en enlace afiliado | Revenue event |
| `lead_submitted` | Envío CPL | Revenue CPL |
| `email_captured` | Deja email (cualquier punto) | LTV base |
| `return_visit` | Vuelve a la web | Engagement |

> Ver `16-analytics.md` para detalle de implementación.

---

## Pendiente

- [ ] Wireframes detallados por flujo (Figma / paper).
- [ ] Definir exactamente qué preguntas hace el asistente (copy + orden).
- [ ] Test del flujo 1 con 5 usuarios reales antes de desarrollo.
- [ ] Confirmar qué eventos se pueden medir realmente con la stack del MVP.
