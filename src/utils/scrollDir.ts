type Dir = "down" | "up";

let currentDir: Dir = "down";
let installed = false;

type EventPrevY = {
  _prevY?: number;
}

function setDir(next: Dir) {
  if (next === currentDir) return;
  currentDir = next;
  // write to <html> for easy CSS/js debugging
  document.documentElement.dataset.scrollDir = next;
}

function onWheel(e: WheelEvent) {
  // Use deltaY sign (handles trackpads too)
  if (e.deltaY > 0) setDir("up");
  else if (e.deltaY < 0) setDir("down");
}

function onTouchMove(e: TouchEvent) {
  // compare current vs previous touch Y
  const t = e.touches[0];
  if (!t) return;
  const y = t.clientY;
  const prev = (onTouchMove as unknown as EventPrevY)._prevY as number | undefined;
  if (prev !== undefined) setDir(y < prev ? "up" : "down");
  (onTouchMove as unknown as EventPrevY)._prevY = y;
}

function onKey(e: KeyboardEvent) {
  // common scroll keys
  const k = e.key;
  if (k === "ArrowDown" || k === "PageDown" || k === " " || k === "End")
    setDir("up");
  else if (k === "ArrowUp" || k === "PageUp" || k === "Home")
    setDir("down");
}

function onScroll() {
  // fallback for programmatic scroll / OS momentum
  const y = window.scrollY || document.documentElement.scrollTop || 0;
  const prev = (onScroll as unknown as EventPrevY)._prevY as number | undefined;
  if (prev !== undefined) setDir(y > prev ? "up" : y < prev ? "down" : currentDir);
  (onScroll as unknown as EventPrevY)._prevY = y;
}

export function ensureScrollDirInstalled() {
  if (installed) return;
  installed = true;
  document.documentElement.dataset.scrollDir = currentDir;

  // Input-driven first (fires before scroll paints on most UAs)
  window.addEventListener("wheel", onWheel, { passive: true });
  window.addEventListener("touchmove", onTouchMove, { passive: true });
  window.addEventListener("keydown", onKey, { passive: true });

  // Fallback for momentum / programmatic scrolls
  window.addEventListener("scroll", onScroll, { passive: true });
}

export function getScrollDir(): Dir {
  return currentDir;
}
