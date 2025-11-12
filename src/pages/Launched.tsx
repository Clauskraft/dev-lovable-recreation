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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Inside <span className="text-primary">Produktbibliotek</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Centralt bibliotek for al produktinformation. Upload, organiser og del produktdokumentation til AI-chatten.
          </p>
        </div>

        {/* Upload Section */}
        <Card className="mb-8 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-primary" />
                  Upload Produktinformation
                </h3>
                <p className="text-muted-foreground mb-4">
                  Tilføj produktspecifikationer, datasheets, bruger guider og anden relevant dokumentation
                </p>
                <Button className="bg-primary hover:bg-primary/90">
                  <Upload className="w-4 h-4 mr-2" />
                  Vælg filer
                </Button>
              </div>
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-lg border-2 border-dashed border-primary/50 flex items-center justify-center bg-background/50">
                  <Folder className="w-12 h-12 text-primary/50" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Kategorier</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-primary/10 transition-colors text-left"
                  >
                    <span className="text-sm font-medium">{category.name}</span>
                    <Badge variant="secondary" className="text-xs">
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
                  className="pl-10 border-primary/20"
                />
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="border-primary/20 hover:border-primary/40 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-primary" />
                        <Badge variant="secondary" className="text-xs">
                          {product.fileType}
                        </Badge>
                      </div>
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                        {product.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Uploadet:</span>
                        <span className="font-medium">{product.uploadDate}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Størrelse:</span>
                        <span className="font-medium">{product.fileSize}</span>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline" className="flex-1 border-primary/20">
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
                <FileText className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">Ingen produkter fundet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Launched;
