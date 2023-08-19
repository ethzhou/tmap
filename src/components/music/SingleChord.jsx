import { useEffect } from "react";
import { Accidental, Factory, Formatter, Renderer, Stave, StaveNote, Vex, Voice } from "vexflow";
import { accidentalString } from "../../classes/Pitch";

export default function SingleChord({ name, clef, notes }) {
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

    // console.log(notes.map(note => note.toKey()));
    const printedNotes = [
      new StaveNote({ keys: notes.map(note => note.toVFKey()), duration: "w", clef: clef }),
    ];
    for (let i = 0; i < notes.length; i++) {
      if (notes[i].accidental) {
        printedNotes[0].addModifier(new Accidental(accidentalString(notes[i].accidental)), i);
      }
    }
    const voice = new Voice();
    voice.addTickables(printedNotes);

    new Formatter().joinVoices([voice]).format([voice], 350);

    voice.draw(context, stave);
  }, [clef, notes])
  
  return (
    <div key={notes} id={name ? `vf-${name}` : "vf-output"}></div>
  );
}