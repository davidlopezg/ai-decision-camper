/* config.example.js
   Plantilla para config.js. Copia este archivo a config.js
   y rellena los valores reales. config.js está en .gitignore
   y NO debe commitearse al repositorio.

   ARQUITECTURA ACTUAL (con proxy server-side):
   - SUPABASE_URL + SUPABASE_ANON_KEY: el navegador los usa directamente
     para consultar la tabla `productos`. La anon key es pública por diseño.
   - AMAZON_TAG: Tracking ID de Amazon Associates (va en URLs de afiliado).
   - SYSTEM_PROMPT_PATH: ruta al .md con el prompt del sistema.

   Lo que YA NO va aquí (movido al servidor):
   - LLM_API_KEY, LLM_ENDPOINT, LLM_MODEL: viven en los secrets de la
     Supabase Edge Function `llm-proxy`. El navegador nunca los ve.

   Cómo desplegar el proxy:
   - Código: supabase/functions/llm-proxy/index.ts
   - Deploy: supabase functions deploy llm-proxy --no-verify-jwt
   - Secrets: supabase secrets set LLM_API_KEY=sk-... \
                                LLM_ENDPOINT=https://api.minimaxi.chat/v1 \
                                LLM_MODEL=minimax-2.7
*/

const CONFIG = {
  // Supabase (públicos — la anon key está diseñada para cliente)
  SUPABASE_URL: 'https://YOUR_PROJECT.supabase.co',
  SUPABASE_ANON_KEY: 'YOUR_ANON_KEY',

  // Afiliación
  AMAZON_TAG: 'camperdecisio-21',

  // System prompt
  SYSTEM_PROMPT_PATH: '../system-prompts/asesor-camper.md',
};
