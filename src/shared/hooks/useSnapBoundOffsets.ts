import { useEffect } from "react";

/**
 * Hybrid snap padding calculator:
 * - Finds the vertical snap container (by selector or the first .snap-container--y)
 * - Measures all non-section content ABOVE the first section and BELOW the last section,
 *   both outside the container (e.g., header/footer siblings) and inside the container
 *   (e.g., banners before first <section> or blocks after last <section>).
 * - Writes --snap-pad-top / --snap-pad-bottom on :root.
 */
export function useSnapBoundOffsets(selector: string = ".snap-container--y") {
  useEffect(() => {
    const container =
      (document.querySelector(selector) as HTMLElement | null) ??
      (document.querySelector(".snap-container--y") as HTMLElement | null);

    if (!container) return;

    // Helper: include margins; skip fixed-positioned nodes (don’t affect layout height)
    const measuredHeight = (el: HTMLElement): number => {
      const style = window.getComputedStyle(el);
      if (style.position === "fixed") return 0;
      const h = el.getBoundingClientRect().height;
      const mt = parseFloat(style.marginTop || "0");
      const mb = parseFloat(style.marginBottom || "0");
      return h + mt + mb;
    };

    // Sections INSIDE container
    const sections = Array.from(
      container.querySelectorAll<HTMLElement>("section[id]")
    );
    const firstSection = sections[0] ?? null;
    const lastSection = sections[sections.length - 1] ?? null;

    // Siblings BEFORE/AFTER container (outside)
    const outsideBefore: HTMLElement[] = [];
    let prev = container.previousElementSibling as HTMLElement | null;
    while (prev) {
      if (prev instanceof HTMLElement) outsideBefore.unshift(prev);
      prev = prev?.previousElementSibling as HTMLElement | null;
    }

    const outsideAfter: HTMLElement[] = [];
    let next = container.nextElementSibling as HTMLElement | null;
    while (next) {
      if (next instanceof HTMLElement) outsideAfter.push(next);
      next = next?.nextElementSibling as HTMLElement | null;
    }

    // INSIDE container: nodes BEFORE first section and AFTER last section
    const insideBefore: HTMLElement[] = [];
    if (firstSection) {
      let n = firstSection.previousElementSibling as HTMLElement | null;
      while (n) {
        if (n instanceof HTMLElement) insideBefore.unshift(n);
        n = n.previousElementSibling as HTMLElement | null;
      }
    }

    const insideAfter: HTMLElement[] = [];
    if (lastSection) {
      let n = lastSection.nextElementSibling as HTMLElement | null;
      while (n) {
        if (n instanceof HTMLElement) insideAfter.push(n);
        n = n.nextElementSibling as HTMLElement | null;
      }
    }

    const allTop = [...outsideBefore, ...insideBefore];
    const allBottom = [...outsideAfter, ...insideAfter];

    const measure = () => {
      const topH = allTop.reduce((sum, el) => sum + measuredHeight(el), 0);
      const botH = allBottom.reduce((sum, el) => sum + measuredHeight(el), 0);

      // Write to :root so both html and snap container CSS can consume it
      document.documentElement.style.setProperty("--snap-pad-top", `${topH}px`);
      document.documentElement.style.setProperty("--snap-pad-bottom", `${botH}px`);
    };

    // Observe everything that can change height
    const ro = new ResizeObserver(measure);
    [...allTop, ...allBottom].forEach((el) => ro.observe(el));

    // Also observe container in case the set of children changes (e.g., hydration)
    const mo = new MutationObserver(measure);
    mo.observe(container, { childList: true, subtree: false });

    // Initial set + on resize
    measure();
    window.addEventListener("resize", measure);

    return () => {
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [selector]);
}
