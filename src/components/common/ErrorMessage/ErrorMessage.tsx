import { TriangleAlert } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper} role="alert">
      <TriangleAlert className={styles.icon} size={40} aria-hidden="true" />
      <p className={styles.message}>{message ?? t('common.error')}</p>
      {onRetry && (
        <button className={styles.retry} onClick={onRetry}>
          {t('common.retry')}
        </button>
      )}
    </div>
  );
}
