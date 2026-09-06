# 20 · MVP SCOPE

> **Estado:** DEFINITIVO para MVP tras iteración con el promotor.
> **Stack:** GitHub Pages + Supabase + .md knowledge + LLM browser-direct.
> **Tiempo al MVP:** 1–2 semanas. **Coste:** 0–31€/mes.

---

## 1. Lo que SÍ incluye el MVP

### 1.1. Front

- Landing específica para vertical Camper (en GitHub Pages).
- Chat client adaptado del proyecto de hábitos del promotor.
- Renderizado de recomendaciones con botones de afiliado.
- Disclaimer visible de afiliación + IA.
- Opt-in email (sin checkout, sin cuenta obligatoria).
- Textos legales mínimos enlazados (aviso, privacidad, cookies).
- Banner de cookies (si hay cookies no esenciales).

### 1.2. Backend (lo mínimo)

- **Supabase:** 3 tablas (`productos`, `leads`, `eventos`) con RLS.
- **Knowledge:** `.md` por producto en el repo.
- **LLM:** llamada directa desde el navegador (MVP), con key restringida.
- Sin n8n, sin MCP, sin servidor propio.

### 1.3. Datos

- 30–50 productos camper en Supabase.
- 30–50 `.md` correspondientes en `/knowledge/productos/`.
- 1 system prompt `.md` en `/system-prompts/asesor-camper.md`.

### 1.4. Tracking / Analytics

- Plausible (gratis o trial).
- Tabla `eventos` en Supabase para eventos custom.
- UTM en todas las URLs de afiliado.

### 1.5. Email

- Opt-in conectado a MailerLite o Brevo (gratis hasta 1.000 subs).
- 1 secuencia automática: confirmación al dejar email.

### 1.6. CPL (opcional en MVP, recomendado)

- Formulario de CPL conectado a tabla `leads` de Supabase.
- Sin partner activo al inicio; tabla preparada para cuando llegue.

---

## 2. Lo que NO incluye el MVP

❌ App móvil.
❌ Marketplace.
❌ Checkout propio.
❌ Catálogo de miles de productos.
❌ Knowledge Graph formal.
❌ MCP server.
❌ API pública.
❌ Multi-país activo (LatAm).
❌ Integración con múltiples LLM.
❌ Cuenta de usuario obligatoria.
❌ B2B / colocación patrocinada.
❌ Suscripción premium.
❌ Generación SEO automatizada.
❌ n8n (llega en fase 1).
❌ Proxy backend (llega en fase 1).

---

## 3. Stack técnico (definitivo)

| Capa | Herramienta | Razón |
|---|---|---|
| Front | GitHub Pages + chat client propio | Ya existe, gratis |
| BBDD | Supabase (Postgres free) | REST auto, RLS, escala |
| Knowledge | `.md` en el repo | Editable, versionable |
| LLM | API navegador directa | Velocidad en MVP |
| Email | MailerLite o Brevo | RGPD, gratis |
| Analytics | Plausible | RGPD |
| Deploy | GitHub Actions | gratis |

> Detalle completo de setup: `26-integration-guide.md`.

---

## 4. Coste estimado del MVP

| Concepto | Coste |
|---|---|
| GitHub Pages | 0€ |
| Dominio (opcional) | 0–12€/año |
| Supabase free tier | 0€ |
| MailerLite / Brevo free | 0€ |
| Plausible trial | 0€ |
| LLM API (con límite 30€/mes) | 0–30€/mes |
| **TOTAL mes 1** | **0–42€** |

---

## 5. Cronograma realista (1–2 semanas)

> Asumiendo 6–10 horas/semana del promotor + reutilización del chat client.

| Día | Acción |
|---|---|
| Día 1 | Crear Supabase, ejecutar SQL, copiar keys. Crear cuentas email/analytics. |
| Día 2 | Configurar `.env` local. Testear conexión LLM desde consola del navegador. |
| Día 3 | Adaptar chat client (cargar system prompt, integrar Supabase). |
| Día 4 | Cargar 30 productos en Supabase + 30 `.md` (usar los 3 ejemplos como plantilla). |
| Día 5 | Implementar renderizado de respuesta + CTAs de afiliado. |
| Día 6 | Testear 5 preguntas distintas. Iterar system prompt si hay alucinaciones. |
| Día 7 | Landing simple en GitHub Pages con CTA al chat. |
| Día 8 | Textos legales. Disclaimer. Banner de cookies. |
| Día 9 | GitHub Actions para deploy. Build + deploy a producción. |
| Día 10 | Smoke test final. Compartir con 3 personas de confianza. |
| Día 11–14 | Traer 200–500 primeros visitantes. Medir. |

---

## 6. Definition of Done del MVP

El MVP se considera **completo** cuando:

- ✅ Landing pública en GitHub Pages.
- ✅ Chat funcional con system prompt del asesor camper.
- ✅ Al menos 30 productos en Supabase con su `.md` correspondiente.
- ✅ Al menos 3 preguntas de prueba generan recomendaciones útiles sin alucinaciones.
- ✅ Botones de afiliado funcionales con tracking de clicks.
- ✅ Disclaimer de afiliación visible.
- ✅ Email opt-in funcional.
- ✅ 12 eventos clave registrándose en Supabase.
- ✅ Banner de cookies (si aplica).
- ✅ Textos legales publicados.
- ✅ Dashboard mínimo (Plausible + query a tabla eventos).

El MVP **NO** requiere:

- ❌ Conversiones confirmadas (eso es objetivo del experimento 1).
- ❌ Diseño impecable.
- ❌ Tráfico masivo.

Necesita solo: **alguien entra, pregunta, recibe recomendación, hace algo** (clic, email, lead).

---

## 7. Después del MVP — decisión Go / No-Go

A las 2–4 semanas se evalúa con los gates definidos en `02-vertical-selection.md`:

- ¿Hay demanda? (visitantes únicos)
- ¿Hay engagement? (recomendaciones completadas)
- ¿Hay clics? (CTR a afiliado)
- ¿Hay emails? (opt-in)
- ¿Hay revenue? (algún ingreso confirmado)

**Si ≥ 3 de 5 son positivos** → fase 1 (añadir proxy, MCP, n8n, CPL real).
**Si < 3** → iterar copy / UX o reabrir decisión vertical.

---

## 8. Catálogo inicial (sugerencia de 30 productos)

| Categoría | Productos iniciales |
|---|---|
| Neveras portátiles (3–5) | Dometic CFX3 55, Engel MT45, Dometic CFX3 45, Mobicool MCG15 |
| Placas solares (3–5) | Victron BlueSolar 100W, panel genérico 100W, Victron 175W, panel flexible 100W, panel plegable |
| Baterías auxiliares (3–5) | Varta Dual Purpose AGM 95Ah, Varta AGM 130Ah, LiFePO4 100Ah, Trojan T-105 |
| Inversores (2–3) | Victron Phoenix 12/800, Victron Phoenix 12/1200, genérico onda pura 1000W |
| Reguladores MPPT (2) | Victron SmartSolar 75/15, Victron SmartSolar 100/20 |
| Iluminación LED (3) | Tiras LED 12V, plafones táctiles, flexo USB |
| Cocinas / hornillos (2–3) | Campingaz CV 470 Plus, hornillo portátil cartucho, cocina fija camper |
| Menaje (2) | Set cocina plegable, vaso telescópico |
| Duchas / agua (2) | Ducha portátil 12V, bidón flexible 20L |
| Calefacción (2) | Webasto Air Top 2000 (mención + CPL instalador), calentador gas |
| Aislamiento / ventanas (2) | Ventana Dometic S4, kit aislamiento Kaiflex |
| Accesorios varios (3–5) | Relé inteligente Cyrix, monitor BMV-712, organizador nevera |

Total: ~30 productos. Cada uno con su `.md` siguiendo el formato de los 3 ejemplos en `/knowledge/productos/`.

---

## 9. Roles en el MVP

| Rol | Quién |
|---|---|
| Promotor / decisiones | Tú |
| Adaptación técnica chat client | Tú (reutilizas tu código) |
| Carga de catálogo y `.md` | Tú + agente principal |
| Texto legal | Agente 10 (borrador) + revisión abogado externo antes de lanzar |
| Marketing | Diferido a fase 1 |

---

## 10. Pendiente

- [ ] Crear proyecto Supabase.
- [ ] Configurar variables de entorno.
- [ ] Adaptar chat client con el código de `26-integration-guide.md`.
- [ ] Cargar 30 productos + 30 `.md`.
- [ ] Conseguir Amazon Associates ES aprobado.
- [ ] Solicitar acceso a Awin.
- [ ] Testear 5 preguntas distintas.
- [ ] Deploy a producción.
- [ ] Primer experimento 1.
