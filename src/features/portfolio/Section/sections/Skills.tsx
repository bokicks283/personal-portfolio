import Badge from "@/shared/components/Badge";

const skills = {
  "Languages": ["Python", "C", "C++", "C#", "PHP", "HTML", "CSS", "TypeScript/JavaScript", 
    "SQL", "JSON", "XML", "Bash", "PowerShell", "Markdown", "Java"],
  "Frontend": ["React", "Tailwind v4", "Bootstrap", "Kendo UI", "npm", "NX"],
  "Testing": ["Pytest", "SeleniumBase", "Selenium", "Playwright"],
  "Backend": ["Flask/FastAPI", "CodeIgniter", "MSSQL", "MySQL", "MongoDB", "Postman"],
  "DevOps": ["Git", "GitHub Actions", "Docker", "Kubernetes", "IIS", "Jira", "Asana", "Confluence"],
  "Concepts": ["OOP", "TDD", "Automation Frameworks", "CI/CD Pipelines", "Responsive Design", "UX/UI Principles",
    "Agile/Scrum", "RESTful APIs", "Authentication (JWT/OAuth)", "Structured Logging", "Error Handling", "Performance Optimization"],
  "Other": ["Fusion 360", "Bambu Slicer", "3D Printing", "Power BI", "Microsoft Excel"],
};

export default function Skills() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {Object.entries(skills).map(([group, items]) => (
        <div
          key={group}
          className="surface-card p-6"
        >
          <h3 className="mb-3 text-[var(--fg)]/90 font-semibold text-header-2">{group}</h3>
          <div className="flex flex-wrap gap-2">
            {items.map((name, i) => (
              <Badge key={`s-${i}`} text={name} animation="random" className="text-detail" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
