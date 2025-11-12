import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="w-full px-6 py-4 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-3xl font-bold text-primary tracking-tight">TDC DKAI</span>
        </div>
        
        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/community" className="text-primary/90 hover:text-primary transition-colors">Community</Link>
          <Link to="/pricing" className="text-primary/90 hover:text-primary transition-colors">Pricing</Link>
          <Link to="/learn" className="text-primary/90 hover:text-primary transition-colors">Learn</Link>
          <Link to="/launched" className="text-primary/90 hover:text-primary transition-colors">Launched</Link>
        </div>
        
        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="text-primary hover:bg-primary/10 border-0">
            Log in
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium">
            Get started
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;