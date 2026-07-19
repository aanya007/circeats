import DemoButton from "../Demo/DemoButton";
import styles from "./SupermarketsHero.module.css";

export default function SupermarketsHero() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={`eyebrow ${styles.eyebrow}`}>For Supermarkets</div>
        <h1 className={`display ${styles.h1}`}>
          TURN NEAR-EXPIRY
          <br />
          STOCK INTO
          <br />
          <span className={styles.accent}>REVENUE.</span>
        </h1>
        <p className={styles.copy}>
          CircEats lists your near-expiry inventory to nearby shoppers at
          30–70% off — sold before it hits the bin, picked up in-store, with
          zero new logistics.
        </p>
        <div className={styles.ctaRow}>
          <DemoButton />
          <a href="/" className={styles.linkUnderline}>
            For Shoppers →
          </a>
        </div>
      </div>
    </section>
  );
}
