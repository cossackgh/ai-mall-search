import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import InfoSection from "@/components/sections/InfoSection";
import ShopsSection from "@/components/sections/ShopsSection";
import FoodSection from "@/components/sections/FoodSection";
import EntertainmentSection from "@/components/sections/EntertainmentSection";
import CinemaSection from "@/components/sections/CinemaSection";
import EventsSection from "@/components/sections/EventsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ChatWidget from "@/components/chat/ChatWidget";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <InfoSection />
      <ShopsSection />
      <FoodSection />
      <EntertainmentSection />
      <CinemaSection />
      <EventsSection />
      <ServicesSection />
      <Footer />
      <ChatWidget />
    </main>
  );
}
