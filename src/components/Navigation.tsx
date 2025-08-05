import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Menu, X, User, LogIn, LogOut, Calendar, Settings } from "lucide-react";
import ThemeSelector from "@/components/ThemeSelector";
import wonLogo from "@/assets/won-logo-transparent.png";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ["Home", "Services", "Portfolio", "About", "Contact"];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "glass shadow-glass py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo & Theme Selector */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <img 
                src={wonLogo} 
                alt="WON Productions" 
                className="h-10 w-auto"
              />
            </div>
            <ThemeSelector />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-foreground hover:text-primary transition-colors duration-300 font-medium"
              >
                {item}
              </a>
            ))}
            <Button variant="hero" size="sm">
              Get Started
            </Button>
            
            {/* Account Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  Account
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {user ? (
                  <>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>My Bookings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem>
                      <LogIn className="mr-2 h-4 w-4" />
                      <span>Sign In</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Sign Up</span>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

          {/* Enhanced Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full glass border-t border-white/10 animate-fade-in">
            <div className="container mx-auto px-4 py-4">
              <div className="grid grid-cols-2 gap-3 mb-4">
                {navItems.map((item, index) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block text-foreground hover:text-primary transition-colors duration-300 font-medium text-sm py-3 px-3 rounded-lg hover:bg-primary/10 text-center border border-white/10"
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {item}
                  </a>
                ))}
              </div>
              <Button 
                variant="hero" 
                size="sm" 
                className="w-full text-sm py-3"
                onClick={() => {
                  document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" });
                  setIsMobileMenuOpen(false);
                }}
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;