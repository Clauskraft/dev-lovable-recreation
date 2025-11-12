import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Upload, FileText, X } from "lucide-react";

interface UploadedFile {
  id: string;
  file_name: string;
  file_path: string;
  file_size: number;
  created_at: string;
}

const ContextFileUpload = () => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  const fetchUploadedFiles = async () => {
    try {
      const { data, error } = await supabase
        .from('context_files')
        .select('id, file_name, file_path, file_size, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUploadedFiles(data || []);
    } catch (error) {
      console.error('Error fetching files:', error);
      toast({
        title: "Fejl",
        description: "Kunne ikke hente filer",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    try {
      for (const file of Array.from(files)) {
        // Validate file type
        const allowedTypes = ['text/plain', 'application/pdf', 'text/markdown', 'application/json'];
        if (!allowedTypes.includes(file.type) && !file.name.endsWith('.md') && !file.name.endsWith('.txt')) {
          toast({
            title: "Ugyldig filtype",
            description: `${file.name} er ikke en understøttet filtype. Kun .txt, .md, .pdf, og .json filer er tilladt.`,
            variant: "destructive",
          });
          continue;
        }

        // Read file content
        const content = await file.text();

        // Upload file to storage
        const filePath = `${Date.now()}-${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from('product-context')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        // Save metadata to database
        const { data, error: dbError } = await supabase
          .from('context_files')
          .insert({
            file_name: file.name,
            file_path: filePath,
            file_size: file.size,
            file_type: file.type,
            content: content,
          })
          .select()
          .single();

        if (dbError) throw dbError;

        if (data) {
          setUploadedFiles(prev => [data, ...prev]);
        }

        toast({
          title: "Fil uploadet",
          description: `${file.name} er blevet tilføjet til konteksten`,
        });
      }
      
      // Refresh the list after all uploads
      await fetchUploadedFiles();
      
      // Notify parent components
      window.dispatchEvent(new CustomEvent('context-files-updated'));
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Upload fejl",
        description: "Kunne ikke uploade fil. Prøv igen.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      // Reset input
      event.target.value = '';
    }
  };

  const deleteFile = async (fileId: string, filePath: string) => {
    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('product-context')
        .remove([filePath]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('context_files')
        .delete()
        .eq('id', fileId);

      if (dbError) throw dbError;

      setUploadedFiles(prev => prev.filter(f => f.id !== fileId));

      // Also notify parent/Launched page to refresh
      window.dispatchEvent(new CustomEvent('context-files-updated'));

      toast({
        title: "Fil slettet",
        description: "Filen er blevet fjernet fra konteksten",
      });
    } catch (error) {
      console.error('Error deleting file:', error);
      toast({
        title: "Fejl",
        description: "Kunne ikke slette fil",
        variant: "destructive",
      });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <Card className="bg-card border-0" style={{ boxShadow: 'var(--shadow-card)' }}>
      <CardHeader>
        <CardTitle className="text-2xl text-card-foreground flex items-center gap-2">
          <Upload className="w-6 h-6 text-primary" />
          Upload Kontekst Filer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          Upload produktinformation, specifikationer eller dokumentation som AI'en kan bruge til at besvare spørgsmål.
        </p>

        <div className="flex items-center gap-4">
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleFileUpload}
            multiple
            accept=".txt,.md,.pdf,.json,text/plain,text/markdown,application/pdf,application/json"
            disabled={isUploading}
          />
          <label htmlFor="file-upload">
            <Button
              asChild
              disabled={isUploading}
              className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
              style={{ boxShadow: 'var(--shadow-button)' }}
            >
              <span>
                <Upload className="w-4 h-4 mr-2" />
                {isUploading ? "Uploader..." : "Vælg Filer"}
              </span>
            </Button>
          </label>
          <span className="text-sm text-muted-foreground">
            Tilladt: .txt, .md, .pdf, .json
          </span>
        </div>

        {uploadedFiles.length > 0 && (
          <div className="space-y-2 mt-6">
            <h3 className="text-lg font-semibold text-card-foreground">Uploadede Filer</h3>
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-3 bg-accent rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-card-foreground">{file.file_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatFileSize(file.file_size)} • {new Date(file.created_at).toLocaleDateString('da-DK')}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteFile(file.id, file.file_path)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContextFileUpload;