import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="w-full px-6 py-4 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-3xl font-bold text-white tracking-tight">TDC</span>
        </div>
        
        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/community" className="text-white/90 hover:text-white transition-colors">Community</Link>
          <Link to="/pricing" className="text-white/90 hover:text-white transition-colors">Pricing</Link>
          <Link to="/learn" className="text-white/90 hover:text-white transition-colors">Learn</Link>
          <Link to="/launched" className="text-white/90 hover:text-white transition-colors">Launched</Link>
        </div>
        
        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="text-white hover:bg-white/20 border-0">
            Log in
          </Button>
          <Button className="bg-white text-primary hover:bg-white/90 font-medium">
            Get started
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;