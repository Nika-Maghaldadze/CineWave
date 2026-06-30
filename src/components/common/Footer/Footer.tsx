import { useTranslation } from 'react-i18next';
import Logo from '@/components/common/Logo/Logo';
import styles from './Footer.module.scss';

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <span className={styles.brand}>
          <Logo size={22} />
        </span>
        <p className={styles.tagline}>{t('footer.tagline')}</p>
        <small className={styles.copy}>
          © {year} CineWave. {t('footer.rights')}
        </small>
      </div>
    </footer>
  );
}
