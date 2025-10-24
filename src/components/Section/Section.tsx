import { type ReactNode } from "react";
import { useReveal } from "../../hooks/useReveal";

type Props = {
  id: string;
  title?: string;
  children: ReactNode;
};

export default function Section({ id, title, children }: Props) {
  const { ref, visible } = useReveal();
  return (
    <section
      id={id}
      ref={ref}
      className="py-20 scroll-mt-16"
    >
      {title && (
        <h2 className="mb-8 text-2xl font-semibold tracking-wide text-cyan-300">
          {title}
        </h2>
      )}
      <div className={[
        "transition-all duration-700",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      ].join(" ")}>
        {children}
      </div>
    </section>
  );
}
