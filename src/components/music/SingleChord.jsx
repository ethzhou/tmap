import { useEffect } from "react";
import {
  Accidental,
  Formatter,
  Renderer,
  Stave,
  StaveNote,
  Voice,
} from "vexflow";
import { accidentalToCode } from "../../utils/musicUtils";

export default function SingleChord({ name, clef, pitches, scaleFactor = 1 }) {
  const divId = name ? `vf-${name}` : "vf-canvas";

  useEffect(() => {
    // Get the div returned by SingleChord
    const div = document.getElementById(divId);

    const renderer = new Renderer(div, Renderer.Backends.SVG);
    renderer.resize(122 * scaleFactor, 150 * scaleFactor);

    const stave = new Stave(0, 0, 120, {
      space_above_staff_ln: 5,
    });

    const printedNotes = [
      new StaveNote({
        keys: pitches.map(pitch =>
          typeof pitch === "string" ? pitch : pitch.toVF(),
        ),
        duration: "w",
        clef: clef,
      }),
    ];
    // Include accidentals where appropriate
    // #region Own accidental application method. Slightly different from VexFlow's Accidental.applyAccidentals: A unison with natural and sharp (like F F#) is rendered with no natural symbol via VexFlow Accidental.applyAccidentals, while this region's code would render a natural symbol. Something a unison with two sharp notes (like F# F#) would be rendered with two sharp symbols via VexFlow and one sharp symbol with this code. For some reason, in the case of flats, one flat note does render the natural symbol, but two flat notes still renders two flat symbols.
    const accidentalRecord = {}; // { "C4": [-1, 0] }
    for (let i = 0; i < pitches.length; i++) {
      if (!accidentalRecord[pitches[i].toSpace()])
        accidentalRecord[pitches[i].toSpace()] = [];

      accidentalRecord[pitches[i].toSpace()].push({
        index: i,
        accidental: pitches[i].accidental,
      });
    }
    for (const basePitch in accidentalRecord) {
      if (accidentalRecord[basePitch].some(item => item.accidental)) {
        let last = null;
        for (const item of accidentalRecord[basePitch]) {
          if (item.accidental !== last) {
            printedNotes[0].addModifier(
              new Accidental(accidentalToCode(item.accidental)),
              item.index,
            );
            last = item.accidental;
          }
        }
      }
    }
    // #endregion

    const voice = new Voice();
    voice.addTickables(printedNotes);
    // console.log(voice);

    const context = renderer.getContext();
    context.scale(scaleFactor, scaleFactor);
    new Formatter().joinVoices([voice]).format([voice], 350);

    stave.addClef(clef);
    stave.setContext(context).draw();

    voice.draw(context, stave);
  });

  return <div key={crypto.randomUUID()} id={divId}></div>;
}
