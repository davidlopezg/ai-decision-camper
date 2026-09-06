# 10 · PRODUCT DATA MODEL

> **Estado:** BORRADOR INICIAL — el modelo se completará al construir el catálogo.
> **Herramienta inicial:** Airtable / Google Sheets (MVP) → Postgres (fase 2).

---

## 1. Modelo de datos del producto

### 1.1. Tabla `productos`

| Campo | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `id` | string (slug) | ✅ | Identificador único, ej. `dometic-cfx3-55` |
| `nombre` | string | ✅ | Nombre legible |
| `marca` | string | ✅ | Marca |
| `modelo` | string | ✅ | Modelo exacto |
| `categoria` | enum | ✅ | neveras, placas-solares, baterias, inversores, iluminacion, cocinas, menaje, duchas-agua, calefaccion, ventanas-aislamiento, accesorios |
| `subcategoria` | string | — | Subcategoría |
| `precio` | number | ✅ | EUR |
| `moneda` | enum | ✅ | EUR (MVP) |
| `pais` | enum | ✅ | ES (MVP) |
| `disponibilidad` | enum | ✅ | en-stock / bajo-pedido / descatalogado |
| `url_producto` | string | ✅ | URL del comercio (no afiliada) |
| `url_afiliada` | string | ✅ | URL con tag de afiliado |
| `programa` | enum | ✅ | amazon / awin / manual / impacto / cj / directo |
| `comision_pct` | number | ✅ | Comisión efectiva esperada (%) |
| `comision_fija` | number | — | Si es CPL en vez de % |
| `imagen_principal` | string | ✅ | URL imagen |
| `descripcion_corta` | text | ✅ | Resumen |
| `descripcion_larga` | markdown | ✅ | Detalle |
| `caracteristicas` | JSON | ✅ | Lista clave-valor |
| `dimensiones` | JSON | — | {largo, ancho, alto, peso} |
| `compatibilidades` | array<id> | — | Otros IDs compatibles |
| `incompatibilidades` | array<id> | — | Otros IDs incompatibles |
| `requerimientos` | array<id> | — | Productos necesarios |
| `accesorios_recomendados` | array<id> | — | Complementos naturales |
| `casos_de_uso` | array<string> | ✅ | Tags |
| `nivel_usuario` | enum | ✅ | principiante / intermedio / avanzado |
| `ventajas` | array<string> | ✅ | Mínimo 2 |
| `inconvenientes` | array<string> | ✅ | Mínimo 1 (transparencia) |
| `valoraciones_resumen` | text | — | Resumen de reviews reales |
| `precio_historico` | JSON | — | Para detectar bajadas |
| `fecha_actualizacion` | date | ✅ | Última revisión |
| `fuente_datos` | string | ✅ | Quién lo actualizó |
| `activo` | bool | ✅ | Soft-delete |

### 1.2. Tabla `categorias`

| Campo | Tipo |
|---|---|
| `id` | string |
| `nombre` | string |
| `slug` | string |
| `descripcion` | markdown |
| `orden` | int |
| `padre_id` | string (nullable) |

### 1.3. Tabla `compatibilidad_reglas`

Para reglas que no se modelan como edges simples.

| Campo | Tipo |
|---|---|
| `id` | string |
| `tipo` | enum: requiere / excluye / alternativa / accesorio |
| `producto_a` | id |
| `producto_b` | id |
| `motivo` | text |
| `nivel_confianza` | enum: alta / media / baja |
| `fuente` | string |

### 1.4. Tabla `kits_precargados` (opcional MVP)

| Campo | Tipo |
|---|---|
| `id` | string |
| `nombre` | string |
| `descripcion` | text |
| `productos` | array<id> |
| `precio_total` | number |
| `publico_objetivo` | string |

---

## 2. Modelo de datos del usuario (mínimo MVP)

### Tabla `eventos` (analytics-first)

| Campo | Tipo |
|---|---|
| `id` | uuid |
| `timestamp` | datetime |
| `user_id_anon` | string (cookie) |
| `session_id` | string |
| `evento` | enum (12 eventos) |
| `categoria` | string |
| `producto_id` | string (nullable) |
| `metadata` | JSON |

> El usuario identificado por email es opcional. Si existe, se crea registro en `usuarios`.

### Tabla `usuarios` (opcional)

| Campo | Tipo |
|---|---|
| `id` | uuid |
| `email` | string |
| `fecha_registro` | datetime |
| `consentimiento_rgpd` | bool |
| `fuente_consentimiento` | string |
| `preferencias_marketing` | bool |
| `vehiculo_tipo` | string |
| `presupuesto_max` | number |
| `casos_de_uso` | array<string> |
| `recomendaciones_guardadas` | array<id> |
| `ultimo_evento` | datetime |

---

## 3. Modelo de datos del lead CPL

### Tabla `leads`

| Campo | Tipo |
|---|---|
| `id` | uuid |
| `timestamp` | datetime |
| `usuario_id` | uuid (nullable) |
| `nombre` | string |
| `email` | string |
| `telefono` | string (opcional) |
| `cp` | string |
| `provincia` | string |
| `vehiculo_tipo` | string |
| `categoria_interes` | string |
| `presupuesto_estimado` | number |
| `descripcion` | text |
| `consentimiento_rgpd` | bool (true) |
| `consentimiento_marketing` | bool |
| `partner_asignado` | string |
| `estado` | enum: nuevo / enviado / contactado / cerrado-gano / cerrado-perdio / caduco |
| `valor_cpl` | number |
| `valor_total_conversion` | number (si se conoce) |
| `fecha_envio_partner` | datetime |

---

## 4. Pendiente

- [ ] Definir la versión JSON Schema / Airtable schema definitiva.
- [ ] Crear el primer set de 50 productos con todas las fichas completas.
- [ ] Definir las reglas de compatibilidad iniciales.
- [ ] Diseñar el proceso de actualización (frecuencia, fuente).
