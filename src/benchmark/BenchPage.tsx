import BenchPanel from "./BenchPanel";

// Import your two implementations:
import TypedText from "../components/TypedText";    // legacy (per-char setTimeout)
import TypedTextRAF from "../components/TypedText"; // new RAF version

const demoLines = [
  {
    text: "Lorem ipsum dolor sit amet. In suscipit sunt non sunt quia et officia obcaecati ad nesciunt reprehenderit non velit sapiente.",
    caretColorHex: "cadetblue",
  },
  {
    segments: [
      { text: "Lorem ipsum dolor sit amet. " },
      { text: "incidunt ut facilis laudantium est", bold: true, colorHex: "#22d3ee" },
      { text: " ut odit porro rem suscipit alias." },
    ],
    caretColorHex: "#22d3ee",
    lineDelayMs: 800,
  },
  {
    text: "Lorem ipsum dolor sit amet. Ea dolores corrupti eos tempore dolore et voluptates recusandae ex molestiae neque.",
    caretColorHex: "cadetblue",
    lineDelayMs: 800,
  },
  {
    segments: [
      { text: "Lorem ipsum dolor sit amet. " },
      { text: "incidunt ut facilis laudantium est", bold: true, colorHex: "#22d3ee" },
      { text: " ut odit porro rem suscipit alias." },
    ],
    caretColorHex: "#22d3ee",
    lineDelayMs: 800,
  },
  {
    text: "Lorem ipsum dolor sit amet. Ea dolores corrupti eos tempore dolore et voluptates recusandae ex molestiae neque.",
    caretColorHex: "cadetblue",
    lineDelayMs: 800,
    keepCaret: true,
  },
];

export default function BenchPage() {
  const common = {
    baseMsPerChar: 30,
    caretBlinkMs: 1000,
    caretWidthPx: 2,
    caretInsetPx: 0,
    caretGapPx: 0,
    autoplay: false,     // we'll click Start on each panel to compare
    repeat: 2,
    fontClass: "font-inconsolata",
    fontSizeClass: "text-sm md:text-xs",
  };

  return (
    <div className="min-h-screen p-6 grid gap-6 md:grid-cols-2 bg-[var(--bg,#0a0a0b)] text-white">
      <BenchPanel title="Legacy: setTimeout per char" Component={TypedText} typedProps={{ ...common, lines: demoLines }} />
      <BenchPanel title="New: requestAnimationFrame" Component={TypedTextRAF} typedProps={{ ...common, lines: demoLines }} />
      <div className="md:col-span-2 text-sm text-neutral-400">
        Tip: Open Console and run <code>__bench</code> to copy the renders & timings.
      </div>
    </div>
  );
}
