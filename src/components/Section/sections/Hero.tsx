import TypedText from "../../TypedText";

export default function Hero() {
  return (
    <div className="min-h-[70vh] grid place-items-center text-center">
      <div>
        <TypedText
          baseMsPerChar={80}
          baseMsLineDelay={1000}
          startDelayMs={250}
          autoplay={true}
          repeat={"infinite"}
          repeatDelayMs={10000}
          onComplete={()=>{console.log("Animation Done!")}}
          caretInsetPx={0}
          caretGapPx={1}
          caretBlinkMs={800}
          caretWidthPx={6}
          fontSizeClass="text-[clamp(4rem,8vw,6.5rem)]"
          linesClassName="leading-tight"
          caretColorClass="text-[var(--accent)]"
          lines={[
            {
              segments:[
                { text: "Ronald Bocchichio", bold: true, colorClass: "text-[var(--fg)]" },
              ]
            },
            {
              segments:[
                { text: "Software Engineer", bold: true, colorClass: "text-[var(--accent)]" },
                { text: " — Builder of robust ", colorClass: "text-[var(--fg)]" },
                { text: "automation", bold: true, colorClass: "text-[var(--accent)]" },
                { text: ", powerful ", colorClass: "text-[var(--fg)]" },
                { text: "APIs", bold: true, colorClass: "text-[var(--accent)]" },
                { text: ", and delightful ", colorClass: "text-[var(--fg)]" },
                { text: "UIs", bold: true, colorClass: "text-[var(--accent)]" },
                { text: ".", colorClass: "text-[var(--fg)]" },
              ],
              caretWidthPx: 2,
              caretInsetPx: 0,
              lineClassName: "text-[var(--fg)] text-xl",
              msPerChar: 55,
              pausesAt:[
                { index: 18, delayMs: 1000 },
                { index: 50, delayMs: 400 },
                { index: 65, delayMs: 400 },
              ]
            }
          ]}

        />
        <div className="mt-8 flex items-center justify-center gap-3">
          <a href="#projects" className="rounded-2xl px-5 py-2 bg-[var(--accent)]/90 hover:bg-[var(--accent)] text-black font-medium transition-colors">
            View Projects
          </a>
          <a href="#contact" className="rounded-2xl px-5 py-2 border border-[color:var(--ring)] hover:border-[color:var(--accent)] text-[var(--fg)]/90 transition-colors">
            Contact
          </a>
        </div>
      </div>
    </div>
  );
}
