"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import styles from "./ContactChannels.module.css";

const channels = [
  {
    title: "Shoppers",
    body: "We're launching soon. Join the waitlist on the home page and you'll hear from us the moment the first rescues go live.",
    link: { label: "Join the waitlist →", href: "/" },
  },
  {
    title: "Supermarkets",
    body: "Want to see your near-expiry stock selling instead of sitting? Book a demo — we'll walk through it with your inventory.",
    link: { label: "For Supermarkets →", href: "/supermarkets" },
  },
  {
    title: "Partners & press",
    body: "Community organisations, sustainability teams, and journalists — see how the circle fits together, then drop us a line.",
    link: { label: "Partners →", href: "/partners" },
  },
];

export default function ContactChannels() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className={styles.section}>
      <div
        ref={ref}
        className={[styles.grid, inView ? styles.inView : ""].join(" ")}
      >
        {channels.map((c) => (
          <div className={styles.card} key={c.title}>
            <h3>{c.title}</h3>
            <p>{c.body}</p>
            <a href={c.link.href} className={styles.link}>
              {c.link.label}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
