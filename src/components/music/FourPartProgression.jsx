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
  useEffect(() => {
    // Values

    const staveX = 20;
    const staveY = 60;

    const [beatsPerMeasure, valuePerBeat] = timeSignature.split("/").map(item => Number(item));
    const noteDuration = `${chordsPerMeasure * valuePerBeat / beatsPerMeasure}`;
    console.log(`noteDuration ${noteDuration}`);

    const chordCount = parts.soprano.length;
    const measureCount = Math.ceil(chordCount / chordsPerMeasure);

    const staveDistance = 115;
    const measureWidth = chordsPerMeasure * 60;
    
    // Create symbols

    const measureStaves = [];

    const firstTrebleStave = new Stave(staveX, staveY, measureWidth);
    const firstBassStave = new Stave(staveX, staveY + staveDistance, measureWidth);

    firstTrebleStave.addClef("treble");
    firstBassStave.addClef("bass");
    firstTrebleStave.addKeySignature(keySignature).addTimeSignature(timeSignature);
    firstBassStave.addKeySignature(keySignature).addTimeSignature(timeSignature);

    // Align the first notes of the staves
    // noteStartX is a value measuring from the border of the canvas
    const noteStartX = Math.max(firstTrebleStave.getNoteStartX(), firstBassStave.getNoteStartX());
    // relativeNoteStartX is a value measuring from the start of the stave
    const relativeNoteStartX = noteStartX - staveX;
    firstTrebleStave.setNoteStartX(noteStartX);
    firstBassStave.setNoteStartX(noteStartX);
    firstTrebleStave.setWidth(firstTrebleStave.getWidth() + relativeNoteStartX);
    firstBassStave.setWidth(firstBassStave.getWidth() + relativeNoteStartX);
    
    measureStaves.push({ trebleStave: firstTrebleStave, bassStave: firstBassStave });
    // Create more staves, one per measure, each starting where the last ended
    for (let i = 1; i < measureCount; i++) {
      const trebleStave = new Stave(
        noteStartX + i * measureWidth,
        staveY,
        measureWidth
      );
      const bassStave = new Stave(
        noteStartX + i * measureWidth,
        staveY + staveDistance,
        measureWidth
      );

      measureStaves.push({ trebleStave, bassStave });
    }
    
    measureStaves.at(-1).trebleStave.setWidth(measureWidth + 14);
    measureStaves.at(-1).bassStave.setWidth(measureWidth + 14);
    const brace = new StaveConnector(
      measureStaves[0].trebleStave,
      measureStaves[0].bassStave,
    ).setType("brace");
    const doubleBarline = new StaveConnector(
      measureStaves.at(-1).trebleStave,
      measureStaves.at(-1).bassStave
    ).setType("boldDoubleRight");

    const measureStavesAndConnectors = measureStaves.map(({ trebleStave, bassStave }) => {
      const staveConnector = new StaveConnector(trebleStave, bassStave).setType("singleLeft");

      return { trebleStave, bassStave, staveConnector };
    })

    const music = measureStavesAndConnectors.map(({ trebleStave, bassStave, staveConnector }, i) => {
      const voices = { };
      for (const part in parts) {
        const clef = (part === "bass" || part === "tenor") ? "bass" : "treble";
        voices[part] = new Voice({ num_beats: beatsPerMeasure, beat_value: valuePerBeat });
        voices[part].setStave(clef === "bass" ? bassStave : trebleStave);
        const staveNotes = parts[part].slice(i * chordsPerMeasure, (i + 1) * chordsPerMeasure).map(
          pitch => new StaveNote({
            clef: clef,
            keys: [!pitch ? "R/4" : pitch.toVFKey()],
            duration: `${noteDuration}${!pitch ? "r" : ""}`,
            stem_direction: (part === "bass" || part === "alto") ? Stem.DOWN : Stem.UP,
          })
        );
        // console.log("after", parts[part], voices[part]);
        voices[part].addTickables(staveNotes);
      }

      // TODO accidentals

      return { trebleStave, bassStave, staveConnector, voices };
    });
    
    if (chordCount % chordsPerMeasure) {
      const lastVoices = music.at(-1).voices;
      for (const part in lastVoices) {
        for (let i = 0; i < chordsPerMeasure - chordCount % chordsPerMeasure; i++) {
          lastVoices[part].addTickable(new StaveNote({
            keys: ["R/4"],
            duration: `${noteDuration}r`,
          }));
        }
      };
    }
      
    console.log(music);

    // Draw

    const div = document.getElementById(divId);
    const renderer = new Renderer(div, Renderer.Backends.SVG);

    const rendererWidth = 40 + noteStartX + measureCount * measureWidth;
    const rendererHeight = 360;
    renderer.resize(rendererWidth, rendererHeight);
    const context = renderer.getContext();
    const formatter = new Formatter();
    
    music.forEach(({ trebleStave, bassStave, staveConnector, voices }, i) => {
      trebleStave.setContext(context).draw();
      bassStave.setContext(context).draw();

      staveConnector.setContext(context).draw();

      formatter.joinVoices([voices.bass, voices.tenor]);
      formatter.joinVoices([voices.alto, voices.soprano]);
      // formatter.alignRests(Object.values(voices));
      formatter.format(
        Object.values(voices),
        measureWidth,
        // { auto_beam: true, autobeam: true }
      );

      for (const voice in voices) {
        voices[voice].draw(context);
      }
    })
    brace.setContext(context).draw();
    doubleBarline.setContext(context).draw();
  }, [parts, keySignature, timeSignature, chordsPerMeasure])
  
  return (
    <div key={parts} id={divId}></div>
  );
}