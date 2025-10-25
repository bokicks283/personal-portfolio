import {
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
  text?: string;              // plain text for this line
  segments?: TextSegment[];   // rich segments for this line
  msPerChar?: number;         // speed for this line (default inherited)
  lineDelayMs?: number;       // extra delay before this line starts (on top of previous lines)
  keepCaret?: boolean;        // keep caret after finishing (default true on the last line)
  caretBlinkMs?: number;
  caretWidthPx?: number;
  caretGapPx?: number;
  caretInsetPx?: number;
  caretColorHex?: string;
  caretColorClass?: string;
  /** pause points inside the line (character indexes) with extra delay (ms) */
  pausesAt?: Array<{ index: number; delayMs: number }>;
  /** Optional per-line wrapper classes for padding/border/etc */
  lineClassName?: string;   // e.g. "px-2 py-1 rounded-md border border-neutral-700"
  baseLineGapPx?: number;
};

export type TypedTextProps = {
  lines: TypedLineItem[];
  linesClassName?: string;

  /** Global timings */
  baseMsPerChar?: number;
  baseMsLineDelay?: number;
  startDelayMs?: number;

  /** Caret presentation (overridable per line by color props) */
  caretBlinkMs?: number;        // e.g. 1000 (ms)
  caretWidthPx?: number;       // e.g. 10 (px)
  caretGapPx?: number;        // e.g. 2 (px)
  caretInsetPx?: number;      // e.g. 2 (px)
  caretColorHex?: string;     // caret color (hex or CSS color)
  caretColorClass?: string;   // or Tailwind class (static)

  baseLineGapPx?: number;

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
    runText: s.text, bold: !!s.bold, colorHex: s.colorHex, colorClass: s.colorClass ?? "",
  }));
}

function buildCharPlan(line: TypedLineItem, baseMsPerChar: number) {
  const runs = flatten(line.text, line.segments);
  const chars: CharCell[] = [];
  for (const r of runs) for (const ch of splitGraphemes(r.runText)) {
    chars.push({ ch, bold: r.bold, colorHex: r.colorHex, colorClass: r.colorClass ?? "" });
  }
  const steps = chars.length;
  const msPerChar = line.msPerChar ?? baseMsPerChar;

  const pauses = (line.pausesAt ?? [])
    .filter(p => p.index >= 0 && p.index <= steps)
    .sort((a, b) => a.index - b.index);

  // cumulative "when" timestamps (ms since animation start)
  const when: number[] = [];
  let t = 0;
  for (let i = 0; i < steps; i++) {
    let d = msPerChar;
    const p = pauses.find(pp => pp.index - 1 === i);
    if (p) d += p.delayMs;
    t += d;
    when.push(t);
  }
  return { chars, when };
}

const TypedText = forwardRef<TypedTextHandle, TypedTextProps>(function TypedText(
  {
    lines,
    linesClassName = undefined,
    baseMsPerChar = 140,
    baseMsLineDelay = 1000,
    startDelayMs = 0,
    caretBlinkMs = 1000,
    caretWidthPx = 10,
    caretGapPx = 0,
    caretInsetPx = 5,
    caretColorClass = undefined,
    caretColorHex = undefined,
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
  // Build plan with absolute start offsets per line, total duration, etc.
  const plan: { vm: TypedLineVM; lineStartMs: number; lineEndMs: number }[] = useMemo(() => {
    let offset = startDelayMs;
    const result = lines.map((line, idx) => {
      const { chars, when } = buildCharPlan(line, baseMsPerChar);
      const keepCaret = line.keepCaret ?? idx === lines.length - 1;
      const vm: TypedLineVM = {
        chars,
        when: when.map(ms => ms + offset),
        keepCaret,
        caretBlinkMs: line.caretBlinkMs ?? caretBlinkMs,
        caretWidthPx: line.caretWidthPx ?? caretWidthPx,
        caretGapPx: line.caretGapPx ?? caretGapPx,
        caretInsetPx: line.caretInsetPx ?? caretInsetPx,
        caretColorHex: line.caretColorHex ?? caretColorHex,
        caretColorClass: line.caretColorClass ?? caretColorClass,
        lineClassName: line.lineClassName ?? linesClassName ?? "",
      };
      const lineStartMs = offset;
      const lineEndMs = when.length ? when[when.length - 1] + offset : offset;
      offset = lineEndMs + (baseMsLineDelay ?? 0) + (line.lineDelayMs ?? 0); // next line offset includes requested gap
      return { vm, lineStartMs, lineEndMs };
    });
    return result;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines, baseMsPerChar, startDelayMs]);

  const totalDuration = useMemo(
    () => (plan.length ? plan[plan.length - 1].lineEndMs : 0),
    [plan]
  );

  // counts[i] = number of chars visible on line i
  const [counts, setCounts] = useState<number[]>(() => plan.map(() => 0));

  // RAF state
  const rafId = useRef<number | null>(null);
  const runStart = useRef<number | null>(null);
  const running = useRef(false);
  const remainingRepeats = useRef<number | "infinite">(repeat);

  // Imperative API
  useImperativeHandle(ref, () => ({
    start: () => { startRun(); },
    reset: () => { cancelRun(); setCounts(plan.map(() => 0)); remainingRepeats.current = repeat; },
    stop: () => { cancelRun(); },
    replay: (times: number | "infinite" | undefined) => { cancelRun(); setCounts(plan.map(() => 0)); remainingRepeats.current = times ?? repeat ?? 0; startRun(); },
  }));

  // autoplay on plan change
  useEffect(() => {
    cancelRun();
    setCounts(plan.map(() => 0));
    remainingRepeats.current = repeat;
    if (autoplay) startRun();
    return () => cancelRun();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plan, autoplay]);

  function cancelRun() {
    if (rafId.current != null) cancelAnimationFrame(rafId.current);
    rafId.current = null;
    runStart.current = null;
    running.current = false;
  }

  function startRun() {
    cancelRun();
    running.current = true;
    runStart.current = performance.now();
    tick();
  }
  
  function tick() {
    if (!running.current) return;
    const now = performance.now();
    const elapsed = now - (runStart.current ?? now); // ms since run start

    // compute visible counts from elapsed time (no per-char timers)
    setCounts(prev => {
      const next = prev.slice();
      plan.forEach(({ vm }, i) => {
        // count how many timestamps <= elapsed
        let k = 0;
        const when = vm.when;
        while (k < when.length && when[k] <= elapsed) k++;
        if (k !== next[i]) next[i] = k;
      });
      return next;
    });

    // done?
    if (elapsed >= totalDuration + 0.5) {
      onComplete?.();
      if (
        remainingRepeats.current === "infinite" ||
        (typeof remainingRepeats.current === "number" && remainingRepeats.current > 0)
      ) {
        if (typeof remainingRepeats.current === "number") remainingRepeats.current -= 1;
        // small wait for repeatDelayMs, using RAF time
        const waitStart = performance.now();
        const wait = () => {
          const w = performance.now() - waitStart;
          if (w >= repeatDelayMs) {
            setCounts(plan.map(() => 0));
            runStart.current = performance.now();
            rafId.current = requestAnimationFrame(tick);
          } else {
            rafId.current = requestAnimationFrame(wait);
          }
        };
        rafId.current = requestAnimationFrame(wait);
      } else {
        cancelRun();
      }
      return;
    }

    rafId.current = requestAnimationFrame(tick);
  }

  return (
    <div 
      className={`grid place-items-center ${fontClass} ${fontSizeClass}`}
      aria-live={ariaLive}
    >
      {plan.map(({ vm }, i) => (
        <TypedLine
          key={i}
          vm={vm}
          count={counts[i]}
          nextLineStarted={i < plan.length - 1 ? counts[i + 1] > 0 : false}
        />
      ))}
    </div>
  );
});
export default TypedText;
