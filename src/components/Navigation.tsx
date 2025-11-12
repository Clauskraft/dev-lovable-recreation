import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Search } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="w-full px-6 py-3 bg-[hsl(230,45%,12%)] border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <div className="w-10 h-10 rounded-full bg-[hsl(210,100%,50%)] flex items-center justify-center">
            <span className="text-white font-bold text-sm">TDC</span>
          </div>
          <span className="text-xl font-bold text-white tracking-tight">Erhverv</span>
        </Link>
        
        {/* Main Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink className="inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition-colors">
                  Forside
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-white/90 hover:text-white hover:bg-white/10 data-[state=open]:bg-white/10 data-[active]:bg-white/10">
                AI Løsninger
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[400px] p-6">
                  <div className="space-y-1">
                    <Link to="/ai-mobile" className="block p-4 rounded-lg hover:bg-white/5 transition-all group">
                      <div className="font-medium mb-1 text-white group-hover:text-[hsl(210,100%,60%)] transition-colors">TDC AI Mobile</div>
                      <div className="text-sm text-white/70">AI-powered enheder til alle</div>
                    </Link>
                    <Link to="/referatservice" className="block p-4 rounded-lg hover:bg-white/5 transition-all group">
                      <div className="font-medium mb-1 text-white group-hover:text-[hsl(210,100%,60%)] transition-colors">Referatservice</div>
                      <div className="text-sm text-white/70">Automatisk mødereferater</div>
                    </Link>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/community">
                <NavigationMenuLink className="inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition-colors">
                  Community
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/pricing">
                <NavigationMenuLink className="inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition-colors">
                  Priser
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/learn">
                <NavigationMenuLink className="inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition-colors">
                  Lær
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/launched">
                <NavigationMenuLink className="inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition-colors">
                  Inside
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        
        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-white/90 hover:text-white hover:bg-white/10 border-0">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" className="hidden md:inline-flex text-white/90 hover:text-white hover:bg-white/10 border-0">
            Find hjælp
          </Button>
          <Button variant="ghost" className="hidden md:inline-flex text-white/90 hover:text-white hover:bg-white/10 border-0">
            Kontakt os
          </Button>
          <Button variant="outline" className="bg-transparent text-white border-white/20 hover:bg-white/10">
            Log ind
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;