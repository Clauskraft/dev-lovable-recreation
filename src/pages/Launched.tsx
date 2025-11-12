import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Folder, Search, Download, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import SystemPromptEditor from "@/components/SystemPromptEditor";
import ContextFileUpload from "@/components/ContextFileUpload";

const Launched = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { name: "Alle produkter", count: products.length },
    { name: "AI Løsninger", count: products.filter(p => p.category === "AI Løsninger").length },
    { name: "Netværk", count: products.filter(p => p.category === "Netværk").length },
    { name: "Sikkerhed", count: products.filter(p => p.category === "Sikkerhed").length },
    { name: "Cloud Services", count: products.filter(p => p.category === "Cloud Services").length },
  ];

  useEffect(() => {
    fetchContextFiles();
    
    // Listen for file updates from ContextFileUpload component
    const handleFileUpdate = () => {
      fetchContextFiles();
    };
    
    window.addEventListener('context-files-updated', handleFileUpdate);
    
    return () => {
      window.removeEventListener('context-files-updated', handleFileUpdate);
    };
  }, []);

  const fetchContextFiles = async () => {
    try {
      const { data, error } = await supabase
        .from('context_files')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform context files to product format for display
      const transformedProducts = data?.map((file, index) => ({
        id: file.id,
        name: file.file_name,
        category: file.file_type.includes('pdf') ? 'AI Løsninger' : 
                 file.file_type.includes('json') ? 'Cloud Services' :
                 file.file_type.includes('text') ? 'Netværk' : 'Sikkerhed',
        description: `Uploadet kontekstfil: ${file.file_name}`,
        fileType: file.file_type.split('/')[1]?.toUpperCase() || 'FILE',
        uploadDate: new Date(file.created_at).toLocaleDateString('da-DK'),
        fileSize: formatFileSize(file.file_size),
        file_path: file.file_path,
      })) || [];

      setProducts(transformedProducts);
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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
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

      // Refresh the list
      fetchContextFiles();

      toast({
        title: "Fil slettet",
        description: "Filen er blevet fjernet",
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

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen" style={{ background: 'var(--gradient-hero)' }}>
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Inside <span className="text-accent">Produktbibliotek</span>
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-3xl">
            Centralt bibliotek for al produktinformation. Upload, organiser og del produktdokumentation til AI-chatten.
          </p>
        </div>

        {/* System Prompt Editor */}
        <SystemPromptEditor />

        {/* Context File Upload */}
        <ContextFileUpload />

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <Card className="bg-card border-0" style={{ boxShadow: 'var(--shadow-card)' }}>
              <CardHeader>
                <CardTitle className="text-lg text-card-foreground">Kategorier</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-all duration-200 text-left"
                  >
                    <span className="text-sm font-medium text-card-foreground">{category.name}</span>
                    <Badge variant="secondary" className="text-xs bg-primary/20 text-primary border-0">
                      {category.count}
                    </Badge>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Products */}
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Søg i produkter..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-card border-0 text-card-foreground"
                  style={{ boxShadow: 'var(--shadow-card)' }}
                />
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredProducts.map((product) => (
                <Card 
                  key={product.id} 
                  className="bg-card border-0 transition-all duration-300 hover:scale-105"
                  style={{ boxShadow: 'var(--shadow-card)' }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-primary" />
                        <Badge variant="secondary" className="text-xs bg-accent text-accent-foreground border-0">
                          {product.fileType}
                        </Badge>
                      </div>
                      <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-0">
                        {product.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg mb-2 text-card-foreground">{product.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Uploadet:</span>
                        <span className="font-medium text-card-foreground">{product.uploadDate}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Størrelse:</span>
                        <span className="font-medium text-card-foreground">{product.fileSize}</span>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 border-0"
                          style={{ boxShadow: 'var(--shadow-button)' }}
                          disabled
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => deleteFile(product.id, product.file_path)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-primary-foreground/30 mx-auto mb-4" />
                <p className="text-primary-foreground/70">Ingen produkter fundet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Launched;
