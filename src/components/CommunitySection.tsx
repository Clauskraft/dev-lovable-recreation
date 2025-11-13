import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Globe, Shield, FileText, Layers, Palette } from "lucide-react";
import { useEffect, useRef } from "react";

const categories = [
  "Popular", "Offentlig Sektor", "Defense", "Health", 
  "DataBankBox", "Consumer App", "B2B App", "Prototype"
];

const projects = [
  {
    id: 1,
    title: "TDC AI Mobile",
    category: "Website",
    remixes: "10586",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop",
    link: "/ai-mobile",
    icon: Globe
  },
  {
    id: 2,
    title: "TDC Threat Intel API", 
    category: "Consumer App",
    remixes: "6832",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    icon: Shield,
    link: "https://cyberstreams-v2-production.up.railway.app/"
  },
  {
    id: 3,
    title: "TDC GDPR Referatservice",
    category: "B2B App", 
    remixes: "4521",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop",
    icon: FileText,
    link: "/referatservice"
  },
  {
    id: 4,
    title: "Creative Portfolio",
    category: "Crea App",
    remixes: "3247",
    video: "/creative-portfolio-animation.mp4",
    icon: Palette,
    link: "#creative-portfolio"
  }
];

const CommunitySection = () => {
  return (
    <section className="w-full bg-white/95 backdrop-blur-sm rounded-t-3xl mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Sikkerhed. Compliance. Ro i Sindet. Indbygget.</h2>
          <Button className="bg-white text-primary hover:bg-white/90 border-0 shadow-lg">
            Se Alle
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
          {projects.map((project) => {
            const VideoPlayer = ({ videoSrc }: { videoSrc: string }) => {
              const videoRef = useRef<HTMLVideoElement>(null);

              useEffect(() => {
                const video = videoRef.current;
                if (!video) return;

                const handleEnded = () => {
                  video.play();
                };

                video.addEventListener('ended', handleEnded);
                return () => video.removeEventListener('ended', handleEnded);
              }, []);

              return (
                <video
                  ref={videoRef}
                  src={videoSrc}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  autoPlay
                  playsInline
                  muted={true}
                />
              );
            };

            const Card = (
              <div
                className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                {/* Project Image or Video */}
                <div className="aspect-video overflow-hidden bg-gray-100">
                  {project.video ? (
                    <VideoPlayer videoSrc={project.video} />
                  ) : (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>
                
                {/* Project Info */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <project.icon className="w-4 h-4 text-primary" strokeWidth={2} />
                    </div>
                    <h3 className="font-medium text-gray-900 truncate">{project.title}</h3>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="bg-gray-100 px-2 py-1 rounded-md">{project.category}</span>
                  </div>
                </div>
              </div>
            );

            if (project.link) {
              // External link
              if (project.link.startsWith('http')) {
                return (
                  <a key={project.id} href={project.link} target="_blank" rel="noopener noreferrer">
                    {Card}
                  </a>
                );
              }
              // Internal link
              return (
                <Link key={project.id} to={project.link}>
                  {Card}
                </Link>
              );
            }
            return <div key={project.id}>{Card}</div>;
          })}
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;