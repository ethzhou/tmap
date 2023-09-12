import { useCallback, useEffect, useRef, useState } from "react";
import Pitch from "../../../classes/Pitch";
import FourPartProgression from "../../music/FourPartProgression";
import { clamp, composeIndex, decomposeIndex, randInt } from "../../../utils/utils";
import { FOUR_VOICES, conformToVFKey, isValidKey, isValidNoteDuration, isValidTime, calculateNoteDuration, parseStringChordSymbol } from "../../../utils/musicUtils";

function f(s) {
  return s.split(" ").filter(item => item !== "").map(e => e === "r" ? null : Pitch.fromString(e));
}

const testParts = {
  soprano: f("C5  D5  E6  r   B5  C5  D#5 D5  E6  D#5 D5  E6  r   B5  C5  C5  D5  E6 E6"),
  alto:    f("E4  F#3 F#3 E4  E4  E4  D#5 D#5 D#5 D5  F#3 F#3 E4  E4  E4  E4  F#3 F3 F3"),
  tenor:   f("G3  Ab4 F3  A4  E3  D3  G3  Ab4 F3  G3  Ab4 F3  A4  E3  D3  G3  Ab4 F3 F3"),
  bass:    f("C2  F2  F2  G1  E2  F2  C2  F2  F2  C2  F2  F2  G1  E2  F2  C2  F2  F2 F2"),
};

export default function FourPartHarmony() {
  const inputRef = useRef();

  const [parts, setParts] = useState({
    soprano: [],
    alto: [],
    tenor: [],
    bass: []
  });

  const [chordAnalyses, setChordAnalyses] = useState([]);

  const [keySignature, setKeySignature] = useState("C");
  const [timeSignature, setTimeSignature] = useState();

  const [chordCount, setChordCount] = useState();
  const [chordsPerMeasure, setChordsPerMeasure] = useState();

  const [selection, setSelection] = useState({
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
    const timeSignature = { beatsPerMeasure, valuePerBeat };

    const chordCount = 2 * randInt(2, 6) + 1;
    const chordsPerMeasure = [2, 4, 8][randInt(0, 1)];

    setParts(() => ({
      // null represents a rest
      soprano: Array(chordCount).fill(null),
      alto: Array(chordCount).fill(null),
      tenor: Array(chordCount).fill(null),
      bass: Array(chordCount).fill(null)
    }));

    setChordAnalyses(() => Array(chordCount).fill(null));

    setTimeSignature(() => timeSignature);
    setChordCount(() => chordCount);
    setChordsPerMeasure(() => chordsPerMeasure);
  }

  function handleKeyDown(event) {
    // Submission
    if (event.key === "Enter") {
      parseInput(inputRef.current.value);
      inputRef.current.value = "";

      return;
    }

    // Actions for an empty input field
    if (inputRef.current.value === "") {
      if (event.key === "ArrowLeft") {
        selectBefore();
      }
      else if (event.key === "ArrowRight") {
        selectAfter();
      }
    }
  };

  // Lookup table of functions by first character of input
  const responseTable = {
    // Chord before
    ",": responseSelectBefore,
    // Chord after
    ".": responseSelectAfter,
    // Selection
    "`": responseSelection,
    // Chordal input
    "/": responseChordal,
    // Melodic input
    "b": responseMelodic,
    "t": responseMelodic,
    "a": responseMelodic,
    "s": responseMelodic,
    // Key signature
    "!": responseKeySignature,
    // Time signature
    "@": responseTimeSignature,
    // Chord count
    "#": responseChordCount,
    // Shorthand: key, time, chord count
    "~": responseMusicParameterShorthand,
    // Clear
    "%": responseClear,
    // Chord analysis
    ";": responseChordAnalyses,
  };
  
  /**
   * Parses input.
   * 
   * @param {string} inputStr The first character determines the resulting procedure.
   */
  function parseInput(inputStr) {
    const response = responseTable[inputStr[0]];
    if (response)
      response(inputStr);
  }

  // #region Helper functions

  /**
   * Helper for creating selections that target at least one note.
   * If the voices are unspecified, then they are unchanged. If the voices are specified but they select none of the voices (e.g. "" or "qwer", which do not contain any of satb), then all voices are selected.
   * 
   * @param {number} chord Selection chords are 1-indexed.
   * @param {string} voices
   * @returns
   */
  function createSelection(chord, voices) {
    if (voices === undefined) {
      voices = selection.voices;
      return { chord, voices };
    }

    if (voices === "*") {
      voices = "satb";
    }
    
    voices = voices?.split("").map(v => "btas".indexOf(v.toLowerCase())).filter(v => v > -1).sort();
    // If voices is undefined or its length is 0, set the voices
    if (!voices?.length) {
      voices = [...Array(4).keys()];
    }

    return { chord, voices };
  }

  /**
   * Select a chord by 1-based index.
   * 
   * @param {number} chord The 1-based index of the chord.
   */
  function select(chord, voices) {
    const selection = createSelection(chord, voices);

    setSelection(() => selection);
  }

  /**
   * Make a selection before the current chord.
   * 
   * @param {number} delta The size of the selection shift.
   */
  function selectBefore(delta = 1) {
    if (delta < 0)
      selectAfter(-delta);

    setSelection(selection => {
      const newSelection = {...selection};

      newSelection.chord = clamp(newSelection.chord - delta, 1, chordCount);

      return newSelection;
    });
  }

  /**
   * Make a selection after the current chord.
   * 
   * @param {number} delta The size of the selection shift.
   */
  function selectAfter(delta = 1) {
    if (delta < 0)
      selectBefore(-delta);

    setSelection(selection => {
      const newSelection = {...selection};
      
      newSelection.chord = clamp(newSelection.chord + delta, 1, chordCount);
      
      return newSelection;
    });
  }

  /**
   * 
   * @param {string} selectionStr In the format of "`2`1`sa": measure 2, chord 1, soprano and alto voices.
   * @returns 
   */
  function parseSelection(selectionStr) {
    const args = selectionStr.slice(1).split("`");

    const I = decomposeIndex(selection.chord, chordsPerMeasure, true);
    const measure = Number(args[0]) || I[0];
    const chordM = Number(args[1]) || I[1];
    const newVoices = args[2];
    
    // Run checks
    // Check that the measure access is valid
    if (measure < 1) {
      return;
    }
    // Check that the chord access is valid
    if (chordM < 1 || chordM > chordsPerMeasure)
      return;

    const newChord = composeIndex([measure, chordM], chordsPerMeasure, true);
    // Check that the chord is within range
    if (newChord > chordCount)
      return;
  
    return createSelection(newChord, newVoices);
  }

  function clear(selection) {
    setParts(parts => {
      const newParts = {...parts};
      
      for (const voice of selection.voices) {
        newParts[FOUR_VOICES[voice]][selection.chord - 1] = null;
      }
      return newParts;
    });
  }

  /**
   * Clears chords in a specified range. End is included.
   * 
   * @param {number} first
   * @param {number} last Included.
   */
  function clearRange(first, last, voices) {
    for (let iChord = first; iChord <= last; iChord++) {
      const targetSelection = createSelection(iChord, voices);
      clear(targetSelection);
    }
  }

  // #endregion

  // #region Response functions

  function responseSelectBefore(inputStr) {
    const delta = Number(inputStr.slice(1));
    selectBefore(delta && delta > -1 ? delta : undefined);
  }

  function responseSelectAfter(inputStr) {
    const delta = Number(inputStr.slice(1));
    selectAfter(delta && delta > -1 ? delta : undefined);
  }

  function responseSelection(inputStr) {
    const newSelection = parseSelection(inputStr);
    
    setSelection(() => newSelection);
  }

  function responseChordal(inputStr) {
    const args = inputStr.slice(1).split("/");

    const pitches = args.map(pitchStr => pitchStr === "%" ? null : Pitch.fromString(pitchStr));
    
    setParts(parts => {
      const newParts = {...parts};
      pitches.forEach((pitch, i) => {
        // Filter the undefined pitches
        if (pitch === undefined)
          return;

        const part = newParts[FOUR_VOICES[selection.voices[i]]];
        if (part)
          part[selection.chord - 1] = pitch;
      });

      return newParts;
    });
    selectAfter();
  }

  function responseMelodic(inputStr) {
    const args = inputStr.slice(2).split(" ");
    const voice = "btas".indexOf(inputStr[0]);
    
    const pitches = args.map(pitchStr => pitchStr === "%" ? null : Pitch.fromString(pitchStr));
    setParts(parts => {
      const newParts = {...parts};

      const startChord = selection.chord;
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

  function responseKeySignature(inputStr) {
    const keySignature = inputStr.slice(1).trim();

    // Validate pitch
    if (!isValidKey(keySignature)) {
      console.log(`${keySignature} is not a valid key.`);
      return;
    }

    setKeySignature(() => conformToVFKey(keySignature));
  }

  function responseTimeSignature(inputStr) {
    const args = inputStr.slice(1).split(" ");

    const [ upper, lower ] = args[0].split("/").map(v => Number(v));
    
    const newTimeSignature = { beatsPerMeasure: upper, valuePerBeat: lower };
    const newChordsPerMeasure = Number(args[1]) || chordsPerMeasure;
    
    const newTimeSignatureString = `${upper}/${lower}`;

    // Validate time
    if (!isValidTime(newTimeSignature)) {
      console.log(`${newTimeSignatureString} is not a valid time.`);
      return;
    }

    // Validate resulting duration
    const noteDuration = calculateNoteDuration(newTimeSignature, newChordsPerMeasure);
    if (!isValidNoteDuration(noteDuration)) {
      console.log(`${noteDuration} is not a valid note duration.`);
      return;
    }

    setTimeSignature(() => newTimeSignature);
    setChordsPerMeasure(() => newChordsPerMeasure);

    select(
      clamp(selection.chord, 1, chordCount)
    );
  }

  function responseChordCount(inputStr) {
    const newChordCount = Number(inputStr.slice(1));

    if (!newChordCount)
      return;

    // Set chord count
    setChordCount(() => newChordCount);
    // Trim or extend the part arrays to have so many chords.
    setParts(parts => {
      const newParts = {...parts};
      
      // Trim if fewer
      if (newChordCount < chordCount) {
        for (const voice in newParts) {
          newParts[voice] = newParts[voice].slice(0, newChordCount);
        }
      }
      // Extend if more
      else if (newChordCount > chordCount) {
        for (const voice in newParts) {
          newParts[voice] = newParts[voice].concat(
            Array(newChordCount - newParts[voice].length).fill(null)
          );
        }
      }
      
      return newParts;
    })

    select(
      clamp(selection.chord, 1, newChordCount)
    );
  }

  function responseMusicParameterShorthand(inputStr) {
    const args = inputStr.slice(1).split(" ");

    // For each, prepend 0 as a throwaway character
    responseKeySignature("0" + args[0]);
    responseTimeSignature("0" + `${args[1]} ${args[3] ?? ""}`);
    responseChordCount("0" + args[2]);
  }

  function responseClear(inputStr) {
    const target = inputStr.slice(1);
    console.log(`Clearing target ${target}`);

    // Clear selection
    if (target === "%") {
      clear(selection);

      return;
    }

    // Clear chord
    if (target[0] === "`") {
      const targetSelection = parseSelection(target);
      clear(targetSelection);

      return;
    }
    
    // Clear measure
    if (target === "%%%") {
      const firstChord = chordsPerMeasure * Math.ceil(selection.chord / chordsPerMeasure);
      const lastChord = firstChord - chordsPerMeasure + 1;
      
      clearRange(lastChord, firstChord);

      return;
    }

    // Clear score
    if (target === "%%%%%%%") {
      clearRange(1, chordCount);

      return;
    }
  }

  function responseChordAnalyses(inputStr) {
    const args = inputStr.slice(1).split(" ");
    console.log(args);

    const symbols = args.map(symbol => symbol === "%" ? null : parseStringChordSymbol(symbol));
    setChordAnalyses(chordAnalyses => {
      const newChordAnalyses = [...chordAnalyses]

      const startChord = selection.chord;
      // Iterate the number of pitches, but only up to the last chord
      const iterationCount = clamp(
        chordCount - startChord + 1,
        0,
        symbols.length
      );
      for (let iSymbol = 0; iSymbol < iterationCount; iSymbol++) {
        // Filter the undefined pitches
        if (symbols[iSymbol] === undefined)
          continue;
        newChordAnalyses[startChord - 1 + iSymbol] = symbols[iSymbol];
      }
      // Move the selection the same amount
      selectAfter(iterationCount);

      return newChordAnalyses;
    });
  }

  // #endregion

  // console.log("selection", selection.chord, selection.voices);
  // console.log("parts" , parts);

  return (
    <>
      {chordCount && (
        <FourPartProgression
          {...{
            parts,
            chordAnalyses,
            keySignature,
            timeSignature,
            chordCount,
            chordsPerMeasure,
            selection
          }}
        />
      )}
      <input
        ref={inputRef}
        type="text"
        onKeyDown={handleKeyDown}
        onMouseOver={event => event.target.focus()}
        autoFocus
      />
    </>
  )
}