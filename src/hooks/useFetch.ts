import { useCallback, useEffect, useState } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useFetch<T>(
  fetcher: () => Promise<T>,
  deps: readonly unknown[] = [],
): FetchState<T> & { refetch: () => void } {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const [reloadKey, setReloadKey] = useState(0);
  const refetch = useCallback(() => setReloadKey((k) => k + 1), []);

  useEffect(() => {
    let active = true;
    setState({ data: null, loading: true, error: null });

    fetcher()
      .then((data) => {
        if (active) setState({ data, loading: false, error: null });
      })
      .catch((err: unknown) => {
        if (!active) return;
        const message =
          err instanceof Error ? err.message : 'Something went wrong';
        setState({ data: null, loading: false, error: message });
      });

    return () => {
      active = false;
    };
  }, [...deps, reloadKey]);

  return { ...state, refetch };
}
