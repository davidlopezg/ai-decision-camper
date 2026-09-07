// Supabase Edge Function: llm-proxy
// Proxy server-side para el LLM. La API key NUNCA sale del servidor.
// El navegador llama a esta función, que a su vez llama al proveedor LLM.
//
// Deploy: supabase functions deploy llm-proxy --no-verify-jwt
// Secrets: supabase secrets set LLM_API_KEY=sk-... LLM_ENDPOINT=https://api.minimaxi.chat/v1 LLM_MODEL=minimax-2.7

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Secrets — configurados con `supabase secrets set`
const LLM_API_KEY  = Deno.env.get("LLM_API_KEY");
const LLM_ENDPOINT = Deno.env.get("LLM_ENDPOINT") ?? "https://api.minimaxi.chat/v1";
const LLM_MODEL    = Deno.env.get("LLM_MODEL")    ?? "minimax-2.7";

const corsHeaders = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Preflight CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  if (!LLM_API_KEY) {
    return new Response(
      JSON.stringify({ error: "LLM_API_KEY not configured on server" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const { messages, temperature, max_tokens } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "messages must be a non-empty array" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const llmRes = await fetch(`${LLM_ENDPOINT}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type":  "application/json",
        "Authorization": `Bearer ${LLM_API_KEY}`,
      },
      body: JSON.stringify({
        model: LLM_MODEL,
        messages,
        temperature: typeof temperature === "number" ? temperature : 0.7,
        ...(typeof max_tokens === "number" ? { max_tokens } : {}),
      }),
    });

    if (!llmRes.ok) {
      const errText = await llmRes.text().catch(() => "");
      return new Response(
        JSON.stringify({
          error: `LLM upstream ${llmRes.status}`,
          detail: errText.slice(0, 500),
        }),
        {
          status: llmRes.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const data = await llmRes.json();
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ error: e?.message ?? "Unknown proxy error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
