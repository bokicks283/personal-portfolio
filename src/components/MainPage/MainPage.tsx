import PageNav from "../PageNav";
import Section from "../Section";
import Hero from "../Section/sections/Hero";
import About from "../Section/sections/About";
import Skills from "../Section/sections/Skills";
import Projects from "../Section/sections/Projects";
import Experience from "../Section/sections/Experience";
import Contact from "../Section/sections/Contact";
import ParticleBackground from "../ParticleBackground";

export default function MainPage() {
  const sections = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ];

  return (
      <ParticleBackground className="text-white selection:bg-cyan-300/30">
        <PageNav sections={sections} />
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Section id="home"><Hero /></Section>
          <Section id="about" title="About"><About /></Section>
          <Section id="skills" title="Skills"><Skills /></Section>
          <Section id="projects" title="Projects"><Projects /></Section>
          <Section id="experience" title="Experience"><Experience /></Section>
          <Section id="contact" title="Contact"><Contact /></Section>
        </main>
        <footer className="mt-16 border-t border-white/10 py-8 text-center text-sm text-white/60">
          © {new Date().getFullYear()} Ronald S. Bocchichio — Built with React & Tailwind
        </footer>
      </ParticleBackground>
  );
}
