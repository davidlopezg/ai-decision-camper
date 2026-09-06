# 30 · DÍA 2 — DELIVERABLES (preparado en paralelo)

> **Objetivo del Día 2:** investigación profunda de mercado.
> **Tiempo del promotor:** 30-60 min de revisión + aprobación.
> **Tiempo del agente:** ya entregado.

---

## ENTREGABLE 1 · Análisis de los 5 competidores principales en Camper ES

### 1. CamperLam
- **URL:** https://www.camperlam.com
- **Tipo:** Tienda especializada + servicios de camperización.
- **Fortalezas:** Catálogo amplio. Servicio de instalación. Marca reconocida en el sector.
- **Debilidades:** Sin asistente IA. Sin comparador inteligente. UX de los 2010.
- **Tráfico estimado:** medio (no verificable sin SimilarWeb).
- **Monetización:** venta directa + servicios.
- **Qué NO hace:** No recomienda configuraciones. No explica compatibilidades. No compara entre tiendas.

### 2. NathanVan
- **URL:** https://www.nathanvan.com
- **Tipo:** Tienda especializada en neveras y energía solar para furgonetas.
- **Fortalezas:** Especialización en neveras (donde son referencia). Contenido educativo en blog. Soporte técnico.
- **Debilidades:** Catálogo menos amplio. Sin asistente conversacional.
- **Monetización:** venta directa.
- **Qué NO hace:** No dimensiona sistemas completos. No compara multitienda.

### 3. Viviendocamper
- **URL:** https://www.viviendocamper.com
- **Tipo:** Tienda + contenido (blog + YouTube).
- **Fortalezas:** Buen SEO. Contenido educativo. Confianza.
- **Debilidades:** Tienda secundaria. UX mejorable.
- **Monetización:** venta directa + afiliación.
- **Qué NO hace:** No tiene configurador. No recomienda multitienda.

### 4. Furgovw (foro + tienda)
- **URL:** https://www.furgovw.org
- **Tipo:** Comunidad + tienda asociada.
- **Fortalezas:** Comunidad masiva. Información de primera mano. Conversiones orgánicas.
- **Debilidades:** Interfaz antigua. No es un "asistente". Hay que leer hilos.
- **Monetización:** tienda + publicidad + patrocinios.
- **Qué NO hace:** No estructura la decisión. No te dice "tu kit ideal es X".

### 5. Amazon España
- **URL:** https://www.amazon.es
- **Tipo:** Marketplace generalista.
- **Fortalezas:** Catálogo gigante. Logística Prime. Confianza del usuario. Reviews.
- **Debilidades:** No recomienda. Sesgo hacia lo que paga más comisión. Sin contexto técnico.
- **Monetización:** venta directa.
- **Qué NO hace:** No entiende tu furgoneta. No te dice si los productos son compatibles. No te explica por qué.

### Nuestra ventaja competitiva resumida

| Feature | Competidores | Amazon | Nosotros |
|---|---|---|---|
| Catálogo amplio | ✓ | ✓✓ | parcial |
| Recomendación personalizada | ✗ | ✗ | ✓✓ |
| Multitienda | ✗ | ✗ | ✓ |
| Explicación de compatibilidades | ✗ | ✗ | ✓✓ |
| Explicación "por qué sí / por qué no" | ✗ | ✗ | ✓✓ |
| Configuración completa para tu vehículo | ✗ | ✗ | ✓✓ |
| Comparativa entre tiendas | ✗ | ✗ | ✓ |
| CPL instaladores | parcial | ✗ | ✓ |

**Conclusión:** Hay hueco claro. Nadie combina recomendación personalizada + multitienda + explicación técnica + CPL.

---

## ENTREGABLE 2 · Lista inicial de 50 productos camper candidatos

> ⚠️ **Precios aproximados a fecha de revisión. Verificar antes de cargar en Supabase.**

### Neveras portátiles (8)

| Producto | Precio aprox. | Programa | URL ejemplo |
|---|---|---|---|
| Dometic CFX3 55 | 700€ | Amazon ES | amazon.es/dp/B0... |
| Dometic CFX3 45 | 580€ | Amazon ES | — |
| Dometic CFX3 75 | 880€ | Amazon ES | — |
| Dometic CFX3 25 | 480€ | Amazon ES | — |
| Engel MT45F-S | 850€ | Amazon ES | — |
| Mobicool MCG15 | 220€ | Amazon ES | — |
| Outwell ECOcool Lux 30L | 350€ | Amazon ES / Awin | — |
| Dometic TropiCool TCX 21 | 280€ | Amazon ES | — |

### Placas solares (6)

| Producto | Precio aprox. | Programa | Notas |
|---|---|---|---|
| Victron BlueSolar 100W | 150€ | Amazon ES / AutoSolar | Top calidad |
| Victron BlueSolar 175W | 250€ | Amazon ES / AutoSolar | Más potencia |
| Panel solar genérico 100W ríg | 90€ | Amazon ES | Barato |
| Panel solar flexible 100W | 130€ | Amazon ES | Para techos curvos |
| Panel solar plegable 100W | 180€ | Amazon ES | Portátil |
| EcoFlow 220W bifacial | 350€ | Amazon ES / marca | Premium |

### Baterías auxiliares (6)

| Producto | Precio aprox. | Programa | Notas |
|---|---|---|---|
| Varta Dual Purpose AGM 95Ah | 230€ | Amazon ES / Feu Vert | Versátil |
| Varta Dual Purpose AGM 130Ah | 380€ | Amazon ES / Feu Vert | Más capacidad |
| Bosch L5 100Ah AGM | 280€ | Amazon ES / Norauto | Alternativa |
| LiFePO4 100Ah genérica | 380€ | Amazon ES / AliExpress | Más vida útil |
| LiFePO4 200Ah con BMS | 700€ | Amazon ES / AliExpress | Premium |
| Batería auxiliar específica camper 100Ah | 320€ | Amazon ES | Optimizada |

### Inversores (4)

| Producto | Precio aprox. | Programa | Notas |
|---|---|---|---|
| Victron Phoenix 12/800 | 350€ | Amazon ES | Onda pura |
| Victron Phoenix 12/1200 | 550€ | Amazon ES | Más potencia |
| Bestek 1000W onda pura | 180€ | Amazon ES | Barato |
| ERAYAK 2000W onda pura | 280€ | Amazon ES | Gama media |

### Reguladores MPPT (3)

| Producto | Precio aprox. | Programa | Notas |
|---|---|---|---|
| Victron SmartSolar 75/15 | 120€ | Amazon ES / AutoSolar | Top |
| Victron SmartSolar 100/20 | 180€ | Amazon ES / AutoSolar | Más capacidad |
| EPever Tracer 20A | 100€ | Amazon ES | Alternativa |

### Iluminación LED (3)

| Producto | Precio aprox. | Programa |
|---|---|---|
| Tira LED 12V 5m blanco cálido | 25€ | Amazon ES |
| Plafón LED táctil 12V | 35€ | Amazon ES |
| Flexo USB recargable | 30€ | Amazon ES |

### Cocinas y hornillos (5)

| Producto | Precio aprox. | Programa | Notas |
|---|---|---|---|
| Campingaz CV 470 Plus | 130€ | Amazon ES / Decathlon | Cartucho gas |
| Hornillo portátil cartucho 227 | 35€ | Amazon ES | Básico |
| Cocina fija camper 2 fuegos | 220€ | Amazon ES / especializadas | Instalación |
| Cocina camper plegable | 90€ | Amazon ES | Portátil |
| Nevera-cooler hielo rígida 40L | 80€ | Amazon ES | Alternativa barata |

### Menaje y agua (5)

| Producto | Precio aprox. | Programa |
|---|---|---|
| Set cocina plegable 12 piezas | 70€ | Amazon ES |
| Bidón flexible 20L | 25€ | Amazon ES / Awin |
| Ducha portátil 12V | 60€ | Amazon ES |
| Grifo eléctrico 12V | 45€ | Amazon ES |
| Set vasos telescópicos acero | 18€ | Amazon ES |

### Calefacción (3)

| Producto | Precio aprox. | Programa | Notas |
|---|---|---|---|
| Webasto Air Top 2000 | 700€ | Amazon ES / taller | Diesel |
| Calentador gas portátil | 100€ | Amazon ES | Camping |
| Estufa catalítica portátil | 130€ | Amazon ES | Gas |

### Aislamiento y ventanas (3)

| Producto | Precio aprox. | Programa |
|---|---|---|
| Kaiflex 19mm rollo 1m² | 25€ | Amazon ES / Leroy Merlin |
| Ventana Dometic S4 | 200€ | Amazon ES / especializada |
| Aislamiento Armaflex 13mm | 30€ | Amazon ES / Leroy Merlin |

### Accesorios complementarios (4)

| Producto | Precio aprox. | Programa | Notas |
|---|---|---|---|
| Relé inteligente Victron Cyrix | 80€ | Amazon ES / AutoSolar | Carga alternador |
| Monitor batería Victron BMV-712 | 140€ | Amazon ES / AutoSolar | Visibilidad |
| Pasacables estanco techo | 20€ | Amazon ES | Instalación |
| Sikaflex 252 sellador poliuretano | 18€ | Amazon ES / Leroy Merlin | Instalación |

**Total candidatos: 50 productos. Categorías bien cubiertas.**

---

## ENTREGABLE 3 · Mapeo de programas de afiliación activos

### Amazon Associates España
- **Estado:** disponible.
- **Comisión típica:** 1-3% según categoría.
- **Categorías relevantes:**
  - Neveras portátiles: ~3%
  - Placas solares: ~3%
  - Baterías: ~1,5%
  - Inversores: ~1,5%
  - Menaje: ~4-6%
- **Verificar:** comisiones exactas tras aprobación.

### Awin (España)
- **Estado:** Publisher registration abierta.
- **Programas relevantes a solicitar:**

| Programa | Categoría | Notas |
|---|---|---|
| Leroy Merlin | Bricolaje / energía | Aprobación razonable |
| Bricomart | Bricolaje | Similar |
| Aki Bricolaje | Bricolaje | Menos productos camper directos |
| Worten | Electrónica | Inversores, monitores |
| Norauto | Baterías / coche | Útil |
| Feu Vert | Baterías / coche | Útil |
| Campingaz (si tiene) | Gas / cocina | Verificar |

### Programas directos (a investigar)
- **Dometic:** verificar si tiene programa de afiliación directo.
- **Victron Energy:** a veces vía distribuidores autorizados (no público).
- **EcoFlow:** confirmar.
- **Webasto:** distribución cerrada, no hay programa directo.

### CPL — partners potenciales
- Instaladores placas solares furgonetas (buscar 5-10 en España).
- Talleres de camperización profesional.
- Cursos de camperización DIY (online y presencial).

---

## ENTREGABLE 4 · Top 10 keywords long-tail con intención de compra

> Para Google Ads en Fase 3 (Día 10). Estimación de CPC en España:

| Keyword | CPC estimado | Intención |
|---|---|---|
| "mejor nevera portátil para furgoneta" | 0,40-0,80€ | Alta, comparativa |
| "kit solar para furgoneta precio" | 0,60-1,20€ | Alta, transaccional |
| "batería auxiliar para camper" | 0,50-1,00€ | Alta, transaccional |
| "qué necesito para camperizar una furgo" | 0,30-0,60€ | Media-alta, informativa |
| "nevera compresor vs absorción furgoneta" | 0,30-0,50€ | Alta, comparativa |
| "inversor 12v 220v para coche" | 0,40-0,70€ | Alta, transaccional |
| "batería lithium camper vs agm" | 0,30-0,60€ | Alta, comparativa |
| "cocina camper instalación gas normativa" | 0,20-0,40€ | Media, mixta |
| "autocaravana vs camperizar" | 0,30-0,50€ | Media, informativa |
| "cuánta batería necesito para nevera portátil" | 0,30-0,60€ | Alta, técnica |

**Estimación:** con 50-100€ en 5 días, conseguimos 200-500 clics a la landing.

---

## ENTREGABLE 5 · Mi recomendación sobre los 30 productos iniciales

De los 50 candidatos, recomiendo empezar con estos **30** (los más vendidos + más consultados en el sector):

**Tier 1 (imprescindibles, 15 productos):**

Neveras: Dometic CFX3 55, Dometic CFX3 45, Engel MT45F-S, Mobicool MCG15 (4)

Placas: Victron 100W, Victron 175W, panel genérico 100W rígido (3)

Baterías: Varta AGM 95Ah, Varta AGM 130Ah, LiFePO4 100Ah genérica (3)

Inversores: Victron Phoenix 12/800, Bestek 1000W (2)

Reguladores: Victron SmartSolar 75/15 (1)

Otros: Relé Cyrix, monitor BMV-712 (2)

**Tier 2 (cubren casos específicos, 10 productos):**

Iluminación: tira LED 12V, plafón táctil (2)

Cocinas: Campingaz CV 470, cocina plegable (2)

Calefacción: Webasto Air Top 2000, calentador gas portátil (2)

Agua: bidón 20L, ducha portátil (2)

Accesorios: Sikaflex 252, pasacables estanco (2)

**Tier 3 (accesorios avanzados, 5 productos):**

- Aislamiento Kaiflex
- Ventana Dometic S4
- Litio 200Ah con BMS
- EcoFlow 220W bifacial
- Inversor Victron 12/1200

---

## ENTREGABLE 6 · Lo que necesito de vuelta (Día 2)

1. **Aprobación de los 30 productos iniciales** (o cambios si quieres añadir/quitar).
2. **Confirmación de qué competidores analizar más en profundidad** (opcional).
3. **Comentarios sobre las keywords** (¿alguna que te parezca más relevante?).

Tiempo estimado de revisión: **30-45 minutos**.

---

## Tu tarde / noche del Día 2

```
□ 1. Lee el análisis de competidores (10 min)
□ 2. Revisa la lista de 50 productos (15 min)
□ 3. Marca los 30 productos Tier 1+2+3 que quieres incluir
□ 4. Revisa las keywords (5 min)
□ 5. Mándame tu feedback

TIEMPO TOTAL: ~35 minutos.
```

Cuando me devuelvas esto, mañana (Día 3) empiezo a cargar todo en Supabase.
