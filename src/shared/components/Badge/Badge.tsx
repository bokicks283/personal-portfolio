import React from "react";

type BadgeType = "solid" | "soft" | "accent";

// jelly is broken. We need to fix it later
// type BadgeAnimation = "pop" | "wiggle" | "wobble" | "tilt" | "jelly" | "float" | "random";
type BadgeAnimation = "pop" | "wiggle" | "wobble" | "tilt" | "float" | "random";
type BadgeProps = {
  text: string;
  className?: string;
  descriptionText?: string;
  type?: BadgeType;
  animation?: BadgeAnimation;
};

export default function Badge({ text, className, descriptionText, type, animation }: BadgeProps) {
  const ANIMS: BadgeAnimation[] = ["pop", "wiggle", "wobble", "tilt", "float"];
  const badgeClass = type ? `badge-${type}` : "badge";

  function pickRandomAnimation(except?: string): string {
    const pool = ANIMS.filter(a => a !== except);
    if (pool.length === 0) return ANIMS[0] as string;
    let selected = pool[Math.floor(Math.random() * pool.length)] ?? ANIMS[0];
    selected = `anim-${selected}` as BadgeAnimation;
    return selected;
  }

  const onEnter = (event: React.MouseEvent<HTMLSpanElement>) => {
    if (!animation) return;
    const el = event.currentTarget as HTMLSpanElement;
    const next = animation === "random" ? (el.dataset.nextAnim || pickRandomAnimation()) : `anim-${animation}`;
    
    // Apply next
    el.classList.add(next);
    el.dataset.curAnim = next;
  };

  const onAnimEnd = (event: React.AnimationEvent<HTMLSpanElement>) => {
    if (!animation) return;
    const el = event.currentTarget as HTMLSpanElement;
    // Remove current animation class after it finishes
    const cur = el.dataset.curAnim;
    if (cur) el.classList.remove(cur);
    // Randomize the *next* animation (different from current)
    el.dataset.nextAnim = pickRandomAnimation(cur);
    delete el.dataset.curAnim;
  };

  return (
    <span
      className={`${badgeClass} ${className ?? ""}`}
      title={descriptionText}
      onMouseEnter={onEnter}
      onAnimationEnd={onAnimEnd}
    >
      {text}
    </span>
  )
}
