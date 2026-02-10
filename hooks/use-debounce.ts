import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  // Derived state: if value !== debouncedValue, we are currently "debouncing"
  const isDebouncing = value !== debouncedValue;

  return { debouncedValue, isDebouncing };
}
