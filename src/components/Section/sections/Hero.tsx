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
          // repeat={"infinite"}
          repeatDelayMs={20000}
          caretInsetPx={0}
          caretGapPx={1}
          caretBlinkMs={800}
          caretWidthPx={6}
          fontSizeClass="text-[clamp(2.25rem,8vw,4rem)]"
          linesClassName="leading-tight"
          caretColorClass="text-cyan-500/90"
          lines={[
            {
              segments:[
                { text: "Ronald Bocchichio", bold: true },
              ]
            },
            {
              text: "Software Engineer — Full-stack dev & SDET, builder of robust automation, powerful APIs, and delightful UIs.",
              caretWidthPx: 2,
              caretInsetPx: 0,
              lineClassName: "text-white/80 text-lg",
              msPerChar: 55,
              pausesAt:[
                { index: 18, delayMs: 1000 },
                { index: 42, delayMs: 400 },
                { index: 72, delayMs: 400 },
                { index: 87, delayMs: 400 },
              ]
            }
          ]}

        />
        {/* <p className="mt-4 text-white/80 text-lg">
          Software Engineer — Full‑stack dev & SDET, builder of robust automation and delightful UIs.
        </p> */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <a href="#projects" className="rounded-2xl px-5 py-2 bg-cyan-500/90 hover:bg-cyan-400 text-black font-medium transition-colors">
            View Projects
          </a>
          <a href="#contact" className="rounded-2xl px-5 py-2 border border-white/30 hover:border-white/60 text-white/90 transition-colors">
            Contact
          </a>
        </div>
      </div>
    </div>
  );
}
