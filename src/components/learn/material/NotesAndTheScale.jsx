import PageHeader from "../../general/PageHeader";
import PageLayout from "../../layouts/PageLayout";
import PianoButton from "../../music/PianoButton";

export default function NotesAndTheScale() {
  return (
    <>
      <PageLayout>
        <PageHeader
          heading={"Notes and the Scale"}
          navUp={{ to: "/tmap/learn", display: "Learn" }}
          strokeTwColorClass="bg-emerald-400 dark:bg-emerald-600"
          // right={<PracticeInvitation to={"/tmap/practice/"} />}
        />
        <main className="relative flex flex-col gap-12 font-text text-lg text-slate-700 dark:text-slate-300">
          <p>Notes deserve musical names for musical purpose.</p>
          <section>
            <h2 className="font-text text-4xl">Scales</h2>
            <p>
              Pitch is largely relative, but relationships between pitches are
              true and important. One such relationship is that of scales.
              Generally, scales are a sequence or set of notes. Western music
              mostly concerns{" "}
              <dfn title="heptatonic scale">heptatonic scales</dfn>: those of
              seven notes (specifically, seven unique pitch classes, so notes at
              octaves are counted only once).
            </p>
          </section>
          <section>
            <h2 className="font-text text-4xl">The Major Scale</h2>
            <p>
              The <dfn>major scale</dfn> refers to the heptatonic scale taking
              the first, third, fifth, sixth, eighth, tenth, twelveth notes of
              an octave and adding at the top a final note that in an octave
              above the first note. <strong>The first note may be any;</strong>{" "}
              the rest follow from the dictated layout.
            </p>
            <PianoButton
              label={"a major scale"}
              pitches={["A4", "B4", "C#5", "D5", "E5", "F#5", "G#5", "A5"]}
              spacing={0.5}
            />
            <p>
              The pattern usually described sequentially: Between sequential
              notes are a whole step, whole step, half step, whole step, whole
              step, whole step, and half step.
            </p>
          </section>
          <section>
            <h2 className="font-text text-4xl">The Minor Scale</h2>
            <p>
              The <dfn>minor scale</dfn> is the scale from the pattern of a
              whole step, half step, whole step, whole step, half step, whole
              step, and whole step.
            </p>
            <PianoButton
              label={"a minor scale"}
              pitches={["A4", "B4", "C5", "D5", "E5", "F5", "G5", "A5"]}
              spacing={0.5}
            />
          </section>
          <section>
            <h2 className="font-text text-4xl">Letters</h2>
            <p>
              Since pitches work relatively, it is necessary to define some
              starting points from which musicians may work.
            </p>
            <p>
              The pitch given by the frequency 440 Hz is called <dfn>A</dfn>{" "}
              according to the <strong>A440 tuning standard.</strong> Following
              suit, the notes on the <em>minor</em> scale from A are named{" "}
              <dfn>B</dfn>, <dfn>C</dfn>, <dfn>D</dfn>, <dfn>E</dfn>,{" "}
              <dfn>F</dfn>, and <dfn>G</dfn> before returning to A as the final
              note an octave above the starting A. Alternatively, starting on C
              (e.g. 261.63 Hz or 523.25 Hz), the notes along the C{" "}
              <em>major</em> scale are C, D, E, F, G, A, B, and finally and
              repeatedly C. This is an alternate derivation of the same
              definitions.
            </p>
            <ul>
              <li>
                <p>
                  <strong>
                    Every note some whole octaves away from a note shares the
                    same letter name.
                  </strong>{" "}
                  Given the pitch at 330 Hz is an E, the one at 660 Hz is an E
                  as well.
                </p>
              </li>
              <li>
                <p>
                  <strong>Adjacent letters vary in distance.</strong> Between B
                  and C is a half step. Between E and F is a half step. Between
                  other adjacent letters, including G and A, are whole steps.
                </p>
              </li>
            </ul>
          </section>
          <section>
            <h2 className="font-text text-4xl">Accidentals</h2>
            <ul>
              <li>
                <p>
                  <strong>Every scale uses each letter once in order.</strong>{" "}
                  The letters themselves are not sufficient to construct all
                  scales; that requires accidentals.
                </p>
              </li>
            </ul>
            <p>
              The notes of plain letter names do not cover all notes in{" "}
              <abbr title="twelve-tone equal temperament">12-TET</abbr>. The
              whole steps skip intermediate notes. The major scale starting on D
              goes to E and then another whole step up. The next letter is F,
              but F is only one half step above E.
            </p>
            <div className="flex justify-center gap-6 text-slate-300 dark:text-slate-700 [&>span]:p-1">
              <span>D</span>
              <span>_</span>
              <span>E</span>
              <span className="text-slate-800 dark:text-slate-200">F</span>
              <span className="border border-solid border-slate-800 text-slate-800 dark:border-slate-200 dark:text-slate-200">
                _
              </span>
              <span className="text-slate-800 dark:text-slate-200">G</span>
              <span>_</span>
              <span>A</span>
              <span>_</span>
              <span>B</span>
              <span>C</span>
              <span>_</span>
              <span>D</span>
            </div>
            <p>
              (Since each letter appears in order in a scale, the next note
              should be some F and not G, but in any case G is three half steps
              above E.)
            </p>
            <p>
              These are the named and unnamed notes from A to A, where unnamed
              notes are reserved placeholders.
            </p>
            <div className="flex justify-center gap-6 [&>span]:p-1">
              <span>A</span>
              <span>_</span>
              <span>B</span>
              <span>C</span>
              <span>_</span>
              <span>D</span>
              <span>_</span>
              <span>E</span>
              <span>F</span>
              <span>_</span>
              <span>G</span>
              <span>_</span>
              <span>A</span>
            </div>
            <p>
              Neighboring notes may be constructed via <dfn>accidentals</dfn>.
              The standard accidentals are the <dfn>sharp</dfn> and{" "}
              <dfn>flat</dfn>, which indicate respectively one semitone higher
              and one semitone lower. They are notated with symbols <dfn>♯</dfn>{" "}
              and <dfn>♭</dfn>. A note with no change by accidental is{" "}
              <dfn>natural</dfn>, indicated optionally by <dfn>♮</dfn>.
            </p>
            <p>
              Now, the third note of the D major scale, a whole step above E, is
              F♯, where F♮, i.e. F, was instead a half step too low. The
              penultimate note is a whole step above B and named C♯. This
              completes the D major scale, shown below by the notes of accented
              color.
            </p>
            <div className="flex justify-center gap-6 text-slate-300 dark:text-slate-700 [&>span]:p-1">
              <span className="text-slate-800 dark:text-slate-200">D</span>
              <span>_</span>
              <span className="text-slate-800 dark:text-slate-200">E</span>
              <span>F</span>
              <span className="text-slate-800 dark:text-slate-200">F♯</span>
              <span className="text-slate-800 dark:text-slate-200">G</span>
              <span>_</span>
              <span className="text-slate-800 dark:text-slate-200">A</span>
              <span>_</span>
              <span className="text-slate-800 dark:text-slate-200">B</span>
              <span>C</span>
              <span className="text-slate-800 dark:text-slate-200">C♯</span>
              <span className="text-slate-800 dark:text-slate-200">D</span>
            </div>
            <section>
              <h3>Enharmonics</h3>
              <p>
                <strong>A given note has multiple names.</strong> For instance,
                the note one half step above A is one half step below B. By
                this, A♯ and B♭ represent notes of the same pitch; they are{" "}
                <dfn>enharmonic</dfn>. Even so,{" "}
                <strong>their functionalities are different</strong>. For
                example, that scales take each letter exactly once determines
                the selection. The E♭ major scale goes E♭, F, G, A♭, B♭, C, D,
                E♭. The fifth note is <em>not</em> A♯ despite its sounding
                identical to B♭.
              </p>
              <p>
                <strong>
                  It is important every heptatonic scale uses each letter
                  exactly once.
                </strong>{" "}
                One way to construct a scale is to write all the letters first
                and on second pass add accidentals to shape the notes into the
                desired distances.
              </p>
              <section className="px-8">
                <h4>Example</h4>
                <p>
                  Consider the E major scale to be constructed; start with the
                  letters and traverse note by note.
                </p>
                <div className="flex justify-center gap-6 [&>span]:p-1">
                  <span>E</span>
                  <span>F</span>
                  <span>G</span>
                  <span>A</span>
                  <span>B</span>
                  <span>C</span>
                  <span>D</span>
                  <span>E</span>
                </div>
                <div className="flex justify-center gap-6 text-slate-300 dark:text-slate-700 [&>span]:p-1">
                  <span className="text-slate-800 dark:text-slate-200">E</span>
                  <span>F</span>
                  <span>G</span>
                  <span>A</span>
                  <span>B</span>
                  <span>C</span>
                  <span>D</span>
                  <span>E</span>
                </div>
                <p>
                  The major scale first moves a whole step, but E to F is only a
                  half step; F is raised to F♯.
                </p>
                <div className="flex justify-center gap-6 text-slate-300 dark:text-slate-700 [&>span]:p-1">
                  <span className="text-slate-800 dark:text-slate-200">E</span>
                  <span className="text-slate-800 dark:text-slate-200">F♯</span>
                  <span>G</span>
                  <span>A</span>
                  <span>B</span>
                  <span>C</span>
                  <span>D</span>
                  <span>E</span>
                </div>
                <p>
                  Next, the major scale again moves a whole step, but F♯ to G is
                  only a half step; G is raised to G♯.
                </p>
                <div className="flex justify-center gap-6 text-slate-300 dark:text-slate-700 [&>span]:p-1">
                  <span className="text-slate-800 dark:text-slate-200">E</span>
                  <span className="text-slate-800 dark:text-slate-200">F♯</span>
                  <span className="text-slate-800 dark:text-slate-200">G♯</span>
                  <span>A</span>
                  <span>B</span>
                  <span>C</span>
                  <span>D</span>
                  <span>E</span>
                </div>
                <p>
                  The major scale then moves a half step. G♯ to A is just that,
                  so A is left natural.
                </p>
                <div className="flex justify-center gap-6 text-slate-300 dark:text-slate-700 [&>span]:p-1">
                  <span className="text-slate-800 dark:text-slate-200">E</span>
                  <span className="text-slate-800 dark:text-slate-200">F♯</span>
                  <span className="text-slate-800 dark:text-slate-200">G♯</span>
                  <span className="text-slate-800 dark:text-slate-200">A</span>
                  <span>B</span>
                  <span>C</span>
                  <span>D</span>
                  <span>E</span>
                </div>
                <p>
                  After that is a whole step, which A to B satisfies, so B is
                  left natural.
                </p>
                <div className="flex justify-center gap-6 text-slate-300 dark:text-slate-700 [&>span]:p-1">
                  <span className="text-slate-800 dark:text-slate-200">E</span>
                  <span className="text-slate-800 dark:text-slate-200">F♯</span>
                  <span className="text-slate-800 dark:text-slate-200">G♯</span>
                  <span className="text-slate-800 dark:text-slate-200">A</span>
                  <span className="text-slate-800 dark:text-slate-200">B</span>
                  <span>C</span>
                  <span>D</span>
                  <span>E</span>
                </div>
                <p>
                  Another whole step follows. B to C is only a half step; C is
                  raised to C♯.
                </p>
                <div className="flex justify-center gap-6 text-slate-300 dark:text-slate-700 [&>span]:p-1">
                  <span className="text-slate-800 dark:text-slate-200">E</span>
                  <span className="text-slate-800 dark:text-slate-200">F♯</span>
                  <span className="text-slate-800 dark:text-slate-200">G♯</span>
                  <span className="text-slate-800 dark:text-slate-200">A</span>
                  <span className="text-slate-800 dark:text-slate-200">B</span>
                  <span className="text-slate-800 dark:text-slate-200">C♯</span>
                  <span>D</span>
                  <span>E</span>
                </div>
                <p>
                  Similarly, C♯ to D is only a half step where there is desired
                  a whole step; D is raised to D♯.
                </p>
                <div className="flex justify-center gap-6 text-slate-300 dark:text-slate-700 [&>span]:p-1">
                  <span className="text-slate-800 dark:text-slate-200">E</span>
                  <span className="text-slate-800 dark:text-slate-200">F♯</span>
                  <span className="text-slate-800 dark:text-slate-200">G♯</span>
                  <span className="text-slate-800 dark:text-slate-200">A</span>
                  <span className="text-slate-800 dark:text-slate-200">B</span>
                  <span className="text-slate-800 dark:text-slate-200">C♯</span>
                  <span className="text-slate-800 dark:text-slate-200">D♯</span>
                  <span>E</span>
                </div>
                <p>
                  Lastly, D♯ to E is the proper, final half step. All together,
                  this is the E major scale.
                </p>
                <div className="flex justify-center gap-6 text-slate-800 dark:text-slate-200 [&>span]:p-1">
                  <span>E</span>
                  <span>F♯</span>
                  <span>G♯</span>
                  <span>A</span>
                  <span>B</span>
                  <span>C♯</span>
                  <span>D♯</span>
                  <span>E</span>
                </div>
              </section>
              <p>
                There are such notes as C♭, enharmonic to B, and E♯, enharmonic
                to F. Like other enharmonic notes, they are not interchangeable
                but in pitch.
              </p>
              <p>
                Try deriving the D♭ major scale, F♯ major scale, and C{" "}
                <em>minor</em> scale.
              </p>
            </section>
            <section>
              <h3>Double and Further Accidentals</h3>
              <p>
                A note may be raised or lowered more than one step via double
                accidentals. The <dfn>double flat</dfn> is notated <dfn>𝄫</dfn>,
                and the <dfn>double sharp</dfn> is notated <dfn>𝄪</dfn>. Western
                music generally does not explore triple accidentals except in
                theoretical realms and contemporary music.
              </p>
              <p>
                The purpose of double (and triple) accidentals is to those of
                single accidentals. Sometimes, the note to be modified already
                has an accidental. For example, whichever purpose motivated the
                lowering of A to A♭ is the same motivator of the lowering of A♭
                to A𝄫.
              </p>
              <p>
                <dfn>Microtonality</dfn> divides the half step further to yield
                quarter tone and three quarter tones flats and sharps, or even
                beyond. It is usually in contemporary usage.
              </p>
            </section>
            <section>
              <h3>The Numbers Perspective</h3>
              <p>
                Accidentals may be considered using numerical values. Suppose
                sharps each added 1 to a note's accidental value and flats each
                added -1. Accidentals add together. When notes must be raised or
                lowered, the final accidental is relative to their original
                accidental. For example, lowering C♯ a half step results in C♮,
                as 1 - 1 = 0; lowering F a half step results in F♭, as 0 - 1 =
                -1; and raising D♯ a half step results in D𝄪, as 1 + 1 = 2.
              </p>
              <p>
                This is useful in programmatically implementing musical
                algorithms and formulae. It is one feature in the musical model
                of <span className="font-hand">tmap</span>.
              </p>
            </section>
          </section>
        </main>
      </PageLayout>
    </>
  );
}
