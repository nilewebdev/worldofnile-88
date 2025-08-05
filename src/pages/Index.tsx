import Navigation from "@/components/Navigation";
import FiverrSection from "@/components/FiverrSection";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import TikTokSection from "@/components/TikTokSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BookingForm from "@/components/BookingForm";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import StickyCTAButton from "@/components/StickyCTAButton";
import LiveChat from "@/components/LiveChat";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <FiverrSection />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <TikTokSection />
      <TestimonialsSection />
      <BookingForm />
      <ContactSection />
      <Footer />
      <StickyCTAButton />
      <LiveChat />
    </div>
  );
};

export default Index;
