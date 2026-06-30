import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/utils/constants';
import type { Movie } from '@/types/movie';

interface FavoritesContextValue {
  favorites: Movie[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (movie: Movie) => void;
  removeFavorite: (id: number) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined,
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useLocalStorage<Movie[]>(
    STORAGE_KEYS.favorites,
    [],
  );

  const isFavorite = useCallback(
    (id: number) => favorites.some((movie) => movie.id === id),
    [favorites],
  );

  const toggleFavorite = useCallback(
    (movie: Movie) => {
      setFavorites((prev) =>
        prev.some((item) => item.id === movie.id)
          ? prev.filter((item) => item.id !== movie.id)
          : [movie, ...prev],
      );
    },
    [setFavorites],
  );

  const removeFavorite = useCallback(
    (id: number) => {
      setFavorites((prev) => prev.filter((item) => item.id !== id));
    },
    [setFavorites],
  );

  const value = useMemo(
    () => ({ favorites, isFavorite, toggleFavorite, removeFavorite }),
    [favorites, isFavorite, toggleFavorite, removeFavorite],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites(): FavoritesContextValue {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
