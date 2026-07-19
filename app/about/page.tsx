import type { Metadata } from "next";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import AboutHero from "@/components/About/AboutHero";
import StorySection from "@/components/About/StorySection";
import BeliefBand from "@/components/About/BeliefBand";
import DifferenceSection from "@/components/About/DifferenceSection";
import AboutCta from "@/components/About/AboutCta";

export const metadata: Metadata = {
  title: "About — CircEats",
  description:
    "Singapore's surplus food platform. Supermarkets sell near-expiry groceries at 30–70% off before they hit the bin.",
};

export default function AboutPage() {
  return (
    <main>
      <Nav />
      <AboutHero />
      <StorySection />
      <BeliefBand />
      <DifferenceSection />
      <AboutCta />
      <Footer />
    </main>
  );
}
