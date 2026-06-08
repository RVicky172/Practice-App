import { useEffect, useRef, useState } from "react";

/**
 * useThrottle — limits how often the returned value is updated.
 * At most one update per `interval` milliseconds, with a trailing
 * edge flush so the latest value is never silently dropped.
 *
 * Use-cases:
 *  • Scroll-position tracking (avoid re-rendering 60 fps)
 *  • Window resize handlers
 *  • Rate-limiting expensive computations triggered by fast input
 *
 * @param value     The raw (fast-changing) value.
 * @param interval  Minimum milliseconds between updates. Defaults to 300.
 * @returns         The throttled value.
 *
 * Best-practice notes:
 *  1. Leading edge: the first call in a burst passes through immediately.
 *  2. Trailing edge: a timeout ensures the *final* value in a burst is
 *     also emitted, so you never "lose" the last update.
 *  3. Uses refs for mutable timing state to avoid unnecessary re-renders.
 *  4. Cleanup on unmount prevents stale timers.
 */
function useThrottle<T>(value: T, interval: number = 300): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);

  /** Timestamp of the last time we actually emitted a value. */
  const lastUpdatedRef = useRef<number>(Date.now());

  /** ID of the trailing-edge timeout, so we can cancel it. */
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const now = Date.now();
    const elapsed = now - lastUpdatedRef.current;

    // If enough time has passed since the last emit → update immediately.
    if (elapsed >= interval) {
      lastUpdatedRef.current = now;
      setThrottledValue(value);
    } else {
      // Otherwise schedule a trailing-edge update for the remaining time.
      // Clear any previously scheduled trailing update first.
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        lastUpdatedRef.current = Date.now();
        setThrottledValue(value);
        timeoutRef.current = null;
      }, interval - elapsed);
    }

    // Cleanup: clear the trailing timeout on unmount or before next effect.
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, interval]);

  return throttledValue;
}

export default useThrottle;
