#!/bin/bash
# Despliega Edge Function y secrets vía Management API.
# Sin archivos temporales — todo via pipes.

PROJECT_REF="zbiniqqunsdkglwtwvgc"
FUNCTION_FILE="$HOME/repos/afiliacion/supabase/functions/llm-proxy/index.ts"
LOCAL_CONFIG="$HOME/repos/afiliacion/web/assets/config.js"

echo ""
echo "=== Deploy Supabase Edge Function llm-proxy ==="
echo ""

# Token
if [ -z "${SUPABASE_ACCESS_TOKEN:-}" ]; then
  printf "Pega tu SUPABASE_ACCESS_TOKEN (sbp_...): "
  read -r SUPABASE_ACCESS_TOKEN
  [ -z "$SUPABASE_ACCESS_TOKEN" ] && { echo "❌ Vacío"; exit 1; }
fi

# Validar token
HTTP=$(curl -sS -o /dev/null -w "%{http_code}" \
  -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" \
  "https://api.supabase.com/v1/projects/$PROJECT_REF")
[ "$HTTP" != "200" ] && { echo "❌ Token inválido (HTTP $HTTP)"; exit 1; }
echo "✅ Token válido"
echo ""

# Leer credenciales locales
# Truco: extrae el valor siguiendo `:`, lo que ignora comentarios y comillas colgantes.
extract() {
  local key="$1"
  grep -E "^[[:space:]]*${key}[[:space:]]*:" "$LOCAL_CONFIG" \
    | sed -E "s/^[[:space:]]*${key}[[:space:]]*:[[:space:]]*['\"]([^'\"]*)['\"].*/\1/" \
    | head -1
}
LLM_KEY=$(extract LLM_API_KEY)
LLM_EP=$(extract  LLM_ENDPOINT)
LLM_MD=$(extract  LLM_MODEL)
ANON=$(extract    SUPABASE_ANON_KEY)

echo "Project: $PROJECT_REF"
echo "LLM: $LLM_EP / $LLM_MD (key ${#LLM_KEY} chars)"
echo ""

# 1) Deploy función
echo "=== Deploy ==="
RESP=$(curl -sS -w '\n__C__%{http_code}' -X POST \
  "https://api.supabase.com/v1/projects/$PROJECT_REF/functions/deploy" \
  -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" \
  -F 'metadata={"name":"llm-proxy","slug":"llm-proxy","verify_jwt":false,"entrypoint_path":"index.ts"};type=application/json' \
  -F "file=@$FUNCTION_FILE")
CODE=$(echo "$RESP" | grep -o '__C__[0-9]*' | sed 's/__C__//')
BODY=$(echo "$RESP" | grep -v '__C__')
echo "HTTP $CODE"
SLUG=$(echo "$BODY" | python3 -c "import json,sys; print(json.loads(sys.stdin.read()).get('slug',''))" 2>/dev/null)
NAME=$(echo "$BODY" | python3 -c "import json,sys; print(json.loads(sys.stdin.read()).get('name',''))" 2>/dev/null)
echo "Slug: $SLUG  Name: $NAME"
[ "$CODE" != "200" ] && [ "$CODE" != "201" ] && { echo "❌ Deploy falló"; echo "$BODY" | head -c 500; exit 1; }
echo "✅ Función desplegada"
echo ""

# 2) Secrets — via pipe, sin archivos
echo "=== Secrets ==="
post_secret() {
  local name="$1"
  local value="$2"
  local payload
  payload=$(python3 -c "import json,sys; print(json.dumps([{'name':sys.argv[1],'value':sys.argv[2]}]))" "$name" "$value")
  HTTP=$(echo -n "$payload" | curl -sS -w '\n__C__%{http_code}' -X POST \
    "https://api.supabase.com/v1/projects/$PROJECT_REF/secrets" \
    -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" \
    -H "Content-Type: application/json" \
    --data-binary @-)
  CODE=$(echo "$HTTP" | grep -o '__C__[0-9]*' | sed 's/__C__//')
  BODY=$(echo "$HTTP" | grep -v '__C__')
  echo "  $name → HTTP $CODE"
  [ "$CODE" != "200" ] && [ "$CODE" != "201" ] && echo "    $(echo "$BODY" | head -c 200)"
}
post_secret LLM_API_KEY  "$LLM_KEY"
post_secret LLM_ENDPOINT "$LLM_EP"
post_secret LLM_MODEL    "$LLM_MD"
echo ""

# 3) Test — probar ambos: nombre y slug
echo "=== Test ==="
sleep 2
WORKING=""

for path in "llm-proxy" "$SLUG"; do
  echo "  Probando /$path"
  RESP=$(curl -sS -w '\n__C__%{http_code}' \
    -X POST "https://$PROJECT_REF.supabase.co/functions/v1/$path" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $ANON" \
    -d '{"messages":[{"role":"user","content":"di hola en 3 palabras"}]}')
  CODE=$(echo "$RESP" | grep -o '__C__[0-9]*' | sed 's/__C__//')
  BODY=$(echo "$RESP" | grep -v '__C__')
  echo "    HTTP $CODE"
  echo "    $(echo "$BODY" | head -c 400)"
  if [ "$CODE" = "200" ] && echo "$BODY" | grep -q '"choices"'; then
    WORKING="$path"
  fi
done
echo ""

if [ -n "$WORKING" ]; then
  echo "🎉 FUNCIONA con path: $WORKING"
  echo ""
  echo "URL final del proxy:"
  echo "  https://$PROJECT_REF.supabase.co/functions/v1/$WORKING"
  echo ""
  if [ "$WORKING" = "llm-proxy" ]; then
    echo "✅ chat.js no necesita cambios — ya apunta a /functions/v1/llm-proxy."
  else
    echo "=== Actualizar chat.js ==="
    echo "Sustituir en web/assets/chat.js:"
    echo "  const url = \`\${CONFIG.SUPABASE_URL}/functions/v1/llm-proxy\`;"
    echo "por:"
    echo "  const url = \`\${CONFIG.SUPABASE_URL}/functions/v1/$WORKING\`;"
  fi
else
  echo "⚠️ Ninguno funcionó. Pega la salida."
fi
