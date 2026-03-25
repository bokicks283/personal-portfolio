import { type ReactNode } from "react";
import { useScrollSnap } from "@/shared/hooks/useScrollSnap";
import { ScrollSnapCtx } from "./ScrollSnapHelper";

export function ScrollSnapProvider({ children }: { children: ReactNode }) {
  const value = useScrollSnap();
  return <ScrollSnapCtx.Provider value={value}>{children}</ScrollSnapCtx.Provider>;
}
