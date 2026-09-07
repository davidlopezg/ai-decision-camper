/* config.example.js
   Plantilla para config.js. Copia este archivo a config.js
   y rellena los valores reales. config.js está en .gitignore
   y NO debe commitearse al repositorio.

   Cómo obtener cada valor:
   - SUPABASE_URL + SUPABASE_ANON_KEY: Supabase → Settings → API
   - LLM_API_KEY: tu proveedor LLM (MiniMax)
   - LLM_ENDPOINT: endpoint base de la API
   - LLM_MODEL: nombre del modelo (ej. "minimax-2.7")
   - AMAZON_TAG: Tracking ID de Amazon Associates
*/

const CONFIG = {
  // Supabase
  SUPABASE_URL: 'https://YOUR_PROJECT.supabase.co',
  SUPABASE_ANON_KEY: 'YOUR_ANON_KEY',

  // LLM (MiniMax)
  LLM_API_KEY: 'YOUR_LLM_API_KEY',
  LLM_ENDPOINT: 'https://api.YOUR_PROVIDER.com/v1',
  LLM_MODEL: 'minimax-2.7',

  // Afiliación
  AMAZON_TAG: 'camperdecisio-21',

  // System prompt
  SYSTEM_PROMPT_PATH: '../system-prompts/asesor-camper.md',
};