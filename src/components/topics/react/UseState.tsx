import React, { useState } from "react";

const UseState = () => {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);

  const handleSubmit = () => {
    setSubmitted(text);
    setText("");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">useState Example</h2>
      <p className="text-gray-500">Local component state managed with the <code>useState</code> hook.</p>
      <div className="flex gap-2 mt-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSubmit}
          disabled={!text}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Submit
        </button>
      </div>
      {submitted && (
        <p className="mt-3 text-gray-700">
          You submitted: <strong>{submitted}</strong>
        </p>
      )}
    </div>
  );
};

export default UseState;
