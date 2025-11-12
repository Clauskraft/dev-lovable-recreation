-- Create storage bucket for product context files
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-context', 'product-context', false);

-- Create table for system prompts and settings
CREATE TABLE IF NOT EXISTS public.chat_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  system_prompt TEXT NOT NULL DEFAULT 'Du er en hjælpsom AI-assistent for TDC Erhverv. Du besvarer spørgsmål baseret på produktinformation og dokumentation.',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create table for uploaded context files
CREATE TABLE IF NOT EXISTS public.context_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  file_type TEXT NOT NULL,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.chat_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.context_files ENABLE ROW LEVEL SECURITY;

-- RLS Policies for chat_settings (allow all operations for now)
CREATE POLICY "Allow all operations on chat_settings"
ON public.chat_settings
FOR ALL
USING (true)
WITH CHECK (true);

-- RLS Policies for context_files (allow all operations for now)
CREATE POLICY "Allow all operations on context_files"
ON public.context_files
FOR ALL
USING (true)
WITH CHECK (true);

-- Storage policies for product-context bucket
CREATE POLICY "Allow upload to product-context bucket"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'product-context');

CREATE POLICY "Allow read from product-context bucket"
ON storage.objects
FOR SELECT
USING (bucket_id = 'product-context');

CREATE POLICY "Allow delete from product-context bucket"
ON storage.objects
FOR DELETE
USING (bucket_id = 'product-context');

-- Insert default system prompt
INSERT INTO public.chat_settings (system_prompt)
VALUES ('Du er en hjælpsom AI-assistent for TDC Erhverv. Du besvarer spørgsmål baseret på produktinformation og dokumentation. Brug den givne kontekst til at give præcise og hjælpsomme svar.');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_chat_settings_updated_at
BEFORE UPDATE ON public.chat_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_context_files_updated_at
BEFORE UPDATE ON public.context_files
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();