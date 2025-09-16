import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Rocket, TrendingUp, Award, Users } from "lucide-react";

const Launched = () => {
  const stats = [
    { label: "Apps Launched", value: "50,000+", icon: Rocket },
    { label: "Active Users", value: "2M+", icon: Users },
    { label: "Success Rate", value: "94%", icon: Award },
    { label: "Growth Rate", value: "+185%", icon: TrendingUp },
  ];

  const featuredApps = [
    {
      title: "TaskFlow Pro",
      description: "AI-powered project management platform used by 10,000+ teams",
      category: "Productivity",
      users: "125k",
      revenue: "$850k ARR",
      founder: "Sarah Chen",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop",
      link: "#"
    },
    {
      title: "EcoTrack",
      description: "Sustainability tracking app helping companies reduce carbon footprint",
      category: "Environment",
      users: "80k", 
      revenue: "$420k ARR",
      founder: "Marcus Johnson",
      image: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=800&h=400&fit=crop",
      link: "#"
    },
    {
      title: "HealthSync",
      description: "Personal health monitoring platform with AI insights",
      category: "Healthcare",
      users: "200k",
      revenue: "$1.2M ARR", 
      founder: "Dr. Emily Rodriguez",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
      link: "#"
    },
    {
      title: "LearnSpace",
      description: "Interactive learning platform for remote education",
      category: "Education",
      users: "300k",
      revenue: "$2.1M ARR",
      founder: "Alex Thompson", 
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=400&fit=crop",
      link: "#"
    },
    {
      title: "FinanceFlow", 
      description: "Small business accounting made simple with AI automation",
      category: "Finance",
      users: "45k",
      revenue: "$680k ARR",
      founder: "Lisa Park",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop", 
      link: "#"
    },
    {
      title: "CreativeHub",
      description: "Design collaboration platform for creative teams worldwide",
      category: "Design",
      users: "150k",
      revenue: "$950k ARR",
      founder: "David Kim",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=400&fit=crop",
      link: "#"
    }
  ];

  const testimonials = [
    {
      quote: "POWER:K helped me launch my SaaS in just 3 weeks. The AI understood exactly what I needed and built it faster than any developer could.",
      author: "Sarah Chen",
      title: "Founder, TaskFlow Pro",
      revenue: "$850k ARR"
    },
    {
      quote: "From idea to 100k users in 6 months. POWER:K made it possible to iterate quickly and focus on what matters - our customers.",
      author: "Dr. Emily Rodriguez", 
      title: "Founder, HealthSync",
      revenue: "$1.2M ARR"
    },
    {
      quote: "The speed of development is incredible. What used to take months now takes weeks, and the quality is consistently high.",
      author: "Alex Thompson",
      title: "Founder, LearnSpace", 
      revenue: "$2.1M ARR"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Apps Built and <span className="text-primary">Launched</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Real businesses built with POWER:K, generating real revenue and serving millions of users
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Launch Your App
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-primary/20">
              <CardContent className="p-6">
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Apps */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Success Stories</h2>
            <Button variant="outline" className="border-primary/20">
              View All
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredApps.map((app, index) => (
              <Card key={index} className="border-primary/20 hover:border-primary/40 transition-colors">
                <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                  <img 
                    src={app.image} 
                    alt={app.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{app.category}</Badge>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                  <CardTitle className="text-lg">{app.title}</CardTitle>
                  <p className="text-muted-foreground text-sm">{app.description}</p>
                  <div className="pt-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Users:</span>
                      <span className="font-medium">{app.users}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Revenue:</span>
                      <span className="font-medium text-primary">{app.revenue}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Founder:</span>
                      <span className="font-medium">{app.founder}</span>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">What Founders Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-primary/20">
                <CardContent className="p-6">
                  <blockquote className="text-muted-foreground mb-4 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-foreground">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                    <div className="text-sm text-primary font-medium">{testimonial.revenue}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Launch Your App?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of successful founders who've built and launched their apps with POWER:K. 
            Your idea could be the next success story.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Start Building Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Launched;