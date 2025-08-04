import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, ExternalLink } from "lucide-react";

const TikTokSection = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  
  useEffect(() => {
    // Load TikTok embed script
    const script = document.createElement('script');
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    document.body.appendChild(script);
    
    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="https://www.tiktok.com/embed.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  // Featured TikTok posts from @exantz
  const tiktokPosts = [
    "https://www.tiktok.com/@exantz/photo/7508176157448195350?is_from_webapp=1&sender_device=pc",
    "https://www.tiktok.com/@exantz/photo/7508100403204984086?is_from_webapp=1&sender_device=pc", 
    "https://www.tiktok.com/@exantz/video/7528361434279955734?is_from_webapp=1&sender_device=pc",
  ];

  return (
    <section id="portfolio" className="py-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <Play className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium font-code">Latest Content</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-playfair font-bold mb-6">
            <span className="text-foreground">Featured </span>
            <span className="gradient-text italic">TikToks</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-crimson">
            Check out our latest creative content from <span className="font-semibold text-primary">@exantz</span>
          </p>
        </div>

        {/* Mobile-Optimized TikTok Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {tiktokPosts.map((postUrl, index) => (
            <Card 
              key={index}
              className="glass overflow-hidden group hover:shadow-creative transition-all duration-500 border-border/50 hover:border-primary/30"
            >
              <div className="relative w-full aspect-[9/16] max-w-[350px] mx-auto">
                <iframe
                  className="w-full h-full rounded-lg"
                  src={`https://www.tiktok.com/embed/v2/${postUrl.split('/').pop()?.split('?')[0]}?lang=en-US`}
                  allow="encrypted-media;"
                  allowFullScreen
                  loading="lazy"
                  style={{
                    border: 'none',
                    maxWidth: '100%',
                    minHeight: '400px'
                  }}
                  onError={(e) => {
                    // Fallback to link if iframe fails
                    const target = e.target as HTMLIFrameElement;
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `
                        <a 
                          href="${postUrl}" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          class="flex flex-col items-center justify-center h-full bg-muted/20 rounded-lg text-center p-6 hover:bg-muted/30 transition-colors group"
                        >
                          <div class="bg-primary/20 p-4 rounded-full mb-4 group-hover:bg-primary/30 transition-colors">
                            <svg class="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <p class="text-sm text-muted-foreground mb-2">View on TikTok</p>
                          <p class="text-xs text-muted-foreground">@exantz</p>
                        </a>
                      `;
                    }
                  }}
                />
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button 
            variant="creative" 
            size="xl" 
            className="group font-playfair"
            onClick={() => window.open('https://tiktok.com/@exantz', '_blank')}
          >
            <ExternalLink className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform" />
            Follow @exantz on TikTok
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TikTokSection;