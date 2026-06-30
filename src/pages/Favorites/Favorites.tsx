import { Link } from 'react-router-dom';
import { Popcorn } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useFavorites } from '@/context/FavoritesContext';
import PageTransition from '@/components/common/PageTransition/PageTransition';
import MovieGrid from '@/components/movies/MovieGrid/MovieGrid';
import styles from './Favorites.module.scss';

export default function Favorites() {
  const { t } = useTranslation();
  const { favorites } = useFavorites();

  return (
    <PageTransition>
      <div className="container">
        <header className={styles.header}>
          <h1 className={styles.title}>{t('favorites.title')}</h1>
          {favorites.length > 0 && (
            <p className={styles.subtitle}>
              {t('favorites.subtitle', { value: favorites.length })}
            </p>
          )}
        </header>

        {favorites.length === 0 ? (
          <div className={styles.empty}>
            <Popcorn className={styles.emptyIcon} size={56} aria-hidden="true" />
            <h2 className={styles.emptyTitle}>{t('favorites.empty')}</h2>
            <p className={styles.emptyHint}>{t('favorites.emptyHint')}</p>
            <Link to="/" className={styles.browseLink}>
              {t('favorites.browse')}
            </Link>
          </div>
        ) : (
          <MovieGrid movies={favorites} />
        )}
      </div>
    </PageTransition>
  );
}
