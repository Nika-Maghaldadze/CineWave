import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import styles from './NotFound.module.scss';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className={`container ${styles.wrapper}`}>
      <motion.h1
        className={styles.code}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 12 }}
      >
        404
      </motion.h1>
      <h2 className={styles.title}>{t('notFound.title')}</h2>
      <p className={styles.message}>{t('notFound.message')}</p>
      <Link to="/" className={styles.homeLink}>
        {t('notFound.goHome')}
      </Link>
    </div>
  );
}
