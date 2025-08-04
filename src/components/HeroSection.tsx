import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-primary rounded-full float opacity-20" />
      <div className="absolute top-1/3 right-20 w-32 h-32 bg-gradient-secondary rounded-lg rotate-45 float opacity-30" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-1/4 left-1/4 w-16 h-16 bg-gradient-accent rounded-full float opacity-25" style={{ animationDelay: "4s" }} />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass px-3 sm:px-4 py-2 rounded-full mb-6 sm:mb-8">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-xs sm:text-sm font-medium">Available for Projects</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-space font-bold mb-4 sm:mb-6 leading-tight">
            <span className="gradient-text">WON</span>
            <br />
            <span className="text-white">Productions</span>
            <br />
            <span className="gradient-text-secondary text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Where Dreams Take Flight</span>
          </h1>
          
          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4">
            Transforming ideas into stunning visuals through 
            <span className="text-primary font-semibold"> video editing </span>
            and
            <span className="text-accent font-semibold"> graphic design</span>
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
            <Button variant="hero" size="lg" className="w-full sm:w-auto group text-sm sm:text-base" onClick={() => document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' })}>
              Start Your Project
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="glass" size="lg" className="w-full sm:w-auto group text-sm sm:text-base" onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}>
              <Play className="h-4 w-4 sm:h-5 sm:w-5" />
              View Portfolio
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mt-12 sm:mt-16 px-4">
            <div className="glass p-4 sm:p-6 rounded-xl text-center">
              <div className="text-2xl sm:text-3xl font-bold gradient-text mb-2">50+</div>
              <div className="text-muted-foreground text-sm sm:text-base">Projects Completed</div>
            </div>
            <div className="glass p-4 sm:p-6 rounded-xl text-center">
              <div className="text-2xl sm:text-3xl font-bold gradient-text mb-2">3+</div>
              <div className="text-muted-foreground text-sm sm:text-base">Years Experience</div>
            </div>
            <div className="glass p-4 sm:p-6 rounded-xl text-center">
              <div className="text-2xl sm:text-3xl font-bold gradient-text mb-2">100%</div>
              <div className="text-muted-foreground text-sm sm:text-base">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;