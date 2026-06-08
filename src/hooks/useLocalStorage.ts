import { useState, useCallback, Dispatch, SetStateAction } from "react";

/**
 * useLocalStorage — a custom state hook that syncs with localStorage.
 * It behaves exactly like `useState`, but persists the state across page reloads.
 *
 * Use-cases:
 *  • User preferences (theme, language)
 *  • Form draft saving (prevent data loss on refresh)
 *  • Persistence of persistent UI states (sidebar expanded/collapsed)
 *
 * @param key          The key under which to save the state in localStorage.
 * @param initialValue The default value (or a function returning it) if no value exists in localStorage.
 * @returns            A stateful value and a function to update it, matching useState's signature.
 *
 * Best-practice notes:
 *  1. Lazy Initialization: localStorage is read only once during the initial mount,
 *     preventing slow reads on subsequent renders.
 *  2. Functional Updates: Supports passing a function to the state setter, just like `useState`.
 *  3. Error Handling: Gracefully catches errors when localStorage is unavailable (e.g., private browsing, disabled cookies).
 */
function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T)
): [T, Dispatch<SetStateAction<T>>] {
  // 1. Initialize state, lazily reading from localStorage if it exists
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        return JSON.parse(item) as T;
      }
      
      // If no item exists, determine the default value
      return initialValue instanceof Function
        ? (initialValue as () => T)()
        : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue instanceof Function
        ? (initialValue as () => T)()
        : initialValue;
    }
  });

  // 2. Return a memoized setter function that persists new values to localStorage
  const setValue = useCallback(
    (value: SetStateAction<T>) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          value instanceof Function
            ? (value as (val: T) => T)(storedValue)
            : value;

        // Save state
        setStoredValue(valueToStore);

        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
}

export default useLocalStorage;
