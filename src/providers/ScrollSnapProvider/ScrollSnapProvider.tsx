import { createContext, ReactNode } from "react";
import { useScrollSnap } from "../../hooks/useScrollSnap";


export type Ctx = { activeIndex: number; snapTo: (i: number) => void };

const ScrollSnapCtx = createContext<Ctx | null>(null);
export function ScrollSnapProvider({ children }: { children: ReactNode }) {
  const value = useScrollSnap();
  return <ScrollSnapCtx.Provider value={value}>{children}</ScrollSnapCtx.Provider>;
}
