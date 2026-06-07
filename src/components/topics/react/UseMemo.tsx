import React, { useMemo, useState } from "react";

const PRODUCTS = Array.from({ length: 6000 }, (_, i) => `Product ${i + 1}`);

const UseMemo = () => {
  const [query, setQuery] = useState("");
  const [counter, setCounter] = useState(0);

  const filteredProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    // Simulate expensive pure CPU work.
    let checksum = 0;
    for (let i = 0; i < 250_000; i += 1) {
      checksum = (checksum + i) % 97;
    }
    if (checksum === -1) {
      return [];
    }

    if (!normalized) return PRODUCTS;
    return PRODUCTS.filter((item) => item.toLowerCase().includes(normalized));
  }, [query]);

  return (
    <div className="p-6 rounded bg-white">
      <h2 className="text-2xl font-bold mb-2">useMemo</h2>
      <p className="text-gray-500 mb-4">
        Memoizes an expensive filtered list so unrelated state updates do not
        recompute it.
      </p>

      <div className="flex flex-wrap gap-2 mb-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full max-w-sm px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => setCounter((c) => c + 1)}
          className="px-3 py-2 bg-gray-700 text-white rounded"
        >
          Unrelated Counter: {counter}
        </button>
      </div>

      <p className="text-sm text-gray-700 mb-2">
        Results: {filteredProducts.length}
      </p>

      <ul className="max-h-44 overflow-y-auto border border-gray-200 rounded divide-y divide-gray-100">
        {filteredProducts.slice(0, 40).map((item) => (
          <li key={item} className="px-3 py-1 text-sm">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UseMemo;
