import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Video, 
  Palette, 
  Edit3, 
  Camera, 
  Layers, 
  Monitor,
  ArrowRight 
} from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: Video,
      title: "Video Editing",
      description: "Professional video editing with color grading, motion graphics, and seamless transitions for any project.",
      features: ["Color Correction", "Motion Graphics", "Audio Sync", "Visual Effects"],
      gradient: "bg-gradient-primary"
    },
    {
      icon: Palette,
      title: "Graphic Design",
      description: "Creative visual solutions including brand identity, digital graphics, and print design materials.",
      features: ["Brand Identity", "Digital Graphics", "Print Design", "UI/UX Elements"],
      gradient: "bg-gradient-secondary"
    },
    {
      icon: Edit3,
      title: "Content Creation",
      description: "End-to-end content creation from concept to final delivery for social media and marketing.",
      features: ["Social Media Content", "Marketing Materials", "Thumbnails", "Promotional Videos"],
      gradient: "bg-gradient-accent"
    },
    {
      icon: Camera,
      title: "Post Production",
      description: "Complete post-production services including editing, compositing, and final delivery.",
      features: ["Video Compositing", "Sound Design", "Final Cut Pro", "Adobe Suite"],
      gradient: "bg-gradient-primary"
    },
    {
      icon: Layers,
      title: "Motion Graphics",
      description: "Dynamic motion graphics and animations that bring your content to life with style.",
      features: ["2D Animation", "Logo Animation", "Kinetic Typography", "Visual Effects"],
      gradient: "bg-gradient-secondary"
    },
    {
      icon: Monitor,
      title: "Digital Media",
      description: "Comprehensive digital media solutions for web, social, and streaming platforms.",
      features: ["Web Graphics", "Social Assets", "Streaming Overlays", "Digital Campaigns"],
      gradient: "bg-gradient-accent"
    }
  ];

  return (
    <section id="services" className="py-16 sm:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 glass px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6">
            <Palette className="h-4 w-4 text-primary" />
            <span className="text-xs sm:text-sm font-medium">What I Do</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-space font-bold mb-4 sm:mb-6">
            <span className="gradient-text">Creative</span>
            <span className="text-foreground"> Services</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Bringing your vision to life with professional video editing and stunning graphic design
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={index} 
                className="glass p-6 sm:p-8 hover:shadow-creative transition-all duration-500 group border-border/50 hover:border-primary/30"
              >
                <div className={`${service.gradient} p-3 rounded-lg w-fit mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-space font-semibold mb-3 sm:mb-4 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-4 sm:mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" size="sm" className="group flex-1 text-xs sm:text-sm">
                    Learn More
                    <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button variant="default" size="sm" className="group flex-1 text-xs sm:text-sm" onClick={() => document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' })}>
                    Book Now
                    <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="hero" size="lg" className="w-full sm:w-auto group text-sm sm:text-base" onClick={() => document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' })}>
            Start Your Project
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;