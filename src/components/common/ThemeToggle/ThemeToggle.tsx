import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/context/ThemeContext';
import styles from './ThemeToggle.module.scss';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const isDark = theme === 'dark';

  return (
    <button
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={t('a11y.toggleTheme')}
      title={t('a11y.toggleTheme')}
    >
      <motion.span
        key={theme}
        className={styles.icon}
        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? <Moon size={18} /> : <Sun size={18} />}
      </motion.span>
    </button>
  );
}
