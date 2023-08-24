import { useEffect } from "react";
import { Accidental, Factory, Formatter, Renderer, Stave, StaveNote, Vex, Voice } from "vexflow";
import { accidentalToString } from "../../classes/Pitch";

export default function SingleChord({ name, clef, pitches }) {
  useEffect(() => {
    // Get the div returned by SingleChord
    const div = document.getElementById(name ? `vf-${name}` : "vf-output");

    const renderer = new Renderer(div, Renderer.Backends.SVG);
    renderer.resize(122, 150);
    const context = renderer.getContext();

    const stave = new Stave(0, 0, 120, {
      space_above_staff_ln: 5,
    });
    stave.addClef(clef);
    stave.setContext(context).draw();

    const printedNotes = [
      new StaveNote({ keys: pitches.map(pitch => pitch.toVFKey()), duration: "w", clef: clef }),
    ];
    // Include accidentals where appropriate
    //#region Own accidental application method. Slightly different from VexFlow's Accidental.applyAccidentals: A unison with natural and sharp (like F F#) is rendered with no natural symbol via VexFlow Accidental.applyAccidentals, while this region's code would render a natural symbol. Something a unison with two sharp notes (like F# F#) would be rendered with two sharp symbols via VexFlow and one sharp symbol with this code. For some reason, in the case of flats, one flat note does render the natural symbol, but two flat notes still renders two flat symbols.
    const accidentalRecord = { };  // { "C4": [-1, 0] }
    for (let i = 0; i < pitches.length; i++) {
      if (!accidentalRecord[pitches[i].toString(false)])
        accidentalRecord[pitches[i].toString(false)] = [];
      accidentalRecord[pitches[i].toString(false)].push({
        index: i,
        accidental: pitches[i].accidental
      });
    }
    for (const basePitch in accidentalRecord) {
      if (accidentalRecord[basePitch].some(item => item.accidental)) {
        let last = null;
        for (const item of accidentalRecord[basePitch]) {
          if (item.accidental !== last) {
            const accidentalString = accidentalToString(item.accidental);
            printedNotes[0].addModifier(
              new Accidental(accidentalString === "" ? "n" : accidentalString),
              item.index
            );
            last = item.accidental;
          }
        }
      }
    }
    //#endregion
    const voice = new Voice();
    voice.addTickables(printedNotes);

    new Formatter().joinVoices([voice]).format([voice], 350);

    voice.draw(context, stave);
  }, [clef, pitches])
  
  return (
    <div key={pitches} id={name ? `vf-${name}` : "vf-output"}></div>
  );
}