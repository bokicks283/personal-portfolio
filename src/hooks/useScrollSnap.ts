import { useCallback, useEffect, useRef, useState } from "react";

/** Programmatic page snapping (works with sticky navs, etc.). */
export function useScrollSnap(sectionSelector = '[data-snap-section="true"]') {
  const sectionsRef = useRef<HTMLElement[]>([]);
  const isSnapping = useRef(false);
  const lastIntent = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const collect = useCallback(() => {
    sectionsRef.current = Array.from(
      document.querySelectorAll(sectionSelector)
    ) as HTMLElement[];
  }, [sectionSelector]);

  const nearestIndex = useCallback((y: number) => {
    let best = 0, bestDist = Number.POSITIVE_INFINITY;
    sectionsRef.current.forEach((el, i) => {
      const d = Math.abs(el.offsetTop - y);
      if (d < bestDist) { best = i; bestDist = d; }
    });
    return best;
  }, []);

  const snapTo = useCallback((idx: number) => {
    const list = sectionsRef.current;
    if (!list.length) return;
    const clamped = Math.max(0, Math.min(idx, list.length - 1));
    const el = list[clamped];
    if (!el) return;
    isSnapping.current = true;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveIndex(clamped);
    window.setTimeout(() => { isSnapping.current = false; }, 420); // cooldown
  }, []);

  // gather sections
  useEffect(() => {
    collect();
    const onResize = () => collect();
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [collect]);

  // wheel → snap
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (!sectionsRef.current.length) return;
      const now = performance.now();
      if (isSnapping.current || now - lastIntent.current < 250) {
        e.preventDefault();
        return;
      }
      const dir = Math.sign(e.deltaY);
      if (dir === 0) return;
      e.preventDefault();
      lastIntent.current = now;

      const currIdx = nearestIndex(window.scrollY);
      snapTo(currIdx + (dir > 0 ? 1 : -1));
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [nearestIndex, snapTo]);

  // update active on normal scroll (e.g., when clicking nav)
  useEffect(() => {
    const onScroll = () => setActiveIndex(nearestIndex(window.scrollY));
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [nearestIndex]);

  return { activeIndex, snapTo };
}
