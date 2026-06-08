import { useEffect, useState } from "react";

/**
 * useDebounce — delays updating the returned value until the caller
 * stops changing `value` for at least `delay` milliseconds.
 *
 * Use-cases:
 *  • Search-as-you-type (fire API call only after user pauses typing)
 *  • Form validation that shouldn't run on every keystroke
 *
 * @param value  The raw (fast-changing) value.
 * @param delay  Milliseconds to wait after the last change. Defaults to 300.
 * @returns      The debounced value.
 *
 * Best-practice notes:
 *  1. The timer is cleared on every re-render where `value` or `delay`
 *     changes, so only the *last* value within the window is emitted.
 *  2. Cleanup on unmount prevents setting state on an unmounted component.
 *  3. Generic typing lets you debounce strings, numbers, objects, etc.
 */
function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Start a timer that will update the debounced value after `delay` ms.
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // If value or delay changes before the timer fires, clear it.
    // This is the core of debouncing — only the last call in a burst wins.
    return () => {
      clearTimeout(timerId);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
