import { useTranslation } from 'react-i18next';
import type { Genre } from '@/types/movie';
import styles from './GenreFilter.module.scss';

interface GenreFilterProps {
  genres: Genre[];
  activeGenreId: number | null;
  onSelect: (genreId: number | null) => void;
}

export default function GenreFilter({
  genres,
  activeGenreId,
  onSelect,
}: GenreFilterProps) {
  const { t } = useTranslation();

  const chipClass = (isActive: boolean) =>
    `${styles.chip} ${isActive ? styles.active : ''}`;

  return (
    <div className={styles.filter} role="group">
      <button
        className={chipClass(activeGenreId === null)}
        onClick={() => onSelect(null)}
      >
        {t('home.allGenres')}
      </button>

      {genres.map((genre) => (
        <button
          key={genre.id}
          className={chipClass(activeGenreId === genre.id)}
          onClick={() => onSelect(genre.id)}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
}
