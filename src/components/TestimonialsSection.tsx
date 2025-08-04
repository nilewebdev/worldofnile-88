import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Marketing Director",
    company: "TechStart Inc.",
    content: "WON Productions transformed our brand with stunning video content. Their attention to detail and creative vision exceeded our expectations.",
    rating: 5,
    project: "Brand Video Campaign"
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Content Creator",
    company: "@LifestyleMarcus",
    content: "The editing quality is phenomenal! They took my raw footage and created something that went viral. Professional, fast, and incredibly talented.",
    rating: 5,
    project: "Social Media Content"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Event Manager",
    company: "Stellar Events",
    content: "From concept to final cut, the team delivered outstanding results. Our event video became our most viewed content ever.",
    rating: 5,
    project: "Event Highlight Reel"
  },
  {
    id: 4,
    name: "David Kim",
    role: "Startup Founder",
    company: "InnovateLab",
    content: "Working with WON Productions was seamless. They understood our vision and delivered a product that perfectly represents our brand.",
    rating: 5,
    project: "Product Launch Video"
  }
];

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const currentTest = testimonials[currentTestimonial];

  return (
    <section className="py-24 bg-muted/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <Star className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium font-code">Client Reviews</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-playfair font-bold mb-6">
            <span className="text-foreground">What Clients </span>
            <span className="gradient-text italic">Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-crimson">
            Don't just take our word for it - hear from our satisfied clients
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="glass border-border/50 p-8 md:p-12 relative overflow-hidden">
            {/* Quote Icon */}
            <Quote className="absolute top-6 left-6 h-8 w-8 text-primary/20" />
            
            {/* Content */}
            <div className="text-center relative z-10">
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(currentTest.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                ))}
              </div>
              
              {/* Testimonial Text */}
              <blockquote className="text-xl md:text-2xl font-crimson text-foreground mb-8 leading-relaxed">
                "{currentTest.content}"
              </blockquote>
              
              {/* Author Info */}
              <div className="space-y-2">
                <h4 className="font-space font-semibold text-lg">{currentTest.name}</h4>
                <p className="text-muted-foreground">
                  {currentTest.role} at {currentTest.company}
                </p>
                <p className="text-sm text-primary font-medium">
                  Project: {currentTest.project}
                </p>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <Button
                variant="ghost"
                size="sm"
                onClick={prevTestimonial}
                className="hover:bg-primary/10"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              {/* Dots Indicator */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentTestimonial(index);
                      setIsAutoPlaying(false);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentTestimonial 
                        ? "bg-primary w-8" 
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                  />
                ))}
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={nextTestimonial}
                className="hover:bg-primary/10"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;