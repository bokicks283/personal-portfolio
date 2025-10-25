import ThemeProvider from "../../providers";
import PageNav from "../PageNav";
import Section from "../Section";
import Hero from "../Section/sections/Hero";
import About from "../Section/sections/About";
import Skills from "../Section/sections/Skills";
import Projects from "../Section/sections/Projects";
import Experience from "../Section/sections/Experience";
import Contact from "../Section/sections/Contact";
import ParticleBackground from "../ParticleBackground";
import { ScrollSnapProvider } from "../../providers/ScrollSnapProvider/ScrollSnapProvider";
import { useOverlayScrollbar } from "../../hooks";

export default function MainPage() {
  useOverlayScrollbar({
    thicknessPx: 4,
    thumbRightPx: 2,
    thumbMinPx: 300,
    railInsetTopPx: 70,
    hideAfterMs: 900,
  })
  const sections = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <ScrollSnapProvider>
      <ThemeProvider>
        {/* Giving ParticleBackground a background color of " " confuses tsparticles making it default to className */}
        <ParticleBackground className="min-h-screen text-[var(--fg)] selection:bg-[var(--accent)]">
          <PageNav sections={sections} />
          <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <Section id="home"><Hero /></Section>
            <Section id="about" title="About"><About /></Section>
            <Section id="skills" title="Skills"><Skills /></Section>
            <Section id="projects" title="Projects"><Projects /></Section>
            <Section id="experience" title="Experience"><Experience /></Section>
            <Section id="contact" title="Contact"><Contact /></Section>
          </main>
          <footer className="mt-0 border-t border-[color:var(--ring)] py-8 text-center text-sm text-[var(--muted)]">
            <span>© {new Date().getFullYear()} Ronald S. Bocchichio — Built with <a href="https://react.dev/">React</a>, <a href="https://particles.js.org/">tsparticles</a> & <a href="https://tailwindcss.com/">Tailwind CSS</a></span>
          </footer>
        </ParticleBackground>
      </ThemeProvider>
    </ScrollSnapProvider>
  );
}
