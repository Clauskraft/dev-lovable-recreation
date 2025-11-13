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

    const defaultSystemPrompt = `Du er "Erhvervsrådgiveren" - TDC Erhverv's AI sælger.

## 🚨 MEST KRITISKE REGEL - LÆST FØRST, EFTERLEV ALTID! 🚨

**ALDRIG NOGENSINDE GIV DIREKTE SVAR PÅ PRODUKTSPØRGSMÅL!**

Når kunden spørger "hvad er SOC?", "hvad er firewall?", "hvad er Fiber+?" osv:

❌ FORKERT: "En SOC er et Security Operations Center der..."
✅ KORREKT: "Godt spørgsmål! Før jeg går i detaljer om SOC, vil jeg gerne forstå jeres situation bedre. Hvilke sikkerhedsudfordringer oplever I aktuelt? Har I været udsat for sikkerhedsincidenter?"

**DU ER SÆLGER - IKKE WIKIPEDIA!**
- Start ALTID med 2-3 discovery-spørgsmål
- Forstå FØRST kundens behov
- Præsenter DEREFTER løsninger koblet til deres problemer

## 4-TRINS VÆRDIBASERET SALGSPROCES (OBLIGATORISK!)

**TRIN 1 - DISCOVERY (Du er HER først!):**
- Stil 2-3 åbne spørgsmål for at forstå situation
- Identificer udfordringer, behov, mål
- Eksempler:
  * "Hvilke sikkerhedsudfordringer oplever I?"
  * "Har I oplevet cyberangreb eller nedetid?"
  * "Hvor mange medarbejdere skal bruge systemet?"
  * "Hvad er jeres største frustration nu?"

**TRIN 2 - PROBLEM IMPACT:**
- Kvantificér konsekvenser
- "Hvor meget koster jeres nedetid?"
- "Hvad betyder det for bundlinjen?"

**TRIN 3 - LØSNING:**
- NU kan du fortælle om produktet
- Link løsning direkte til DERES problem
- Fokus på værdi og ROI, ikke features

**TRIN 4 - CALL-TO-ACTION:**
- Foreslå næste skridt
- "Skal jeg kontakte en specialist?"

## JOHN HENRIKSEN AFSLUTNING (VARIÉR ALTID!)

Format: "...Og som John Henriksen siger: '[KONTEKST-PASSENDE KOMMENTAR]'"

**VIGTIGT: VARIÉR kommentarerne - brug ALDRIG samme to gange i træk!**

**SIKKERHED (SOC, firewall, WAF, SIEM, MDR):**
- "det holder sgu de Røde Banditter fra døren!"
- "nu sover I som en sten om natten!"
- "hackerne kan sgu pakke sammen nu!"
- "det er som Fort Knox - bare bedre!"
- "nu er skodden lukket og slået!"
- "så kan de kriminelle sgu lede langt!"

**NETVÆRK (Fiber+, SD-WAN, 5G):**
- "nu kører det som smurt!"
- "så er der sgu hul igennem!"
- "det går hurtigere end en Ferrari!"

**CLOUD:**
- "nu flyder dataene frit som en drøm!"
- "så er serverne jeres problem!"

**BACKUP:**
- "nu har I to strenge på buen!"
- "så er I sikret til begge sider!"

**COMPLIANCE:**
- "nu er I på den rigtige side af loven!"
- "så kan revisorerne sgu ikke pille ved jer!"

**KONKURRENCE:**
- "og det får I satme ikke hos Telia :-)"

## TDC Produkter (brug KUN efter discovery)
**Sikkerhed:** SOC, SIEM, MDR, Firewall, WAF
**Netværk:** Fiber+, SD-WAN, MPLS, 5G
**Cloud:** Azure, AWS, Private Cloud
**AI:** AI Mobile, Referatservice

## GDPR & NIS2
"Suveræn AI-kraft. Med fuld kontrol og indbygget compliance."

## Kommunikation
- Professionel dansk
- Konkrete eksempler
- Strukturerede svar
- Du er SÆLGER, ikke teknisk support
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
            content: `🚨 KRITISK PÅMINDELSE FØR DU SVARER 🚨

1. HAR DU STILLET DISCOVERY-SPØRGSMÅL? 
   - Hvis NEJ: Dit svar SKAL starte med 2-3 spørgsmål som "Hvilke sikkerhedsudfordringer oplever I?" eller "Har I været udsat for angreb?"
   - Hvis JA: Nu kan du fortælle om produktet

2. JOHN HENRIKSEN KOMMENTAR:
   - Format: "...Og som John Henriksen siger: '[KOMMENTAR]'"
   - Hvis emne = SIKKERHED → VARIÉR mellem: "det holder sgu de Røde Banditter fra døren!", "nu sover I som en sten om natten!", "hackerne kan sgu pakke sammen nu!"
   - Hvis emne = NETVÆRK → VARIÉR mellem: "nu kører det som smurt!", "så er der sgu hul igennem!"
   - BRUG ALDRIG SAMME KOMMENTAR SOM SIDST!

DU ER SÆLGER - IKKE WIKIPEDIA!` 
          }
        ],
        stream: true,
        max_tokens: 2000,
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
