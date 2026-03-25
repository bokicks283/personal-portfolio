export type OverlaySBOptions = {
  thicknessPx?: number;
  railRightPx?: number;
  railInsetTopPx?: number;
  railInsetBottomPx?: number;
  thumbRightPx?: number;
  thumbMinPx?: number;
  thumbMaxPx?: number;
  hideAfterMs?: number;
  fixedThumb?: boolean;
};

export type OverlaySBController = { update(): void; destroy(): void; };
type Host = HTMLElement | Window;

export function createOverlayScrollbar(host: Host, opt: OverlaySBOptions = {}): OverlaySBController {
  const {
    thicknessPx = 10,
    railRightPx = 0,
    railInsetTopPx = 0,
    railInsetBottomPx = 0,
    thumbRightPx = 2,
    thumbMinPx = 32,
    thumbMaxPx,
    hideAfterMs = 900,
    fixedThumb = false,
  } = opt;

  const isWindow = host === window;
  const hostEl = isWindow ? document.documentElement : (host as HTMLElement);

  // Find a dedicated content element to observe (prevents self-trigger loops)
  const contentEl = isWindow
    ? document.scrollingElement || document.documentElement
    : (hostEl.querySelector("[data-overlay-sb-content]") as HTMLElement) || hostEl;

  // Hide native & contain scroll-chaining
  hostEl.classList.add("overlay-sb-host");

  // Build rail
  const rail = document.createElement("div");
  rail.className = "overlay-sb-rail off";
  rail.style.width = `${thicknessPx}px`;
  rail.style.right = `${railRightPx}px`;

  const thumb = document.createElement("div");
  thumb.className = "overlay-sb-thumb";
  thumb.style.right = `${thumbRightPx}px`;

  const hit = document.createElement("div");
  hit.className = "overlay-sb-hitbox";
  hit.style.top = `${railInsetTopPx}px`;
  hit.style.bottom = `${railInsetBottomPx}px`;

  rail.appendChild(thumb);
  rail.appendChild(hit);

  // Mount rail (sibling to content, not inside it)
  if (isWindow) {
    rail.style.position = "fixed";
    rail.style.top = "0";
    rail.style.bottom = "0";
    rail.style.right = `${railRightPx}px`;
    document.body.appendChild(rail);
  } else {
    const cs = getComputedStyle(hostEl);
    if (cs.position === "static") (hostEl as HTMLElement).style.position = "relative";
    rail.style.position = "absolute";
    rail.style.top = "0";                         // height/translate set in update()
    rail.style.right = `${railRightPx}px`;
    (hostEl as HTMLElement).appendChild(rail);
  }

  // Helpers
  const getScrollTop = () => (isWindow ? window.scrollY : (hostEl as HTMLElement).scrollTop);
  const setScrollTop = (y: number) => {
    if (isWindow) window.scrollTo({ top: y, behavior: "auto" });
    else (hostEl as HTMLElement).scrollTop = y;
  };
  const getViewportH = () => (isWindow ? window.innerHeight : (hostEl as HTMLElement).clientHeight);
  const getContentH = () => (isWindow
    ? Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
    : (contentEl as HTMLElement).scrollHeight);

  // Fade visibility — class-only (no inline styles)
  let hideTimer: number | null = null;
  const show = () => {
    rail.classList.remove("off");
    rail.classList.add("show");
    if (hideTimer) window.clearTimeout(hideTimer);
    hideTimer = window.setTimeout(() => rail.classList.remove("show"), hideAfterMs);
  };

  // Layout sync
  const update = () => {
    const vp = getViewportH();
    const ch = getContentH();

    // --- size + pin the rail inside the host’s visible viewport with insets
    let railH = vp - railInsetTopPx - railInsetBottomPx;
    if (railH < 0) railH = 0;

    if (!isWindow) {
      rail.style.height = `${railH}px`;
      // counter-scroll the rail to keep it visually pinned, and then apply top inset
      rail.style.transform = `translateY(${getScrollTop() + railInsetTopPx}px)`;
    } else {
      // window rail is fixed: use top/bottom insets directly
      rail.style.top = `${railInsetTopPx}px`;
      rail.style.bottom = `${railInsetBottomPx}px`;
    }

    if (ch <= vp + 1) {
      rail.classList.remove("show");
      rail.classList.add("off");
      return;
    }
    rail.classList.remove("off");

    const maxScroll = Math.max(1, ch - vp);

    let h = fixedThumb ? thumbMinPx : Math.max(thumbMinPx, (vp / ch) * railH);
    if (thumbMaxPx != null) h = Math.min(h, thumbMaxPx);

    const top = (getScrollTop() / maxScroll) * (railH - h);
    thumb.style.height = `${Math.round(h)}px`;
    thumb.style.top = `${Math.round(top)}px`;
    hit.style.top = `${railInsetTopPx}px`;
    hit.style.bottom = `${railInsetBottomPx}px`;
  };

  // Bind scroll/resize
  const scrollTarget: EventTarget = isWindow ? window : (hostEl as HTMLElement);
  const onScroll = () => { update(); show(); };
  const onResize = () => update();

  scrollTarget.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize, { passive: true });

  // Observe content size only (not attributes; ignore our rail)
  const ro = new ResizeObserver(() => requestAnimationFrame(update));
  ro.observe(contentEl as Element);

  const mo = new MutationObserver((mutations) => {
    // Ignore if the mutation is inside our rail
    for (const m of mutations) {
      if (m.target instanceof Node && rail.contains(m.target)) return;
    }
    // schedule once per batch
    requestAnimationFrame(update);
  });
  mo.observe(contentEl as Element, { childList: true, subtree: true }); // no attributes/charData

  // Dragging
  let dragging = false;
  let dragStartY = 0;
  let startScroll = 0;

  const onMouseDown = (e: MouseEvent) => {
    const r = rail.getBoundingClientRect();
    if (e.clientX < r.left - 8 || e.clientX > r.right + 8) return;
    dragging = true;
    rail.classList.add("dragging");
    dragStartY = e.clientY;
    startScroll = getScrollTop();
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    e.preventDefault();
    show();
  };
  const onMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    const vp = getViewportH();
    const ch = getContentH();
    const railH = vp;

    let h = fixedThumb ? thumbMinPx : Math.max(thumbMinPx, (vp / ch) * railH);
    if (thumbMaxPx != null) h = Math.min(h, thumbMaxPx);

    const maxScroll = Math.max(1, ch - vp);
    const ratio = maxScroll / Math.max(1, railH - h);
    const dy = e.clientY - dragStartY;
    setScrollTop(Math.max(0, Math.min(maxScroll, startScroll + dy * ratio)));
    show();
  };
  const onMouseUp = () => {
    dragging = false;
    rail.classList.remove("dragging");
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };
  hit.addEventListener("mousedown", onMouseDown);

  // Replace your current onWheel with this block
  const onWheel = (e: WheelEvent) => {
    if (isWindow) return;
    const el = hostEl as HTMLElement;

    const atTop = el.scrollTop <= 0;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
    const goingUp = e.deltaY < 0;
    const goingDown = e.deltaY > 0;

    // If the host can scroll in this direction, own the wheel.
    const canUp = goingUp && !atTop;
    const canDown = goingDown && !atBottom;
    if (canUp || canDown) {
      if (e.cancelable) e.preventDefault();
      e.stopPropagation();
      el.scrollTop += e.deltaY;
      show();
      requestAnimationFrame(update);
    }
  };
  // IMPORTANT: non-passive
  (hostEl as HTMLElement).addEventListener("wheel", onWheel, { passive: false });


  // Initial sync
  update();

  return {
    update,
    destroy() {
      if (hideTimer) window.clearTimeout(hideTimer);
      scrollTarget.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      mo.disconnect();
      if (!isWindow) (hostEl as HTMLElement).removeEventListener("wheel", onWheel);
      hit.removeEventListener("mousedown", onMouseDown);
      rail.remove();
      hostEl.classList.remove("overlay-sb-host");
    }
  };
}
