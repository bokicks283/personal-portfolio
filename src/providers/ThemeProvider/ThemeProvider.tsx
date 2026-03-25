import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ThemeContext, type ThemeName } from "./ThemeHelpers";
export default function ThemeProvider({ children }: { children: ReactNode }) {
  const preferred: ThemeName = "redblack";
  const [theme, setTheme] = useState<ThemeName>(() => {
    const saved = (typeof window !== "undefined" && window.localStorage.getItem("theme")) as ThemeName | null;
    return saved ?? preferred;
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("theme", theme); } catch {console.error("Failed to save theme to localStorage");}
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
