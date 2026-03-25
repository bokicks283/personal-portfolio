export type SocialLink = {
  label: string;
  href: string;
};

export type Project = {
  title: string;
  blurb: string;
  tags: string[];
  highlights?: string[];
  link?: string;
  repo?: string;
};

export type Role = {
  company: string;
  title: string;
  location: string;
  period: string;
  bullets: string[];
  stack?: string[];
};

export type Profile = {
  name: string;
  initials: string;
  headline: string;
  heroIntro: string;
  email: string;
  location: string;
  openTo: string;
  summary: string[];
  differentiators: string[];
  socials: SocialLink[];
  resumeUrl?: string;
  skills: Record<string, string[]>;
  projects: Project[];
  experience: Role[];
};

export const profile: Profile = {
  name: "Ronald Bocchichio",
  initials: "RB",
  headline: "Software Engineer | Full-stack + SDET",
  heroIntro:
    "Software Engineer focused on robust automation, reliable APIs, and fast, accessible front-end experiences.",
  email: "rbocchichio@gmail.com",
  location: "United States",
  openTo: "Open to full-time Software Engineer, SDET, and QA automation roles.",
  summary: [
    "I am a Python-first SDET and full-stack engineer focused on shipping high-quality, testable software.",
    "I build automation frameworks with pytest and SeleniumBase, backend APIs, and modern React front-end applications.",
    "This portfolio highlights selected projects, practical implementation details, and tools I have built to improve engineering velocity.",
  ],
  differentiators: [
    "End-to-end ownership from requirements through delivery and test automation.",
    "Product-minded approach to quality, performance, and maintainability.",
    "Strong collaboration with cross-functional teams in Agile environments.",
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/bokicks283" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ronald-bocchichio/" },
  ],
  skills: {
    Languages: ["Python", "TypeScript", "JavaScript", "SQL"],
    Frontend: ["React", "Vite", "Tailwind CSS"],
    "Backend and Testing": ["Flask", "FastAPI", "Pytest", "SeleniumBase", "Playwright"],
    DevOps: ["GitHub Actions", "Docker", "Linux", "CI/CD"],
  },
  projects: [
    {
      title: "TypedText - React typing animation",
      blurb: "High-performance typing component with precise scheduling, style-aware rendering, and replay controls.",
      tags: ["React", "TypeScript", "Tailwind"],
      highlights: [
        "Optimized rendering by batching text runs and minimizing unnecessary updates.",
        "Built a configurable API for line timing, caret behavior, and repeat controls.",
      ],
      repo: "https://github.com/bokicks283/PersonalWebsite",
    },
    {
      title: "CTM QA Automation",
      blurb: "Custom pytest and SeleniumBase framework with grouped execution, screenshots, and richer test reporting.",
      tags: ["Python", "Pytest", "SeleniumBase", "CI/CD"],
      highlights: [
        "Designed reusable testing utilities to speed up suite authoring and reduce duplicate logic.",
        "Focused on reliability and actionable output for faster debugging and triage.",
      ],
    },
  ],
  experience: [
    {
      company: "Clinical Trial Media",
      title: "Software Development Engineer in Test (SDET)",
      location: "United States",
      period: "2022 - 2025",
      bullets: [
        "Built scalable pytest and SeleniumBase suites with broader regression coverage.",
        "Improved CI stability and test reporting quality to speed up release confidence.",
      ],
      stack: ["Python", "Pytest", "SeleniumBase", "GitHub Actions"],
    },
    {
      company: "PRC Industries",
      title: "Full-stack Engineer",
      location: "United States",
      period: "2019 - 2022",
      bullets: [
        "Delivered product features across React front-end and Python back-end services.",
        "Partnered with design and QA to ship iterative improvements in Agile teams.",
      ],
      stack: ["React", "TypeScript", "Python", "SQL"],
    },
  ],
};
