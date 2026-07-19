import Nav from "@/components/Nav/Nav";
import Hero from "@/components/Hero/Hero";
import StatsStrip from "@/components/StatsStrip/StatsStrip";
import Carousel from "@/components/Carousel/Carousel";
import MissionSection from "@/components/MissionSection/MissionSection";
import HowItWorks from "@/components/HowItWorks/HowItWorks";
import PinnedStats from "@/components/PinnedStats/PinnedStats";
import Faq from "@/components/Faq/Faq";
import SupermarketTeaser from "@/components/SupermarketTeaser/SupermarketTeaser";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <StatsStrip />
      <Carousel />
      <MissionSection />
      <HowItWorks />
      <PinnedStats />
      <Faq />
      <SupermarketTeaser />
      <Footer />
    </main>
  );
}
