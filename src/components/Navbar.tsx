import React, { useMemo } from "react";

type ThemeMode = "light" | "dark";

interface NavbarProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
}

const Navbar = (props: NavbarProps) => {
  const { theme, onToggleTheme } = props;

  const headerStyles = useMemo(
    () => ({
      backgroundColor: theme === "light" ? "#ffffff" : "#0f172a",
      borderColor: theme === "light" ? "#e6e6e6" : "#334155",
      backdropFilter: "blur(12px)",
    }),
    [theme],
  );

  console.log("Navbar rendering with theme:", theme);

  return (
    <header
      className="sticky top-0 z-20 border-b transition-colors duration-300 ease-in-out"
      data-theme={theme}
      style={headerStyles}
    >
      <div
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 transition-colors duration-300"
        style={{
          backgroundColor: theme === "light" ? "#ffffff" : "#0f172a",
        }}
      >
        <div className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500 text-white shadow-sm dark:bg-sky-400/90 transition-colors duration-300">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3l2 5 5 1-4 3 1 5-4-3-4 3 1-5-4-3 5-1 2-5z" />
            </svg>
          </span>
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.35em] transition-colors duration-300"
              style={{
                color: theme === "light" ? "#64748b" : "#94a3b8",
              }}
            >
              Practice App
            </p>
            <h1
              className="text-xl font-semibold transition-colors duration-300"
              style={{
                color: theme === "light" ? "#0f172a" : "#f1f5f9",
              }}
            >
              React Playground
            </h1>
          </div>
        </div>

        <button
          type="button"
          onClick={onToggleTheme}
          className="group relative inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 ease-in-out hover:shadow-lg active:scale-95"
          style={
            theme === "light"
              ? {
                  backgroundColor: "#0ea5e9",
                  borderColor: "#0284c7",
                  color: "#ffffff",
                }
              : {
                  backgroundColor: "#6366f1",
                  borderColor: "#4f46e5",
                  color: "#ffffff",
                }
          }
        >
          <span className="inline-flex h-4 w-4 items-center justify-center transition-transform duration-300 group-hover:scale-125">
            {theme === "dark" ? (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M12 3a1 1 0 0 0 0 2 7 7 0 1 1-7 7 1 1 0 1 0-2 0A9 9 0 1 0 12 3z" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            )}
          </span>
          <span className="transition-colors duration-300">
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
