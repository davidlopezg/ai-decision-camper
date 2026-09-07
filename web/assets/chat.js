/* Camper Decision · chat client
   Vanilla JS. Sin dependencias. 0 frameworks.
   Flujo: pregunta → LLM parser (JSON) → Supabase query → fetch .md → LLM explicación → render
*/

(() => {
  'use strict';

  // ============== CONFIG & STATE ==============
  if (typeof CONFIG === 'undefined') {
    console.error('[chat] config.js no cargado. Configura primero.');
    document.body.innerHTML = '<div style="padding:2rem;font-family:sans-serif;">Error: falta config.js con las keys. Copia config.example.js a config.js y rellena.</div>';
    return;
  }

  const state = {
    step: 0,
    answers: {},
    requirements: null,
    products: [],
    knowledge: {},
    recommendation: null,
    systemPrompt: null,
  };

  // ============== QUESTIONS ==============
  const QUESTIONS = [
    {
      id: 'vehiculo',
      q: '¿Qué furgoneta tienes?',
      help: 'Modelo y año aproximado. Si no la tienes aún, dinos qué buscas.',
      type: 'text',
      placeholder: 'Ej. Ford Transit 2020, Volkswagen Caddy 2018, Citroën Berlingo…',
      validate: v => v.trim().length >= 2,
    },
    {
      id: 'punto_partida',
      q: '¿Desde dónde partes?',
      help: 'Esto nos dice qué tipo de equipamiento necesitas ahora.',
      type: 'choice',
      options: [
        { value: 'desde_cero', label: 'Desde cero' },
        { value: 'algo_equipado', label: 'Tengo algo equipado' },
        { value: 'full_equipada', label: 'Ya está full equipación' },
      ],
    },
    {
      id: 'presupuesto',
      q: '¿Cuál es tu presupuesto total?',
      help: 'Una cifra orientativa. No tiene que ser exacta.',
      type: 'text',
      placeholder: 'Ej. 2500 €, 5000 €, 1000 €',
      validate: v => /^\d{3,6}\s*€?$/.test(v.trim()),
    },
    {
      id: 'uso',
      q: '¿Cómo la vas a usar principalmente?',
      help: 'El patrón de uso determina qué componentes importan más.',
      type: 'choice',
      options: [
        { value: 'finde', label: 'Fines de semana' },
        { value: 'semanas', label: 'Semanas sueltas' },
        { value: 'todo_año', label: 'Todo el año' },
        { value: 'nomada', label: 'Nómada digital' },
      ],
    },
    {
      id: 'autonomia',
      q: '¿Cuántos días seguidos sin conectarte a red?',
      help: 'Define la autonomía que necesita tu sistema eléctrico.',
      type: 'choice',
      options: [
        { value: 'corto', label: '1-3 días' },
        { value: 'medio', label: '4-7 días' },
        { value: 'largo', label: 'Más de 7 días' },
      ],
    },
  ];

  // ============== VIEW MANAGEMENT ==============
  const views = ['welcome', 'questions', 'processing', 'result'];
  function showView(name) {
    views.forEach(v => {
      const el = document.getElementById(`chat-${v}`);
      if (el) el.classList.toggle('chat-view-active', v === name);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ============== THREAD (chat bubbles) ==============
  function appendBubble(role, html) {
    const thread = document.getElementById('chat-thread');
    if (!thread) return;
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble chat-bubble-${role}`;
    const icon = role === 'bot'
      ? `<div class="chat-bubble-icon" aria-hidden="true">
           <svg viewBox="0 0 24 24" width="18" height="18"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>
         </div>`
      : '';
    bubble.innerHTML = `${icon}<div class="chat-bubble-body">${html}</div>`;
    thread.appendChild(bubble);
    thread.scrollTop = thread.scrollHeight;
    return bubble;
  }

  function appendQuestionBubble(question) {
    const q = question.q;
    const help = question.help ? `<p class="chat-bubble-help">${escapeHtml(question.help)}</p>` : '';
    let input = '';
    if (question.type === 'text') {
      input = `<input type="text" class="chat-text-input"
                placeholder="${escapeHtml(question.placeholder || '')}"
                aria-label="Tu respuesta">
              <button class="btn btn-primary chat-submit" type="button">Responder →</button>
              <button class="chat-skip" type="button">No estoy seguro, pasa</button>`;
    } else if (question.type === 'choice') {
      const opts = question.options.map(o =>
        `<button class="chat-option" type="button" data-value="${escapeHtml(o.value)}">${escapeHtml(o.label)}</button>`
      ).join('');
      input = `<div class="chat-bubble-options" role="group">${opts}</div>`;
    }
    return appendBubble('bot', `<p class="chat-bubble-q">${escapeHtml(q)}</p>${help}${input}`);
  }

  function appendUserAnswerBubble(answer) {
    appendBubble('user', `<p class="chat-bubble-q">${escapeHtml(answer)}</p>`);
  }

  // ============== STEP MANAGEMENT ==============
  function startChat() {
    state.step = 0;
    state.answers = {};
    document.getElementById('chat-thread').innerHTML = '';
    showView('questions');
    askCurrentQuestion();
  }

  function askCurrentQuestion() {
    const q = QUESTIONS[state.step];
    if (!q) return finishQuestions();
    const total = QUESTIONS.length;
    const bar = document.getElementById('chat-progress-bar');
    const label = document.getElementById('chat-progress-label');
    if (bar) bar.style.width = `${(state.step / total) * 100}%`;
    if (label) label.textContent = `Pregunta ${state.step + 1} de ${total}`;
    appendQuestionBubble(q);
    wireQuestionInput(q);
  }

  function wireQuestionInput(q) {
    if (q.type === 'text') {
      // Buscar el input DENTRO de la última burbuja (la actual).
      // getElementById('#chat-q-input') falla cuando hay varios inputs en el DOM
      // (uno por cada pregunta de tipo 'text' ya respondida).
      const bubble = document.getElementById('chat-thread').lastElementChild;
      const input  = bubble?.querySelector('.chat-text-input');
      const submit = bubble?.querySelector('.chat-submit');
      const skip   = bubble?.querySelector('.chat-skip');
      if (input) {
        input.focus();
        input.addEventListener('keydown', e => {
          if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitAnswer(q, input); }
        });
      }
      if (submit) submit.addEventListener('click', () => submitAnswer(q, input));
      if (skip)   skip.addEventListener('click',   () => submitAnswer(q, input, true));
    } else if (q.type === 'choice') {
      document.querySelectorAll('.chat-bubble-options .chat-option').forEach(btn => {
        btn.addEventListener('click', () => {
          const value = btn.dataset.value;
          const label = btn.textContent.trim();
          markOptionSelected(btn);
          appendUserAnswerBubble(label);
          saveAnswer(value);
          advance();
        });
      });
    }
  }

  function markOptionSelected(btn) {
    btn.parentElement.querySelectorAll('.chat-option').forEach(b => b.classList.remove('chat-option-selected'));
    btn.classList.add('chat-option-selected');
  }

  function submitAnswer(q, input, skipped = false) {
    const raw = input ? input.value.trim() : '';
    if (!skipped && q.validate && !q.validate(raw)) return;
    const value = skipped ? 'no_specified' : raw;
    const label = skipped ? 'No estoy seguro' : raw;
    appendUserAnswerBubble(label);
    saveAnswer(value);
    advance();
  }

  function saveAnswer(value) {
    const q = QUESTIONS[state.step];
    state.answers[q.id] = value;
  }

  function advance() {
    state.step++;
    setTimeout(askCurrentQuestion, 350);
  }

  function finishQuestions() {
    showView('processing');
    runPipeline();
  }

  // ============== PIPELINE ==============
  async function runPipeline() {
    try {
      activateStep(1);
      const requirements = await parseRequirements(state.answers);
      state.requirements = requirements;

      activateStep(2);
      const products = await querySupabase(requirements);
      state.products = products;

      activateStep(3);
      const knowledge = await fetchKnowledge(products.map(p => p.id));
      state.knowledge = knowledge;

      activateStep(4);
      const recommendation = await generateRecommendation(requirements, products, knowledge);
      state.recommendation = recommendation;

      setTimeout(() => renderResult(recommendation), 400);
    } catch (err) {
      console.error('[chat] pipeline error:', err);
      renderError(err.message || 'Algo ha fallado. Por favor, inténtalo de nuevo.');
    }
  }

  function activateStep(n) {
    document.querySelectorAll('.chat-processing-steps li').forEach((li, i) => {
      li.classList.remove('active', 'done');
      if (i + 1 < n) li.classList.add('done');
      else if (i + 1 === n) { li.classList.add('active'); li.classList.remove('done'); }
      else { li.classList.remove('active', 'done'); }
    });
    const stepEl = document.getElementById('chat-processing-step');
    const labels = {
      1: 'Extrayendo requisitos de tus respuestas…',
      2: 'Filtrando el catálogo con tus restricciones…',
      3: 'Cargando fichas de producto…',
      4: 'Generando la recomendación explicada…',
    };
    if (stepEl) stepEl.textContent = labels[n] || '';
  }

  // ============== LLM: PARSE REQUIREMENTS ==============
  async function parseRequirements(answers) {
    const prompt = `Eres un parser de requisitos. Tu única tarea es extraer un JSON estructurado a partir de las respuestas del usuario. NO respondas con texto adicional. SOLO el JSON.

Respuestas del usuario:
- Vehículo: ${answers.vehiculo || '(no especificado)'}
- Punto de partida: ${answers.punto_partida || '(no especificado)'}
- Presupuesto: ${answers.presupuesto || '(no especificado)'}
- Uso: ${answers.uso || '(no especificado)'}
- Autonomía: ${answers.autonomia || '(no especificado)'}

Devuelve un JSON con esta estructura EXACTA (sin markdown, sin backticks, sin texto adicional):
{
  "vehiculo": "string",
  "punto_partida": "desde_cero|algo_equipado|full_equipada|no_specified",
  "presupuesto_eur": number,
  "uso": "finde|semanas|todo_año|nomada|no_specified",
  "autonomia": "corto|medio|largo|no_specified",
  "categorias_interes": ["[]string: energia, frio, cocina, iluminacion, agua, calefaccion, confort, instalacion"],
  "prioridades": ["[]string: autonomia, presupuesto, peso, simplicidad, potencia"]
}

Donde:
- presupuesto_eur: extrae el número (sin € ni comas)
- categorias_interes: deduce las categorías relevantes según el caso. Si el usuario menciona 'nevera' o 'frío', incluye "frio". Si menciona 'placa' o 'solar', incluye "energia". Si no hay info clara, asume ["energia", "frio"] como mínimo.
- prioridades: deduce 1-3 prioridades. Por ejemplo, si autonomía=largo y presupuesto es alto, ["autonomia", "potencia"]. Si presupuesto bajo y'autonomie= corto, ["presupuesto", "simplicidad"].`;

    const text = await callLLM([
      { role: 'system', content: 'Eres un parser JSON estricto. Solo devuelves JSON válido, nada más.' },
      { role: 'user', content: prompt },
    ], { temperature: 0.1 });

    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('LLM no devolvió JSON');
      const parsed = JSON.parse(jsonMatch[0]);
      if (typeof parsed.presupuesto_eur === 'string') {
        parsed.presupuesto_eur = parseInt(parsed.presupuesto_eur.replace(/[^\d]/g, ''), 10);
      }
      return parsed;
    } catch (e) {
      console.warn('[chat] parseRequirements fallback:', text);
      throw new Error('No se pudo procesar tus respuestas. Inténtalo otra vez.');
    }
  }

  // ============== SUPABASE: QUERY PRODUCTS ==============
  async function querySupabase(req) {
    const params = new URLSearchParams();
    params.set('select', '*');
    params.set('disponible', 'eq.true');
    if (req.categorias_interes && req.categorias_interes.length > 0) {
      const cats = req.categorias_interes.map(c => `"${c}"`).join(',');
      params.set('categoria', `in.(${cats})`);
    }
    const url = `${CONFIG.SUPABASE_URL}/rest/v1/productos?${params}`;
    const r = await fetch(url, {
      headers: {
        'apikey': CONFIG.SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${CONFIG.SUPABASE_ANON_KEY}`,
      },
    });
    if (!r.ok) throw new Error(`Supabase error ${r.status}`);
    const products = await r.json();
    return products.slice(0, 6);
  }

  // ============== FETCH KNOWLEDGE .md ==============
  async function fetchKnowledge(productIds) {
    const map = {};
    await Promise.all(productIds.map(async id => {
      try {
        const r = await fetch(`../knowledge/productos/${id}.md`);
        if (r.ok) map[id] = await r.text();
      } catch (e) { console.warn(`No se pudo cargar ${id}.md`, e); }
    }));
    return map;
  }

  // ============== LLM: GENERATE RECOMMENDATION ==============
  async function generateRecommendation(req, products, knowledge) {
    const systemPrompt = await loadSystemPrompt();
    const knowledgeText = products.map(p => {
      const md = knowledge[p.id] || '(sin ficha detallada)';
      return `### ${p.nombre} (${p.categoria})
${md}`;
    }).join('\n\n---\n\n');

    const userPrompt = `Requisitos del usuario:
${JSON.stringify(req, null, 2)}

Productos candidatos del catálogo (filtrados por categoría):
${knowledgeText}

Instrucciones de salida (JSON estricto, sin markdown ni backticks):
{
  "resumen": "string (1 frase resumen de la recomendación)",
  "por_que_encaja": ["string (3-4 checks que justifican el conjunto)"],
  "configuracion": [
    {
      "id": "string (id del producto)",
      "nombre": "string",
      "categoria": "string",
      "por_que_si": "string (motivo específico de incluirlo)",
      "alternativa_descartada": "string (categoría o tipo descartado, sin marca)",
      "motivo_descarte": "string (1 frase del motivo)"
    }
  ],
  "descartados_generales": ["string (1-2 descartes adicionales no como producto principal)"]
}

REGLAS:
- Recomendaciones concretas (tipo y categoría), NO inventes marcas reales.
- NO inventes cifras exactas (ciclos, pesos, precios).
- Si no estás seguro de una especificación, no la incluyas.
- Cada 'por_que_si' debe estar ligado a un requisito concreto del usuario.
- 'motivo_descarte' debe ser verificable técnicamente (universal).`;

    const text = await callLLM([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ], { temperature: 0.5, max_tokens: 2000 });

    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('LLM no devolvió JSON');
      return JSON.parse(jsonMatch[0]);
    } catch (e) {
      console.warn('[chat] generateRecommendation fallback:', text);
      throw new Error('No se pudo generar la recomendación. Inténtalo otra vez.');
    }
  }

  async function loadSystemPrompt() {
    if (state.systemPrompt) return state.systemPrompt;
    try {
      const r = await fetch(CONFIG.SYSTEM_PROMPT_PATH);
      state.systemPrompt = r.ok ? await r.text() : getDefaultSystemPrompt();
    } catch {
      state.systemPrompt = getDefaultSystemPrompt();
    }
    return state.systemPrompt;
  }

  function getDefaultSystemPrompt() {
    return `Eres AsesorCamper, experto en equipamiento para furgonetas camper en España.
Reglas:
- Nunca inventas datos críticos (precios, pesos exactos, ciclos).
- Cada recomendación se basa en el contexto que recibes.
- Si dos productos son equivalentes, priorizas el de mayor comisión SOLO si es realmente equivalente.
- Cada recomendación incluye: "Te lo recomiendo porque…", "No te recomiendo X porque…".
- Eres cercano pero técnico. Sin marketing vacío.`;
  }

  // ============== LLM CLIENT (via server-side proxy) ==============
  // Llama al proxy Supabase Edge Function. La API key del LLM vive solo
  // en el servidor (Deno env), nunca llega al navegador.
  async function callLLM(messages, opts = {}) {
    const url = `${CONFIG.SUPABASE_URL}/functions/v1/llm-proxy`;
    const body = {
      messages,
      temperature: opts.temperature ?? 0.7,
      ...(opts.max_tokens ? { max_tokens: opts.max_tokens } : {}),
    };
    const r = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': CONFIG.SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${CONFIG.SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify(body),
    });
    if (!r.ok) {
      const errText = await r.text().catch(() => '');
      throw new Error(`LLM proxy error ${r.status}: ${errText.slice(0, 200)}`);
    }
    const data = await r.json();
    return data.choices?.[0]?.message?.content || '';
  }

  // ============== RENDER RESULT ==============
  function renderResult(rec) {
    const lede = document.getElementById('chat-result-lede');
    if (lede) lede.textContent = rec.resumen || '';

    const body = document.getElementById('chat-rec-body');
    if (!body) return;
    body.innerHTML = '';

    // Configuración
    if (Array.isArray(rec.configuracion) && rec.configuracion.length > 0) {
      const section = document.createElement('section');
      section.className = 'chat-rec-section';
      section.innerHTML = `<h3 class="chat-rec-h">Tu configuración</h3>`;
      const list = document.createElement('div');
      list.className = 'chat-rec-list';
      rec.configuracion.forEach(item => {
        const product = state.products.find(p => p.id === item.id) || {};
        const amazonSearch = `https://www.amazon.es/s?k=${encodeURIComponent(item.nombre)}&tag=${CONFIG.AMAZON_TAG}`;
        const card = document.createElement('div');
        card.className = 'chat-rec-item';
        card.innerHTML = `
          <span class="chat-rec-item-icon" aria-hidden="true">${getCategoryIcon(item.categoria)}</span>
          <div class="chat-rec-item-body">
            <p class="chat-rec-item-name">${escapeHtml(item.nombre)}</p>
            <p class="chat-rec-item-meta">${escapeHtml(item.categoria || '')}${product.precio ? ` · ~${product.precio}€` : ''}</p>
            <p class="chat-rec-item-why">${escapeHtml(item.por_que_si)}</p>
            ${item.alternativa_descartada ? `
              <p class="chat-rec-item-alt"><strong>Descartamos ${escapeHtml(item.alternativa_descartada)}</strong> — ${escapeHtml(item.motivo_descarte || '')}</p>
            ` : ''}
            <a href="${amazonSearch}" target="_blank" rel="noopener sponsored" class="chat-rec-item-buy">Buscar en Amazon →</a>
          </div>
        `;
        list.appendChild(card);
      });
      section.appendChild(list);
      body.appendChild(section);
    }

    // Por qué encaja
    if (Array.isArray(rec.por_que_encaja) && rec.por_que_encaja.length > 0) {
      const section = document.createElement('section');
      section.className = 'chat-rec-section';
      section.innerHTML = `<h3 class="chat-rec-h">Por qué encaja</h3>`;
      const list = document.createElement('ul');
      list.className = 'chat-rec-checks';
      rec.por_que_encaja.forEach(c => {
        const li = document.createElement('li');
        li.textContent = c;
        list.appendChild(li);
      });
      section.appendChild(list);
      body.appendChild(section);
    }

    showView('result');
  }

  function renderError(message) {
    showView('result');
    const body = document.getElementById('chat-rec-body');
    if (!body) return;
    body.innerHTML = `<div class="chat-error">${escapeHtml(message)}</div>`;
    const title = document.getElementById('chat-result-title');
    const lede = document.getElementById('chat-result-lede');
    if (title) title.textContent = 'Hubo un problema';
    if (lede) lede.textContent = '';
  }

  function getCategoryIcon(cat) {
    const icons = {
      neveras: '<svg viewBox="0 0 24 24" width="16" height="16"><rect x="4" y="6" width="16" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
      placas: '<svg viewBox="0 0 24 24" width="16" height="16"><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
      baterias: '<svg viewBox="0 0 24 24" width="16" height="16"><rect x="6" y="3" width="12" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
      inversores: '<svg viewBox="0 0 24 24" width="16" height="16"><path d="M13 3 L4 14 L11 14 L10 21 L20 9 L13 9 Z" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
    };
    return icons[cat] || '<svg viewBox="0 0 24 24" width="16" height="16"><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2"/></svg>';
  }

  // ============== UTILS ==============
  function escapeHtml(s) {
    if (s == null) return '';
    return String(s).replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  // ============== BOOT ==============
  document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('chat-start');
    if (startBtn) startBtn.addEventListener('click', startChat);
    const restartBtn = document.getElementById('chat-restart');
    if (restartBtn) restartBtn.addEventListener('click', () => {
      showView('welcome');
    });
    console.log('[chat] iniciado. Supabase:', CONFIG.SUPABASE_URL, '· LLM via proxy server-side');
  });
})();