import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, Globe, ArrowUp } from "lucide-react";

const HeroSection = () => {
  const [chatInput, setChatInput] = useState("");

  return (
    <section className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
      {/* Main Heading */}
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground">
          Build with POWER
        </h1>
      </div>
      
      {/* Subtitle */}
      <p className="text-xl md:text-2xl text-foreground/80 mb-12 max-w-2xl">
        Create apps and websites by chatting with AI
      </p>
      
      {/* Chat Interface */}
      <div className="w-full max-w-2xl">
        <div className="glass-effect rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-4">
            <Input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask POWER:K to create a landing page for my..."
              className="flex-1 border-0 bg-white/90 text-gray-900 placeholder:text-gray-600 text-lg py-6"
            />
            <Button 
              className="p-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
              size="icon"
            >
              <ArrowUp className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              className="text-foreground/80 hover:text-foreground hover:bg-accent/20 gap-2"
            >
              <Paperclip className="w-4 h-4" />
              Attach
            </Button>
            <Button 
              variant="ghost"
              className="text-foreground/80 hover:text-foreground hover:bg-accent/20 gap-2"
            >
              <Globe className="w-4 h-4" />
              Public
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;