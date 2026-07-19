"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import styles from "./EmailBand.module.css";

/* Interim address — swap for the branded inbox before launch. */
const CONTACT_EMAIL = "aanya@u.nus.edu";

export default function EmailBand() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className={styles.section}>
      <div
        ref={ref}
        className={[styles.inner, inView ? styles.inView : ""].join(" ")}
      >
        <div className={`eyebrow ${styles.eyebrow}`}>
          For everything else
        </div>
        <a href={`mailto:${CONTACT_EMAIL}`} className={`display ${styles.email}`}>
          {CONTACT_EMAIL}
        </a>
        <p className={styles.note}>
          One inbox, read by humans. We reply within two working days.
        </p>
      </div>
    </section>
  );
}
