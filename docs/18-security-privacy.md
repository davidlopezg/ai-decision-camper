# 18 · SECURITY & PRIVACY

> **Estado:** BORRADOR INICIAL — el cumplimiento RGPD es innegociable desde el día 1.

---

## 1. Marco legal aplicable

- **RGPD (UE 2016/679)** — Reglamento General de Protección de Datos.
- **LOPDGDD (Ley Orgánica 3/2018)** — Adaptación española.
- **LSSI (Ley 34/2002)** — Servicios de la sociedad de la información.
- **Reglamento ePrivacy** — Cookies y marketing digital.
- **AI Act (UE 2024)** — Obligaciones específicas para sistemas de IA.
- **Código de Conducta Publicidad** — Declarar claramente la afiliación (recomendable).

---

## 2. Datos que tratamos

### 2.1. Datos no personales

- Cookies técnicas.
- Datos de navegación agregados.
- Eventos de interacción.

### 2.2. Datos personales

- Email (si el usuario lo deja).
- Nombre (solo si deja lead CPL).
- Código postal (solo si deja lead CPL).
- Teléfono (opcional).
- Preferencias declaradas en el asistente.

### 2.3. Datos especialmente protegidos

❌ No tratamos: salud, ideología, religión, orientación sexual, datos bancarios.

---

## 3. Base jurídica

| Tratamiento | Base jurídica |
|---|---|
| Cookies técnicas | Interés legítimo |
| Cookies analíticas (anonimizadas) | Consentimiento |
| Cookies de marketing | Consentimiento explícito |
| Email guardado por usuario | Consentimiento |
| Lead CPL con datos personales | Consentimiento explícito + información clara |
| Retargeting por email | Consentimiento |
| Retargeting por Meta/Google | Consentimiento |

---

## 4. Consentimiento

### 4.1. Banner de cookies

- Aparece en primera visita.
- **No** usar dark patterns (no "rechazar" oculto).
- Opciones: Aceptar / Rechazar / Configurar.
- Cookies no esenciales NO se cargan hasta consentimiento.
- Botón "Rechazar todo" igual de visible que "Aceptar".

### 4.2. Consentimiento CPL

```
□ Acepto que mis datos sean enviados al partner [nombre] para que me contacte.
□ Quiero recibir comunicaciones comerciales de [proyecto].
```

> Sin la primera checkbox, **no se envía el lead**.

### 4.3. Email opt-in

```
□ Quiero recibir comunicaciones del proyecto.
```

---

## 5. Obligaciones informativas

### 5.1. Política de privacidad

Debe incluir:
- Responsable del tratamiento.
- Finalidades.
- Base jurídica.
- Destinatarios (programas de afiliación, partners CPL).
- Transferencias internacionales (LLM en US: SCC + garantías).
- Plazo de conservación.
- Derechos del usuario (acceso, rectificación, supresión, oposición, portabilidad, limitación).
- Cómo ejercerlos (email).
- Reclamación ante AEPD.

### 5.2. Aviso legal

- Identificación del titular.
- Actividad.
- Limitación de responsabilidad.
- Propiedad intelectual.

### 5.3. Política de cookies

- Tipos de cookies.
- Finalidad.
- Duración.
- Terceros.
- Cómo desactivarlas.

### 5.4. Transparencia publicitaria

En cada producto recomendado, declarar:

> *"Este producto enlaza a un programa de afiliación. Si compras a través de nuestro enlace, podemos recibir una comisión sin que afecte al precio."*

### 5.5. Disclaimer IA

> *"Las recomendaciones se generan con asistencia de inteligencia artificial y se verifican contra nuestra base de datos. La última verificación fue el [fecha]. Esta información no sustituye al criterio de un profesional."*

---

## 6. Transferencias internacionales

| Destino | Mecanismo |
|---|---|
| LLM en US (OpenAI, Anthropic) | Cláusulas Contractuales Tipo + DPA firmado |
| Google / Meta | SCC + configuración RGPD en cuentas publicitarias |
| Email (Brevo) | Servidor EU |

> **Verificar** que cada proveedor cumple SCC y DPA firmados.

---

## 7. Seguridad técnica

- HTTPS obligatorio.
- Headers de seguridad (CSP, HSTS, X-Frame-Options).
- Sanitización de inputs.
- Rate limiting.
- Logs sin datos personales.
- Secretos en env vars.
- Backups cifrados.

---

## 8. Plan de respuesta a incidente

1. Detección (monitorización).
2. Contención (parar acceso, aislar sistema).
3. Evaluación (qué datos, cuántos usuarios).
4. Notificación a AEPD en 72h si hay riesgo alto.
5. Notificación a usuarios si procede.
6. Remedición + análisis post-mortem.

---

## 9. Pendiente

- [ ] Contratar revisión legal externa antes de lanzamiento.
- [ ] Redacción final de textos legales por abogado.
- [ ] Firmar DPAs con proveedores.
- [ ] Configurar banner de consentimiento (Cookiebot / CookieYes / propio).
- [ ] Alta de ficheros (si aplica) ante AEPD.
