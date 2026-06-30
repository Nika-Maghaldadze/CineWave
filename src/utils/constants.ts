export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const STORAGE_KEYS = {
  favorites: 'cinewave:favorites',
  theme: 'cinewave:theme',
  language: 'cinewave:language',
  lastSearch: 'cinewave:last-search',
} as const;

type PosterSize = 'w185' | 'w342' | 'w500' | 'original';
type BackdropSize = 'w780' | 'w1280' | 'original';

export const getPosterUrl = (
  path: string | null,
  size: PosterSize = 'w342',
): string | null => (path ? `${TMDB_IMAGE_BASE_URL}/${size}${path}` : null);

export const getBackdropUrl = (
  path: string | null,
  size: BackdropSize = 'w1280',
): string | null => (path ? `${TMDB_IMAGE_BASE_URL}/${size}${path}` : null);

export const getProfileUrl = (path: string | null): string | null =>
  path ? `${TMDB_IMAGE_BASE_URL}/w185${path}` : null;
