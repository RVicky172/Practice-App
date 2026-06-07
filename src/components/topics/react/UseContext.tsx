import React from "react";
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext<"light" | "dark">("light");

const UseContext = () => {
  const [theme, setTheme] = useState<"light" | "dark">(
    () => (localStorage.getItem("app-theme") as "light" | "dark") ?? "light",
  );

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("app-theme", newTheme);
  };

  return (
    <ThemeContext value={theme}>
      <div
        className={`p-6 rounded ${theme === "light" ? "bg-gray-100 text-gray-800" : "bg-gray-800 text-gray-100"}`}
      >
        <h2 className="text-2xl font-bold mb-2">useContext</h2>
        <p className="text-gray-500 mb-4">
          useContext is a React Hook that lets you access the value of a context
          directly in your components.
        </p>
        <button
          onClick={toggleTheme}
          className={`px-4 py-2 rounded ${theme === "light" ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-yellow-500 text-gray-800 hover:bg-yellow-600"}`}
        >
          Toggle Theme
        </button>
        <ThemedBox />
      </div>
    </ThemeContext>
  );
};

const ThemedBox = () => {
  const theme = useContext(ThemeContext);

  return (
    <div
      className={`p-4 rounded mt-4 ${theme === "light" ? "bg-gray-200 text-gray-800" : "bg-gray-700 text-gray-100"}`}
    >
      This box adapts to the current theme!
    </div>
  );
};

export default React.memo(UseContext, () => true);
