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
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <Navigation />
      
      {/* Hero Section - TDC Style */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[hsl(210,100%,25%)] via-[hsl(210,100%,35%)] to-[hsl(210,100%,45%)]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4wNSIvPjwvZz48L3N2Zz4=')] opacity-30"></div>
        <div className="container mx-auto px-4 py-24 md:py-32 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Enkel, Transparent Prissætning
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Start gratis. Opgradér for at få præcis den kapacitet dit team har brug for.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">

        {/* Pricing Cards - TDC Style */}
        <div className="grid md:grid-cols-3 gap-8 mb-20 -mt-32">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative bg-white dark:bg-card border border-border/50 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl flex flex-col h-full ${
                plan.name === 'Pro' ? 'ring-2 ring-primary shadow-2xl md:-mt-4 md:scale-[1.05]' : 'shadow-lg'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge 
                    variant={plan.name === 'Pro' ? 'default' : 'secondary'}
                    className={`${
                      plan.name === 'Pro' 
                        ? 'bg-primary text-primary-foreground shadow-lg' 
                        : 'bg-secondary text-secondary-foreground'
                    } px-4 py-1 text-sm font-semibold`}
                  >
                    {plan.badge}
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-6 pt-10">
                <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
                  <plan.icon className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold text-foreground mb-4">{plan.name}</CardTitle>
                <p className="text-muted-foreground text-base mb-6 min-h-[3.5rem] leading-relaxed px-2">{plan.description}</p>
                <div className="mt-2">
                  <span className="text-6xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground ml-2 text-lg block mt-1">{plan.period}</span>
                </div>
              </CardHeader>
              
              <CardContent className="px-8 pb-10 flex-1 flex flex-col">
                <Button 
                  className={`w-full mb-8 text-base py-6 font-semibold shadow-md transition-all duration-200 ${
                    plan.buttonVariant === 'default' 
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg' 
                      : 'bg-background border-2 border-primary/30 hover:bg-primary/5 text-foreground hover:border-primary/50'
                  }`}
                  variant={plan.buttonVariant}
                  size="lg"
                >
                  {plan.buttonText}
                </Button>
                
                <ul className="space-y-4 flex-1">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5 border border-primary/20">
                        <Check className="w-4 h-4 text-primary font-bold" />
                      </div>
                      <span className="text-sm text-foreground/80 leading-relaxed font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enterprise - TDC Style */}
        <Card className="border border-border/50 mb-20 bg-gradient-to-br from-muted/50 to-muted shadow-xl">
          <CardContent className="p-8 md:p-14">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Crown className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-4xl font-bold text-foreground">Enterprise</h3>
                </div>
                <p className="text-foreground/80 mb-8 text-lg leading-relaxed">
                  Bygget til store organisationer der har brug for fleksibilitet, skalering og governance.
                </p>
                <ul className="text-foreground/70 space-y-4">
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center border border-primary/20">
                      <Check className="w-4 h-4 text-primary font-bold" />
                    </div>
                    <span className="font-medium">Dedikeret support & onboarding</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center border border-primary/20">
                      <Check className="w-4 h-4 text-primary font-bold" />
                    </div>
                    <span className="font-medium">Tilpassede forbindelser & integrationer</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center border border-primary/20">
                      <Check className="w-4 h-4 text-primary font-bold" />
                    </div>
                    <span className="font-medium">Gruppebaseret adgangskontrol</span>
                  </li>
                </ul>
              </div>
              <div className="text-center bg-white dark:bg-card rounded-2xl p-10 shadow-xl border border-border/50">
                <div className="text-4xl font-bold text-foreground mb-6">Tilpasset prissætning</div>
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-10 py-7 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold">
                  Book en Demo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ - TDC Style */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-16">
            Ofte Stillede Spørgsmål
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card 
                key={index} 
                className="border border-border/50 bg-white dark:bg-card transition-all duration-300 hover:scale-[1.02] hover:shadow-xl shadow-md"
              >
                <CardContent className="p-8 md:p-10">
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4 leading-tight">{faq.question}</h3>
                  <p className="text-muted-foreground text-base leading-relaxed">{faq.answer}</p>
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