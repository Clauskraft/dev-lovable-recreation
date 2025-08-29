import { Button } from "@/components/ui/button";
import lovableHeart from "@/assets/lovable-heart.png";

const Navigation = () => {
  return (
    <nav className="w-full px-6 py-4 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={lovableHeart} alt="Lovable" className="w-8 h-8" />
          <span className="text-xl font-bold text-white">Lovable</span>
        </div>
        
        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-white/80 hover:text-white transition-colors">Community</a>
          <a href="#" className="text-white/80 hover:text-white transition-colors">Pricing</a>
          <a href="#" className="text-white/80 hover:text-white transition-colors">Enterprise</a>
          <a href="#" className="text-white/80 hover:text-white transition-colors">Learn</a>
          <a href="#" className="text-white/80 hover:text-white transition-colors">Launched</a>
        </div>
        
        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="text-white hover:bg-white/20 border-0">
            Log in
          </Button>
          <Button className="bg-white text-gray-900 hover:bg-gray-100 font-medium">
            Get started
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;