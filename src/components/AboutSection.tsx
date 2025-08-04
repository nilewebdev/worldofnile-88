import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Award, 
  Target, 
  Heart,
  Play,
  Download,
  ArrowRight 
} from "lucide-react";

const AboutSection = () => {
  const stats = [
    { icon: Play, label: "Videos Edited", value: "500+" },
    { icon: Award, label: "Happy Clients", value: "100+" },
    { icon: Target, label: "Projects Done", value: "200+" },
    { icon: Heart, label: "Years Experience", value: "3+" },
  ];

  const skills = [
    { name: "Video Editing", level: 95 },
    { name: "Motion Graphics", level: 90 },
    { name: "Color Grading", level: 85 },
    { name: "Graphic Design", level: 88 },
    { name: "After Effects", level: 92 },
    { name: "Premiere Pro", level: 96 },
  ];

  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <User className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium font-code">About Me</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-playfair font-bold mb-6">
            <span className="text-foreground">Meet the </span>
            <span className="gradient-text italic">Creator</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-crimson">
            Passionate about bringing stories to life through the art of visual storytelling
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Content */}
          <div>
            <h3 className="text-3xl font-playfair font-bold mb-6 gradient-text">
              Transforming Ideas Into Visual Masterpieces
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                With over 3 years of experience in video editing and graphic design, I specialize in creating 
                compelling visual content that resonates with audiences and drives engagement.
              </p>
              <p>
                My journey began with a passion for storytelling, which evolved into mastering the technical 
                aspects of video production, motion graphics, and visual effects. I believe every project 
                has a unique story to tell, and my role is to bring that story to life.
              </p>
              <p>
                From TikTok content creation to professional commercial work, I've helped brands and 
                individuals create content that not only looks amazing but also achieves their goals.
              </p>
            </div>
            
            <div className="flex gap-4 mt-8">
              <Button variant="hero" size="lg" className="group" onClick={() => document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' })}>
                Work With Me
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="group" onClick={() => document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' })}>
                <Play className="h-4 w-4" />
                View Work
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="glass p-6 text-center hover:shadow-creative transition-all duration-300">
                  <div className="bg-gradient-primary p-3 rounded-lg w-fit mx-auto mb-4">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold gradient-text mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-muted/20 rounded-2xl p-8">
          <h3 className="text-2xl font-playfair font-bold mb-8 text-center gradient-text">
            Technical Expertise
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-primary transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;