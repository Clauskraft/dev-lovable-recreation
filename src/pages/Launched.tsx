import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Folder, Search, Download, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Launched = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { name: "Alle produkter", count: 24 },
    { name: "AI Løsninger", count: 8 },
    { name: "Netværk", count: 6 },
    { name: "Sikkerhed", count: 5 },
    { name: "Cloud Services", count: 5 },
  ];

  const products = [
    {
      id: 1,
      name: "TDC AI Mobile",
      category: "AI Løsninger",
      description: "AI-drevet mobiltelefon med Perplexity Assistant",
      fileType: "PDF",
      uploadDate: "2025-01-15",
      fileSize: "2.4 MB",
    },
    {
      id: 2,
      name: "TDC Threat Intel API",
      category: "Sikkerhed",
      description: "Threat intelligence API til sikkerhedsovervågning",
      fileType: "PDF",
      uploadDate: "2025-01-10",
      fileSize: "1.8 MB",
    },
    {
      id: 3,
      name: "TDC GDPR Referatservice",
      category: "Cloud Services",
      description: "GDPR-kompatibel dokumentation og referatservice",
      fileType: "PDF",
      uploadDate: "2025-01-08",
      fileSize: "3.2 MB",
    },
    {
      id: 4,
      name: "TDC 5G Erhvervsløsning",
      category: "Netværk",
      description: "5G netværksløsninger til erhvervskunder",
      fileType: "PDF",
      uploadDate: "2025-01-05",
      fileSize: "4.1 MB",
    },
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen" style={{ background: 'var(--gradient-hero)' }}>
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

        {/* Upload Section */}
        <Card className="mb-8 bg-card border-0 transition-all duration-300 hover:scale-[1.02]" style={{ boxShadow: 'var(--shadow-card)' }}>
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-card-foreground mb-2 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-primary" />
                  Upload Produktinformation
                </h3>
                <p className="text-muted-foreground mb-4">
                  Tilføj produktspecifikationer, datasheets, bruger guider og anden relevant dokumentation
                </p>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90" style={{ boxShadow: 'var(--shadow-button)' }}>
                  <Upload className="w-4 h-4 mr-2" />
                  Vælg filer
                </Button>
              </div>
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-lg border-2 border-dashed border-primary/30 flex items-center justify-center bg-accent/10">
                  <Folder className="w-12 h-12 text-primary/60" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

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
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                        <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive hover:bg-destructive/10">
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
