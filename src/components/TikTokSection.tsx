import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, ExternalLink } from "lucide-react";

const TikTokSection = () => {
  const [loadedEmbeds, setLoadedEmbeds] = useState<Set<string>>(new Set());

  // TikTok video IDs from @exantz account
  const tiktokVideos = [
    "7234567890123456789", // Replace with actual video IDs
    "7234567890123456790", 
    "7234567890123456791",
    "7234567890123456792",
    "7234567890123456793",
    "7234567890123456794",
  ];

  const loadEmbed = (videoId: string) => {
    setLoadedEmbeds(prev => new Set([...prev, videoId]));
  };

  return (
    <section id="content" className="py-24">
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
          {tiktokVideos.map((videoId) => (
            <Card 
              key={videoId}
              className="glass overflow-hidden group hover:shadow-creative transition-all duration-500 border-border/50 hover:border-primary/30 aspect-[9/16]"
            >
              {loadedEmbeds.has(videoId) ? (
                <div className="w-full h-full">
                  <blockquote 
                    className="tiktok-embed w-full h-full" 
                    cite={`https://www.tiktok.com/@exantz/video/${videoId}`}
                    data-video-id={videoId}
                  >
                    <section>
                      <a 
                        target="_blank" 
                        title="@exantz" 
                        href="https://www.tiktok.com/@exantz"
                        className="block w-full h-full bg-muted/20 flex items-center justify-center"
                      >
                        <div className="text-center">
                          <Play className="h-12 w-12 text-primary mx-auto mb-4" />
                          <p className="text-sm text-muted-foreground">Loading TikTok...</p>
                        </div>
                      </a>
                    </section>
                  </blockquote>
                </div>
              ) : (
                <div className="relative w-full h-full bg-muted/10 flex items-center justify-center group cursor-pointer">
                  <div className="text-center">
                    <div className="bg-primary/20 p-4 rounded-full mb-4 group-hover:bg-primary/30 transition-colors">
                      <Play className="h-8 w-8 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 font-code">Click to load TikTok</p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => loadEmbed(videoId)}
                      className="font-code"
                    >
                      Load Video
                    </Button>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button variant="creative" size="xl" className="group font-playfair">
            <ExternalLink className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform" />
            Follow @exantz on TikTok
          </Button>
        </div>
      </div>

      {/* TikTok Embed Script */}
      <script async src="https://www.tiktok.com/embed.js"></script>
    </section>
  );
};

export default TikTokSection;