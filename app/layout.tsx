import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { WaitlistProvider } from "@/components/Waitlist/WaitlistContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  // Space Grotesk's heaviest weight is 700 — the wireframe's request for 800
  // was silently served as 700 by Google Fonts, so 700 is the true reference.
  weight: ["400", "500", "700"],
  variable: "--font-grotesk",
});

export const metadata: Metadata = {
  title: "CircEats — Rescue Groceries, Not Landfills",
  description:
    "Singapore supermarkets sell near-expiry groceries at 30–70% off, before they hit the bin.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <WaitlistProvider>{children}</WaitlistProvider>
      </body>
    </html>
  );
}
