import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import LoadingSpinner from "@/components/LoadingSpinner";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    project_details: "",
    budget_range: "",
    timeline: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('create-booking', {
        body: formData
      });

      if (error) throw error;

      toast({
        title: "Booking Request Submitted!",
        description: "We'll get back to you within 24 hours to discuss your project.",
      });

      setFormData({
        name: "",
        email: "",
        service: "",
        project_details: "",
        budget_range: "",
        timeline: ""
      });
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast({
        title: "Error",
        description: "Failed to submit booking request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking-form" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Book Your Project</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-space font-bold mb-6">
            <span className="text-foreground">Ready to </span>
            <span className="gradient-text">Get Started?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Let's discuss your project requirements and bring your vision to life
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="glass p-8 border-border/50">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Name *</label>
                  <Input 
                    required
                    placeholder="Your name" 
                    className="glass border-border/50"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email *</label>
                  <Input 
                    required
                    type="email" 
                    placeholder="your@email.com" 
                    className="glass border-border/50"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Service Type *</label>
                <Select value={formData.service} onValueChange={(value) => setFormData(prev => ({ ...prev, service: value }))}>
                  <SelectTrigger className="glass border-border/50">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video-editing">Video Editing</SelectItem>
                    <SelectItem value="graphic-design">Graphic Design</SelectItem>
                    <SelectItem value="content-creation">Content Creation</SelectItem>
                    <SelectItem value="post-production">Post Production</SelectItem>
                    <SelectItem value="motion-graphics">Motion Graphics</SelectItem>
                    <SelectItem value="digital-media">Digital Media</SelectItem>
                    <SelectItem value="custom">Custom Project</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Budget Range</label>
                  <Select value={formData.budget_range} onValueChange={(value) => setFormData(prev => ({ ...prev, budget_range: value }))}>
                    <SelectTrigger className="glass border-border/50">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                      <SelectItem value="1000-2500">$1,000 - $2,500</SelectItem>
                      <SelectItem value="2500-5000">$2,500 - $5,000</SelectItem>
                      <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                      <SelectItem value="10000+">$10,000+</SelectItem>
                      <SelectItem value="discuss">Let's Discuss</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Timeline</label>
                  <Select value={formData.timeline} onValueChange={(value) => setFormData(prev => ({ ...prev, timeline: value }))}>
                    <SelectTrigger className="glass border-border/50">
                      <SelectValue placeholder="Project timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asap">ASAP</SelectItem>
                      <SelectItem value="1-2-weeks">1-2 weeks</SelectItem>
                      <SelectItem value="1-month">1 month</SelectItem>
                      <SelectItem value="2-3-months">2-3 months</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Project Details</label>
                <Textarea 
                  placeholder="Tell us about your project, goals, and any specific requirements..." 
                  rows={5}
                  className="glass border-border/50 resize-none"
                  value={formData.project_details}
                  onChange={(e) => setFormData(prev => ({ ...prev, project_details: e.target.value }))}
                />
              </div>

              <Button 
                type="submit" 
                variant="hero" 
                size="lg" 
                className="w-full group"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Book Your Project
                    <Send className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;