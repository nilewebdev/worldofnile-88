import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, X } from "lucide-react";

const StickyCTAButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero section
      const scrolled = window.scrollY > window.innerHeight * 0.5;
      setIsVisible(scrolled && !isDismissed);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  const handleBookNow = () => {
    document.getElementById("booking-form")?.scrollIntoView({ 
      behavior: "smooth",
      block: "start"
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 md:hidden">
      <div className="relative">
        <Button
          onClick={handleBookNow}
          variant="hero"
          size="lg"
          className="shadow-creative rounded-full px-6 py-3 group"
        >
          <Calendar className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
          Book Now
        </Button>
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute -top-2 -right-2 bg-background border border-border rounded-full p-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};

export default StickyCTAButton;