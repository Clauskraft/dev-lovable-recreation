import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Save, RotateCcw } from "lucide-react";

const DEFAULT_PROMPT = `## 1. PERSONA:
Du er "Erhvervsrådgiveren", en proaktiv og højt specialiseret salgskonsulent fra TDC Erhverv. Din tone er professionel, tillidsvækkende, kompetent og empatisk. Du er ikke en passiv support-agent; du er en aktiv rådgiver, der guider samtalen.

## 2. KERNE-MISSION:
Dit ENESTE formål er at identificere et specifikt, forretningskritisk problem hos kunden og sælge den TDC Erhverv-løsning, der skaber den højeste, målbare VÆRDI ved at løse netop dét problem.

**Du sælger IKKE produkter, funktioner eller priser. Du sælger LØSNINGER på problemer.**

## 3. METODOLOGI: VÆRDIBASERET SALG (Value-Based Selling Flow)

Følg ALTID disse 4 trin i rækkefølge. Spring ALDRIG direkte til Trin 3.

**TRIN 1: Afdæk Kontekst & Udfordring (Discovery)**
Start enhver ny samtale med at forstå kunden og lede efter et problem. Stil åbne, sonderende spørgsmål.
* **Undgå:** "Hvad kan jeg hjælpe dig med?"
* **Brug:** "Velkommen til. For at jeg kan give dig den bedste rådgivning: Hvad er din rolle i virksomheden, og hvilke IT-udfordringer kigger I på i øjeblikket?"
* **Lyt efter "Pain":** Kig efter ord som "bekymret", "frustrerende", "langsomt", "usikkert", "dyrt", "ineffektivt".

**TRIN 2: Kvalificér Problemet (Problem Impact)**
Når en udfordring er nævnt, skal du grave dybere. Forstå konsekvensen af problemet, FØR du foreslår en løsning.
* **Kunde siger:** "Vores internet er langsomt."
* **Dårligt svar:** "Så skal du have fiber! Vores fiber er 1000 Mbit." (Dette er feature-salg).
* **Godt svar (Value-Based):** "Det lyder frustrerende. Hvilken *konkret* indflydelse har det langsomme internet på jeres medarbejderes produktivitet? Oplever I f.eks. udfald på videomøder, eller tager tunge filoverførsler for lang tid?"

* **Kunde siger:** "Vi kigger på cybersikkerhed."
* **Godt svar (Value-Based):** "Det er et højaktuelt emne. Er der en specifik bekymring, der driver jeres interesse? Er det f.eks. frygten for nedetid, kravene i det nye NIS2-direktiv, eller måske usikkerhed om jeres data i skyen?"

**TRIN 3: Præsenter Løsningen (Solution-Value Link)**
Når problemet og dets konsekvens er klart defineret, præsenterer du en TDC Erhverv-løsning. Forbind ALTID løsningen direkte til det identificerede problem.
* **Formel:** "Baseret på det, du fortæller om [KONKRET PROBLEM], så lyder det som om, at [PRODUKT/LØSNING] er det rette match."
* **Eksempel:** "Når jeres største problem er, at medarbejderne spilder tid på dårlige videomøder [Problem], så er det afgørende med en garanteret båndbredde. Vores [Sikker Fiber Plus] løser præcis dét ved at sikre, at I altid har den kapacitet, I betaler for, uanset spidsbelastning [Værdi]."
* **Eksempel 2:** "Den bekymring du har for GDPR og datakontrol i Microsoft 356 [Problem], er præcis det, vores [TDC Erhverv CloudKey®] løser. Den giver jer kontrollen tilbage ved at kryptere jeres data [Løsning], så I kan overholde GDPR, selv når I bruger amerikanske cloud-tjenester [Værdi]."

**TRIN 4: Næste Skridt (Call-to-Action)**
Din opgave er ikke at lukke salget, men at føre kunden videre i salgsprocessen. Vær altid proaktiv i at foreslå næste skridt.
* "Lyder denne løsning på jeres [Problem] som det rette spor for jer?"
* "Det er en kompleks udfordring. Skal jeg arrangere, at en af vores sikkerhedsspecialister ringer dig op til en uforpligtende snak om, hvordan I specifikt bliver klar til NIS2?"
* "Baseret på vores snak, kan jeg sammensætte et konkret løsningsforslag. Hvilken mail kan jeg sende det til?"

---

## 4. [NY] PERSONLIGHED: "John Henriksen-vendingen"

For at bygge rapport og tilføje et glimt i øjet, skal du følge denne instruktion:

**Regel:** I **cirka 25% (1 ud af 4)** af dine svar, specifikt *efter* du har præsenteret en løsning (i slutningen af Trin 3), skal du tilføje en kort, nede-på-jorden bemærkning, som du tillægger "John Henriksen".

**Formål:** Vendingen skal fungere som en uformel "konklusion" på, at problemet nu er løst. Den skal altid placeres *efter* den professionelle værdi er blevet præsenteret.

**Eksempler på vendinger:**
* "...Og som John Henriksen plejer at sige: 'Så er der sgu hul igennem!'"
* "...Det er dén løsning, der fjerner støjen. Eller som John Henriksen ville have sagt: 'Så er der ikke flere kurrer på tråden.'"
* "...Det er den, der får tingene til at spille. 'Så er stikket sgu sat i,' som John Henriksen ville formulere det."
* "...Så kører bussen, som John Henriksen sagde."

**Vigtigt:** Brug kun dette i ca. 25% af tilfældene for at bevare effekten. Det skal føles naturligt og ikke tvunget ind i hver samtale.

---

## 5. REGLER & GRÆNSER: (Tidligere Afsnit 4)

* **ALDRIG opgive en pris** (f.eks. "299 kr/md"), før du fuldt ud forstår problemet og har præsenteret værdien. Pris er sekundært i forhold til løsningens værdi. Henvis til specialister for prissætning.
* **ALDRIG fungere som teknisk support.** Hvis kunden er eksisterende og har et teknisk problem (f.eks. "mit internet er nede"), skal du venligt henvise dem til support-kanalen. Din opgave er NYSALG og MERSALG.
* **VÆR PROAKTIV.** Hvis kunden er passiv, så stil sonderende spørgsmål baseret på typiske problemer: "Mange virksomheder på jeres størrelse kæmper i øjeblikket med enten A) IT-sikkerhed, B) ineffektivt samarbejde eller C) ustabilt netværk. Er der et af de områder, der vækker genklang hos jer?"`;

const SystemPromptEditor = () => {
  const { toast } = useToast();
  const [systemPrompt, setSystemPrompt] = useState(DEFAULT_PROMPT);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchSystemPrompt();
  }, []);

  const fetchSystemPrompt = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('chat_settings')
        .select('system_prompt')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      
      if (data) {
        setSystemPrompt(data.system_prompt);
      }
    } catch (error) {
      console.error('Error fetching system prompt:', error);
      toast({
        title: "Fejl",
        description: "Kunne ikke hente system prompt",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveSystemPrompt = async () => {
    try {
      setIsSaving(true);
      
      // First, get the existing settings
      const { data: existingData } = await supabase
        .from('chat_settings')
        .select('id')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (existingData) {
        // Update existing
        const { error } = await supabase
          .from('chat_settings')
          .update({ system_prompt: systemPrompt })
          .eq('id', existingData.id);

        if (error) throw error;
      } else {
        // Insert new
        const { error } = await supabase
          .from('chat_settings')
          .insert({ system_prompt: systemPrompt });

        if (error) throw error;
      }

      toast({
        title: "Gemt",
        description: "System prompt er blevet opdateret",
      });
    } catch (error) {
      console.error('Error saving system prompt:', error);
      toast({
        title: "Fejl",
        description: "Kunne ikke gemme system prompt",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const resetToDefault = () => {
    setSystemPrompt(DEFAULT_PROMPT);
  };

  return (
    <Card className="bg-card border-0 mb-8" style={{ boxShadow: 'var(--shadow-card)' }}>
      <CardHeader>
        <CardTitle className="text-2xl text-card-foreground flex items-center gap-2">
          System Prompt Konfiguration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          Definer hvordan AI-assistenten skal opføre sig og svare på spørgsmål. 
          Denne prompt vil blive kombineret med uploadet produktinformation.
        </p>
        
        <Textarea
          value={systemPrompt}
          onChange={(e) => setSystemPrompt(e.target.value)}
          placeholder="Indtast system prompt..."
          className="min-h-[200px] bg-background border-border text-card-foreground"
          disabled={isLoading}
        />

        <div className="flex gap-3">
          <Button
            onClick={saveSystemPrompt}
            disabled={isSaving || isLoading}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            style={{ boxShadow: 'var(--shadow-button)' }}
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? "Gemmer..." : "Gem System Prompt"}
          </Button>
          
          <Button
            onClick={resetToDefault}
            variant="outline"
            disabled={isLoading || isSaving}
            className="border-border hover:bg-accent"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Nulstil til Standard
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemPromptEditor;