import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play, Palette } from "lucide-react";

const PortfolioSection = () => {
  // Portfolio items with placeholder images since upload failed
  const portfolioItems = [
    {
      id: 1,
      title: "WON PRODUCTIONS - Before & After",
      description: "Music cover art transformation showcasing professional design evolution",
      image: "/lovable-uploads/84eed390-a21f-4ce1-b377-28de09764349.png",
      category: "Music Cover Art"
    },
    {
      id: 2,
      title: "Portrait Enhancement",
      description: "Professional portrait editing and enhancement",
      image: "/lovable-uploads/f0f09514-550c-47e6-985b-f7d09f77054b.png",
      category: "Photo Editing"
    },
    {
      id: 3,
      title: "High Like Me - Album Cover",
      description: "Creative album cover design with artistic typography and visual effects",
      image: "/lovable-uploads/2cc46fcd-a980-4ea7-8837-2047e8098577.png",
      category: "Album Design"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % portfolioItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? portfolioItems.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="portfolio" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 glass px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6">
            <Palette className="h-4 w-4 text-primary" />
            <span className="text-xs sm:text-sm font-medium">Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-space font-bold mb-4 sm:mb-6">
            <span className="text-foreground">Creative </span>
            <span className="gradient-text">Works</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Showcasing my latest projects and creative transformations
          </p>
        </div>

        {/* Slideshow */}
        <div className="max-w-4xl mx-auto">
          <Card className="glass border-border/50 overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                {/* Main Image */}
                <div className="aspect-video sm:aspect-[16/10] relative overflow-hidden bg-gradient-to-br from-muted/50 to-muted">
                  <img
                    src={portfolioItems[currentIndex].image}
                    alt={portfolioItems[currentIndex].title}
                    className="w-full h-full object-cover transition-all duration-500"
                    onError={(e) => {
                      // Fallback to a colored placeholder if image fails to load
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  {/* Fallback placeholder */}
                  <div className="hidden absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/20 flex items-center justify-center">
                    <div className="text-center">
                      <Palette className="h-12 w-12 mx-auto mb-4 text-primary/60" />
                      <p className="text-lg font-medium text-muted-foreground">
                        {portfolioItems[currentIndex].title}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Navigation Arrows */}
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 glass hover:bg-primary/20"
                  onClick={prevSlide}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 glass hover:bg-primary/20"
                  onClick={nextSlide}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full">
                      {portfolioItems[currentIndex].category}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-space font-semibold text-foreground mb-2">
                    {portfolioItems[currentIndex].title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    {portfolioItems[currentIndex].description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dots Navigation */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {portfolioItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-primary w-6' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <Card className="glass p-4 text-center border-border/50">
              <div className="text-2xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Projects</div>
            </Card>
            <Card className="glass p-4 text-center border-border/50">
              <div className="text-2xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Quality</div>
            </Card>
            <Card className="glass p-4 text-center border-border/50">
              <div className="text-2xl font-bold text-primary">24h</div>
              <div className="text-sm text-muted-foreground">Response</div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;