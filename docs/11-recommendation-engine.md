# 11 · RECOMMENDATION ENGINE — ARQUITECTURA

> **Estado:** DEFINITIVO para MVP tras iteración con el promotor.
> **Patrón:** hard filters deterministas (Supabase) + contexto narrativo (`.md`) + LLM como parser y explicador.

---

## 1. Principio rector

```
HARD CONSTRAINTS  →  código SQL determinista (Supabase)
SOFT PREFERENCES   →  LLM con contexto (`.md`)
EXPLICACIÓN       →  LLM al final, basándose en los datos ya filtrados
```

El LLM **nunca decide qué productos son elegibles**. Solo:

1. **Parsea** la pregunta del usuario en requisitos estructurados (JSON).
2. **Explica** por qué los productos filtrados encajan o no.

Las decisiones críticas (precio, compatibilidad, stock) viven en datos estructurados. El LLM no las inventa.

---

## 2. Flujo completo

```
┌─────────────────────────────────────────────┐
│  USUARIO                                    │
│  "¿Qué nevera me pongo en mi furgo         │
│   con 800€?"                                │
└──────────────────┬──────────────────────────┘
                   ↓
┌─────────────────────────────────────────────┐
│  PASO 1 · LLM PARSER                       │
│  System prompt + pregunta del usuario       │
│  Devuelve JSON:                             │
│  {                                          │
│    "vehiculo": "furgoneta",                 │
│    "presupuesto_max": 800,                  │
│    "categorias": ["nevera"],                │
│    "restricciones": [],                     │
│    "uso": "fines_de_semana"                 │
│  }                                          │
└──────────────────┬──────────────────────────┘
                   ↓
┌─────────────────────────────────────────────┐
│  PASO 2 · HARD FILTERS (Supabase REST)      │
│  SELECT * FROM productos                    │
│  WHERE categoria = 'neveras'                │
│    AND precio <= 800                        │
│    AND 'furgoneta' = ANY(vehiculos_compatibles)│
│    AND disponible = true                    │
│  ORDER BY ... (heurística simple)           │
│  LIMIT 20                                   │
│                                             │
│  → 4 productos candidatos                  │
└──────────────────┬──────────────────────────┘
                   ↓
┌─────────────────────────────────────────────┐
│  PASO 3 · CARGA DE CONTEXTO (.md)           │
│  Para cada candidato, fetch del .md:        │
│  /knowledge/productos/[id].md               │
│  → array { producto, contexto_narrativo }   │
└──────────────────┬──────────────────────────┘
                   ↓
┌─────────────────────────────────────────────┐
│  PASO 4 · LLM EXPLICACIÓN                  │
│  System prompt + requisitos + productos    │
│  + contexto .md                            │
│                                             │
│  → respuesta estructurada:                 │
│    "Te recomiendo X porque..."              │
│    "No te recomiendo Y porque..."           │
│    "Accesorio complementario: Z"            │
└──────────────────┬──────────────────────────┘
                   ↓
┌─────────────────────────────────────────────┐
│  PASO 5 · RENDERIZADO                      │
│  HTML con:                                  │
│  - respuesta en markdown                    │
│  - botones de afiliado (Supabase.url_afiliada)│
│  - disclaimer de afiliación                 │
│  - tracking de clicks → Supabase.eventos   │
└─────────────────────────────────────────────┘
```

---

## 3. Detalle por etapa

### 3.1. LLM Parser

**Input:** pregunta en lenguaje natural del usuario + system prompt del asesor.

**Output:** JSON estricto con este esquema:

```json
{
  "vehiculo": "furgoneta|coche|camion|otro",
  "tipo_vehiculo": "mediana|grande|pequena|null",
  "presupuesto_min": 0,
  "presupuesto_max": 1500,
  "categorias": ["nevera", "placa", "bateria", "inversor", "iluminacion", "cocina", "menaje", "ducha", "calefaccion", "ventana", "otro"],
  "uso": "fines_de_semana|vacaciones|larga_duracion|diario|null",
  "num_personas": 1,
  "restricciones": ["no_obra", "sin_gas", "espacio_limitado", "principiante", "solo_alquiler"],
  "nivel_experiencia": "principiante|intermedio|avanzado"
}
```

**Configuración LLM:**

- Temperatura: **0.1–0.2** (consistencia).
- Max tokens: ~500 (solo el JSON).
- Prompt extractor reforzado: "Si falta información, devuelve null. NO inventes datos".

### 3.2. Hard Filters (Supabase)

Query determinista con PostgREST:

```
GET /rest/v1/productos
  ?categoria=in.(neveras,placas)
  &precio=lte.800
  &vehiculos_compatibles=cs.{furgoneta}
  &disponible=eq.true
  &select=*
  &limit=20
```

**Filtros disponibles (columnas de la tabla `productos`):**

| Campo Supabase | Filtro | Ejemplo |
|---|---|---|
| `categoria` | `in.(a,b,c)` | categorías relevantes |
| `precio` | `lte.X` o `gte.X` | presupuesto máximo |
| `vehiculos_compatibles` | `cs.{X}` (contains) | tipo de vehículo |
| `disponible` | `eq.true` | solo en stock |
| `nivel_usuario` | `eq.X` | nivel declarado |
| `potencia_w` | `gte.X` | mínimo vatios |
| `capacidad_litros` | `gte.X` | mínimo capacidad |
| `capacidad_ah` | `gte.X` | mínimo amperaje |
| `tags` | `cs.{X}` | tags específicos |

**Ordenación heurística** (en MVP, sin ML):

- Por defecto: productos con mejor relación calidad/precio percibida (campo `tags` o por coincidencia con `casos_de_uso` declarado).
- Fase 2: scoring aprendido por interacciones reales.

### 3.3. Carga de contexto `.md`

Para cada uno de los top N candidatos (N=5 por defecto), el chat client hace:

```javascript
fetch('/knowledge/productos/' + producto.id + '.md')
  .then(r => r.text())
```

**Por qué `.md` y no JSON o base de datos:**

- El LLM entiende markdown nativamente.
- Editable por humanos sin tocar código.
- Versionable con git (cambios revisables).
- Permite descripciones largas sin sobrecargar el JSON de Supabase.

### 3.4. LLM Explicación

**Input:**

```
SYSTEM: [asesor-camper.md]

USER:
PREGUNTA ORIGINAL: "..."

REQUISITOS EXTRAÍDOS: [JSON]

PRODUCTOS CANDIDATOS:
---
### Producto A (650€)
[contenido del .md]
---
### Producto B (750€)
[contenido del .md]
---
...

Genera la recomendación con este formato:
- Mi recomendación principal
- Te lo recomiendo porque (3-5 razones específicas al perfil)
- Cuándo NO lo recomendaría (1-2 situaciones)
- Precio orientativo (de los datos)
- Alternativa que descarté (1-2) y por qué
- Siguiente paso lógico (accesorio complementario si aplica)

Si aplica, sugiere al final: "¿Quieres que un instalador te contacte sin compromiso?"
```

**Configuración LLM:**

- Temperatura: **0.4–0.5** (un poco más creativo para la explicación).
- Max tokens: ~1500–2000.
- El system prompt del asesor define el tono, las reglas anti-alucinación y la estructura obligatoria.

### 3.5. Renderizado

- Markdown → HTML (con librería ligera como `marked`).
- Botones de afiliado: `<a href="${url_afiliada}" rel="sponsored noopener" data-producto="${id}">`.
- Tracking: `onclick` que registra `affiliate_clicked` en Supabase.
- Disclaimer visible: "Enlaces de afiliado. Si compras, recibimos una comisión sin que afecte al precio."

---

## 4. "Por qué te lo recomiendo" — feature central

Cada recomendación generada por el LLM incluye obligatoriamente:

```
### Mi recomendación principal: [nombre]

✓ Te lo recomiendo porque:
- [Razón 1 específica al perfil del usuario]
- [Razón 2]
- [Razón 3]

⚠ Cuándo NO lo recomendaría:
- [Situación 1]
- [Situación 2]

💰 Precio orientativo: [de Supabase] (verificar antes de comprar)

❌ Alternativa descartada: [otro producto]
[Por qué no encaja para este perfil]

🔧 Siguiente paso lógico: [accesorio complementario]
```

Esto diferencia al motor de un simple buscador o un chatbot genérico.

---

## 5. Límites del MVP

- ❌ No scoring ML (es heurístico por ahora).
- ❌ No collaborative filtering.
- ❌ No embeddings semánticos (`.md` se inyecta entero al LLM).
- ❌ No aprendizaje automático por usuario.
- ❌ No multi-modal (texto + imagen).

**Por qué:** cada capa adicional multiplica complejidad sin revenue claro en fase 1. Se añaden cuando el motor esté validado.

---

## 6. Fallos y mitigaciones

| Fallo | Mitigación |
|---|---|
| El LLM no devuelve JSON válido | Retry con prompt "responde SOLO JSON válido". Si falla 3 veces, pregunta cerrada al usuario. |
| El LLM inventa un precio | El system prompt lo prohíbe explícitamente. Si pasa, hay que revisar el system prompt. |
| El `.md` no existe para un producto | El chat usa un placeholder genérico + marca el producto como "sin detalle". |
| La query a Supabase devuelve 0 resultados | Sugerir relajar presupuesto o cambiar categoría. |
| El LLM recomienda un producto descatalogado | El filtro `disponible = true` lo excluye antes. |

---

## 7. Cuándo migrar a MCP / n8n / scoring avanzado

| Trigger | Acción |
|---|---|
| Catálogo > 200 productos | MCP para queries más limpias + caching. |
| Tiempo de respuesta > 5s | Optimizar carga de `.md` (lazy load + caché). |
| CTR < 10% | Revisar explicaciones. A/B testing de system prompt. |
| > 5.000 visitas/mes | Scoring ML sobre los `eventos` acumulados. |
| > 3 fuentes de datos externas | MCP consolidado como capa de herramientas. |

---

## 8. Pendiente

- [x] Arquitectura básica definida.
- [ ] Testear con 5 preguntas reales distintas.
- [ ] Medir latencia por etapa.
- [ ] Medir % de alucinaciones.
- [ ] Iterar system prompt hasta < 5% alucinaciones.
