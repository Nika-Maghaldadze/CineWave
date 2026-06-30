import { motion, type Variants } from 'framer-motion';
import MovieCard from '@/components/movies/MovieCard/MovieCard';
import type { Movie } from '@/types/movie';
import styles from './MovieGrid.module.scss';

interface MovieGridProps {
  movies: Movie[];
}

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function MovieGrid({ movies }: MovieGridProps) {
  return (
    <motion.div
      className={styles.grid}
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {movies.map((movie) => (
        <motion.div key={movie.id} variants={itemVariants}>
          <MovieCard movie={movie} />
        </motion.div>
      ))}
    </motion.div>
  );
}
