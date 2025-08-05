import { Button } from "@/components/ui/button";
import { ExternalLink, Star, MapPin, Clock } from "lucide-react";

const FiverrSection = () => {
  return (
    <section className="bg-gradient-primary py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4 lg:p-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-6">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden border-2 border-white/30">
                <img 
                  src="https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_original/v1/attachments/profile/photo/79e758ab7090bac6211d3564a8286263-1754355554022/a8861c90-7582-47aa-839f-3b83b5e0a2eb.png"
                  alt="Rheon N - WON Productions"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
                <h3 className="text-lg sm:text-xl font-bold text-white">Rheon N</h3>
                <span className="text-white/80 text-xs sm:text-sm">@wonproductions</span>
              </div>
              
              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3 mb-2 text-white/90 text-xs sm:text-sm">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>UK</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-green-300">Online</span>
                </div>
              </div>

              <p className="text-white/90 text-xs sm:text-sm mb-3 hidden sm:block">
                Professional designer specializing in YouTube thumbnails and social media branding.
              </p>

              <div className="flex flex-wrap justify-center sm:justify-start gap-1 sm:gap-2 mb-3 sm:mb-0">
                <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">Thumbnails</span>
                <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">Logos</span>
                <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full hidden sm:inline">Social Media</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex-shrink-0">
              <Button 
                asChild
                variant="hero"
                size="sm"
                className="bg-white text-primary hover:bg-white/90 font-semibold px-4 sm:px-6 py-2 text-sm"
              >
                <a 
                  href="https://www.fiverr.com/wonproductions/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <span className="hidden sm:inline">View Fiverr</span>
                  <span className="sm:hidden">Fiverr</span>
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FiverrSection;