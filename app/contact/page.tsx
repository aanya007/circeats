import type { Metadata } from "next";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import ContactHero from "@/components/Contact/ContactHero";
import ContactChannels from "@/components/Contact/ContactChannels";
import EmailBand from "@/components/Contact/EmailBand";

export const metadata: Metadata = {
  title: "Contact — CircEats",
  description:
    "Get in touch with CircEats — shoppers, supermarkets, partners, and press.",
};

export default function ContactPage() {
  return (
    <main>
      <Nav />
      <ContactHero />
      <ContactChannels />
      <EmailBand />
      <Footer />
    </main>
  );
}
