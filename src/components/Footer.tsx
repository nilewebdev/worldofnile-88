import { Play, Palette, Heart, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

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
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-gradient-primary p-2 rounded-lg">
                <Play className="h-6 w-6 text-white" />
              </div>
              <div className="bg-gradient-secondary p-2 rounded-lg">
                <Palette className="h-6 w-6 text-white" />
              </div>
              <span className="font-space font-bold text-xl gradient-text">
                CreativeStudio
              </span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              Transforming ideas into stunning visuals through professional video editing and creative graphic design. Let's bring your vision to life.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-red-500" />
              <span className="text-muted-foreground">for creative minds</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-space font-semibold mb-4 gradient-text">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#home" className="text-muted-foreground hover:text-primary transition-colors">Home</a></li>
              <li><a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Services</a></li>
              <li><a href="#portfolio" className="text-muted-foreground hover:text-primary transition-colors">Portfolio</a></li>
              <li><a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-space font-semibold mb-4 gradient-text">Services</h3>
            <ul className="space-y-3">
              <li><span className="text-muted-foreground">Video Editing</span></li>
              <li><span className="text-muted-foreground">Graphic Design</span></li>
              <li><span className="text-muted-foreground">Motion Graphics</span></li>
              <li><span className="text-muted-foreground">Brand Identity</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-muted-foreground text-sm mb-4 md:mb-0">
            © 2024 CreativeStudio. All rights reserved.
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