import { type ReactNode, useEffect, useRef } from "react";
import { useReveal } from "../../hooks/useReveal";
import TypedText, { type TypedTextHandle } from "../TypedText";

type Props = {
  id: string;
  title?: string;
  children: ReactNode;
  className?: string;
  fullHeight?: boolean; // default true
  snapHeight?: "full" | "center" | "fit"; // default "full"
  snapAlign?: "start" | "center" | "end"; // default "center"
  snapTo?: boolean; // default true
};

export default function Section({
  id,
  title,
  children,
  className = "",
  snapHeight = "full",
  snapAlign = "center",
  snapTo = true,
}: Props) {
  const { on, sectionRef } = useReveal({ threshold: 0.15, rootMargin: "0px 0px -10% 0px" });
  const titleRef = useRef<TypedTextHandle | null>(null);
  const heightClass =
    snapHeight === "full"
      ? "snap-h-full"
      : snapHeight === "fit"
        ? "snap-h-fit"
        : "snap-h-center";

  const baseLayout =
    "grid grid-cols-1 place-items-center"; // no py-* here — we'll move it inside

  useEffect(() => {
    if (title && on) titleRef.current?.replay(0);
  }, [on, title]);

  return (
    <section
      id={id}
      data-snap-section={snapTo ? "true" : "false"}
      data-snap-align={snapAlign}
      data-reveal={on ? "on" : "off"}
      ref={sectionRef}
      className={[
        heightClass,
        baseLayout,
        className,
      ].join(" ")}
    >
      <div className="w-full reveal-item px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        {title && (
          <header className="mb-8">
            <TypedText
              ref={titleRef}
              lines={[
                { segments: [{ text: title, bold: true, colorClass: "text-[var(--accent)]" }], keepCaret: false }
              ]}
              caretColorClass="text-[var(--fg)]"
              caretWidthPx={2}
              caretInsetPx={0}
              autoplay={false}
              caretGapPx={4}
              baseMsPerChar={50}
              baseMsLineDelay={0}
              startDelayMs={250}
              repeat={0}
              fontSizeClass="text-2xl md:text-3xl font-semibold tracking-tight"
            />
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
