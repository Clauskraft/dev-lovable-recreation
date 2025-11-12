import { Button } from "@/components/ui/button";

const categories = [
  "Popular", "Discover", "Internal Tools", "Website", 
  "Personal", "Consumer App", "B2B App", "Prototype"
];

const projects = [
  {
    id: 1,
    title: "wrlds-ai-integration",
    category: "Website",
    remixes: "10586",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    title: "Threat Intel API", 
    category: "Consumer App",
    remixes: "6832",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    title: "Sovereign Speach t. Talk",
    category: "B2B App", 
    remixes: "4521",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    title: "creative-portfolio",
    category: "Personal",
    remixes: "3247",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"
  }
];

const CommunitySection = () => {
  return (
    <section className="w-full bg-white/95 backdrop-blur-sm rounded-t-3xl mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">From the Community</h2>
          <Button variant="outline" className="text-gray-700 border-gray-300">
            View All
          </Button>
        </div>
        
        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((category, index) => (
            <Button
              key={category}
              variant={index === 0 ? "default" : "ghost"}
              className={index === 0 ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"}
            >
              {category}
            </Button>
          ))}
        </div>
        
        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              {/* Project Image */}
              <div className="aspect-video overflow-hidden bg-gray-100">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Project Info */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  <h3 className="font-medium text-gray-900 truncate">{project.title}</h3>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="bg-gray-100 px-2 py-1 rounded-md">{project.category}</span>
                  <span>{project.remixes} Remixes</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;