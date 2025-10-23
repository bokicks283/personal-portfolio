// src/components/TypedText.tsx
import React, {
  useEffect, useMemo, useRef, useState, useImperativeHandle, forwardRef
} from "react";
import { TypedLine, type TypedLineVM, type CharCell } from "./TypedLine.tsx";

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
  /** Optional per-line wrapper classes for padding/border/etc */
  lineClassName?: string;   // e.g. "px-2 py-1 rounded-md border border-neutral-700"
};

export type TypedTextProps = {
  lines: TypedLineItem[];

  /** Global timings */
  baseMsPerChar?: number;
  startDelayMs?: number;

  /** Caret presentation (overridable per line by color props) */
  caretBlinkMs?: number;        // e.g. 600 for .6s
  caretWidthPx?: number;       // e.g. 10 (px)
  caretGapPx?: number;
  caretInsetPx?: number;      // e.g. 2 (px)

  /** Looping / control */
  autoplay?: boolean;           // default: true
  repeat?: number | "infinite"; // times to replay after the first run
  repeatDelayMs?: number;       // pause before replaying
  onComplete?: () => void;

  /** Typography / a11y */
  fontSizeClass?: string;
  fontClass?: string;
  ariaLive?: "polite" | "assertive" | "off";
};

/** Optional imperative API: start(), reset() */
export type TypedTextHandle = {
  start: () => void;
  reset: () => void;
  stop: () => void;
  replay: (times?: number | "infinite") => void;
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

function flatten(text?: string, segments?: TextSegment[]) {
  if (text != null) return [{ runText: text, bold: false, colorHex: undefined, colorClass: "" }];
  return (segments ?? []).map(s => ({
    runText: s.text,
    bold: !!s.bold,
    colorHex: s.colorHex,
    colorClass: s.colorClass ?? "",
  }));
}

function buildCharPlan(line: TypedLineItem, baseMsPerChar: number) {
  const runs = flatten(line.text, line.segments);
  const chars: CharCell[] = [];
  for (const r of runs) {
    for (const ch of splitGraphemes(r.runText)) {
      chars.push({ ch, bold: r.bold, colorHex: r.colorHex, colorClass: r.colorClass ?? "" });
    }
  }
  const steps = chars.length;
  const msPerChar = line.msPerChar ?? baseMsPerChar;

    const pauses = (line.pausesAt ?? [])
    .filter(p => p.index >= 0 && p.index <= steps)
    .sort((a, b) => a.index - b.index);

  const delays: number[] = new Array(steps).fill(msPerChar);
  for (const p of pauses) {
    // insert extra delay AFTER the character at p.index-1 (i.e., before showing char at p.index)
    if (p.index > 0 && p.index < steps + 1) {
      delays[p.index - 1] += p.delayMs;
    }
  }

  return { chars, steps, delays };
}

const TypedText = forwardRef<TypedTextHandle, TypedTextProps>(function TypedText(
  {
    lines,
    baseMsPerChar = 140,
    startDelayMs = 0,
    caretBlinkMs = 1000,
    caretWidthPx = 10,
    caretGapPx = 0,
    caretInsetPx = 5,
    autoplay = true,
    repeat = 0,
    repeatDelayMs = 1000,
    onComplete,
    fontSizeClass = "text-[clamp(1.75rem,6vw,3.5rem)]",
    fontClass = "font-inconsolata",
    ariaLive = "polite",
  },
  ref
) {
  // Build timing plan once per prop change
  const plan: TypedLineVM[] = useMemo(() => {
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
      const lineClassName = line.lineClassName ?? "";

      // Next line starts after last char of this one appears
      t = when[when.length - 1] ?? lineDelay;

      return { chars, when, keepCaret, caretColorHex, caretColorClass, lineClassName };
    });
  }, [lines, baseMsPerChar, startDelayMs]);

  // counts[i] = visible char count for line i
  const [counts, setCounts] = useState<number[]>(() => plan.map(() => 0));
  const timeouts = useRef<number[]>([]);
  const endTimer = useRef<number | null>(null);
  const remainingRepeats = useRef<number | "infinite">(repeat);

  // Imperative API
  useImperativeHandle(ref, () => ({
    start: () => {
      stopInternal();
      setCounts(plan.map(() => 0));
      remainingRepeats.current = repeat;
      scheduleAll();
    },
    reset: () => {
      stopInternal();
      setCounts(plan.map(() => 0));
      remainingRepeats.current = repeat;
    },
    stop: () => {
      stopInternal();
    },
    replay: (times) => {
      stopInternal();
      setCounts(plan.map(() => 0));
      remainingRepeats.current = times ?? repeat ?? 0;
      scheduleAll();
    },
  }));

  // Autoplay on plan changes
  useEffect(() => {
    stopInternal();
    setCounts(plan.map(() => 0));
    remainingRepeats.current = repeat;
    if (autoplay) scheduleAll();
    return () => stopInternal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plan, autoplay]);

  function stopInternal() {
    timeouts.current.forEach(id => clearTimeout(id));
    timeouts.current = [];
    if (endTimer.current != null) { clearTimeout(endTimer.current); endTimer.current = null; }
  }

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

    const endAt = Math.max(0, ...plan.map(ln => (ln.when.length ? ln.when[ln.when.length - 1] : 0)));

    endTimer.current = window.setTimeout(() => {
      onComplete?.();

      const again =
        remainingRepeats.current === "infinite" ||
        (typeof remainingRepeats.current === "number" && remainingRepeats.current > 0);

      if (again) {
        if (typeof remainingRepeats.current === "number") {
          remainingRepeats.current = remainingRepeats.current - 1;
        }
        endTimer.current = window.setTimeout(() => {
          setCounts(plan.map(() => 0));
          scheduleAll();
        }, repeatDelayMs);
      }
    }, endAt + 1);
  }

  return (
    <div className={`grid place-items-center ${fontClass} ${fontSizeClass}`} aria-live={ariaLive}>
      {plan.map((ln, i) => (
        <TypedLine
          key={i}
          vm={ln}
          count={counts[i]}
          nextLineStarted={i < plan.length - 1 ? counts[i + 1] > 0 : false}
          caretWidthPx={caretWidthPx}
          caretBlinkMs={caretBlinkMs}
          caretInsetPx={caretInsetPx}
          caretGapPx={caretGapPx}
        />
      ))}
    </div>
  );
});

export default TypedText;
