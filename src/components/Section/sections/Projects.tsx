import Badge from "../../Badge";

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
    repo: "https://github.com/bokicks283/personal-portfolio",
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
        <article key={p.title} className="group surface-card p-6">
          <header className="mb-2">
            <h3 className="text-header-sub-2 text-[var(--fg)]">{p.title}</h3>
          </header>
          <p className="text-content text-[var(--muted)]/85">{p.blurb}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {p.tags.map((t, i) => (
              <Badge className="text-detail" key={`${p.title}-${i}`} text={t} animation="random"/>
            ))}
          </div>
          <div className="mt-4 flex gap-4 text-sm">
            {p.link && <a href={p.link} className="text-[var(--accent)] text-detail-2 hover:underline">Live</a>}
            {p.repo && <a href={p.repo} className="text-[var(--accent)] text-detail-2 hover:underline">Repo</a>}
          </div>
        </article>
      ))}
    </div>
  );
}
