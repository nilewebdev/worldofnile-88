import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Star } from "lucide-react";

const BookingOnboardingBar = () => {
  const scrollToBookingForm = () => {
    document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full glass border-b border-border/50 backdrop-blur-lg">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="bg-gradient-primary p-2 rounded-lg">
                <Calendar className="h-5 w-5 text-background" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-foreground">
                  Ready to Start Your Project?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Book a consultation and let's bring your vision to life
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span>5.0 rating</span>
                <span>•</span>
                <span>24h response</span>
              </div>
              
              <Button
                onClick={scrollToBookingForm}
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300 group mobile-button-large"
              >
                Start Project
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingOnboardingBar;