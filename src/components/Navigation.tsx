import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="w-full px-6 py-4 bg-background/95 backdrop-blur-md border-b border-primary/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-foreground">POWER:K</span>
        </div>
        
        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/community" className="text-foreground/80 hover:text-foreground transition-colors">Community</Link>
          <Link to="/pricing" className="text-foreground/80 hover:text-foreground transition-colors">Pricing</Link>
          <Link to="/learn" className="text-foreground/80 hover:text-foreground transition-colors">Learn</Link>
          <Link to="/launched" className="text-foreground/80 hover:text-foreground transition-colors">Launched</Link>
        </div>
        
        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="text-foreground hover:bg-accent/20 border-0">
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