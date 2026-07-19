import StepRow from "../HowItWorks/StepRow";
import styles from "../HowItWorks/HowItWorks.module.css";

const steps = [
  {
    num: "01",
    title: "List",
    body: "Flag near-expiry SKUs with photos, condition, and price — the AI discount engine suggests the discount that sells.",
  },
  {
    num: "02",
    title: "Sell",
    body: "Nearby shoppers reserve exactly what they want. No mystery bags, no markdowns sitting on the shelf.",
  },
  {
    num: "03",
    title: "Hand Over",
    body: "Customers collect in-store. You track diverted stock and revenue recovered from one dashboard.",
  },
];

export default function MerchantSteps() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className="section-head" style={{ marginBottom: 20 }}>
          <h2 className="display">
            LIVE IN
            <br />
            THREE STEPS.
          </h2>
        </div>
        {steps.map((s) => (
          <StepRow key={s.num} {...s} />
        ))}
      </div>
    </section>
  );
}
