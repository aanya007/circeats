"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import styles from "./Hero.module.css";

interface FloatingItemsProps {
  scrollYProgress: MotionValue<number>;
  reducedMotion: boolean;
}

/**
 * The 4 hero SVGs. Each has:
 *  - a CSS idle-float keyframe loop (independent timing, on the inner svg)
 *  - a scroll-tied parallax offset (on the outer motion wrapper) so items
 *    drift slower than page scroll. Parallax is disabled for reduced motion.
 * SVG viewBox/path data ported verbatim from the wireframe.
 */
export default function FloatingItems({
  scrollYProgress,
  reducedMotion,
}: FloatingItemsProps) {
  const yMain = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const ySat1 = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const ySat2 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const yTag = useTransform(scrollYProgress, [0, 1], [0, -180]);

  const y = (v: MotionValue<number>) => (reducedMotion ? 0 : v);

  return (
    <div className={styles.heroRight} aria-hidden="true">
      {/* main floating basket */}
      <motion.div className={styles.floatMainPos} style={{ y: y(yMain) }}>
        <svg className={styles.floatMain} viewBox="0 0 300 260" fill="none">
          <ellipse cx="150" cy="245" rx="90" ry="10" fill="#000" opacity="0.06" />
          <path
            d="M60 90 L240 90 L220 220 Q218 235 200 235 L100 235 Q82 235 80 220 Z"
            fill="#F7F5F2"
            stroke="#0F0F0F"
            strokeWidth="3"
          />
          <path
            d="M85 90 Q90 40 150 40 Q210 40 215 90"
            fill="none"
            stroke="#0F0F0F"
            strokeWidth="3"
          />
          <ellipse cx="110" cy="80" rx="26" ry="24" fill="#E85D2F" />
          <ellipse cx="160" cy="72" rx="30" ry="28" fill="#3D8B5F" />
          <ellipse cx="195" cy="88" rx="22" ry="20" fill="#C8F169" />
          <rect x="120" y="95" width="40" height="50" rx="4" fill="#FFFFFF" stroke="#0F0F0F" strokeWidth="2" />
          <circle cx="85" cy="105" r="16" fill="#F0C419" />
        </svg>
      </motion.div>

      {/* satellite: produce item */}
      <motion.div className={styles.floatSat1Pos} style={{ y: y(ySat1) }}>
        <svg className={styles.floatSat1} viewBox="0 0 110 110" fill="none">
          <ellipse cx="55" cy="100" rx="30" ry="6" fill="#000" opacity="0.08" />
          <circle cx="55" cy="55" r="38" fill="#3D8B5F" stroke="#0F0F0F" strokeWidth="2.5" />
          <path
            d="M55 18 Q60 6 68 12"
            stroke="#0F0F0F"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* satellite: milk/bread item */}
      <motion.div className={styles.floatSat2Pos} style={{ y: y(ySat2) }}>
        <svg className={styles.floatSat2} viewBox="0 0 130 130" fill="none">
          <ellipse cx="65" cy="118" rx="34" ry="6" fill="#000" opacity="0.08" />
          <rect x="35" y="30" width="60" height="80" rx="8" fill="#FFFFFF" stroke="#0F0F0F" strokeWidth="2.5" />
          <path d="M35 30 L65 12 L95 30" fill="#F0C419" stroke="#0F0F0F" strokeWidth="2.5" />
          <rect x="50" y="55" width="30" height="18" rx="2" fill="#E85D2F" />
        </svg>
      </motion.div>

      {/* discount tag */}
      <motion.div className={styles.floatTagPos} style={{ y: y(yTag) }}>
        <svg className={styles.floatTag} viewBox="0 0 90 90" fill="none">
          <path
            d="M10 45 L45 10 L80 20 L70 55 L45 80 Z"
            fill="#C8F169"
            stroke="#0F0F0F"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <text
            x="45"
            y="50"
            fontFamily="var(--font-grotesk), sans-serif"
            fontWeight="800"
            fontSize="20"
            fill="#0F0F0F"
            textAnchor="middle"
          >
            -45%
          </text>
          <circle cx="30" cy="30" r="4" fill="#0F0F0F" />
        </svg>
      </motion.div>
    </div>
  );
}
