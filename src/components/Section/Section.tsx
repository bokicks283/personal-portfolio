import { type ReactNode } from "react";
import { useReveal } from "../../hooks";

type Props = {
  id: string;
  title?: string;
  children: ReactNode;
  fullHeight?: boolean; // default true
  snapTo?: boolean; // default true
};

export default function Section({ id, title, children, fullHeight = true, snapTo = true }: Props) {
  const { ref, visible } = useReveal();

  return (
    <section
      id={id}
      data-snap-section={snapTo ? "true" : "false"}
      ref={ref}
      className={[
        fullHeight ? "h-dvh" : "min-h-dvh",  // device-viewport-height
        "snap-start flex items-center py-10 scroll-mt-16"
      ].join(" ")}
    >
      <div className="w-full">
        {title && (
          <h2 className="mb-10 text-[clamp(1.75rem,3vw,2.25rem)] font-semibold tracking-wide text-[var(--accent)]">
            {title}
          </h2>
        )}

        {/* Reveal animation (replays on re-entry) */}
        <div
          className={[
            "transition-all duration-1250 will-change-transform",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          ].join(" ")}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
