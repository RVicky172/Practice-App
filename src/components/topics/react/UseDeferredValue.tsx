import React, {
  Suspense,
  use,
  useDeferredValue,
  useOptimistic,
  useState,
  useTransition,
} from "react";

// Large dataset — makes filtering non-trivial work for the browser
const ALL_ITEMS = Array.from({ length: 10_000 }, (_, i) => `Item ${i + 1}`);

const listPromiseCache = new Map<string, Promise<string[]>>();

const getFilteredItems = (query: string) => {
  const normalized = query.toLowerCase();

  if (!listPromiseCache.has(normalized)) {
    const promise = new Promise<string[]>((resolve) => {
      setTimeout(() => {
        resolve(
          ALL_ITEMS.filter((item) => item.toLowerCase().includes(normalized)),
        );
      }, 400);
    });

    listPromiseCache.set(normalized, promise);
  }

  return listPromiseCache.get(normalized)!;
};

const ListFallback = () => (
  <div className="border border-gray-200 rounded p-3 text-sm text-gray-500 bg-gray-50">
    Loading deferred list...
  </div>
);

// React Compiler automatically memoizes this component, so no explicit memo() needed.
// Conceptually, memoization is what makes useDeferredValue effective — React can
// bail out of re-rendering this component when deferredQuery hasn't changed yet.
const FilteredList = ({ query }: { query: string }) => {
  const filtered = use(getFilteredItems(query));

  return (
    <ul className="max-h-48 overflow-y-auto border border-gray-200 rounded divide-y divide-gray-100">
      {filtered.slice(0, 50).map((item) => (
        <li key={item} className="px-3 py-1 text-sm">
          {item}
        </li>
      ))}
      {filtered.length > 50 && (
        <li className="px-3 py-1 text-sm text-gray-400 italic">
          …and {filtered.length - 50} more
        </li>
      )}
      {filtered.length === 0 && (
        <li className="px-3 py-1 text-sm text-gray-400">No results</li>
      )}
    </ul>
  );
};

const UseDeferredValue = () => {
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const [optimisticQuery, setOptimisticQuery] = useOptimistic(
    query,
    (_current, nextValue: string) => nextValue,
  );
  const deferredQuery = useDeferredValue(query);

  // true while the list is still rendering with the old value
  const isStale = query !== deferredQuery;
  const isListUpdating = isStale || isPending;

  return (
    <div className="p-6 rounded bg-white">
      <h2 className="text-2xl font-bold mb-2">useDeferredValue</h2>
      <p className="text-gray-500 mb-4">
        Keeps the UI responsive by deferring an expensive re-render. The input
        updates instantly; the list catches up in the background.
      </p>

      <input
        type="text"
        value={optimisticQuery}
        onChange={(e) => {
          const nextValue = e.target.value;

          // Show the typed value immediately, then commit the real state in a transition.
          setOptimisticQuery(nextValue);
          startTransition(() => setQuery(nextValue));
        }}
        placeholder="Search 10,000 items…"
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="mt-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-gray-500">
            Optimistic input:{" "}
            <code className="bg-gray-100 px-1 rounded">
              &quot;{optimisticQuery}&quot;
            </code>
          </span>
        </div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-gray-500">
            Deferred query:{" "}
            <code className="bg-gray-100 px-1 rounded">
              &quot;{deferredQuery}&quot;
            </code>
          </span>
          {isListUpdating && (
            <span className="text-xs text-yellow-700 bg-yellow-50 border border-yellow-200 px-2 py-0.5 rounded">
              Updating…
            </span>
          )}
        </div>
        <div
          className={`transition-opacity duration-200 ${isListUpdating ? "opacity-40" : "opacity-100"}`}
        >
          <Suspense fallback={<ListFallback />}>
            <FilteredList query={deferredQuery} />
          </Suspense>
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded text-sm text-blue-700 space-y-1">
        <p>
          <strong>useDeferredValue + memoization</strong>
        </p>
        <p>
          <code className="bg-blue-100 px-1 rounded">useDeferredValue</code>{" "}
          tells React it can defer re-rendering{" "}
          <code className="bg-blue-100 px-1 rounded">FilteredList</code> until
          after urgent updates (keystrokes) are flushed. For that skip to
          actually happen, the component must be memoized — here the{" "}
          <strong>React Compiler</strong> handles that automatically based on
          props. In projects without the compiler you would need explicit{" "}
          <code className="bg-blue-100 px-1 rounded">memo()</code>.
        </p>
      </div>
    </div>
  );
};

export default UseDeferredValue;
