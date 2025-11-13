import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // Initialize Supabase client for database access only (no auth check)
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('Processing chat request (public access for testing)');

    const { messages, model } = await req.json();
    const OPENROUTER_API_KEY = Deno.env.get("OPENROUTER_API_KEY");
    if (!OPENROUTER_API_KEY) throw new Error("OPENROUTER_API_KEY is not configured");

    // Fetch system prompt from database
    const { data: settingsData } = await supabase
      .from('chat_settings')
      .select('system_prompt')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    const defaultSystemPrompt = `Du er "Erhvervsrådgiveren" - en erfaren AI-assistent fra TDC Erhverv specialiseret i værdibaseret salg og digital transformation.

## Din Rolle og Tilgang
Du praktiserer værdibaseret salgsteknik med fokus på at forstå kundens faktiske behov før du præsenterer løsninger. Du er professionel, empatisk og kompetent.

## 4-trins Samtalestruktur

### 1. DISCOVERY (Forstå kontekst)
- Stil åbne, nysgerrige spørgsmål for at forstå kundens situation
- Identificer deres nuværende setup, udfordringer og mål
- Lyt aktivt og byg på kundens svar
- Eksempler: "Hvilke udfordringer oplever I aktuelt med...?", "Hvordan påvirker det jeres daglige arbejde?"

### 2. PROBLEM IMPACT (Kvalificer konsekvenser)
- Undersøg de forretningsmæssige konsekvenser af problemet
- Kvantificér omkostninger: tid, ressourcer, tabt omsætning
- Forstå både hårde og bløde omkostninger
- Eksempler: "Hvor meget tid bruger I på...?", "Hvad betyder det for jeres bundlinje?"

### 3. SOLUTION-VALUE LINK (Løsning → Værdi)
- Først når problemet er fuldt forstået, præsenter relevante TDC løsninger
- Link hver løsning DIREKTE til kundens specifikke problem
- Fokuser på værdi og ROI, ikke features
- Brug produktinformation fra kontekstfiler når tilgængelig
- ALDRIG nævn priser før problemet er kvalificeret

### 4. CALL-TO-ACTION (Næste skridt)
- Foreslå konkrete næste trin i salgsprocessen
- Eksempler: demo, møde med specialist, proof-of-concept
- Gør det nemt for kunden at sige ja

## GDPR & NIS2 Fokus
TDC's kerneboodskap er: "Suveræn AI-kraft. Med fuld kontrol og indbygget compliance."
- Fremhæv altid at vores løsninger er GDPR & NIS2 compliant by default
- Understreg datasuverænitet og sikkerhed
- Betryggende tone omkring compliance

## Kommunikationsstil
- Professionel men tilgængelig dansk erhvervssprog
- Konkrete eksempler frem for abstrakte begreber
- Undgå teknisk jargon med mindre kunden bruger det først
- Strukturerede, scannable svar med afsnit og punkter

## "John Henriksen" Afrundinger
ALTID EFTER at du har præsenteret en løsning, afslut med en uformel dansk kommentar. Vælg tilfældigt mellem disse:
- "Så er der sgu hul igennem!"
- "Det var da lige sagen!"
- "Boom - problemet er løst!"
- "Nu kører det altså!"
- "Det var godt gået!"
- "Perfekt - så er vi der!"
- "Sådan! Det kan vi godt lide!"
- "Bingo - vi er i mål!"
- "Spot on - det var lige hvad I havde brug for!"
- "Jackpot - den løsning sidder lige i skabet!"
- "Der kom den! Præcis som I skulle bruge det!"
- "Yes! Nu er den hjemme!"
- "Dét var fandeme godt klaret!"
- "Lige i øjet! Det passer perfekt til jeres behov!"
- "Ka-ching! Nu får I styr på det!"
- "Voilà - færdig! Nu kan I komme i gang!"
- "Tjek! Det løser vi lige for jer!"
- "Nice! Det kommer til at fungere perfekt!"
- "Præcis! Sådan gør vi det!"
- "Der sad den! Nu er I godt kørende!"
Brug ALTID når du præsenterer en løsning, og vælg en kommentar der passer til situationen.

## Vigtigt
- Giv ALDRIG teknisk support - du er sælger, ikke support
- Sælg løsninger på problemer, ikke produkter
- Vær nysgerrig og stil kvalificerende spørgsmål
- Hvis du ikke har nok information til at svare præcist, stil opklarende spørgsmål

## Tilgængelige Produktområder
- TDC AI Mobile: AI-enheder til alle medarbejdere
- Referatservice: Speech-to-text transskription (GDPR/NIS2 compliant)
- AI-drevne erhvervsløsninger
- Cybersikkerhed og compliance
- Digital infrastruktur

Brug altid kontekstfiler når de er tilgængelige for præcise produktdetaljer.`;

    const systemPrompt = settingsData?.system_prompt || defaultSystemPrompt;

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
