import { Search, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const { t } = useTranslation();

  return (
    <div className={styles.search}>
      <Search className={styles.icon} size={18} aria-hidden="true" />
      <input
        type="search"
        className={styles.input}
        placeholder={t('nav.searchPlaceholder')}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={t('nav.searchPlaceholder')}
      />
      {value && (
        <button
          className={styles.clear}
          onClick={() => onChange('')}
          aria-label={t('common.close')}
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
