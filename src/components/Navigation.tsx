import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="w-full px-6 py-4 bg-[hsl(230,45%,12%)] border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[hsl(210,100%,50%)] flex items-center justify-center">
            <span className="text-white font-bold text-sm">TDC</span>
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">Erhverv</span>
        </div>
        
        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/community" className="text-white/90 hover:text-white transition-colors">Community</Link>
          <Link to="/pricing" className="text-white/90 hover:text-white transition-colors">Priser</Link>
          <Link to="/learn" className="text-white/90 hover:text-white transition-colors">Lær</Link>
          <Link to="/launched" className="text-white/90 hover:text-white transition-colors">Inside</Link>
        </div>
        
        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="text-white hover:bg-white/10 border-0">
            Log ind
          </Button>
          <Button className="bg-white text-primary hover:bg-white/90 font-medium">
            Kom i gang
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;