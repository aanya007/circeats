import LogoMark from "../ui/LogoMark";
import styles from "./Footer.module.css";

const cols = [
  {
    title: "Company",
    links: ["About", "How It Works", "Blog"],
  },
  {
    title: "Business",
    links: ["For Supermarkets", "Partners", "Contact"],
  },
  {
    title: "Follow",
    links: ["Instagram", "LinkedIn", "TikTok"],
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div>
          <div className={styles.logoMark}>
            <LogoMark variant="footer" />
            <span className={styles.logoText}>CircEats</span>
          </div>
          <div className={styles.tagline}>Too good to bin.</div>
        </div>
        <div className={styles.cols}>
          {cols.map((col) => (
            <div className={styles.col} key={col.title}>
              <h4>{col.title}</h4>
              {col.links.map((label) => (
                <a
                  key={label}
                  href={label === "For Supermarkets" ? "/supermarkets" : "#"}
                >
                  {label}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.bottom}>
        <span>© 2026 CircEats. Made in Singapore.</span>
        <span>Join the circle. Save the food.</span>
      </div>
    </footer>
  );
}
