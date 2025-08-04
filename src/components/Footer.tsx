import { Play, Heart, ArrowUp, Mail, Phone, Github, MessageCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeSelector from "@/components/ThemeSelector";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-background border-t border-border/50">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-primary p-2 rounded-lg">
                  <Play className="h-6 w-6 text-white" />
                </div>
                <span className="font-playfair font-bold text-xl gradient-text">
                  WON Productions
                </span>
              </div>
              <ThemeSelector />
            </div>
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed font-crimson">
              Creative production studio bringing your vision to life through innovative video content and digital storytelling.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground font-crimson">Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-red-500" />
              <span className="text-muted-foreground font-crimson">in the United Kingdom</span>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-playfair font-semibold mb-4 gradient-text">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:contact@worldofnile.xyz" className="text-muted-foreground hover:text-primary transition-colors font-code text-sm">
                  contact@worldofnile.xyz
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+447404550216" className="text-muted-foreground hover:text-primary transition-colors font-code">
                  +44 7404 550216
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground font-crimson">United Kingdom</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-playfair font-semibold mb-4 gradient-text">Connect</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Github className="h-4 w-4 text-primary" />
                <a href="https://github.com/nilewebdev" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors font-code">
                  @nilewebdev
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-primary" />
                <a href="https://tiktok.com/@exantz" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors font-code">
                  @exantz
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-muted-foreground text-sm mb-4 md:mb-0 font-crimson">
            © 2024 World Of Nile. All rights reserved.
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={scrollToTop}
            className="group"
          >
            <ArrowUp className="h-4 w-4 group-hover:-translate-y-1 transition-transform" />
            Back to Top
          </Button>
        </div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-primary rounded-full opacity-5 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-gradient-secondary rounded-full opacity-5 blur-3xl" />
      </div>
    </footer>
  );
};

export default Footer;