# 22 · TESTING PLAN

> **Estado:** ACTUALIZADO para el stack MVP.
> **Foco:** anti-alucinaciones, performance, RGPD, usabilidad.

---

## 1. Tipos de testing

### 1.1. Unit tests (fase 1+)

- Funciones puras del motor (parser JSON, validación de schema).
- Funciones de Supabase wrapper.
- Helpers de tracking.

Cobertura objetivo MVP: 50%+ en lógica crítica.

### 1.2. Integration tests (fase 1+)

- Llamadas a Supabase con mocks.
- Llamadas al LLM con mocks.
- Validar el flujo completo de extremo a extremo.

### 1.3. Smoke tests manuales (MVP)

Antes del deploy, ejecutar manualmente las 5 preguntas de validación:

```
1. "Quiero nevera para mi furgo, presupuesto 700€"
2. "Tengo 1500€ para camperizar, ¿qué me compro primero?"
3. "Compara Dometic CFX3 55 con Engel MT45"
4. "Mi coche es pequeño, ¿qué cabe?"
5. "Placa solar para vivir de la furgo"
```

Para cada pregunta, verificar:

- [ ] El JSON de requisitos es válido.
- [ ] La query a Supabase devuelve productos relevantes.
- [ ] El LLM genera respuesta estructurada con todas las secciones.
- [ ] Los precios mencionados coinciden con Supabase.
- [ ] No hay alucinaciones (productos inventados, datos incorrectos).
- [ ] Los botones de afiliado funcionan.
- [ ] Se registran los eventos clave.

### 1.4. UX testing con usuarios reales

**Pre-MVP (semana 1):**

- 3–5 personas prueban manualmente.
- 30 min de sesión con observación.
- Preguntas: ¿entendiste? ¿fue útil? ¿qué cambiarías?

**Post-MVP (semana 2):**

- 5–10 personas vía grabación de sesión (Loom, screen recording).
- Medir tiempo de tarea, errores, satisfacción.

### 1.5. A/B testing (fase 2)

Candidates:
- Copy del CTA principal.
- Orden de las preguntas del asistente.
- Estilo de la explicación (más breve vs. más detallada).

### 1.6. Performance testing

- Lighthouse > 90 en landing.
- Latencia del chat < 5s en P95 (en MVP).
- Bundle JS inicial < 100 KB (sin contar el chat client existente).

### 1.7. Compliance testing

- Banner de cookies aparece en primera visita.
- Consentimiento se registra antes de tracking no esencial.
- No se cargan trackers antes del consentimiento.
- Textos legales (privacidad, cookies, aviso legal) están enlazados.
- Disclaimer de afiliación visible en cada producto recomendado.

---

## 2. Tests específicos anti-alucinación

El mayor riesgo del MVP es que el LLM invente datos. Estos tests verifican que no pasa:

### 2.1. Test de precio

```
Input: "¿Cuánto cuesta la nevera Dometic CFX3 55?"
Output esperado: ~650–800€ (rango de Supabase)
Output NO aceptable: 550€ o 1.200€ (fuera del rango conocido)
```

### 2.2. Test de producto inexistente

```
Input: "¿Tenéis la nevera Dometic UltraMegaX 999?"
Output esperado: "No tenemos ese producto en nuestro catálogo. 
                  ¿Quieres que te recomiende alguna alternativa?"
Output NO aceptable: descripción inventada del producto
```

### 2.3. Test de compatibilidad

```
Input: "¿Puedo conectar una placa de 200W a una batería de 50Ah?"
Output esperado: mencionar el `.md` de contexto, no inventar.
Output NO aceptable: afirmación categórica sin base.
```

### 2.4. Test de campo fuera del vertical

```
Input: "¿Cómo cambio el aceite de mi furgo?"
Output esperado: derivación amable. "Eso no es de mi especialidad, 
                  pero si necesitas un taller, puedo conectarte con uno."
Output NO aceptable: instrucciones inventadas.
```

### 2.5. Test de presupuestos extremos

```
Input: "Tengo 50€ para una nevera."
Output esperado: "Con 50€ no es viable una nevera de compresor. 
                  Si quieres, te recomiendo algunas opciones económicas 
                  o podemos aplazar este apartado."
Output NO aceptable: recomendar un producto fuera de presupuesto sin avisar.
```

---

## 3. Checklist de testing pre-launch

```
□ 5 preguntas de smoke test contestadas correctamente
□ No hay alucinaciones en 20 conversaciones de prueba
□ Bundle JS < 100 KB (sin contar chat client)
□ Landing carga en < 2s en móvil 3G simulado
□ Latencia del chat < 5s en P95
□ Todos los enlaces afiliados tienen rel="sponsored noopener"
□ Disclaimer de afiliación visible en cada producto recomendado
□ Banner de cookies aparece en primera visita
□ Consentimiento se registra antes de tracking no esencial
□ Email de confirmación llega (test con email real)
□ Lead CPL llega al partner (test con partner real o simulado)
□ Eventos clave se registran en Supabase
□ Textos legales (privacidad, cookies, aviso legal) visibles
□ Sin errores 404
□ Sin fugas de API keys en el bundle JS (inspeccionar)
□ RLS de Supabase bloqueando acceso no autorizado (test manual)
```

---

## 4. Testing continuo

| Frecuencia | Tipo |
|---|---|
| Cada commit | Smoke test manual rápido |
| Cada release | Tests completos de pre-launch |
| Semanal | Revisión de errores en producción (Supabase logs) |
| Mensual | Auditoría de alucinaciones (revisar 20 conversaciones) |
| Trimestral | Auditoría de rendimiento y SEO |

---

## 5. QA con usuarios reales

### 5.1. Test pre-MVP (día 7)

- 3–5 personas (mezcla de expertos y novatos en camper).
- Sesión 30 min con observación.
- Preguntas: ¿entendiste? ¿fue útil? ¿qué cambiarías?

### 5.2. Test post-MVP (día 14)

- 5–10 personas vía grabación de pantalla.
- Tareas: completar asistente, ver resultado, hacer clic.
- Medir: tiempo, errores, satisfacción.

### 5.3. Test mensual en producción

- Revisar 10–20 conversaciones reales.
- Detectar patrones de abandono.
- Detectar alucinaciones.

---

## 6. Métricas de calidad

| Métrica | Objetivo MVP |
|---|---|
| Alucinaciones detectadas | < 5% de conversaciones |
| Tasa de finalización del asistente | > 50% |
| CTR a afiliado | > 10% |
| Latencia P95 | < 5s |
| Errores 500 | < 1% de requests |
| Tiempo en página | > 60s en chat |

---

## 7. Pendiente

- [ ] Ejecutar 5 smoke tests manuales antes de launch.
- [ ] Revisar 20 conversaciones tras primer día de tráfico real.
- [ ] Configurar tests automáticos básicos (fase 1+).
- [ ] Sesión de user testing tras 2 semanas en producción.
