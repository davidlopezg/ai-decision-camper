# 05 · MODELO DE NEGOCIO

> **Estado:** BORRADOR INICIAL — debe refinarse tras experimentos 1–6.
> **Principio rector:** diversificar para no depender de una sola vía.

---

## 1. Vías de monetización (priorizadas)

### Prioridad 1 — Afiliación (rápido, baja fricción)

**Mecánica:**
1. Usuario completa recomendación.
2. Sistema le ofrece productos con enlace afiliado.
3. Usuario clica → va al comercio.
4. Comercio paga comisión si hay compra en ventana de cookie.

**Ventajas:**
- Sin inversión inicial por venta.
- Trackable.
- Sin gestión de cobro, envío, devolución.

**Limitaciones:**
- Comisión baja (Amazon ES 1–3% en muchas categorías).
- Depende del programa que siga abierto.
- El usuario sale de tu web (no construyes relación propia).

**Revenue esperado por vertical** (ver `06-unit-economics.md`):

| Vertical | Affiliate / 1.000 visit. |
|---|---|
| Solar | ~293€ |
| Camper | ~146€ |
| Aerotermia | ~488€ |
| Home gym | ~70€ |
| VE carga | ~94€ |

---

### Prioridad 2 — CPL (alto valor en categorías complejas)

**Mecánica:**
1. Usuario completa recomendación de algo complejo (instalación, proyecto).
2. Aparece CTA: "¿Quieres que un profesional te contacte sin compromiso?"
3. Usuario deja datos (mínimos, RGPD-compliant).
4. Lead se envía al partner (instalador, taller, asesor).
5. Partner paga CPL fijo o % por conversión.

**Ventajas:**
- Revenue alto por lead.
- Construyes relación con partners.
- Diversificación.

**Limitaciones:**
- Necesitas red de partners.
- Compliance RGPD estricto.
- Calidad del lead importa (no quemes partners con leads basura).

**Revenue esperado por vertical** (ver `06-unit-economics.md`):

| Vertical | CPL / 1.000 visit. |
|---|---|
| Solar | ~2.194€ |
| Camper | ~1.170€ |
| Aerotermia | ~2.925€ |
| Home gym | ~439€ |
| VE carga | ~1.463€ |

---

### Prioridad 3 — Servicios propios (cuando haya masa crítica)

- Alquiler de equipamiento (cámaras, drones para creadores).
- Cursos / formación (camperización DIY).
- Informes / consultoría premium (planes a medida).
- Marketplace de servicios (instaladores certificados).

**Cuándo:** fase 2, tras validar el motor.

---

### Prioridad 4 — Recurrencia / LTV (a construir desde el día 1)

- Consumibles (filtros de agua, gas, productos de mantenimiento).
- Accesorios de segunda generación (mejoras).
- Nuevos productos para el mismo vehículo.
- Segundo vehículo.
- Suscripción premium (alertas de precio, configurador avanzado).

**Cómo se activa:** email contextual, retargeting, opcional "guardar configuración".

---

### Prioridad 5 — B2B (futuro)

- "¿Quieres aparecer como proveedor recomendado?" — placement pagado en fichas de producto. **MUY DELICADO** porque puede erosionar confianza.
- Datos de mercado agregados (anónimos) para marcas o instaladores.
- API para partners (acceso a nuestro motor de recomendación).

---

## 2. Lo que NO monetizamos (decisión consciente)

- ❌ Datos personales del usuario (venta a terceros). **Inaceptable** — destruye confianza y viola RGPD.
- ❌ Publicidad display genérica en la web principal. Distrae y erosiona experiencia.
- ❌ Productos que sabemos que no encajan al usuario, **nunca**, aunque paguen más comisión.
- ❌ Publicidad engañosa o "lo más vendido" sesgado.

---

## 3. Pricing interno — cuánto vale un usuario

> Calculado como **LTV estimado a 24 meses**.

### Vertical Camper / Vanlife

| Concepto | Valor |
|---|---|
| Compra inicial media | 1.500€ |
| Comisión efectiva | 5% |
| Revenue inicial | 75€ |
| Recompra esperada en 24 meses (accesorios) | 2× más |
| CPL inicial | 40€ |
| CPL recurrente (instalaciones) | 30€/evento × 0,5 eventos = 15€ |
| **LTV 24 meses estimado** | **~250–350€ / usuario** |

### Vertical Aerotermia (proyección)

| Concepto | Valor |
|---|---|
| Instalación media | 10.000€ |
| Comisión afiliación (si existe) | 250€ |
| CPL instalación | 100€ |
| CPL mantenimiento anual | 20€/año × 5 años = 100€ |
| **LTV 24 meses estimado** | **~400–600€ / usuario** |

### Vertical Solar (proyección)

| Concepto | Valor |
|---|---|
| Instalación media | 6.000€ |
| Comisión afiliación | 150€ |
| CPL instalación | 75€ |
| CPL batería futura | 50€ |
| **LTV 24 meses estimado** | **~275–400€ / usuario** |

---

## 4. Mix objetivo de revenue (año 1, escenario base)

```
Afiliación:           50–60%
CPL:                  30–40%
Servicios propios:    0–5%  (crece año 2)
Recurrencia:          5–10% (efecto LTV)
```

**Año 2+ esperado:**

```
Afiliación:           35–45%
CPL:                  30–40%
Servicios:            10–20%
Recurrencia:          10–20%
```

---

## 5. Dependencias críticas del modelo

| Dependencia | Riesgo | Mitigación |
|---|---|---|
| Comisión de Amazon Associates | Bajo-Medio | Diversificar hacia Awin + CPL directo. |
| Disponibilidad de partners CPL | Alto (al inicio) | Empezar con 2–3 partners manuales. |
| Tráfico cualificado | Alto | Estrategia SEO + contenido orgánico + experiments paid controlados. |
| Calidad de la base de productos | Alto | Catálogo curado, datos verificados. |
| Coste de IA | Bajo | Modelos eficientes, cache de recomendaciones. |

---

## 6. Lo que NO es nuestro modelo

- ❌ **Suscripción al usuario.** No cobramos al usuario por usar el asistente. Monetizamos por su conversión posterior.
- ❌ **Venta directa de productos** (no somos e-commerce). Salvo servicios propios en fase 2.
- ❌ **Marketplace.** No conectamos múltiples vendedores; recomendamos rutas.
- ❌ **Lead-gen masivo y frío.** CPL solo cualificado y contextual.

---

## 7. Pendiente de validación

- [ ] Confirmar que el mix 50/30/20 es realista con datos empíricos del experimento 1.
- [ ] Medir el LTV real tras los primeros 6 meses (no quedarse en proyección).
- [ ] Testear willingness-to-pay del usuario por una "suscripción premium" (encuesta, smoke test).
- [ ] Validar que el modelo funciona con tráfico de pago (no solo orgánico).
