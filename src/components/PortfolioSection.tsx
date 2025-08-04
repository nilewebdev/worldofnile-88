import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ExternalLink, 
  Play, 
  Eye,
  Filter,
  Video,
  Image as ImageIcon
} from "lucide-react";

const PortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  
  const filters = ["All", "Video Editing", "Graphic Design", "Motion Graphics", "Branding"];
  
  const projects = [
    {
      id: 1,
      title: "Brand Campaign Video",
      category: "Video Editing",
      description: "Complete video production for a tech startup's launch campaign",
      image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=600&h=400&fit=crop",
      tags: ["Premiere Pro", "After Effects", "Color Grading"],
      duration: "2:30",
      type: "video"
    },
    {
      id: 2,
      title: "Modern Logo Design",
      category: "Graphic Design",
      description: "Minimalist logo design for a creative agency",
      image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=600&h=400&fit=crop",
      tags: ["Illustrator", "Brand Identity", "Logo"],
      type: "design"
    },
    {
      id: 3,
      title: "Product Showcase",
      category: "Motion Graphics",
      description: "Animated product presentation with 3D elements",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      tags: ["Cinema 4D", "After Effects", "3D Animation"],
      duration: "1:45",
      type: "video"
    },
    {
      id: 4,
      title: "Restaurant Branding",
      category: "Branding",
      description: "Complete brand identity including menus and signage",
      image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&h=400&fit=crop",
      tags: ["Brand Guidelines", "Print Design", "Identity"],
      type: "design"
    },
    {
      id: 5,
      title: "Social Media Campaign",
      category: "Graphic Design",
      description: "Cohesive social media graphics for a fashion brand",
      image: "https://images.unsplash.com/photo-1611262588024-d12430b98920?w=600&h=400&fit=crop",
      tags: ["Social Media", "Templates", "Photoshop"],
      type: "design"
    },
    {
      id: 6,
      title: "Documentary Edit",
      category: "Video Editing",
      description: "Feature-length documentary with complex narrative structure",
      image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=400&fit=crop",
      tags: ["Avid", "Color Correction", "Sound Design"],
      duration: "52:00",
      type: "video"
    }
  ];

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="portfolio" className="py-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <Eye className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">My Work</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-space font-bold mb-6">
            <span className="text-foreground">Featured </span>
            <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of creative projects spanning video editing, graphic design, and motion graphics
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "hero" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(filter)}
              className="transition-all duration-300"
            >
              <Filter className="h-4 w-4 mr-2" />
              {filter}
            </Button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card 
              key={project.id}
              className="glass overflow-hidden group hover:shadow-creative transition-all duration-500 border-border/50 hover:border-primary/30"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Play button for videos */}
                {project.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-primary/90 p-4 rounded-full">
                      <Play className="h-6 w-6 text-white" fill="white" />
                    </div>
                  </div>
                )}
                
                {/* Duration badge for videos */}
                {project.duration && (
                  <Badge className="absolute top-3 right-3 bg-black/70 text-white">
                    {project.duration}
                  </Badge>
                )}
                
                {/* Type indicator */}
                <div className="absolute top-3 left-3">
                  {project.type === "video" ? (
                    <Video className="h-5 w-5 text-white" />
                  ) : (
                    <ImageIcon className="h-5 w-5 text-white" />
                  )}
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline" className="text-xs">
                    {project.category}
                  </Badge>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
                
                <h3 className="text-xl font-space font-semibold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button variant="creative" size="xl" className="group">
            View All Projects
            <ExternalLink className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;