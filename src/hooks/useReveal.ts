import { useEffect, useRef, useState } from "react";

export function useReveal(options: IntersectionObserverInit = { threshold: 0.12 }) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(([entry]) => {
      if (entry) setVisible(entry.isIntersecting);
    }, options);

    obs.observe(el);
    return () => obs.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.root, options.rootMargin, String(options.threshold)]);

  return { ref, visible };
}
