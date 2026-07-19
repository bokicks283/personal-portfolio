import { useEffect, useMemo, useState, type JSX } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { IOptions, RecursivePartial } from "@tsparticles/engine";
import { getCssVarColor } from "@/shared/lib";

type ParticleBackgroundProps = {
  children: JSX.Element | JSX.Element[];
  className?: string;
  zIndex?: number;
  /** negative values move the particles opposite scroll direction (parallax) */
  factor?: number; // default -0.08
};

function ParticleBackground({ className, zIndex = 10, children}: ParticleBackgroundProps) {
  const [init, setInit] = useState(false);
  const [colors, setColors] = useState({
    fg: "#ffffff",
    accent: "#ffffff",
    bg: "#000000",
  });
  const [reduceMotion, setReduceMotion] = useState(false);
  const deviceProfile = useMemo(() => {
    if (typeof window === "undefined") return "balanced" as const;
    const nav = navigator as Navigator & { deviceMemory?: number };
    const cores = nav.hardwareConcurrency ?? 4;
    const memory = nav.deviceMemory ?? 4;
    return cores >= 8 && memory >= 8 ? "high" as const : "balanced" as const;
  }, []);

  // Keep particles colors synced to theme vars
  useEffect(() => {
    // Resolve colors whenever the theme changes
    const updateColors = () => {
      setColors({
        fg: getCssVarColor("--fg"),
        accent: getCssVarColor("--accent"),
        bg: getCssVarColor("--bg"),
      });
    };

    updateColors();
    // Re-run whenever data-theme changes
    const observer = new MutationObserver(updateColors);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const particlesOptions: RecursivePartial<IOptions> = useMemo(() => {
    const particleCount = reduceMotion ? 48 : deviceProfile === "high" ? 140 : 100;
    const minSpeed = reduceMotion ? 0.2 : deviceProfile === "high" ? 1.2 : 0.9;
    const maxSpeed = reduceMotion ? 0.8 : deviceProfile === "high" ? 4.2 : 3.2;
    const linkDistance = deviceProfile === "high" ? 190 : 165;

    return {
      fpsLimit: 60,
      pauseOnBlur: true,
      detectRetina: true,
      background: {
        position: "10% 50%",
        color: colors.bg
      },
      particles: {
        color: {
          value: colors.fg
        },
        links: {
          color: colors.accent,
          distance: linkDistance,
          enable: !reduceMotion,
          opacity: 0.45,
          width: 1
        },
        collisions: {
          enable: false
        },
        move: {
          direction: "left",
          enable: true,
          random: true,
          speed: {
            min: minSpeed,
            max: maxSpeed
          },
          straight: false
        },
        number: {
          density: {
            enable: true
          },
          value: particleCount
        },
        opacity: {
          value: reduceMotion ? 0.3 : 0.48
        },
        shape: {
          type: "circle"
        },
        size: {
          value: {
            min: 1,
            max: reduceMotion ? 2 : deviceProfile === "high" ? 5 : 4
          }
        }
      },
      fullScreen: true
    };
  }, [colors.accent, colors.bg, colors.fg, deviceProfile, reduceMotion]);

  useEffect(() => {
    if (init) return;
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, [init]);

  return (
    <div className={`relative min-h-screen ${className ?? ""}`} style={{ zIndex }}>
      {init && <Particles id="tsparticles" options={particlesOptions} />}
      {/* Content sits above the fixed particles */}
      <div className="relative" style={{ zIndex: zIndex + 1 }}>
        {children}
      </div>
    </div>
  );
}

export default ParticleBackground;
