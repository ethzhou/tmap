import PageHeader from "../../general/PageHeader";
import PageLayout from "../../layouts/PageLayout";
import ModeInteractive from "../../music/ModeInteractive";
import PianoButton from "../../music/PianoButton";
import ScaleDisplay from "../../music/ScaleDisplay";

export default function ExploringScales() {
  return (
    <>
      <PageLayout>
        <PageHeader
          heading={"Exploring Scales"}
          navUp={{ to: "/tmap/learn", display: "Learn" }}
          strokeTwColorClass="bg-emerald-400 dark:bg-emerald-600"
          // right={<PracticeInvitation to={"/tmap/practice/"} />}
        />
        <main className="relative flex flex-col gap-12 font-text text-lg text-slate-700 dark:text-slate-300">
          <p>These are musical vegetables.</p>
          <section>
            <h2 className="font-text text-4xl">
              The Scale and Overtone Series
            </h2>
            <p>
              Any instrument's construction of pitch brings along the pitch's{" "}
              <dfn>overtone series</dfn>, also called its{" "}
              <dfn>harmonic series</dfn>, the accompanying pitches. These
              pitches are of frequencies that are integer multiples of the base,{" "}
              <dfn>fundamental frequency</dfn>. Hardly ever does only one pure
              tone sound.
            </p>
            <p>
              <dfn className="scale">Scales</dfn> compile pitches found in a
              note's overtone series into nice, stepwise sequences. They are now
              standardized, but they originated not utter human arbitrariness
              but some natural reason. Some scales also compile all pitches.
            </p>
            <p>
              The pattern of intervals between notes characterizes the type of
              scale. The first note may be any. The rest each build off their
              preceding note according the layout.
            </p>
          </section>
          <section>
            <h2 className="font-text text-4xl">Diatonic Scales</h2>
            <p>
              <dfn title="heptatonic scale">Heptatonic scales</dfn> comprise
              seven notes within an octave. An additional note an octave above
              the first is appended at the top to bring the scale and octave to
              completion.
            </p>
            <p>
              A <dfn>diatonic scale</dfn> is a specific type of heptatonic
              scale. They are also the most common type.
            </p>
            <section>
              <h3>The Major Scale</h3>
              <p>
                The pattern for the <dfn>major scale</dfn> is the sequence of a
                whole step, whole step, half step, whole step, whole step, whole
                step, and half step.
              </p>
              <div className="grid grid-cols-[repeat(2,auto)] items-center justify-center justify-items-start gap-x-4 gap-y-1 text-slate-800 dark:text-slate-200">
                <PianoButton
                  label={"hear"}
                  pitches={["A4", "B4", "C#5", "D5", "E5", "F#5", "G#5", "A5"]}
                  spacing={0.2}
                />
                <ScaleDisplay
                  notes={["A", "B", "C♯", "D", "E", "F♯", "G♯", "A"]}
                />
                <PianoButton
                  label={"hear"}
                  pitches={["E4", "F#4", "G#4", "A4", "B4", "C#5", "D#5", "E5"]}
                  spacing={0.2}
                />
                <ScaleDisplay
                  notes={["E", "F♯", "G♯", "A", "B", "C♯", "D♯", "E"]}
                />
                <PianoButton
                  label={"hear"}
                  pitches={[
                    "Gb4",
                    "Ab4",
                    "Bb4",
                    "Cb5",
                    "Db5",
                    "Eb5",
                    "F5",
                    "Gb5",
                  ]}
                  spacing={0.2}
                />
                <ScaleDisplay
                  notes={["G♭", "A♭", "B♭", "C♭", "D♭", "E♭", "F", "G♭"]}
                />
                <PianoButton
                  label={"hear"}
                  pitches={[
                    "Db4",
                    "Eb4",
                    "F4",
                    "Gb4",
                    "Ab4",
                    "Bb4",
                    "C5",
                    "Db5",
                  ]}
                  spacing={0.2}
                />
                <ScaleDisplay
                  notes={["D♭", "E♭", "F", "G♭", "A♭", "B♭", "C", "D♭"]}
                />
              </div>
              <h3>The Minor Scale</h3>
              <p>
                The pattern for the <dfn>minor scale</dfn> is the sequence of a
                whole step, half step, whole step, whole step, half step, whole
                step, and whole step.
              </p>
              <div className="grid grid-cols-[repeat(2,auto)] items-center justify-center justify-items-start gap-x-4 gap-y-1 text-slate-800 dark:text-slate-200">
                <PianoButton
                  label={"hear"}
                  pitches={["F#3", "G#3", "A3", "B3", "C#4", "D4", "E4", "F#4"]}
                  spacing={0.2}
                />
                <ScaleDisplay
                  notes={["F♯", "G♯", "A", "B", "C♯", "D", "E", "F♯"]}
                />
                <PianoButton
                  label={"hear"}
                  pitches={[
                    "C#4",
                    "D#4",
                    "E4",
                    "F#4",
                    "G#4",
                    "A4",
                    "B4",
                    "C#5",
                  ]}
                  spacing={0.2}
                />
                <ScaleDisplay
                  notes={["C♯", "D♯", "E", "F♯", "G♯", "A", "B", "C♯"]}
                />
                <PianoButton
                  label={"hear"}
                  pitches={[
                    "Eb4",
                    "F4",
                    "Gb4",
                    "Ab4",
                    "Bb4",
                    "Cb5",
                    "Db5",
                    "Eb5",
                  ]}
                  spacing={0.2}
                />
                <ScaleDisplay
                  notes={["E♭", "F", "G♭", "A♭", "B♭", "C♭", "D♭", "E♭"]}
                />
                <PianoButton
                  label={"hear"}
                  pitches={[
                    "Bb3",
                    "C4",
                    "Db4",
                    "Eb4",
                    "F4",
                    "Gb4",
                    "Ab4",
                    "Bb4",
                  ]}
                  spacing={0.2}
                />
                <ScaleDisplay
                  notes={["B♭", "C", "D♭", "E♭", "F", "G♭", "A♭", "B♭"]}
                />
              </div>
              <p>
                <strong>
                  The notes of minor scales are exactly those of a corresponding
                  major scale.
                </strong>{" "}
                For example, F♯ minor shares the same notes as A major, and E♭
                minor shares the same notes as G♭ major. These are all shown
                above. Every minor scale starts on the sixth note of its{" "}
                <dfn>relative major</dfn> scale.
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col content-center">
                  <ScaleDisplay
                    notes={[
                      "A",
                      "B",
                      "C♯",
                      "D",
                      "E",
                      "F♯",
                      "G♯",
                      "A",
                      "B",
                      "C♯",
                      "D",
                      "E",
                      "F♯",
                      "G♯",
                      "A",
                    ]}
                    highlights={[0, 1, 2, 3, 4, 5, 6, 7]}
                  />
                  <ScaleDisplay
                    notes={[
                      null,
                      null,
                      null,
                      null,
                      null,
                      "F♯",
                      "G♯",
                      "A",
                      "B",
                      "C♯",
                      "D",
                      "E",
                      "F♯",
                      null,
                      null,
                    ]}
                  />
                </div>
                <div className="flex flex-col content-center">
                  <ScaleDisplay
                    notes={[
                      "E",
                      "F♯",
                      "G♯",
                      "A",
                      "B",
                      "C♯",
                      "D♯",
                      "E",
                      "F♯",
                      "G♯",
                      "A",
                      "B",
                      "C♯",
                      "D♯",
                      "E",
                    ]}
                    highlights={[0, 1, 2, 3, 4, 5, 6, 7]}
                  />
                  <ScaleDisplay
                    notes={[
                      null,
                      null,
                      null,
                      null,
                      null,
                      "C♯",
                      "D♯",
                      "E",
                      "F♯",
                      "G♯",
                      "A",
                      "B",
                      "C♯",
                      null,
                      null,
                    ]}
                  />
                </div>
              </div>
            </section>
            <section>
              <h3>The Other Scales</h3>
              <p>
                The other diatonic scales, or{" "}
                <dfn title="diatonic mode">diatonic modes</dfn>, are also
                derived from the same pattern as that of the major scale,
                defined and distinguished by where to start. D Dorian starts on
                D and traverses the letters as would the C major scale.
              </p>
              <ModeInteractive />
              <p>
                The above definition places an emphasis on the major scale as
                fundamental to each scale's derivation. Picking one major scale
                and sequentially playing all the modes does the modes a
                disservice; instead of truly hearing them for their own
                characters, the ears continue to understand everything through
                the lens of the major scale. When hearing C Ionian, D Dorian, E
                Phrygian, and so on up to B Locrian, each mode's true nature is
                hidden to the ears, enveloped by the major scale's dominating
                precedent. In order to better understand the air of each mode,
                it is productive to hear them built on some constant starting
                note. This way, the Locrian mode's darker quality becomes
                evident.
              </p>
              <ModeInteractive constantKeySignature={false} />
              <p>
                It is functionally utile to consider the modes not for which
                major scales match but for how their pitches relate{" "}
                <em>ordinally</em> to their corresponding major (Ionian) or
                minor (Aeolian) scales. For example, the minor scale is the
                major scale with a flattened third tone and flattened sixth
                tone. From here, the other scales may be compared to either one
                in the same way.
              </p>
              <div className="flex justify-center">
                <table className="border-spacing-x-2">
                  <caption>Scales' Relations to Major (Ionian)</caption>
                  <colgroup>
                    <col span="1" className="" />
                    <col span="1" className="" />
                    <col span="7" className="w-10" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th scope="col" className="text-start">
                        Mode
                      </th>
                      <th scope="col" className="text-start">
                        Pattern
                      </th>
                      <th scope="col">1</th>
                      <th scope="col">2</th>
                      <th scope="col">3</th>
                      <th scope="col">4</th>
                      <th scope="col">5</th>
                      <th scope="col">6</th>
                      <th scope="col">7</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center">
                      <th scope="row" className="text-end">
                        Ionian
                      </th>
                      <td className="flex justify-center text-center lowercase [&>span]:w-5">
                        <span>W</span>
                        <span>W</span>
                        <span>H</span>
                        <span>W</span>
                        <span>W</span>
                        <span>W</span>
                        <span>H</span>
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr className="text-center">
                      <th scope="row" className="text-end">
                        Dorian
                      </th>
                      <td className="flex justify-center text-center lowercase [&>span]:w-5">
                        <span>W</span>
                        <span>H</span>
                        <span>W</span>
                        <span>W</span>
                        <span>W</span>
                        <span>H</span>
                        <span>W</span>
                      </td>
                      <td></td>
                      <td></td>
                      <td>♭</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>♭</td>
                    </tr>
                    <tr className="text-center">
                      <th scope="row" className="text-end">
                        Phrygian
                      </th>
                      <td className="flex justify-center text-center lowercase [&>span]:w-5">
                        <span>H</span>
                        <span>W</span>
                        <span>W</span>
                        <span>W</span>
                        <span>H</span>
                        <span>W</span>
                        <span>W</span>
                      </td>
                      <td></td>
                      <td>♭</td>
                      <td>♭</td>
                      <td></td>
                      <td></td>
                      <td>♭</td>
                      <td>♭</td>
                    </tr>
                    <tr className="text-center">
                      <th scope="row" className="text-end">
                        Lydian
                      </th>
                      <td className="flex justify-center text-center lowercase [&>span]:w-5">
                        <span>W</span>
                        <span>W</span>
                        <span>W</span>
                        <span>H</span>
                        <span>W</span>
                        <span>W</span>
                        <span>H</span>
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>♯</td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr className="text-center">
                      <th scope="row" className="text-end">
                        Mixolydian
                      </th>
                      <td className="flex justify-center text-center lowercase [&>span]:w-5">
                        <span>W</span>
                        <span>W</span>
                        <span>H</span>
                        <span>W</span>
                        <span>W</span>
                        <span>H</span>
                        <span>W</span>
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>♭</td>
                    </tr>
                    <tr className="text-center">
                      <th scope="row" className="text-end">
                        Aeolian
                      </th>
                      <td className="flex justify-center text-center lowercase [&>span]:w-5">
                        <span>W</span>
                        <span>H</span>
                        <span>W</span>
                        <span>W</span>
                        <span>H</span>
                        <span>W</span>
                        <span>W</span>
                      </td>
                      <td></td>
                      <td></td>
                      <td>♭</td>
                      <td></td>
                      <td></td>
                      <td>♭</td>
                      <td>♭</td>
                    </tr>
                    <tr className="text-center">
                      <th scope="row" className="text-end">
                        Locrian
                      </th>
                      <td className="flex justify-center text-center lowercase [&>span]:w-5">
                        <span>H</span>
                        <span>W</span>
                        <span>W</span>
                        <span>H</span>
                        <span>W</span>
                        <span>W</span>
                        <span>W</span>
                      </td>
                      <td></td>
                      <td>♭</td>
                      <td>♭</td>
                      <td></td>
                      <td>♭</td>
                      <td>♭</td>
                      <td>♭</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                This way, it is seen that F Lydian is much like F Ionian, but
                that its fourth tone is raised a half step. The notation here
                indicates relative accidentals; F Ionian's fourth tone is B♭,
                and raising that, or &ldquo;adding a sharp&rdquo;, results in
                B♮, <em>not</em> B♯.
              </p>
              <div>
                <ScaleDisplay
                  notes={["F", "G", "A", "B♭", "C", "D", "E", "F"]}
                />
                <ScaleDisplay
                  notes={["F", "G", "A", "B(♮)", "C", "D", "E", "F"]}
                />
              </div>
              <p>
                The Phrygian mode is almost the Aeolian mode, but its ♭2 gives
                it a darker mood. Similarly, Locrian's ♭5 makes Locrian even
                darker. Lydian, with ♯4, is the brightest.
              </p>
            </section>
            <section>
              <h3>More Minor Scales</h3>
              <p>
                The minor scale as prescribed by the Aeolian mode is called the{" "}
                <dfn>natural minor</dfn> scale. There are two patterns modifying
                it.
              </p>
              <p>
                The <dfn>harmonic minor scale</dfn> raises the seventh tone.
              </p>
              <div className="grid grid-cols-[repeat(2,auto)] items-center justify-center justify-items-start gap-x-4 gap-y-1 text-slate-800 dark:text-slate-200">
                <PianoButton
                  label={"hear"}
                  pitches={[
                    "F#3",
                    "G#3",
                    "A3",
                    "B3",
                    "C#4",
                    "D4",
                    "E#4",
                    "F#4",
                    "E#4",
                    "D4",
                    "C#4",
                    "B3",
                    "A3",
                    "G#3",
                    "F#3",
                  ]}
                  spacing={0.4}
                />
                <ScaleDisplay
                  notes={["F♯", "G♯", "A", "B", "C♯", "D", "E♯", "F♯"]}
                />
                <PianoButton
                  label={"hear"}
                  pitches={[
                    "C#4",
                    "D#4",
                    "E4",
                    "F#4",
                    "G#4",
                    "A4",
                    "B#4",
                    "C#5",
                    "B#4",
                    "A4",
                    "G#4",
                    "F#4",
                    "E4",
                    "D#4",
                    "C#4",
                  ]}
                  spacing={0.4}
                />
                <ScaleDisplay
                  notes={["C♯", "D♯", "E", "F♯", "G♯", "A", "B♯", "C♯"]}
                />
                <PianoButton
                  label={"hear"}
                  pitches={[
                    "Eb4",
                    "F4",
                    "Gb4",
                    "Ab4",
                    "Bb4",
                    "Cb5",
                    "D5",
                    "Eb5",
                    "D5",
                    "Cb5",
                    "Bb4",
                    "Ab4",
                    "Gb4",
                    "F4",
                    "Eb4",
                  ]}
                  spacing={0.4}
                />
                <ScaleDisplay
                  notes={["E♭", "F", "G♭", "A♭", "B♭", "C♭", "D", "E♭"]}
                />
                <PianoButton
                  label={"hear"}
                  pitches={[
                    "Bb3",
                    "C4",
                    "Db4",
                    "Eb4",
                    "F4",
                    "Gb4",
                    "A4",
                    "Bb4",
                    "A4",
                    "Gb4",
                    "F4",
                    "Eb4",
                    "Db4",
                    "C4",
                    "Bb3",
                  ]}
                  spacing={0.4}
                />
                <ScaleDisplay
                  notes={["B♭", "C", "D♭", "E♭", "F", "G♭", "A", "B♭"]}
                />
              </div>
              <p>
                This reintroduces the semitone distance between the seventh and
                eighth tones of the scale, which provides a powerful resolution
                not found in the natural minor scale. In harmonic minor, the
                sixth and seventh tones are three semitones apart.
              </p>
              <p>
                The <dfn>melodic minor scale</dfn> raises the sixth and seventh
                tones{" "}
                <strong>
                  on the ascending scale but lowers them back on descent.
                </strong>
              </p>
              <div className="grid grid-cols-[repeat(2,auto)] items-center justify-center justify-items-start gap-x-4 gap-y-1 text-slate-800 dark:text-slate-200">
                <PianoButton
                  label={"hear"}
                  pitches={[
                    "F#3",
                    "G#3",
                    "A3",
                    "B3",
                    "C#4",
                    "D#4",
                    "E#4",
                    "F#4",
                    "E4",
                    "D4",
                    "C#4",
                    "B3",
                    "A3",
                    "G#3",
                    "F#3",
                  ]}
                  spacing={0.4}
                />
                <ScaleDisplay
                  notes={[
                    "F♯",
                    "G♯",
                    "A",
                    "B",
                    "C♯",
                    "D♯",
                    "E♯",
                    "F♯",
                    "E",
                    "D",
                    "C♯",
                    "B",
                    "A",
                    "G♯",
                    "F♯",
                  ]}
                  highlights={[0, 1, 2, 3, 4, 5, 6, 7]}
                  selections={[8, 9]}
                  gap={0}
                />
                <PianoButton
                  label={"hear"}
                  pitches={[
                    "C#4",
                    "D#4",
                    "E4",
                    "F#4",
                    "G#4",
                    "A#4",
                    "B#4",
                    "C#5",
                    "B4",
                    "A4",
                    "G#4",
                    "F#4",
                    "E4",
                    "D#4",
                    "C#4",
                  ]}
                  spacing={0.4}
                />
                <ScaleDisplay
                  notes={[
                    "C♯",
                    "D♯",
                    "E",
                    "F♯",
                    "G♯",
                    "A♯",
                    "B♯",
                    "C♯",
                    "B",
                    "A",
                    "G♯",
                    "F♯",
                    "E",
                    "D♯",
                    "C♯",
                  ]}
                  highlights={[0, 1, 2, 3, 4, 5, 6, 7]}
                  selections={[8, 9]}
                  gap={0}
                />
                <PianoButton
                  label={"hear"}
                  pitches={[
                    "Eb4",
                    "F4",
                    "Gb4",
                    "Ab4",
                    "Bb4",
                    "C5",
                    "D5",
                    "Eb5",
                    "Db5",
                    "Cb5",
                    "Bb4",
                    "Ab4",
                    "Gb4",
                    "F4",
                    "Eb4",
                  ]}
                  spacing={0.4}
                />
                <ScaleDisplay
                  notes={[
                    "E♭",
                    "F",
                    "G♭",
                    "A♭",
                    "B♭",
                    "C",
                    "D",
                    "E♭",
                    "D♭",
                    "C♭",
                    "B♭",
                    "A♭",
                    "G♭",
                    "F",
                    "E♭",
                  ]}
                  highlights={[0, 1, 2, 3, 4, 5, 6, 7]}
                  selections={[8, 9]}
                  gap={0}
                />
                <PianoButton
                  label={"hear"}
                  pitches={[
                    "Bb3",
                    "C4",
                    "Db4",
                    "Eb4",
                    "F4",
                    "G4",
                    "A4",
                    "Bb4",
                    "Ab4",
                    "Gb4",
                    "F4",
                    "Eb4",
                    "Db4",
                    "C4",
                    "Bb3",
                  ]}
                  spacing={0.4}
                />
                <ScaleDisplay
                  gap={0}
                  highlights={[0, 1, 2, 3, 4, 5, 6, 7]}
                  selections={[8, 9]}
                  notes={[
                    "B♭",
                    "C",
                    "D♭",
                    "E♭",
                    "F",
                    "G",
                    "A",
                    "B♭",
                    "A♭",
                    "G♭",
                    "F",
                    "E♭",
                    "D♭",
                    "C",
                    "B♭",
                  ]}
                />
              </div>
              <p>
                Thus, the natural minor matches the major scale on the way up
                and matches the natural minor scale on the way down. It
                possesses the minor feeling, the resolving tendency of the major
                seventh tone, and no especial gap of three semitones anywhere.
              </p>
              <div className="flex flex-col content-center">
                <ScaleDisplay
                  notes={[
                    "F♯",
                    "G♯",
                    "A",
                    "B",
                    "C♯",
                    "D♯",
                    "E♯",
                    "F♯",
                    "E",
                    "D",
                    "C♯",
                    "B",
                    "A",
                    "G♯",
                    "F♯",
                  ]}
                />
                <ScaleDisplay
                  notes={[
                    "F♯",
                    "G♯",
                    "A♯",
                    "B",
                    "C♯",
                    "D♯",
                    "E♯",
                    "F♯",
                    "E♯",
                    "D♯",
                    "C♯",
                    "B",
                    "A♯",
                    "G♯",
                    "F♯",
                  ]}
                  highlights={[5, 6, 7]}
                />
                <ScaleDisplay
                  notes={[
                    "F♯",
                    "G♯",
                    "A",
                    "B",
                    "C♯",
                    "D",
                    "E",
                    "F♯",
                    "E",
                    "D",
                    "C♯",
                    "B",
                    "A",
                    "G♯",
                    "F♯",
                  ]}
                  highlights={[7, 8, 9]}
                />
              </div>
            </section>
          </section>
          <section>
            <h2 className="font-text text-4xl">The Pentatonic Scale</h2>
            <p>
              The <dfn>pentatonic scale</dfn> takes the first, second, third,
              fifth, and sixth tones of the major scale.
            </p>
            <div className="grid grid-cols-[repeat(2,auto)] items-center justify-center justify-items-start gap-x-4 gap-y-1 text-slate-800 dark:text-slate-200">
              <PianoButton
                label={"hear"}
                pitches={[
                  "F4",
                  "G4",
                  "A4",
                  "C5",
                  "D5",
                  "F5",
                  "D5",
                  "C5",
                  "A4",
                  "G4",
                  "F4",
                ]}
                spacing={0.35}
              />
              <ScaleDisplay notes={["F", "G", "A", "C", "D", "F"]} />
            </div>
            <p>
              It focuses on consonance, removing dissonance caused by half
              steps.
            </p>
          </section>
          <section>
            <h2 className="font-text text-4xl">The Whole-Tone Scale</h2>
            <p>
              The <dfn>whole-tone scale</dfn> is entirely of whole steps.
            </p>
            <div className="grid grid-cols-[repeat(2,auto)] items-center justify-center justify-items-start gap-x-4 gap-y-1 text-slate-800 dark:text-slate-200">
              <PianoButton
                label={"hear"}
                pitches={[
                  "B2",
                  "C#3",
                  "D#3",
                  "E#3",
                  "F##3",
                  "G##3",
                  "B3",
                  "C#4",
                  "D#4",
                  "E#4",
                  "F##4",
                  "G##4",
                  "B4",
                  "G##4",
                  "F##4",
                  "E#4",
                  "D#4",
                  "C#4",
                  "B3",
                  "G##3",
                  "F##3",
                  "E#3",
                  "D#3",
                  "C#3",
                  "B2",
                ]}
                spacing={0.15}
              />
              <ScaleDisplay notes={["B", "C♯", "D♯", "E♯", "F𝄪", "G𝄪", "B"]} />
            </div>
          </section>
          <section>
            <h2 className="font-text text-4xl">The Chromatic Scale</h2>
            <p>
              The <dfn>chromatic scale</dfn> is entirely of half steps. It
              covers every note in 12-TET.
            </p>
            <div className="grid grid-cols-[repeat(2,auto)] items-center justify-center justify-items-start gap-x-4 gap-y-1 text-slate-800 dark:text-slate-200">
              <PianoButton
                label={"hear"}
                pitches={[
                  "G4",
                  "G#4",
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
                ]}
                spacing={0.12}
              />
              <ScaleDisplay
                notes={[
                  "G",
                  "G♯",
                  "A",
                  "A♯",
                  "B",
                  "C",
                  "C♯",
                  "D",
                  "D♯",
                  "E",
                  "F",
                  "F♯",
                  "G",
                ]}
              />
            </div>
            <p>
              It is notated with sharps on the way up and flats on the way down.
            </p>
          </section>
        </main>
      </PageLayout>
    </>
  );
}
