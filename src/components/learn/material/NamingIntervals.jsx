import PageHeader from "../../general/PageHeader";
import PageLayout from "../../layouts/PageLayout";
import SingleChord from "../../music/SingleChord";
import Pitch from "../../../classes/Pitch";
import FigureExample from "../../general/FigureExample";
import PracticeInvitation from "../../general/PracticeInvitation";

export default function NamingIntervals() {
  return (
    <>
      <PageLayout>
        <PageHeader
          heading={"Naming Intervals"}
          navUp={{ to: "/tmap/learn", display: "Learn" }}
          strokeTwColorClass="bg-emerald-400 dark:bg-emerald-600"
          right={<PracticeInvitation to={"/tmap/practice/interval-reading"} />}
        />
        <main className="relative flex flex-col gap-12 font-text text-lg text-slate-700 dark:text-slate-300">
          <p>
            An interval is named by quality and size, notated respectively by a
            letter and number.
          </p>
          <section>
            <h2 className="font-text text-4xl">Size</h2>
            <p>
              <strong>
                The number is the number of letters away inclusively the higher
                note is from the lower.
              </strong>{" "}
              This is the count of lines and spaces starting from that of the
              lower note to that of the higher.{" "}
              <strong>Both ends are included in the count.</strong>
            </p>
            <p>
              This is the size of the interval. This carries into determining
              the quality. No other number should appear in the name.
            </p>
            <div className="flex w-full justify-around">
              <FigureExample caption={"5"}>
                <SingleChord
                  clef={"treble"}
                  pitches={[Pitch.fromString("C4"), Pitch.fromString("G4")]}
                />
              </FigureExample>
              <FigureExample caption={"6"}>
                <SingleChord
                  clef={"treble"}
                  pitches={[Pitch.fromString("F#4"), Pitch.fromString("D#5")]}
                />
              </FigureExample>
              <FigureExample
                caption={"3"}
                doHideCaption={true}
                doShowTryMessage={true}
              >
                <SingleChord
                  clef={"treble"}
                  pitches={[Pitch.fromString("A4"), Pitch.fromString("Cb5")]}
                />
              </FigureExample>
            </div>
          </section>
          <section>
            <h2 className="font-text text-4xl">Quality</h2>
            <p>
              <strong>
                The quality of the interval is determined relative to the
                theoretical major scale of the lower note.
              </strong>{" "}
              Using the determined size, the higher note is compared with the
              corresponding note of the scale degree of the major scale of the
              lower note.
            </p>
            <section>
              <h3></h3>
              <section className="px-4 text-base">
                <h4>1, 4, 5, 8</h4>
                <p>
                  If the size of the interval is 1, 4, 5, or 8, then the
                  interval is <dfn>augmented</dfn>, <dfn>perfect</dfn>, or{" "}
                  <dfn>diminished</dfn>.
                  <div className="flex justify-center">
                    <table className="[&_:is(th,td)]:px-4 [&_:is(th,td)]:py-1 [&_td:nth-child(1)]:text-end [&_td:nth-child(3)]:text-center [&_th]:text-start">
                      <tr className="align-bottom">
                        <th>
                          Distance
                          <br />
                          (semitones)
                        </th>
                        <th>Quality</th>
                        <th>Symbol</th>
                      </tr>
                      <tr>
                        <td>+1</td>
                        <td>augmented</td>
                        <td>A</td>
                      </tr>
                      <tr>
                        <td>0</td>
                        <td>perfect</td>
                        <td>P</td>
                      </tr>
                      <tr>
                        <td>-1</td>
                        <td>diminished</td>
                        <td>d</td>
                      </tr>
                    </table>
                  </div>
                </p>
              </section>
              <section className="px-4 text-base">
                <h4>2, 3, 6, 7</h4>
                <p>
                  If the size of the interval is 2, 3, 6, or 7, then the
                  interval is <dfn>augmented</dfn>, <dfn>major</dfn>,{" "}
                  <dfn>minor</dfn>, or <dfn>diminished</dfn>.
                </p>
                <div className="flex justify-center">
                  <table className="[&_:is(th,td)]:px-4 [&_:is(th,td)]:py-1 [&_td:nth-child(1)]:text-end [&_td:nth-child(3)]:text-center [&_th]:text-start">
                    <tr className="align-bottom">
                      <th>
                        Distance
                        <br />
                        (semitones)
                      </th>
                      <th>Quality</th>
                      <th>Symbol</th>
                    </tr>
                    <tr>
                      <td>+1</td>
                      <td>augmented</td>
                      <td>A</td>
                    </tr>
                    <tr>
                      <td>0</td>
                      <td>major</td>
                      <td>M</td>
                    </tr>
                    <tr>
                      <td>-1</td>
                      <td>minor</td>
                      <td>m</td>
                    </tr>
                    <tr>
                      <td>-2</td>
                      <td>diminished</td>
                      <td>d</td>
                    </tr>
                  </table>
                </div>
              </section>
            </section>
            <p>
              A augmented, perfect, major, minor, and diminished qualities are
              respectively denoted <dfn>A</dfn>, <dfn>P</dfn>, <dfn>M</dfn>,{" "}
              <dfn>m</dfn>, and <dfn>d</dfn>. The full name is the quality
              followed by the size. In speech, the size is typically expressed
              with an ordinal number; firsts are instead <dfn>unisons</dfn>, and{" "}
              eighths are instead <dfn>octaves</dfn>.
            </p>
            <section>
              <h3>Examples</h3>
              <ul>
                <li>
                  G above C is the fifth letter counting from C. G is in the
                  major scale of C. The interval from C up to a G is a perfect
                  fifth.
                </li>
                <li>
                  D above F♯ is the sixth letter counting from F. D is not in
                  the theoretical major scale of F♯; instead, D♯ is, and D is
                  one semitone lower than D♯. The interval from F♯ up to D is a
                  minor sixth.
                </li>
              </ul>
              <div className="flex w-full justify-around">
                <FigureExample caption={"P5"}>
                  <SingleChord
                    clef={"treble"}
                    pitches={[Pitch.fromString("C4"), Pitch.fromString("G4")]}
                  />
                </FigureExample>
                <FigureExample caption={"m6"}>
                  <SingleChord
                    clef={"treble"}
                    pitches={[Pitch.fromString("F#4"), Pitch.fromString("D5")]}
                  />
                </FigureExample>
                <FigureExample caption={"d3"} doHideCaption={true}>
                  <SingleChord
                    clef={"treble"}
                    pitches={[Pitch.fromString("A4"), Pitch.fromString("Cb5")]}
                  />
                </FigureExample>
              </div>
            </section>
          </section>
          <p>
            Intervals of two notes the same distance in semitones apart,
            enharmonic intervals, are not functionally the same, and interchange
            of names generally does not work.
          </p>
          <section>
            <div className="grid grid-cols-3 place-items-center">
              <FigureExample caption={"M3"} doHideCaption={true}>
                <SingleChord
                  clef={"treble"}
                  pitches={[Pitch.fromString("G4"), Pitch.fromString("B4")]}
                />
              </FigureExample>
              <FigureExample caption={"M6"} doHideCaption={true}>
                <SingleChord
                  clef={"treble"}
                  pitches={[Pitch.fromString("Ab4"), Pitch.fromString("F5")]}
                />
              </FigureExample>
              <FigureExample caption={"d5"} doHideCaption={true}>
                <SingleChord
                  clef={"treble"}
                  pitches={[Pitch.fromString("A#4"), Pitch.fromString("E5")]}
                />
              </FigureExample>
              <FigureExample caption={"P8"} doHideCaption={true}>
                <SingleChord
                  clef={"bass"}
                  pitches={[Pitch.fromString("A#2"), Pitch.fromString("A#3")]}
                />
              </FigureExample>
              <FigureExample caption={"A4"} doHideCaption={true}>
                <SingleChord
                  clef={"bass"}
                  pitches={[Pitch.fromString("Fb2"), Pitch.fromString("Bb2")]}
                />
              </FigureExample>
              <FigureExample caption={"P1"} doHideCaption={true}>
                <SingleChord
                  clef={"treble"}
                  pitches={[Pitch.fromString("Cb5"), Pitch.fromString("Cb5")]}
                />
              </FigureExample>
              <FigureExample caption={"P5"} doHideCaption={true}>
                <SingleChord
                  clef={"treble"}
                  pitches={[Pitch.fromString("B#4"), Pitch.fromString("F##5")]}
                />
              </FigureExample>
              <FigureExample caption={"M3"} doHideCaption={true}>
                <SingleChord
                  clef={"treble"}
                  pitches={[Pitch.fromString("B#4"), Pitch.fromString("D##5")]}
                />
              </FigureExample>
              <FigureExample caption={"A6"} doHideCaption={true}>
                <SingleChord
                  clef={"bass"}
                  pitches={[Pitch.fromString("Db3"), Pitch.fromString("B3")]}
                />
              </FigureExample>
              <FigureExample caption={"d2"} doHideCaption={true}>
                <SingleChord
                  clef={"treble"}
                  pitches={[Pitch.fromString("F5"), Pitch.fromString("Gbb5")]}
                />
              </FigureExample>
              <FigureExample caption={"m3"} doHideCaption={true}>
                <SingleChord
                  clef={"treble"}
                  pitches={[Pitch.fromString("D#4"), Pitch.fromString("F#4")]}
                />
              </FigureExample>
              <FigureExample caption={"m7"} doHideCaption={true}>
                <SingleChord
                  clef={"bass"}
                  pitches={[Pitch.fromString("Fb2"), Pitch.fromString("Ebb3")]}
                />
              </FigureExample>
            </div>
          </section>
        </main>
      </PageLayout>
    </>
  );
}
