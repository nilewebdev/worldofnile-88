import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Menu, X, User, LogIn, LogOut, Calendar, Settings as SettingsIcon } from "lucide-react";
import ThemeSelector from "@/components/ThemeSelector";
import AuthModal from "@/components/AuthModal";
import ProfileModal from "@/components/ProfileModal";
import BookingsModal from "@/components/BookingsModal";
import SettingsModal from "@/components/SettingsModal";
import AdminDashboard from "@/components/AdminDashboard";
import MobileAdminDashboard from "@/components/MobileAdminDashboard";
import AdminLogin from "@/components/AdminLogin";
import wonLogo from "@/assets/won-logo-transparent.png";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { useMobile } from "@/hooks/use-mobile-detect";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isBookingsModalOpen, setIsBookingsModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const isMobile = useMobile();

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

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
    setIsAdminDashboardOpen(true);
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
        isScrolled ? "glass shadow-glass py-3" : "bg-transparent py-6"
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
            <Button 
              variant="hero" 
              size="sm"
              onClick={() => document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="desktop:h-10 mobile:mobile-button-large"
            >
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
                    <DropdownMenuItem onClick={() => setIsProfileModalOpen(true)}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsBookingsModalOpen(true)}>
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>My Bookings</span>
                    </DropdownMenuItem>
                     <DropdownMenuItem onClick={() => setIsSettingsModalOpen(true)}>
                       <SettingsIcon className="mr-2 h-4 w-4" />
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
                    <DropdownMenuItem onClick={() => setIsAuthModalOpen(true)}>
                      <LogIn className="mr-2 h-4 w-4" />
                      <span>Sign In</span>
                    </DropdownMenuItem>
                     <DropdownMenuItem onClick={() => setIsAuthModalOpen(true)}>
                       <User className="mr-2 h-4 w-4" />
                       <span>Sign Up</span>
                     </DropdownMenuItem>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem onClick={() => setIsAdminLoginOpen(true)}>
                       <SettingsIcon className="mr-2 h-4 w-4" />
                       <span>Admin Login</span>
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
            <div className="container mx-auto px-4 py-6">
              {/* Navigation Links */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {navItems.map((item, index) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block text-foreground hover:text-primary transition-colors duration-300 font-medium text-base py-4 px-4 rounded-lg hover:bg-primary/10 text-center border border-white/10"
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {item}
                  </a>
                ))}
              </div>
              
              {/* Get Started Button */}
              <Button 
                variant="hero" 
                size="default" 
                className="w-full text-base py-4 mb-6 mobile-button-large"
                onClick={() => {
                  document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" });
                  setIsMobileMenuOpen(false);
                }}
              >
                Get Started
              </Button>

              {/* Account Section */}
              <div className="border-t border-white/10 pt-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-3 px-2">Account</h3>
                {user ? (
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-base py-3"
                      onClick={() => {
                        setIsProfileModalOpen(true);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <User className="mr-3 h-5 w-5" />
                      Profile
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-base py-3"
                      onClick={() => {
                        setIsBookingsModalOpen(true);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <Calendar className="mr-3 h-5 w-5" />
                      My Bookings
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-base py-3"
                      onClick={() => {
                        setIsSettingsModalOpen(true);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <SettingsIcon className="mr-3 h-5 w-5" />
                      Settings
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-base py-3 text-red-400"
                      onClick={() => {
                        handleSignOut();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <LogOut className="mr-3 h-5 w-5" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-base py-3"
                      onClick={() => {
                        setIsAuthModalOpen(true);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <LogIn className="mr-3 h-5 w-5" />
                      Sign In
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-base py-3"
                      onClick={() => {
                        setIsAuthModalOpen(true);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <User className="mr-3 h-5 w-5" />
                      Sign Up
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-base py-3"
                      onClick={() => {
                        setIsAdminLoginOpen(true);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <SettingsIcon className="mr-3 h-5 w-5" />
                      Admin Login
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
        />
        <ProfileModal 
          isOpen={isProfileModalOpen} 
          onClose={() => setIsProfileModalOpen(false)} 
          user={user} 
        />
        <BookingsModal 
          isOpen={isBookingsModalOpen} 
          onClose={() => setIsBookingsModalOpen(false)} 
          user={user} 
        />
        <SettingsModal 
          isOpen={isSettingsModalOpen} 
          onClose={() => setIsSettingsModalOpen(false)} 
          user={user} 
        />
        <AdminLogin
          isOpen={isAdminLoginOpen}
          onClose={() => setIsAdminLoginOpen(false)}
          onAdminLogin={handleAdminLogin}
        />
        {isAdminLoggedIn && (
          isMobile ? (
            <MobileAdminDashboard 
              isOpen={isAdminDashboardOpen} 
              onClose={() => setIsAdminDashboardOpen(false)} 
              user={user} 
            />
          ) : (
            <AdminDashboard 
              isOpen={isAdminDashboardOpen} 
              onClose={() => setIsAdminDashboardOpen(false)} 
              user={user} 
            />
          )
        )}
      </div>
    </nav>
  );
};

export default Navigation;