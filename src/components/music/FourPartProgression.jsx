import { useEffect, useRef, useState } from "react";
import { Accidental, Beam, Formatter, Fraction, Renderer, Stave, StaveConnector, StaveNote, Stem, TextNote, Voice } from "vexflow";
import { A_OCTAVE, FOUR_VOICES, GRAND_STAFF_STAVES, accidentalToCode } from "../../utils/musicUtils";
import { COLOR_CHORD_SELECT, composeIndex, decomposeIndex } from "../../utils/utils";
import ChordSymbol from "./ChordSymbol";
import { renderToStaticMarkup } from 'react-dom/server';
import Pitch from "../../classes/Pitch";
import Key from "../../classes/Key";

export default function FourPartProgression({
  name,
  parts,
  chordAnalyses,
  tonality,
  timeSignature,
  chordCount,
  chordsPerMeasure,
  selection,
}) {
  const divId = name ? `vf-${name}` : "vf-canvas";
  const divRef = useRef();

  const [chordSymbols, setChordSymbols] = useState([]);
  
  // Draw
  // Music construction done below
  useEffect(() => {
    
    const div = document.getElementById(divId);

    const renderer = new Renderer(div, Renderer.Backends.SVG);
    const rendererWidth = 40 + noteStartX + measureCount * measureWidth;
    const rendererHeight = 360;
    renderer.resize(rendererWidth, rendererHeight);

    const context = renderer.getContext();
    const formatter = new Formatter();
    
    for (let iMeasure = 0; iMeasure < measureCount; iMeasure++) {
      const { trebleStave, bassStave, staveConnectorLeft, staveConnectorRight, voices, beams } = music[iMeasure];
      
      trebleStave.setContext(context).draw();
      bassStave.setContext(context).draw();

      staveConnectorLeft.setContext(context).draw();
      staveConnectorRight.setContext(context).draw();

      formatter.joinVoices([voices[0], voices[1]]);
      formatter.joinVoices([voices[2], voices[3]]);
      
      // Format all voices together
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
    }

    // music.forEach(({ trebleStave, bassStave, staveConnectorLeft, staveConnectorRight, voices, beams }) => {
    //   trebleStave.setContext(context).draw();
    //   bassStave.setContext(context).draw();

    //   staveConnectorLeft.setContext(context).draw();
    //   staveConnectorRight.setContext(context).draw();

    //   formatter.joinVoices([voices[0], voices[1]]);
    //   formatter.joinVoices([voices[2], voices[3]]);
    //   // formatter.alignRests(voices);
    //   formatter.format(
    //     voices,
    //     measureWidth,
    //     // { auto_beam: true, autobeam: true }
    //   );

    //   for (const voice of voices) {
    //     voice.draw(context);
    //   }

    //   beams.forEach(beam => {
    //     beam.setContext(context).draw();
    //   })
    // })

    brace.setContext(context).draw();
    doubleBarline.setContext(context).draw();

    
    // Draw chord analysis
    displayChordAnalysis();
  });
  
  // #region Construction

  // Values

  const staveX = 20;
  const staveY = 60;

  const { beatsPerMeasure, valuePerBeat } = timeSignature;
  const timeSignatureString = `${beatsPerMeasure}/${valuePerBeat}`;
  const noteDuration = chordsPerMeasure * valuePerBeat / beatsPerMeasure;
  // console.log(`noteDuration ${noteDuration}`);

  const measureCount = Math.ceil(chordCount / chordsPerMeasure);

  const staveDistance = 115;
  const measureWidth = (chordsPerMeasure + 1) * 60;

  // Determine accidentals

  // Add each letter to the base accidentals lookup, i.e. the default accidentals in a measure
  const affectedLetters = tonality.affectedLetters();
  const accidentalType = tonality.accidentalType();
  const baseDisplayedKeyAccidentals = { };
  for (const letter of A_OCTAVE) {
    baseDisplayedKeyAccidentals[letter] = affectedLetters.includes(letter) ? accidentalType : 0;
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
        const iLowerVoice = iStave * 2;
        const iUpperVoice = iLowerVoice + 1;

        const stave = GRAND_STAFF_STAVES[iStave];
        const lowerPitch = parts[iLowerVoice][iChord];
        const upperPitch = parts[iUpperVoice][iChord];

        /**
         * Helper function to add accidentals to the data.
         * @param {Pitch} pitch 
         * @param {number} iVoice 
         * @param {boolean} doCarryAccidentals Whether to consider accidentals before it, including those of the key, meaning the accidental is added. No matter what, the new accidental is recorded as the last accidental used, i.e. future accidentals may remember this one (and potentially not get displayed).
         * @returns 
         */
        const addAccidental = (pitch, iVoice, doCarryAccidentals = true) => {
          const space = pitch.toSpace();

          // Check whether the space last had the same accidental
          // First check the last appearance of the space, then fall back onto the base measure accidentals
          if (
            doCarryAccidentals
              && (
                pitch.accidental === (
                  currentMeasureAccidentalStates[stave][space] 
                    ?? baseDisplayedKeyAccidentals[pitch.letter]
                )
              )
          )
            return;
          
          // Set the corresponding values
          currentMeasureAccidentalStates[stave][space]
            = displayedAccidentals[iChord][iVoice]
            = pitch.accidental;
        }

        // If not both pitches exist, add an accidental to the right one.
        if (!lowerPitch || !upperPitch) {
          if (lowerPitch)
            addAccidental(lowerPitch, iLowerVoice);
          if (upperPitch)
            addAccidental(upperPitch, iUpperVoice);
          continue;
        }
        
        const isSameSpace = lowerPitch.isSameSpaceAs(upperPitch);
        const isSameAccidental = lowerPitch.accidental === upperPitch.accidental;

        // If the pitches are in different spaces
        if (!isSameSpace) {
          addAccidental(upperPitch, iUpperVoice);
          addAccidental(lowerPitch, iLowerVoice);
          continue;
        }

        // If the pitches are in the same space
        // Add the first accidental
        addAccidental(upperPitch, iUpperVoice, false);
        // If the pitches do not have the same accidental, add the second accidental
        if (!isSameAccidental) {
          addAccidental(lowerPitch, iLowerVoice);
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
  firstTrebleStave.addKeySignature(tonality.toVF()).addTimeSignature(timeSignatureString);
  firstBassStave.addKeySignature(tonality.toVF()).addTimeSignature(timeSignatureString);

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

  // Add notes (voices) and beams
  const music = measureStavesAndConnectors.map((measure, iMeasure) => {
    const { trebleStave, bassStave } = measure;

    const voices = [];
    const beams = [];

    for (let iVoice = 0; iVoice < 4; iVoice++) {
      const clef = iVoice < 2 ? "bass" : "treble";

      voices[iVoice] = new Voice({ num_beats: beatsPerMeasure, beat_value: valuePerBeat });
      voices[iVoice].setStave(clef === "bass" ? bassStave : trebleStave);

      // Add stave notes
      const staveNotes = [];
      for (
        let iChord = iMeasure * chordsPerMeasure;
        iChord < Math.min((iMeasure + 1) * chordsPerMeasure, chordCount);
        iChord++
      ) {
        const pitch = parts[iVoice][iChord];

        const staveNote = new StaveNote({
          clef: clef,
          keys: [!pitch ? "R/4" : pitch.toVF()],
          duration: `${noteDuration}${!pitch ? "r" : ""}`,
          stem_direction: (iVoice % 2) ? Stem.UP : Stem.DOWN,
        });
        // Add accidental if needed
        if (iChord < chordCount && displayedAccidentals[iChord][iVoice] !== undefined)
          staveNote.addModifier(new Accidental(accidentalToCode(pitch.accidental)));
        
        staveNotes.push(staveNote);
      }

      voices[iVoice].addTickables(staveNotes);

      // Add beams
      beams.push(...Beam.generateBeams(staveNotes, {
        groups: [
          new Fraction(1, valuePerBeat),
        ],
        maintain_stem_directions: true,
        // beam_rests: true,
        beam_middle_only: true,
      }));
    }

    return { ...measure, voices, beams };
  });

  // Highlight the selected notes
  if (selection) {
    const [iMeasure, imChord] = decomposeIndex(selection.iChord, chordsPerMeasure);
    if (chordsPerMeasure * iMeasure + imChord >= chordCount) {
      console.warn(`Warning: The attempted selection (${iMeasure} ${imChord}) is out of range (${selection.iChord} > ${chordCount}).`);
    }
    for (const voice of selection.voices) {
      console.log(voice);
      music[iMeasure].voices[voice].tickables[imChord].setStyle({
        fillStyle: COLOR_CHORD_SELECT,
        strokeStyle: COLOR_CHORD_SELECT,
        shadowColor: COLOR_CHORD_SELECT,
        shadowBlur: 24,
      })
    }
  }
  
  // Append rests
  if (chordCount % chordsPerMeasure) {
    const trailing = chordsPerMeasure - chordCount % chordsPerMeasure;

    const restDurations = [];
    
    // Add other rests, doubling duration until that of a semibreve
    let remaining = trailing % noteDuration;
    let restDuration = noteDuration;
    while (remaining && restDuration >= 1) {
      if (remaining & 1) {
        restDurations.push(restDuration);
      }
      remaining >>= 1;
      restDuration >>= 1;
    }
    
    // Longest note permitted is a semibreve, which is duration 1
    // Add as many semibreves as possible
    const semibreveCount = Math.floor(trailing / noteDuration);
    restDurations.push(
      ...Array(semibreveCount).fill(1)
    );

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

  // #endregion

  function getNoteXPositions() {
    const staveNotes = music.map(measure => measure.voices[0].tickables).flat().slice(0, chordCount);
    const xPositions = staveNotes.map(
      staveNote => staveNote.getBoundingBox().x
    );

    if (xPositions.length !== chordCount)
      throw console.warn("More chord symbol positions than chords.");
    return xPositions;
  }

  function displayChordAnalysis() {
    const svgElement = divRef.current.children[0];
    ["font-family", "font-size", "font-weight", "font-style"].forEach(
      attribute => svgElement.removeAttribute(attribute)
    );
    svgElement.setAttribute("font-size", 20);

    const xPositions = getNoteXPositions();

    // Indicate the key
    svgElement.innerHTML += `<text x=${xPositions[0] - 60} y="90%">${tonality.toAnalysis()}:</text>`;
    for (let iChord = 0; iChord < chordCount; iChord++) {
      // Add each chord analysis
      svgElement.innerHTML += renderToStaticMarkup(
        <ChordSymbol
          key={iChord}
          analysis={chordAnalyses[iChord]}
          x={xPositions[iChord]}
          y="90%"
          color={iChord === selection.iChord ? COLOR_CHORD_SELECT : "#000"}
        />
      )
    }
  }

  return (
    <>
      <div key={crypto.randomUUID()} ref={divRef} id={divId}></div>
    </>
  );
}