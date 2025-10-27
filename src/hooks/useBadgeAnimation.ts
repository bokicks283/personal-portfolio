import { useEffect } from "react";

const ANIMS = ["anim-pop", "anim-wiggle", "anim-wobble", "anim-tilt", "anim-jelly", "anim-float"] as const;

function pickRandom(except?: string): typeof ANIMS[number] {
  const pool = ANIMS.filter(a => a !== except);
  if (pool.length === 0) return ANIMS[0];
  return pool[Math.floor(Math.random() * pool.length)] ?? ANIMS[0];
}

/**
 * Attaches randomized hover animations to elements with `.badge`.
 * Each hover uses the current animation; on end, the next animation is randomized.
 */
export function useBadgeAnimation() {
  useEffect(() => {
    const badges = Array.from(document.querySelectorAll<HTMLElement>(".badge"));

    // Seed each badge with a “next” animation
    badges.forEach(el => {
      const next = pickRandom();
      el.dataset.nextAnim = next;
    });

    const onEnter = (ev: Event) => {
      const el = ev.currentTarget as HTMLElement;
      const next = el.dataset.nextAnim || pickRandom();
      // Clear any previous anim classes
      ANIMS.forEach(c => el.classList.remove(c));
      // Apply next
      el.classList.add(next);
      el.dataset.curAnim = next;
    };

    const onAnimEnd = (ev: AnimationEvent) => {
      const el = ev.currentTarget as HTMLElement;
      // Remove current animation class after it finishes
      const cur = el.dataset.curAnim;
      if (cur) el.classList.remove(cur);
      // Randomize the *next* animation (different from current)
      el.dataset.nextAnim = pickRandom(cur);
      delete el.dataset.curAnim;
    };

    badges.forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("animationend", onAnimEnd as EventListener);
    });

    return () => {
      badges.forEach(el => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("animationend", onAnimEnd as EventListener);
      });
    };
  }, []);
}
