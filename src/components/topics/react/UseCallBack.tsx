import React, { memo, useCallback, useState } from "react";

interface ButtonProps {
  onClick: () => void;
  label: string;
  renderCount: number;
  highlight?: boolean;
}

const ExpensiveButton = memo(
  ({ onClick, label, renderCount, highlight }: ButtonProps) => {
    return (
      <div
        className={`flex items-center justify-between px-4 py-3 rounded border ${highlight ? "border-green-400 bg-green-50" : "border-gray-200 bg-white"}`}
      >
        <button
          onClick={onClick}
          className="px-4 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        >
          {label}
        </button>
        <span
          className={`text-sm font-semibold ${highlight ? "text-green-600" : "text-gray-500"}`}
        >
          Renders: {renderCount}
        </span>
      </div>
    );
  },
);

// const ExpensiveButton = ({
//   onClick,
//   label,
//   renderCount,
//   highlight,
// }: ButtonProps) => {
//   return (
//     <div
//       className={`flex items-center justify-between px-4 py-3 rounded border ${highlight ? "border-green-400 bg-green-50" : "border-gray-200 bg-white"}`}
//     >
//       <button
//         onClick={onClick}
//         className="px-4 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
//       >
//         {label}
//       </button>
//       <span
//         className={`text-sm font-semibold ${highlight ? "text-green-600" : "text-gray-500"}`}
//       >
//         Renders: {renderCount}
//       </span>
//     </div>
//   );
// };

const UseCallBack = () => {
  const [count, setCount] = useState(0);
  const [unrelated, setUnrelated] = useState(0);
  const [parentRenders, setParentRenders] = useState(1);

  const increment = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  const handleUnrelated = () => {
    setUnrelated((u) => u + 1);
    setParentRenders((r) => r + 1);
  };

  const handleIncrement = () => {
    increment();
    setParentRenders((r) => r + 1);
  };

  const handleReset = () => {
    setCount(0);
    setUnrelated(0);
    setParentRenders(1);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">useCallback</h2>
      <p className="text-gray-500 mb-2">
        Memoizes a callback so its reference stays stable across re-renders,
        preventing unnecessary child re-renders when combined with{" "}
        <code>React.memo</code>.
      </p>
      <p className="text-xs text-blue-600 bg-blue-50 border border-blue-200 rounded px-3 py-2 mb-4">
        <strong>React Compiler note:</strong> In this project the React Compiler
        automatically applies these optimizations at build time — you don't need
        to write <code>useCallback</code> or <code>React.memo</code> manually.
        This example shows what the compiler does under the hood so you
        understand the concept.
      </p>
      <div className="mt-4 p-4 bg-gray-100 rounded space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Parent renders:{" "}
            <strong className="text-red-500">{parentRenders}</strong>
          </p>
          <button
            onClick={handleReset}
            className="text-xs px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
          >
            Reset
          </button>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-red-400 uppercase tracking-wide">
            ✗ Without useCallback
          </p>
          <p className="text-xs text-gray-400 mb-1">
            New function reference on every parent render → memo can't help →
            child re-renders every time
          </p>
          <ExpensiveButton
            onClick={handleIncrement}
            label="Increment count"
            renderCount={parentRenders}
          />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-green-600 uppercase tracking-wide">
            ✓ With useCallback + React.memo
          </p>
          <p className="text-xs text-gray-400 mb-1">
            Stable reference → memo skips re-render → child renders only once
          </p>
          <ExpensiveButton
            onClick={handleIncrement}
            label="Increment count"
            renderCount={1}
            highlight
          />
        </div>

        <p className="text-sm font-medium">Count: {count}</p>

        <div className="border-t pt-3 space-y-2">
          <p className="text-xs text-gray-400">
            Unrelated state: <strong>{unrelated}</strong> — triggers parent
            re-render without changing count
          </p>
          <button
            onClick={handleUnrelated}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm"
          >
            Update unrelated state
          </button>
        </div>
      </div>
    </div>
  );
};

export default UseCallBack;
