import Navbar from "@/components/home/Navbar";
import HeroSection from "@/components/home/HeroSection";
import BookingJourneySection from "@/components/home/BookingJourneySection";
import CemeteryRecommendationsSection from "@/components/home/CemeteryRecommendationsSection";
import BereavementCareSection from "@/components/home/BereavementCareSection";
import Footer from "@/components/home/Footer";
import FloatingAIChat from "@/components/home/FloatingAIChat";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-primary antialiased selection:bg-teal-100 selection:text-teal-900">
      <Navbar />

      <main className="flex-1 flex flex-col w-full">
        <HeroSection />

        <BookingJourneySection />

        <CemeteryRecommendationsSection />

        <BereavementCareSection />
      </main>

      <Footer />

      <FloatingAIChat />
    </div>
  );
}
