"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import WaitlistButton from "../Waitlist/WaitlistButton";
import FloatingItems from "./FloatingItems";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import styles from "./Hero.module.css";

export default function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // Overlay fades in during the last 45% of the pin scroll (wireframe: fadeStart 0.55)
  const overlayOpacity = useTransform(scrollYProgress, [0.55, 1], [0, 1]);

  return (
    <div className={styles.pinWrapper} ref={wrapperRef}>
      <div className={styles.heroContent}>
        <div className={styles.heroGrid}>
          <div className={styles.heroLeft}>
            <div className={`eyebrow ${styles.eyebrow}`}>
              Singapore&apos;s Surplus Food Platform
            </div>
            <h1 className={`display ${styles.h1}`}>
              RESCUE
              <br />
              GROCERIES.
              <br />
              NOT <span className={styles.accent}>LANDFILLS.</span>
            </h1>
            <p className={styles.copy}>
              Singapore supermarkets sell near-expiry groceries at 30–70% off,
              before they hit the bin.
            </p>
            <div className={styles.ctaRow}>
              <WaitlistButton variant="primary" />
              <a href="/supermarkets" className={styles.linkUnderline}>
                For Supermarkets →
              </a>
            </div>
          </div>
          <FloatingItems
            scrollYProgress={scrollYProgress}
            reducedMotion={reduced}
          />
        </div>
        <motion.div
          className={styles.fadeOverlay}
          style={{ opacity: overlayOpacity }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
