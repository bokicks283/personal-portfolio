import TypedText from "../TypedText";
import ParticleBackground from "../ParticleBackground";


function HomePage() {
  return (
    <div className="text-center bg-[rgb(56,56,62)]">
      <ParticleBackground>
        <div className="bg-transparent min-h-screen flex flex-col items-center justify-center text-white">
          <TypedText
            baseMsPerChar={80}
            baseMsLineDelay={2000}
            repeatDelayMs={10000}
            caretBlinkMs={1000}
            caretWidthPx={10}
            caretInsetPx={10}
            caretGapPx={2}
            autoplay={true}
            repeat={"infinite"}
            lines={[
              {
                segments: [
                  { text: "Hello, I'm " },
                  { text: "Ronald Bocchichio", bold: true, colorHex: "cadetblue" },
                  { text: "." },
                ],
                caretColorHex: "cadetblue",
              },
              {
                segments: [
                  { text: "I'm a " },
                  { text: "Software Engineer", bold: true, colorHex: "cadetblue" },
                  { text: "." },
                ],
                caretColorHex: "cadetblue",
              },
              {
                text: "Welcome to my website!",
                caretColorHex: "cadetblue",
              },
            ]}
          />
        </div>
        <div className="mt-4 text-center text-white">
          <p>test para</p>
        </div>
      </ParticleBackground>
    </div>
  );
}

export default HomePage;
