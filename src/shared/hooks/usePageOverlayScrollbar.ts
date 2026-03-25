import { useEffect } from "react";
import { createOverlayScrollbar, type OverlaySBOptions } from "@/shared/lib/overlayScrollbar";

/** Floating, themed scrollbar for the whole page */
export function usePageOverlayScrollbar(opts?: OverlaySBOptions) {
  const thicknessPx = opts?.thicknessPx;
  const railRightPx = opts?.railRightPx;
  const railInsetTopPx = opts?.railInsetTopPx;
  const railInsetBottomPx = opts?.railInsetBottomPx;
  const thumbRightPx = opts?.thumbRightPx;
  const thumbMinPx = opts?.thumbMinPx;
  const thumbMaxPx = opts?.thumbMaxPx;
  const hideAfterMs = opts?.hideAfterMs;
  const fixedThumb = opts?.fixedThumb;

  useEffect(() => {
    const ctrl = createOverlayScrollbar(window, {
      thicknessPx,
      railRightPx,
      railInsetTopPx,
      railInsetBottomPx,
      thumbRightPx,
      thumbMinPx,
      thumbMaxPx,
      hideAfterMs,
      fixedThumb,
    });
    return () => ctrl.destroy();
  }, [
    fixedThumb,
    hideAfterMs,
    railInsetBottomPx,
    railInsetTopPx,
    railRightPx,
    thicknessPx,
    thumbMaxPx,
    thumbMinPx,
    thumbRightPx,
  ]);
}
