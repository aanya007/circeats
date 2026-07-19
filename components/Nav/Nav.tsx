"use client";

import { useEffect, useState } from "react";
import LogoMark from "../ui/LogoMark";
import styles from "./Nav.module.css";

const links = [
  { label: "About", href: "/about" },
  { label: "How It Works", href: "/#how" },
  { label: "For Supermarkets", href: "/supermarkets" },
  { label: "Partners", href: "/partners" },
  { label: "Blog", href: "#" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={[
        styles.nav,
        scrolled || menuOpen ? styles.scrolled : "",
      ].join(" ")}
    >
      <a href="/" className={styles.logoMark} aria-label="CircEats home">
        <LogoMark />
        <span className={styles.logoText}>CircEats</span>
      </a>

      <div className={styles.navLinks}>
        {links.map((l) => (
          <a key={l.label} href={l.href}>
            {l.label}
          </a>
        ))}
      </div>

      <div className={styles.right}>
        <button className={styles.navCta}>Join Waitlist</button>
        <button
          className={styles.hamburger}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className={menuOpen ? styles.barTopOpen : styles.bar} />
          <span className={menuOpen ? styles.barMidOpen : styles.bar} />
          <span className={menuOpen ? styles.barBotOpen : styles.bar} />
        </button>
      </div>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          {links.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
