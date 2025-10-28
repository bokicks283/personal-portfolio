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
      "Engineered a Flask-based automation API for managing SeleniumBase test suites.",
      "Developed CI/CD workflows using GitHub Actions, Docker, and Kubernetes for scalable automated deployments and continuous integration.",
      "Created front-end dashboards (React + Tailwind CSS) for real-time automation test reporting.",
      "Designed secure API authentication (JWT/OAuth) and implemented structured error handling for resilient automation infrastructure.",
      "Collaborated in Agile/Scrum environments, aligning QA efforts with cross-functional development goals."
    ],
  },
  {
    company: "PRC Industries",
    title: "Junior Full-Stack Web Developer",
    period: "2019 \u2013 2022",
    bullets: [
      "Developed and maintained business-critical web apps using PHP and JavaScript",
      "Built REST APIs with DreamFactory and implemented server-side validation with Node.js for data integrity",
      "Designed interactive Power BI dashboards and SQL reports using MySQL and SQL Server.",
      "Optimized complex SQL queries, reducing load time and enhancing reporting performance.",
      "Contributed to Agile sprints, peer code reviews, and integrated CI/CD testing for faster, more reliable deployments."
    ],
  },
];

export default function Experience() {
  return (
    <div className="surface-card p-6">
      <ol className="relative border-s border-[color:var(--ring)]/35">
        {roles.map((r, i) => (
          <li key={i} className="ms-6 pb-8 last:pb-0">
            <span className="absolute -start-1.5 mt-1 h-3 w-3 rounded-full bg-[color:var(--accent)] ring-4 ring-[var(--ring)]" />
            <h3 className="font-semibold text-[var(--fg)] text-header-sub-2">
              {r.title} — <span className="text-[var(--fg)]/80">{r.company}</span>
            </h3>
            <div className="text-[var(--fg)]/60 desktop-FHD:text-lg">{r.period}</div>
            <ul className="mt-2 list-disc ps-5 text-[var(--fg)]/80 text-content">
              {r.bullets.map((b, j) => <li key={j}>{b}</li>)}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
