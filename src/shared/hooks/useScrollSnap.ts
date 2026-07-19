import { useCallback, useEffect, useRef, useState } from "react";
import { reportCustomMetric } from "@/shared/lib";

/** Programmatic page snapping (works with sticky navs, etc.). */
export function useScrollSnap(sectionSelector = '[data-snap-section="true"]') {
  const sectionsRef = useRef<HTMLElement[]>([]);
  const isSnapping = useRef(false);
  const lastIntent = useRef(0);
  const scrollRaf = useRef<number | null>(null);
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
    const startedAt = performance.now();

    let frameCount = 0;
    let droppedFrames = 0;
    let lastFrameTime = startedAt;

    const profileFrames = (now: number) => {
      frameCount += 1;
      const delta = now - lastFrameTime;
      if (delta > 20) droppedFrames += 1;
      lastFrameTime = now;
      if (now - startedAt < 520) {
        requestAnimationFrame(profileFrames);
        return;
      }
      const seconds = Math.max(0.001, (now - startedAt) / 1000);
      reportCustomMetric("SNAP_FPS_EST", frameCount / seconds, {
        targetIndex: clamped,
        frameCount,
        droppedFrames,
      });
      reportCustomMetric("SNAP_FRAME_DROPS", droppedFrames, {
        targetIndex: clamped,
        frameCount,
      });
    };

    isSnapping.current = true;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveIndex((prev) => (prev === clamped ? prev : clamped));
    requestAnimationFrame(profileFrames);

    window.setTimeout(() => {
      isSnapping.current = false;
      reportCustomMetric("SNAP_COOLDOWN_MS", performance.now() - startedAt, { targetIndex: clamped });
    }, 420); // cooldown
  }, []);

  // gather sections (resize)
  useEffect(() => {
    collect();
    const onResize = () => collect();
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [collect]);

  // also re-collect when DOM changes (e.g., you toggle snapTo, add/remove sections)
  useEffect(() => {
    const root = (document.querySelector(".snap-container--y") as HTMLElement | null) ?? document.body;
    let rafId: number | null = null;
    const scheduleCollect = () => {
      if (rafId != null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        collect();
      });
    };

    const mo = new MutationObserver(scheduleCollect);
    mo.observe(root, { childList: true, subtree: true });
    scheduleCollect();

    return () => {
      if (rafId != null) cancelAnimationFrame(rafId);
      mo.disconnect();
    };
  }, [collect]);

  // wheel → snap (only when a neighbor exists)
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const list = sectionsRef.current;
      if (!list.length) return;

      const now = performance.now();
      if (isSnapping.current || now - lastIntent.current < 250) {
        // if we're in a snap cooldown, block to avoid jitter
        e.preventDefault();
        return;
      }

      const dir = Math.sign(e.deltaY);
      if (dir === 0) return;

      const currIdx = nearestIndex(window.scrollY);
      const targetIdx = currIdx + (dir > 0 ? 1 : -1);

      // If there is no neighbor (we're at ends), LET NATIVE SCROLL HAPPEN.
      if (targetIdx < 0 || targetIdx >= list.length) {
        return; // do not preventDefault
      }

      // We have a neighbor → do the snap and consume the wheel
      e.preventDefault();
      lastIntent.current = now;
      snapTo(targetIdx);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [nearestIndex, snapTo]);

  // update active on normal scroll (e.g., when clicking nav)
  useEffect(() => {
    const onScroll = () => {
      if (scrollRaf.current != null) return;
      scrollRaf.current = requestAnimationFrame(() => {
        scrollRaf.current = null;
        const next = nearestIndex(window.scrollY);
        setActiveIndex((prev) => (prev === next ? prev : next));
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollRaf.current != null) {
        cancelAnimationFrame(scrollRaf.current);
        scrollRaf.current = null;
      }
    };
  }, [nearestIndex]);

  return { activeIndex, snapTo };
}
