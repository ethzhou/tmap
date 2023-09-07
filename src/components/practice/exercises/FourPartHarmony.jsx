import { useEffect, useRef, useState } from "react";
import Pitch from "../../../classes/Pitch";
import FourPartProgression from "../../music/FourPartProgression";
import { clamp, randInt } from "../../../utils/utils";
import { FOUR_VOICES, conformToVFKey, isValidKey, isValidTime } from "../../../utils/musicUtils";

function f(s) {
  return s.split(" ").filter(item => item !== "").map(e => e === "r" ? null : Pitch.fromString(e));
}

const testParts = {
  soprano: f("C5  D5  E6  r   B5  C5  D#5 D5  E6  D#5 D5  E6  r   B5  C5  C5  D5  E6 E6"),
  alto:    f("E4  F#3 F#3 E4  E4  E4  D#5 D#5 D#5 D5  F#3 F#3 E4  E4  E4  E4  F#3 F3 F3"),
  tenor:   f("G3  Ab4 F3  A4  E3  D3  G3  Ab4 F3  G3  Ab4 F3  A4  E3  D3  G3  Ab4 F3 F3"),
  bass:    f("C2  F2  F2  G1  E2  F2  C2  F2  F2  C2  F2  F2  G1  E2  F2  C2  F2  F2 F2"),
};

function constructSelection(measure, chord, voices = [...Array(4).keys()]) {
  return { measure, chord, voices };
}

/**
 * Returns the 1-based index of the chord given a measure, chord of the measure, and chords per measure.
 * 
 * @param {*} selection 
 * @param {*} chordsPerMeasure 
 * @returns {number}
 */
function selectedChord(selection, chordsPerMeasure) {
  return chordsPerMeasure * (selection.measure - 1) + (selection.chord);
}

export default function FourPartHarmony() {
  const inputRef = useRef();

  const [parts, setParts] = useState({
    soprano: [],
    alto: [],
    tenor: [],
    bass: []
  });

  const [keySignature, setKeySignature] = useState("C");
  const [timeSignature, setTimeSignature] = useState();

  const [chordCount, setChordCount] = useState();
  const [chordsPerMeasure, setChordsPerMeasure] = useState();

  const [selection, setSelection] = useState({
    measure: 1,
    chord: 1,
    voices: [0, 1, 2, 3]
  });

  useEffect(() => {
    generateParameters();
    inputRef.current.focus();
  }, []);

  function generateParameters() {
    const beatsPerMeasure = [2, 4, 8][randInt(0, 1)];
    const valuePerBeat = 2 ** [randInt(1, 3)];
    const timeSignature = `${beatsPerMeasure}/${valuePerBeat}`;

    const chordCount = 2 * randInt(2, 6) + 1;
    const chordsPerMeasure = [2, 4, 8][randInt(0, 1)];

    setParts(() => ({
      // null represents a rest
      soprano: Array(chordCount).fill(null),
      alto: Array(chordCount).fill(null),
      tenor: Array(chordCount).fill(null),
      bass: Array(chordCount).fill(null)
    }));

    setTimeSignature(() => timeSignature);
    setChordCount(() => chordCount);
    setChordsPerMeasure(() => chordsPerMeasure);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      parseInput(inputRef.current.value);
      inputRef.current.value = "";

      return;
    }
    if (inputRef.current.value === "") {
      if (event.key === "ArrowLeft") {
        selectBefore();
      }
      if (event.key === "ArrowRight") {
        selectAfter();
      }
    }
  };

  /**
   * Parses input.
   * 
   * @param {string} inputStr
   */
  function parseInput(inputStr) {
    // Chord before
    if (inputStr[0] === ",") {
      const delta = Number(inputStr.slice(1));
      selectBefore(delta && delta > -1 ? delta : undefined);

      return;
    }

    // Chord after
    if (inputStr[0] === ".") {
      const delta = Number(inputStr.slice(1));
      selectAfter(delta && delta > -1 ? delta : undefined);      

      return;
    }

    // Navigation
    if (inputStr[0] === "`") {
      // TODO move this logic into parseSelection
      const newSelection = parseSelection(inputStr);
      if (newSelection)
        setSelection(() => newSelection);
      
      return;
    }

    // Chordal
    if (inputStr[0] === "/") {
      parseChordal(inputStr);
      
      return;
    }

    // Melodic
    if ("btas".includes(inputStr[0])) {
      parseMelodic(inputStr);

      return;
    }

    // Key signature
    if (inputStr[0] === "!") {
      parseKeySignature(inputStr);
    }

    // Time signature
    if (inputStr[0] === "@") {
      parseTimeSignature(inputStr);
    }
  }

  /**
   * Select the previous chord.
   * 
   * @param {number} delta The size of the selection shift.
   */
  function selectBefore(delta = 1) {
    setSelection(selection => {
      if (delta < 0)
        selectAfter(-delta);

      const newSelection = {...selection};

      if (selectedChord(selection, chordsPerMeasure) <= delta) {
        newSelection.measure = newSelection.chord = 1;

        return newSelection;
      }

      newSelection.measure -= Math.floor(delta / chordsPerMeasure);
      newSelection.chord = (selection.chord - 1 - delta + chordsPerMeasure) % chordsPerMeasure + 1;
      // Decrement by one measure if the chords carried over
      newSelection.measure -= newSelection.chord > selection.chord;

      return newSelection;
    });
  }

  /**
   * Select the next chord.
   * 
   * @param {number} delta The size of the selection shift.
   */
  function selectAfter(delta = 1) {
    setSelection(selection => {
      if (delta < 0)
        selectBefore(-delta);

      const newSelection = {...selection};
      
      if (selectedChord(selection, chordsPerMeasure) > chordCount - delta) {
        newSelection.measure = Math.ceil(chordCount / chordsPerMeasure);
        newSelection.chord = chordCount % chordsPerMeasure;

        return newSelection;
      }

      newSelection.measure += Math.floor(delta / chordsPerMeasure);
      newSelection.chord = (selection.chord - 1 + delta) % chordsPerMeasure + 1;
      // Increment by one measure if the chords carried over
      newSelection.measure += newSelection.chord < selection.chord;
      
      return newSelection;
    });
  }

  function parseSelection(inputStr) {
    const args = inputStr.slice(1).split(" ");

    const measure = Number(args[0]);
    const chord = Number(args[1]);
    const voices = args[2]?.split("").map(v => "btas".indexOf(v)).filter(v => v > -1).sort();
    
    // Run checks
    // Check that measure and chord are numbers
    if (!measure || !chord)
      return;
    // Check that the measure access is valid
    if (measure < 1) {
      return;
    }
    // Check that the chord access is valid
    if (chord > chordsPerMeasure || chord < 1)
      return;
    // Check that the chord is within range
    if (selectedChord({ measure, chord }, chordsPerMeasure) > chordCount)
      return;
  
    return constructSelection(measure, chord, voices);
  }

  function parseChordal(inputStr) {
    const args = inputStr.slice(1).split("/");

    const pitches = args.map(pitchStr => pitchStr === "%" ? null : Pitch.fromString(pitchStr));
    setParts(parts => {
      const newParts = {...parts};
      pitches.forEach((pitch, i) => {
        // Filter the undefined pitches
        if (pitch === undefined)
          return;

        newParts[
          FOUR_VOICES[selection.voices[i]]
        ][
          selectedChord(selection, chordsPerMeasure) - 1
        ] = pitch;
      });

      return newParts;
    });
  }

  function parseMelodic(inputStr) {
    const args = inputStr.slice(2).split(" ");
    const voice = "btas".indexOf(inputStr[0]);
    
    const pitches = args.map(pitchStr => pitchStr === "%" ? null : Pitch.fromString(pitchStr));
    setParts(parts => {
      const newParts = {...parts};

      const startChord = selectedChord(selection, chordsPerMeasure);
      // Iterate the number of pitches, but only up to the last chord
      const iterationCount = clamp(
        chordCount - startChord + 1,
        0,
        pitches.length
      );
      for (let iPitch = 0; iPitch < iterationCount; iPitch++) {
        // Filter the undefined pitches
        if (pitches[iPitch] === undefined)
          continue;
        newParts[FOUR_VOICES[voice]][startChord - 1 + iPitch] = pitches[iPitch];
      }
      // Move the selection the same amount
      selectAfter(iterationCount);

      return newParts;
    });
  }

  function parseKeySignature(inputStr) {
    const keySignature = inputStr.slice(1).trim();

    // Validate pitch
    if (!isValidKey(keySignature)) {
      console.log(`${keySignature} is not a valid key.`);
      return;
    }

    setKeySignature(() => conformToVFKey(keySignature));
  }

  function parseTimeSignature(inputStr) {
    const args = inputStr.slice(1).split(" ");

    const timeSignature = args[0];
    const force = args[1] === "force";

    // Validate time
    if (!isValidTime(timeSignature)) {
      console.log(`${timeSignature} is not a valid time.`);
      return;
    }
    
    // Validate resulting duration
    const [beatsPerMeasure, valuePerBeat] = timeSignature.split("/").map(item => Number(item));
    const noteDuration = chordsPerMeasure * valuePerBeat / beatsPerMeasure;
    if (!Number.isInteger(noteDuration)) {
      console.log(`The resulting note duration (${noteDuration}) is not an integer.`)
      if (!force)
        return;
      else {
        // TODO clear score
      }
    }

    setTimeSignature(timeSignature);
  }

  return (
    <>
      {chordCount && (
        <FourPartProgression
          {...{
            parts,
            keySignature,
            timeSignature,
            chordCount,
            chordsPerMeasure,
            selection
          }}
        />
      )}
      <input ref={inputRef} type="text" onKeyDown={handleKeyDown} />
    </>
  )
}