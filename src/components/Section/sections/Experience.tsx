type Role = {
  company: string;
  title: string;
  period: string;
  bullets: string[];
};

const roles: Role[] = [
  {
    company: "Clinical Trial Media",
    title: "Software Development Engineer in Test (SDET)",
    period: "2022 \u2013 2025",
    bullets: [
      "Built scalable pytest/SeleniumBase suites; accelerated delivery with proactive regression coverage.",
      "Drove CI stability and actionable reporting; reduced flaky test rate significantly.",
    ],
  },
  {
    company: "PRC Industries",
    title: "Full-stack Engineer",
    period: "2019 \u2013 2022",
    bullets: [
      "Delivered features across React front-end and Python back-end with strong test coverage.",
      "Collaborated with designers and QAs in fast-paced Agile teams.",
    ],
  },
];

export default function Experience() {
  return (
    <ol className="relative border-s border-[color:var(--ring)]/40">
      {roles.map((r, i) => (
        <li key={i} className="ms-6 pb-8 last:pb-0">
          <span className="absolute -start-1.5 mt-1 h-3 w-3 rounded-full bg-[color:var(--accent)] ring-4 ring-[var(--ring)]" />
          <h3 className="font-semibold">{r.title} — <span className="text-[var(--fg)]/80">{r.company}</span></h3>
          <div className="text-sm text-[var(--fg)]/60">{r.period}</div>
          <ul className="mt-2 list-disc ps-5 text-[var(--fg)]/80">
            {r.bullets.map((b, j) => <li key={j}>{b}</li>)}
          </ul>
        </li>
      ))}
    </ol>
  );
}
