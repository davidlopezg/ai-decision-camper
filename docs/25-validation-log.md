# 25 · VALIDATION LOG

> Registro de cada experimento diseñado y ejecutado.
>
> **⚠️ CAMBIO IMPORTANTE (D-024):** El antiguo Experimento 0 (manual, 20 entrevistas) ha sido **descartado**. Se reemplaza por el **Plan Operativo de 14 Días** documentado en `28-14-day-plan.md`. La validación se hace con tráfico real de Google Ads, no con entrevistas.

---

## PLAN 14 DÍAS — Validación con tráfico real

| Campo | Contenido |
|---|---|
| **Estado** | Pendiente. Plan completo en `28-14-day-plan.md`. |
| **Coste estimado** | 50–112€ (principalmente Google Ads) |
| **Duración** | 14 días (5-10 h/semana del promotor) |
| **Hipótesis** | Hay demanda real de recomendaciones especializadas de equipamiento camper en España. El funnel de tráfico pagado → chat → recomendación → clic en afiliado produce conversiones rentables. |

### Por qué importa

Si este plan valida, sabemos que **la tesis del proyecto funciona** y podemos invertir en la siguiente capa (más productos, más contenido, mejor motor). Si no valida, lo sabemos en 2 semanas por menos de 100€.

### Diseño (resumen)

| Fase | Días | Qué se hace |
|---|---|---|
| **0 · Decisiones** | 1-2 | Vertical + setup + investigación |
| **1 · Catálogo y reglas** | 3-5 | 30-50 productos en Supabase + `.md` + 20-50 reglas |
| **2 · Construir MVP** | 6-9 | Landing + chat + tracking + textos legales |
| **3 · Tráfico real** | 10-14 | Google Ads + medir + iterar + decisión final |

### Métricas a recoger (todo en Supabase tabla `eventos`)

- Visitas únicas a landing.
- % que inicia el chat.
- % que completa la recomendación.
- CTR a enlace de afiliado.
- Emails capturados.
- Conversiones (cuando se confirmen).
- Revenue real (cuando llegue).

### Criterios de decisión al día 14

| Resultado | Decisión |
|---|---|
| ≥10 ventas o CTR >15% con tráfico estable | **GO** — escalar siguiente capa. |
| Métricas mixtas (2-3 en zona GO, resto en ITERATE) | **ITERATE** — otra semana de optimización. |
| Métricas muy por debajo de umbrales | **PIVOT** — cambiar vertical o modelo. |

### Detalle completo

Ver `docs/28-14-day-plan.md` con día a día, qué hace el agente, qué hace el promotor, entregables.

---

## EXPERIMENTOS POSTERIORES (solo si el plan de 14 días valida)

### Experimento A — CPL con partner real

| Campo | Contenido |
|---|---|
| **Estado** | Pendiente. **Solo si el plan de 14 días valida.** |
| **Coste** | 50–150€ |
| **Duración** | 2–4 semanas |
| **Hipótesis** | Hay partners de instalación / taller camper que pagan CPL por leads cualificados. |

### Diseño

1. Identificar 5-10 candidatos (instaladores placas furgoneta, talleres camperización).
2. Contactar, presentar el proyecto.
3. Negociar CPL con 1-2 partners pioneros.
4. Activar formulario CPL en la landing.
5. Enviar leads manualmente.

### Métricas

- Partners contactados / cerrados.
- CPL medio negociado.
- Leads enviados.
- Calidad del lead (feedback partner).

### Criterio

- ≥1 partner con CPL firmado.
- CPL ≥ 30€.
- ≥5 leads enviados en 30 días.

---

### Experimento B — Tráfico orgánico (SEO + YouTube/TikTok)

| Campo | Contenido |
|---|---|
| **Estado** | Pendiente. **Solo si el plan de 14 días valida.** |
| **Coste** | Bajo (tiempo del promotor) |
| **Duración** | 4-8 semanas |
| **Hipótesis** | El SEO + contenido orgánico en YouTube / TikTok trae tráfico cualificado sostenible para camper. |

### Diseño

1. Análisis de keywords long-tail con baja competencia.
2. Publicar 10-15 páginas SEO (configuraciones, comparativas, guías).
3. Crear 1 cuenta TikTok + 1 YouTube.
4. Publicar 3-5 vídeos/semana.

### Métricas

- Posiciones SERP.
- Tráfico orgánico.
- Reproducciones, suscriptores.
- CTR a landing.
- Conversión a recomendación.

### Criterio

- ≥100 visitas orgánicas/mes en 8 semanas.
- ≥1000 reproducciones medias por vídeo en 4 semanas.

---

### Experimento C — Escalar tráfico de pago

| Campo | Contenido |
|---|---|
| **Estado** | Pendiente. **Solo si los experimentos A/B validan.** |
| **Coste** | 300-1000€ |
| **Duración** | 4 semanas |
| **Hipótesis** | El modelo permite escalar tráfico de pago con CAC < 150€ / usuario cualificado. |

### Diseño

1. Aumentar presupuesto Google Ads.
2. Test nuevas keywords y audiencias.
3. Medir CPA por recomendación completada.
4. Optimizar embudo.

### Métricas

- CPA por recomendación completada.
- CPA por email capturado.
- CPA por clic afiliado.
- ROI global.

### Criterio

- CPA por recomendación < 5€.
- CPA por email < 15€.
- ROI positivo.

---

### Experimento D — Segundo vertical (Aerotermia)

| Campo | Contenido |
|---|---|
| **Estado** | Pendiente. **Solo si todo lo anterior valida y el promotor tiene capacidad.** |
| **Coste** | 200-500€ |
| **Duración** | 6-8 semanas |
| **Hipótesis** | El modelo "decision engine" es replicable en otro vertical de alta complejidad. |

### Diseño

1. Validar aerotermia con 10 búsquedas reales (¿hay demanda?).
2. Identificar 20-30 productos y 3-5 partners CPL.
3. Crear landing mínima.
4. Medir con tráfico pequeño.

---

## Pendiente

- [ ] Confirmar fecha de inicio del plan de 14 días.
- [ ] Leer `28-14-day-plan.md` completo antes del Día 1.
- [ ] Reservar tiempo diario del promotor (1h mínimo).
