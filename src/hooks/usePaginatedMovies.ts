import { useCallback, useEffect, useRef, useState } from 'react';
import type { Movie, PaginatedResponse } from '@/types/movie';

interface PaginatedMoviesState {
  movies: Movie[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  retry: () => void;
}

export function usePaginatedMovies(
  fetcher: (page: number) => Promise<PaginatedResponse<Movie>>,
  deps: readonly unknown[] = [],
): PaginatedMoviesState {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestIdRef = useRef(0);

  const fetchPage = useCallback(
    async (pageToFetch: number, replace: boolean) => {
      const requestId = ++requestIdRef.current;
      if (replace) setLoading(true);
      else setLoadingMore(true);
      setError(null);

      try {
        const data = await fetcher(pageToFetch);
        if (requestId !== requestIdRef.current) return;
        setTotalPages(data.total_pages);
        setPage(pageToFetch);
        setMovies((prev) =>
          replace ? data.results : [...prev, ...data.results],
        );
      } catch (err) {
        if (requestId !== requestIdRef.current) return;
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        if (requestId === requestIdRef.current) {
          setLoading(false);
          setLoadingMore(false);
        }
      }
    },
    deps,
  );

  useEffect(() => {
    fetchPage(1, true);
  }, [fetchPage]);

  const loadMore = useCallback(() => {
    if (!loading && !loadingMore && page < totalPages) {
      fetchPage(page + 1, false);
    }
  }, [fetchPage, loading, loadingMore, page, totalPages]);

  const retry = useCallback(() => {
    fetchPage(1, true);
  }, [fetchPage]);

  return {
    movies,
    loading,
    loadingMore,
    error,
    hasMore: page < totalPages,
    loadMore,
    retry,
  };
}
