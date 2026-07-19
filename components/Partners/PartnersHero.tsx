import styles from "./PartnersHero.module.css";

export default function PartnersHero() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={`eyebrow ${styles.eyebrow}`}>Partners</div>
        <h1 className={`display ${styles.h1}`}>
          THE CIRCLE ONLY
          <br />
          WORKS <span className={styles.accent}>TOGETHER.</span>
        </h1>
        <p className={styles.copy}>
          Rescuing 755,000 tonnes a year isn&apos;t a one-company job.
          CircEats partners with the people who stock the shelves, move the
          community, and measure the impact.
        </p>
      </div>
    </section>
  );
}
