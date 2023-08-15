import { useEffect } from "react";
import { Factory, Formatter, Renderer, Stave, StaveNote, Vex, Voice } from "vexflow";

export default function SingleChord({ name, clef, notes }) {
  useEffect(() => {
    // Get the div returned by SingleChord
    const div = document.getElementById(name ? `vf-${name}` : "vf-output");

    const renderer = new Renderer(div, Renderer.Backends.SVG);
    renderer.resize(92, 600);
    const context = renderer.getContext();

    const stave = new Stave(0, 0, 90, {
      space_above_staff_ln: 5,
    });

    stave.addClef(clef);

    stave.setContext(context).draw();

    // console.log(notes.map(note => note.toKey()));
    const printedNotes = [
      new StaveNote({ keys: notes.map(note => note.toVFKey()), duration: "w", clef: clef }),
    ];
    const voice = new Voice();
    voice.addTickables(printedNotes);

    new Formatter().joinVoices([voice]).format([voice], 350);

    voice.draw(context, stave);
  }, [])
  
  return (
    <div id={name ? `vf-${name}` : "vf-output"}></div>
  );
}