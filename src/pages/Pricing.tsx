import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Building, Crown } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      icon: Zap,
      price: "$0",
      period: "per month",
      description: "Discover what TDC AI can do for you",
      badge: "Free forever",
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
      features: [
        "5 daily credits (up to 30/month)",
        "Public projects",
        "Unlimited collaborators",
        "Community support"
      ]
    },
    {
      name: "Pro",
      icon: Building,
      price: "$25",
      period: "per month",
      description: "Designed for fast-moving teams building together in real time.",
      badge: "Most Popular",
      buttonText: "Get Started",
      buttonVariant: "default" as const,
      features: [
        "100 monthly credits",
        "5 daily credits (up to 150/month)",
        "Private projects",
        "User roles & permissions",
        "Custom domains",
        "Remove TDC AI badge",
        "Credit rollovers"
      ]
    },
    {
      name: "Business",
      icon: Crown,
      price: "$50",
      period: "per month", 
      description: "Advanced controls and power features for growing departments",
      badge: "Enterprise Ready",
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
      features: [
        "200 monthly credits",
        "SSO integration",
        "Personal Projects",
        "Opt out of data training",
        "Design templates",
        "Priority support",
        "Advanced analytics"
      ]
    }
  ];

  const faqs = [
    {
      question: "What is TDC AI and how does it work?",
      answer: "TDC AI is an AI-powered development platform that lets you create applications by chatting with AI. Simply describe what you want to build, and our AI will generate the code for you."
    },
    {
      question: "What does the free plan include?",
      answer: "The free plan includes 5 daily credits (up to 30 per month), public projects, unlimited collaborators, and community support. Perfect for trying out TDC AI."
    },
    {
      question: "What is a credit?",
      answer: "A credit is used each time you send a message to the AI. Simple changes use 1 credit, while complex features may use more credits."
    },
    {
      question: "Can I upgrade or downgrade my plan?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Simple, Transparent <span className="text-primary">Pricing</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start for free. Upgrade to get the capacity that exactly matches your team's needs.
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
                  Built for large orgs needing flexibility, scale, and governance.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Dedicated support & onboarding</li>
                  <li>• Custom connections & integrations</li>
                  <li>• Group-based access control</li>
                </ul>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground mb-2">Custom pricing</div>
                <Button size="lg">Book a Demo</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Frequently Asked Questions
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