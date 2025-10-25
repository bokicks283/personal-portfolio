type Project = {
  title: string;
  blurb: string;
  tags: string[];
  link?: string;
  repo?: string;
};

const projects: Project[] = [
  {
    title: "TypedText — React typing animation",
    blurb: "High‑performance, caret‑aware typing component with precise scheduling and replay controls.",
    tags: ["React", "TypeScript", "Tailwind"],
    repo: "https://github.com/bokicks283/PersonalWebsite",
  },
  {
    title: "CTM QA Automation",
    blurb: "Custom pytest + SeleniumBase framework: grouping scheduler, screenshot utilities, rich summary.",
    tags: ["Python", "Pytest", "SeleniumBase"],
  },
];

export default function Projects() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {projects.map((p) => (
        <article key={p.title} className="group rounded-2xl border border-[color:var(--ring)]/70 p-5 hover:border-[color:var(--ring)] transition-colors">
          <header className="mb-2">
            <h3 className="text-lg font-semibold">{p.title}</h3>
          </header>
          <p className="text-[var(--muted)]/80">{p.blurb}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {p.tags.map(t => (
              <span key={t} className="rounded-full border border-[color:var(--ring)]/65 px-2.5 py-1 text-xs text-[var(--fg)]/70">{t}</span>
            ))}
          </div>
          <div className="mt-4 flex gap-4 text-sm">
            {p.link && <a href={p.link} className="text-[color:var(--accent)] hover:underline">Live</a>}
            {p.repo && <a href={p.repo} className="text-[color:var(--accent)] hover:underline">Repo</a>}
          </div>
        </article>
      ))}
    </div>
  );
}
