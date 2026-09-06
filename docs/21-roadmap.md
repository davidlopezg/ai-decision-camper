# 21 · ROADMAP

> **Estado:** ACTUALIZADO tras decisiones D-006, D-011–D-015.
> **Time-to-market:** 1–2 semanas (no meses).
> **Sujeto a:** resultados del experimento 1.

---

## Visión de timeline

```
SEMANA 1–2   → MVP público
MES 1–3      → Optimización, primeros ingresos
MES 3–6      → Escala nacional (España)
MES 6–12     → Segundo vertical o LatAm
MES 12+      → Plataforma multi-vertical / multi-país
```

---

## Fase 0 — Setup (días 1–3)

**Objetivo:** tener Supabase + cuenta LLM + email + analytics configurados.

- [x] Decision Report aprobado.
- [x] Documentación `/docs` completa.
- [x] Guía de integración (`26-integration-guide.md`).
- [ ] Crear proyecto Supabase, ejecutar SQL.
- [ ] Crear cuenta MailerLite o Brevo.
- [ ] Configurar Plausible.
- [ ] Verificar límite de gasto de API LLM.

---

## Fase 1 — MVP público (semana 1–2)

**Objetivo:** validar el bucle tráfico → chat → recomendación → clic.

- [ ] Adaptar chat client con el código de `26-integration-guide.md`.
- [ ] Cargar 30 productos en Supabase.
- [ ] Escribir 30 `.md` de productos (3 ya están listos como plantilla).
- [ ] Landing simple en GitHub Pages con CTA al chat.
- [ ] Disclaimer de afiliación + RGPD visibles.
- [ ] Banner de cookies (si hay cookies no esenciales).
- [ ] Email opt-in funcional.
- [ ] Smoke test con 5 preguntas distintas.
- [ ] Deploy a producción.
- [ ] Compartir con 3 personas de confianza para feedback.

**Exit criteria:**

- 100 visitantes en 14 días.
- 20 recomendaciones completadas.
- ≥ 3 emails capturados.
- ≥ 1 click en afiliado.

---

## Fase 2 — Optimización (semana 3–8)

**Objetivo:** iterar sobre datos reales + activar CPL.

- [ ] Análisis de los 12 eventos.
- [ ] Mejoras en copy + UX según datos.
- [ ] Iterar system prompt si hay alucinaciones.
- [ ] Cargar productos adicionales hasta 50.
- [ ] Solicitar acceso a Awin.
- [ ] Identificar y contactar 2–3 instaladores / talleres para CPL.
- [ ] Activar CPL con 1 partner pionero.
- [ ] Empezar contenido orgánico (blog, TikTok, YouTube opcional).
- [ ] Email de seguimiento a día 3 (secuencia básica).

**Exit criteria:**

- 500 visitantes cualificados/mes.
- Tasa de finalización > 50%.
- CTR afiliado > 10%.
- 5+ leads CPL enviados.

---

## Fase 3 — Escala nacional (mes 3–6)

**Objetivo:** consolidar el vertical primario en España.

- [ ] Cloudflare Worker como proxy para esconder la API key.
- [ ] MCP de Supabase para queries más limpias.
- [ ] n8n para workflows async (email, CPL, retargeting).
- [ ] 100+ productos en catálogo.
- [ ] 20+ páginas SEO publicadas.
- [ ] Presencia en YouTube + TikTok con cadencia.
- [ ] 5+ partners CPL activos.
- [ ] Cuenta de usuario opcional.
- [ ] Guardado de configuraciones.
- [ ] Retargeting inteligente.

**Exit criteria:**

- 2.000+ visitantes/mes.
- Revenue mensual estable > 1.000€.
- LTV validado.

---

## Fase 4 — Decisión estratégica (mes 6–12)

**Decisión:** ¿qué hacer?

| Opción | Criterio |
|---|---|
| **Añadir 2º vertical (Aerotermia)** | Si Camper funciona y hay capacidad operativa. |
| **LatAm (México primero)** | Si Camper valida bien y hay recursos. |
| **Profundizar en Camper** | Si el vertical tiene aún recorrido. |
| **Pivotar el modelo** | Si las cifras no validan. |

---

## Fase 5 — Expansión (mes 12–24)

**Hipótesis:** validación sólida en España → expansión.

**Orden propuesto:**

1. México (mayor mercado hispanohablante, cultura camper en crecimiento).
2. Colombia.
3. Chile.
4. Argentina.
5. Resto LatAm.

**Adaptaciones por país:**

- Idioma (variantes).
- Catálogo local.
- Afiliados locales.
- Moneda.
- CPL / partners locales.
- Normativa local.

---

## Fase 6 — Plataforma (mes 18+)

**Hipótesis:** el modelo valida → convertir en plataforma multi-vertical / multi-país.

- Knowledge Graph formal.
- MCP server público.
- API para partners.
- Marketplace de partners certificados.
- Datos de mercado agregados para B2B.

---

## Criterios de pausa o cierre

El proyecto se pausa o cierra si:

1. **Mes 2:** < 200 visitantes/mes.
2. **Mes 4:** < 5.000€ revenue acumulado.
3. **Mes 6:** CAC > LTV.
4. **Cualquier momento:** cambio regulatorio crítico que invalide el modelo.

---

## Cambios respecto a la versión anterior

| Antes | Ahora |
|---|---|
| MVP en 6–8 semanas | MVP en 1–2 semanas |
| Coste MVP < 500€ | Coste MVP 0–42€ |
| Stack Next.js + n8n + Airtable | Stack GitHub Pages + Supabase + .md + LLM directo |
| Necesita desarrollador externo | Solo el promotor + agente |
| Coste mensual 40–170€ | Coste mensual 0–31€ |

> **Lección:** validar primero con lo que ya existe. Invertir en infraestructura solo cuando el negocio lo justifique.

---

## Pendiente inmediato (esta semana)

- [ ] Crear proyecto Supabase (15 min).
- [ ] Ejecutar SQL (5 min).
- [ ] Configurar GitHub Actions con secrets (15 min).
- [ ] Adaptar chat client (1–2 horas).
- [ ] Cargar 10 productos iniciales + sus `.md` (2 horas).
- [ ] Smoke test con 5 preguntas (30 min).
- [ ] Deploy a producción (15 min).
