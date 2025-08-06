import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import FiverrSection from "@/components/FiverrSection";
import BookingsBar from "@/components/BookingsBar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import AboutSection from "@/components/AboutSection";
import TikTokSection from "@/components/TikTokSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BookingForm from "@/components/BookingForm";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import StickyCTAButton from "@/components/StickyCTAButton";
import LiveChat from "@/components/LiveChat";
import BookingsModal from "@/components/BookingsModal";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";

const Index = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isBookingsModalOpen, setIsBookingsModalOpen] = useState(false);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <FiverrSection />
      <BookingsBar 
        user={user} 
        onBookingsClick={() => setIsBookingsModalOpen(true)}
      />
      <div className="pt-20">
        <HeroSection />
        <ServicesSection />
        <PortfolioSection />
        <AboutSection />
        <TikTokSection />
        <TestimonialsSection />
        <BookingForm />
        <ContactSection />
        <Footer />
      </div>
      <StickyCTAButton />
      <LiveChat />
      <BookingsModal 
        isOpen={isBookingsModalOpen} 
        onClose={() => setIsBookingsModalOpen(false)} 
        user={user} 
      />
    </div>
  );
};

export default Index;
