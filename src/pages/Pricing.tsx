import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Building, Crown } from "lucide-react";
import Navigation from "@/components/Navigation";

const Pricing = () => {
  const plans = [
    {
      name: "Gratis",
      icon: Zap,
      price: "0 kr",
      period: "pr. måned",
      description: "Opdag hvad TDC AI kan gøre for dig",
      badge: "Gratis for evigt",
      buttonText: "Kom i gang",
      buttonVariant: "outline" as const,
      features: [
        "5 daglige credits (op til 30/måned)",
        "Offentlige projekter",
        "Ubegrænset samarbejdspartnere",
        "Community support"
      ]
    },
    {
      name: "Pro",
      icon: Building,
      price: "199 kr",
      period: "pr. måned",
      description: "Designet til hurtige teams der bygger sammen i realtid.",
      badge: "Mest Populær",
      buttonText: "Kom i gang",
      buttonVariant: "default" as const,
      features: [
        "100 månedlige credits",
        "5 daglige credits (op til 150/måned)",
        "Private projekter",
        "Brugerroller & tilladelser",
        "Tilpassede domæner",
        "Fjern TDC AI badge",
        "Credit overførsler"
      ]
    },
    {
      name: "Business",
      icon: Crown,
      price: "399 kr",
      period: "pr. måned", 
      description: "Avanceret kontrol og kraftfulde funktioner til voksende afdelinger",
      badge: "Enterprise Klar",
      buttonText: "Kom i gang",
      buttonVariant: "outline" as const,
      features: [
        "200 månedlige credits",
        "SSO integration",
        "Personlige Projekter",
        "Fravælg data træning",
        "Design skabeloner",
        "Prioriteret support",
        "Avanceret analyse"
      ]
    }
  ];

  const faqs = [
    {
      question: "Hvad er TDC AI og hvordan virker det?",
      answer: "TDC AI er en AI-drevet udviklingsplatform der lader dig skabe applikationer ved at chatte med AI. Beskriv blot hvad du vil bygge, og vores AI genererer koden for dig."
    },
    {
      question: "Hvad inkluderer gratis planen?",
      answer: "Gratis planen inkluderer 5 daglige credits (op til 30 pr. måned), offentlige projekter, ubegrænset samarbejdspartnere og community support. Perfekt til at prøve TDC AI."
    },
    {
      question: "Hvad er en credit?",
      answer: "En credit bruges hver gang du sender en besked til AI'en. Simple ændringer bruger 1 credit, mens komplekse funktioner kan bruge flere credits."
    },
    {
      question: "Kan jeg opgradere eller nedgradere min plan?",
      answer: "Ja, du kan opgradere eller nedgradere din plan når som helst. Ændringer træder i kraft i din næste faktureringsperiode."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section - TDC Style */}
      <div className="relative overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            Enkel, Transparent Prissætning
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-8">
            Start gratis. Opgradér for at få præcis den kapacitet dit team har brug for.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">

        {/* Pricing Cards - TDC Style */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 -mt-20">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative bg-card border-0 transition-all duration-300 hover:scale-[1.02] flex flex-col h-full ${
                plan.name === 'Pro' ? 'ring-2 ring-primary md:-mt-4' : ''
              }`}
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge 
                    variant={plan.name === 'Pro' ? 'default' : 'secondary'}
                    className={plan.name === 'Pro' ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'}
                  >
                    {plan.badge}
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-6 pt-8">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-primary/10">
                  <plan.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold text-card-foreground mb-3">{plan.name}</CardTitle>
                <p className="text-muted-foreground text-sm mb-4 min-h-[3rem]">{plan.description}</p>
                <div className="mt-4">
                  <span className="text-5xl font-bold text-card-foreground">{plan.price}</span>
                  <span className="text-muted-foreground ml-2 text-lg">{plan.period}</span>
                </div>
              </CardHeader>
              
              <CardContent className="px-6 pb-8 flex-1 flex flex-col">
                <Button 
                  className={`w-full mb-8 text-lg py-6 ${
                    plan.buttonVariant === 'default' 
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                      : 'bg-card border-2 border-primary/20 hover:bg-accent text-card-foreground'
                  }`}
                  variant={plan.buttonVariant}
                  size="lg"
                  style={{ boxShadow: 'var(--shadow-button)' }}
                >
                  {plan.buttonText}
                </Button>
                
                <ul className="space-y-4 flex-1">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enterprise - TDC Style */}
        <Card className="border-0 mb-16 bg-accent" style={{ boxShadow: 'var(--shadow-card)' }}>
          <CardContent className="p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <Crown className="w-10 h-10 text-primary" />
                  <h3 className="text-3xl font-bold text-accent-foreground">Enterprise</h3>
                </div>
                <p className="text-accent-foreground/90 mb-6 text-lg">
                  Bygget til store organisationer der har brug for fleksibilitet, skalering og governance.
                </p>
                <ul className="text-accent-foreground/80 space-y-3">
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary" />
                    Dedikeret support & onboarding
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary" />
                    Tilpassede forbindelser & integrationer
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary" />
                    Gruppebaseret adgangskontrol
                  </li>
                </ul>
              </div>
              <div className="text-center bg-card rounded-xl p-8" style={{ boxShadow: 'var(--shadow-card)' }}>
                <div className="text-3xl font-bold text-card-foreground mb-4">Tilpasset prissætning</div>
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6">
                  Book en Demo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ - TDC Style */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-foreground mb-12">
            Ofte Stillede Spørgsmål
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card 
                key={index} 
                className="border-0 bg-card transition-all duration-300 hover:scale-[1.02]"
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-card-foreground mb-4">{faq.question}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;