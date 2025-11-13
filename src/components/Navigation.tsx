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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Search, Menu, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();

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
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden md:flex text-white/90 hover:text-white hover:bg-white/10 border-0">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" className="hidden lg:inline-flex text-white/90 hover:text-white hover:bg-white/10 border-0">
            Find hjælp
          </Button>
          <Button variant="ghost" className="hidden lg:inline-flex text-white/90 hover:text-white hover:bg-white/10 border-0">
            Kontakt os
          </Button>
          {user ? (
            <Button 
              onClick={signOut}
              variant="outline" 
              className="hidden md:inline-flex bg-transparent text-white border-white/20 hover:bg-white/10"
            >
              Log ud
            </Button>
          ) : (
            <Link to="/auth">
              <Button variant="outline" className="hidden md:inline-flex bg-transparent text-white border-white/20 hover:bg-white/10">
                Log ind
              </Button>
            </Link>
          )}

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden text-white/90 hover:text-white hover:bg-white/10">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-[hsl(230,45%,12%)] border-white/10">
              <SheetHeader>
                <SheetTitle className="text-white text-left">Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-8">
                <Link 
                  to="/" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between p-3 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <span className="font-medium">Forside</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>

                <div className="border-t border-white/10 pt-4">
                  <div className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3 px-3">AI Løsninger</div>
                  <Link 
                    to="/ai-mobile" 
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between p-3 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <div>
                      <div className="font-medium">TDC AI Mobile</div>
                      <div className="text-sm text-white/60">AI-powered enheder til alle</div>
                    </div>
                    <ChevronRight className="h-4 w-4 flex-shrink-0" />
                  </Link>
                  <Link 
                    to="/referatservice" 
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between p-3 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <div>
                      <div className="font-medium">Referatservice</div>
                      <div className="text-sm text-white/60">Automatisk mødereferater</div>
                    </div>
                    <ChevronRight className="h-4 w-4 flex-shrink-0" />
                  </Link>
                </div>

                <div className="border-t border-white/10 pt-4 space-y-1">
                  <Link 
                    to="/community" 
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between p-3 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <span className="font-medium">Community</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                  <Link 
                    to="/pricing" 
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between p-3 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <span className="font-medium">Priser</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                  <Link 
                    to="/learn" 
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between p-3 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <span className="font-medium">Lær</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                  <Link 
                    to="/launched" 
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between p-3 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <span className="font-medium">Inside</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="border-t border-white/10 pt-4 space-y-2">
                  <Button variant="ghost" className="w-full justify-start text-white/90 hover:text-white hover:bg-white/10">
                    <Search className="h-4 w-4 mr-2" />
                    Søg
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-white/90 hover:text-white hover:bg-white/10">
                    Find hjælp
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-white/90 hover:text-white hover:bg-white/10">
                    Kontakt os
                  </Button>
                  {user ? (
                    <Button 
                      onClick={signOut}
                      variant="outline" 
                      className="w-full bg-transparent text-white border-white/20 hover:bg-white/10"
                    >
                      Log ud
                    </Button>
                  ) : (
                    <Link to="/auth" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full bg-transparent text-white border-white/20 hover:bg-white/10">
                        Log ind
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;