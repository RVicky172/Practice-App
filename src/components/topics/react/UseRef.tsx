import React, { useRef, useState } from "react";

const UseRef = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const renderCountRef = useRef(1);
  const [name, setName] = useState("");
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  renderCountRef.current += 1;

  const handleSubmit = () => {
    const nextName = inputRef.current?.value.trim() ?? "";
    if (!nextName) {
      inputRef.current?.focus();
      return;
    }

    setSubmittedName(nextName);
    setName("");
    inputRef.current?.focus();
  };

  return (
    <div className="p-6 rounded bg-white">
      <h2 className="text-2xl font-bold mb-2">useRef</h2>
      <p className="text-gray-500 mb-4">
        Holds mutable values across renders without triggering re-renders and
        can store DOM references.
      </p>

      <div className="rounded border border-gray-200 p-4 bg-gray-50 space-y-3">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Name</label>
          <input
            ref={inputRef}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Type your name"
            className="w-full max-w-sm px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSubmit}
            className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
          <button
            onClick={() => inputRef.current?.focus()}
            className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
          >
            Focus Input
          </button>
        </div>

        {submittedName && (
          <p className="text-sm text-gray-700">
            Last submitted: <strong>{submittedName}</strong>
          </p>
        )}

        <p className="text-xs text-gray-500">
          Render count stored in ref: {renderCountRef.current}
        </p>
      </div>
    </div>
  );
};

export default UseRef;
