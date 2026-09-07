#!/bin/bash
# Despliega Edge Function y secrets vía Management API.
# Sin archivos temporales — todo via pipes.
#
# Por qué este flujo:
#   POST /functions/deploy crea SIEMPRE una nueva función con slug=UUID.
#   El metadata del deploy NO acepta slug. Por eso, después del deploy,
#   usamos PUT /functions (bulk update) para renombrar el slug de la
#   nueva función a "llm-proxy". Así, la URL canónica es siempre
#   /functions/v1/llm-proxy y no cambia entre redeploys.
#
#   También borramos las versiones anteriores (mismo nombre, slug UUID)
#   para que no se acumulen duplicados en el dashboard.

PROJECT_REF="zbiniqqunsdkglwtwvgc"
FUNCTION_SLUG="llm-proxy"
FUNCTION_FILE="$HOME/repos/afiliacion/supabase/functions/llm-proxy/index.ts"
LOCAL_CONFIG="$HOME/repos/afiliacion/web/assets/config.js"

echo ""
echo "=== Deploy Supabase Edge Function $FUNCTION_SLUG ==="
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

# Leer credenciales locales (regex robusta: ignora comentarios y comillas colgantes)
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

# Helper para llamadas con código HTTP separable
api_call() {
  local resp
  resp=$(curl -sS -w '\n__C__%{http_code}' "$@")
  CODE=$(echo "$resp" | grep -o '__C__[0-9]*' | sed 's/__C__//')
  BODY=$(echo "$resp" | grep -v '__C__')
}

# 1) Listar funciones existentes con nombre "llm-proxy" para limpieza posterior
echo "=== 1/4 Listar funciones existentes ==="
api_call \
  "https://api.supabase.com/v1/projects/$PROJECT_REF/functions" \
  -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN"
echo "HTTP $CODE"
EXISTING_IDS=$(echo "$BODY" | python3 -c "
import json, sys
try:
    funcs = json.loads(sys.stdin.read())
    print('\n'.join(f['id'] for f in funcs if f.get('name') == '$FUNCTION_SLUG'))
except Exception as e:
    sys.exit(0)
")
COUNT=$(echo "$EXISTING_IDS" | grep -c . 2>/dev/null || echo 0)
echo "Versiones anteriores con nombre '$FUNCTION_SLUG': $COUNT"
echo ""

# 2) Deploy del código (siempre crea nueva función con slug UUID)
echo "=== 2/4 Deploy del código ==="
api_call -X POST \
  "https://api.supabase.com/v1/projects/$PROJECT_REF/functions/deploy" \
  -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" \
  -F 'metadata={"name":"'"$FUNCTION_SLUG"'","verify_jwt":false,"entrypoint_path":"index.ts"};type=application/json' \
  -F "file=@$FUNCTION_FILE"
echo "HTTP $CODE"
NEW_ID=$(echo "$BODY" | python3 -c "import json,sys; print(json.loads(sys.stdin.read()).get('id',''))" 2>/dev/null)
NEW_SLUG=$(echo "$BODY" | python3 -c "import json,sys; print(json.loads(sys.stdin.read()).get('slug',''))" 2>/dev/null)
NEW_VERSION=$(echo "$BODY" | python3 -c "import json,sys; print(json.loads(sys.stdin.read()).get('version',1))" 2>/dev/null)
echo "Nueva función: id=$NEW_ID  slug=$NEW_SLUG  version=$NEW_VERSION"
[ -z "$NEW_ID" ] && { echo "❌ Deploy falló"; echo "$BODY" | head -c 500; exit 1; }
echo ""

# 3) Renombrar el slug a "llm-proxy" vía bulk update
echo "=== 3/4 Renombrar slug a '$FUNCTION_SLUG' ==="
PAYLOAD=$(python3 -c "
import json
print(json.dumps([{
  'id': '$NEW_ID',
  'slug': '$FUNCTION_SLUG',
  'name': '$FUNCTION_SLUG',
  'status': 'ACTIVE',
  'version': $NEW_VERSION,
  'entrypoint_path': 'index.ts',
  'verify_jwt': False,
}]))
")
api_call -X PUT \
  "https://api.supabase.com/v1/projects/$PROJECT_REF/functions" \
  -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  --data-binary @- <<< "$PAYLOAD"
echo "HTTP $CODE"
echo "$BODY" | head -c 300
echo ""
echo ""

# 4) Borrar versiones anteriores con el mismo nombre
echo "=== 4/4 Limpieza de versiones anteriores ==="
DELETED=0
if [ -n "$EXISTING_IDS" ]; then
  while IFS= read -r old_id; do
    [ -z "$old_id" ] && continue
    [ "$old_id" = "$NEW_ID" ] && continue  # no borrar la recién creada/renombrada
    api_call -X DELETE \
      "https://api.supabase.com/v1/projects/$PROJECT_REF/functions/$old_id" \
      -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN"
    echo "  DELETE $old_id → HTTP $CODE"
    [ "$CODE" = "200" ] && DELETED=$((DELETED+1))
  done <<< "$EXISTING_IDS"
fi
echo "Funciones borradas: $DELETED"
echo ""

# Secrets — via pipe, sin archivos
echo "=== Secrets ==="
post_secret() {
  local name="$1"
  local value="$2"
  local payload
  payload=$(python3 -c "import json,sys; print(json.dumps([{'name':sys.argv[1],'value':sys.argv[2]}]))" "$name" "$value")
  api_call -X POST \
    "https://api.supabase.com/v1/projects/$PROJECT_REF/secrets" \
    -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" \
    -H "Content-Type: application/json" \
    --data-binary @- <<< "$payload"
  echo "  $name → HTTP $CODE"
  [ "$CODE" != "200" ] && [ "$CODE" != "201" ] && echo "    $(echo "$BODY" | head -c 200)"
}
post_secret LLM_API_KEY  "$LLM_KEY"
post_secret LLM_ENDPOINT "$LLM_EP"
post_secret LLM_MODEL    "$LLM_MD"
echo ""

# Test final
echo "=== Test ==="
sleep 2
echo "  Probando /$FUNCTION_SLUG"
api_call -X POST "https://$PROJECT_REF.supabase.co/functions/v1/$FUNCTION_SLUG" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ANON" \
  -d '{"messages":[{"role":"user","content":"di hola en 3 palabras"}]}'
echo "    HTTP $CODE"
echo "    $(echo "$BODY" | head -c 200)"
echo ""

if [ "$CODE" = "200" ] && echo "$BODY" | grep -q '"choices"'; then
  echo "🎉 FUNCIONA con path: $FUNCTION_SLUG"
  echo ""
  echo "URL final del proxy:"
  echo "  https://$PROJECT_REF.supabase.co/functions/v1/$FUNCTION_SLUG"
  echo ""
  echo "✅ chat.js no necesita cambios — ya apunta a /functions/v1/$FUNCTION_SLUG."
else
  echo "⚠️ /llm-proxy no responde. Pega la salida para diagnosticar."
fi
