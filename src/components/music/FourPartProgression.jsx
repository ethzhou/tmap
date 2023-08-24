import { useEffect } from "react";
import { Accidental, Factory, Formatter, Renderer, Stave, StaveConnector, StaveNote, Stem, System, Vex, Voice, VoiceMode } from "vexflow";

export default function FourPartProgression({
  name,
  parts,
  keySignature,
  timeSignature,
  chordsPerMeasure,
}) {
  const divId = name ? `vf-${name}` : "vf-output";
  // console.log(parts);
  useEffect(() => {
    const div = document.getElementById(divId);

    const renderer = new Renderer(div, Renderer.Backends.SVG);
    renderer.resize(700, 300);
    const context = renderer.getContext();
    const formatter = new Formatter();

    const trebleStave = new Stave(0, 0, 600).addClef("treble");
    const bassStave = new Stave(0, 120, 600).addClef("bass");
    trebleStave.addKeySignature(keySignature).addTimeSignature(timeSignature);
    bassStave.addKeySignature(keySignature).addTimeSignature(timeSignature);

    // Align the first notes of the staves
    const startX = Math.max(trebleStave.getNoteStartX(), bassStave.getNoteStartX());
    trebleStave.setNoteStartX(startX);
    bassStave.setNoteStartX(startX);

    trebleStave.setContext(context).draw();
    bassStave.setContext(context).draw();

    const staveConnector = new StaveConnector(trebleStave, bassStave).setType("single");
    staveConnector.setContext(context).draw();

    const [beatsPerMeasure, valuePerBeat] = timeSignature.split("/").map(item => Number(item));  // beatsPerMeasure / valuePerBeat
    const noteDuration = `${chordsPerMeasure * valuePerBeat / beatsPerMeasure}`;
    console.log(`noteduration ${noteDuration}`);

    const voices = { };
    for (const voice in parts) {
      const clef = (voice === "bass" || voice === "tenor") ? "bass" : "treble";
      voices[voice] = new Voice();
      voices[voice].setStave(clef === "bass" ? bassStave : trebleStave);
      const staveNotes = parts[voice].map(pitch => new StaveNote({
        clef: clef,
        keys: [!pitch ? "B/3" : pitch.toVFKey()],
        duration: noteDuration,
        stem_direction: (voice === "bass" || voice === "alto") ? Stem.DOWN : Stem.UP,
      }))
      voices[voice].addTickables(staveNotes);
      console.log("after", parts[voice], voices[voice]);
    }
    
    console.log("jjj", [Object.values(voices)]);
    formatter.joinVoices([voices.bass, voices.tenor]);
    formatter.joinVoices([voices.alto, voices.soprano]);
    formatter.format(Object.values(voices), 600 - startX);

    for (const voice in voices) {
      voices[voice].draw(context);
    }

    // console.log(notes.map(note => note.toKey()));

    // TODO accidentals
    // for (let i = 0; i < notes.length; i++) {
    //   if (notes[i].accidental) {
    //     printedNotes[0].addModifier(new Accidental(accidentalString(notes[i].accidental)), i);
    //   }
    // }
    // const voice = new Voice();
    // voice.addTickables(printedNotes);

    // voice.draw(context, trebleStave);
    
  }, [parts, keySignature, timeSignature, chordsPerMeasure])
  
  return (
    <div key={parts} id={divId}></div>
  );
}