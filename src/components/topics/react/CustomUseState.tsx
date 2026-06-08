import React, { useState } from "react";
import { useLocalStorage } from "../../../hooks";

const CustomUseState = () => {
  const [activeTab, setActiveTab] = useState<"demo" | "code">("demo");

  // Custom useState Hook Demo State (useLocalStorage)
  const [nickname, setNickname] = useLocalStorage<string>(
    "custom-user-nickname",
    "React Explorer"
  );
  const [themeColor, setThemeColor] = useLocalStorage<string>(
    "custom-app-theme-color",
    "indigo"
  );
  const [sessionCount, setSessionCount] = useLocalStorage<number>(
    "custom-session-count",
    0
  );

  const handleResetLocalStorage = () => {
    setNickname("React Explorer");
    setThemeColor("indigo");
    setSessionCount(0);
  };

  // Theme color styling helper
  const themeClasses: Record<string, { border: string; bg: string; text: string; ring: string }> = {
    indigo: {
      border: "border-indigo-200",
      bg: "bg-indigo-500",
      text: "text-indigo-700",
      ring: "focus:ring-indigo-400",
    },
    emerald: {
      border: "border-emerald-200",
      bg: "bg-emerald-500",
      text: "text-emerald-700",
      ring: "focus:ring-emerald-400",
    },
    purple: {
      border: "border-purple-200",
      bg: "bg-purple-500",
      text: "text-purple-700",
      ring: "focus:ring-purple-400",
    },
    rose: {
      border: "border-rose-200",
      bg: "bg-rose-500",
      text: "text-rose-700",
      ring: "focus:ring-rose-400",
    },
  };

  const currentTheme = themeClasses[themeColor] || themeClasses.indigo;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Title Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1">Custom useState Hook</h2>
        <p className="text-gray-500 text-sm">
          Learn how to compose React's built-in{" "}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-blue-700 text-xs font-semibold">
            useState
          </code>{" "}
          into a reusable custom state hook like{" "}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-indigo-700 text-xs font-semibold">
            useLocalStorage
          </code>{" "}
          to persist state automatically.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("demo")}
          className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${
            activeTab === "demo"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          🎮 Live Demo
        </button>
        <button
          onClick={() => setActiveTab("code")}
          className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${
            activeTab === "code"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          📖 How to Build it (Code Guide)
        </button>
      </div>

      {activeTab === "demo" && (
        <div className="space-y-6">
          {/* Concept Explanation Card */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-5 text-sm text-indigo-900 leading-relaxed shadow-sm">
            <span className="font-bold text-indigo-950 block mb-1">💡 What is a Custom State Hook?</span>
            <p>
              A custom hook wrapping <code>useState</code> allows us to intercept reads and writes to state.
              The standard pattern is to maintain a state variable inside the hook, perform custom side effects whenever that state changes (or inside a wrapper update function), and return the same <code>[value, setValue]</code> array signature as <code>useState</code>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Interactive Demo Column (2/3 width) */}
            <div className="md:col-span-2 bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="font-bold text-gray-800 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                  Custom useLocalStorage Live Demo
                </h3>
                <span className="text-xs font-semibold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full">
                  Persistent State
                </span>
              </div>

              <div className="space-y-4">
                {/* Name field */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Nickname (persists in localStorage)
                  </label>
                  <input
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className={`w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${currentTheme.ring}`}
                  />
                </div>

                {/* Accent Color picker */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    Theme Color (persists in localStorage)
                  </label>
                  <div className="flex gap-3">
                    {Object.keys(themeClasses).map((color) => (
                      <button
                        key={color}
                        onClick={() => setThemeColor(color)}
                        className={`w-7 h-7 rounded-full border-2 transition-all ${themeClasses[color].bg} ${
                          themeColor === color
                            ? "border-gray-900 scale-110 shadow-sm"
                            : "border-transparent hover:scale-105"
                        }`}
                        title={`Select ${color}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Functional Updates Counter */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div>
                    <span className="text-xs font-semibold text-gray-700">Click Counter (supports functional updates)</span>
                    <p className="text-xs text-gray-400">Updates state using a function updater callback</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-bold text-gray-800">{sessionCount}</span>
                    <button
                      onClick={() => setSessionCount((prev) => prev + 1)}
                      className={`px-3 py-1 text-xs text-white rounded-md transition-colors ${currentTheme.bg}`}
                    >
                      + 1
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                <button
                  onClick={handleResetLocalStorage}
                  className="text-red-500 hover:text-red-700 underline font-medium"
                >
                  Reset Defaults
                </button>
                <span className="text-gray-400 italic">
                  🚀 Type changes &amp; refresh to see them persist!
                </span>
              </div>
            </div>

            {/* Local Storage Inspector (1/3 width) */}
            <div className="md:col-span-1 bg-gray-900 text-gray-100 rounded-xl p-5 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-sm text-gray-200 border-b border-gray-800 pb-2 mb-3 flex items-center gap-2">
                  💾 LocalStorage Inspector
                </h3>
                <p className="text-xs text-gray-400 mb-4">
                  These are the raw values currently stored in your browser's localStorage disk:
                </p>

                <div className="space-y-3 font-mono text-[11px]">
                  <div>
                    <span className="text-indigo-400">"custom-user-nickname":</span>
                    <pre className="bg-black/40 rounded p-1.5 text-gray-300 mt-1 overflow-x-auto">
                      {JSON.stringify(nickname)}
                    </pre>
                  </div>
                  <div>
                    <span className="text-indigo-400">"custom-app-theme-color":</span>
                    <pre className="bg-black/40 rounded p-1.5 text-gray-300 mt-1 overflow-x-auto">
                      {JSON.stringify(themeColor)}
                    </pre>
                  </div>
                  <div>
                    <span className="text-indigo-400">"custom-session-count":</span>
                    <pre className="bg-black/40 rounded p-1.5 text-gray-300 mt-1 overflow-x-auto">
                      {sessionCount}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-gray-500 border-t border-gray-800 pt-3 mt-4">
                Updating values on the left updates the inspector values instantaneously.
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "code" && (
        <div className="space-y-6">
          {/* Custom hook walkthrough */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-800">useLocalStorage.ts</h3>
                <p className="text-xs text-gray-400">Implementation details of the custom state hook</p>
              </div>
              <span className="text-[10px] font-mono bg-gray-200/80 px-2 py-0.5 rounded text-gray-600">
                TypeScript Generic Hook
              </span>
            </div>

            <pre className="p-4 text-xs font-mono bg-slate-900 text-slate-100 overflow-x-auto leading-relaxed">
{`import { useState, useCallback, Dispatch, SetStateAction } from "react";

function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T)
): [T, Dispatch<SetStateAction<T>>] {
  // 1. Initialize state lazily (reads from localStorage only on first render)
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        return JSON.parse(item) as T;
      }
      
      // Handle function parameters (lazy initial value support)
      return initialValue instanceof Function
        ? (initialValue as () => T)()
        : initialValue;
    } catch (error) {
      console.warn("Error reading localStorage:", error);
      return initialValue instanceof Function ? (initialValue as () => T)() : initialValue;
    }
  });

  // 2. Return a memoized setter function that updates state AND localStorage
  const setValue = useCallback(
    (value: SetStateAction<T>) => {
      try {
        // Resolve value if it is a callback function (same as standard useState)
        const valueToStore =
          value instanceof Function
            ? (value as (val: T) => T)(storedValue)
            : value;

        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.warn("Error writing to localStorage:", error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
}`}
            </pre>
          </div>

          {/* Key Architectural Concepts Table */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4">Key Custom State Hook Concepts</h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left text-gray-700">
                <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase border-b border-gray-100">
                  <tr>
                    <th className="py-3 px-4">Concept</th>
                    <th className="py-3 px-4">Why it matters</th>
                    <th className="py-3 px-4">How it's built in this hook</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-3 px-4 font-semibold text-gray-900">Lazy Initialization</td>
                    <td className="py-3 px-4">
                      Direct disk access (localStorage) on every render slows down UI performance.
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-gray-600">
                      useState(() =&gt; {"{ readDisk() }"})
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-gray-900">Functional Updates</td>
                    <td className="py-3 px-4">
                      Components need to update state based on previous state without creating dependency loops.
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-gray-600">
                      value instanceof Function
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-gray-900">TypeScript Generics</td>
                    <td className="py-3 px-4">
                      Ensures type-safety when setting/reading stored items (e.g. number, string, boolean).
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-gray-600">
                      useLocalStorage&lt;T&gt;
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-gray-900">Error Isolation</td>
                    <td className="py-3 px-4">
                      Browsers in private mode, or block cookies settings, crash on accessing localStorage.
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-gray-600">
                      try-catch wrapping
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomUseState;
