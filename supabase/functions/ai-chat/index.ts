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

    // RAG: Search for relevant sections using TF-IDF scoring
    let relevantContext = '';
    if (contextFiles && contextFiles.length > 0 && userQuery) {
      const contextContent = contextFiles[0]?.content || '';
      
      // Split context into sections (by headers or paragraphs)
      const sections = contextContent.split(/\n#{1,3}\s+/).filter(s => s.trim().length > 50);
      
      if (sections.length > 0) {
        // Calculate TF-IDF scores for each section
        const scoredSections = sections.map((section, idx) => {
          const score = calculateTFIDFScore(userQuery, section, sections);
          const sectionPreview = section.substring(0, 100).replace(/\n/g, ' ');
          return { section: section.trim(), score, index: idx, preview: sectionPreview };
        });
        
        // Sort by score and take top 5 most relevant sections
        const topSections = scoredSections
          .filter(s => s.score > 0)
          .sort((a, b) => b.score - a.score)
          .slice(0, 5);
        
        console.log('\n=== TF-IDF RAG SCORING ===');
        console.log('User query:', userQuery.substring(0, 200));
        console.log('Total sections analyzed:', sections.length);
        console.log('Sections with score > 0:', scoredSections.filter(s => s.score > 0).length);
        console.log('\nTop 5 sections selected:');
        topSections.forEach((s, i) => {
          console.log(`${i + 1}. Score: ${s.score.toFixed(4)} | Preview: ${s.preview}...`);
        });
        
        if (topSections.length > 0) {
          const contextText = topSections
            .map(s => s.section)
            .join('\n\n---\n\n')
            .substring(0, 10000);
          
          relevantContext = '\n\n## RELEVANT PRODUKTINFORMATION\nBaseret på dit spørgsmål, her er relevant information:\n\n' + contextText;
          console.log('Total context characters added:', contextText.length);
        } else {
          console.log('No relevant sections found with score > 0');
        }
        console.log('=== END TF-IDF SCORING ===\n');
      }
    }

    const enhancedSystemPrompt = systemPrompt + relevantContext;

    console.log('Using model:', model);
    console.log('System prompt length:', enhancedSystemPrompt.length);
    console.log('Context files count:', contextFiles?.length || 0);
    console.log('Relevant context added:', relevantContext ? 'yes' : 'no');

// Helper functions for TF-IDF scoring
function tokenize(text: string): string[] {
  // Remove common Danish stop words and extract meaningful terms
  const stopWords = new Set([
    'og', 'i', 'jeg', 'det', 'at', 'en', 'et', 'den', 'til', 'er', 'som', 'på', 'de',
    'med', 'han', 'af', 'for', 'ikke', 'der', 'var', 'mig', 'sig', 'men', 'har',
    'om', 'vi', 'min', 'havde', 'ham', 'hun', 'nu', 'over', 'da', 'fra', 'du',
    'ud', 'sin', 'dem', 'os', 'op', 'man', 'hans', 'hvor', 'eller', 'hvad', 'skal',
    'selv', 'her', 'alle', 'vil', 'blev', 'kunne', 'ind', 'når', 'være', 'dog',
    'noget', 'ville', 'jo', 'deres', 'efter', 'ned', 'skulle', 'denne', 'end',
    'dette', 'mit', 'også', 'under', 'have', 'dig', 'anden', 'hende', 'mine',
    'alt', 'meget', 'sit', 'sine', 'vor', 'mod', 'disse', 'hvis', 'din', 'kan',
    'how', 'what', 'when', 'where', 'why', 'who', 'the', 'a', 'an', 'and', 'or',
    'hvem', 'hvordan', 'hvorfor', 'hvornår'
  ]);
  
  return text.toLowerCase()
    .split(/[\s\p{P}]+/u)
    .filter(word => word.length > 2 && !stopWords.has(word))
    .filter(word => !/^\d+$/.test(word)); // Remove pure numbers
}

function calculateTermFrequency(term: string, document: string): number {
  const tokens = tokenize(document);
  const termCount = tokens.filter(t => t === term).length;
  return tokens.length > 0 ? termCount / tokens.length : 0;
}

function calculateInverseDocumentFrequency(term: string, allDocuments: string[]): number {
  const docsWithTerm = allDocuments.filter(doc => 
    tokenize(doc).includes(term)
  ).length;
  
  return docsWithTerm > 0 
    ? Math.log(allDocuments.length / docsWithTerm) 
    : 0;
}

function calculateTFIDFScore(query: string, document: string, allDocuments: string[]): number {
  const queryTerms = tokenize(query);
  
  if (queryTerms.length === 0) return 0;
  
  // Calculate TF-IDF score
  let tfidfScore = 0;
  const uniqueTerms = [...new Set(queryTerms)];
  
  for (const term of uniqueTerms) {
    const tf = calculateTermFrequency(term, document);
    const idf = calculateInverseDocumentFrequency(term, allDocuments);
    tfidfScore += tf * idf;
  }
  
  // Normalize TF-IDF by query length
  tfidfScore = tfidfScore / queryTerms.length;
  
  // Add substring matching score for better flexibility
  const docLower = document.toLowerCase();
  const queryLower = query.toLowerCase();
  let substringScore = 0;
  
  // Check for full query match
  if (docLower.includes(queryLower)) {
    substringScore += 2.0;
  }
  
  // Check for individual term matches (including partial)
  for (const term of queryTerms) {
    if (term.length < 3) continue; // Skip very short terms
    
    // Count occurrences of term in document
    const regex = new RegExp(term, 'gi');
    const matches = docLower.match(regex);
    if (matches) {
      substringScore += matches.length * 0.5;
    }
  }
  
  // Combine scores: TF-IDF + substring matching
  // Weight substring matching more heavily to catch partial matches
  return (tfidfScore * 0.3) + (substringScore * 0.7);
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
        model: model || "meta-llama/llama-3-70b-instruct",
        messages: [
          { role: "system", content: enhancedSystemPrompt },
          ...messages,
          { 
            role: "system", 
            content: "VIGTIGT: Du SKAL afslutte dit svar med EN af 'John Henriksen' kommentarerne (f.eks. 'Så er der sgu hul igennem!'). Dette er IKKE valgfrit!" 
          }
        ],
        stream: true,
        max_tokens: 2000, // Limit tokens to prevent credit exhaustion
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
