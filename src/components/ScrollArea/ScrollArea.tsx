// src/components/ui/ScrollArea.tsx
import { useEffect, useRef } from "react";
import { createOverlayScrollbar, OverlaySBOptions } from "../../utils/overlayScrollbar";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  maxHeight?: string | number;
  sb?: OverlaySBOptions;
  /** re-sync multiple times right after mount (good for opening menus) */
  pulseOnMount?: boolean;
};

export default function ScrollArea({
  children,
  className = "",
  style,
  maxHeight = "16rem",
  sb,
  pulseOnMount = false,
  ...rest
}: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;

    const ctrl = createOverlayScrollbar(el, sb);

    // 1st frame
    const rafs: number[] = [];
    rafs.push(requestAnimationFrame(ctrl.update));

    // optional pulse: remeasure a few times as layout/animations settle
    if (pulseOnMount) {
      const schedule = [100, 200, 320]; // ms after mount
      schedule.forEach(ms => {
        const id = window.setTimeout(() => ctrl.update(), ms);
        // store as negative ids to clean up uniformly
        rafs.push(-id);
      });
    }

    return () => {
      rafs.forEach(id => (id >= 0 ? cancelAnimationFrame(id) : clearTimeout(-id)));
      ctrl.destroy();
    };
  }, [
    sb?.thicknessPx, sb?.railRightPx, sb?.thumbRightPx,
    sb?.thumbMinPx, sb?.thumbMaxPx, sb?.hideAfterMs, sb?.fixedThumb,
    pulseOnMount
  ]);

  const maxH = typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight;

  return (
    <div
      ref={hostRef}
      className={`overlay-sb-host overflow-auto ${className}`}
      style={{ maxHeight: maxH, position: "relative", ...style }}
      {...rest}
    >
      <div data-overlay-sb-content>{children}</div>
    </div>
  );
}
