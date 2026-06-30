import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Play, Star, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getMovieDetails } from '@/api/moviesApi';
import { useFetch } from '@/hooks/useFetch';
import { useFavorites } from '@/context/FavoritesContext';
import {
  getBackdropUrl,
  getPosterUrl,
  getProfileUrl,
} from '@/utils/constants';
import PageTransition from '@/components/common/PageTransition/PageTransition';
import Loader from '@/components/common/Loader/Loader';
import ErrorMessage from '@/components/common/ErrorMessage/ErrorMessage';
import MovieGrid from '@/components/movies/MovieGrid/MovieGrid';
import TrailerModal from '@/components/movies/TrailerModal/TrailerModal';
import styles from './MovieDetails.module.scss';

export default function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const movieId = Number(id);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isTrailerOpen, setTrailerOpen] = useState(false);

  const { data: movie, loading, error, refetch } = useFetch(
    () => getMovieDetails(movieId),
    [movieId],
  );

  if (loading) return <Loader />;
  if (error || !movie) {
    return <ErrorMessage message={error ?? undefined} onRetry={refetch} />;
  }

  const backdrop = getBackdropUrl(movie.backdrop_path);
  const poster = getPosterUrl(movie.poster_path, 'w500');
  const favorite = isFavorite(movie.id);
  const year = movie.release_date ? movie.release_date.slice(0, 4) : '—';

  const trailer =
    movie.videos?.results.find(
      (video) => video.site === 'YouTube' && video.type === 'Trailer',
    ) ?? movie.videos?.results.find((video) => video.site === 'YouTube');

  const cast = movie.credits?.cast.slice(0, 8) ?? [];
  const similar = movie.similar?.results.slice(0, 12) ?? [];

  return (
    <PageTransition>
      <article>
        <div
          className={styles.backdrop}
          style={
            backdrop ? { backgroundImage: `url(${backdrop})` } : undefined
          }
        >
          <div className={styles.backdropOverlay} />
          <div className={`container ${styles.hero}`}>
            <button className={styles.back} onClick={() => navigate(-1)}>
              <ArrowLeft size={16} /> {t('movie.back')}
            </button>

            <div className={styles.heroBody}>
              {poster && (
                <motion.img
                  src={poster}
                  alt={movie.title}
                  className={styles.poster}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                />
              )}

              <div className={styles.meta}>
                <h1 className={styles.title}>
                  {movie.title} <span className={styles.year}>({year})</span>
                </h1>
                {movie.tagline && (
                  <p className={styles.tagline}>{movie.tagline}</p>
                )}

                <div className={styles.facts}>
                  <span className={styles.rating}>
                    <Star size={16} fill="currentColor" />
                    {movie.vote_average.toFixed(1)}
                  </span>
                  {movie.runtime ? (
                    <span>{t('movie.minutes', { value: movie.runtime })}</span>
                  ) : null}
                  <span>{movie.release_date || '—'}</span>
                </div>

                <div className={styles.genres}>
                  {movie.genres.map((genre) => (
                    <span key={genre.id} className={styles.genre}>
                      {genre.name}
                    </span>
                  ))}
                </div>

                <div className={styles.actions}>
                  <button
                    className={styles.trailerBtn}
                    onClick={() => setTrailerOpen(true)}
                  >
                    <Play size={18} fill="currentColor" /> {t('movie.watchTrailer')}
                  </button>
                  <button
                    className={`${styles.favBtn} ${favorite ? styles.favActive : ''}`}
                    onClick={() => toggleFavorite(movie)}
                    aria-pressed={favorite}
                  >
                    <Heart size={18} fill={favorite ? 'currentColor' : 'none'} />{' '}
                    {favorite
                      ? t('movie.removeFromFavorites')
                      : t('movie.addToFavorites')}
                  </button>
                </div>

                <div className={styles.overview}>
                  <h2>{t('movie.overview')}</h2>
                  <p>{movie.overview}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          {cast.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>{t('movie.cast')}</h2>
              <div className={styles.castRow}>
                {cast.map((member) => {
                  const photo = getProfileUrl(member.profile_path);
                  return (
                    <div key={member.id} className={styles.castCard}>
                      {photo ? (
                        <img
                          src={photo}
                          alt={member.name}
                          loading="lazy"
                          className={styles.castPhoto}
                        />
                      ) : (
                        <div className={styles.castPhotoFallback}>
                          <User size={32} />
                        </div>
                      )}
                      <span className={styles.castName}>{member.name}</span>
                      <span className={styles.castChar}>{member.character}</span>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {similar.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>{t('movie.similar')}</h2>
              <MovieGrid movies={similar} />
            </section>
          )}
        </div>
      </article>

      <TrailerModal
        isOpen={isTrailerOpen}
        onClose={() => setTrailerOpen(false)}
        videoKey={trailer?.key ?? null}
        title={movie.title}
      />
    </PageTransition>
  );
}
