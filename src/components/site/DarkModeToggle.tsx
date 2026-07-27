import { useEffect, useState } from "react";

export function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    if (stored) {
      setIsDark(stored === "dark");
    } else {
      setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark, mounted]);

  if (!mounted) {
    // Render placeholder with same layout/dimensions to avoid layout shift
    return <div className="w-14 h-7" />;
  }

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id="darkmode-toggle"
        className="sr-only"
        checked={isDark}
        onChange={(e) => setIsDark(e.target.checked)}
      />
      <label
        htmlFor="darkmode-toggle"
        className="relative block w-14 h-7 bg-slate-200 dark:bg-slate-800 rounded-full cursor-pointer transition-colors shadow-inner"
        style={{
          boxShadow: "inset 0px 1px 4px rgba(0,0,0,0.15), inset 0px -1px 4px rgba(255,255,255,0.1)",
        }}
      >
        {/* Sun Icon */}
        <svg
          className="absolute left-1.5 top-1.5 w-4 h-4 text-amber-500 transition-opacity duration-300 dark:opacity-30 fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.01a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z" />
        </svg>

        {/* Moon Icon */}
        <svg
          className="absolute right-1.5 top-1.5 w-4 h-4 text-slate-400 dark:text-indigo-300 transition-opacity duration-300 opacity-30 dark:opacity-100 fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M12.3 2a10 10 0 00-1.9 1.5 9.1 9.1 0 00-2 8.7 8.8 8.8 0 008.8 7.3c1.6 0 3.1-.4 4.5-1.2A10 10 0 1112.3 2z" />
        </svg>

        {/* Knob */}
        <span
          className="absolute left-1 top-1 block w-5 h-5 bg-white dark:bg-slate-100 rounded-full shadow-md transition-all duration-300 ease-in-out transform dark:translate-x-7"
          style={{
            background: "linear-gradient(180deg, #ffffff, #f1f5f9)",
          }}
        />
      </label>
    </div>
  );
}
