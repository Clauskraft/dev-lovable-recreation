import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Video, Code, Lightbulb, Clock, Users } from "lucide-react";

const Learn = () => {
  const categories = [
    { name: "Kom i gang", count: 12, icon: Lightbulb },
    { name: "Tutorials", count: 28, icon: Video },
    { name: "Best Practices", count: 15, icon: BookOpen },
    { name: "Avanceret", count: 8, icon: Code },
  ];

  const tutorials = [
    {
      title: "Din Første TDC AI App",
      description: "Lær hvordan du opretter din første applikation med AI-drevet udvikling",
      duration: "10 min",
      level: "Begynder",
      category: "Kom i gang",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
    },
    {
      title: "Byg et Dashboard",
      description: "Trin-for-trin guide til at oprette interaktive dashboards med smukke diagrammer",
      duration: "25 min", 
      level: "Mellemliggende",
      category: "Tutorials",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    },
    {
      title: "Database Integration",
      description: "Forbind din app til databaser og håndtér data effektivt",
      duration: "30 min",
      level: "Mellemliggende", 
      category: "Tutorials",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
    },
    {
      title: "AI Prompt Engineering",
      description: "Mestre kunsten at kommunikere med AI for at få de bedste resultater",
      duration: "15 min",
      level: "Begynder",
      category: "Best Practices",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    },
    {
      title: "Tilpassede Komponenter",
      description: "Byg genanvendelige komponenter og design systemer til dine projekter",
      duration: "35 min",
      level: "Avanceret",
      category: "Avanceret", 
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
    },
    {
      title: "Udrulningsguide",
      description: "Udrul dine applikationer til produktion med selvtillid",
      duration: "20 min",
      level: "Mellemliggende",
      category: "Tutorials",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
    },
  ];

  const resources = [
    {
      title: "Dokumentation",
      description: "Komplet referenceguide for alle TDC AI funktioner",
      icon: BookOpen,
      link: "#"
    },
    {
      title: "Video Kurser", 
      description: "Dybdegående video tutorials for visuelle lærere",
      icon: Video,
      link: "#"
    },
    {
      title: "Community Forum",
      description: "Få hjælp og del viden med andre udviklere",
      icon: Users,
      link: "#"
    },
    {
      title: "Kode Eksempler",
      description: "Klar-til-brug kode snippets og skabeloner", 
      icon: Code,
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Lær at Bygge med <span className="text-primary">KRAFT</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Mestre AI-drevet udvikling med vores omfattende tutorials og guider
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Start med at lære
          </Button>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {categories.map((category, index) => (
            <Card key={index} className="text-center border-primary/20 hover:border-primary/40 cursor-pointer transition-colors">
              <CardContent className="p-6">
                <category.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-1">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} lektioner</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Tutorials */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Fremhævede Tutorials</h2>
            <Button variant="outline" className="border-primary/20">
              Se Alle
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorials.map((tutorial, index) => (
              <Card key={index} className="border-primary/20 hover:border-primary/40 transition-colors cursor-pointer">
                <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                  <img 
                    src={tutorial.image} 
                    alt={tutorial.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{tutorial.category}</Badge>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {tutorial.duration}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                  <p className="text-muted-foreground text-sm">{tutorial.description}</p>
                  <div className="pt-2">
                    <Badge variant="outline">{tutorial.level}</Badge>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Learning Resources */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-8">Lærings Ressourcer</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, index) => (
              <Card key={index} className="border-primary/20 hover:border-primary/40 transition-colors cursor-pointer">
                <CardContent className="p-6 text-center">
                  <resource.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-3">{resource.title}</h3>
                  <p className="text-muted-foreground text-sm">{resource.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;