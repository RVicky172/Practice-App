import React, { useEffect, useState } from "react";

const UseEffect = () => {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [running]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">useEffect Example</h2>
      <p className="text-gray-500">
        A stopwatch using <code>useEffect</code> to manage a side effect
        (interval timer).
      </p>
      <p className="text-6xl font-bold my-4">{seconds}s</p>
      <div className="flex gap-2">
        <button
          onClick={() => setRunning(true)}
          disabled={running}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Start
        </button>
        <button
          onClick={() => setRunning(false)}
          disabled={!running}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Stop
        </button>
        <button
          onClick={() => {
            setRunning(false);
            setSeconds(0);
          }}
          className="px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default UseEffect;
