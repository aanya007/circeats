import styles from "./ContactHero.module.css";

export default function ContactHero() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={`eyebrow ${styles.eyebrow}`}>Contact</div>
        <h1 className={`display ${styles.h1}`}>
          SAY <span className={styles.accent}>HELLO.</span>
        </h1>
        <p className={styles.copy}>
          Shopper, supermarket, partner, or press — tell us who you are and
          we&apos;ll point you the right way.
        </p>
      </div>
    </section>
  );
}
