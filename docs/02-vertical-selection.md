# 02 · SELECCIÓN DE VERTICAL

> **Estado:** BORRADOR INICIAL — basado en conocimiento del modelo + análisis cuantitativo.
> **Confianza:** MEDIA-ALTA en la recomendación, BAJA en cifras exactas (ver `24-assumptions-log.md`).
> **Decisión recomendada:** **CAMPER / VANLIFE** como vertical primario.
> **Decisión secundaria:** AEROTERMIA como candidato a segundo vertical si la validación falla en camper.

---

## ⚠️ Nota epistemológica

Las cifras utilizadas son **estimaciones razonables** basadas en conocimiento del mercado español hasta enero 2026, pero **NO** son mediciones en tiempo real. Donde digo "AOV 1.500€" o "CPL 40€" estoy construyendo un escenario para que el cálculo sea comparable entre verticales — **no** son verdades económicas que se mantendrán estables.

**Antes de tomar decisiones de inversión**, estas cifras deben validarse con:

1. Medición real en el experimento 1 (ver `25-validation-log.md`).
2. Consulta directa con afiliados/programas (no fiarse de tablas obsoletas).
3. Datos actualizados de Google Keyword Planner y SEMrush.

---

## 1. Las 5 candidatas

| # | Vertical | Resumen |
|---|---|---|
| 1 | Energía solar doméstica + baterías | Autoconsumo residencial. Alta intención. Complejidad técnica/regulatoria. Afiliación débil, CPL fuerte. |
| 2 | Camper / vanlife | Equipamiento para furgonetas y campers. Afiliación diversa. Recurrencia muy alta. Contenido viral orgánico. |
| 3 | Home gym premium | Máquinas, racks, pesas. Catálogo masivo. Competencia feroz (Decathlon, Amazon). Baja recurrencia. |
| 4 | Aerotermia / climatización | Sustitución de caldera. Subvenciones públicas activas. Ticket muy alto. CPL muy alto. Complejidad normativa alta. |
| 5 | Vehículos eléctricos / carga doméstica | Wallbox + instalación. Mercado en crecimiento. Ticket medio. Recurrencia casi nula. |

---

## 2. Matriz cuantitativa (puntuación 1–10)

> Cada criterio se puntúa por separado. La suma da el ranking. Pesos iguales inicialmente.

### 2.1. Tabla de puntuación

| Criterio | Solar | Camper | Home Gym | Aerotermia | VE Carga |
|---|---|---|---|---|---|
| Tamaño de mercado España | 9 | 8 | 7 | 7 | 6 |
| Ticket medio | 9 | 6 | 5 | 9 | 5 |
| Comisión afiliación típica | 4 | 6 | 7 | 4 | 4 |
| Intención de compra media | 9 | 8 | 7 | 8 | 7 |
| Recurrencia / LTV | 4 | **9** | 4 | 5 | 3 |
| SEO — potencial orgánico | 5 | 5 | 3 | 5 | 6 |
| SEO — dificultad competencia | 4 | 5 | **3** | 6 | 6 |
| Paid Ads — escalabilidad | 7 | 6 | 6 | 6 | 5 |
| Redes sociales — viralidad | 7 | **9** | 7 | 5 | 6 |
| Complejidad técnica del producto | 4 | 7 | 8 | **3** | 6 |
| Competencia AI especializada | 7 | 8 | 4 | 7 | 6 |
| Capacidad de diferenciación vía IA | 9 | 8 | 5 | 9 | 7 |
| Disponibilidad de catálogo | 6 | 9 | 9 | 5 | 5 |
| Disponibilidad de afiliados reales | 4 | 7 | 8 | 4 | 4 |
| Potencial CPL | **9** | 7 | 3 | **9** | 6 |
| Potencial de servicios propios | 6 | 8 | 4 | 7 | 5 |
| Facilidad para escalar a LatAm | 7 | 6 | 5 | 4 | 6 |
| Facilidad de creación de contenido | 6 | **9** | 7 | 5 | 5 |
| Riesgo regulatorio | 4 | 9 | 10 | 4 | 8 |
| Velocidad al MVP viable | 5 | 8 | 7 | 4 | 7 |
| **TOTAL** | **124** | **147** | **119** | **116** | **115** |
| **Media** | **6,2** | **7,35** | **5,95** | **5,8** | **5,75** |

**Ranking por matriz:**

1. 🥇 **CAMPER / VANLIFE — 7,35**
2. 🥈 SOLAR DOMÉSTICO — 6,2
3. 🥉 HOME GYM — 5,95
4. AEROTERMIA — 5,8
5. VE CARGA — 5,75

---

## 3. Ingreso potencial por 1.000 visitantes cualificados

### 3.1. Parámetros comunes (todos los verticales)

> Todos son **HIPÓTESIS BASE** para comparación. No son verdades.

| Parámetro | Valor usado | Justificación | Status |
|---|---|---|---|
| Visitantes cualificados/mes | 1.000 | Escenario comparable | Supuesto |
| % que inicia recomendación | 30% | Tasa media de engagement en asistentes | Hipótesis |
| % que completa recomendación | 65% | De quienes inician | Hipótesis |
| CTR hacia afiliado | 25% | De quienes completan | Hipótesis |
| Conversión del comercio destino | 4% | De los clics | Hipótesis |
| Coste IA por recomendación | 0,40€ | ~$0.45 LLM API promedio | Hipótesis |
| Coste tecnológico base | 200€/mes | Hosting + herramientas | Supuesto |
| % que solicita CPL (lead) | 15% | De quienes completan | Hipótesis |

### 3.2. Cálculo por vertical

**Fórmula:**

```
Affiliate = 1.000 × 0,30 × 0,65 × 0,25 × 0,04 × AOV × Comisión
         = 1,95 × AOV × Comisión

CPL = 1.000 × 0,30 × 0,65 × 0,15 × CPL_unitario
    = 29,25 × CPL_unitario

Revenue total = Affiliate + CPL
Net = Revenue total − (recomendaciones × coste IA) − tech
```

| Vertical | AOV | Comisión | Affiliate | CPL unitario | CPL total | **Revenue bruto** | **Net / 1.000 visit.** |
|---|---|---|---|---|---|---|---|
| Solar | 6.000€ | 2,5% | 293€ | 75€ | 2.194€ | 2.487€ | **~2,21€** |
| **Camper** | 1.500€ | 5% | 146€ | 40€ | 1.170€ | 1.316€ | **~1,04€** |
| Home gym | 600€ | 6% | 70€ | 15€ | 439€ | 509€ | **~0,23€** |
| **Aerotermia** | 10.000€ | 2,5% | 488€ | 100€ | 2.925€ | 3.413€ | **~3,14€** |
| VE carga | 1.200€ | 4% | 94€ | 50€ | 1.463€ | 1.557€ | **~1,28€** |

### 3.3. Matriz ponderada (revenue × recurrencia × riesgo)

El revenue por visitante de aerotermia es el más alto, pero la **matriz global** pondera riesgo, recurrencia y capacidad de escalar.

Aplicando peso 30% revenue / 25% recurrencia / 25% capacidad operativa solo / 20% riesgo:

| Vertical | Revenue (0–10) | Recurrencia (0–10) | Solo-friendly (0–10) | Riesgo (0–10, invertido) | **Score ponderado** |
|---|---|---|---|---|---|
| Solar | 7 | 4 | 5 | 4 | 5,15 |
| **Camper** | 4 | 9 | 8 | 9 | **7,15** |
| Home gym | 1 | 4 | 7 | 9 | 4,9 |
| Aerotermia | 10 | 5 | 3 | 4 | 6,05 |
| VE carga | 4 | 3 | 7 | 8 | 5,4 |

**CAMPER gana también en la ponderada** porque su capacidad operativa en solitario y la recurrencia compensan el menor revenue/visitante.

---

## 4. ¿Por qué CAMPER / VANLIFE?

### 4.1. Lo que hace fuerte al vertical

1. **Recurrencia real.** Un usuario que compra una nevera portátil vuelve a por placa solar, después batería auxiliar, después una ducha, después un segundo vehículo. LTV acumulado 2–3 años = 3× la primera compra.
2. **Contenido viral orgánico.** TikTok y YouTube sobre camperización son canales masivos con CPC bajo y engagement alto. Adquisición barata y rápida.
3. **Configurador IA aporta valor único.** Las compatibilidades son reales (nevera ↔ batería ↔ placa), no triviales. El usuario no encuentra esto fácilmente en Amazon ni en blogs.
4. **CPL verificable.** Instaladores de placas solares para furgonetas, talleres de camperización, cursos. Hay demanda real y los profesionales pagan por leads cualificados.
5. **Afiliación diversa.** Amazon España + Awin + Impact + tiendas especializadas (Dometic, Victron, Engel, Narbonne, Bricomanía, etc.).
6. **Bajo riesgo regulatorio.** No hay subvenciones que cambiarán mañana ni normativas críticas que afecten al producto.
7. **Mercado activo y en crecimiento moderado** — no es un mercado saturado (no como home gym) ni es un nicho frío.
8. **Expansión LatAm viable.** Argentina, Chile, México tienen comunidades furgoneteras fuertes con problemática similar.

### 4.2. Lo que hace débil al vertical

1. **AOV bajo por transacción.** Una persona compra una nevera de 800€ hoy y vuelve a por la placa solar en 6 meses. Revenue mensual más bajo que solar/aerotermia.
2. **Ticket promedio dominado por Amazon.** Comisiones de Amazon Associates España son bajas (1–3% según categoría).
3. **La calidad de la afiliación depende mucho del mix.** Si dependes solo de Amazon, el margen es estrecho.
4. **Necesidad de contenido constante** para sostener SEO y redes (gasto de tiempo del promotor).
5. **Picos estacionales** (verano fuerte, invierno bajo) — habrá que diseñar retargeting y contenido evergreen.

### 4.3. Riesgos y mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| Saturación del vertical por nuevos creadores | Media | Medio | Apostar por profundidad técnica + datos propios + CPL directo. |
| Amazon reduce comisiones | Baja-Media | Medio | Diversificar hacia Awin + CPL + tiendas directas. |
| Cambio estacional fuerte | Alta | Medio | Email + retargeting fuera de temporada + contenido evergreen. |
| Subdimensionamiento del equipo | Alta | Alto | Empezar con catálogo pequeño (50–100 productos), expandir solo si hay demanda. |

---

## 5. ¿Por qué NO Solar ni Aerotermia como primer vertical?

**Aunque el revenue/visitante es mayor, no son recomendables para empezar en solitario:**

- **Alta complejidad regulatoria** (normativa de autoconsumo cambia; subvenciones PREE 5000 / 10000 sujetas a convocatorias). Necesitas un monitor constante.
- **Catálogo fragmentado fuera de Amazon.** Muchos paneles/inversores no están en redes de afiliación. Tendrías que ir a CPL desde el día 1.
- **Necesitas partners de instalación verificados** desde el inicio. Sin ellos, el CPL no funciona.
- **Mayor responsabilidad legal.** Recomendar mal una instalación solar tiene consecuencias económicas serias para el usuario. Esto encarece seguros, disclaimers, etc.

**Aerotermia es aún peor:** depende absolutamente de instaladores, las subvenciones son regionales y la decisión depende del aislamiento de la vivienda (no se puede recomendar sin visita técnica).

---

## 6. Estrategia de verticales: la decisión recomendada

```
PRIMARIO (validar ahora):
   → CAMPER / VANLIFE

SECUNDARIO (mes 6–9, si primario valida):
   → AEROTERMIA  (cuando tengamos músculo de CPL y partners)

TERCIARIO (mes 12+):
   → SOLAR DOMÉSTICO  (cuando tengamos catálogo y partners de instalación)

EXPERIMENTO PARALELO DE BAJO COSTE:
   → HOME GYM  (catálogo Amazon + comparador simple, valida motor con poco riesgo)

DESCARTADO:
   → VE / CARGA  (mercado aún pequeño, recurrencia nula)
```

**Razón de no descartar Aerotermia:** tiene mejor revenue/visitante. Si el experimento 1 falla en camper, se revalúa y se cambia a aerotermia como segundo intento.

**Razón de mantener home gym como experimento paralelo:** si construimos un motor de recomendación genérico, podemos probarlo con home gym (catálogo masivo, baja regulación) sin comprometer la marca principal. Útil para test A/B del motor.

---

## 7. Criterios de éxito del vertical primario (primeros 90 días)

**GATE 1 — Demanda validada:**
- ≥ 1.000 visitantes cualificados al sitio en 60 días.
- ≥ 50 recomendaciones completadas en 60 días.

**GATE 2 — Engagement real:**
- ≥ 30% de visitantes inician el asistente.
- ≥ 60% completan el asistente.

**GATE 3 — Clic en afiliado:**
- ≥ 15% CTR hacia afiliado (sobre completados).

**GATE 4 — CPL capturado:**
- ≥ 10 leads CPL generados y entregados.

**GATE 5 — Revenue real:**
- ≥ 1 conversión confirmada por afiliado O ≥ 1 lead CPL pagado por partner.

Si alguno de estos gates falla, se reabre el debate del vertical antes de invertir más.

---

## 8. Decisión recomendada — resumen ejecutivo

```
┌─────────────────────────────────────────┐
│  VERTICAL PRIMARIO: CAMPER / VANLIFE    │
│  MODELO:   Afiliación + CPL             │
│  GEOGRAFÍA: España (fase 1)             │
│  IDIOMA:   Español peninsular           │
└─────────────────────────────────────────┘
```

Próximo paso inmediato: validar con **experimento 1** (landing + cuestionario + 1 producto recomendado manualmente) antes de construir el motor completo.

---

## 9. Pendiente de validación antes de aprobar esta decisión

- [ ] Confirmar que existen ≥ 3 CPL reales para servicios camper en España (talleres, instaladores de placas).
- [ ] Contrastar comisiones actuales de Amazon Associates ES en categorías camper.
- [ ] Confirmar que hay al menos 2 redes (Awin, Impact) con tiendas especializadas accesibles.
- [ ] Verificar volúmenes de búsqueda reales en Google Trends ES para "camper" / "furgoneta" / "kit solar furgoneta" / "nevera portátil coche".
- [ ] Contrastar el coste por clic real en Google Ads ES para estas keywords.

Estos puntos deben responderse con una investigación dirigida o con los primeros experimentos.
