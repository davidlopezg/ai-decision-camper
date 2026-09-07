/* Camper Decision · chat v3
   Asistente conversacional. SIN backend, sin LLM, sin fetch externo.
   La demo es 100% JS cliente: catalog + interpreter + decider + UI.

   Flujo:
   1. Welcome con dos modos (texto libre / paso a paso)
   2. Conversación: el bot pregunta solo lo que falta
   3. Resumen inline ("Esto es lo que he entendido")
   4. Resultado en el mismo hilo (productos + explicación + cambios)
   5. Cambio de variable → re-decide → muestra diff
*/

(() => {
  'use strict';

  // ====================================================================
  //  CATÁLOGO — hardcoded. ~15 productos con esquema rico.
  // ====================================================================
  const CATALOG = [
    // NEVERAS
    { id:'nevera-mobicool-mcg15', nombre:'Mobicool MCG15 (15L, termoeléctrica)',
      categoria:'neveras', subcategoria:'termoelectrica_pasiva',
      precio:95, capacidad_l:15, watts_24h:50, espacio_requerido:'pequeno',
      tensiones:['12'], autonomia_relativa:'baja',
      nota:'Enchufada 12V, enfría 18°C bajo ambiente. Vale como neverita de finde.' },
    { id:'nevera-dometic-cfx3-45', nombre:'Dometic CFX3 45 (compresor)',
      categoria:'neveras', subcategoria:'compresor_alta_gama',
      precio:649, capacidad_l:45, watts_24h:50, espacio_requerido:'mediano',
      tensiones:['12','24','230'], autonomia_relativa:'alta',
      nota:'Compresor eficiente. Enfría y congela. Aguanta semanas.' },
    { id:'nevera-dometic-cfx3-55', nombre:'Dometic CFX3 55 (compresor)',
      categoria:'neveras', subcategoria:'compresor_alta_gama',
      precio:749, capacidad_l:55, watts_24h:60, espacio_requerido:'mediano',
      tensiones:['12','24','230'], autonomia_relativa:'alta',
      nota:'Más capacidad para 2-3 personas que viajan más días.' },

    // PLACAS
    { id:'panel-rigido-100w', nombre:'Panel solar rígido 100W',
      categoria:'placas', subcategoria:'rigida', precio:110, watts_pico:100,
      techo_compatible:['mediano','grande'],
      nota:'Buen equilibrio coste/potencia para furgoneta mediana.' },
    { id:'panel-rigido-175w', nombre:'Panel solar rígido 175W',
      categoria:'placas', subcategoria:'rigida', precio:165, watts_pico:175,
      techo_compatible:['grande'],
      nota:'Para techo grande. Puedes montar 2 en serie.' },
    { id:'panel-portatil-ecoflow-220', nombre:'EcoFlow 220W bifacial (portátil)',
      categoria:'placas', subcategoria:'portatil', precio:549, watts_pico:220,
      techo_compatible:['cualquiera'],
      nota:'Portátil. Buena si no quieres perforar el techo.' },

    // BATERÍAS
    { id:'bateria-agm-95ah', nombre:'Varta Dual Purpose AGM 95Ah',
      categoria:'baterias', subcategoria:'agm',
      precio:230, capacidad_ah:95, profundidad_descarga_max:0.5,
      nota:'Económica. Solo se aprovecha la mitad. Vale para presupuesto bajo.' },
    { id:'bateria-lifepo4-100ah', nombre:'LiFePO4 100Ah con BMS',
      categoria:'baterias', subcategoria:'lifepo4',
      precio:399, capacidad_ah:100, profundidad_descarga_max:0.9,
      nota:'Estándar hoy. 90% aprovechable, ligera, larga vida.' },
    { id:'bateria-lifepo4-200ah', nombre:'LiFePO4 200Ah con BMS',
      categoria:'baterias', subcategoria:'lifepo4',
      precio:749, capacidad_ah:200, profundidad_descarga_max:0.9,
      nota:'Para autonomía larga o nevera grande.' },

    // INVERSORES
    { id:'inversor-bestek-800w', nombre:'Bestek 800W onda pura',
      categoria:'inversores', subcategoria:'economico',
      precio:95, potencia_w:800, pico_w:1600, forma:'senoidal_pura',
      calidad:'aceptable',
      nota:'Lo mínimo para cargar portátil o hervidor pequeño.' },
    { id:'inversor-bestek-1000w', nombre:'Bestek 1000W onda pura',
      categoria:'inversores', subcategoria:'economico',
      precio:119, potencia_w:1000, pico_w:2000, forma:'senoidal_pura',
      calidad:'aceptable',
      nota:'Justo para microondas. Baremo apretado.' },
    { id:'inversor-victron-800', nombre:'Victron Phoenix 12/800',
      categoria:'inversores', subcategoria:'premium',
      precio:459, potencia_w:800, pico_w:1600, forma:'senoidal_pura',
      calidad:'alta',
      nota:'Aguanta picos, eficiente, fiable.' },
    { id:'inversor-victron-1200', nombre:'Victron Phoenix 12/1200',
      categoria:'inversores', subcategoria:'premium',
      precio:559, potencia_w:1200, pico_w:2400, forma:'senoidal_pura',
      calidad:'alta',
      nota:'Pensado para microondas + nevera sin caída.' },

    // CONFORT
    { id:'webasto-air-top-2000', nombre:'Webasto Air Top 2000 ST',
      categoria:'confort', subcategoria:'calefaccion_estatica_diesel',
      precio:990,
      nota:'Calefacción diésel estática. Funciona con motor apagado.' },
    { id:'aislamiento-kaiflex-19mm', nombre:'Aislamiento Kaiflex 19mm (pack 6 m²)',
      categoria:'confort', subcategoria:'aislamiento',
      precio:72, m2_por_pack:6,
      nota:'Imprescindible para eficiencia energética.' },

    // MONITORIZACIÓN
    { id:'victron-bmv-712', nombre:'Victron BMV-712',
      categoria:'monitorizacion', subcategoria:'monitor_bateria',
      precio:175, nota:'Cuánta batería te queda en tiempo real.' },
    { id:'victron-smartsolar-75-15', nombre:'Victron SmartSolar 75/15',
      categoria:'monitorizacion', subcategoria:'regulador_mppt',
      precio:145, watts_max:220,
      nota:'30% más energía que un PWM.' },
  ];

  const AMAZON_TAG = 'camperdecisio-21';

  // ====================================================================
  //  STATE — modelo estructurado del caso del usuario
  // ====================================================================
  function freshState() {
    return {
      vehiculo: null,           // { texto, tamano }
      personas: null,
      uso: null,                // finde|semanas|nomada|anual
      autonomia_dias: null,
      presupuesto_eur: null,
      configuracion_actual: null,
      aparatos: [],
      prioridades: [],
      restricciones: [],
      confirmados: { vehiculo:false, uso:false, autonomia:false, presupuesto:false },
      mode: 'libre',            // libre | paso_a_paso
    };
  }

  // ====================================================================
  //  INTÉRPRETE — texto libre → updates al state
  // ====================================================================
  const APARATOS = [
    { id:'microondas', keys:['microonda','microondas'], pico_w:1500, label:'microondas' },
    { id:'cafetera',   keys:['cafetera','espresso','nespresso','cápsula','capsulas'], pico_w:1100, label:'cafetera espresso' },
    { id:'secador',    keys:['secador','secador de pelo'], pico_w:1800, label:'secador' },
    { id:'hervidor',   keys:['hervidor'], pico_w:1500, label:'hervidor' },
    { id:'aa',         keys:['aire acondicionado','aire acondic','aa ','climatizador','climatización','climatizacion'], pico_w:1200, label:'aire acondicionado' },
    { id:'nevera',     keys:['nevera','neverita','congelador','frigorífico','frigorifico'], pico_w:60, label:'nevera' },
    { id:'calefaccion',keys:['calefacción','calefaccion','calefactor','webasto','estufa'], pico_w:80, label:'calefacción' },
    { id:'portatil',   keys:['portátil','portatil','ordenador portátil','ordenador portatil','laptop'], pico_w:100, label:'ordenador portátil' },
    { id:'iluminacion',keys:['luces','tiras led','tira led','iluminación','iluminacion'], pico_w:30, label:'iluminación LED' },
  ];

  function interpretar(texto, state) {
    const t = texto.toLowerCase();
    const updates = [];
    const notes = [];
    let aparatoAdded = null;

    // Vehículo — el año puede aparecer antes o después del modelo,
    // y se busca en el input COMPLETO (no en el substring recortado).
    const vehPattern = /\b(?:(\d{4})\s+)?(transit|caddy|berlingo|sprinter|crafter|daily|ducato|jumper|jump[ey]|partner|vivaro|talento|scudo|expert|traveller|vito|caravelle|tourneo|proace|hiace|combo|cargo|movano|trafic|levante)(?:\s+(\d{4}))?\b/;
    const vehMatch = t.match(vehPattern);
    if (vehMatch) {
      const modelo = vehMatch[2];
      const vehLower = modelo.toLowerCase();
      let tamano = 'mediano';
      const pequenos = /caddy|berlingo|partner|combo|tourneo|vivaro|talento|scudo|traveller|levante/;
      const grandes = /sprinter|crafter|daily|ducato|jumper|jump[ey]|proace|trafic|movano|cargo|hiace|vito|caravelle/;
      if (pequenos.test(vehLower)) tamano = 'pequeno';
      else if (grandes.test(vehLower)) tamano = 'grande';
      // Año del vehículo: en el input completo, cerca del modelo (no en otra fecha).
      const anioMatch = t.match(/\b(20\d{2}|19\d{2})\b/);
      state.vehiculo = { texto: normalizeVehiculoFull(modelo, anioMatch && anioMatch[1]), tamano, raw: vehMatch[0] };
      updates.push('vehiculo');
    }

    // Presupuesto — sin "de" (demasiado genérico, capturaría "de 10 días")
    // \b después de [€e] no funciona porque "€" no es word-char.
    // Usamos (?!\w) para asegurar que el siguiente char no es word.
    const sinAnio = t.replace(/\b(19|20)\d{2}\b/g, ' ');
    const presMatch = sinAnio.match(/(?:presupuesto|gastar|gasto|cuento\s+con|cuento|contar\s+con|tengo|tengo\s+casi|tengo\s+unos|tengo\s+unas|mi[oó]\s+es|nuestro\s+es)\b[^\d]{0,30}(\d{1,3}(?:[.,]\d{3})+|\d{2,6})\s*[€e]?/i)
                    || sinAnio.match(/(\d{1,3}(?:[.,]\d{3})+|\d{2,6})\s*[€e](?!\w)/);
    if (presMatch) {
      const limpio = presMatch[1].replace(/[.,](?=\d)/g, '');
      const n = parseInt(limpio, 10);
      if (n >= 200 && n <= 30000) {
        state.presupuesto_eur = n;
        updates.push('presupuesto_eur');
      }
    }

    // Personas — el número explícito gana sobre heurísticos ("mi mujer" → 2,
    // pero "somos 3 y mi mujer y mi hija" son 4 personas).
    const NUM_PERSONAS = { un:1, una:1, uno:1, dos:2, tres:3, cuatro:4, cinco:5, seis:6, siete:7, ocho:8, nueve:9, diez:10, doce:12 };
    const perMatch = t.match(/(?:somos|viajamos|para|ocupantes|alquiler)\s*(\d+)\b/)
                  || t.match(/\b(\d+)\s*personas?\b/)
                  || t.match(/\b(\d+)\s*adultos?\b/)
                  || t.match(/\b(\d+)\s*gente\b/)
                  || t.match(/\b(uno|una|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez|doce)\s*personas?\b/)
                  || t.match(/\b(uno|una|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez|doce)\s*adultos?\b/);
    if (perMatch) {
      let n = parseInt(perMatch[1], 10);
      if (!n || isNaN(n)) n = NUM_PERSONAS[perMatch[1].toLowerCase()] || 0;
      if (n >= 1 && n <= 12) {
        state.personas = n; updates.push('personas');
      }
    } else if (state.personas === null) {
      // Sin número: contar familiares explícitos. Tú +1 + cada uno mencionado.
      // 'mi mujer' = +1, 'mi mujer y mi hija' = +1+1, 'mis hijos' = +2, etc.
      let fam = 1; // el usuario
      if (/\b(pareja|mi\s+novia|mi\s+novio|mi\s+esposa|mi\s+esposo|mi\s+mujer|mi\s+marido)\b/.test(t)) fam += 1;
      const hijosSingular = (t.match(/\bmi\s+hijo\b/g) || []).length
                          + (t.match(/\bmi\s+hija\b/g) || []).length;
      fam += hijosSingular;
      // Si dice "hijos/hijas/niños" en plural, asumir 2 salvo que ya contemos singulares.
      const plurales = /\b(mi\s+hijos|mi\s+hijas|hijos|hijas|los\s+niños|los\s+ninos|mis\s+hijos|mis\s+hijas)\b/.test(t);
      if (plurales && hijosSingular === 0) fam += 2;
      // "solo" sólo cuenta 1 si NO hay otros familiares Y no hay "con"
      const diceSolo = /\b(solo|sola|yo\s+viajo|viajo\s+solo|viajo\s+sola)\b/.test(t);
      const diceCon   = /\b(con|con\s+mi|con\s+la|con\s+el)\b/.test(t);
      if (diceSolo && (fam === 1 || !diceCon)) fam = 1;
      const n = Math.min(12, Math.max(1, fam));
      state.personas = n; updates.push('personas');
    }

    // Uso
    if (/\b(fin(?:es)?\s*de\s*semana|finde|fds|escapadas?\b)\b/.test(t)) {
      state.uso = 'finde'; updates.push('uso');
    } else if (/\b(semanas?\s*sueltas?|viajes?\s+de\s+(una\s+)?semana|1\s*-\s*2\s*semanas?|1\s*o\s*2\s*semanas?|quince\s*d[ií]as?)\b/.test(t)) {
      state.uso = 'semanas'; updates.push('uso');
    } else if (/\b(n[oó]mada\s*digit|\bn[oó]mada\b|trabajo\s+en\s+ruta|trabajo\s+remoto\s+en|remoto\s+desde)\b/.test(t)) {
      state.uso = 'nomada'; updates.push('uso');
    } else if (/\b(todo\s*el\s*a[ñn]o|continuamente|siempre\s+fuera|full\s*time|a[ñn]o\s+completo)\b/.test(t)) {
      state.uso = 'anual'; updates.push('uso');
    }

    // Autonomía — orden importa: rangos ANTES que número suelto (para no
    // quedarnos con la parte alta del rango, ej. "5-7 días" cogería "7").
    {
      const NUM_AUT = { un:1, una:1, uno:1, dos:2, tres:3, cuatro:4, cinco:5, seis:6, siete:7, ocho:8, nueve:9, diez:10, quince:15, veinte:20 };
      let n = null;

      // 1) 'una/dos/tres semanas' → *7
      const sem = t.match(/\b(un[oa]?|dos|tres|cuatro|un)\s*semanas?\b/);
      if (sem) n = (NUM_AUT[sem[1].toLowerCase()] || 1) * 7;

      // 2) Rango PRIMERO: '3-7 días', '3 a 7 días', 'entre 3 y 7 días', '3 o 4 (días)'
      if (n === null) {
        // 'entre N y M días'
        const r1 = t.match(/\bentre\s+(\d+)\s*y\s+(\d+)(?:\s*d[ií]as?)?\b/);
        // 'N-M días' o 'N a M días' con la palabra 'días'
        const r2 = t.match(/\b(\d+)\s*[-a]\s*(\d+)\s*d[ií]as?\b/);
        // '3 o 4' SIN 'días' (solo si la pregunta activa es autonomía)
        const r3 = t.match(/\b(\d+)\s+o\s+(\d+)\b/);
        const rango = r1 || r2;
        if (rango) n = parseInt(rango[1], 10);
        else if (r3) n = parseInt(r3[1], 10);
      }

      // 3) Ahora sí: número + 'días' simple (NO parte de un rango)
      if (n === null) {
        const d = t.match(/\b(\d+)\s+d[ií]as?\b/);
        if (d) n = parseInt(d[1], 10);
      }

      // 4) 'N días' en palabras
      if (n === null) {
        const dw = t.match(/\b(un[oa]?|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez|quince|veinte)\s*d[ií]as?\b/);
        if (dw) n = NUM_AUT[dw[1].toLowerCase()];
      }

      // 5) Frases hechas
      if (n === null && /\bvarios\s*d[ií]as?\b/.test(t)) n = 3;
      if (n === null && /\buna\s*semana\b/.test(t)) n = 7;
      if (n === null && /\bdos\s*semanas\b/.test(t)) n = 14;
      if (n === null && /\bmucho\s+tiempo\b/.test(t)) n = 7;

      if (n && n >= 1 && n <= 60) {
        state.autonomia_dias = n;
        updates.push('autonomia_dias');
      }
    }

    // Configuración actual
    if (/\b(desde\s*cero|empezar\s+de\s+cero|partimos\s+de\s+cero|a[úu]n\s+nueva|sin\s+equipar|vac[ií]a|furgoneta\s+nueva)\b/.test(t)) {
      state.configuracion_actual = 'desde_cero'; updates.push('configuracion_actual');
    } else if (/\b(ya\s+tengo|algo\s+(?:equipad|montad|instalad)|parcial|medio\s+montad|con\s+bater[ií]a)\b/.test(t)) {
      state.configuracion_actual = 'parcial'; updates.push('configuracion_actual');
    } else if (/\b(full|complet[ao]|todoterreno|ya\s+equipad[ao]\s+total|equipad[ií]sima)\b/.test(t)) {
      state.configuracion_actual = 'equipada'; updates.push('configuracion_actual');
    }

    // Aparatos — "todo" / "lo máximo" / "lo que se pueda" → set básico + flag para el decider
    let maxApetito = false;
    if (/\b(todo|todos|lo\s+m[áa]ximo|lo\s+mejor|lo\s+que\s+(se\s+)?pueda|lo\s+que\s+entre|m[áa]s\s+mejor|cualquier\s+cosa)\b/.test(t)) {
      const baseline = ['nevera','iluminacion','portatil'];
      for (const ap of baseline) if (!state.aparatos.includes(ap)) state.aparatos.push(ap);
      maxApetito = true;
    }
    for (const ap of APARATOS) {
      if (ap.keys.some(k => t.includes(k))) {
        if (!state.aparatos.includes(ap.id)) {
          state.aparatos.push(ap.id);
          aparatoAdded = ap;
        }
      }
    }
    if (state.aparatos.length > 0) updates.push('aparatos');

    // Prioridades explícitas
    if (/\b(autonom[íi]a|largo|lejos|sin\s+red|enchufe|fuera\s+mucho)\b/.test(t) && !state.prioridades.includes('autonomia')) state.prioridades.push('autonomia');
    if (/\b(presupuesto|ajustado|barato|econ[oó]mico|cuesta|poco\s+dinero)\b/.test(t) && !state.prioridades.includes('presupuesto')) state.prioridades.push('presupuesto');
    if (/\b(potencia|microondas|secador|cafetera)\b/.test(t) && !state.prioridades.includes('potencia')) state.prioridades.push('potencia');
    if (/\b(sencill[eo]|simple|f[aá]cil|sin\s+liar)\b/.test(t) && !state.prioridades.includes('sencillez')) state.prioridades.push('sencillez');

    // Respuesta corta: si el input es SOLO un número (o un rango corto) y la
    // pregunta activa acepta un número, lo asignamos al campo que toca.
    // Evita el "no te he pillado bien" cuando el usuario responde "2500" a
    // "¿con qué presupuesto?" o "3 o 4" a "¿cuántos días?".
    const trimmed = texto.trim();
    const numSolo = trimmed.match(/^(?:entre\s+)?(\d+)(?:\s*[-oa]\s*(\d+))?(?:\s*d[ií]as?)?(?:\s*[€e])?\s*$/i);
    if (numSolo) {
      const n = parseInt(numSolo[1], 10);
      const q = nextQuestion(state);
      if (q && q.key === 'presupuesto_eur' && n >= 200 && n <= 50000 && state.presupuesto_eur === null) {
        state.presupuesto_eur = n;
        updates.push('presupuesto_eur');
      } else if (q && q.key === 'autonomia_dias' && n >= 1 && n <= 60 && state.autonomia_dias === null) {
        state.autonomia_dias = n;
        updates.push('autonomia_dias');
      } else if (q && q.key === 'personas' && n >= 1 && n <= 12 && state.personas === null) {
        state.personas = n;
        updates.push('personas');
      }
    }

    return { updates, notes, aparatoAdded, maxApetito };
  }

  function normalizeVehiculo(v) {
    return normalizeVehiculoFull(v, null);
  }
  function normalizeVehiculoFull(modelo, anio) {
    const map = {
      transit:'Ford Transit', caddy:'VW Caddy', berlingo:'Citroën Berlingo',
      partner:'Peugeot Partner', sprinter:'Mercedes Sprinter', crafter:'VW Crafter',
      daily:'Iveco Daily', ducato:'Fiat Ducato', jumper:'Citroën Jumper',
      jumpe:'Citroën Jumpy', jumpy:'Citroën Jumpy',
      vivaro:'Opel Vivaro', talento:'Fiat Talento', trafic:'Renault Trafic',
      traveller:'Peugeot Traveller', vito:'Mercedes Vito', caravelle:'VW Caravelle',
      tourneo:'Ford Tourneo', proace:'Toyota ProAce', hiace:'Toyota HiAce',
      combo:'Opel Combo', scudo:'Fiat Scudo', expert:'Peugeot Expert',
      movano:'Opel Movano', cargo:'Ford Cargo', levante:'Fiat Talento',
    };
    const lc = modelo.toLowerCase();
    for (const k in map) if (lc.includes(k)) {
      return map[k] + (anio ? ' ' + anio : '');
    }
    return modelo.replace(/^\w/, c => c.toUpperCase());
  }

  // ====================================================================
  //  QUESTIONER — orden de prioridad (qué falta)
  // ====================================================================
  const QUESTION_ORDER = [
    { key:'vehiculo',       ask: '¿Qué furgo tienes o buscas? Si ya tienes el modelo, dímelo; si no, una idea general me vale.' },
    { key:'uso',            ask: '¿Y el patrón de uso? Fines de semana, semanas sueltas, todo el año, o váis a ser nómadas digitales.' },
    { key:'autonomia_dias', ask: 'Sin enchufe, ¿cuántos días seguidos soléis estar? ¿Tres, cinco?' },
    { key:'presupuesto_eur', ask: '¿De presupuesto? Una cifra orientativa, no tiene que ser exacta.' },
    { key:'personas',       ask: '¿Cuántos váis normalmente? ¿Dos, tres…?' },
    { key:'aparatos',       ask: '¿Qué aparatos os harían falta? (nevera, microondas, cafetera, calefacción, AA, lo que sea.)' },
  ];
  function nextQuestion(state) {
    for (const q of QUESTION_ORDER) {
      const v = state[q.key];
      if (q.key === 'aparatos') { if (!v || v.length === 0) return q; }
      else if (v === null || v === undefined) return q;
    }
    return null;
  }
  function isComplete(state) {
    return nextQuestion(state) === null;
  }

  // ====================================================================
  //  DECIDER — hard constraints → soft ranking
  // ====================================================================
  function isCompatible(p, state) {
    if (p.categoria === 'neveras') {
      if (state.vehiculo?.tamano === 'pequeno' && p.espacio_requerido === 'grande') return false;
      if (state.vehiculo?.tamano === 'pequeno' && p.id === 'nevera-dometic-cfx3-55') return false;
    }
    if (p.categoria === 'placas') {
      if (state.vehiculo?.tamano === 'pequeno' && p.subcategoria === 'rigida') return false;
    }
    return true;
  }

  function decide(state) {
    const errors = [];
    const picks = [];
    const presup = { total: state.presupuesto_eur || Infinity };

    // BATERÍA primero (muchos aparatos dependen)
    const necesitaBateria = state.configuracion_actual === 'desde_cero'
                         || state.aparatos.includes('nevera')
                         || state.aparatos.includes('microondas')
                         || state.aparatos.includes('cafetera')
                         || state.aparatos.includes('aa')
                         || (state.autonomia_dias && state.autonomia_dias >= 2)
                         || ['semanas','nomada','anual'].includes(state.uso)
                         || (state.vehiculo && !state.configuracion_actual);
    if (necesitaBateria) {
      let bats = CATALOG.filter(p => p.categoria === 'baterias');
      if (state.autonomia_dias && state.autonomia_dias >= 4) bats = bats.filter(p => p.subcategoria === 'lifepo4');
      if (state.autonomia_dias && state.autonomia_dias >= 7) bats = bats.filter(p => p.capacidad_ah >= 200);
      if (state.presupuesto_eur && state.presupuesto_eur < 350) bats = bats.filter(p => p.precio <= 300);
      if (state.presupuesto_eur && state.presupuesto_eur < 800 && state.uso === 'finde') bats = bats.filter(p => p.subcategoria === 'agm');
      if (bats.length === 0) {
        errors.push('Sin batería compatible con tu caso.');
      } else {
        bats.sort((a,b) => {
          if (a.subcategoria !== b.subcategoria) return a.subcategoria === 'lifepo4' ? -1 : 1;
          return a.precio - b.precio;
        });
        const best = bats[0];
        picks.push({
          producto: best, rol:'bateria',
          requisitos: [`autonomía de ${state.autonomia_dias ?? 3} días`].concat(state.aparatos.includes('nevera')?['nevera']:[]),
          por_que_si: explainBateria(best, state),
          alternativa_descartada: bats[1]?.nombre ?? 'otra opción',
          motivo_descarte: explainBateriaDescarte(bats[1], state),
        });
        presup.total -= best.precio;
      }
    }

    // INVERSOR
    const picos = (state.aparatos.includes('microondas')?1500:0)
                + (state.aparatos.includes('cafetera')?1100:0)
                + (state.aparatos.includes('secador')?1800:0)
                + (state.aparatos.includes('hervidor')?1500:0)
                + (state.aparatos.includes('aa')?1200:0)
                + (state.aparatos.includes('nevera')?60:0)
                + (state.aparatos.includes('portatil')?100:0);

    if (picos >= 800) {
      let invs = CATALOG.filter(p => p.categoria === 'inversores');
      invs = invs.filter(p => p.pico_w >= picos * 1.2);
      if (state.presupuesto_eur && state.presupuesto_eur < 600) invs = invs.filter(p => p.subcategoria === 'economico');
      if (invs.length === 0) {
        errors.push(`Ninguno de nuestros inversores aguanta el pico de ${picos} W que suman tus aparatos.`);
      } else {
        invs.sort((a,b) => {
          if (picos >= 1000 && a.calidad !== b.calidad) return a.calidad === 'alta' ? -1 : 1;
          return a.precio - b.precio;
        });
        const best = invs[0];
        const grandes = state.aparatos.filter(a => ['microondas','cafetera','secador','hervidor','aa'].includes(a));
        picks.push({
          producto: best, rol:'inversor',
          requisitos: [`pico de ${picos} W`, ...grandes.map(g => APARATOS.find(a=>a.id===g).label)],
          por_que_si: explainInversor(best, picos, state, grandes),
          alternativa_descartada: invs[1]?.nombre ?? 'otra opción',
          motivo_descarte: 'Pico insuficiente o calidad/precio peor para tu caso.',
        });
        presup.total -= best.precio;
      }
    } else if (state.aparatos.includes('portatil') || state.uso === 'nomada' && presup.total > 200) {
      const invs = CATALOG.filter(p => p.categoria === 'inversores' && p.subcategoria === 'economico');
      if (invs.length > 0 && presup.total > 100) {
        const best = invs.sort((a,b)=>a.precio-b.precio)[0];
        picks.push({
          producto: best, rol:'inversor',
          requisitos: ['cargar portátil y pequeños 230V'],
          por_que_si: 'Para consumo bajo (ordenador, cargador) un inversor modesto cubre sin gastar en calidad premium.',
          alternativa_descartada: 'Victron Phoenix (calidad alta, innecesaria a este nivel)',
          motivo_descarte: 'Calidad extra se amortiza solo con picos grandes.',
        });
        presup.total -= best.precio;
      }
    }

    // PLACA
    if (state.configuracion_actual !== 'equipada') {
      let placas = CATALOG.filter(p => p.categoria === 'placas' && isCompatible(p, state));
      if (state.presupuesto_eur && state.presupuesto_eur < 1000) placas = placas.filter(p => p.precio <= 200);
      if (placas.length === 0) {
        if (state.vehiculo?.tamano !== 'pequeno') errors.push('Sin placa solar que encaje en tu techo o presupuesto.');
      } else {
        placas.sort((a,b) => (b.watts_pico/b.precio) - (a.watts_pico/a.precio));
        const best = placas[0];
        picks.push({
          producto: best, rol:'placa',
          requisitos: state.vehiculo?.tamano === 'pequeno' ? ['instalación sin obras'] : ['cargar batería en marcha'],
          por_que_si: `Mejor relación €/W de las opciones disponibles (${best.watts_pico} W por ${best.precio} €).`,
          alternativa_descartada: placas[1]?.nombre ?? 'otra',
          motivo_descarte: 'Menor potencia por euro o no cabe en tu techo.',
        });
        presup.total -= best.precio;
      }
    }

    // NEVERA
    if (state.aparatos.includes('nevera') || state.configuracion_actual === 'desde_cero') {
      let neveras = CATALOG.filter(p => p.categoria === 'neveras' && isCompatible(p, state));
      if (state.presupuesto_eur && state.presupuesto_eur < 700) neveras = neveras.filter(p => p.precio <= 400);
      if (state.autonomia_dias && state.autonomia_dias >= 4) neveras = neveras.filter(p => p.subcategoria === 'compresor_alta_gama');
      if (neveras.length === 0) {
        errors.push('No hay nevera compatible con tu caso.');
      } else {
        neveras.sort((a,b) => a.watts_24h - b.watts_24h || a.precio - b.precio);
        const best = neveras[0];
        picks.push({
          producto: best, rol:'nevera',
          requisitos: ['mantener comida/fría', `autonomía de ${state.autonomia_dias ?? 3} días`],
          por_que_si: explainNevera(best, state),
          alternativa_descartada: neveras[1]?.nombre ?? 'termoeléctrica',
          motivo_descarte: 'Eficiencia o precio peor para tu autonomía.',
        });
        presup.total -= best.precio;
      }
    }

    // CALEFACCIÓN
    const quiereCalef = state.aparatos.includes('calefaccion')
                     || (['anual','nomada'].includes(state.uso) && (state.autonomia_dias || 0) >= 3);
    if (quiereCalef) {
      const calef = CATALOG.find(p => p.id === 'webasto-air-top-2000');
      if (calef && presup.total >= calef.precio) {
        picks.push({
          producto: calef, rol:'calefaccion',
          requisitos: ['clima frío', 'autonomía larga'],
          por_que_si: 'Estática diésel. Funciona con motor apagado, segura dentro del habitáculo.',
          alternativa_descartada: 'calentador de gas portátil',
          motivo_descarte: 'Tóxico en interior cerrado (monóxido de carbono).',
        });
        presup.total -= calef.precio;
      }
    }

    // AISLAMIENTO si camperización seria
    if (state.configuracion_actual === 'desde_cero' || ['anual','nomada'].includes(state.uso)) {
      const ais = CATALOG.find(p => p.id === 'aislamiento-kaiflex-19mm');
      if (ais && presup.total >= ais.precio) {
        picks.push({
          producto: ais, rol:'aislamiento',
          requisitos: ['eficiencia energética 12V/230V'],
          por_que_si: 'Sin aislamiento, tu batería trabaja el doble en invierno.',
          alternativa_descartada: 'lana de roca / reflectivo DIY',
          motivo_descarte: 'Kaiflex aísla y antihumedad en un solo paso.',
        });
        presup.total -= ais.precio;
      }
    }

    // MONITORIZACIÓN si presup alcanza y tiene nevera/calef/solar
    const quiereMonitor = state.aparatos.includes('nevera') || (state.autonomia_dias || 0) >= 3;
    if (quiereMonitor && presup.total >= 145) {
      const reg = CATALOG.find(p => p.id === 'victron-smartsolar-75-15');
      if (reg && !picks.find(p => p.producto.id === reg.id)) {
        picks.push({
          producto: reg, rol:'regulador',
          requisitos: ['cargar batería desde solar'],
          por_que_si: 'Hasta un 30% más energía que un PWM básico.',
          alternativa_descartada: 'regulador PWM genérico',
          motivo_descarte: 'PWM tira energía en tensiones altas del panel.',
        });
        presup.total -= reg.precio;
      }
    }

    return {
      picks,
      errors,
      presupRestante: isFinite(presup.total) ? presup.total : null,
      presupOriginal: state.presupuesto_eur,
    };
  }

  function explainNevera(p, state) {
    if (p.subcategoria === 'compresor_alta_gama') {
      return `Compresor eficiente (${p.watts_24h} W·h al día). Enfría y congela, aguanta ${state.autonomia_dias ?? 4} días sin sol.`;
    }
    return 'Termoeléctrica. Suficiente para mantener, no esperes congelar.';
  }
  function explainBateria(p, state) {
    if (p.subcategoria === 'lifepo4') {
      return `LiFePO4 aprovechable al 90% (~${Math.round(p.capacidad_ah*0.9)} Ah útiles). En ${state.autonomia_dias ?? 3} días la diferencia entre llegar justo o ir tranquilo.`;
    }
    return `AGM al 50% (~${Math.round(p.capacidad_ah*0.5)} Ah útiles). Vale para findes con nevera termoeléctrica.`;
  }
  function explainBateriaDescarte(p, state) {
    if (!p) return '';
    if (p.subcategoria === 'agm') return `Con tu autonomía de ${state.autonomia_dias} días la AGM se vacía cada noche.`;
    return 'Capacidad mayor de la que necesitas para el patrón que describes.';
  }
  function explainInversor(p, picos, state, grandes) {
    const lista = grandes.length ? grandes.join(', ') : 'esos consumos';
    if (p.calidad === 'alta') {
      return `Pico ${p.pico_w} W aguanta ${lista} más el resto sin caída. Mejor relación calidad/precio en alta gama.`;
    }
    return `Pico ${p.pico_w} W cubre justo ${lista}. Margen ajustado, sin holgura.`;
  }

  function explainGlobal(state, dec) {
    const p = [];
    if (state.uso === 'finde') {
      p.push('Tu uso de fines de semana no necesita sobredimensionar la instalación eléctrica.');
    } else if (state.uso === 'semanas') {
      p.push('Para semanas sueltas la prioridad es autonomía real: priorizamos nevera compresor eficiente y batería con margen.');
    } else if (['anual','nomada'].includes(state.uso)) {
      p.push('Nómada o todo el año pide aislamiento y capacidad de batería por encima de la media.');
    }
    const grandes = state.aparatos.filter(a => ['microondas','cafetera','secador','hervidor','aa'].includes(a));
    if (grandes.includes('microondas')) {
      p.push('El microondas introduce un pico de ~1500 W que obliga a subir el inversor y revisar la batería. Sin ese dato la recomendación habría sido otra.');
    } else if (grandes.length > 0) {
      const lista = grandes.map(g => APARATOS.find(a=>a.id===g).label).join(', ');
      p.push(`${lista[0].toUpperCase() + lista.slice(1)} dispara el pico, así que el inversor dimensiona por ese consumo.`);
    } else if (state.aparatos.length === 1 && state.aparatos[0] === 'nevera') {
      p.push('Sin microondas ni cafetera, el inversor puede ser modesto o incluso innecesario si cargas en 12V nativo.');
    }
    if (state.presupuesto_eur && dec.picks.length) {
      const total = dec.picks.reduce((s, x) => s + x.producto.precio, 0);
      if (total > state.presupuesto_eur) {
        p.push(`AVISO: la configuración suma ~${total} € y supera tu presupuesto de ${state.presupuesto_eur} €. He priorizado las piezas críticas.`);
      } else {
        p.push(`Total estimado: ~${total} €. Te quedan ~${Math.max(0, state.presupuesto_eur - total)} € de margen.`);
      }
    }
    return p.join(' ');
  }

  function whatWouldChange(state) {
    const c = [];
    if ((state.autonomia_dias ?? 0) < 7) c.push({ titulo:'Querer 7+ días sin red', efecto:'Subiría la batería a LiFePO4 200Ah y sumaría una segunda placa rígida.' });
    if (!state.aparatos.includes('microondas')) c.push({ titulo:'Añadir un microondas', efecto:'Inversor subiría a Victron 1200W. Posiblemente también la batería.' });
    if (!state.aparatos.includes('aa')) c.push({ titulo:'Añadir aire acondicionado', efecto:'Necesitarías placas grandes, batería 200Ah y un inversor dedicado. Solo con presupuesto alto.' });
    if ((state.presupuesto_eur ?? 0) < 1500) c.push({ titulo:'Subir presupuesto a 4.000+€', efecto:'Cambia AGM por LiFePO4. Posibilidad de añadir MPPT y calefacción diésel.' });
    return c.slice(0, 3);
  }

  // ====================================================================
  //  UI HELPERS
  // ====================================================================
  const thread = () => document.getElementById('chat-thread');
  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c => (
      {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]
    ));
  }
  function setInputEnabled(enabled) {
    const inp = document.getElementById('chat-text-input');
    const btn = document.getElementById('chat-send');
    if (inp) { inp.disabled = !enabled; }
    if (btn) { btn.disabled = !enabled; }
    if (enabled && inp) inp.focus();
  }
  function addBubble(role, html, opts = {}) {
    const t = thread(); if (!t) return null;
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble chat-bubble-${role}`;
    if (opts.thinking) bubble.classList.add('chat-bubble-thinking');
    const icon = role === 'bot'
      ? `<div class="chat-bubble-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3" fill="currentColor"/></svg></div>`
      : '';
    bubble.innerHTML = `${icon}<div class="chat-bubble-body">${html}</div>`;
    t.appendChild(bubble);
    t.scrollTop = t.scrollHeight;
    return bubble;
  }
  function addBot(html, opts) {
    return addBubble('bot', html, opts);
  }
  function addUser(html) {
    return addBubble('user', `<p class="chat-bubble-q">${escapeHtml(html)}</p>`);
  }
  function addQuickReplies(options, onClick) {
    const t = thread(); if (!t) return;
    const wrap = document.createElement('div');
    wrap.className = 'chat-quick-replies';
    wrap.innerHTML = options.map((o,i) =>
      `<button class="chat-quick-reply" type="button" data-i="${i}">${escapeHtml(o.label || o)}</button>`
    ).join('');
    t.appendChild(wrap);
    t.scrollTop = t.scrollHeight;
    wrap.querySelectorAll('.chat-quick-reply').forEach((btn, i) => {
      btn.addEventListener('click', () => {
        wrap.querySelectorAll('.chat-quick-reply').forEach(b => b.disabled = true);
        onClick(options[i], btn);
      });
    });
  }
  function addTypingIndicator() {
    const t = thread(); if (!t) return null;
    const typing = document.createElement('div');
    typing.className = 'chat-bubble chat-bubble-bot chat-bubble-thinking chat-typing';
    typing.innerHTML = `
      <div class="chat-bubble-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3" fill="currentColor"/></svg></div>
      <div class="chat-bubble-body"><span class="chat-typing-dot"></span><span class="chat-typing-dot"></span><span class="chat-typing-dot"></span></div>
    `;
    t.appendChild(typing);
    t.scrollTop = t.scrollHeight;
    return typing;
  }

  // ====================================================================
  //  RENDERERS — resúmenes, resultados, etc.
  // ====================================================================
  function renderStateAsList(state) {
    const rows = [];
    if (state.vehiculo)          rows.push(['Vehículo', state.vehiculo.texto]);
    if (state.personas !== null)  rows.push(['Personas', state.personas]);
    if (state.uso)               rows.push(['Uso', {finde:'fines de semana',semanas:'semanas sueltas',nomada:'nómada digital',anual:'todo el año'}[state.uso]]);
    if (state.autonomia_dias)    rows.push(['Autonomía', `${state.autonomia_dias} días sin red`]);
    if (state.presupuesto_eur)   rows.push(['Presupuesto', `${state.presupuesto_eur} €`]);
    if (state.configuracion_actual) rows.push(['Partes de', {desde_cero:'desde cero',parcial:'algo equipado',equipada:'full equipación'}[state.configuracion_actual]]);
    if (state.aparatos.length)   rows.push(['Aparatos', state.aparatos.map(a => (APARATOS.find(x=>x.id===a)||{label:a}).label).join(', ')]);
    return rows.map(([k,v]) =>
      `<div class="chat-summary-row"><span class="chat-summary-k">${escapeHtml(k)}</span><span class="chat-summary-v">${escapeHtml(v)}</span></div>`
    ).join('');
  }

  function addSummaryCard(state) {
    const html = `
      <p class="chat-bubble-q"><strong>Esto es lo que he entendido</strong></p>
      <div class="chat-summary-card">${renderStateAsList(state)}</div>
      ${state.aparatos.length === 0 ? '<p class="chat-summary-note">¿Falta algún aparato o detalle importante? Dímelo antes de seguir.</p>' : ''}
    `;
    addBot(html);
    addQuickReplies([
      { value:'confirm',   label:'✓ Sí, continuar' },
      { value:'correct',   label:'↺ Quiero corregir algo' },
    ], (opt) => {
      if (opt.value === 'confirm') onSummaryConfirmed();
      else addBot('¿Qué quieres corregir? Puedes decirme algo como "el presupuesto son 3.500" o "somos 3 personas" o "viajo con un amigo más".', {}),
        addQuickReplies([
          { value:'presupuesto', label:'Cambiar presupuesto' },
          { value:'autonomia',   label:'Cambiar autonomía' },
          { value:'uso',         label:'Cambiar patrón de uso' },
          { value:'aparatos',    label:'Añadir/quitar aparatos' },
          { value:'free',        label:'Otra cosa (escribir)' },
        ], (subOpt) => handleCorrectionReply(subOpt));
    });
  }

  function addResultCards(dec, state, opts = {}) {
    const html = [];
    html.push(`<p class="chat-bubble-q"><strong>Esta es la configuración que elegiría para ti</strong></p>`);
    if (dec.errors.length > 0) {
      html.push(`<div class="chat-warnings">
        ${dec.errors.map(e => `<p class="chat-warning">⚠ ${escapeHtml(e)}</p>`).join('')}
      </div>`);
    }
    html.push(`<div class="chat-products">`);
    for (const pick of dec.picks) {
      const p = pick.producto;
      const amazonSearch = `https://www.amazon.es/s?k=${encodeURIComponent(p.nombre)}&tag=${AMAZON_TAG}`;
      html.push(`
        <div class="chat-product-card">
          <div class="chat-product-head">
            <span class="chat-product-cat">${escapeHtml(pick.rol)}</span>
            <h3 class="chat-product-name">${escapeHtml(p.nombre)}</h3>
            <p class="chat-product-price">~${p.precio} €</p>
          </div>
          <div class="chat-product-body">
            <p class="chat-product-why"><strong>Por qué encaja:</strong> ${escapeHtml(pick.por_que_si)}</p>
            <p class="chat-product-reqs"><strong>Requisitos que satisface:</strong> ${pick.requisitos.map(r => escapeHtml(r)).join(', ')}</p>
            <p class="chat-product-alt"><strong>Descartamos ${escapeHtml(pick.alternativa_descartada)}</strong> — ${escapeHtml(pick.motivo_descarte)}</p>
            ${p.nota ? `<p class="chat-product-note">${escapeHtml(p.nota)}</p>` : ''}
            <a href="${amazonSearch}" target="_blank" rel="noopener sponsored" class="chat-product-buy">Ver opciones de compra →</a>
          </div>
        </div>
      `);
    }
    html.push(`</div>`);

    // Explicación global
    html.push(`<div class="chat-explanation">
      <p class="chat-bubble-q"><strong>¿Por qué esta configuración?</strong></p>
      <p>${escapeHtml(explainGlobal(state, dec))}</p>
    </div>`);

    // Qué cambiaría
    const cambios = whatWouldChange(state);
    if (cambios.length) {
      html.push(`<div class="chat-changes">
        <p class="chat-bubble-q"><strong>Esta recomendación cambiaría si…</strong></p>
        <ul class="chat-changes-list">
          ${cambios.map(c => `<li><strong>${escapeHtml(c.titulo)}</strong> → ${escapeHtml(c.efecto)}</li>`).join('')}
        </ul>
      </div>`);
    }

    addBot(html.join(''));
  }

  function addChangeOptions(dec, state, opts = {}) {
    addBot(`<p>Puedes probar otra configuración tocando una sola variable y volvemos a calcular:</p>`);
    addQuickReplies([
      { value:'change_auto',     label:'Cambiar autonomía' },
      { value:'change_pres',     label:'Cambiar presupuesto' },
      { value:'add_apparato',    label:'Añadir aparato' },
      { value:'change_uso',      label:'Cambiar patrón de uso' },
      { value:'reset',           label:'↺ Empezar de cero' },
    ], (opt) => {
      handleChangeRequest(opt.value, state, dec);
    });
  }

  // ====================================================================
  //  FLUJO PRINCIPAL
  // ====================================================================
  let state = freshState();
  let conversationActive = false;

  function startConversation(mode) {
    state = freshState();
    state.mode = mode;
    conversationActive = true;
    document.getElementById('chat-thread').innerHTML = '';
    document.getElementById('chat-welcome').classList.remove('chat-view-active');
    document.getElementById('chat-questions').classList.add('chat-view-active');
    setInputEnabled(true);

    if (mode === 'libre') {
      addBot(naturalHello(true));
    } else {
      addBot(pickOne([
        '<p>Hola. Te voy preguntando y tú respondes cuando quieras.</p>',
        '<p>Hola. Te haré las preguntas una a una, sin prisa.</p>',
      ]));
    }

    // Sugerencias rápidas para arrancar (solo en modo libre)
    if (mode === 'libre') {
      addQuickReplies([
        { value:'ejemplo', label:'Usar este ejemplo' },
      ], () => {
        addUser('Tengo una Transit para dos personas. Escapadas de fin de semana y un viaje de una semana en verano. 2.500 € y a veces sin enchufe 4 días.');
        handleUserText('Tengo una Transit para dos personas. Escapadas de fin de semana y un viaje de una semana en verano. 2.500 € y a veces sin enchufe 4 días.');
      });
    }
  }

  // Carga el caso de ejemplo con TODOS los campos rellenos. Salta
  // el diálogo de preguntas y va directo al resumen. Para demos.
  function startFromExample() {
    state = freshState();
    conversationActive = true;
    document.getElementById('chat-thread').innerHTML = '';
    document.getElementById('chat-welcome').classList.remove('chat-view-active');
    document.getElementById('chat-questions').classList.add('chat-view-active');
    document.getElementById('chat-text-input').value = '';
    setInputEnabled(true);

    addBot(naturalExampleIntro());
    addUser('Tengo una Transit para dos personas. Escapadas de fin de semana y un viaje de una semana en verano. 2.500 € y a veces sin enchufe 4 días.');
    interpretar('Tengo una Transit para dos personas. Escapadas de fin de semana y un viaje de una semana en verano. 2.500 € y a veces sin enchufe 4 días.', state);
    state.configuracion_actual = state.configuracion_actual || 'desde_cero';
    state.confirmados = { vehiculo:true, uso:true, autonomia:true, presupuesto:true };
    setTimeout(() => {
      addBot(naturalExample());
      addSummaryCard(state);
    }, 350);
  }

  function handleUserText(texto) {
    if (!conversationActive) return;
    addUser(texto);
    setInputEnabled(false);

    const typing = addTypingIndicator();

    setTimeout(() => {
      typing?.remove();
      const { updates, aparatoAdded, maxApetito } = interpretar(texto, state);

      // Caso especial: si viene como respuesta a "qué quieres corregir"
      if (state._correctionMode) {
        state._correctionMode = false;
        addBot(`Entendido: ${humanStateDeltas(updates, state)}.`);
        if (isComplete(state)) return onSummaryConfirmed();
        return askNextQuestion();
      }

      // Caso especial: si estamos en "cambio de X" mid-conversation
      if (state._changingField) {
        const field = state._changingField; state._changingField = null;
        const decision = decide(state);
        const prevDecision = state._prevDecision;
        addBot(naturalChangeMsg(field));
        renderDecisionDiff(prevDecision, decision, state, field);
        addChangeOptions(decision, state);
        setInputEnabled(true);
        return;
      }

      if (aparatoAdded) {
        addBot(naturalAparatoMid(aparatoAdded));
        // Avisar si cambia la decisión
        if (!state._firstDecisionShown && isComplete(state)) {
          // sigue hasta confirmar resumen
        } else if (state._prevDecision) {
          const prev = state._prevDecision;
          const next = decide(state);
          if (!sameDecision(prev, next)) {
            addBot(microReactionAparato(aparatoAdded, prev, next, state));
            addResultCards(next, state);
            addChangeOptions(next, state);
            state._prevDecision = next;
            setInputEnabled(true);
            return;
          }
        }
      } else if (updates.length > 0) {
        const ack = naturalAck(state, updates);
        const react = microReaction(state, updates);
        addBot([ack, react].filter(Boolean).join(' '));
      } else if (maxApetito) {
        addBot(naturalMaxApetito());
      } else {
        addBot(naturalError(state));
      }

      if (isComplete(state)) {
        addBot(naturalComplete());
        addSummaryCard(state);
      } else {
        askNextQuestion();
      }
      setInputEnabled(true);
    }, 350);
  }

  function askNextQuestion() {
    const q = nextQuestion(state);
    if (!q) return onSummaryConfirmed();
    addBot(`<p>${escapeHtml(q.ask)}</p>`);
    // Sugerencias rápidas de respuesta para los campos más comunes
    if (q.key === 'uso') addQuickReplies([
      { value:'finde',   label:'Fines de semana' },
      { value:'semanas', label:'Semanas sueltas' },
      { value:'anual',   label:'Todo el año' },
      { value:'nomada',  label:'Nómada digital' },
    ], (opt) => { addUser(opt.label); state.uso = opt.value; askNextQuestionOrSummary(); });
    else if (q.key === 'autonomia_dias') addQuickReplies([
      { value:1, label:'1-2 días' }, { value:3, label:'3-4 días' },
      { value:5, label:'5-7 días' }, { value:10, label:'7+ días' },
    ], (opt) => { addUser(opt.label); state.autonomia_dias = opt.value; askNextQuestionOrSummary(); });
  }
  function askNextQuestionOrSummary() {
    setTimeout(() => {
      if (isComplete(state)) addSummaryCard(state);
      else askNextQuestion();
      setInputEnabled(true);
    }, 250);
  }

  function onSummaryConfirmed() {
    state._firstDecisionShown = true;
    const dec = decide(state);
    state._prevDecision = dec;
    addBot(naturalConfirmSummary());
    addResultCards(dec, state);
    addChangeOptions(dec, state);
    setInputEnabled(true);
  }

  function handleChangeRequest(kind, state, prevDecision) {
    const labels = {
      change_auto:  '¿Cuántos días seguidos sin enchufar?',
      change_pres:  '¿Nuevo presupuesto?',
      change_uso:   '¿Nuevo patrón de uso?',
      add_apparato: '¿Qué aparato quieres añadir? (microondas, cafetera, secador, hervidor, aire acondicionado…)',
    };
    addBot(`<p>${escapeHtml(labels[kind] || '¿Qué quieres cambiar?')}</p>`);
    state._changingField = (kind === 'change_auto') ? 'autonomia_dias'
                          : (kind === 'change_pres') ? 'presupuesto_eur'
                          : (kind === 'change_uso')  ? 'uso'
                          : 'aparatos';
    state._prevDecision = prevDecision;
    if (kind === 'add_apparato') {
      addQuickReplies([
        { value:'microondas', label:'Microondas' },
        { value:'cafetera',   label:'Cafetera espresso' },
        { value:'secador',    label:'Secador' },
        { value:'aa',         label:'Aire acondicionado' },
        { value:'nevera',     label:'Nevera' },
        { value:'calefaccion',label:'Calefacción' },
      ], (opt) => {
        addUser(opt.label);
        if (!state.aparatos.includes(opt.value)) state.aparatos.push(opt.value);
        const prev = state._prevDecision;
        const next = decide(state);
        addBot(`<p><strong>Eso cambia la configuración.</strong> ${explainDiff(prev, next, state, opt.label)}</p>`);
        addResultCards(next, state);
        state._prevDecision = next;
        addChangeOptions(next, state);
        setInputEnabled(true);
      });
    }
  }
  function handleCorrectionReply(opt) {
    if (opt.value === 'free') {
      state._correctionMode = true;
      addBot('Vale, dime qué quieres corregir.');
      setInputEnabled(true);
      return;
    }
    const labels = {
      presupuesto: '¿Cuál es el nuevo presupuesto?',
      autonomia:   '¿Cuántos días sin enchufar?',
      uso:         '¿Cuál es el patrón de uso? (finde, semanas sueltas, todo el año, nómada)',
      aparatos:    '¿Qué aparatos quieres añadir o quitar?',
    };
    state._changingField = (opt.value === 'presupuesto') ? 'presupuesto_eur'
                        : (opt.value === 'autonomia')   ? 'autonomia_dias'
                        : (opt.value === 'uso')         ? 'uso'
                        : 'aparatos';
    addBot(`<p>${escapeHtml(labels[opt.value] || 'Dime.')}</p>`);
    if (opt.value === 'uso') {
      addQuickReplies([
        { value:'finde',   label:'Fines de semana' },
        { value:'semanas', label:'Semanas sueltas' },
        { value:'anual',   label:'Todo el año' },
        { value:'nomada',  label:'Nómada digital' },
      ], (o) => { addUser(o.label); state.uso = o.value; afterCorrectionUpdate(); });
    } else {
      setInputEnabled(true);
    }
  }
  function afterCorrectionUpdate() {
    const prev = decide(state); // sólo para acumular, no enseñamos
    addBot(pickOne(['Vale, hecho.', 'Anotado, sí.', 'OK.', 'Apuntado.']));
    state._prevDecision = prev;
    setTimeout(() => { onSummaryConfirmed(); setInputEnabled(true); }, 300);
  }

  function sameDecision(a, b) {
    if (!a || !b) return false;
    return JSON.stringify(a.picks.map(p => p.producto.id).sort()) ===
           JSON.stringify(b.picks.map(p => p.producto.id).sort());
  }

  function explainDiff(prev, next, state, aparatoLabel) {
    if (!prev || !next) return 'He recalculado con los nuevos datos.';
    const prevIds = new Set(prev.picks.map(p => p.producto.id));
    const nextIds = new Set(next.picks.map(p => p.producto.id));
    const added = [...nextIds].filter(id => !prevIds.has(id));
    const removed = [...prevIds].filter(id => !nextIds.has(id));
    const parts = [];
    if (aparatoLabel) {
      parts.push(`${aparatoLabel} introduce un nuevo consumo`);
    }
    if (added.length) {
      parts.push(`añado ${added.map(id => CATALOG.find(p => p.id === id)?.nombre).join(', ')}`);
    }
    if (removed.length) {
      parts.push(`descarto ${removed.map(id => CATALOG.find(p => p.id === id)?.nombre).join(', ')}`);
    }
    if (!parts.length) return 'He recalculado sin cambios significativos.';
    return parts.join(' · ') + '.';
  }
  function renderDecisionDiff(prev, next, state, field) {
    const html = [`<p><strong>Comparado con tu caso anterior:</strong></p><ul>`];
    const prevMap = new Map(prev.picks.map(p => [p.producto.id, p]));
    const nextMap = new Map(next.picks.map(p => [p.producto.id, p]));
    for (const [id, item] of nextMap) {
      if (!prevMap.has(id)) html.push(`<li><strong>Sumo:</strong> ${escapeHtml(item.producto.nombre)}</li>`);
    }
    for (const [id, item] of prevMap) {
      if (!nextMap.has(id)) html.push(`<li><strong>Quito:</strong> ${escapeHtml(item.producto.nombre)}</li>`);
    }
    html.push('</ul>');
    addBot(html.join(''));
  }

  // ----- Generación de respuestas naturales (variadas, no formularios) -----
  // Pools de frases para evitar el tono de script. La idea: cada turno usa
  // UNA frase de un pool, no concatena campos como en una tabla de BD.
  const ACKS = ['', '', '', '', '', '',
    'Vale.', 'Ok.', 'Anotado.', 'A ver, sí.', 'Bien.', 'Hecho.', 'Sí.', 'OK.', 'Perfecto.', 'Vale, vale.'];
  const DECIR_VEH = [
    v => `Una ${v}.`,
    v => `Ok, una ${v}.`,
    v => `Vale, ${v}.`,
    v => `${v}, anotado.`,
    v => `Entendido, ${v}.`,
    v => `Vale. ${v}.`,
  ];
  const DECIR_PERS = [
    n => n === 1 ? 'Tú solo.' : n === 2 ? 'Sois dos.' : `Sois ${n}.`,
    n => n === 1 ? 'Solo tú, vale.' : n === 2 ? 'Pareja entonces.' : `${n} personas, ok.`,
    n => n === 1 ? 'Tú solo.' : n === 2 ? 'Dos, vale.' : `${n}, vale.`,
    n => n === 1 ? 'Uno, vale.' : n === 2 ? 'Dos, sí.' : `${n}, anotado.`,
  ];
  const DECIR_USO = {
    finde:   ['Finde, ok.', 'Fines de semana, vale.', 'Vale, finde.'],
    semanas: ['Semanas sueltas, ok.', 'Vale, semanas sueltas.', 'Unas semanas de vez en cuando.'],
    nomada:  ['Nómada, vale.', 'Vale, modo nómada.', 'Nómada digital, sí.'],
    anual:   ['Todo el año, ok.', 'Vale. Todo el año.', 'Vale, uso intenso.'],
  };
  const DECIR_AUT = [
    n => n === 1 ? 'Sin enchufe un día, vale.' : n === 2 ? 'Unas dos noches sin red, ok.' : `${n} días sin enchufe, vale.`,
    n => `${n} días, ok.`,
    n => `Sin red durante ${n} días, anotado.`,
    n => `Vale, ${n} días fuera.`,
  ];
  const DECIR_PRES = [
    p => p >= 4000 ? `${p} €, bien.` : p >= 2000 ? `${p} €, ok.` : p >= 1000 ? `${p} €, vale.` : `Con ${p} €, ajustamos.`,
    p => `${p} €, anotado.`,
    p => p >= 4000 ? `Vale, con ${p} € vamos bien.` : `Vale, ${p} € es justo pero se puede.`,
  ];
  const DECIR_MAX = [
    'Vale, modo sin restricciones. Vamos a meter lo que entre.',
    'Modo maximalista, ok. Veremos qué entra.',
    'Vale, sin límites. Aprieta el cinturón del presupuesto.',
    'Vale. Vamos a fondo con lo que quepa.',
  ];
  const DECIR_KILLER = {
    microondas: 'Microondas, ojo. Eso son 1500 W de pico y obliga a revisar el inversor y la batería. Te ajusto el cálculo.',
    cafetera:   'Cafetera espresso sumada — también dispara el pico, redimensiono el inversor.',
    secador:    'Secador, vale. Eso pide inversor de más calibre. Lo recalculo.',
    hervidor:   'Hervidor, ok. Pico de 1500 W, redimensiono el inversor.',
    aa:         'Aire acondicionado, vale. Eso ya son placas grandes, batería gorda e inversor dedicado. Veremos qué entra.',
    calefaccion:'Calefacción, anotado. Si es Webasto, son casi 1000 € más.',
    nevera:     'Nevera, ok. A ver qué modelo encaja con el presupuesto.',
    portatil:   'Vale, cargador del portátil. Modesto, no cambia mucho.',
    iluminacion:'Iluminación LED, ok. Consumo bajo.',
  };

  let _lastAckIndex = -1;
  function pickAck() {
    let i;
    do { i = Math.floor(Math.random() * ACKS.length); } while (i === _lastAckIndex && ACKS.length > 1);
    _lastAckIndex = i;
    return ACKS[i];
  }
  function pickOne(pool) { return pool[Math.floor(Math.random() * pool.length)]; }

  function naturalAck(state, updates) {
    const parts = [];
    if (updates.includes('vehiculo') && state.vehiculo) {
      parts.push(pickOne(DECIR_VEH)(state.vehiculo.texto));
    }
    if (updates.includes('personas') && state.personas !== null) {
      parts.push(pickOne(DECIR_PERS)(state.personas));
    }
    if (updates.includes('uso') && state.uso) {
      parts.push(pickOne(DECIR_USO[state.uso]));
    }
    if (updates.includes('autonomia_dias') && state.autonomia_dias) {
      parts.push(pickOne(DECIR_AUT)(state.autonomia_dias));
    }
    if (updates.includes('presupuesto_eur') && state.presupuesto_eur) {
      parts.push(pickOne(DECIR_PRES)(state.presupuesto_eur));
    }
    if (parts.length === 0) return '';
    return parts.join(' ');
  }

  function microReaction(state, updates) {
    // Reacción corta si lo que acaba de decir el usuario tiene implicaciones obvias.
    const r = [];
    if (updates.includes('autonomia_dias') && updates.includes('presupuesto_eur')) {
      if (state.autonomia_dias >= 7 && state.presupuesto_eur < 2500) {
        r.push('Ojo, autonomía larga con presupuesto ajustado es complicado. Hay que hilar fino.');
      } else if (state.autonomia_dias >= 5 && state.presupuesto_eur < 1500) {
        r.push('Con ese presupuesto y esos días fuera… vamos justos. Veremos qué entra.');
      }
    }
    if (updates.includes('vehiculo') && state.vehiculo?.tamano === 'pequeno') {
      r.push('Furgo pequeña, ¿eh? Cuidado con meter mucha nevera grande o placas rígidas — hay sitio justo.');
    }
    if (updates.includes('uso') && state.uso === 'nomada' && state.autonomia_dias == null) {
      r.push('Nómada pide batería en condiciones, luego ajustamos.');
    }
    return r.join(' ');
  }

  function naturalAparatoMid(aparato) {
    if (DECIR_KILLER[aparato.id]) return DECIR_KILLER[aparato.id];
    return `${aparato.label}, anotado.`;
  }
  function microReactionAparato(aparato, prev, next, state) {
    // Cuando añadir un aparato cambia la decisión mid-flow, queremos una
    // frase natural que explique la consecuencia, no un diff técnico.
    const prevIds = new Set(prev.picks.map(p => p.producto.id));
    const added = next.picks.filter(p => !prevIds.has(p.producto.id)).map(p => p.producto.nombre);
    if (aparato.id === 'microondas') {
      return pickOne([
        'Microondas, vale — eso son 1500 W de pico. Hasta ahora estaba tirando con un inversor modesto, no me vale. Te subo a uno en condiciones y reviso la batería. Mira.',
        'A ver, microondas. Eso obliga a que el inversor aguante picos altos. Se nota en la elección. Te paso el cálculo actualizado.',
        'Microondas, ojo — cambia las cuentas. Te redimensiono inversor y batería.',
      ]) + (added.length ? ` Sumo ${added.join(', ')}.` : '');
    }
    if (aparato.id === 'cafetera') {
      return pickOne([
        'Cafetera espresso, vale. También dispara el pico, redimensiono el inversor.',
        'Una cafetera espresso pide inversor algo más serio. Te ajusto.',
      ]) + (added.length ? ` Sumo ${added.join(', ')}.` : '');
    }
    if (['secador','hervidor'].includes(aparato.id)) {
      return `${aparato.label} también tira de pico. Ajusto el inversor.` + (added.length ? ` Sumo ${added.join(', ')}.` : '');
    }
    if (aparato.id === 'aa') {
      return 'Aire acondicionado, vale. Eso son placas grandes, batería gorda e inversor dedicado. Reviso todo.' + (added.length ? ` Sumo ${added.join(', ')}.` : '');
    }
    if (aparato.id === 'calefaccion') {
      return 'Calefacción, anotado. Si es tipo Webasto son cerca de 1000 € más.' + (added.length ? ` Lo meto.` : '');
    }
    if (aparato.id === 'nevera') {
      return 'Nevera, ok. A ver qué modelo encaja con el presupuesto.' + (added.length ? ` Sumo ${added.join(', ')}.` : '');
    }
    // Resto de aparatos: respuesta neutra
    return naturalAparatoMid(aparato);
  }
  function naturalMaxApetito() {
    return pickOne(DECIR_MAX);
  }
  function naturalError(state) {
    // Variaciones según lo que sepamos ya. Si no sabemos nada, hint más abierto.
    const knows = !!state.vehiculo;
    const opt = [
      'Hmm, eso no me ha cuadrado.',
      'Perdona, no te he pillado.',
      'Jmm, no me encaja lo que me dices.',
      'A ver, no te sigo.',
      '¿Me lo cuentas de otra forma?',
    ];
    let tail;
    if (knows) {
      tail = pickOne([
        '¿Qué te quería preguntar?',
        '¿Cuál es la siguiente pieza?',
        '¿Quieres que te recuerde lo que llevo?',
        '¿A qué te refieres?',
      ]);
    } else {
      tail = 'Empieza contándome algo de la furgo, da igual el detalle.';
    }
    return `${pickOne(opt)} ${tail}`;
  }
  function naturalComplete() {
    return pickOne([
      'Vale, con eso tengo lo importante.',
      'OK, con esto ya me vale para proponerte algo.',
      'Vale. Tengo lo justo para calcular.',
      'OK. Vamos a hacer números.',
      'Bien, creo que ya sé lo que buscas.',
    ]);
  }
  function naturalConfirmSummary() {
    return pickOne([
      'Vale. Vamos allá.',
      'OK. Mira a ver qué te propongo.',
      'Vale. Ahí va.',
      'Vale. Vamos a hacer cuentas.',
      'Hecho. Vamos allá.',
    ]);
  }
  function naturalHello(free) {
    if (free) return pickOne([
      '<p>Hola. Cuéntame cómo quieres usar la camper, con tus palabras. Vehículo, gente, patrón de uso, presupuesto… como te salga.</p>',
      '<p>Hola. Empieza contándome lo que tengas: la furgo, las personas, el uso, el presupuesto… Con eso ya me oriento.</p>',
    ]);
    return pickOne([
      '<p>Hola. Te voy preguntando y tú respondes cuando quieras.</p>',
    ]);
  }
  function naturalExample() {
    return pickOne([
      'He cargado un caso típico. Mira a ver si te encaja.',
      'Ahí va un caso ya relleno. Si te encaja, sigue; si no, me dices qué cambiar.',
      'Vale. Para enseñarte cómo va, te dejo un caso ya montado.',
    ]);
  }

  function naturalChangeMsg(field) {
    const map = {
      autonomia_dias: 'Hecho. Sin red, ¿cuántos días seguidos?',
      presupuesto_eur: 'Hecho. ¿De presupuesto, qué cifra?',
      uso:            'Hecho. ¿Qué patrón de uso? (finde, semanas sueltas, todo el año, nómada.)',
      aparatos:       'Hecho. ¿Qué aparato quieres añadir? (microondas, cafetera, secador, AA…)',
    };
    return map[field] || 'Hecho. ¿Qué quieres ajustar?';
  }

  function humanFieldName(field) {
    return { autonomia_dias:'la autonomía', presupuesto_eur:'el presupuesto', uso:'el patrón de uso', aparatos:'los aparatos' }[field] || field;
  }
  function humanValueFor(field, state) {
    if (field === 'autonomia_dias') return `${state.autonomia_dias} días`;
    if (field === 'presupuesto_eur') return `${state.presupuesto_eur} €`;
    if (field === 'uso') return { finde:'fines de semana', semanas:'semanas sueltas', nomada:'nómada', anual:'todo el año' }[state.uso];
    if (field === 'aparatos') return state.aparatos.join(', ');
    return '?';
  }

  // ====================================================================
  //  RESET
  // ====================================================================
  function resetConversation() {
    state = freshState();
    conversationActive = false;
    document.getElementById('chat-thread').innerHTML = '';
    setInputEnabled(false);
    document.getElementById('chat-questions').classList.remove('chat-view-active');
    document.getElementById('chat-result').classList.remove('chat-view-active');
    document.getElementById('chat-welcome').classList.add('chat-view-active');
    window.scrollTo({ top:0, behavior:'smooth' });
  }

  // ====================================================================
  //  BOOT
  // ====================================================================
  document.addEventListener('DOMContentLoaded', () => {
    const btnStart    = document.getElementById('chat-start');
    const btnExample  = document.getElementById('chat-start-example');
    const btnSend     = document.getElementById('chat-send');
    const input       = document.getElementById('chat-text-input');
    const btnRestart  = document.getElementById('chat-restart');

    if (btnStart)   btnStart.addEventListener('click', () => startConversation('libre'));
    if (btnExample) btnExample.addEventListener('click', startFromExample);
    if (btnRestart) btnRestart.addEventListener('click', resetConversation);
    if (input) {
      input.addEventListener('keydown', e => {
        if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
          e.preventDefault();
          const txt = input.value.trim();
          if (!txt) return;
          input.value = '';
          handleUserText(txt);
        }
      });
    }
    if (btnSend) {
      btnSend.addEventListener('click', () => {
        if (!input) return;
        const txt = input.value.trim();
        if (!txt) return;
        input.value = '';
        handleUserText(txt);
      });
    }
    setInputEnabled(false);
  });
})();
