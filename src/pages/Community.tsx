import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, Rocket, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const Community = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const heroSlides = [
    {
      title: "Byg med TDC Trusted Digital Community",
      subtitle: "TRUSTED DIGITAL COMMUNITY",
      description: "Bliv en del af tusindvis af udviklere der skaber fantastiske applikationer med AI-drevet udvikling",
      buttonText: "Deltag i Community"
    },
    {
      title: "Samarbejd & Innovér Sammen",
      subtitle: "SAMARBEJDSBASERET UDVIKLING",
      description: "Arbejd sammen med udviklere verden over for at skabe banebrydende løsninger",
      buttonText: "Start med at bygge"
    },
    {
      title: "Lancer Dine Idéer Hurtigere",
      subtitle: "HURTIG UDVIKLING",
      description: "Brug AI-drevne værktøjer til at realisere din vision på rekordtid",
      buttonText: "Kom i gang"
    }
  ];
  const stats = [
    { label: "Aktive Udviklere", value: "25.000+", icon: Users },
    { label: "Projekter Skabt", value: "500k+", icon: Rocket },
    { label: "Community Stjerner", value: "150k+", icon: Star },
    { label: "Månedlig Vækst", value: "40%", icon: TrendingUp },
  ];

  const featuredProjects = [
    {
      title: "E-handel Dashboard",
      category: "Erhverv",
      author: "Alex Chen",
      remixes: "12,5k",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    },
    {
      title: "Sociale Medier Analyse",
      category: "Analyse", 
      author: "Sarah Wilson",
      remixes: "8,2k",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    },
    {
      title: "Projektstyring Værktøj",
      category: "Produktivitet",
      author: "Mike Johnson", 
      remixes: "15,3k",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Carousel - TDC Style */}
      <div className="relative text-white overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent"></div>
        
        {/* Embla Carousel */}
        <div className="overflow-hidden relative" ref={emblaRef}>
          <div className="flex">
            {heroSlides.map((slide, index) => (
              <div key={index} className="flex-[0_0_100%] min-w-0">
                <div className="container mx-auto px-4 py-24 relative z-10">
                  <div className="text-center max-w-4xl mx-auto">
                    <p className="text-sm uppercase tracking-wider mb-4 text-primary-foreground/90">
                      {slide.subtitle}
                    </p>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                      {slide.title}
                    </h1>
                    <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-8">
                      {slide.description}
                    </p>
                    <Button size="lg" className="bg-card text-card-foreground hover:bg-card/90" style={{ boxShadow: 'var(--shadow-button)' }}>
                      {slide.buttonText}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={scrollPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors flex items-center justify-center"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors flex items-center justify-center"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots Navigation */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === selectedIndex 
                  ? "bg-white w-8" 
                  : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Stats Section - Blue Background */}
      <div className="py-16" style={{ background: 'var(--gradient-primary)' }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-primary-foreground">
                <stat.icon className="w-8 h-8 mx-auto mb-3 opacity-90" />
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">

        {/* Featured Projects - Card Style */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-card-foreground">Fremhævede Projekter</h2>
            <Button variant="outline" className="border-border hover:bg-accent">
              Se Alle
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <div key={index} className="group bg-card rounded-lg overflow-hidden transition-all duration-300" style={{ boxShadow: 'var(--shadow-card)' }}>
                <div className="aspect-video bg-muted overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20">{project.category}</Badge>
                    <span className="text-sm text-muted-foreground">{project.remixes} remixes</span>
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground mb-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm">af {project.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Features - Blue Card Style */}
        <div className="bg-accent rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-accent-foreground mb-12 text-center">Hvorfor Deltage i TDC AI Community?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-8 transition-all duration-300 hover:scale-105" style={{ boxShadow: 'var(--shadow-card)' }}>
              <Users className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-card-foreground">Samarbejdsbaseret Udvikling</h3>
              <p className="text-muted-foreground">Arbejd sammen med udviklere verden over for at skabe fantastiske applikationer</p>
            </div>
            <div className="bg-card rounded-lg p-8 transition-all duration-300 hover:scale-105" style={{ boxShadow: 'var(--shadow-card)' }}>
              <Rocket className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-card-foreground">Lancer Hurtigere</h3>
              <p className="text-muted-foreground">Brug community skabeloner og komponenter til at accelerere din udvikling</p>
            </div>
            <div className="bg-card rounded-lg p-8 transition-all duration-300 hover:scale-105" style={{ boxShadow: 'var(--shadow-card)' }}>
              <TrendingUp className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-card-foreground">Lær & Voks</h3>
              <p className="text-muted-foreground">Del viden og lær fra de bedste udviklere i community</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;