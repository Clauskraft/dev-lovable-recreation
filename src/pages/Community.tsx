import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, Rocket, Star } from "lucide-react";

const Community = () => {
  const stats = [
    { label: "Active Builders", value: "25,000+", icon: Users },
    { label: "Projects Created", value: "500k+", icon: Rocket },
    { label: "Community Stars", value: "150k+", icon: Star },
    { label: "Monthly Growth", value: "40%", icon: TrendingUp },
  ];

  const featuredProjects = [
    {
      title: "E-commerce Dashboard",
      category: "Business",
      author: "Alex Chen",
      remixes: "12.5k",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    },
    {
      title: "Social Media Analytics",
      category: "Analytics", 
      author: "Sarah Wilson",
      remixes: "8.2k",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    },
    {
      title: "Project Management Tool",
      category: "Productivity",
      author: "Mike Johnson", 
      remixes: "15.3k",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - TDC Style */}
      <div className="relative bg-[hsl(230,45%,12%)] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/10 to-transparent"></div>
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-sm uppercase tracking-wider mb-4 text-primary/80">
              TRUSTED DIGITAL COMMUNITY
            </p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Build with TDC Trusted Digital Community
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
              Join thousands of builders creating amazing applications with AI-powered development
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
              Join Community
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section - Blue Background */}
      <div className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <stat.icon className="w-8 h-8 mx-auto mb-3 opacity-80" />
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">

        {/* Featured Projects - Card Style */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Featured Projects</h2>
            <Button variant="outline" className="border-primary/20 hover:bg-primary/10">
              View All
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <div key={index} className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
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
                  <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm">by {project.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Features - Blue Card Style */}
        <div className="bg-primary/5 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Why Join TDC AI Community?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
              <Users className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Collaborative Building</h3>
              <p className="text-muted-foreground">Work together with developers worldwide to create amazing applications</p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
              <Rocket className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Launch Faster</h3>
              <p className="text-muted-foreground">Use community templates and components to accelerate your development</p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
              <TrendingUp className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Learn & Grow</h3>
              <p className="text-muted-foreground">Share knowledge and learn from the best builders in the community</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;