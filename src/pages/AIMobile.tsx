import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Mail, 
  Globe, 
  UtensilsCrossed, 
  Dumbbell, 
  ShoppingBag, 
  Music, 
  GraduationCap,
  Car,
  MessageSquare,
  Smartphone
} from "lucide-react";
import aiPhoneHero from "@/assets/ai-phone-hero.jpg";

const features = [
  {
    icon: MessageSquare,
    title: "Personlig Sekretær",
    description: "Opretter kalenderposter, skriver emails og opsummerer indhold"
  },
  {
    icon: Globe,
    title: "Sprogexpert",
    description: "Oversætter menuer, dokumenter og hjælper i samtaler"
  },
  {
    icon: Car,
    title: "Rejsebureau",
    description: "Planlægger rejseruter, fungerer som byguide og booker restauranter"
  },
  {
    icon: UtensilsCrossed,
    title: "Ernæringsvejleder",
    description: "Giver madlavningstips, lister ingredienser og laver træningsplaner"
  },
  {
    icon: Dumbbell,
    title: "Personlig Træner",
    description: "Leverer skræddersyede trænings- og ernæringsplaner"
  },
  {
    icon: ShoppingBag,
    title: "Shopping Ekspert",
    description: "Anbefaler produkter, finder tilbud og gaver"
  },
  {
    icon: Music,
    title: "Underholdning",
    description: "Finder koncerter, bøger og film der matcher din smag"
  },
  {
    icon: GraduationCap,
    title: "Tutor",
    description: "Løser matematikopgaver og forklarer komplicerede emner"
  }
];

const AIMobile = () => {
  return (
    <div className="min-h-screen gradient-bg flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold">
                TDC AI Mobile
              </h1>
              <p className="text-2xl text-white/90">
                AI for alle. Ikke kun til tech-nørder.
              </p>
              <p className="text-xl text-white/80">
                Med TDC AI Mobile åbner vi døren til kunstig intelligens for alle vores kunder. 
                Din personlige AI-assistent er altid klar til at hjælpe med dagligdagens opgaver.
              </p>
              
              {/* Pricing Card */}
              <div className="glass-effect rounded-2xl p-6 space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold">1 kr</span>
                  <span className="text-xl text-white/80">med abonnement</span>
                </div>
                <div className="text-white/80">
                  <p>• Telefon: 149 kr (uden abonnement)</p>
                  <p>• Tablet: 199 kr (uden abonnement)</p>
                  <p>• Inkluderer 18 måneders Perplexity Pro</p>
                </div>
                <Button className="w-full bg-white text-primary hover:bg-white/90 text-lg py-6">
                  Bestil nu
                </Button>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="relative">
              <div className="relative z-10">
                <img 
                  src={aiPhoneHero} 
                  alt="TDC AI Mobile" 
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
              {/* Decorative blur circles */}
              <div className="absolute top-1/4 -left-20 w-64 h-64 bg-primary/30 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-primary-light/30 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Din AI-assistent til alt
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Tryk bare på den blå knap, og din AI-assistent er klar til at hjælpe. 
              Stil spørgsmål med stemme eller tekst.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div 
                key={idx}
                className="glass-effect rounded-2xl p-6 hover:bg-white/20 transition-all duration-300"
              >
                <feature.icon className="w-12 h-12 text-white mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/80">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">
            Sådan virker det
          </h2>
          
          <div className="space-y-8">
            <div className="glass-effect rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl">
                  1
                </div>
                <h3 className="text-2xl font-bold text-white">Tryk på den blå knap</h3>
              </div>
              <p className="text-white/80 text-left">
                Dobbeltklik på tænd/sluk-knappen eller tryk på den blå knap på låseskærmen
              </p>
            </div>

            <div className="glass-effect rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl">
                  2
                </div>
                <h3 className="text-2xl font-bold text-white">Stil dit spørgsmål</h3>
              </div>
              <p className="text-white/80 text-left">
                Brug stemme eller tekst til at stille dit spørgsmål eller give en opgave
              </p>
            </div>

            <div className="glass-effect rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl">
                  3
                </div>
                <h3 className="text-2xl font-bold text-white">Få hjælp med det samme</h3>
              </div>
              <p className="text-white/80 text-left">
                AI-assistenten giver dig pålidelig information og udfører opgaver for dig
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="glass-effect rounded-2xl p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-white">
                  Bæredygtighed i fokus
                </h2>
                <p className="text-xl text-white/80">
                  TDC AI Mobile har modtaget #GreenMagenta mærket og en fremragende score 
                  på 90/100 i Eco Rating for smartphones.
                </p>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/50 flex items-center justify-center mt-1">✓</div>
                    <span>75% af bagsiden består af genbrugt plastik</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/50 flex items-center justify-center mt-1">✓</div>
                    <span>Hurtig opladning med opdateret chipset</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/50 flex items-center justify-center mt-1">✓</div>
                    <span>Designet til lang levetid og reparerbarhed</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex justify-center">
                <Smartphone className="w-64 h-64 text-white/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Klar til at opleve AI?
          </h2>
          <p className="text-xl text-white/80">
            Få din TDC AI Mobile i dag og oplev fremtidens teknologi
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-primary hover:bg-white/90 text-lg py-6 px-8">
              Bestil nu
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white/10 text-lg py-6 px-8"
            >
              Læs mere
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIMobile;
