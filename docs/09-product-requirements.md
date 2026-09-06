# 09 · PRODUCT REQUIREMENTS

> **Estado:** BORRADOR INICIAL — versión MVP.
> **Sujeto a:** aprobación del Decision Report y resultados del experimento 1.

---

## 1. Requisitos funcionales MVP

### 1.1. Asistente conversacional

- **FR-1:** El asistente debe iniciar con una pregunta abierta sobre el objetivo del usuario.
- **FR-2:** Debe hacer entre 5 y 10 preguntas (rango, no fijo).
- **FR-3:** Debe permitir al usuario saltar preguntas no relevantes.
- **FR-4:** Debe mostrar progreso (ej. "Pregunta 3 de 8").
- **FR-5:** Debe resumir los requisitos al final antes de recomendar.
- **FR-6:** Debe guardar el progreso en sesión / cookie / email.

### 1.2. Catálogo y recomendación

- **FR-7:** El catálogo debe tener al menos 50 productos en MVP.
- **FR-8:** Cada producto debe tener ficha completa (ver `10-product-data-model.md`).
- **FR-9:** El motor debe filtrar por hard constraints.
- **FR-10:** El motor debe puntuar por soft preferences.
- **FR-11:** El motor debe devolver top 1–3 kits / productos con explicación.

### 1.3. Explicación

- **FR-12:** Cada recomendación debe incluir "Te lo recomiendo por" (mínimo 3 razones).
- **FR-13:** Las alternativas descartadas deben incluir "No te recomiendo X por" (mínimo 1 razón).
- **FR-14:** Las razones deben ser específicas al usuario, no genéricas.

### 1.4. Afiliación

- **FR-15:** Cada producto recomendado debe tener un botón de "comprar" que abra la URL afiliada en nueva pestaña.
- **FR-16:** El clic debe disparar el evento `affiliate_clicked`.
- **FR-17:** El sistema debe ser capaz de gestionar múltiples redes (Amazon, Awin, directo).

### 1.5. CPL

- **FR-18:** El usuario debe poder solicitar contacto de un profesional.
- **FR-19:** El formulario debe pedir nombre, email, código postal, breve descripción y consentimiento RGPD.
- **FR-20:** El lead debe entregarse al partner vía email o Sheets.
- **FR-21:** El usuario debe recibir confirmación.

### 1.6. Tracking y analítica

- **FR-22:** Registrar los 12 eventos clave definidos en `08-user-flows.md`.
- **FR-23:** Dashboard con métricas de funnel.
- **FR-24:** Exportación CSV de eventos para auditoría.

### 1.7. Email / retargeting

- **FR-25:** Email de confirmación al completar recomendación (si dejó email).
- **FR-26:** Email de seguimiento a día 3 (si no convirtió).
- **FR-27:** Pixel Meta + Google instalado.
- **FR-28:** Lista de retargeting por segmento.

---

## 2. Requisitos no funcionales

- **NFR-1:** RGPD compliance total.
- **NFR-2:** Tiempo de respuesta del asistente < 3s por pregunta.
- **NFR-3:** Disponibilidad > 99% mensual (objetivo MVP: lo que permita Vercel/Cloudflare).
- **NFR-4:** Coste IA por recomendación < 0,50€.
- **NFR-5:** Catálogo editable sin deploy.
- **NFR-6:** URLs amigables para SEO.
- **NFR-7:** Diseño responsive (móvil primero).
- **NFR-8:** Idiomas: español peninsular MVP. Arquitectura preparada para LatAm.

---

## 3. Fuera de alcance del MVP

❌ Cuenta de usuario obligatoria.
❌ Histórico de recomendaciones sin email.
❌ Marketplace.
❌ App móvil nativa.
❌ Multi-país.
❌ Pago online.
❌ Comparativas automatizadas entre productos.

---

## 4. Pendiente

- [ ] Refinar las preguntas concretas del asistente.
- [ ] Definir el wireframe de cada pantalla.
- [ ] Priorizar features para fase 2.
