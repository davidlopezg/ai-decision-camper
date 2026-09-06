# 29 · DÍA 1 — DELIVERABLES

> **Objetivo:** validar el vertical Camper + crear las cuentas + tener Supabase listo.
> **Tiempo del promotor:** 1 hora (10 min leer brief + 50 min crear cuentas).
> **Tiempo del agente:** ya entregado.

---

## ENTREGABLE 1 · Brief de validación del vertical

### ¿Por qué CAMPER / VANLIFE?

**5 razones por las que sí:**

1. **Demanda verificada.** Las búsquedas de "kit camper", "furgoneta camperizar", "nevera portátil furgoneta" son masivas en Google Trends ES y tienen una tendencia creciente sostenida (especialmente post-2022 con el boom de la movilidad alternativa).

2. **Comunidad activa.** Foros (Furgovw con miles de usuarios), YouTubers (El Camperista, Lusocamper, Furgonero), TikTokers (cientos con 10k+), grupos Facebook. El usuario **ya busca ayuda** para decidir.

3. **Decisión no trivial.** El comprador típico no sabe qué necesita exactamente: hay reglas de compatibilidad (nevera ↔ batería ↔ placa), dimensionamiento técnico (consumo + autonomía), restricciones (espacio, presupuesto, normativa). Es exactamente el problema que un decision engine resuelve.

4. **Monetización viable y diversa:**
   - **Afiliación:** Amazon ES tiene catálogo camper amplio (neveras, placas, baterías, menaje). Awin tiene Leroy Merlin, Bricomart. Marcas especializadas (Dometic, Victron) pueden tener programa directo.
   - **CPL:** instaladores de placas solares para furgonetas, talleres de camperización, cursos. Mercado verificado.
   - **Recurrencia:** un usuario que compra una nevera vuelve por placa, luego por batería, luego por cocina. LTV real a 24 meses ≈ 3× primera compra.

5. **Bajo riesgo regulatorio.** No depende de subvenciones cambiantes. No requiere certificación. No hay IVA especial. El producto no cambia cada 6 meses.

**5 razones por las que NO (riesgos):**

1. **AOV bajo por transacción** (~1.500€ vs 6.000€ en solar). Compensado por recurrencia.
2. **Mercado estacional** (verano fuerte, invierno flojo). Compensado por email + retargeting.
3. **Dependencia de Amazon Associates** (comisiones bajas 1-3%). Compensado por mix Awin + CPL.
4. **Ya hay tiendas especializadas** (CamperLam, NathanVan). Pero ninguna tiene asistente IA conversacional + decisión multitienda.
5. **El SEO camper es competitivo** (muchos blogs, foros). Compensado por distribución en YouTube/TikTok donde hay menos saturación de marcas.

### ¿Cuál es la hipótesis más arriesgada?

> **"La gente prefiere una recomendación personalizada y justificada frente a buscar por su cuenta, hasta el punto de hacer clic y comprar."**

Si esta hipótesis falla, **no hay negocio** (da igual el vertical). Si valida, hay base sólida.

### ¿Cómo sabremos en 14 días si funciona o no?

**GO** (escalamos): ≥10 ventas de afiliación o CTR >15% con tráfico estable.
**ITERATE** (otra semana): 2-3 métricas en zona GO, el resto mejorables.
**PIVOT** (cambiamos): <10 ventas y CTR <5% después de 14 días con 50-100€ en ads.

### Decisión recomendada

**CAMPER / VANLIFE** como vertical primario. Si falla la validación, **AEROTERMIA** sería el siguiente candidato (mayor revenue/visitante pero mayor complejidad operativa).

---

## ENTREGABLE 2 · Setup checklist (cuentas a crear)

**Tiempo estimado:** 50-60 minutos.

### Paso 1 · Supabase (15 min)

1. Ir a https://supabase.com → Sign up (con Google o email).
2. New project:
   - Name: `ai-decision-camper`
   - Database Password: **guarda bien este password** (no se recupera).
   - Region: **West EU (Ireland)** o **Central EU (Frankfurt)**.
3. Espera ~2 minutos a que se aprovisione.
4. **Anota:** Project URL y `anon public` key (Settings → API).
5. (Opcional) **Anota:** `service_role` key (NO la pongas en frontend nunca).

### Paso 2 · Ejecutar SQL (5 min)

1. En Supabase, ve a SQL Editor (icono en sidebar).
2. New query.
3. Pega el SQL de `docs/26-integration-guide.md` sección "Setup Supabase" (las 3 tablas con RLS).
4. Click "Run".
5. Verifica que las 3 tablas (`productos`, `leads`, `eventos`) aparecen en Table Editor.

### Paso 3 · Amazon Associates España (10 min)

1. Ir a https://associates.amazon.es → Sign up.
2. Login con cuenta Amazon o crear nueva.
3. Rellenar datos fiscales (nombre, NIF, dirección).
4. Método de pago (cuenta bancaria).
5. Una vez aprobado, **anota tu "Tracking ID"** (parece "afiliado-21" o similar).
6. **Tiempo de aprobación:** hasta 24h normalmente.

### Paso 4 · Awin (15 min)

1. Ir a https://www.awin.com → Sign up como "Advertiser" no, como **"Publisher"**.
2. Rellenar datos de tu web (puedes poner la URL temporal de GitHub Pages o el dominio del proyecto).
3. Una vez aprobada la cuenta, busca programas de estas categorías:
   - Camping / Outdoor / Furgoneta
   - Bricolaje (Leroy Merlin, Bricomart, Aki)
   - Iluminación
   - Neveras y electrodomésticos
4. **Solicita acceso** a cada programa individualmente. Algunos se aprueban auto, otros tardan días.
5. **Tiempo de aprobación:** variable.

### Paso 5 · MailerLite (5 min)

1. Ir a https://www.mailerlite.com → Sign up free.
2. Crear cuenta (hasta 1.000 suscriptores gratis).
3. **Anota:** API Key (Integrations → API).
4. Crea un grupo (lista) llamado "camper-decision".

### Paso 6 · Plausible (5 min)

1. Ir a https://plausible.io → Sign up (14 días trial gratis, luego 9€/mes).
2. Add site: dominio del proyecto (o subdominio temporal).
3. **Anota:** el snippet de código para añadir al `<head>` de la landing.
4. (Alternativa) Self-host: https://plausible.io/docs/self-hosting — más trabajo pero gratis permanente.

### Paso 7 · GitHub Pages (verificación, 5 min)

1. ¿Tienes ya el chat client de tu app de hábitos en GitHub Pages?
2. **Decisión:**
   - **(A)** Crear un repo nuevo `ai-decision-camper` separado (recomendado, más limpio).
   - **(B)** Usar el repo de hábitos con subpath `/camper/`.
   - **(C)** Otro hosting (Netlify, Cloudflare Pages, Vercel).

**Para esta semana, opción A es la más limpia. Tiempo de setup: 5 min.**

### Resumen de cuentas y claves

```
□ Supabase
  · URL: https://xxxxx.supabase.co
  · anon key: eyJ...
  · service_role key: eyJ... (NO exponer)
  · Region: EU ✓

□ Amazon Associates ES
  · Tracking ID: ________________
  · Status: _______________________

□ Awin
  · Publisher ID: ________________
  · Programs solicitados: _______________________
  · Status: _______________________

□ MailerLite
  · API Key: ____________________
  · Lista: camper-decision

□ Plausible
  · Site domain: _________________
  · Snippet instalado: □

□ GitHub
  · Repo: ______________________
  · URL: ______________________
```

---

## ENTREGABLE 3 · Tracking events (lo que mediremos desde el día 1)

Estos 12 eventos ya están contemplados en la tabla `eventos` de Supabase:

| Evento | Cuándo se dispara |
|---|---|
| `page_view` | Carga de landing |
| `chat_opened` | Primera vez que abre el chat |
| `assistant_started` | Primera pregunta enviada |
| `assistant_question` | Cada respuesta del usuario |
| `assistant_completed` | Última pregunta respondida |
| `assistant_abandoned` | Salida sin completar |
| `recommendation_viewed` | Resultados renderizados |
| `product_detail_viewed` | Click en producto |
| `affiliate_clicked` | Click en enlace afiliado |
| `lead_submitted` | CPL enviado |
| `email_captured` | Email dejado |
| `return_visit` | Sesión con cookie existente |

El código de tracking (`analytics.js`) lo entrego en Día 7 cuando construya el chat.

---

## ENTREGABLE 4 · Lo que necesito de vuelta

Cuando termines el setup, mándame:

1. **Confirmación de cuentas creadas** (qué tienes listo y qué falta).
2. **Supabase URL + anon key** (en un mensaje seguro, no las pegues en chat público).
3. **Tu decisión sobre el vertical Camper** (sí / no / cambiar a otro).
4. **Tu decisión sobre GitHub Pages** (opción A / B / C).
5. **Algún comentario o duda** que te haya surgido.

---

## Tu tarde / noche del Día 1

```
□ 1. Lee el brief de validación (5-10 min)
□ 2. Decide el vertical (1 min)
□ 3. Crea las cuentas (50-60 min en total):
     □ Supabase + ejecutar SQL
     □ Amazon Associates
     □ Awin (solicitar acceso a programas)
     □ MailerLite
     □ Plausible
     □ GitHub repo nuevo
□ 4. Mándame el feedback del setup

TIEMPO TOTAL: ~70 minutos.
```

---

## Lo que yo hago en paralelo

Mientras tú creas las cuentas, yo avanzo con las investigaciones del Día 2:

- Lista de 30-50 productos camper candidatos con URLs y precios actuales.
- Análisis de los 5 competidores principales en España.
- Mapeo de programas de afiliación reales disponibles.
- Top 10 keywords long-tail con intención de compra.

Mañana por la mañana tienes todo eso listo para revisar.

---

**Empieza cuando puedas. Si una cuenta tarda o falla, sigue con las demás y avísame al final del día.**
