# 13 · RETARGETING

> **Estado:** BORRADOR INICIAL — estrategia básica en MVP, inteligente en fase 2.

---

## 1. Por qué el retargeting es central

> El 95% de los visitantes no convierte en la primera visita. **Sin retargeting, el CAC se dispara.**

El retargeting inteligente diferencia este proyecto de un comparador tonto. El usuario no debe sentir que le perseguimos, sino que le **ayudamos con información nueva**.

---

## 2. Segmentos base (MVP)

| Segmento | Definición | Canal | Mensaje tipo |
|---|---|---|---|
| S1 — Visitó categoría | Vio landing, no completó asistente | Meta retargeting + email (si dejó email) | "Vimos que estabas mirando kits camper. ¿Empezamos?" |
| S2 — Vio producto | Vio ficha de producto | Meta retargeting | "Ese producto sigue disponible. ¿Quieres compararlo con alternativas?" |
| S3 — Completó recomendación | Terminó asistente, vio resultados | Email + Meta | "Guardamos tu configuración. Aquí la tienes." |
| S4 — Clicó afiliado | Fue al comercio | Email | "¿Cómo fue la compra? ¿Necesitas algo complementario?" |
| S5 — No clicó (post-reco) | Terminó asistente, no hizo clic | Email | "¿Sigues dudando? Te enseñamos por qué elegimos esas opciones." |
| S6 — Volvió varias veces | 3+ visitas en 14 días | Email personalizado | "Llevas tiempo investigando. ¿Quieres que te resumamos lo que hemos visto juntos?" |
| S7 — Lead CPL enviado | Pidió contacto profesional | Email | "Tu solicitud está en marcha. ¿Tienes dudas mientras tanto?" |
| S8 — Compró (si tracking) | Conversión confirmada | Email | "Has dado el primer paso. Aquí van ideas para seguir." |

---

## 3. Retargeting INTELIGENTE (fase 2)

Más allá del básico, queremos mensajes **contextuales al perfil**:

### 3.1. Cambio de precio

> *"El producto que miraste [Nevera X] ha bajado de 750€ a 690€ en las últimas 24h. Te avisamos por si te interesa."*

Solo si:
- El usuario lo vio.
- El cambio es > 5%.
- Han pasado < 14 días desde la visita.

### 3.2. Nueva alternativa mejor

> *"Hemos encontrado una alternativa que encaja con tus requisitos y cuesta 180€ menos."*

Cuando:
- El scoring engine detecta un nuevo producto superior para ese perfil.
- El producto es realmente equivalente o mejor.

### 3.3. Incompatibilidad detectada

> *"Detectamos que el producto que elegiste [Placa Y] no funciona bien con tu batería [Batería Z]. Te recomendamos revisar la configuración."*

Cuando:
- Aparece nueva información técnica.
- Cambia el catálogo.

### 3.4. Recurrencia natural

> *"Compraste una nevera hace 60 días. ¿Sabías que el 80% de los usuarios con nevera acaban añadiendo una placa solar en los siguientes 6 meses?"*

Cuando:
- Llega el momento lógico de upgrade.

---

## 4. Canales

### 4.1. Email (primario)

- **Proveedor MVP:** Brevo / MailerLite (RGPD-friendly).
- **Frecuencia:** máximo 2 emails/mes a usuario que no ha convertido.
- **Tono:** valor > venta.
- **Personalización:** nombre, vehículo, presupuesto, último producto visto.

### 4.2. Meta Ads (secundario)

- **Segmentos custom audience** sincronizados vía pixel.
- **Creatividades:** diferentes por segmento (ver `15-content-strategy.md`).
- **Presupuesto MVP:** 5–15€/día.

### 4.3. Google Ads (secundario)

- **Display retargeting** solo si SEO funciona.
- **Customer Match** con emails (sujeto a consentimiento).

### 4.4. Push notifications (fase 2)

- Solo si el usuario las activa explícitamente.

---

## 5. Reglas críticas

1. **Nunca** más de 2 emails comerciales/mes sin consentimiento activo.
2. **Nunca** retargeting sin segmentación (no mostrar anuncios genéricos).
3. **Siempre** opción de baja en cada email (1 click).
4. **Siempre** respetar las preferencias RGPD del usuario.
5. **Nunca** mensajes agresivos ("¡TE QUEDAN 2 HORAS!").
6. **Cada mensaje** debe aportar valor o información nueva.

---

## 6. Ejemplos de email MVP

### Email 1 — Día 0 (al completar asistente)

```
Asunto: Tu configuración camper está lista

Hola {nombre},

Has completado tu recomendación. Aquí la tienes:
- Producto 1: ...
- Producto 2: ...

Ver recomendación completa →

Si quieres que un instalador te contacte, solo tienes que pedirlo aquí.

Un saludo,
[Equipo]
```

### Email 2 — Día 3 (si no ha clicado)

```
Asunto: ¿Dudas con tu configuración?

Hola {nombre},

Vimos que no llegaste a comprar. ¿Quieres que revisemos tu configuración?

- ¿Tienes dudas con algún producto?
- ¿Ha cambiado tu presupuesto?
- ¿Quieres ver otras alternativas?

Responder a este email →

Un saludo,
[Equipo]
```

### Email 3 — Día 14 (cambio de precio o alternativa)

```
Asunto: Novedad en tu configuración

Hola {nombre},

Detectamos un cambio que te interesa:
- [Producto X] ha bajado de {precio_viejo} a {precio_nuevo}.

O bien:
- Hemos añadido una alternativa: [Producto Y] que encaja con tu perfil.

Ver actualización →

Un saludo,
[Equipo]
```

---

## 7. Pendiente

- [ ] Crear las plantillas de email en Brevo/MailerLite.
- [ ] Configurar el pixel Meta y Google.
- [ ] Definir exactamente qué evento dispara cada segmento.
- [ ] Medir la tasa de apertura, clic y conversión de cada email.
