import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Video, Code, Lightbulb, Clock, Users } from "lucide-react";

const Learn = () => {
  const categories = [
    { name: "Getting Started", count: 12, icon: Lightbulb },
    { name: "Tutorials", count: 28, icon: Video },
    { name: "Best Practices", count: 15, icon: BookOpen },
    { name: "Advanced", count: 8, icon: Code },
  ];

  const tutorials = [
    {
      title: "Your First TDC AI App",
      description: "Learn how to create your first application using AI-powered development",
      duration: "10 min",
      level: "Beginner",
      category: "Getting Started",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
    },
    {
      title: "Building a Dashboard",
      description: "Step-by-step guide to creating interactive dashboards with beautiful charts",
      duration: "25 min", 
      level: "Intermediate",
      category: "Tutorials",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    },
    {
      title: "Database Integration",
      description: "Connect your app to databases and manage data effectively",
      duration: "30 min",
      level: "Intermediate", 
      category: "Tutorials",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
    },
    {
      title: "AI Prompt Engineering",
      description: "Master the art of communicating with AI to get the best results",
      duration: "15 min",
      level: "Beginner",
      category: "Best Practices",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    },
    {
      title: "Custom Components",
      description: "Build reusable components and design systems for your projects",
      duration: "35 min",
      level: "Advanced",
      category: "Advanced", 
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
    },
    {
      title: "Deployment Guide",
      description: "Deploy your applications to production with confidence",
      duration: "20 min",
      level: "Intermediate",
      category: "Tutorials",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
    },
  ];

  const resources = [
    {
      title: "Documentation",
      description: "Complete reference guide for all TDC AI features",
      icon: BookOpen,
      link: "#"
    },
    {
      title: "Video Courses", 
      description: "In-depth video tutorials for visual learners",
      icon: Video,
      link: "#"
    },
    {
      title: "Community Forum",
      description: "Get help and share knowledge with other builders",
      icon: Users,
      link: "#"
    },
    {
      title: "Code Examples",
      description: "Ready-to-use code snippets and templates", 
      icon: Code,
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Learn to Build with <span className="text-primary">POWER</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Master AI-powered development with our comprehensive tutorials and guides
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Start Learning
          </Button>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {categories.map((category, index) => (
            <Card key={index} className="text-center border-primary/20 hover:border-primary/40 cursor-pointer transition-colors">
              <CardContent className="p-6">
                <category.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-1">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} lessons</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Tutorials */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Featured Tutorials</h2>
            <Button variant="outline" className="border-primary/20">
              View All
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorials.map((tutorial, index) => (
              <Card key={index} className="border-primary/20 hover:border-primary/40 transition-colors cursor-pointer">
                <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                  <img 
                    src={tutorial.image} 
                    alt={tutorial.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{tutorial.category}</Badge>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {tutorial.duration}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                  <p className="text-muted-foreground text-sm">{tutorial.description}</p>
                  <div className="pt-2">
                    <Badge variant="outline">{tutorial.level}</Badge>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Learning Resources */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-8">Learning Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, index) => (
              <Card key={index} className="border-primary/20 hover:border-primary/40 transition-colors cursor-pointer">
                <CardContent className="p-6 text-center">
                  <resource.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-3">{resource.title}</h3>
                  <p className="text-muted-foreground text-sm">{resource.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;