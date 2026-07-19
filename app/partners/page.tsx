import type { Metadata } from "next";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import PartnersHero from "@/components/Partners/PartnersHero";
import PartnerTypes from "@/components/Partners/PartnerTypes";
import PartnerCta from "@/components/Partners/PartnerCta";

export const metadata: Metadata = {
  title: "Partners — CircEats",
  description:
    "Supermarkets, community organisations, and sustainability teams building Singapore's surplus food circle with CircEats.",
};

export default function PartnersPage() {
  return (
    <main>
      <Nav />
      <PartnersHero />
      <PartnerTypes />
      <PartnerCta />
      <Footer />
    </main>
  );
}
