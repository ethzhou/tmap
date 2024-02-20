import PageHeader from "../../general/PageHeader";
import PageLayout from "../../layouts/PageLayout";
import PianoButton from "../../music/PianoButton";

export default function SoundAndPitch() {
  return (
    <>
      <PageLayout>
        <PageHeader
          heading={"Sound and Pitch"}
          navUp={{ to: "/tmap/learn", display: "Learn" }}
          strokeTwColorClass="bg-emerald-400 dark:bg-emerald-600"
          // right={<PracticeInvitation to={"/tmap/practice/"} />}
        />
        <main className="relative flex flex-col gap-12 font-text text-lg text-slate-700 dark:text-slate-300">
          <p>Tonal music is largely defined by pitch.</p>
          <section>
            <h2 className="font-text text-4xl">Pitch</h2>
            <p>
              Frequencies of soundwaves determine sounds' pitches. Higher
              frequencies yield higher pitches.{" "}
              <strong>
                A linear increases in pitch relate to exponential increases in
                frequency.
              </strong>
            </p>
            <p>
              For example, 440 Hz, 550 Hz, and 687.5 Hz increase by ratios of
              5:4 = 1.25; hearing sounds of these frequencies, the distance
              between the first and second is perceived to be the same as the
              distance between the second and third.
            </p>
            <div className="flex justify-center gap-12">
              <PianoButton title={"440 Hz"} pitches={["A4"]}>
                440 Hz
              </PianoButton>
              <PianoButton title={"550 Hz"} pitches={["C#5"]}>
                550 Hz
              </PianoButton>
              <PianoButton title={"687.5 Hz"} pitches={["F5"]}>
                687.5 Hz
              </PianoButton>
            </div>
          </section>
          <section>
            <h2 className="font-text text-4xl">The Octave and Its Notes</h2>
            <section>
              <h3>The Octave</h3>
              <p>
                A fundamental ratio here is 2: The relationship between two
                notes whose frequencies are in a ratio of 2 is that of an{" "}
                <dfn>octave</dfn>; the notes are an octave apart.{" "}
                <strong>
                  We take most musical functionalities to repeat after each
                  octave:
                </strong>{" "}
                Notes spaced by octaves are interpreted to be the &ldquo;same
                note&rdquo; but higher or lower.
              </p>
              <p>
                Compare the pitches with each other. Each row represents a
                different <dfn>pitch class</dfn>, so the notes within the row
                are by octaves apart and considered the &ldquo;same&rdquo;, but
                notes of different rows should feel different.
              </p>
              <div className="grid grid-cols-[repeat(2,auto)] items-start justify-center gap-x-8 gap-y-14">
                <PianoButton title={"440 Hz"} pitches={["A4"]}>
                  440 Hz
                </PianoButton>
                <PianoButton title={"880 Hz"} pitches={["A5"]}>
                  880 Hz
                </PianoButton>
                <PianoButton title={"1760 Hz"} pitches={["A6"]}>
                  1760 Hz
                </PianoButton>
                <PianoButton
                  title={"more"}
                  pitches={["A2", "A5", "A3", "A1", "A6", "A4"]}
                  spacing={0.3}
                >
                  more
                </PianoButton>
                <PianoButton title={"275 Hz"} pitches={["C#4"]}>
                  275 Hz
                </PianoButton>
                <PianoButton title={"550 Hz"} pitches={["C#5"]}>
                  550 Hz
                </PianoButton>
                <PianoButton title={"1100 Hz"} pitches={["C#6"]}>
                  1100 Hz
                </PianoButton>
                <div className="col-start-4">
                  <PianoButton
                    title={"more"}
                    pitches={["C#3", "C#4", "C#7", "C#1", "C#5", "C#2"]}
                    spacing={0.3}
                  >
                    more
                  </PianoButton>
                </div>
                <PianoButton title={"687.5 Hz"} pitches={["F5"]}>
                  687.5 Hz
                </PianoButton>
                <PianoButton title={"1375 Hz"} pitches={["F6"]}>
                  1375 Hz
                </PianoButton>
                <div className="col-start-4">
                  <PianoButton
                    title={"more"}
                    pitches={["F3", "F7", "F1", "F2", "F4", "F6"]}
                    spacing={0.3}
                  >
                    more
                  </PianoButton>
                </div>
              </div>
            </section>
            <section>
              <h3>The Notes</h3>
              <p>
                The octave is split into twelve notes equally spaced. Western
                music is built on this <dfn>twelve-tone equal temperament</dfn>{" "}
                (12-TET or 12-ET). Each note is scaled by the same ratio;
                compounded twelve times, it should cummulate to a factor of 2.
                The ratio is then 2
                <sup>
                  <sup>1</sup>&frasl;<sub>12</sub>
                </sup>
                &nbsp;&asymp;&nbsp;1.0594631, since (2
                <sup>
                  <sup>1</sup>&frasl;<sub>12</sub>
                </sup>
                )<sup>12</sup>
                &nbsp;=&nbsp;1.
              </p>
              <p>
                This ratio and the distance between each consecutive note
                constitute the <dfn>semitone</dfn> or <dfn>half step</dfn>.{" "}
                <strong>One octave comprises twelve semitones.</strong> Two half
                steps total a <dfn>whole step</dfn>, a concept left for scales.
              </p>
              <div className="flex items-center justify-center gap-4">
                <span className="after:ml-2 after:select-none after:content-['–']">
                  A4
                </span>
                <PianoButton
                  title={"halfsteps in an octave"}
                  pitches={[
                    "A4",
                    "A#4",
                    "B4",
                    "C5",
                    "C#5",
                    "D5",
                    "D#5",
                    "E5",
                    "F5",
                    "F#5",
                    "G5",
                    "G#5",
                    "A5",
                  ]}
                  spacing={0.12}
                />
                <span className="before:mr-2 before:select-none before:content-['–']">
                  A5
                </span>
              </div>
            </section>
          </section>
        </main>
      </PageLayout>
    </>
  );
}
