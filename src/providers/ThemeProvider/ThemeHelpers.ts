import { createContext, useContext } from "react";

// Add any missing theme literals here so ThemeToggle (and others) can be strongly typed.
export type ThemeName =
  // Dark / Vivid
  | "redblack" | "neonblue" | "cyan" | "violet" | "cyberpurple"
  | "emeraldnight" | "amberforge" | "midnightteal" | "crimsonvoid"
  | "indigonova" | "electriclime" | "obsidianamber"

  // Neutral / Soft
  | "steelgray" | "mauvesand" | "sagegray" | "fogsteel"
  | "linenstone" | "mossdrift" | "smoketaupe"

  // Light / Bright
  | "pastelmint" | "sunsetpeach" | "arctic" | "roseivory"
  | "lavendercloud" | "lemonfrost" | "powderday" | "peachsorbet"
  | "mintcream" | "lavenderhaze";


export type ThemeContextValue = {
  theme: ThemeName;
  setTheme: (next: ThemeName) => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
