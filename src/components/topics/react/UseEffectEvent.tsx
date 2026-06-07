import React, { useEffect, useEffectEvent, useState } from "react";

const UseEffectEvent = () => {
  const [roomId, setRoomId] = useState("general");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Reads the latest theme without forcing re-subscribe when theme changes.
  const onConnected = useEffectEvent(() => {
    const style = theme === "dark" ? "dark" : "light";
    console.log(`Connected to ${roomId} (${style} theme)`);
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      onConnected();
    }, 500);

    return () => clearTimeout(timer);
  }, [roomId]);

  return (
    <div className="p-6 rounded bg-white">
      <h2 className="text-2xl font-bold mb-2">useEffectEvent</h2>
      <p className="text-gray-500 mb-4">
        Changing room re-runs the effect. Changing theme does not re-run the
        effect, but the event callback still reads the latest theme.
      </p>

      <div className="flex flex-wrap items-center gap-2 mb-3">
        <button
          onClick={() => setRoomId("general")}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          Join General
        </button>
        <button
          onClick={() => setRoomId("react")}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          Join React
        </button>
        <button
          onClick={() =>
            setTheme((prev) => (prev === "light" ? "dark" : "light"))
          }
          className="px-3 py-1 bg-gray-700 text-white rounded"
        >
          Toggle Theme
        </button>
      </div>

      <p className="text-sm text-gray-700">
        Room: <strong>{roomId}</strong> | Theme: <strong>{theme}</strong>
      </p>
      <p className="text-xs text-gray-500 mt-1">
        Check browser console for connection logs.
      </p>
    </div>
  );
};

export default UseEffectEvent;
