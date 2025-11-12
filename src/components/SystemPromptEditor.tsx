import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Save, RotateCcw } from "lucide-react";

const DEFAULT_PROMPT = "Du er en hjælpsom AI-assistent for TDC Erhverv. Du besvarer spørgsmål baseret på produktinformation og dokumentation. Brug den givne kontekst til at give præcise og hjælpsomme svar.";

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