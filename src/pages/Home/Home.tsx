import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  getGenres,
  getMoviesByGenre,
  getPopular,
  getTrending,
  searchMovies,
} from '@/api/moviesApi';
import { useDebounce } from '@/hooks/useDebounce';
import { useFetch } from '@/hooks/useFetch';
import { usePaginatedMovies } from '@/hooks/usePaginatedMovies';
import { STORAGE_KEYS } from '@/utils/constants';
import PageTransition from '@/components/common/PageTransition/PageTransition';
import SearchBar from '@/components/movies/SearchBar/SearchBar';
import GenreFilter from '@/components/movies/GenreFilter/GenreFilter';
import MovieGrid from '@/components/movies/MovieGrid/MovieGrid';
import Loader from '@/components/common/Loader/Loader';
import ErrorMessage from '@/components/common/ErrorMessage/ErrorMessage';
import styles from './Home.module.scss';

export default function Home() {
  const { t } = useTranslation();

  const [query, setQuery] = useState(
    () => sessionStorage.getItem(STORAGE_KEYS.lastSearch) ?? '',
  );
  const debouncedQuery = useDebounce(query, 500);
  const [activeGenreId, setActiveGenreId] = useState<number | null>(null);

  const isSearching = debouncedQuery.trim().length > 0;

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEYS.lastSearch, debouncedQuery);
  }, [debouncedQuery]);

  const { data: genres } = useFetch(getGenres, []);
  const trending = useFetch(() => getTrending(), []);

  const browseFetcher = useCallback(
    (page: number) => {
      if (isSearching) return searchMovies(debouncedQuery, page);
      if (activeGenreId) return getMoviesByGenre(activeGenreId, page);
      return getPopular(page);
    },
    [isSearching, debouncedQuery, activeGenreId],
  );

  const {
    movies: browseMovies,
    loading: browseLoading,
    loadingMore,
    error: browseError,
    hasMore,
    loadMore,
    retry: retryBrowse,
  } = usePaginatedMovies(browseFetcher, [debouncedQuery, activeGenreId]);

  const showTrending = !isSearching && activeGenreId === null;

  const browseHeading = useMemo(() => {
    if (isSearching) {
      return t('home.searchResultsFor', { query: debouncedQuery });
    }
    if (activeGenreId) {
      const genre = genres?.find((item) => item.id === activeGenreId);
      return genre?.name ?? t('home.popular');
    }
    return t('home.popular');
  }, [isSearching, debouncedQuery, activeGenreId, genres, t]);

  return (
    <PageTransition>
      <section className={`container ${styles.hero}`}>
        <h1 className={styles.heroTitle}>{t('home.heroTitle')}</h1>
        <p className={styles.heroSubtitle}>{t('home.heroSubtitle')}</p>
        <SearchBar value={query} onChange={setQuery} />
      </section>

      <div className="container">
        {showTrending && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('home.trending')}</h2>
            {trending.loading && <Loader />}
            {trending.error && (
              <ErrorMessage message={trending.error} onRetry={trending.refetch} />
            )}
            {trending.data && <MovieGrid movies={trending.data} />}
          </section>
        )}

        {genres && genres.length > 0 && !isSearching && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('home.browseByGenre')}</h2>
            <GenreFilter
              genres={genres}
              activeGenreId={activeGenreId}
              onSelect={setActiveGenreId}
            />
          </section>
        )}

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{browseHeading}</h2>

          {browseLoading && <Loader />}

          {!browseLoading && browseError && (
            <ErrorMessage message={browseError} onRetry={retryBrowse} />
          )}

          {!browseLoading && !browseError && browseMovies.length === 0 && (
            <p className={styles.noResults}>{t('home.noResults')}</p>
          )}

          {!browseLoading && browseMovies.length > 0 && (
            <>
              <MovieGrid movies={browseMovies} />
              {hasMore && (
                <div className={styles.loadMoreWrap}>
                  <motion.button
                    className={styles.loadMore}
                    onClick={loadMore}
                    disabled={loadingMore}
                    whileTap={{ scale: 0.96 }}
                  >
                    {loadingMore ? t('common.loading') : t('home.loadMore')}
                  </motion.button>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </PageTransition>
  );
}
