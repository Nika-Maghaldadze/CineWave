import { Clapperboard } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import styles from './Logo.module.scss';

interface LogoProps {
  size?: number;
}

export default function Logo({ size = 24 }: LogoProps) {
  const { t } = useTranslation();

  return (
    <span className={styles.logo}>
      <Clapperboard size={size} className={styles.mark} aria-hidden="true" />
      <span className={styles.wordmark}>{t('nav.brand')}</span>
    </span>
  );
}
