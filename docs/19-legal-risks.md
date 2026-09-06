# 19 · RIESGOS LEGALES

> **Estado:** BORRADOR INICIAL — pendiente de revisión por abogado antes de lanzamiento.

---

## 1. Riesgos principales

### 1.1. Responsabilidad por recomendación defectuosa

**Riesgo:** el usuario compra un producto recomendado por nosotros, le causa daño (nevera que se rompe, instalación eléctrica incorrecta, etc.) y nos reclama.

**Mitigación:**

- Disclaimer explícito en cada recomendación.
- Datos estructurados fuente (no inventados por IA).
- Actualización frecuente del catálogo.
- Verificación humana de fichas de producto antes de publicarlas.
- Limitación de responsabilidad en aviso legal.
- Considerar seguro de responsabilidad civil profesional en fase 2.

**Probabilidad:** Media.
**Impacto:** Alto si ocurre.

---

### 1.2. Transparencia publicitaria / afiliación

**Riesgo:** no declarar adecuadamente que un enlace es de afiliación.

**Marco legal:**

- RGPD + LSSI obligan a informar.
- Código de conducta publicitario (Autocontrol).
- Recomendación: declarar **siempre** la naturaleza comercial del enlace.

**Mitigación:**

- Aviso visible en landing y en cada CTA.
- Texto estándar en cada producto recomendado.

**Probabilidad:** Baja si se implementa bien.
**Impacto:** Medio.

---

### 1.3. RGPD / sanciones

**Riesgo:** sanción por tratamiento indebido de datos.

**Mitigación:**

- Cumplimiento desde el diseño.
- Banner de consentimiento real.
- Textos legales revisados.
- DPO o consultoría externa en fase con ingresos.

**Probabilidad:** Baja si se cumple.
**Impacto:** Muy alto (hasta 4% facturación global o 20M€).

---

### 1.4. Propiedad intelectual

**Riesgo:** uso de imágenes, descripciones o marcas sin permiso.

**Mitigación:**

- Imágenes: usar solo de fuentes con derecho (marcas, prensa, banco de imágenes).
- Descripciones: redactar propias o citar fuentes.
- Marcas: mencionar con fines informativos (uso legítimo).
- Logos: solo con permiso escrito.

**Probabilidad:** Media.
**Impacto:** Medio.

---

### 1.5. Competencia desleal

**Riesgo:** una web competidora nos reclama por copiar contenido o posicionamiento.

**Mitigación:**

- Crear contenido propio.
- Citar fuentes cuando se usen datos de terceros.
- Evitar scraping automatizado.

**Probabilidad:** Baja.
**Impacto:** Medio.

---

### 1.6. AI Act (UE)

**Riesgo:** obligaciones legales por usar IA en recomendaciones.

**Marco:** El AI Act europeo entró en vigor en 2024 con aplicación gradual hasta 2027. Los sistemas de recomendación pueden clasificarse según uso de datos y riesgo.

**Mitigación:**

- Documentar el sistema de IA.
- Informar al usuario del uso de IA.
- Mantener supervisión humana.
- Tener logging de las salidas del modelo.
- Fase 2: análisis específico por abogado.

**Probabilidad:** Media (regulación en evolución).
**Impacto:** Medio-alto.

---

### 1.7. Garantías y devoluciones

**Riesgo:** el usuario compra y quiere devolver; el comercio no acepta, viene a nosotros.

**Mitigación:**

- Disclaimer: no somos el vendedor.
- Enlace directo al comercio con su política de devolución.
- Claridad en la landing.

**Probabilidad:** Alta (usuarios confundidos).
**Impacto:** Bajo si se aclara bien.

---

### 1.8. Garantía sobre instalación

**Riesgo:** instalación realizada por un partner CPL falla.

**Mitigación:**

- Disclaimer: no somos responsables del servicio del partner.
- Selección de partners verificados.
- Política de feedback del usuario.
- Revisión periódica de partners.

**Probabilidad:** Media.
**Impacto:** Alto si ocurre.

---

## 2. Lo que NO hacemos

- ❌ No vendemos productos propios.
- ❌ No damos consejos médicos, financieros ni legales especializados.
- ❌ No certificamos instalaciones.
- ❌ No aceptamos pago directo del usuario en MVP.

---

## 3. Documentos legales obligatorios antes de lanzamiento

- [ ] Aviso legal.
- [ ] Política de privacidad.
- [ ] Política de cookies.
- [ ] Disclaimer de IA.
- [ ] Disclaimer de afiliación.
- [ ] Disclaimer de responsabilidad sobre recomendaciones.
- [ ] Disclaimer sobre partners CPL.
- [ ] Términos del servicio (especialmente si hay cuenta).

---

## 4. Pendiente

- [ ] Contratar revisión legal externa antes de lanzamiento público.
- [ ] Configurar banner de cookies.
- [ ] Alta ante AEPD si procede.
- [ ] Revisar trimestralmente la normativa aplicable.
