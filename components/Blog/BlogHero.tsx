import styles from "./BlogHero.module.css";

export default function BlogHero() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={`eyebrow ${styles.eyebrow}`}>Blog</div>
        <h1 className={`display ${styles.h1}`}>
          NOTES FROM
          <br />
          THE <span className={styles.accent}>CIRCLE.</span>
        </h1>
        <p className={styles.copy}>
          Food waste, rescued groceries, and the system we&apos;re building to
          keep Singapore&apos;s dinners out of the landfill.
        </p>
      </div>
    </section>
  );
}
