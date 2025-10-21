import NavBar from '../NavBar';
import TypedText from "../TypedText";
import ParticleBackground from "../ParticleBackground";


function HomePage() {
  return (
    <div className="text-center bg-[rgb(56,56,62)]">
      <ParticleBackground>
        <NavBar text="Ronald Bocchichio" reactLogo="https://reactjs.org/logo-og.png" />
        <div className="bg-transparent min-h-screen flex flex-col items-center justify-center text-white">
          <TypedText
            baseMsPerChar={90}
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
                lineDelayMs: 1500,
              },
              {
                text: "Welcome to my website!",
                caretColorHex: "cadetblue",
                lineDelayMs: 1500,
              },
            ]}
          />
        </div>
        <div className="mt-4 text-white">
          <p>test para</p>
        </div>
      </ParticleBackground>
    </div>
  );
}

export default HomePage;
