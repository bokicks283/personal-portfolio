import Badge from "../../Badge";

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
        <div
          key={group}
          className="surface-card p-6"
        >
          <h3 className="mb-3 text-[var(--fg)]/90 font-semibold">{group}</h3>
          <div className="flex flex-wrap gap-2">
            {items.map((name, i) => (
              <Badge key={`s-${i}`} text={name} animation="random"/>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
