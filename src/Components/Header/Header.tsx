import React from "react";
import styles from "./Header.module.css";
import { useState } from "react";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenuOnLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <a href="#Type">
          <span>Kiw</span>Type
        </a>
      </div>
      <button className={styles.menuToggle} onClick={toggleMenu}>
        <span className={styles.hamburger}></span>
      </button>
      <nav className={`${styles.nav} ${menuOpen ? styles.open : ""}`}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <a
              href="#Type"
              className={styles.navLink}
              onClick={closeMenuOnLinkClick}
            >
              Type
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
