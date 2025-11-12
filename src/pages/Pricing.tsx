import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Building, Crown } from "lucide-react";

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
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Enkel, Transparent <span className="text-primary">Prissætning</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start gratis. Opgradér for at få præcis den kapacitet dit team har brug for.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative border-primary/20 ${plan.name === 'Pro' ? 'ring-2 ring-primary' : ''}`}>
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge variant={plan.name === 'Pro' ? 'default' : 'secondary'}>
                    {plan.badge}
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-primary/10">
                  <plan.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <p className="text-muted-foreground text-sm">{plan.description}</p>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">{plan.period}</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <Button 
                  className="w-full mb-6" 
                  variant={plan.buttonVariant}
                  size="lg"
                >
                  {plan.buttonText}
                </Button>
                
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enterprise */}
        <Card className="border-primary/20 mb-16">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Enterprise</h3>
                <p className="text-muted-foreground mb-4">
                  Bygget til store organisationer der har brug for fleksibilitet, skalering og governance.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Dedikeret support & onboarding</li>
                  <li>• Tilpassede forbindelser & integrationer</li>
                  <li>• Gruppebaseret adgangskontrol</li>
                </ul>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground mb-2">Tilpasset prissætning</div>
                <Button size="lg">Book en Demo</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Ofte Stillede Spørgsmål
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-primary/20">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
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