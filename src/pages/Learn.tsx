import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Video, Code, Lightbulb, GraduationCap, Rocket } from "lucide-react";

const Learn = () => {
  const categories = [
    { 
      name: "Kom i gang", 
      description: "Grundlæggende introduktion til TDC AI platform",
      icon: Rocket,
      count: "12 guider"
    },
    { 
      name: "AI Udvikling", 
      description: "Lær at bygge intelligente løsninger",
      icon: Lightbulb,
      count: "28 tutorials"
    },
    { 
      name: "Best Practices", 
      description: "Bedste fremgangsmåder og design patterns",
      icon: GraduationCap,
      count: "15 artikler"
    },
    { 
      name: "Avanceret", 
      description: "Dyk ned i komplekse enterprise-løsninger",
      icon: Code,
      count: "8 moduler"
    },
  ];

  const learningPaths = [
    {
      title: "AI-Drevet Udvikling",
      description: "Fra grundlæggende koncepter til produktion-klar implementering af AI-løsninger",
      modules: 8,
      duration: "6 timer",
      level: "Begynder til Mellemliggende",
      topics: ["AI Fundamentals", "Model Integration", "Prompt Engineering", "Production Deploy"]
    },
    {
      title: "Enterprise Integration",
      description: "Integrer TDC AI i eksisterende virksomhedssystemer og workflows",
      modules: 12,
      duration: "10 timer",
      level: "Mellemliggende til Avanceret",
      topics: ["System Architecture", "API Integration", "Security & Compliance", "Scaling"]
    },
    {
      title: "Compliance & Sikkerhed",
      description: "GDPR-compliant AI-løsninger med indbygget sikkerhed og datakontrol",
      modules: 6,
      duration: "4 timer",
      level: "Alle niveauer",
      topics: ["GDPR Basics", "Data Protection", "Audit Trails", "Encryption"]
    }
  ];

  const resources = [
    {
      title: "Dokumentation",
      description: "Komplet API reference og teknisk dokumentation",
      icon: BookOpen,
      link: "#"
    },
    {
      title: "Video Bibliotek", 
      description: "Step-by-step video tutorials og webinarer",
      icon: Video,
      link: "#"
    },
    {
      title: "Kode Eksempler",
      description: "Production-ready kode snippets og templates", 
      icon: Code,
      link: "#"
    },
    {
      title: "Certificering",
      description: "Bliv certificeret TDC AI developer",
      icon: GraduationCap,
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen gradient-bg flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(210,100%,50%)]/10 to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Lær at Bygge Fremtidens AI-Løsninger
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Komplet træningsprogram for TDC AI platformen. Fra begynder til enterprise-ekspert.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-white text-[hsl(230,45%,12%)] hover:bg-white/90 font-medium px-8">
                Start læring
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Se video intro
              </Button>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {categories.map((category, index) => (
              <Card key={index} className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all cursor-pointer group">
                <CardContent className="p-6">
                  <category.icon className="w-10 h-10 text-[hsl(210,100%,60%)] mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold text-white mb-2">{category.name}</h3>
                  <p className="text-white/70 text-sm mb-3">{category.description}</p>
                  <p className="text-white/50 text-xs">{category.count}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-16 px-6 bg-gradient-to-b from-transparent to-[hsl(230,45%,15%)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Læringsforløb</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Strukturerede forløb designet til at tage dig fra nybegynder til ekspert
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {learningPaths.map((path, index) => (
              <Card key={index} className="bg-[hsl(230,45%,15%)] border-white/10 hover:border-[hsl(210,100%,60%)]/50 transition-all cursor-pointer">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-[hsl(210,100%,50%)]/10 rounded-lg p-3">
                      <GraduationCap className="w-6 h-6 text-[hsl(210,100%,60%)]" />
                    </div>
                    <span className="text-xs text-white/50 bg-white/5 px-3 py-1 rounded-full">{path.level}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">{path.title}</h3>
                  <p className="text-white/70 text-sm mb-6">{path.description}</p>
                  
                  <div className="flex gap-4 text-sm text-white/60 mb-6">
                    <span>{path.modules} moduler</span>
                    <span>•</span>
                    <span>{path.duration}</span>
                  </div>

                  <div className="space-y-2 mb-6">
                    <p className="text-xs text-white/50 font-medium">EMNER</p>
                    <div className="flex flex-wrap gap-2">
                      {path.topics.map((topic, idx) => (
                        <span key={idx} className="text-xs bg-white/5 text-white/70 px-2 py-1 rounded">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-[hsl(210,100%,50%)] hover:bg-[hsl(210,100%,60%)] text-white">
                    Start forløb
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 px-6 bg-[hsl(230,45%,15%)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Læringsressourcer</h2>
            <p className="text-white/70 text-lg">Alt du behøver for at mestre TDC AI platformen</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, index) => (
              <Card key={index} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all cursor-pointer group">
                <CardContent className="p-8 text-center">
                  <div className="bg-[hsl(210,100%,50%)]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <resource.icon className="w-8 h-8 text-[hsl(210,100%,60%)]" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{resource.title}</h3>
                  <p className="text-white/70 text-sm">{resource.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-t from-[hsl(210,100%,50%)]/10 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Klar til at komme i gang?</h2>
          <p className="text-xl text-white/70 mb-8">
            Bliv en del af TDC's AI-community og lær at bygge næste generations enterprise-løsninger
          </p>
          <Button size="lg" className="bg-white text-[hsl(230,45%,12%)] hover:bg-white/90 font-medium px-12">
            Start i dag
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Learn;