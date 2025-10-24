import { useActiveSection } from "../../hooks/useActiveSection";

type SectionDef = { id: string; label: string };
type Props = { sections: readonly SectionDef[] };

export default function OnePageNav({ sections }: Props) {
  const active = useActiveSection(sections.map(s => s.id));

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/30 bg-black/20 border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <a href="#home" className="font-semibold tracking-wide">RB</a>
        <nav className="hidden md:flex gap-6 text-sm">
          {sections.map(s => (
            <a
              key={s.id}
              href={"#" + s.id}
              className={[
                "transition-colors hover:text-cyan-300",
                active === s.id ? "text-cyan-300" : "text-white/80"
              ].join(" ")}
            >
              {s.label}
            </a>
          ))}
        </nav>
        <select
          className="md:hidden bg-transparent text-white/90 text-sm outline-none"
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
      </div>
    </header>
  );
}
