# 12 · AI ARCHITECTURE

> **Estado:** DEFINITIVO para MVP.
> **Stack:** API directa del LLM desde el navegador.
> **Proveedor MVP:** MiniMax (u otro — agnostic por diseño).

---

## 1. Principios rectores

1. **La IA interpreta y explica, no inventa.** Datos críticos (precio, stock, compatibilidad) vienen SIEMPRE de Supabase.
2. **El system prompt es un `.md` versionado** en el repo, no hardcoded.
3. **Cada llamada al LLM tiene propósito claro** y se registra como evento.
4. **Coste objetivo:** < 30€/mes en MVP.
5. **Agnóstico de proveedor.** Si cambias de MiniMax a Claude o GPT, solo cambia el wrapper.

---

## 2. Funciones de IA en el MVP

| Función | Modelo usado | Coste aprox. | Latencia |
|---|---|---|---|
| Parsear pregunta → JSON | LLM principal, temp 0.2 | ~$0.005 | < 2s |
| Generar recomendación final | LLM principal, temp 0.5 | ~$0.02–0.04 | < 5s |
| Resumir requisitos al usuario | LLM principal, temp 0.4 | ~$0.005 | < 2s |
| Análisis de feedback (fase 2) | LLM principal | ~$0.005 | < 2s |

**Coste estimado por recomendación completa: $0.03–0.05** (≈ 0,03–0,05€).
A 1.000 recomendaciones/mes → ~30–50€/mes si el LLM es MiniMax u otro con pricing similar.

---

## 3. Patrón de uso

### 3.1. System prompt como `.md`

- Ruta: `/system-prompts/asesor-camper.md`.
- Cargado una vez por sesión (cacheado en `sessionStorage` del navegador).
- Editable en el repo sin redeploy del chat (basta con un `git pull` + rebuild).
- El system prompt actual (`asesor-camper.md`) define:
  - Identidad del asistente.
  - Reglas inquebrantables (no inventar, declarar comisiones, etc.).
  - Tono y estilo.
  - Estructura obligatoria de respuesta.
  - Disclaimer pattern.

### 3.2. Estructura de mensajes

Cada llamada al LLM sigue esta estructura:

```
messages: [
  { role: "system", content: systemPrompt },           // cargado de .md
  { role: "user", content: preguntaUsuario },            // pregunta cruda
  // opcionalmente:
  { role: "assistant", content: requisitosJSON },        // paso 1
  { role: "user", content: productosConContexto },       // paso 2
]
```

### 3.3. Llamadas encadenadas

Para cada pregunta del usuario se hacen **2 llamadas al LLM**:

1. **Parser call:** system + user → JSON de requisitos.
2. **Explanation call:** system + user(contexto) → recomendación final.

Separar las llamadas permite:
- Validar el JSON antes de la segunda llamada.
- Si falla el parseo, retry sin gastar la segunda llamada.
- Cada llamada se optimiza independientemente.

### 3.4. Guardrails

- Temperatura **baja (0.1–0.2)** en el parser → consistencia.
- Temperatura **media (0.4–0.5)** en la explicación → algo de variación.
- Validación del JSON: schema check antes de continuar.
- Si el LLM alucina datos críticos (precio inventado, comisión incorrecta), se descarta la respuesta y se reformula.
- Mensaje de fallback: "Lo siento, no he podido procesar tu pregunta. ¿Puedes reformularla?"

### 3.5. Caché

- **Caché del system prompt** en `sessionStorage` (dura la sesión).
- **Caché de `.md` de producto** en memoria del cliente (no recargar el mismo `.md` varias veces en una sesión).
- **Caché de respuestas** (fase 2): preguntas idénticas devuelven la misma recomendación sin re-llamar al LLM.

---

## 4. Prompts principales

### 4.1. System prompt del asesor

Ver `/system-prompts/asesor-camper.md`. Resumen de lo que contiene:

- Identidad y personalidad.
- Reglas inquebrantables.
- Cómo comportarse (preguntas, tono, formato).
- Estructura de respuesta obligatoria.
- Frases prohibidas.
- Disclaimers cuando aplica.
- Información del proyecto.

### 4.2. Prompt de extracción (anexado al system prompt en cada llamada)

```
Para esta conversación, además de tu rol normal, en tu PRIMERA respuesta debes 
devolver SOLO un JSON válido con esta estructura exacta:

{
  "vehiculo": "furgoneta|coche|camion|otro",
  "tipo_vehiculo": "mediana|grande|pequena|null",
  "presupuesto_min": number,
  "presupuesto_max": number,
  "categorias": array<string>,
  "uso": "fines_de_semana|vacaciones|larga_duracion|diario|null",
  "num_personas": number,
  "restricciones": array<string>,
  "nivel_experiencia": "principiante|intermedio|avanzado",
  "preguntas_faltantes": array<string>
}

Si falta información, devuelve null en ese campo y añade la pregunta a 
"preguntas_faltantes".

Responde SOLO el JSON. Sin markdown, sin explicaciones adicionales.
```

### 4.3. Prompt de recomendación (segunda llamada)

```
[system prompt del asesor]

PREGUNTA ORIGINAL DEL USUARIO: "{pregunta}"

REQUISITOS EXTRAÍDOS (de tu paso anterior):
{requisitosJSON}

PRODUCTOS CANDIDATOS TRAS FILTROS HARD:
{cada producto con su contexto .md embebido}

Tu tarea ahora:
1. Recomienda UN producto principal que mejor encaje con los requisitos.
2. Indica 1-2 alternativas descartadas con motivo.
3. Sugiere 1 accesorio complementario si aplica.
4. Si el producto requiere instalación profesional, sugiere el CPL.
5. Estructura la respuesta según tu system prompt.
```

---

## 5. NO uso de IA

- ❌ Generar contenido SEO programático en masa.
- ❌ Inventar precios, compatibilidades o disponibilidad.
- ❌ Personalización sin datos.
- ❌ Sustituir al editor humano en decisiones críticas.
- ❌ Resumir o reescribir `.md` (es fuente de verdad).

---

## 6. Proveedor — agnosticismo

El chat client usa un wrapper (`llm.js`) que abstrae el proveedor. Cambiar de MiniMax a otro es cuestión de modificar ese archivo.

```javascript
// js/llm.js
const LLM_ENDPOINT = process.env.LLM_ENDPOINT; 
// "https://api.minimaxi.com/v1/text/chatcompletion_v2"
// o "https://api.anthropic.com/v1/messages"
// o "https://api.openai.com/v1/chat/completions"

const transformRequest = (mensajes, opts) => { /* adaptar a formato del proveedor */ };
const transformResponse = (data) => { /* extraer contenido */ };

export async function llamarLLM(mensajes, opts = {}) {
  const r = await fetch(LLM_ENDPOINT, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${LLM_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(transformRequest(mensajes, opts))
  });
  return transformResponse(await r.json());
}
```

### Comparativa rápida de proveedores

| Proveedor | Coste / 1M tokens in/out | Velocidad | Calidad ES | Notas |
|---|---|---|---|---|
| **MiniMax** | Variable según plan | Alta | Buena | Usado en MVP por el promotor. |
| **Anthropic Claude 3.5 Sonnet** | $3 / $15 | Media | Excelente | Más caro, mejor razonamiento. |
| **OpenAI GPT-4o** | $2.50 / $10 | Alta | Muy buena | Ecosistema maduro. |
| **OpenAI GPT-4o-mini** | $0.15 / $0.60 | Alta | Buena | Muy barato para parser. |
| **Google Gemini 2.0 Flash** | $0.10 / $0.40 | Alta | Buena | Barato. |
| **Self-hosted (Llama, Mistral)** | Solo infra | Variable | Variable | Más complejo. |

**Recomendación MVP:** el que ya tengas configurado. Coste estimado 30–50€/mes con cualquier proveedor serio.

---

## 7. Seguridad de la API key

### Riesgo

La API key viaja en el bundle JS de GitHub Pages. Cualquiera puede verla y abusar.

### Mitigaciones inmediatas (MVP)

1. **API key con límite de gasto** (30€/mes).
2. **Rate limit** (60 req/min).
3. **Key distinta** de la de desarrollo.
4. **Inyectada en build time** vía GitHub Actions con secret (no commitear `.env`).
5. **Rotación mensual** o ante sospecha de abuso.

### Mitigación fase 1+

**Cloudflare Worker como proxy** (gratis, 5 minutos):

```javascript
// worker.js
export default {
  async fetch(request, env) {
    if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });
    
    const body = await request.json();
    
    const llmResponse = await fetch(env.LLM_ENDPOINT, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${env.LLM_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    
    return new Response(llmResponse.body, {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
};
```

El worker tiene la API key en `env`, el navegador solo conoce la URL del worker.

---

## 8. Tracking de uso del LLM

Cada llamada al LLM debe generar un evento en Supabase:

```javascript
await registrarEvento({
  session_id: sessionId,
  evento: 'llm_call',
  metadata: {
    tipo: 'parser|explicacion',
    modelo: 'MiniMax-Text-01',
    tokens_in: data.usage.prompt_tokens,
    tokens_out: data.usage.completion_tokens,
    duracion_ms: Date.now() - inicio,
    exito: true
  }
});
```

Esto permite:
- Calcular coste real mensualmente.
- Detectar anomalías (uso excesivo de un usuario).
- Optimizar (qué tipo de llamada cuesta más).

---

## 9. Roadmap de uso de IA

**MVP:**

- Asistente básico (parser + explicación).
- Copy de email.
- Análisis de feedback (opcional).

**Fase 2 (mes 3–6):**

- RAG sobre reviews de productos.
- Generación de comparativas.
- Predicción de intención de recompra.

**Fase 3 (mes 6+):**

- Personalización por usuario identificado.
- Generación de contenido SEO dinámico.
- Multi-idioma.

---

## 10. Pendiente

- [x] System prompt escrito (`asesor-camper.md`).
- [ ] Wrapper `llm.js` agnóstico.
- [ ] Tracking de cada llamada.
- [ ] Medir coste real por interacción en las primeras 100 conversaciones.
- [ ] Iterar system prompt si hay alucinaciones.
