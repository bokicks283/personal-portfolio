import { useEffect } from "react";
import { createOverlayScrollbar, OverlaySBOptions } from "../utils/overlayScrollbar";

/** Floating, themed scrollbar for the whole page */
export function usePageOverlayScrollbar(opts?: OverlaySBOptions) {
  useEffect(() => {
    const ctrl = createOverlayScrollbar(window, opts);
    return () => ctrl.destroy();
  }, [opts?.thicknessPx, opts?.railRightPx, opts?.thumbRightPx, opts?.thumbMinPx, opts?.thumbMaxPx, opts?.hideAfterMs, opts?.fixedThumb]);
}
