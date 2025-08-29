import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, Globe, ArrowUp } from "lucide-react";
import lovableHeart from "@/assets/lovable-heart.png";

const HeroSection = () => {
  const [chatInput, setChatInput] = useState("");

  return (
    <section className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
      {/* Main Heading */}
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
          Build with
        </h1>
        <div className="flex items-center gap-2">
          <img src={lovableHeart} alt="POWER:K heart" className="w-12 h-12 md:w-16 md:h-16" />
          <span className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
            POWER
          </span>
        </div>
      </div>
      
      {/* Subtitle */}
      <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl">
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
              className="p-3 bg-gray-600 hover:bg-gray-700 text-white rounded-full"
              size="icon"
            >
              <ArrowUp className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              className="text-white/80 hover:text-white hover:bg-white/20 gap-2"
            >
              <Paperclip className="w-4 h-4" />
              Attach
            </Button>
            <Button 
              variant="ghost"
              className="text-white/80 hover:text-white hover:bg-white/20 gap-2"
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