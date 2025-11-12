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
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Build with <span className="text-primary">TDC Trusted Digital Community</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of builders creating amazing applications with AI-powered development
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Join Community
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

        {/* Featured Projects */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Featured Projects</h2>
            <Button variant="outline" className="border-primary/20">
              View All
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <Card key={index} className="border-primary/20 hover:border-primary/40 transition-colors">
                <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{project.category}</Badge>
                    <span className="text-sm text-muted-foreground">{project.remixes} remixes</span>
                  </div>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <p className="text-muted-foreground">by {project.author}</p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Community Features */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-8">Why Join TDC AI Community?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Collaborative Building</h3>
              <p className="text-muted-foreground">Work together with developers worldwide to create amazing applications</p>
            </div>
            <div className="p-6">
              <Rocket className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Launch Faster</h3>
              <p className="text-muted-foreground">Use community templates and components to accelerate your development</p>
            </div>
            <div className="p-6">
              <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
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