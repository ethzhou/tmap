import { useEffect } from "react";
import { Accidental, Formatter, Renderer, Stave, StaveConnector, StaveNote, Stem, Voice } from "vexflow";
import { A_OCTAVE, FOUR_PARTS, GRAND_STAFF_STAVES, accidentalToCode, keyAccidentalType, keyAffectedLetters } from "../../utils/musicUtils";

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
    const measureWidth = (chordsPerMeasure + 1) * 60;

    // Determine accidentals

    const affectedLetters = keyAffectedLetters(keySignature);
    const keyAccidental = keyAccidentalType(keySignature);
    const baseDisplayedKeyAccidentals = { };
    for (const letter of A_OCTAVE) {
      baseDisplayedKeyAccidentals[letter] = affectedLetters.includes(letter) ? keyAccidental : 0;
    }

    const displayedAccidentals = Array(chordCount).fill().map(_ => []);
    for (let iMeasure = 0; iMeasure < measureCount; iMeasure++) {
      const currentMeasureAccidentalStates = { };
      GRAND_STAFF_STAVES.forEach(stave => currentMeasureAccidentalStates[stave] = { });
      for (let iChord = iMeasure * chordsPerMeasure; iChord < (iMeasure + 1) * chordsPerMeasure; iChord++) {
        for (let iStave = 0; iStave < 2; iStave++) {
          const iLowerPart = iStave * 2;
          const iUpperPart = iLowerPart + 1;

          const stave = GRAND_STAFF_STAVES[iStave];
          const lowerPitch = parts[FOUR_PARTS[iLowerPart]][iChord];
          const upperPitch = parts[FOUR_PARTS[iUpperPart]][iChord];

          const addAccidental = (pitch, iPart, doCarryAccidentals = true) => {
            const space = pitch.toSpace();
            if (doCarryAccidentals
              && pitch.accidental
                === (currentMeasureAccidentalStates[stave][space] ?? baseDisplayedKeyAccidentals[pitch.letter]))
              return;
            currentMeasureAccidentalStates[stave][space]
              = displayedAccidentals[iChord][iPart]
              = pitch.accidental;
          }

          // If not both pitches exist
          if (!lowerPitch || !upperPitch) {
            if (lowerPitch)
              addAccidental(lowerPitch, iLowerPart);
            if (upperPitch)
              addAccidental(upperPitch, iUpperPart);
            continue;
          }
          
          const isSameSpace = lowerPitch.isSameSpaceAs(upperPitch);
          const isSameAccidental = lowerPitch.accidental === upperPitch.accidental;

          // If the pitches are in different spaces
          if (!isSameSpace) {
            addAccidental(upperPitch, iUpperPart);
            addAccidental(lowerPitch, iLowerPart);
            continue;
          }

          // If the pitches are in the same space
          // Add the first accidental
          addAccidental(upperPitch, iUpperPart, false);
          // If the pitches do not have the same accidental, add the second accidental
          if (!isSameAccidental) {
            addAccidental(lowerPitch, iLowerPart);
          }
        }
      }
    }
    
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
    
    // Extend the last measures by just a bit
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

    const music = measureStavesAndConnectors.map(({ trebleStave, bassStave, staveConnector }, iMeasure) => {
      const voices = [];
      for (let iPart = 0; iPart < 4; iPart++) {
        const part = FOUR_PARTS[iPart];
        const clef = iPart < 2 ? "bass" : "treble";

        voices[iPart] = new Voice({ num_beats: beatsPerMeasure, beat_value: valuePerBeat });
        voices[iPart].setStave(clef === "bass" ? bassStave : trebleStave);

        const staveNotes = [];
        for (let iChord = iMeasure * chordsPerMeasure; iChord < (iMeasure + 1) * chordsPerMeasure; iChord++) {
          const pitch = parts[part][iChord];

          const staveNote = new StaveNote({
            clef: clef,
            keys: [!pitch ? "R/4" : pitch.toVFKey()],
            duration: `${noteDuration}${!pitch ? "r" : ""}`,
            stem_direction: (iPart % 2) ? Stem.UP : Stem.DOWN,
          });
          // Add accidental if needed
          if (iChord < chordCount && displayedAccidentals[iChord][iPart] !== undefined)
            staveNote.addModifier(new Accidental(accidentalToCode(pitch.accidental)));
          
          staveNotes.push(staveNote);
        }
        
        voices[iPart].addTickables(staveNotes);
        // console.log("after", parts[part], voices[iPart]);
      }

      return { trebleStave, bassStave, staveConnector, voices };
    });
    
    // if (chordCount % chordsPerMeasure) {
    //   const lastVoices = music.at(-1).voices;
    //   for (const voice of lastVoices) {
    //     for (let i = 0; i < chordsPerMeasure - chordCount % chordsPerMeasure; i++) {
    //       voice.addTickable(new StaveNote({
    //         keys: ["R/4"],
    //         duration: `${noteDuration}r`,
    //       }));
    //     }
    //   };
    // }

    console.log("music", music);

    // Draw

    const div = document.getElementById(divId);
    const renderer = new Renderer(div, Renderer.Backends.SVG);

    const rendererWidth = 40 + noteStartX + measureCount * measureWidth;
    const rendererHeight = 360;
    renderer.resize(rendererWidth, rendererHeight);
    const context = renderer.getContext();
    const formatter = new Formatter();
    
    music.forEach(({ trebleStave, bassStave, staveConnector, voices }) => {
      trebleStave.setContext(context).draw();
      bassStave.setContext(context).draw();

      staveConnector.setContext(context).draw();

      formatter.joinVoices([voices[0], voices[1]]);
      formatter.joinVoices([voices[2], voices[3]]);
      // formatter.alignRests(voices);
      formatter.format(
        voices,
        measureWidth,
        // { auto_beam: true, autobeam: true }
      );

      for (const voice of voices) {
        voice.draw(context);
      }
    })
    brace.setContext(context).draw();
    doubleBarline.setContext(context).draw();
  }, [parts, keySignature, timeSignature, chordsPerMeasure])
  
  return (
    <div key={parts} id={divId}></div>
  );
}