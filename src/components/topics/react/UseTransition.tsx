import React, { useMemo, useState, useTransition } from "react";

const DATASET = Array.from({ length: 12000 }, (_, i) => `Entry ${i + 1}`);

const UseTransition = () => {
  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return DATASET;

    return DATASET.filter((item) => item.toLowerCase().includes(normalized));
  }, [query]);

  return (
    <div className="p-6 rounded bg-white">
      <h2 className="text-2xl font-bold mb-2">useTransition</h2>
      <p className="text-gray-500 mb-4">
        Marks non-urgent state updates so urgent interactions stay responsive.
      </p>

      <input
        type="text"
        value={inputValue}
        onChange={(event) => {
          const nextValue = event.target.value;
          setInputValue(nextValue);

          startTransition(() => {
            setQuery(nextValue);
          });
        }}
        placeholder="Search 12,000 entries"
        className="w-full max-w-md px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="mt-3 text-sm text-gray-600">
        <p>
          Input value: <strong>{inputValue || "(empty)"}</strong>
        </p>
        <p>
          Transition query: <strong>{query || "(empty)"}</strong>
        </p>
      </div>

      {isPending && (
        <p className="mt-2 text-sm text-yellow-700 bg-yellow-50 border border-yellow-200 rounded px-2 py-1 inline-block">
          Updating results...
        </p>
      )}

      <div className="mt-4 rounded border border-gray-200 max-h-56 overflow-y-auto divide-y divide-gray-100">
        {filtered.slice(0, 80).map((item) => (
          <p key={item} className="px-3 py-1.5 text-sm text-gray-700">
            {item}
          </p>
        ))}
        {filtered.length === 0 && (
          <p className="px-3 py-2 text-sm text-gray-400">No matches found.</p>
        )}
      </div>

      <p className="text-xs text-gray-500 mt-2">
        Showing {Math.min(filtered.length, 80)} of {filtered.length} results.
      </p>

      <div className="mt-4 p-3 bg-blue-50 rounded text-sm text-blue-700 space-y-1">
        <p>
          <strong>About useTransition</strong>
        </p>
        <p>
          Use it when some updates are urgent (typing, clicks) and others can
          be deferred (heavy list rendering, expensive filtering).
        </p>
        <p>
          It does not replace state management. It only changes update priority
          so the UI stays responsive while slower work is in progress.
        </p>
      </div>
    </div>
  );
};

export default UseTransition;
