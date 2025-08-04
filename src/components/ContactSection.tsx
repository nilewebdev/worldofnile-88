import { Card } from "@/components/ui/card";
import ContactForm from "./ContactForm";
import { 
  Mail, 
  MessageCircle, 
  Phone, 
  MapPin, 
  ExternalLink,
  Github
} from "lucide-react";

const ContactSection = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "contact@worldofnile.xyz",
      link: "mailto:contact@worldofnile.xyz"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+44 7404 550216",
      link: "tel:+447404550216"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "United Kingdom",
      link: "#"
    }
  ];

  const socialLinks = [
    { 
      icon: Github, 
      name: "GitHub", 
      url: "https://github.com/nilewebdev" 
    },
    { 
      icon: MessageCircle, 
      name: "TikTok", 
      url: "https://tiktok.com/@exantz" 
    }
  ];

  return (
    <section id="contact" className="py-16 sm:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 glass px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6">
            <MessageCircle className="h-4 w-4 text-primary" />
            <span className="text-xs sm:text-sm font-medium">Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-space font-bold mb-4 sm:mb-6">
            <span className="text-foreground">Let's Create </span>
            <span className="gradient-text">Together</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Ready to bring your vision to life? Let's discuss your next project and create something amazing
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="glass p-6 sm:p-8 border-border/50">
            <h3 className="text-xl sm:text-2xl font-space font-semibold mb-4 sm:mb-6 gradient-text">
              Send a Message
            </h3>
            <ContactForm />
          </Card>

          {/* Contact Info */}
          <div className="space-y-6 sm:space-y-8">
            <Card className="glass p-6 sm:p-8 border-border/50">
              <h3 className="text-xl sm:text-2xl font-space font-semibold mb-4 sm:mb-6 gradient-text">
                Contact Information
              </h3>
              <div className="space-y-4 sm:space-y-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <a
                      key={index}
                      href={info.link}
                      className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg hover:bg-white/5 transition-colors group"
                    >
                      <div className="bg-gradient-primary p-2 sm:p-3 rounded-lg group-hover:scale-110 transition-transform">
                        <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-xs sm:text-sm text-muted-foreground">{info.title}</div>
                        <div className="text-sm sm:text-base text-foreground group-hover:text-primary transition-colors">
                          {info.value}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </Card>

            {/* Social Links */}
            <Card className="glass p-6 sm:p-8 border-border/50">
              <h3 className="text-lg sm:text-xl font-space font-semibold mb-4 sm:mb-6 gradient-text">
                Follow My Work
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.url}
                      className="flex items-center gap-2 sm:gap-3 p-3 rounded-lg glass hover:shadow-glow transition-all duration-300 group border border-border/50 hover:border-primary/30"
                    >
                      <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 text-primary group-hover:scale-110 transition-transform" />
                      <span className="font-medium text-sm sm:text-base">{social.name}</span>
                      <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  );
                })}
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="glass p-6 sm:p-8 border-border/50">
              <h3 className="text-lg sm:text-xl font-space font-semibold mb-4 sm:mb-6 gradient-text">
                Why Work With Me?
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm sm:text-base">Response Time</span>
                  <span className="font-semibold text-primary text-sm sm:text-base">Within 24hrs</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm sm:text-base">Project Delivery</span>
                  <span className="font-semibold text-primary text-sm sm:text-base">On Schedule</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm sm:text-base">Revisions</span>
                  <span className="font-semibold text-primary text-sm sm:text-base">Unlimited</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm sm:text-base">Support</span>
                  <span className="font-semibold text-primary text-sm sm:text-base">24/7 Available</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;