import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import TikTokSection from "@/components/TikTokSection";
import BookingForm from "@/components/BookingForm";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <TikTokSection />
      <BookingForm />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
