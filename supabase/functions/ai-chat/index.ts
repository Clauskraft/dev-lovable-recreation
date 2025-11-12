import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, model } = await req.json();
    const OPENROUTER_API_KEY = Deno.env.get("OPENROUTER_API_KEY");
    if (!OPENROUTER_API_KEY) throw new Error("OPENROUTER_API_KEY is not configured");

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch system prompt from database
    const { data: settingsData } = await supabase
      .from('chat_settings')
      .select('system_prompt')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    const systemPrompt = settingsData?.system_prompt || 'Du er en hjælpsom AI-assistent fra TDC Erhverv. Du hjælper med at besvare spørgsmål om teknologi, løsninger og services.';

    // Fetch all context files
    const { data: contextFiles } = await supabase
      .from('context_files')
      .select('file_name, content')
      .order('created_at', { ascending: false });

    // Build context string from files
    let contextString = '';
    if (contextFiles && contextFiles.length > 0) {
      contextString = '\n\nTilgængelig produktinformation:\n\n';
      contextFiles.forEach((file: any) => {
        if (file.content) {
          contextString += `--- ${file.file_name} ---\n${file.content}\n\n`;
        }
      });
    }

    // Combine system prompt with context
    const enhancedSystemPrompt = systemPrompt + contextString;

    console.log('Using model:', model);
    console.log('System prompt length:', enhancedSystemPrompt.length);
    console.log('Context files count:', contextFiles?.length || 0);

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://tdc-dkai.lovable.app",
        "X-Title": "TDC DKAI",
      },
      body: JSON.stringify({
        model: model || "mistralai/mistral-7b-instruct",
        messages: [
          { role: "system", content: enhancedSystemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "For mange anmodninger, prøv igen senere." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Betalingskrævet. Tilføj midler til din konto." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      return new Response(JSON.stringify({ error: "API fejl: " + errorText }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Ukendt fejl" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
