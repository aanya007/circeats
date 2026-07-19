import styles from "./AboutHero.module.css";

export default function AboutHero() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={`eyebrow ${styles.eyebrow}`}>About CircEats</div>
        <h1 className={`display ${styles.h1}`}>
          TOO GOOD
          <br />
          TO <span className={styles.accent}>BIN.</span>
        </h1>
        <p className={styles.copy}>
          CircEats is Singapore&apos;s surplus food platform — a smarter way
          for supermarkets to sell perfectly good groceries before the clock
          runs out, and for you to buy them at 30–70% off.
        </p>
      </div>
    </section>
  );
}
