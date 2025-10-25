import { useEffect, useState } from "react";
import Dropdown, { type Group } from "../DropDown";
import { type ThemeName } from "../../providers";

// Label map for every theme in main.css
const LABEL: Record<ThemeName, string> = {
  // Dark / Vivid
  redblack: "Red / Black",
  neonblue: "Neon Blue",
  cyan: "Cyan Gray",
  violet: "Dark Violet",
  cyberpurple: "Cyber Purple",
  emeraldnight: "Emerald Night",
  amberforge: "Amber Forge",
  midnightteal: "Midnight Teal",
  crimsonvoid: "Crimson Void",
  indigonova: "Indigo Nova",
  electriclime: "Electric Lime",
  obsidianamber: "Obsidian Amber",

  // Neutral / Soft
  steelgray: "Steel Gray",
  mauvesand: "Mauve Sand",
  sagegray: "Sage Gray",
  fogsteel: "Fog Steel",
  linenstone: "Linen Stone",
  mossdrift: "Moss Drift",
  smoketaupe: "Smoke Taupe",

  // Light / Bright
  pastelmint: "Pastel Mint",
  sunsetpeach: "Sunset Peach",
  arctic: "Arctic",
  roseivory: "Rose Ivory",
  lavendercloud: "Lavender Cloud",
  lemonfrost: "Lemon Frost",
  powderday: "Powder Day",
  peachsorbet: "Peach Sorbet",
  mintcream: "Mint Cream",
  lavenderhaze: "Lavender Haze",
};

// Keep the grouping aligned with your CSS sections
const GROUPS: Group[] = [
  {
    label: "Dark / Vivid",
    options: [
      "redblack", "neonblue", "cyan", "violet", "cyberpurple",
      "emeraldnight", "amberforge", "midnightteal", "crimsonvoid",
      "indigonova", "electriclime", "obsidianamber",
    ].map(v => ({ value: v, label: LABEL[v as ThemeName] })),
  },
  {
    label: "Neutral / Soft",
    options: [
      "steelgray", "mauvesand", "sagegray", "fogsteel",
      "linenstone", "mossdrift", "smoketaupe",
    ].map(v => ({ value: v, label: LABEL[v as ThemeName] })),
  },
  {
    label: "Light / Bright",
    options: [
      "pastelmint", "sunsetpeach", "arctic", "roseivory",
      "lavendercloud", "lemonfrost", "powderday", "peachsorbet",
      "mintcream", "lavenderhaze",
    ].map(v => ({ value: v, label: LABEL[v as ThemeName] })),
  },
];

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeName>(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("theme")) as ThemeName | null;
    return saved ?? "redblack";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <Dropdown
      value={theme}
      onChange={v => setTheme(v as ThemeName)}
      groups={GROUPS}
      maxMenuHeight={20}
      insideLabel="Theme"
      separator={<span className="text-[var(--accent)] mx-1">•</span>}
      showSelectedValue
    />
  );
}
