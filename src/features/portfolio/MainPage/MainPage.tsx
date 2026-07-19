import ThemeProvider, { ScrollSnapProvider } from "@/app/providers";
import PageNav from "@/features/portfolio/PageNav";
import Section from "@/features/portfolio/Section";
import About from "@/features/portfolio/Section/sections/About";
import Contact from "@/features/portfolio/Section/sections/Contact";
import Experience from "@/features/portfolio/Section/sections/Experience";
import Hero from "@/features/portfolio/Section/sections/Hero";
import Projects from "@/features/portfolio/Section/sections/Projects";
import Skills from "@/features/portfolio/Section/sections/Skills";
import ParticleBackground from "@/shared/components/ParticleBackground";
import { usePageOverlayScrollbar, useSnapBoundOffsets } from "@/shared/hooks";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

export default function MainPage() {
  usePageOverlayScrollbar({
    thicknessPx: 4,
    thumbRightPx: 2,
    thumbMinPx: 300,
    railInsetTopPx: 70,
    hideAfterMs: 900,
  });
  useSnapBoundOffsets(".page-container.snap-container--y");

  const content = (
    <>
      <PageNav sections={sections} />
      <main className="page-container snap-container--y">
        <Section id="home" snapHeight="fit"><Hero /></Section>
        <Section id="about" title="About"><About /></Section>
        <Section id="skills" title="Skills"><Skills /></Section>
        <Section id="projects" title="Projects"><Projects /></Section>
        <Section id="experience" title="Experience"><Experience /></Section>
        <Section id="contact" snapHeight="center" snapAlign="center" title="Contact"><Contact /></Section>
      </main>
      <footer className="mt-0 border-t border-[color:var(--ring)] py-4 text-center text-detail text-[var(--muted)]">
        <span>© {new Date().getFullYear()} Ronald S. Bocchichio — Built with <a href="https://react.dev/">React</a>, <a href="https://particles.js.org/">tsparticles</a> & <a href="https://tailwindcss.com/">Tailwind CSS</a></span>
      </footer>
    </>
  );

  return (
    <ScrollSnapProvider>
      <ThemeProvider>
        <ParticleBackground className="min-h-screen text-[var(--fg)] selection:bg-[var(--accent)]">
          {content}
        </ParticleBackground>
      </ThemeProvider>
    </ScrollSnapProvider>
  );
}
