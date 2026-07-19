import type { Metadata } from "next";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import SupermarketsHero from "@/components/Supermarkets/SupermarketsHero";
import ValueProps from "@/components/Supermarkets/ValueProps";
import ImpactBand from "@/components/Supermarkets/ImpactBand";
import MerchantSteps from "@/components/Supermarkets/MerchantSteps";
import DemoCta from "@/components/Supermarkets/DemoCta";

export const metadata: Metadata = {
  title: "For Supermarkets — CircEats",
  description:
    "Turn near-expiry stock into revenue overnight. No new workflows, RSA compliance, and ESG reporting from one dashboard.",
};

export default function SupermarketsPage() {
  return (
    <main>
      <Nav />
      <SupermarketsHero />
      <ValueProps />
      <ImpactBand />
      <MerchantSteps />
      <DemoCta />
      <Footer />
    </main>
  );
}
