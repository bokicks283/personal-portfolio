// src/components/TypedLine.tsx
import React, { memo } from "react";

export type CharCell = { ch: string; bold: boolean; colorHex?: string; colorClass: string };

export type TypedLineVM = {
  chars: CharCell[];
  when: number[];
  keepCaret: boolean;
  caretColorHex?: string;
  caretColorClass?: string;
  lineClassName?: string;
};

function renderRuns(chars: CharCell[]) {
  if (!chars.length) return null;

  // Merge adjacent chars with equal style for fewer spans.
  const runs: { text: string; bold: boolean; colorHex?: string; colorClass: string }[] = [];
  let cur = { text: "", bold: chars[0].bold, colorHex: chars[0].colorHex, colorClass: chars[0].colorClass };

  const same = (a: typeof cur, b: typeof cur) =>
    a.bold === b.bold && a.colorHex === b.colorHex && a.colorClass === b.colorClass;

  for (const c of chars) {
    const style = { bold: c.bold, colorHex: c.colorHex, colorClass: c.colorClass };
    if (same(cur, style as typeof cur)) {
      // Preserve spaces (incl. trailing) with NBSP
      cur.text += c.ch === " " ? "\u00A0" : c.ch;
    } else {
      runs.push(cur);
      cur = { text: c.ch === " " ? "\u00A0" : c.ch, ...style };
    }
  }
  runs.push(cur);

  return runs.map((r, i) => (
    <span
      key={i}
      className={`${r.bold ? "font-bold" : ""} ${r.colorClass ?? ""}`}
      style={r.colorHex ? { color: r.colorHex } : undefined}
    >
      {r.text}
    </span>
  ));
}

type Props = {
  vm: TypedLineVM;
  /** how many chars of this line are visible */
  count: number;
  /** has the next line started (used to hide caret on finished non-last lines) */
  nextLineStarted: boolean;

  // caret & layout controls (from parent)
  caretWidthPx: number;
  caretBlinkMs: number;
  caretInsetPx: number; // trim top/bottom
  caretGapPx: number;   // visual gap between last glyph and caret
};

export const TypedLine = memo(function TypedLine({
  vm, count, nextLineStarted, caretWidthPx, caretBlinkMs, caretInsetPx, caretGapPx,
}: Props) {
  const visible = vm.chars.slice(0, count);
  const started = count > 0;
  const done = count >= vm.chars.length;

  return (
    <p className="m-0 mb-2">
      {/* Wrapper reserves a lane for caret width; caret is absolutely pinned to the right */}
      <span
        className={`relative inline-block align-middle whitespace-nowrap ${vm.lineClassName ?? ""}`}
        style={
          {
            ["--caret-blink-ms"]: `${caretBlinkMs}ms`,
            ["--caret-inset"]: `${caretInsetPx}px`,
            paddingInlineEnd: `${caretWidthPx}px`, // lane for caret thickness
          } as React.CSSProperties
        }
      >
        {/* Text itself adds the visible gap before the caret lane */}
        <span className="inline-block select-none" style={{ paddingInlineEnd: `${caretGapPx}px` }}>
          {renderRuns(visible)}
        </span>

        {/* Caret: height follows wrapper block (incl. padding), blink by CSS var */}
        <span
          aria-hidden="true"
          className={[
            "typed-caret-abs typed-caret-blink",
            vm.caretColorClass ?? "border-neutral-100",
          ].join(" ")}
          style={{
            borderInlineEndWidth: `${caretWidthPx}px`,
            borderInlineEndColor: vm.caretColorHex ?? "currentColor",
            transform: "translateZ(0)",
            visibility: !started || (done && !vm.keepCaret && nextLineStarted) ? "hidden" : "visible",
          }}
        />
      </span>
    </p>
  );
});
