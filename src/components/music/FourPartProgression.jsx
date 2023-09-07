import { useEffect } from "react";
import { Accidental, Beam, Formatter, Fraction, Renderer, Stave, StaveConnector, StaveNote, Stem, Voice } from "vexflow";
import { A_OCTAVE, FOUR_PARTS, GRAND_STAFF_STAVES, accidentalToCode, keyAccidentalType, keyAffectedLetters } from "../../utils/musicUtils";
import { COLOR_CHORD_SELECT } from "../../utils/utils";

export default function FourPartProgression({
  name,
  parts,
  keySignature,
  timeSignature,
  chordCount,
  chordsPerMeasure,
  selection,
}) {
  const divId = name ? `vf-${name}` : "vf-output";
  useEffect(() => {
    // Values

    const staveX = 20;
    const staveY = 60;

    const [beatsPerMeasure, valuePerBeat] = timeSignature.split("/").map(item => Number(item));
    const noteDuration = chordsPerMeasure * valuePerBeat / beatsPerMeasure;
    // console.log(`noteDuration ${noteDuration}`);

    // const chordCount = parts.soprano.length;
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
      for (
        let iChord = iMeasure * chordsPerMeasure;
        iChord < Math.min((iMeasure + 1) * chordsPerMeasure, chordCount);
        iChord++
      ) {
        for (let iStave = 0; iStave < 2; iStave++) {
          const iLowerPart = iStave * 2;
          const iUpperPart = iLowerPart + 1;

          const stave = GRAND_STAFF_STAVES[iStave];
          const lowerPitch = parts[FOUR_PARTS[iLowerPart]][iChord];
          const upperPitch = parts[FOUR_PARTS[iUpperPart]][iChord];

          // Helper function
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

    // The first measure is special, since it holds the clef, key signature, and time signature; it is created separately.
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
    
    // Add staves to array
    measureStaves.push({ trebleStave: firstTrebleStave, bassStave: firstBassStave });
    for (let i = 1; i < measureCount; i++) {
      // Create more staves, one per measure, each starting where the last ended
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
    // Brace for the first measure (the rest of the barlines are set later)
    const brace = new StaveConnector(
      measureStaves[0].trebleStave,
      measureStaves[0].bassStave,
    ).setType("brace");
    // Double barline for the last measure
    const doubleBarline = new StaveConnector(
      measureStaves.at(-1).trebleStave,
      measureStaves.at(-1).bassStave
    ).setType("boldDoubleRight");

    // Add stave connectors
    const measureStavesAndConnectors = measureStaves.map(measure => {
      const { trebleStave, bassStave } = measure;
      const staveConnectorLeft = new StaveConnector(trebleStave, bassStave).setType("singleLeft");
      const staveConnectorRight = new StaveConnector(trebleStave, bassStave).setType("singleRight");  // Not necessary

      return { ...measure, staveConnectorLeft, staveConnectorRight };
    })

    // Add notes
    const music = measureStavesAndConnectors.map((measure, iMeasure) => {
      const { trebleStave, bassStave } = measure;

      const voices = [];
      const beams = [];

      for (let iPart = 0; iPart < 4; iPart++) {
        const part = FOUR_PARTS[iPart];
        const clef = iPart < 2 ? "bass" : "treble";

        voices[iPart] = new Voice({ num_beats: beatsPerMeasure, beat_value: valuePerBeat });
        voices[iPart].setStave(clef === "bass" ? bassStave : trebleStave);

        const staveNotes = [];
        for (
          let iChord = iMeasure * chordsPerMeasure;
          iChord < Math.min((iMeasure + 1) * chordsPerMeasure, chordCount);
          iChord++
        ) {
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
        beams.push(...Beam.generateBeams(staveNotes, {
          groups: [
            new Fraction(1, valuePerBeat),
          ],
          maintain_stem_directions: true,
          beam_rests: true,
          beam_middle_only: true,
        }));
        // console.log("after", parts[part], voices[iPart]);
      }

      return { ...measure, voices, beams };
    });

    // Highlight the selected notes
    if (selection) {
      for (const voice of selection.voices) {
        console.log(selection.measure, voice, selection.chord);
        music[selection.measure - 1].voices[voice].tickables[selection.chord - 1].setStyle({
          fillStyle: COLOR_CHORD_SELECT,
          strokeStyle: COLOR_CHORD_SELECT,
          shadowColor: COLOR_CHORD_SELECT,
        })
      }
    }
    
    // Append rests
    if (chordCount % chordsPerMeasure) {
      const trailing = chordsPerMeasure - chordCount % chordsPerMeasure;
      let remaining = trailing;
      let restDuration = noteDuration;
      const restDurations = [];
      while (remaining && restDuration >= 1) {
        if (remaining & 1) {
          restDurations.push(restDuration);
        }
        remaining >>= 1;
        restDuration >>= 1;
      }
      // Once the rest duration exceeds that of a whole note, instead fill the remainder of the measure with whole notes.
      restDurations.push(...Array(remaining / noteDuration).fill(1));
      // console.log(restDurations);

      const lastVoices = music.at(-1).voices;
      for (const voice of lastVoices) {
        for (const restDuration of restDurations) {
          voice.addTickable(new StaveNote({
            keys: ["R/4"],
            duration: `${restDuration}r`,
          }));
        }
      };
    }

    console.log("music", music);

    // Draw

    const div = document.getElementById(divId);

    const renderer = new Renderer(div, Renderer.Backends.SVG);
    const rendererWidth = 40 + noteStartX + measureCount * measureWidth;
    const rendererHeight = 360;
    renderer.resize(rendererWidth, rendererHeight);

    const context = renderer.getContext();
    const formatter = new Formatter();
    
    music.forEach(({ trebleStave, bassStave, staveConnectorLeft, staveConnectorRight, voices, beams }) => {
      trebleStave.setContext(context).draw();
      bassStave.setContext(context).draw();

      staveConnectorLeft.setContext(context).draw();
      staveConnectorRight.setContext(context).draw();

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

      beams.forEach(beam => {
        beam.setContext(context).draw();
      })
    })
    brace.setContext(context).draw();
    doubleBarline.setContext(context).draw();
  }, [parts, keySignature, timeSignature, chordCount, chordsPerMeasure, selection]);
  
  return (
    <div key={crypto.randomUUID()} id={name ? `vf-${name}` : "vf-output"}></div>
  );
}