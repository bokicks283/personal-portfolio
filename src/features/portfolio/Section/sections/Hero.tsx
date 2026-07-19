import { useEffect, useRef } from "react";
import TypedText, { type TypedTextHandle } from "@/shared/components/TypedText";

export default function Hero() {
  const ref = useRef<TypedTextHandle | null>(null);

  useEffect(() => {
    const el = document.getElementById("home");
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          // restart the headline when hero is snapped/visible
          ref.current?.replay("infinite");
        }
      },
      { root: null, rootMargin: "-40% 0px -55% 0px", threshold: [0.25, 0.6] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="reveal-item min-h-[70vh] grid place-items-center text-center">
      <div>
        <TypedText
          ref={ref}
          baseMsPerChar={80}
          baseMsLineDelay={1000}
          startDelayMs={250}
          autoplay={true}
          repeat={"infinite"}
          repeatDelayMs={10000}
          caretInsetPx={0}
          caretGapPx={1}
          caretBlinkMs={800}
          caretWidthPx={6}
          fontSizeClass="text-[clamp(4rem,8vw,6.5rem)]"
          linesClassName="leading-tight"
          caretColorClass="text-[var(--accent)]"
          lines={[
            {
              segments: [
                { text: "Ronald Bocchichio", bold: true, colorClass: "text-[var(--fg)] text-hero" },
              ]
            },
            {
              segments: [
                { text: "Software Engineer", bold: true, colorClass: "text-[var(--accent)]" },
                { text: " — Builder of robust ", colorClass: "text-[var(--fg)]" },
                { text: "automation", bold: true, colorClass: "text-[var(--accent)]" },
                { text: ", powerful ", colorClass: "text-[var(--fg)]" },
                { text: "APIs", bold: true, colorClass: "text-[var(--accent)]" },
                { text: ", and delightful ", colorClass: "text-[var(--fg)]" },
                { text: "UIs", bold: true, colorClass: "text-[var(--accent)]" },
                { text: ".", colorClass: "text-[var(--fg)]" },
              ],
              caretWidthPx: 2,
              caretInsetPx: 0,
              lineClassName: "text-[var(--fg)] text-header-3",
              msPerChar: 55,
              pausesAt: [
                { index: 18, delayMs: 1000 },
                { index: 50, delayMs: 400 },
                { index: 65, delayMs: 400 },
              ]
            }
          ]}
        />
        <div className="mt-8 flex items-center justify-center gap-3">
          <a href="#projects" className="btn btn-accent text-detail">View Projects</a>
          <a href="#contact" className="btn btn-outline text-detail">Contact</a>

        </div>
      </div>
    </div>
  );
}
