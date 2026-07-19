"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import DemoButton from "../Demo/DemoButton";
import styles from "./PartnerCta.module.css";

export default function PartnerCta() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className={styles.section}>
      <div
        ref={ref}
        className={[styles.inner, inView ? styles.inView : ""].join(" ")}
      >
        <h2 className={`display ${styles.heading}`}>
          WASTE IS A SYSTEM FAILURE.
          <br />
          <span className={styles.lime}>SO WE&apos;RE BUILDING A SYSTEM.</span>
        </h2>
        <p className={styles.para}>
          If your organisation touches food, community, or sustainability in
          Singapore, there&apos;s a place for you in the circle.
        </p>
        <DemoButton variant="lime">Partner With Us →</DemoButton>
      </div>
    </section>
  );
}
