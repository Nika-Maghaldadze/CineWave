import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.scss';

const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'ka', label: 'ქარ' },
] as const;

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const current = i18n.resolvedLanguage ?? i18n.language;

  return (
    <div
      className={styles.switcher}
      role="group"
      aria-label={t('a11y.changeLanguage')}
    >
      {LANGUAGES.map(({ code, label }) => (
        <button
          key={code}
          className={`${styles.lang} ${current === code ? styles.active : ''}`}
          onClick={() => i18n.changeLanguage(code)}
          aria-pressed={current === code}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
