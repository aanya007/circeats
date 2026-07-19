"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import styles from "./MissionSection.module.css";

export default function MissionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className={styles.darkSection}>
      <div className={styles.inner} ref={ref}>
        <h2
          className={[
            "display",
            styles.heading,
            inView ? styles.inView : "",
          ].join(" ")}
        >
          WE&apos;RE NOT HERE TO
          <br />
          SELL YOU <span className={styles.strike}>SCRAPS.</span>{" "}
          <span className={styles.lime}>OPPORTUNITY.</span>
        </h2>
        <p className={[styles.para, inView ? styles.inView : ""].join(" ")}>
          We&apos;re here because Singapore throws away 755,000 tonnes of food a
          year — and almost half of everything we import ends up as waste. Not
          because it&apos;s bad. Because there&apos;s no smart system to sell it
          before the clock runs out. CircEats is that system.
        </p>
      </div>
    </section>
  );
}
