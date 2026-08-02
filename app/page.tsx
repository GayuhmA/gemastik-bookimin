import TopAnnouncement from "@/components/TopAnnouncement";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DividerBanner from "@/components/DividerBanner";
import Services from "@/components/Services";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <TopAnnouncement />
      <Navbar />
      <main className="flex-1 flex flex-col w-full">
        <Hero />
        <DividerBanner />
        <Services />
      </main>
      <Footer />
    </>
  );
}
