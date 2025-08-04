import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import TikTokSection from "@/components/TikTokSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BookingForm from "@/components/BookingForm";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import StickyCTAButton from "@/components/StickyCTAButton";
import AdminDashboard from "@/components/AdminDashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <TikTokSection />
      <TestimonialsSection />
      <BookingForm />
      <ContactSection />
      <Footer />
      <StickyCTAButton />
      <AdminDashboard />
    </div>
  );
};

export default Index;
