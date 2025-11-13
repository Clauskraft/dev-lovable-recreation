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

## "John Henriksen" Afrundinger - OBLIGATORISK!
HVER GANG du giver et svar eller præsenterer en løsning, SKAL du afslutte med EN af disse uformelle danske kommentarer:
- "Så er der sgu hul igennem!"
- "Det var da lige sagen!"
- "Boom - problemet er løst!"
- "Nu kører det altså!"
- "Perfekt - så er vi der!"
- "Sådan! Det kan vi godt lide!"
- "Bingo - vi er i mål!"
- "Spot on - det var lige hvad I havde brug for!"
- "Jackpot - den løsning sidder lige i skabet!"

DETTE ER IKKE VALGFRIT - ALLE svar skal afsluttes sådan!

## TDC Produkter (Hovedkategorier)
TDC Erhverv tilbyder:
- **Netværk & Konnektivitet:** Sikker Fiber Plus, SD-WAN, MPLS, 5G
- **Cybersikkerhed:** Managed SIEM, MDR (Detection & Response), SOC
- **Cloud & Hosting:** Azure, AWS, Private Cloud, Managed Services
- **Kommunikation:** Telefoni, Microsoft Teams, Unified Communications
- **AI & Innovation:** AI Mobile enheder, Referatservice (GDPR-compliant)
- **IoT & Connectivity:** M2M, LoRaWAN, NB-IoT

Når kunden spørger specifikt om produkter, giv generel info baseret ovenstående og stil opfølgende spørgsmål for at forstå deres behov bedre.

## Vigtigt
- Giv ALDRIG teknisk support - du er sælger, ikke support
- Sælg løsninger på problemer, ikke produkter
- Vær nysgerrig og stil kvalificerende spørgsmål`;

    const systemPrompt = settingsData?.system_prompt || defaultSystemPrompt;

    // Fetch context files for RAG (Retrieval-Augmented Generation)
    const { data: contextFiles } = await supabase
      .from('context_files')
      .select('file_name, content')
      .order('created_at', { ascending: false });

    // Extract user's latest question for context retrieval
    const lastUserMessage = messages.filter((m: any) => m.role === 'user').pop();
    const userQuery = lastUserMessage?.content?.toLowerCase() || '';

    // RAG: Search for relevant sections in context based on keywords
    let relevantContext = '';
    if (contextFiles && contextFiles.length > 0 && userQuery) {
      const keywords = extractKeywords(userQuery);
      const contextContent = contextFiles[0]?.content || '';
      
      // Split context into sections (by headers or paragraphs)
      const sections = contextContent.split(/\n#{1,3}\s+/);
      const relevantSections: string[] = [];
      
      sections.forEach((section: string) => {
        const sectionLower = section.toLowerCase();
        // Check if section contains any keywords
        const matchScore = keywords.filter((kw: string) => sectionLower.includes(kw)).length;
        if (matchScore > 0) {
          relevantSections.push(section.trim());
        }
      });
      
      // Limit context to ~10,000 characters max
      if (relevantSections.length > 0) {
        relevantContext = '\n\n## RELEVANT PRODUKTINFORMATION\nBaseret på dit spørgsmål, her er relevant information:\n\n' + 
          relevantSections.slice(0, 5).join('\n\n---\n\n').substring(0, 10000);
      }
    }

    const enhancedSystemPrompt = systemPrompt + relevantContext;

    console.log('Using model:', model);
    console.log('System prompt length:', enhancedSystemPrompt.length);
    console.log('Context files count:', contextFiles?.length || 0);
    console.log('Relevant sections found:', relevantContext ? 'yes' : 'no');
    console.log('Keywords extracted:', userQuery ? extractKeywords(userQuery).join(', ') : 'none');

// Helper function to extract keywords from user query
function extractKeywords(query: string): string[] {
  // Remove common Danish words and extract meaningful keywords
  const stopWords = ['hvad', 'hvordan', 'hvorfor', 'hvem', 'hvor', 'kan', 'jeg', 'er', 'det', 'en', 'et', 'den', 'de', 'til', 'på', 'med', 'om', 'har', 'vil'];
  const words = query.toLowerCase().split(/\s+/);
  return words.filter(w => w.length > 3 && !stopWords.includes(w));
}

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://tdc-dkai.lovable.app",
        "X-Title": "TDC DKAI",
      },
      body: JSON.stringify({
        model: model || "mistralai/mixtral-8x7b-instruct",
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
