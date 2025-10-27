import ThemeToggle from "../ThemeToggle";
import { useActiveSection } from "../../hooks";
import RBLogo from "../../assets/RBLogoInverted.svg";         // normal (for dark themes)
import RBLogoDark from "../../assets/RBLogo.svg";             // inverted counterpart for light themes
import { useEffect, useState } from "react";

function useCurrentThemeName() {
  const [theme, setTheme] = useState<string>(() =>
    document.documentElement.getAttribute("data-theme") ?? "redblack"
  );

  useEffect(() => {
    const obs = new MutationObserver(() => {
      const t = document.documentElement.getAttribute("data-theme") ?? "redblack";
      setTheme(t);
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  return theme;
}
type SectionDef = { id: string; label: string };
type Props = { sections: readonly SectionDef[] };

const LIGHT_THEMES = new Set([
  "pastelmint", "sunsetpeach", "arctic", "roseivory",
  "lavendercloud", "lemonfrost", "powderday", "peachsorbet",
  "mintcream", "lavenderhaze"
]);

export default function PageNav({ sections }: Props) {
  const active = useActiveSection(sections.map(s => s.id));
  const theme = useCurrentThemeName();
  const isLightTheme = LIGHT_THEMES.has(theme);
  const logoSrc = isLightTheme ? RBLogoDark : RBLogo;
  return (
    <header 
      className="sticky top-0 z-50 backdrop-blur border-b border-[color:var(--ring)]"
      data-sticky="top"
      style={
        {
          backgroundColor: isLightTheme ? "rgb(255, 255, 255, 0.2)" : "rgb(0, 0, 0, 0.2)",
        }
      }
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#home" className="shrink-0">
          <span
            className="block h-12 w-12 rounded-full overflow-hidden ring-1 ring-[color:var(--ring)] bg-[var(--surface)] place-items-center"
            aria-label="Home"
          >
            <img
              src={logoSrc}
              alt="RB Logo"
              className="h-full w-full object-cover p-0"
            />
          </span>
        </a>
        <nav className="hidden md:flex gap-7 text-lg">
          {sections.map(s => (
            <a
              key={s.id}
              href={"#" + s.id}
              className={[
                "nav-link",
                active === s.id ? "nav-link--active" : ""
              ].join(" ")}
            >
              {s.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {/* TODO: Replace with DropDown component. Use css to ensure it stays to the left of theme toggle */}
          <select id="nav-selector"
            className="md:hidden bg-transparent text-white/90 text-md outline-none border border-[color:var(--ring)] rounded-lg px-2 py-1"
            value={active ?? "home"}
            onChange={(e) => {
              const id = e.target.value;
              const el = document.getElementById(id);
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            {sections.map(s => (
              <option key={s.id} value={s.id} className="text-black">{s.label}</option>
            ))}
          </select>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
