import { createContext, useContext } from "react";
export type Ctx = { activeIndex: number; snapTo: (i: number) => void };

export const ScrollSnapCtx = createContext<Ctx | null>(null);
export function useScrollSnapContext() {
  const ctx = useContext(ScrollSnapCtx);
  if (!ctx) throw new Error("useScrollSnapContext must be used within ScrollSnapProvider");
  return ctx;
}
