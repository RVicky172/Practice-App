import React, { useDebugValue, useEffect, useState } from "react";

// Custom hook 1 — basic useDebugValue
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Displays "Online" or "Offline" next to the hook in React DevTools
  useDebugValue(isOnline ? "Online" : "Offline");

  return isOnline;
}

// Custom hook 2 — useDebugValue with a formatter function
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : initialValue;
  });

  const set = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  // The formatter is only evaluated when DevTools is open — avoids wasted work
  useDebugValue(
    { key, value },
    ({ key: k, value: v }) => `${k} = ${JSON.stringify(v)}`,
  );

  return [value, set] as const;
}

const UseDebugValue = () => {
  const isOnline = useOnlineStatus();
  const [count, setCount] = useLocalStorage("debug-count", 0);

  return (
    <div className="p-6 rounded bg-white">
      <h2 className="text-2xl font-bold mb-2">useDebugValue</h2>
      <p className="text-gray-500 mb-4">
        Adds labels to custom hooks visible in React DevTools. It has no effect
        on the UI — open <strong>DevTools → Components</strong> and inspect this
        component to see the labels.
      </p>

      <div className="space-y-4">
        {/* Online status */}
        <div className="p-4 rounded border border-gray-200">
          <h3 className="font-semibold mb-1">useOnlineStatus</h3>
          <p className="text-sm text-gray-500 mb-3">
            Basic usage:{" "}
            <code className="bg-gray-100 px-1 rounded">
              useDebugValue(isOnline ? &quot;Online&quot; : &quot;Offline&quot;)
            </code>
          </p>
          <span
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${isOnline ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
          >
            <span
              className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-500" : "bg-red-500"}`}
            />
            {isOnline ? "Online" : "Offline"}
          </span>
          <p className="text-xs text-gray-400 mt-2">
            Toggle your network connection to see this update.
          </p>
        </div>

        {/* localStorage counter */}
        <div className="p-4 rounded border border-gray-200">
          <h3 className="font-semibold mb-1">useLocalStorage</h3>
          <p className="text-sm text-gray-500 mb-3">
            With formatter:{" "}
            <code className="bg-gray-100 px-1 rounded">
              useDebugValue({"{ key, value }"}, formatter)
            </code>{" "}
            — the formatter only runs when DevTools is open.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCount(count - 1)}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              −
            </button>
            <span className="font-mono text-lg w-8 text-center">{count}</span>
            <button
              onClick={() => setCount(count + 1)}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              +
            </button>
            <button
              onClick={() => setCount(0)}
              className="text-sm text-gray-400 underline ml-1"
            >
              Reset
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Persisted in localStorage under key{" "}
            <code className="bg-gray-100 px-1 rounded">"debug-count"</code>.
            Survives page refresh.
          </p>
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded text-sm text-blue-700">
        <strong>Tip:</strong> Open React DevTools → Components, select this
        component, and expand the hooks panel. Each custom hook shows its debug
        label.
      </div>
    </div>
  );
};

export default UseDebugValue;
