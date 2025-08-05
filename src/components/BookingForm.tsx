import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Send, ArrowRight, ArrowLeft, Check, User, Briefcase, DollarSign, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import LoadingSpinner from "@/components/LoadingSpinner";

const BookingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
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

  const totalSteps = 4;

  const steps = [
    { 
      number: 1, 
      title: "Personal Info", 
      icon: User, 
      description: "Tell us about yourself" 
    },
    { 
      number: 2, 
      title: "Service & Budget", 
      icon: Briefcase, 
      description: "What service do you need?" 
    },
    { 
      number: 3, 
      title: "Project Details", 
      icon: MessageSquare, 
      description: "Share your vision" 
    },
    { 
      number: 4, 
      title: "Review & Submit", 
      icon: Check, 
      description: "Confirm your booking" 
    }
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim() !== "" && formData.email.trim() !== "";
      case 2:
        return formData.service !== "";
      case 3:
        return true; // Project details are optional
      case 4:
        return true; // Review step
      default:
        return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Add retry logic for the booking submission
      let attempts = 0;
      const maxAttempts = 2;
      
      while (attempts < maxAttempts) {
        try {
          const { error } = await supabase.functions.invoke('create-booking', {
            body: formData
          });

          if (error) throw error;
          
          // Success - break out of retry loop
          break;
        } catch (error: any) {
          attempts++;
          if (attempts >= maxAttempts) {
            throw error; // Re-throw if max attempts reached
          }
          
          // Wait a short time before retrying
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      toast({
        title: "Booking Request Submitted!",
        description: "We'll get back to you within 24 hours to discuss your project.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        service: "",
        project_details: "",
        budget_range: "",
        timeline: ""
      });
      setCurrentStep(1);
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

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <User className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold">Let's get to know you</h3>
              <p className="text-muted-foreground">We need some basic information to get started</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Full Name *</label>
                <Input 
                  required
                  placeholder="Your full name" 
                  className="glass border-border/50"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Email Address *</label>
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
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Briefcase className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold">What can we help you with?</h3>
              <p className="text-muted-foreground">Select the service you need and your budget range</p>
            </div>
            <div className="space-y-4">
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
                  <Input 
                    placeholder="e.g., $2,000 - $5,000 or Let's discuss" 
                    className="glass border-border/50"
                    value={formData.budget_range}
                    onChange={(e) => setFormData(prev => ({ ...prev, budget_range: e.target.value }))}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter your budget range or "Let's discuss" for a custom quote
                  </p>
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
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <MessageSquare className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold">Tell us about your vision</h3>
              <p className="text-muted-foreground">The more details you provide, the better we can help you</p>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Project Details</label>
              <Textarea 
                placeholder="Describe your project goals, style preferences, target audience, inspiration, and any specific requirements you have in mind..." 
                rows={8}
                className="glass border-border/50 resize-none"
                value={formData.project_details}
                onChange={(e) => setFormData(prev => ({ ...prev, project_details: e.target.value }))}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Check className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold">Review your booking</h3>
              <p className="text-muted-foreground">Please review your information before submitting</p>
            </div>
            <div className="space-y-4">
              <Card className="glass p-4 border-border/50">
                <h4 className="font-semibold mb-2">Contact Information</h4>
                <p className="text-sm text-muted-foreground">Name: {formData.name}</p>
                <p className="text-sm text-muted-foreground">Email: {formData.email}</p>
              </Card>
              <Card className="glass p-4 border-border/50">
                <h4 className="font-semibold mb-2">Service Details</h4>
                <p className="text-sm text-muted-foreground">Service: {formData.service || "Not specified"}</p>
                <p className="text-sm text-muted-foreground">Budget: {formData.budget_range || "Not specified"}</p>
                <p className="text-sm text-muted-foreground">Timeline: {formData.timeline || "Not specified"}</p>
              </Card>
              {formData.project_details && (
                <Card className="glass p-4 border-border/50">
                  <h4 className="font-semibold mb-2">Project Details</h4>
                  <p className="text-sm text-muted-foreground">{formData.project_details}</p>
                </Card>
              )}
            </div>
          </div>
        );

      default:
        return null;
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

        <div className="max-w-4xl mx-auto">
          {/* Step Progress Indicator */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                const isActive = currentStep === step.number;
                const isCompleted = currentStep > step.number;
                
                return (
                  <div key={step.number} className="flex flex-col items-center flex-1">
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300
                      ${isActive ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' : 
                        isCompleted ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}
                    `}>
                      <StepIcon className="h-5 w-5" />
                    </div>
                    <div className="text-center">
                      <p className={`text-sm font-medium ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                        {step.title}
                      </p>
                      <p className="text-xs text-muted-foreground hidden sm:block">
                        {step.description}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`
                        hidden md:block absolute h-0.5 w-24 top-6 translate-x-12
                        ${isCompleted ? 'bg-primary' : 'bg-border'}
                      `} style={{ left: `${(index + 1) * 25}%` }} />
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-border h-2 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-500 ease-out"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Content */}
          <Card className="glass p-8 border-border/50 min-h-[500px]">
            <form onSubmit={handleSubmit}>
              {renderStepContent()}
              
              {/* Navigation Buttons */}
              <div className="flex justify-between mt-12 pt-6 border-t border-border/50">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </Button>
                
                {currentStep < totalSteps ? (
                  <Button
                    type="button"
                    variant="hero"
                    onClick={handleNext}
                    disabled={!isStepValid()}
                    className="flex items-center gap-2"
                  >
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button 
                    type="submit" 
                    variant="hero" 
                    className="flex items-center gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <LoadingSpinner size="sm" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Booking
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;