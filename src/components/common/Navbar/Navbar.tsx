import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useFavorites } from '@/context/FavoritesContext';
import Logo from '@/components/common/Logo/Logo';
import ThemeToggle from '@/components/common/ThemeToggle/ThemeToggle';
import LanguageSwitcher from '@/components/common/LanguageSwitcher/LanguageSwitcher';
import styles from './Navbar.module.scss';

export default function Navbar() {
  const { t } = useTranslation();
  const { favorites } = useFavorites();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  const links = (
    <>
      <NavLink to="/" end className={navLinkClass} onClick={closeMenu}>
        {t('nav.home')}
      </NavLink>
      <NavLink to="/favorites" className={navLinkClass} onClick={closeMenu}>
        {t('nav.favorites')}
        {favorites.length > 0 && (
          <span className={styles.badge}>{favorites.length}</span>
        )}
      </NavLink>
    </>
  );

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.brand} onClick={closeMenu}>
          <Logo size={26} />
        </Link>

        <nav className={styles.desktopNav}>{links}</nav>

        <div className={styles.controls}>
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className={styles.mobileNav}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className={`container ${styles.mobileLinks}`}>{links}</div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
