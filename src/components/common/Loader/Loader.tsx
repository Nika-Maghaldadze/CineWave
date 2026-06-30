import { useTranslation } from 'react-i18next';
import styles from './Loader.module.scss';

interface LoaderProps {
  label?: string;
}

export default function Loader({ label }: LoaderProps) {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper} role="status" aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      <span className={styles.label}>{label ?? t('common.loading')}</span>
    </div>
  );
}
