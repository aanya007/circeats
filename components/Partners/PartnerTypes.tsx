"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import styles from "./PartnerTypes.module.css";

const types = [
  {
    title: "Supermarkets & grocers",
    body: "List near-expiry stock and turn shrink into same-day revenue — no new workflows, no logistics. This is the core of the circle.",
    link: { label: "For Supermarkets →", href: "/supermarkets" },
  },
  {
    title: "Community organisations",
    body: "Food-rescue groups and community kitchens extend the circle to what doesn't sell — so surplus feeds people, not landfills.",
  },
  {
    title: "Sustainability teams",
    body: "Corporates and agencies working on Singapore's Zero Waste goals get measurable, item-level landfill diversion data to build on.",
  },
];

export default function PartnerTypes() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className={styles.section}>
      <div className="section-head">
        <h2 className="display">
          WHO WE
          <br />
          BUILD WITH.
        </h2>
      </div>
      <div
        ref={ref}
        className={[styles.grid, inView ? styles.inView : ""].join(" ")}
      >
        {types.map((t) => (
          <div className={styles.card} key={t.title}>
            <h3>{t.title}</h3>
            <p>{t.body}</p>
            {t.link && (
              <a href={t.link.href} className={styles.link}>
                {t.link.label}
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
