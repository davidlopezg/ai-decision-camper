# 27 · EXPERIMENTO 0 — Validación manual del Decision Engine (7 días)

> **Estado:** LISTO PARA EJECUTAR.
> **Cuándo:** lunes próximo (o cuando puedas).
> **Tiempo del promotor:** 5-10 horas en 7 días.
> **Coste:** 0-100€.
> **Objetivo:** demostrar que la **decisión manual** aporta valor real antes de escribir una línea de código.

---

## 1. Hipótesis del experimento

> **Hay personas con intención real de compra de equipamiento camper que prefieren una recomendación personalizada y justificada frente a buscar por su cuenta en Google/Amazon. Hasta el punto de que:**
> 1. La recomendarían como más útil que la búsqueda manual.
> 2. Comprarían siguiendo esa recomendación.
> 3. Pagarían por ese servicio si existiera.

---

## 2. Lo que NO se hace (regla dura)

- ❌ Programar.
- ❌ Construir base de datos.
- ❌ Crear landing.
- ❌ Poner anuncios de pago para conseguir tráfico masivo.
- ❌ Hacer integraciones con afiliados (los enlaces se pueden poner a mano).
- ❌ Hacer SEO.

Solo: reclutar, entrevistar, escribir recomendaciones a mano, recoger feedback.

---

## 3. Materiales que ya tienes

- ✅ 3 fichas `.md` de productos reales: `dometic-cfx3-55.md`, `victron-bluesolar-100w.md`, `varta-dual-purpose-agm-95ah.md`.
- ✅ System prompt del asesor: `system-prompts/asesor-camper.md` (úsalo como guía de estilo).
- ✅ Estructura de la recomendación (sección 5 más abajo).

**Lo que necesitas crear tú:**

- 5-10 fichas `.md` adicionales (las puedes escribir en 2-3 horas consultando Amazon y webs de marcas).
- Una hoja de cálculo simple para tracking (Airtable, Google Sheets o Notion).

**Lo que NO necesitas aún:**

- Catálogo completo. Para 20 personas, con 10-15 productos cubres el 90% de los casos típicos.

---

## 4. Timeline día a día

### DÍA 1 (Lunes) — Reclutamiento

**Objetivo:** 20 personas apuntadas.

**Dónde publicar (gratis):**

| Canal | Acción | Mensaje (abajo) |
|---|---|---|
| Foro Furgovw | Post en sección general | Adaptar mensaje A |
| Reddit r/furgovw | Post + crosspost en r/vanlife | Adaptar mensaje A |
| Reddit r/camper (si existe) | Post | Adaptar mensaje A |
| Facebook "Furgonetas Camper" | Post en 3-5 grupos | Adaptar mensaje B |
| Instagram | DM a 10 cuentas activas de camper | Mensaje C (más corto) |

**Mensaje A — Para foros y Reddit:**

```
TÍTULO: ¿Te ayudaríamos a diseñar tu kit camper gratis?
Busco validar una idea antes de construir nada.

Soy [nombre], estoy trabajando en un asistente que ayuda a personas
como tú a decidir qué equipamiento necesitan para su camper.

Lo que ofrezco:
  1. Me cuentas tu caso (vehículo, presupuesto, uso, prioridades).
  2. Te hago una recomendación personalizada por escrito, con justificación.
  3. Incluyo enlaces a productos (no solo Amazon, también tiendas
     especializadas e instaladores).
  4. 15-20 minutos de tu tiempo.

Lo que pido a cambio:
  - Intención real de comprar/equipar en próximos 3 meses.
  - 15 minutos de feedback después (videollamada o texto).

Plazas: 20 personas. Empiezo el lunes.

Si te interesa, responde por DM con:
  - Vehículo (modelo y año, o "todavía no lo tengo").
  - Qué quieres equipar (nevera, placa solar, batería, cocina, etc.).
  - Presupuesto aproximado o "no lo tengo claro".

[Tu nombre]
[Tu email o canal de contacto]
```

**Mensaje B — Para Facebook:**

```
🚐 ¿Te falta decisión sobre qué meterle a tu furgo?

Estoy validando una idea: ayudarte a diseñar tu kit camper con
una recomendación personalizada y justificada.

GRATIS para 20 personas esta semana.

A cambio: 15 min de feedback después.

DM si te interesa.
```

**Mensaje C — Para Instagram DM:**

```
Hola [nombre], vi tu cuenta y me parece que tienes una furgo bien
equipada. Estoy validando una idea: ayudar a gente como tú a decidir
qué productos comprar para su camper, con justificación técnica.

Si tienes intención de comprar/equipar algo en próximos 3 meses,
puedo hacerte una recomendación gratis. 15 min de cuestionario +
15 min de feedback.

¿Te interesaría? Un saludo, [nombre].
```

**Criterios de selección:**

- Tiene intención real de comprar/equipar (no solo curiosidad).
- Vehículo claro o decisión de compra clara.
- Zona España (o mercado similar).
- Plazo: comprar en próximos 1-3 meses.

Si llegan más de 20, **filtra por calidad de intención**, no por orden de llegada. Si llegan menos de 20 en 24h, puedes ampliar a LinkedIn, foros de airbnb camper, etc.

**Tracking:**

Crear hoja con columnas:

| ID | Nombre | Vehículo | Quiere equipar | Presupuesto | Estado |
|---|---|---|---|---|---|
| 01 | Carlos | VW T5 2012 | Nevera + placa | 1.500€ | reclutado |
| 02 | Ana | Citroën Berlingo 2019 | Cocina + iluminación | 800€ | reclutado |

---

### DÍA 2 (Martes) — Últimas captaciones + revisión de casos

- Cerrar reclutamiento a las 20 personas (o las que haya).
- Si falta alguna, ampliar búsqueda.
- Releer los casos y agrupar por categorías:
  - **Nunca 1:** "primera camperización, presupuesto < 2.000€".
  - **Nunca 2:** "ya tengo algo, quiero upgrade".
  - **Nunca 3:** "proyecto completo desde cero, > 5.000€".
- Avisar a las 20 personas con el cuestionario + día y hora.

---

### DÍA 3 (Miércoles) — Cuestionarios

**Objetivo:** 10 cuestionarios completados.

Por cada persona:

- Llamada de 15-20 min o cuestionario asincrónico por email.
- Usar las **8 preguntas estándar** (sección 6).
- Anotar respuestas literales (no resúmenes). Luego我们要 revisarlas.

**Tiempo por cuestionario:** 15-20 min. Total: 3-4 horas para 10-12 personas.

---

### DÍA 4 (Jueves) — Cuestionarios (resto) + inicio de recomendaciones

- Completar los 10 cuestionarios restantes.
- Empezar a escribir 5-6 recomendaciones (las más representativas).

---

### DÍA 5 (Viernes) — Recomendaciones

- Completar las 14 recomendaciones restantes.
- Por cada persona, escribir un documento estructurado (sección 5).

**Tiempo por recomendación:** 30-45 min. Total: 10-15 horas para 20 personas (repartido en 2 días).

Si falta tiempo, prioriza la calidad de las 10 primeras. Las otras 10 pueden ser más cortas (1 producto principal + 2 alternativas, sin tanto detalle).

---

### DÍA 6 (Sábado) — Entrega

- Enviar las 20 recomendaciones por email.
- Subject: `Tu configuración camper personalizada — [nombre]`.
- Tracking: registrar apertura (con pixel tracking o solicitar confirmación de recibo) y clics en enlaces.

**Email tipo:**

```
Hola [nombre],

Aquí tienes tu recomendación personalizada basada en lo que hablamos.

[Adjuntar PDF o pegar el contenido]

He intentado justificar cada elección. Si hay algo que no encaje
con tu situación, dímelo y lo revisamos.

Si compras siguiendo esta recomendación, no te costará más (los
enlaces son de afiliado, yo gano una pequeña comisión sin que
te afecte).

Si tienes 15-20 min esta semana, me encantaría recoger tu feedback
en una llamada corta (15 min) o por escrito. Es lo que me ayuda a
decidir si esto tiene futuro.

Gracias por participar.

[Tu nombre]
```

---

### DÍA 7 (Domingo) — Entrevistas de feedback

**Objetivo:** 15-20 entrevistas completadas (5-10 min cada una por escrito + 15 min en llamada si posible).

Usar el **guion de entrevista** (sección 7).

**Tracking de feedback** en hoja con columnas:

| ID | ¿Ayudó más que Google/Amazon? (1-10 + why) | ¿Compraría? | ¿Pagaría? | ¿Cuánto? | Comentarios |
|---|---|---|---|---|---|
| 01 | 8, "porque me dijo qué necesito" | Probablemente sí | Sí | 5-10€ | "Falta info sobre homologación" |
| 02 | 4, "yo ya sabía lo que quería" | No | No | — | "Más bien quiero reviews" |

---

## 5. Estructura de la recomendación (entregable a cada persona)

Esta es la plantilla que debes rellenar a mano para cada persona:

```markdown
# Tu configuración camper personalizada

**Para:** [Nombre]
**Vehículo:** [Vehículo declarado]
**Presupuesto:** [Presupuesto declarado]
**Uso:** [Uso declarado]

---

## Resumen

En una frase: tu mejor kit para [caso de uso] con [presupuesto]€.

---

## Mi recomendación principal

### [Producto 1]

**Lo recomiendo porque:**
- ✓ [Razón 1 específica a tu caso]
- ✓ [Razón 2 específica a tu caso]
- ✓ [Razón 3 específica a tu caso]

**Cuándo NO lo recomendaría:**
- [Situación 1]
- [Situación 2]

**Precio orientativo:** [precio]
**Dónde comprar:** [Amazon / Tienda especializada / Instalador]
**Enlace:** [URL]

### [Producto 2 (si aplica)]
[Igual estructura]

### [Producto 3 (si aplica)]
[Igual estructura]

---

## Total estimado: [X] €

| Producto | Precio | Dónde |
|---|---|---|
| Nevera X | 650€ | Amazon |
| Placa Y | 150€ | AutoSolar |
| Batería Z | 200€ | Amazon |
| **TOTAL** | **1.000€** | |

---

## Lo que NO te recomiendo y por qué

| Producto descartado | Por qué no encaja para ti |
|---|---|
| Nevera W | Demasiado grande para tu furgo |
| Placa V | Necesitas más potencia |

---

## Accesorios complementarios (siguiente compra lógica)

- [Accesorio 1]: [motivo breve]
- [Accesorio 2]: [motivo breve]

---

## ⚠️ Consideraciones importantes

[Si aplica: instalación profesional, normativa, seguridad, etc.]

---

## Sobre esta recomendación

Esta recomendación la he hecho yo manualmente, revisando catálogos
y compatibilidades. No la ha generado una IA a ciegas.

Si encuentras algo que no encaje, o quieres cambiar algo, dímelo.
```

**Tono:** el de `system-prompts/asesor-camper.md`. Cercano, técnico, honesto, sin marketing vacío.

**Tiempo:** 30-45 min por recomendación.

---

## 6. Cuestionario estándar (las 8 preguntas)

Por cada persona, en llamada o por escrito, hacer estas 8 preguntas (en este orden). Anotar respuestas literales.

```
1. ¿Qué vehículo tienes (o planeas tener)? Modelo, año, tamaño.
2. ¿Para qué lo vas a usar principalmente? (fines de semana, vacaciones
   largas, diario, etc.)
3. ¿Cuántas personas vais normalmente?
4. ¿Qué presupuesto tienes en mente para equipamiento? (o "¿no lo
   tienes claro todavía?")
5. ¿Qué es lo que más te importa ahora mismo? (nevera, luz, cocinar,
   dormir, calefacción, agua, etc.)
6. ¿Tienes ya algo equipado? ¿Qué?
7. ¿Hay algo que NO quieras hacer? (obra, gas, instalación
   complicada, etc.)
8. ¿Tienes experiencia camperizando o es tu primera vez?
```

**Si falta información crítica** (vehículo, presupuesto, prioridad), insistir amablemente. Si en 2 preguntas no se obtiene, pedir un email con los datos.

**Si la persona tiene dudas** ("¿qué me recomiendas tú primero?"), responder: "Mejor terminamos el cuestionario y luego te doy una recomendación completa, ¿te parece?".

---

## 7. Guion de entrevista de feedback (Día 7)

Por cada persona, 15 min máximo. Estructura:

```
1. Calentamiento (2 min)
   "¿Recibiste bien la recomendación? ¿La pudiste leer?"

2. Pregunta 1 — UTILIDAD (3 min)
   "De 1 a 10, ¿cuánto te ha ayudado esta recomendación comparado
   con lo que tú habrías encontrado buscando por tu cuenta?"
   "¿Por qué esa nota?"

3. Pregunta 2 — CONVERSIÓN (3 min)
   "¿Comprarías siguiendo esta recomendación?"
   (Sí / Probablemente sí / No sé / Probablemente no / No)
   "¿Qué te frenaría?"

4. Pregunta 3 — WTP / WILLINGNESS TO PAY (3 min)
   "Si este servicio existiera como producto (pagas X al mes o
   por consulta), ¿lo usarías?"
   "¿Cuánto pagarías?"
   (Si no, ¿por qué no?)

5. Pregunta 4 — GAPS (3 min)
   "¿Qué te faltó en la recomendación?"
   "¿Qué sobró?"
   "¿Hay algo que te hubiera gustado saber y no estaba?"

6. Cierre (1 min)
   "¿Conoces a alguien que esté en tu misma situación y le
   interesaría? (referidos)"
   "Gracias, esto me ayuda mucho."
```

**Si la persona no quiere llamar**, enviar cuestionario Google Forms con las mismas 4 preguntas en formato abierto.

---

## 8. Criterios de decisión al final del experimento

Compilar respuestas y calcular:

| Métrica | Umbral GO | Umbral PAUSA |
|---|---|---|
| "% ayudó más que Google/Amazon" (≥7/10) | ≥60% | <40% |
| "% compraría siguiendo la recomendación" | ≥40% | <25% |
| "% dispuestos a pagar (≥5€)" | ≥30% | <15% |

**Decisión final:**

| Resultado | Acción |
|---|---|
| **3/3 umbrales GO** | Construir MVP técnico (Experimento 1). Alta confianza. |
| **2/3 umbrales GO** | Iterar el enfoque manual y repetir con 10 personas más. |
| **1/3 umbrales GO** | Reabrir el vertical o el modelo. |
| **0/3 umbrales GO** | **PIVOT**. Cambiar de vertical o replantear el problema. |

---

## 9. Lo que estás validando en realidad

Aunque las métricas concretas importan, lo más importante es entender **por qué** la gente dice lo que dice.

Patrones a buscar en el feedback cualitativo:

**Patrón A — "Me ahorró tiempo y me dio seguridad":**
- Personas que estaban saturadas de información.
- El valor es la **curación + justificación**.

**Patrón B — "Me descubrió algo que no había considerado":**
- Personas que pensaban comprar X pero la recomendación les dijo Y.
- El valor es el **conocimiento experto**.

**Patrón C — "Me dio confianza para comprar":**
- Personas que dudaban entre opciones.
- El valor es la **decisión justificada**.

**Patrón D — "Más bien quiero reviews":**
- Personas que querían ver qué dice la gente, no qué dice un experto.
- El valor es la **comparativa**, no la decisión.

**Patrón E — "Yo ya sé lo que quiero":**
- Personas que tenían claro su compra.
- Nuestro servicio no aporta valor en su caso.

Si los patrones A/B/C dominan, hay producto. Si D/E dominan, hay que replantear.

---

## 10. Coste del experimento

| Concepto | Coste |
|---|---|
| Mi tiempo como agente | 0€ |
| Tiempo del promotor | 5-10 h × coste de oportunidad personal |
| Anuncios de reclutamiento (si se necesitan) | 0-50€ |
| Pequeño regalo a participantes (ej. ebook, descuento futuro) | 0-50€ |
| **TOTAL** | **0-100€** |

---

## 11. Riesgos del experimento

| Riesgo | Mitigación |
|---|---|
| Sesgo de autoselección (los que aceptan son los más motivados) | Reconocerlo. Si valida, hay que extrapolar al 5-10% de la población que se molestaría en participar. |
| Las recomendaciones manuales son muy buenas (no escalables) | Sí. Esto es **señal de techo**: sabemos cuál es el nivel de calidad que tiene que alcanzar la versión automatizada. |
| Tamaño de muestra pequeño (n=20) | Solo señal direccional. Si los resultados son extremos (todos sí o todos no), hay confianza. Si son mixtos, hay que repetir. |
| Sesgo de cortesía (la gente dice "sí" por amabilidad) | Pedir números concretos (1-10, cuánto pagarías). Cuando hay que poner cifra, baja la cortesía. |

---

## 12. Después del experimento

**Si GO (3/3 umbrales):**

1. Documentar las 20 recomendaciones (anonimizadas) como casos de éxito.
2. Extraer las 5-10 reglas más repetidas (compatibilidades, dimensionamientos) y documentarlas.
3. Empezar Experimento 1 (MVP técnico) según `26-integration-guide.md`.
4. Convertir las 20 recomendaciones en testimonios / casos de estudio para la futura landing.

**Si PAUSA (2/3 umbrales):**

1. Analizar qué umbral falló.
2. Iterar el cuestionario o el formato de la recomendación.
3. Repetir el experimento con 10 personas nuevas + 5-10 que ya participaron (validar si la versión nueva aporta más).

**Si PIVOT (0-1/3 umbrales):**

1. Analizar si el vertical Camper es el problema o el modelo.
2. Si el vertical: re-evaluar Aerotermia o Solar con el mismo manual (5-10 personas).
3. Si el modelo: replantear si "decision engine" es la propuesta de valor correcta.

---

## 13. Pendiente inmediato

- [ ] Reservar 5-10 horas esta semana.
- [ ] Escribir 5-10 fichas `.md` adicionales de productos camper frecuentes.
- [ ] Crear hoja de tracking (Airtable o Sheets).
- [ ] Publicar mensajes de reclutamiento.
- [ ] Cerrar 20 participantes antes del martes noche.
- [ ] Ejecutar el experimento.

---

## 14. Mensaje para abrir este lunes

Si necesitas un mensaje para arrancar, este funciona:

```
LUNES MAÑANA — Tu checklist

□ 1. Abrir hoja de tracking (Airtable/Sheets) con las columnas de la sección 4.
□ 2. Publicar mensaje A en Foro Furgovw y Reddit r/furgovw.
□ 3. Publicar mensaje B en 3-5 grupos de Facebook de camper.
□ 4. Enviar mensaje C a 10 cuentas de Instagram activas.
□ 5. Mientras llegan respuestas: escribir 5 fichas .md de productos
     que no tengas (cocinas, iluminación, baterías complementarias).
□ 6. Cuando lleguen 20: confirmarles y enviar cuestionario.
□ 7. Miércoles: hacer 10 cuestionarios.
□ 8. Jueves-viernes: escribir 20 recomendaciones.
□ 9. Sábado: entregar.
□ 10. Domingo: 15-20 entrevistas de feedback.
□ 11. Lunes siguiente: analizar resultados y decidir GO/PAUSA/PIVOT.
```

---

**Empieza el lunes.** Si necesitas ayuda durante la semana (revisar alguna recomendación antes de enviar, ajustar el cuestionario, lo que sea), avísame.
