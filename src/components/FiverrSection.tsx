import { Button } from "@/components/ui/button";
import { ExternalLink, Star, MapPin, Clock } from "lucide-react";

const FiverrSection = () => {
  return (
    <section className="bg-gradient-primary py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="relative w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden border-4 border-white/30">
                <div className="w-full h-full bg-primary/20 flex items-center justify-center text-white font-bold text-2xl lg:text-4xl">
                  WON
                </div>
                <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4 mb-2">
                <h3 className="text-xl lg:text-2xl font-bold text-white">Rheon N</h3>
                <span className="text-white/80 text-sm lg:text-base">@wonproductions</span>
              </div>
              
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 mb-3 text-white/90 text-sm">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>United Kingdom</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-green-300">Online</span>
                </div>
              </div>

              <p className="text-white/90 text-sm lg:text-base mb-4 max-w-2xl">
                Professional designer specializing in YouTube thumbnails, social media branding, and eye-catching visuals. Quick communication & guaranteed satisfaction!
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-4">
                <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">Logo Designer</span>
                <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">Thumbnails Designer</span>
                <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">Social Media Expert</span>
                <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">Album Cover Designer</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex-shrink-0">
              <Button 
                asChild
                variant="hero"
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-3 text-base"
              >
                <a 
                  href="https://www.fiverr.com/wonproductions/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  View Fiverr Profile
                  <ExternalLink className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Featured Gig Preview */}
          <div className="mt-6 pt-6 border-t border-white/20">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 sm:w-16 sm:h-16 bg-gradient-primary rounded-lg flex items-center justify-center text-white font-bold text-xs">
                  YT THUMB
                </div>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h4 className="text-white font-semibold text-sm lg:text-base mb-1">
                  I will design and create you a YouTube thumbnail
                </h4>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-white/80 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>5.0</span>
                  </div>
                  <span>•</span>
                  <span>Starting at $5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FiverrSection;