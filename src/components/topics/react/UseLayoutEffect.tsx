import React, { useLayoutEffect, useRef, useState } from "react";

const UseLayoutEffect = () => {
  const [boxWidth, setBoxWidth] = useState(180);
  const measuredRef = useRef<HTMLDivElement>(null);
  const [measuredWidth, setMeasuredWidth] = useState(0);

  // Runs after DOM update but before paint, preventing visible measurement flicker.
  useLayoutEffect(() => {
    const width = measuredRef.current?.getBoundingClientRect().width ?? 0;
    setMeasuredWidth(Math.round(width));
  }, [boxWidth]);

  return (
    <div className="p-6 rounded bg-white">
      <h2 className="text-2xl font-bold mb-2">useLayoutEffect</h2>
      <p className="text-gray-500 mb-4">
        useLayoutEffect is useful for reading layout and applying synchronous
        updates before the browser paints.
      </p>

      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setBoxWidth((w) => Math.max(120, w - 40))}
          className="px-3 py-1 bg-gray-700 text-white rounded"
        >
          Shrink
        </button>
        <button
          onClick={() => setBoxWidth((w) => Math.min(360, w + 40))}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          Grow
        </button>
      </div>

      <div
        ref={measuredRef}
        style={{ width: boxWidth }}
        className="h-16 rounded bg-blue-100 border border-blue-300 transition-[width] duration-200"
      />

      <p className="text-sm text-gray-700 mt-3">
        Target width: {boxWidth}px | Measured width: {measuredWidth}px
      </p>
    </div>
  );
};

export default UseLayoutEffect;
