"use client";

import Image from "next/image";
import { motion, MotionValue, useTransform } from "framer-motion";
import styles from "./Hero.module.css";

interface FloatingItemsProps {
  scrollYProgress: MotionValue<number>;
  reducedMotion: boolean;
}

/**
 * The hero cutout (transparent PNG in /img/hero). It has:
 *  - a CSS idle-float keyframe loop (on the inner img)
 *  - a scroll-tied parallax offset (on the outer motion wrapper) so it
 *    drifts slower than page scroll. Parallax is disabled for reduced motion.
 */
export default function FloatingItems({
  scrollYProgress,
  reducedMotion,
}: FloatingItemsProps) {
  const yMain = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <div className={styles.heroRight} aria-hidden="true">
      {/* rescued groceries cart */}
      <motion.div
        className={styles.floatMainPos}
        style={{ y: reducedMotion ? 0 : yMain }}
      >
        <Image
          className={styles.floatMain}
          src="/img/hero/cart-v2.png"
          alt=""
          width={640}
          height={824}
          priority
        />
      </motion.div>
    </div>
  );
}
