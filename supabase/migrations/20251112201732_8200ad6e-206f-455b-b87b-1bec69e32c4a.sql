-- Fix function search path security issue by dropping triggers first
DROP TRIGGER IF EXISTS update_chat_settings_updated_at ON public.chat_settings;
DROP TRIGGER IF EXISTS update_context_files_updated_at ON public.context_files;
DROP FUNCTION IF EXISTS public.update_updated_at_column();

-- Recreate function with proper search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Recreate triggers
CREATE TRIGGER update_chat_settings_updated_at
BEFORE UPDATE ON public.chat_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_context_files_updated_at
BEFORE UPDATE ON public.context_files
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();