// src/utils/getCssVarColor.ts
export function getCssVarColor(variableName: string): string {
  if (typeof window === "undefined") return "#ffffff";
  const value = getComputedStyle(document.documentElement).getPropertyValue(variableName);
  return value.trim() || "#ffffff"; // fallback if undefined
}
