import { useEffect, useRef } from "react";
import type { BenchWindow } from "../types";



// Minimal render counter that logs & stores per-key counts on window.__bench
export function useRenderCounter(key: string) {
  const ref = useRef(0);
  ref.current += 1;

  // global store for easy copy/paste/share
  const bw = window as BenchWindow;
  if (!bw.__bench || !bw.__bench.renders) {
    bw.__bench = { renders: {} as Record<string, number> };
  }
  const renders = bw.__bench.renders as Record<string, number>;
  renders[key] = ref.current;

  // log every ~20 renders to avoid spam
  useEffect(() => {
    if (ref.current % 20 === 1) {
      console.log(`[RC] ${key}: ${ref.current}`);
    }
  });

  return ref.current;
}
