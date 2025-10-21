import { useEffect, useMemo, useRef, useState, useImperativeHandle, forwardRef } from "react";

/** Styling for a piece of text inside a line */
export type TextSegment = {
  text: string;
  bold?: boolean;
  /** Prefer HEX or named color for reliability (never purged) */
  colorHex?: string;          // e.g. "#22d3ee" or "cadetblue"
  /** Optional Tailwind class if *static in code* (dynamic classes may be purged) */
  colorClass?: string;        // e.g. "text-cyan-300"
};

/** One animated line */
export type TypedLineItem = {
  text?: string;              // OR:
  segments?: TextSegment[];   // rich segments for this line
  msPerChar?: number;         // speed for this line (default inherited)
  lineDelayMs?: number;       // extra delay before this line starts (on top of previous lines)
  keepCaret?: boolean;        // keep caret after finishing (default true on the last line)
  caretColorHex?: string;     // caret color (hex or CSS color)
  caretColorClass?: string;   // or Tailwind class (static)
  /** pause points inside the line (character indexes) with extra delay (ms) */
  pausesAt?: Array<{ index: number; delayMs: number }>;
};

export type TypedTextProps = {
  lines: TypedLineItem[];
  baseMsPerChar?: number;     // default speed (ms/char) if not set per line
  startDelayMs?: number;      // initial delay before first line starts
  fontSizeClass?: string;     // Tailwind text size
  fontClass?: string;         // Tailwind font family
  ariaLive?: "polite" | "assertive" | "off";
};

/** Optional imperative API: start(), reset() */
export type TypedTextHandle = {
  start: () => void;
  reset: () => void;
};

/** Grapheme splitter so emoji/accents count as one char */
function splitGraphemes(s: string): string[] {
  try {
    const seg = new Intl.Segmenter(undefined, { granularity: "grapheme" });
    return Array.from(seg.segment(s), (x: Intl.SegmentData) => x.segment);
  } catch {
    return Array.from(s);
  }
}

function flattenSegments(text?: string, segments?: TextSegment[]) {
  if (text != null) return [{ runText: text, bold: false, colorHex: undefined, colorClass: "" }];
  return (segments ?? []).map(s => ({
    runText: s.text,
    bold: !!s.bold,
    colorHex: s.colorHex,
    colorClass: s.colorClass ?? "",
  }));
}

function buildCharPlan(line: TypedLineItem, baseMsPerChar: number) {
  const runs = flattenSegments(line.text, line.segments);
  const chars: { ch: string; bold: boolean; colorHex?: string; colorClass: string }[] = [];
  for (const r of runs) {
    for (const ch of splitGraphemes(r.runText)) {
      chars.push({ ch, bold: r.bold, colorHex: r.colorHex, colorClass: r.colorClass });
    }
  }
  const steps = chars.length;
  const msPerChar = line.msPerChar ?? baseMsPerChar;

  // TODO: Convert into taking in a int as part of the line item.
  // If line item is an int, pause for that many milliseconds after the line.
  // Build per-char schedule with optional pauses
  const pauses = (line.pausesAt ?? []).filter(p => p.index >= 0 && p.index <= steps).sort((a, b) => a.index - b.index);
  const delays: number[] = new Array(steps).fill(msPerChar);
  for (const p of pauses) {
    // insert extra delay AFTER the character at p.index-1 (i.e., before showing char at p.index)
    if (p.index > 0 && p.index < steps + 1) {
      delays[p.index - 1] += p.delayMs;
    }
  }

  return { chars, steps, delays, msPerChar };
}

/** Renders grouped runs (same style) for better DOM perf */
function renderRuns(chars: { ch: string; bold: boolean; colorHex?: string; colorClass: string }[]) {
  if (!chars.length) return null;
  const runs: { text: string; bold: boolean; colorHex?: string; colorClass: string }[] = [];
  let current = { text: "", bold: chars[0].bold, colorHex: chars[0].colorHex, colorClass: chars[0].colorClass };
  const sameStyle = (a: typeof current, b: typeof current) =>
    a.bold === b.bold && a.colorHex === b.colorHex && a.colorClass === b.colorClass;

  for (const c of chars) {
    const style = { bold: c.bold, colorHex: c.colorHex, colorClass: c.colorClass };
    if (sameStyle(current, style as typeof current)) current.text += c.ch;
    else { runs.push(current); current = { text: c.ch, ...style }; }
  }
  runs.push(current);

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

const TypedText = forwardRef<TypedTextHandle, TypedTextProps>(function TypedText(
  {
    lines,
    baseMsPerChar = 70,
    startDelayMs = 0,
    fontSizeClass = "text-[clamp(1.75rem,6vw,3.5rem)]",
    fontClass = "font-inconsolata",
    ariaLive = "polite",
  },
  ref
) {
  /** Build a precise schedule for each line (when to show each char) */
  const plan = useMemo(() => {
    let t = startDelayMs;
    return lines.map((line, idx) => {
      const { chars, steps, delays } = buildCharPlan(line, baseMsPerChar);
      const lineDelay = t + (line.lineDelayMs ?? 0);
      const when: number[] = [];
      let acc = lineDelay;
      for (let i = 0; i < steps; i++) { acc += delays[i]; when.push(acc); }
      const keepCaret = line.keepCaret ?? idx === lines.length - 1;
      const caretColorHex = line.caretColorHex;
      const caretColorClass = line.caretColorClass;
      t = when[when.length - 1] ?? lineDelay; // next line starts after last char appears
      return { chars, steps, when, keepCaret, caretColorHex, caretColorClass };
    });
  }, [lines, baseMsPerChar, startDelayMs]);

  /** counts[i] = number of chars currently visible for line i */
  const [counts, setCounts] = useState<number[]>(() => plan.map(() => 0));
  const timeouts = useRef<number[]>([]);

  // imperative API
  useImperativeHandle(ref, () => ({
    start: () => {
      // restart typing from scratch
      timeouts.current.forEach(id => clearTimeout(id));
      setCounts(plan.map(() => 0));
      scheduleAll();
    },
    reset: () => {
      timeouts.current.forEach(id => clearTimeout(id));
      setCounts(plan.map(() => 0));
    },
  }));

  useEffect(() => {
    scheduleAll();
    return () => timeouts.current.forEach(id => clearTimeout(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plan]);

  function scheduleAll() {
    timeouts.current.forEach(id => clearTimeout(id));
    timeouts.current = [];
    plan.forEach((ln, lineIdx) => {
      ln.when.forEach((ts, k) => {
        const id = window.setTimeout(() => {
          setCounts(prev => {
            if (prev[lineIdx] >= k + 1) return prev;
            const next = prev.slice();
            next[lineIdx] = k + 1;
            return next;
          });
        }, ts);
        timeouts.current.push(id);
      });
    });
  }

  return (
    <div className={`grid place-items-center ${fontClass} ${fontSizeClass}`} aria-live={ariaLive}>
      {plan.map((ln, i) => {
        const visible = ln.chars.slice(0, counts[i]);
        const started = counts[i] > 0;
        const done = counts[i] >= ln.chars.length;
        const nextLineStarted = i < plan.length - 1 ? counts[i + 1] > 0 : false;

        return (
          <p key={i} className="m-0 mb-2">
            <span className="relative inline-block align-middle whitespace-nowrap">
              {/* text (starts empty; grows by 1 grapheme at scheduled times) */}
              <span className="inline-block select-none">
                {renderRuns(visible)}
              </span>

              {/* caret (right edge of the line; blinks; hides on non-last when done) */}
              <span
                aria-hidden="true"
                className={[
                  "inline-block align-middle w-0",      // zero width; the border is the caret
                  "typed-caret typed-caret-blink",        // ensures solid style + blink
                  ln.caretColorClass ?? "border-current"  // fallback to current text color if no class
                ].join(" ")}
                style={{
                  borderRightWidth: "10px",
                  borderRightColor: ln.caretColorHex ?? "currentColor", // fallback color
                  visibility: !started || (done && !ln.keepCaret && nextLineStarted) ? "hidden" : "visible",
                }}
              />
            </span>
          </p>
        );
      })}
    </div>
  );
});

export default TypedText;
