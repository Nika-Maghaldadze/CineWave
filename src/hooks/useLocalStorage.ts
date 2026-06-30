import { useCallback, useEffect, useState } from 'react';

type SetValue<T> = (value: T | ((prev: T) => T)) => void;

export function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  const readValue = useCallback((): T => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`[useLocalStorage] Could not read "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue: SetValue<T> = useCallback(
    (value) => {
      setStoredValue((prev) => {
        const next = value instanceof Function ? value(prev) : value;
        try {
          window.localStorage.setItem(key, JSON.stringify(next));
        } catch (error) {
          console.warn(`[useLocalStorage] Could not write "${key}":`, error);
        }
        return next;
      });
    },
    [key],
  );

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === key && event.newValue) {
        setStoredValue(JSON.parse(event.newValue) as T);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [key]);

  return [storedValue, setValue];
}
