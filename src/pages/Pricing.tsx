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
    <div className="min-h-screen bg-[#001E3C]">
      <Navigation />
      
      {/* Hero Section - TDC Style */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#001E3C] via-[#002A50] to-[#003D73]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4wNSIvPjwvZz48L3N2Zz4=')] opacity-20"></div>
        <div className="container mx-auto px-4 py-20 md:py-28 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Enkel, Transparent Prissætning
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Start gratis. Opgradér for at få præcis den kapacitet dit team har brug for.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">

        {/* Pricing Cards - TDC Style */}
        <div className="grid md:grid-cols-3 gap-6 mb-16 -mt-20">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative bg-white border-0 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl flex flex-col h-full ${
                plan.name === 'Pro' ? 'ring-2 ring-[#0051C3] shadow-2xl md:-mt-4 md:scale-[1.04]' : 'shadow-lg'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge 
                    className={`${
                      plan.name === 'Pro' 
                        ? 'bg-[#0051C3] text-white shadow-md' 
                        : 'bg-gray-100 text-gray-700'
                    } px-3 py-1 text-xs font-semibold rounded-full`}
                  >
                    {plan.badge}
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4 pt-8">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-xl bg-[#0051C3]/10">
                  <plan.icon className="w-8 h-8 text-[#0051C3]" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 mb-3">{plan.name}</CardTitle>
                <p className="text-gray-600 text-sm mb-4 min-h-[3rem] leading-relaxed px-2">{plan.description}</p>
                <div className="mt-2">
                  <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500 ml-2 text-base block mt-1">{plan.period}</span>
                </div>
              </CardHeader>
              
              <CardContent className="px-6 pb-8 flex-1 flex flex-col">
                <Button 
                  className={`w-full mb-6 text-sm py-5 font-semibold rounded-lg transition-all duration-200 ${
                    plan.buttonVariant === 'default' 
                      ? 'bg-[#0051C3] text-white hover:bg-[#003D96] shadow-md hover:shadow-lg' 
                      : 'bg-white border-2 border-gray-200 hover:bg-gray-50 text-gray-900 hover:border-gray-300'
                  }`}
                  variant={plan.buttonVariant}
                >
                  {plan.buttonText}
                </Button>
                
                <ul className="space-y-3 flex-1">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#0051C3]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#0051C3] font-bold" />
                      </div>
                      <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enterprise - TDC Style */}
        <Card className="border-0 mb-16 bg-white shadow-lg">
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-[#0051C3]/10 flex items-center justify-center">
                    <Crown className="w-7 h-7 text-[#0051C3]" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">Enterprise</h3>
                </div>
                <p className="text-gray-600 mb-6 text-base leading-relaxed">
                  Bygget til store organisationer der har brug for fleksibilitet, skalering og governance.
                </p>
                <ul className="text-gray-700 space-y-3">
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#0051C3]/10 flex items-center justify-center">
                      <Check className="w-3 h-3 text-[#0051C3] font-bold" />
                    </div>
                    <span className="text-sm">Dedikeret support & onboarding</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#0051C3]/10 flex items-center justify-center">
                      <Check className="w-3 h-3 text-[#0051C3] font-bold" />
                    </div>
                    <span className="text-sm">Tilpassede forbindelser & integrationer</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#0051C3]/10 flex items-center justify-center">
                      <Check className="w-3 h-3 text-[#0051C3] font-bold" />
                    </div>
                    <span className="text-sm">Gruppebaseret adgangskontrol</span>
                  </li>
                </ul>
              </div>
              <div className="text-center bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 shadow-md border border-gray-100">
                <div className="text-3xl font-bold text-gray-900 mb-5">Tilpasset prissætning</div>
                <Button className="bg-[#0051C3] text-white hover:bg-[#003D96] text-sm px-8 py-5 shadow-md hover:shadow-lg transition-all duration-200 font-semibold rounded-lg">
                  Book en Demo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ - TDC Style */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            Ofte Stillede Spørgsmål
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card 
                key={index} 
                className="border-0 bg-white transition-all duration-300 hover:shadow-lg shadow-md"
              >
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 leading-tight">{faq.question}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
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