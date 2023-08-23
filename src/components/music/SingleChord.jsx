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

    // Draw the stave

    const stave = new Stave(0, 0, 120, {
      space_above_staff_ln: 5,
    });
    stave.addClef(clef);
    stave.setContext(context).draw();

    // Draw the notes

    const printedNotes = [
      new StaveNote({ keys: pitches.map(pitch => pitch.toVFKey()), duration: "w", clef: clef }),
    ];
    // Include accidentals where appropriate
    const accidentalRecord = { };  // { "C4": [-1, 0] }
    for (let i = 0; i < pitches.length; i++) {
      if (!accidentalRecord[pitches[i].toString(false)])
        accidentalRecord[pitches[i].toString(false)] = [];
      accidentalRecord[pitches[i].toString(false)].push({
        index: i,
        accidental: pitches[i].accidental
      });
    }
    console.log(accidentalRecord);
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
    const voice = new Voice();
    voice.addTickables(printedNotes);
    new Formatter().joinVoices([voice]).format([voice], 350);

    voice.draw(context, stave);
  }, [clef, pitches])
  
  return (
    <div key={pitches} id={name ? `vf-${name}` : "vf-output"}></div>
  );
}