import type { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Film, Heart, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useFavorites } from '@/context/FavoritesContext';
import { getPosterUrl } from '@/utils/constants';
import type { Movie } from '@/types/movie';
import styles from './MovieCard.module.scss';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const { t } = useTranslation();
  const { isFavorite, toggleFavorite } = useFavorites();

  const favorite = isFavorite(movie.id);
  const poster = getPosterUrl(movie.poster_path);
  const year = movie.release_date ? movie.release_date.slice(0, 4) : '—';

  const handleFavoriteClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    toggleFavorite(movie);
  };

  return (
    <motion.article
      className={styles.card}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Link to={`/movie/${movie.id}`} className={styles.link}>
        <div className={styles.posterWrap}>
          {poster ? (
            <img
              src={poster}
              alt={movie.title}
              loading="lazy"
              className={styles.poster}
            />
          ) : (
            <div className={styles.noPoster} aria-hidden="true">
              <Film size={48} />
            </div>
          )}

          <span className={styles.rating}>
            <Star size={14} fill="currentColor" className={styles.star} />
            {movie.vote_average.toFixed(1)}
          </span>

          <button
            className={`${styles.favorite} ${favorite ? styles.favoriteActive : ''}`}
            onClick={handleFavoriteClick}
            aria-pressed={favorite}
            aria-label={
              favorite
                ? t('movie.removeFromFavorites')
                : t('movie.addToFavorites')
            }
          >
            <Heart size={18} fill={favorite ? 'currentColor' : 'none'} />
          </button>
        </div>

        <div className={styles.info}>
          <h3 className={styles.title}>{movie.title}</h3>
          <span className={styles.year}>{year}</span>
        </div>
      </Link>
    </motion.article>
  );
}
