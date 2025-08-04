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

        {/* TikTok Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tiktokPosts.map((postUrl, index) => (
            <Card 
              key={index}
              className="glass overflow-hidden group hover:shadow-creative transition-all duration-500 border-border/50 hover:border-primary/30"
            >
              <div className="relative w-full aspect-[9/16]">
                {isScriptLoaded ? (
                  <blockquote 
                    className="tiktok-embed w-full h-full" 
                    cite={postUrl}
                    data-video-id={postUrl.split('/').pop()}
                    style={{
                      maxWidth: '100%',
                      minWidth: '288px'
                    }}
                  >
                    <section>
                      <a 
                        target="_blank" 
                        title="@exantz" 
                        href="https://www.tiktok.com/@exantz"
                        rel="noopener noreferrer"
                        className="block w-full h-full bg-muted/20 flex items-center justify-center rounded-lg"
                      >
                        <div className="text-center p-6">
                          <Play className="h-12 w-12 text-primary mx-auto mb-4" />
                          <p className="text-sm text-muted-foreground font-code">Loading TikTok...</p>
                        </div>
                      </a>
                    </section>
                  </blockquote>
                ) : (
                  <div className="w-full h-full bg-muted/10 flex items-center justify-center group cursor-pointer rounded-lg">
                    <div className="text-center p-6">
                      <div className="bg-primary/20 p-4 rounded-full mb-4 group-hover:bg-primary/30 transition-colors">
                        <Play className="h-8 w-8 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-4 font-code">Loading TikTok script...</p>
                    </div>
                  </div>
                )}
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