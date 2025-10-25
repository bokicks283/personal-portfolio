import { useEffect, useRef, useState, type JSX } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import type { IOptions, RecursivePartial } from "@tsparticles/engine";
import { getCssVarColor } from "../../utils";

type ParticleBackgroundProps = {
  children: JSX.Element | JSX.Element[];
  className?: string;
  zIndex?: number;
  factor?: number;
};

function ParticleBackground({ className, zIndex = 10, children, factor = -0.08 }: ParticleBackgroundProps) {
  const [init, setInit] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [colors, setColors] = useState({
    fg: "#ffffff",
    accent: "#ffffff",
    bg: "#000000",
  });

  // update transform on scroll
  useEffect(() => {
    const onScroll = () => {
      if (!wrapRef.current) return;
      wrapRef.current.style.transform = `translateY(${window.scrollY * factor}px)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [factor]);


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
  const particlesOptions: RecursivePartial<IOptions> = {
    background: {
      size: "10%",
      position: "10% 50%",
      color: colors.bg
    },
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push"
        },
        onHover: {
          enable: true,
          mode: "repulse"
        }
      },
      modes: {
        push: {
          quantity: 4
        },
        repulse: {
          distance: 100,
          duration: 0.4
        }
      }
    },
    particles: {
      color: {
        value: colors.fg
      },
      links: {
        color: colors.accent,
        distance: 200,
        enable: true,
        opacity: 0.5,
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
          min: 1,
          max: 6
        },
        straight: true
      },
      number: {
        density: {
          enable: true
        },
        value: 100
      },
      opacity: {
        value: 0.5
      },
      shape: {
        type: "circle"
      },
      size: {
        value: {
          min: 1,
          max: 5
        }
      }
    },
    fullScreen: true
  }
  useEffect(() => {
    if (init) {
      return;
    }
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`relative min-h-screen ${className}`} style={{ zIndex: zIndex }}>
      {init && <Particles id="tsparticles" options={particlesOptions} />}
      <div className={`relative`} style={{ zIndex: zIndex + 1 }}>
        {children}
      </div>
    </div>
  );
}

export default ParticleBackground;
