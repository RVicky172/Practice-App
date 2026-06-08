import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useDebounce, useThrottle } from "../../../hooks";

// ─── Types ──────────────────────────────────────────────────────────────────

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: number;
}

// ─── Seed Data ──────────────────────────────────────────────────────────────

const SEED_TODOS: Todo[] = [
  {
    id: 1,
    text: "Learn useDebounce custom hook",
    completed: false,
    createdAt: Date.now() - 5000,
  },
  {
    id: 2,
    text: "Learn useThrottle custom hook",
    completed: false,
    createdAt: Date.now() - 4000,
  },
  {
    id: 3,
    text: "Understand the difference between debounce and throttle",
    completed: true,
    createdAt: Date.now() - 3000,
  },
  {
    id: 4,
    text: "Build a Todo App to practice both patterns",
    completed: false,
    createdAt: Date.now() - 2000,
  },
  {
    id: 5,
    text: "Write unit tests for custom hooks",
    completed: false,
    createdAt: Date.now() - 1000,
  },
];

// ─── Event Log Entry ────────────────────────────────────────────────────────

interface LogEntry {
  id: number;
  timestamp: string;
  source: "debounce" | "throttle";
  message: string;
}

// ─── Main Component ─────────────────────────────────────────────────────────

/**
 * DebounceThrottleTodo demonstrates both custom hooks in a single,
 * self-contained Todo application:
 *
 *  • **useDebounce** — the search input is debounced so that the todo
 *    list is filtered only after the user *stops typing* for 400 ms.
 *
 *  • **useThrottle** — a rapid "toggle all" button fires toggle events
 *    as fast as you can click, but the on-screen event log and a
 *    simulated "save indicator" are throttled to update at most once
 *    every 500 ms.
 */
function DebounceThrottleTodo() {
  // ── Todo state ──────────────────────────────────────────────────────────

  const [todos, setTodos] = useState<Todo[]>(SEED_TODOS);
  const [newTodoText, setNewTodoText] = useState<string>("");

  // ── Search (debounced) ──────────────────────────────────────────────────

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 400);
  const [debounceFireCount, setDebounceFireCount] = useState(0);
  const searchKeystrokeCount = useRef(0);

  // Count how many times the debounced value actually changed.
  const prevDebouncedRef = useRef(debouncedSearch);
  useEffect(() => {
    if (debouncedSearch !== prevDebouncedRef.current) {
      prevDebouncedRef.current = debouncedSearch;
      setDebounceFireCount((count) => count + 1);
      addLogEntry(
        "debounce",
        `Search filtered → "${debouncedSearch || "(cleared)"}"`,
      );
    }
  }, [debouncedSearch]);

  const handleSearchChange = (value: string) => {
    searchKeystrokeCount.current += 1;
    setSearchQuery(value);
  };

  // ── Toggle counter (throttled) ──────────────────────────────────────────

  const [toggleCount, setToggleCount] = useState(0);
  const throttledToggleCount = useThrottle(toggleCount, 500);
  const [displayedSaveCount, setDisplayedSaveCount] = useState(0);

  useEffect(() => {
    setDisplayedSaveCount(throttledToggleCount);
    if (throttledToggleCount > 0) {
      addLogEntry(
        "throttle",
        `Save indicator updated → ${throttledToggleCount} toggle(s)`,
      );
    }
  }, [throttledToggleCount]);

  // ── Event log ───────────────────────────────────────────────────────────

  const [eventLog, setEventLog] = useState<LogEntry[]>([]);
  const logIdRef = useRef(0);
  const logContainerRef = useRef<HTMLDivElement>(null);

  const addLogEntry = (source: LogEntry["source"], message: string) => {
    logIdRef.current += 1;
    const entry: LogEntry = {
      id: logIdRef.current,
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }) + `.${("00" + new Date().getMilliseconds()).slice(-3)}`,
      source,
      message,
    };
    setEventLog((prev) => [entry, ...prev].slice(0, 30)); // keep last 30
  };

  // Auto-scroll log to top when new entries arrive.
  useEffect(() => {
    logContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [eventLog]);

  // ── Filtered todos ────────────────────────────────────────────────────

  const filteredTodos = useMemo(() => {
    if (!debouncedSearch.trim()) {
      return todos;
    }

    const query = debouncedSearch.toLowerCase();
    return todos.filter((todo) => todo.text.toLowerCase().includes(query));
  }, [todos, debouncedSearch]);

  // ── Handlers ──────────────────────────────────────────────────────────

  const handleAddTodo = () => {
    const trimmed = newTodoText.trim();
    if (!trimmed) return;

    const newTodo: Todo = {
      id: Date.now(),
      text: trimmed,
      completed: false,
      createdAt: Date.now(),
    };

    setTodos((prev) => [newTodo, ...prev]);
    setNewTodoText("");
  };

  const handleToggleTodo = useCallback((id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
    setToggleCount((count) => count + 1);
  }, []);

  const handleDeleteTodo = useCallback((id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const handleToggleAll = () => {
    const allCompleted = todos.every((todo) => todo.completed);
    setTodos((prev) =>
      prev.map((todo) => ({ ...todo, completed: !allCompleted })),
    );
    setToggleCount((count) => count + 1);
  };

  const handleClearLog = () => {
    setEventLog([]);
  };

  // ── Derived stats ─────────────────────────────────────────────────────

  const completedCount = todos.filter((todo) => todo.completed).length;
  const pendingCount = todos.length - completedCount;

  // ── Render ────────────────────────────────────────────────────────────

  return (
    <section className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1">
          Debounce &amp; Throttle — Custom Hooks
        </h2>
        <p className="text-gray-500 text-sm">
          A single Todo app demonstrating{" "}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-blue-700 text-xs font-semibold">
            useDebounce
          </code>{" "}
          (search input) and{" "}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-purple-700 text-xs font-semibold">
            useThrottle
          </code>{" "}
          (save indicator) side-by-side.
        </p>
      </div>

      {/* ── Concept Explanation Cards ────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Debounce Card */}
        <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold">
              D
            </span>
            <h3 className="font-semibold text-blue-900">useDebounce</h3>
          </div>
          <p className="text-sm text-blue-800 leading-relaxed">
            <strong>Waits</strong> until the user stops changing a value for a
            specified delay, then emits the final value. Ideal for
            search-as-you-type, form validation, and auto-save.
          </p>
          <div className="mt-3 text-xs text-blue-600 font-mono bg-blue-100/80 rounded-lg p-2">
            input → · · · · · · · |——delay——| → emit
          </div>
        </div>

        {/* Throttle Card */}
        <div className="rounded-xl border border-purple-200 bg-purple-50/60 p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-purple-600 text-white text-xs font-bold">
              T
            </span>
            <h3 className="font-semibold text-purple-900">useThrottle</h3>
          </div>
          <p className="text-sm text-purple-800 leading-relaxed">
            <strong>Limits</strong> how often a value is updated — at most once
            per interval. The first change passes immediately; subsequent bursts
            are batched. Ideal for scroll handlers and rate-limiting.
          </p>
          <div className="mt-3 text-xs text-purple-600 font-mono bg-purple-100/80 rounded-lg p-2">
            input → emit · · skip · · skip · · | → emit(last)
          </div>
        </div>
      </div>

      {/* ── Main Layout: Todo + Event Log ────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left column: Todo app (2/3 width) */}
        <div className="lg:col-span-2 space-y-4">
          {/* Add Todo */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex gap-2">
              <input
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add a new todo…"
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddTodo();
                }}
              />
              <button
                className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
                onClick={handleAddTodo}
                type="button"
              >
                Add
              </button>
            </div>
          </div>

          {/* Debounced Search */}
          <div className="bg-white rounded-xl border border-blue-200 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-blue-800 flex items-center gap-1.5">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold">
                  D
                </span>
                Debounced Search
                <span className="text-xs font-normal text-blue-500">
                  (400 ms delay)
                </span>
              </label>
              <div className="flex gap-3 text-xs text-gray-500">
                <span>
                  Keystrokes:{" "}
                  <strong className="text-gray-800">
                    {searchKeystrokeCount.current}
                  </strong>
                </span>
                <span>
                  Filter calls:{" "}
                  <strong className="text-blue-700">{debounceFireCount}</strong>
                </span>
              </div>
            </div>
            <input
              className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-blue-50/30"
              placeholder="Type to search todos (debounced)…"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            {searchQuery && searchQuery !== debouncedSearch && (
              <p className="mt-1.5 text-xs text-blue-500 animate-pulse">
                ⏳ Waiting for you to stop typing…
              </p>
            )}
            {searchQuery && searchQuery === debouncedSearch && (
              <p className="mt-1.5 text-xs text-green-600">
                ✓ Search applied — showing {filteredTodos.length} result(s)
              </p>
            )}
          </div>

          {/* Stats bar + Toggle All */}
          <div className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm">
              <span className="text-gray-500">
                Total:{" "}
                <strong className="text-gray-800">{todos.length}</strong>
              </span>
              <span className="text-green-600">
                Done: <strong>{completedCount}</strong>
              </span>
              <span className="text-amber-600">
                Pending: <strong>{pendingCount}</strong>
              </span>
            </div>
            <div className="flex items-center gap-3">
              {/* Throttled save indicator */}
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-purple-600 text-white text-[10px] font-bold">
                  T
                </span>
                <span className="text-xs text-purple-700">
                  Saves synced:{" "}
                  <strong className="text-purple-900">
                    {displayedSaveCount}
                  </strong>
                </span>
                {toggleCount !== throttledToggleCount && (
                  <span className="text-xs text-purple-400 animate-pulse">
                    (throttling…)
                  </span>
                )}
              </div>
              <button
                className="px-3 py-1.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-lg hover:bg-purple-200 transition-colors border border-purple-200"
                onClick={handleToggleAll}
                type="button"
              >
                Toggle All
              </button>
            </div>
          </div>

          {/* Todo list */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm divide-y divide-gray-100">
            {filteredTodos.length === 0 && (
              <div className="p-6 text-center text-sm text-gray-400">
                {searchQuery
                  ? `No todos match "${debouncedSearch}"`
                  : "No todos yet — add one above!"}
              </div>
            )}
            {filteredTodos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50/60 transition-colors"
              >
                <input
                  checked={todo.completed}
                  className="w-4 h-4 accent-blue-600 cursor-pointer"
                  onChange={() => handleToggleTodo(todo.id)}
                  type="checkbox"
                />
                <span
                  className={`flex-1 text-sm ${
                    todo.completed
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  {todo.text}
                </span>
                <button
                  className="px-2.5 py-1 text-xs bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors border border-red-200"
                  onClick={() => handleDeleteTodo(todo.id)}
                  type="button"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: Event log (1/3 width) */}
        <div className="lg:col-span-1">
          <div className="bg-gray-900 rounded-xl border border-gray-700 shadow-sm sticky top-6">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
              <h3 className="text-sm font-semibold text-gray-200">
                📋 Event Log
              </h3>
              <button
                className="text-xs text-gray-400 hover:text-gray-200 transition-colors"
                onClick={handleClearLog}
                type="button"
              >
                Clear
              </button>
            </div>
            <div
              ref={logContainerRef}
              className="max-h-[420px] overflow-y-auto p-3 space-y-1.5"
            >
              {eventLog.length === 0 && (
                <p className="text-xs text-gray-500 text-center py-4">
                  Start typing or toggling to see events…
                </p>
              )}
              {eventLog.map((entry) => (
                <div
                  key={entry.id}
                  className={`text-xs rounded-md px-2.5 py-1.5 font-mono ${
                    entry.source === "debounce"
                      ? "bg-blue-950/50 text-blue-300 border border-blue-800/40"
                      : "bg-purple-950/50 text-purple-300 border border-purple-800/40"
                  }`}
                >
                  <span className="text-gray-500">{entry.timestamp}</span>{" "}
                  <span
                    className={`font-bold uppercase ${
                      entry.source === "debounce"
                        ? "text-blue-400"
                        : "text-purple-400"
                    }`}
                  >
                    [{entry.source}]
                  </span>{" "}
                  {entry.message}
                </div>
              ))}
            </div>
          </div>

          {/* Hook usage reference */}
          <div className="mt-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <h4 className="text-sm font-semibold text-gray-800 mb-2">
              Hook Usage
            </h4>

            <div className="mb-3">
              <p className="text-xs font-semibold text-blue-700 mb-1">
                useDebounce
              </p>
              <pre className="text-[11px] bg-gray-50 rounded-lg p-2.5 overflow-x-auto border border-gray-100 text-gray-700">
                {`const debouncedSearch = useDebounce(
  searchQuery,  // raw value
  400           // delay in ms
);`}
              </pre>
            </div>

            <div>
              <p className="text-xs font-semibold text-purple-700 mb-1">
                useThrottle
              </p>
              <pre className="text-[11px] bg-gray-50 rounded-lg p-2.5 overflow-x-auto border border-gray-100 text-gray-700">
                {`const throttledCount = useThrottle(
  toggleCount,  // raw value
  500           // interval in ms
);`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DebounceThrottleTodo;
