const skills = {
  "Languages": ["Python", "TypeScript/JavaScript", "SQL"],
  "Frontend": ["React", "Vite", "Tailwind v4"],
  "Backend/Testing": ["Flask/FastAPI", "Pytest", "SeleniumBase", "Playwright"],
  "DevOps": ["GitHub Actions", "Docker", "Linux"],
};

export default function Skills() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {Object.entries(skills).map(([group, items]) => (
        <div key={group} className="rounded-2xl border border-[color:var(--ring)]/70 p-5">
          <h3 className="mb-3 text-[var(--fg)]/90 font-semibold">{group}</h3>
          <div className="flex flex-wrap gap-2">
            {items.map((name) => (
              <span key={name} className="rounded-full bg-[var(--surface)]/60 px-3 py-1 text-sm text-[var(--muted)]/80">
                {name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
