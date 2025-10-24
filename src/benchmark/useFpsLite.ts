import { useEffect, useRef, useState } from "react";

// Lightweight FPS-ish meter (averaged over 500ms windows)
export function useFpsLite() {
  const [fps, setFps] = useState(0);
  const last = useRef(performance.now());
  const frames = useRef(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const tick = () => {
      frames.current++;
      const now = performance.now();
      const dt = now - last.current;
      if (dt >= 500) {
        const f = (frames.current / dt) * 1000;
        setFps(Math.round(f));
        frames.current = 0;
        last.current = now;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, []);

  return fps;
}
