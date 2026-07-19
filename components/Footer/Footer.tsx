import LogoMark from "../ui/LogoMark";
import styles from "./Footer.module.css";

const cols = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "How It Works", href: "/#how" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Business",
    links: [
      { label: "For Supermarkets", href: "/supermarkets" },
      { label: "Partners", href: "/partners" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Follow",
    links: [
      { label: "Instagram", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "TikTok", href: "#" },
    ],
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
              {col.links.map((l) => (
                <a key={l.label} href={l.href}>
                  {l.label}
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
