import React, { useId, useInsertionEffect, useState } from "react";

const UseInsertionEffect = () => {
  const [accent, setAccent] = useState("#2563eb");
  const scopeId = useId().replace(/:/g, "");
  const scopedClass = `insertion-scope-${scopeId}`;

  // Inserts styles before layout effects so style-dependent reads don't flicker.
  useInsertionEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.setAttribute("data-scope", scopedClass);
    styleEl.textContent = `
      .${scopedClass} {
        border-color: ${accent};
      }
      .${scopedClass} .chip {
        background: ${accent};
      }
    `;

    document.head.appendChild(styleEl);

    return () => {
      styleEl.remove();
    };
  }, [accent, scopedClass]);

  return (
    <div className="p-6 rounded bg-white">
      <h2 className="text-2xl font-bold mb-2">useInsertionEffect</h2>
      <p className="text-gray-500 mb-4">
        Useful for CSS-in-JS libraries to inject styles before layout effects.
        This demo injects a scoped style tag whenever the accent color changes.
      </p>

      <div className="mb-4 max-w-xs">
        <label className="block text-sm text-gray-600 mb-1">Accent color</label>
        <input
          type="color"
          value={accent}
          onChange={(e) => setAccent(e.target.value)}
          className="h-10 w-full border border-gray-300 rounded"
        />
      </div>

      <div className={`${scopedClass} border-2 rounded p-4 transition-colors`}>
        <div className="chip inline-block text-white text-xs px-2 py-1 rounded mb-2">
          Styled via useInsertionEffect
        </div>
        <p className="text-sm text-gray-700">Current accent: {accent}</p>
      </div>
    </div>
  );
};

export default UseInsertionEffect;
