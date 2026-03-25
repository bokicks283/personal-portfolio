// hooks/useRevealStable.ts
import { useEffect, useRef, useState } from "react";
import { ensureScrollDirInstalled, getScrollDir } from "@/shared/lib/scrollDir";

type RevealOpts = {
  threshold?: number | number[];
  root?: Element | Document | null;
  rootMargin?: string;
  once?: boolean;
};

export function useReveal({
  threshold = 0.15,
  root = null,
  rootMargin = "0px 0px -10% 0px",
  once = false,
}: RevealOpts = {}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [on, setOn] = useState(false);
  const armedRef = useRef(false);

  useEffect(() => {
    ensureScrollDirInstalled(); // install global listeners once
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Read the latest direction RIGHT NOW (updated by input events)
          const dir = getScrollDir(); // "up" | "down"
          el.setAttribute("data-dir", dir);

          if (entry.isIntersecting) {
            if (!armedRef.current) {
              // guarantee first animation plays
              el.setAttribute("data-reveal", "off");
              (el.firstElementChild as HTMLElement | null)?.getBoundingClientRect(); // reflow
              requestAnimationFrame(() => {
                el.setAttribute("data-reveal", "on");
                setOn(true);
                armedRef.current = true;
              });
            } else {
              // Subsequent reveals can go straight to "on"
              el.setAttribute("data-reveal", "on");
              setOn(true);
            }
            if (once) io.unobserve(el);
          } else if (!once) {
            el.setAttribute("data-reveal", "off");
            setOn(false);
          }
        }
      },
      { threshold, root, rootMargin }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, root, rootMargin, once]);

  return { on, sectionRef };
}
