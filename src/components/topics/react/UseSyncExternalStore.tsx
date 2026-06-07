import React, { useSyncExternalStore } from "react";

type CounterListener = () => void;

const createCounterStore = () => {
  let count = 0;
  const listeners = new Set<CounterListener>();

  const emit = () => {
    listeners.forEach((listener) => listener());
  };

  return {
    subscribe(listener: CounterListener) {
      listeners.add(listener);

      return () => {
        listeners.delete(listener);
      };
    },
    getSnapshot() {
      return count;
    },
    getServerSnapshot() {
      return 0;
    },
    increment() {
      count += 1;
      emit();
    },
    decrement() {
      count -= 1;
      emit();
    },
    reset() {
      count = 0;
      emit();
    },
  };
};

const counterStore = createCounterStore();

const UseSyncExternalStore = () => {
  const count = useSyncExternalStore(
    counterStore.subscribe,
    counterStore.getSnapshot,
    counterStore.getServerSnapshot,
  );

  return (
    <div className="p-6 rounded bg-white">
      <h2 className="text-2xl font-bold mb-2">useSyncExternalStore</h2>
      <p className="text-gray-500 mb-4">
        Reads from an external store with a consistent snapshot API.
      </p>

      <div className="rounded border border-gray-200 p-4 bg-gray-50">
        <p className="text-sm text-gray-600">Store value</p>
        <p className="text-4xl font-bold text-gray-900 mt-1">{count}</p>

        <div className="flex items-center gap-2 mt-4">
          <button
            onClick={() => counterStore.decrement()}
            className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
          >
            -1
          </button>
          <button
            onClick={() => counterStore.increment()}
            className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            +1
          </button>
          <button
            onClick={() => counterStore.reset()}
            className="px-3 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
          >
            Reset
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-3">
        This state lives outside React. The hook keeps UI updates in sync when
        the store changes.
      </p>
    </div>
  );
};

export default UseSyncExternalStore;
