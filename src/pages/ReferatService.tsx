import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Video, FileText, Clock, Shield } from "lucide-react";

const ReferatService = () => {
  const features = [
    "Automatisk transskription af møder",
    "AI-genererede referat og action points",
    "Integration med Teams og Google Meet",
    "GDPR-compliant databehandling",
    "Dansk sprog support",
    "Søgbar mødehistorik"
  ];

  const plans = [
    {
      name: "Basis",
      price: "299",
      period: "pr. bruger/måned",
      features: [
        "Op til 10 timer/måned",
        "Automatisk transskription",
        "Basis referat-generering",
        "30 dages historik"
      ]
    },
    {
      name: "Professional",
      price: "599",
      period: "pr. bruger/måned",
      popular: true,
      features: [
        "Ubegrænsede timer",
        "Avanceret AI-analyse",
        "Custom action points",
        "1 års historik",
        "Prioriteret support"
      ]
    },
    {
      name: "Enterprise",
      price: "Kontakt os",
      period: "skræddersyet løsning",
      features: [
        "Ubegrænsede brugere",
        "Dedikeret infrastruktur",
        "On-premise mulighed",
        "SLA garanti",
        "Dedikeret account manager"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(230,45%,12%)] via-[hsl(220,50%,18%)] to-[hsl(210,55%,15%)]">
      <Navigation />
      
      <main className="container mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-tdc-digital-blue/20 px-4 py-2 rounded-full mb-6">
            <Shield className="w-4 h-4 text-tdc-digital-blue" />
            <span className="text-sm text-white/90">100% GDPR-compliant</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            TDC Referatservice
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            AI-drevet mødeassistent der automatisk transskriberer, analyserer og genererer 
            professionelle referat fra alle dine virtuelle møder
          </p>
          
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-tdc-digital-blue hover:bg-tdc-digital-blue/90">
              Start gratis prøveperiode
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
              Book demo
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="bg-white/5 border-white/10 backdrop-blur">
            <CardHeader>
              <Video className="w-12 h-12 text-tdc-digital-blue mb-4" />
              <CardTitle className="text-white">Live Transskription</CardTitle>
              <CardDescription className="text-white/70">
                Realtids transskription under mødet med høj nøjagtighed
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur">
            <CardHeader>
              <FileText className="w-12 h-12 text-tdc-digital-blue mb-4" />
              <CardTitle className="text-white">Intelligent Referat</CardTitle>
              <CardDescription className="text-white/70">
                AI genererer strukturerede referat med action points
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur">
            <CardHeader>
              <Clock className="w-12 h-12 text-tdc-digital-blue mb-4" />
              <CardTitle className="text-white">Spar Tid</CardTitle>
              <CardDescription className="text-white/70">
                Reducer administrativt arbejde med op til 80%
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Key Features */}
        <div className="bg-white/5 backdrop-blur rounded-2xl p-8 mb-16 border border-white/10">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Alt du behøver i én løsning
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-tdc-digital-blue/20 flex items-center justify-center">
                  <Check className="w-4 h-4 text-tdc-digital-blue" />
                </div>
                <span className="text-white/90">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Meetly Integration Section */}
        <div className="bg-gradient-to-r from-tdc-digital-blue/10 to-purple-500/10 rounded-2xl p-8 mb-16 border border-tdc-digital-blue/20">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white mb-4">
                Powered by Meetly
              </h2>
              <p className="text-white/80 mb-4">
                Vores løsning er bygget på den open-source Meetly platform, 
                hvilket sikrer transparens, sikkerhed og fuld kontrol over dine data.
              </p>
              <p className="text-white/70 text-sm">
                Meetly er en pålidelig video conferencing platform der bruges af 
                tusindvis af virksomheder verden over.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Button variant="outline" className="border-tdc-digital-blue text-white hover:bg-tdc-digital-blue/20">
                Læs mere om Meetly →
              </Button>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white text-center mb-4">
            Vælg din plan
          </h2>
          <p className="text-white/70 text-center mb-12">
            Start med 14 dages gratis prøveperiode - ingen kreditkort påkrævet
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`${
                  plan.popular 
                    ? 'bg-tdc-digital-blue/10 border-tdc-digital-blue scale-105' 
                    : 'bg-white/5 border-white/10'
                } backdrop-blur relative`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-tdc-digital-blue px-4 py-1 rounded-full text-sm font-medium">
                    Mest populær
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-white text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    {plan.price !== "Kontakt os" && <span className="text-white/70"> kr</span>}
                    <p className="text-white/60 text-sm mt-1">{plan.period}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-tdc-digital-blue flex-shrink-0 mt-0.5" />
                        <span className="text-white/80 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-tdc-digital-blue hover:bg-tdc-digital-blue/90' 
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    {plan.price === "Kontakt os" ? "Kontakt salg" : "Start gratis prøveperiode"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-tdc-digital-blue/20 to-purple-500/20 rounded-2xl p-12 border border-tdc-digital-blue/30">
          <h2 className="text-3xl font-bold text-white mb-4">
            Klar til at transformere dine møder?
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Få adgang til AI-drevet mødeassistent med fuld GDPR-compliance og dansk support
          </p>
          <Button size="lg" className="bg-white text-primary hover:bg-white/90">
            Kom i gang i dag
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ReferatService;
