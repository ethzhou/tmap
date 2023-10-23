import { useEffect, useRef, useState } from "react";
import Pitch from "../../../../classes/Pitch";
import FourPartProgression from "../../../music/FourPartProgression";
import {
  clamp,
  composeIndex,
  decomposeIndex,
  randInt,
} from "../../../../utils/utils";
import {
  isValidNoteDuration,
  isValidTime,
  calculateNoteDuration,
} from "../../../../utils/musicUtils";
import FourPartHarmonyEvaluation from "./FourPartHarmonyEvaluation";
import Key from "../../../../classes/Key";
import ChordAnalysis from "../../../../classes/ChordAnalysis";
import PianoPlayer from "../../../../classes/PianoPlayer";
import { Link } from "react-router-dom";
import StopwatchDisplay from "../../../general/StopwatchDisplay";

// #region Test parts

// function f(s) {
//   return s
//     .split(" ")
//     .filter(item => item !== "")
//     .map(e => (e === "r" ? null : Pitch.fromString(e)));
// }

// const testParts = {
//   soprano: f(
//     "C5  D5  E6  r   B5  C5  D#5 D5  E6  D#5 D5  E6  r   B5  C5  C5  D5  E6 E6",
//   ),
//   alto: f(
//     "E4  F#3 F#3 E4  E4  E4  D#5 D#5 D#5 D5  F#3 F#3 E4  E4  E4  E4  F#3 F3 F3",
//   ),
//   tenor: f(
//     "G3  Ab4 F3  A4  E3  D3  G3  Ab4 F3  G3  Ab4 F3  A4  E3  D3  G3  Ab4 F3 F3",
//   ),
//   bass: f(
//     "C2  F2  F2  G1  E2  F2  C2  F2  F2  C2  F2  F2  G1  E2  F2  C2  F2  F2 F2",
//   ),
// };

// #endregion

const pianoPlayer = new PianoPlayer();

export default function FourPartHarmony() {
  const inputRef = useRef();

  const [parts, setParts] = useState([[], [], [], []]);

  const [chordAnalyses, setChordAnalyses] = useState([]);

  // Tonality is key, but React's `key` prop is reserved, and so this term serves as a synonym.
  const [tonality, setTonality] = useState(new Key("C"));
  const [timeSignature, setTimeSignature] = useState();

  const [chordCount, setChordCount] = useState();
  const [chordsPerMeasure, setChordsPerMeasure] = useState();

  const [selection, setSelection] = useState({
    iChord: 0,
    voices: [0, 1, 2, 3],
  });

  useEffect(() => {
    loadParameters();
    inputRef.current.focus();
  }, []);

  // #region Parameter saves and loads

  function save() {
    const jsonData = {
      parts: parts.map(part => part.map(pitch => pitch?.toString())),
      chordAnalyses: chordAnalyses.map(chordAnalysis =>
        chordAnalysis?.toString(),
      ),
      tonality: tonality.toString(),
      timeSignature,
      chordCount,
      chordsPerMeasure,
    };
    // console.log("Storing", jsonData, JSON.stringify(jsonData));
    localStorage.setItem("fourPartHarmonyScore", JSON.stringify(jsonData));
  }

  function setParameters({
    parts,
    chordAnalyses,
    tonality,
    timeSignature,
    chordCount,
    chordsPerMeasure,
    selection,
  }) {
    if (parts) setParts(() => parts);

    if (chordAnalyses) setChordAnalyses(() => chordAnalyses);

    if (tonality) setTonality(() => tonality);

    if (timeSignature) setTimeSignature(() => timeSignature);

    if (chordCount) setChordCount(() => chordCount);

    if (chordsPerMeasure) setChordsPerMeasure(() => chordsPerMeasure);

    if (selection) setSelection(() => selection);
  }

  function loadParameters() {
    const retrievedData = localStorage.getItem("fourPartHarmonyScore");

    // console.log("Retrieving", retrievedData, JSON.parse(retrievedData));
    const retrievedObject = retrievedData
      ? JSON.parse(retrievedData)
      : undefined;
    const parameters = retrievedObject?.parts[0].length
      ? parseLoadedParameters(retrievedObject)
      : generateParameters();
    setParameters(parameters);
  }

  function parseLoadedParameters(data) {
    const parts = data.parts?.map(part =>
      part.map(pitch => (pitch ? Pitch.fromString(pitch) : null)),
    );
    const chordAnalyses = data.chordAnalyses?.map(chordAnalysis =>
      chordAnalysis ? ChordAnalysis.fromString(chordAnalysis) : null,
    );
    const tonality = Key.fromString(data.tonality);
    const { timeSignature, chordCount, chordsPerMeasure, selection } = data;

    const parameters = {
      parts,
      chordAnalyses,
      tonality,
      timeSignature,
      chordCount,
      chordsPerMeasure,
      selection,
    };
    return parameters;
  }

  function generateParameters() {
    const beatsPerMeasure = [2, 4, 8][randInt(0, 1)];
    const valuePerBeat = 2 ** [randInt(1, 3)];
    const timeSignature = { beatsPerMeasure, valuePerBeat };

    const chordCount = 2 * randInt(2, 6) + 1;
    const chordsPerMeasure = [2, 4, 8][randInt(0, 1)];

    const parts = [
      Array(chordCount).fill(null),
      Array(chordCount).fill(null),
      Array(chordCount).fill(null),
      Array(chordCount).fill(null),
    ];

    const chordAnalyses = Array(chordCount).fill(null);

    return {
      parts,
      chordAnalyses,
      timeSignature,
      chordCount,
      chordsPerMeasure,
    };
  }

  // #endregion

  // Submit

  function submit(event) {
    parseInput(inputRef.current.value);
    inputRef.current.value = "";
  }

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
    b: responseMelodic,
    t: responseMelodic,
    a: responseMelodic,
    s: responseMelodic,
    // Key signature
    "!": responseKey,
    // Time signature
    "@": responseTime,
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
    // console.log(`Parsing input ${inputStr}`);
    const response = responseTable[inputStr[0]];
    if (response) response(inputStr);
  }

  // #region Helper functions

  /**
   * Helper for creating selections that target at least one note.
   * If the voices are unspecified, then they are unchanged. If the voices are specified but they select none of the voices (e.g. "" or "qwer", which do not contain any of satb), then all voices are selected.
   *
   * @param {number} iChord
   * @param {string} voices
   * @returns
   */
  function createSelection(iChord, voices) {
    if (voices === undefined) {
      voices = selection.voices;
      return { iChord, voices };
    }

    if (voices === "*") {
      voices = "satb";
    }

    voices = voices
      ?.split("")
      .map(v => "btas".indexOf(v.toLowerCase()))
      .filter(v => v > -1)
      .sort();
    // If voices is undefined or its length is 0, set the voices
    if (!voices?.length) {
      voices = [...Array(4).keys()];
    }

    return { iChord, voices };
  }

  /**
   * Select a chord by 0-based index.
   *
   * @param {number} chord The 0-based index of the chord.
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
    if (delta < 0) selectAfter(-delta);

    setSelection(selection => {
      const newSelection = { ...selection };

      newSelection.iChord = clamp(
        newSelection.iChord - delta,
        0,
        chordCount - 1,
      );

      return newSelection;
    });
  }

  /**
   * Make a selection after the current chord.
   *
   * @param {number} delta The size of the selection shift.
   */
  function selectAfter(delta = 1) {
    if (delta < 0) selectBefore(-delta);

    setSelection(selection => {
      const newSelection = { ...selection };

      newSelection.iChord = clamp(
        newSelection.iChord + delta,
        0,
        chordCount - 1,
      );

      return newSelection;
    });
  }

  /**
   * Returns a selection from string input.
   *
   * @param {string} selectionStr In the format of "`2`1`sa": measure 2, chord 1, soprano and alto voices.
   * @returns {Object | undefined}
   */
  function parseSelection(selectionStr) {
    const args = selectionStr.slice(1).split("`");

    const argsNumbers = args.map(arg => Number(arg));
    const I = decomposeIndex(selection.iChord, chordsPerMeasure);
    const iMeasure = argsNumbers[0] ? argsNumbers[0] - 1 : I[0];
    const imChord = argsNumbers[1] ? argsNumbers[1] - 1 : I[1];
    const newVoices = args[2];

    // Run checks
    // Check that the measure access is valid
    if (iMeasure < 0) {
      return;
    }
    // Check that the chord access is valid
    if (imChord < 0 || imChord >= chordsPerMeasure) return;

    const newChord = composeIndex([iMeasure, imChord], chordsPerMeasure);
    // Check that the chord is within range
    if (newChord > chordCount) return;

    return createSelection(newChord, newVoices);
  }

  function clear(selection) {
    // console.log("Clearing", selection);
    setParts(parts => {
      const newParts = [...parts];

      for (let iVoice = 0; iVoice < 4; iVoice++) {
        newParts[iVoice][selection.iChord] = null;
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
    console.log(`Clearing ${first} ${last}`);
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

    if (newSelection) setSelection(() => newSelection);
  }

  function responseChordal(inputStr) {
    const args = inputStr.slice(1).split("/");

    const pitches = args.map(pitchStr =>
      pitchStr === "%" ? null : Pitch.fromString(pitchStr),
    );

    setParts(parts => {
      const newParts = [...parts];
      pitches.forEach((pitch, i) => {
        // Filter the undefined pitches
        if (pitch === undefined) return;

        const part = newParts[selection.voices[i]];
        if (part) part[selection.iChord] = pitch;
      });

      return newParts;
    });
    selectAfter();
  }

  function responseMelodic(inputStr) {
    const args = inputStr.slice(2).split(" ");
    const voice = "btas".indexOf(inputStr[0]);

    const pitches = args.map(pitchStr =>
      pitchStr === "%" ? null : Pitch.fromString(pitchStr),
    );
    setParts(parts => {
      const newParts = [...parts];

      const startChord = selection.iChord;
      // Iterate the number of pitches, but only up to the last chord
      const iterationCount = clamp(chordCount - startChord, 0, pitches.length);
      for (let iPitch = 0; iPitch < iterationCount; iPitch++) {
        // Filter the undefined pitches
        if (pitches[iPitch] === undefined) continue;
        newParts[voice][startChord + iPitch] = pitches[iPitch];
      }
      // Move the selection the same amount
      selectAfter(iterationCount);

      return newParts;
    });
  }

  function responseKey(inputStr) {
    const keyString = inputStr.slice(1).trim();
    const key = Key.fromString(keyString);

    // Validate pitch
    if (!key?.isValidKey()) {
      console.log(`${keyString} is not a valid key.`);
      return;
    }

    setTonality(() => key);
  }

  function responseTime(inputStr) {
    const args = inputStr.slice(1).split(" ");

    const [upper, lower] = args[0].split("/").map(v => Number(v));

    const newTimeSignature = { beatsPerMeasure: upper, valuePerBeat: lower };
    const newChordsPerMeasure = Number(args[1]) || chordsPerMeasure;

    const newTimeSignatureString = `${upper}/${lower}`;

    // Validate time
    if (!isValidTime(newTimeSignature)) {
      console.log(`${newTimeSignatureString} is not a valid time.`);
      return;
    }

    // Validate resulting duration
    const noteDuration = calculateNoteDuration(
      newTimeSignature,
      newChordsPerMeasure,
    );
    if (!isValidNoteDuration(noteDuration)) {
      console.log(`${noteDuration} is not a valid note duration.`);
      return;
    }

    setTimeSignature(() => newTimeSignature);
    setChordsPerMeasure(() => newChordsPerMeasure);

    select(clamp(selection.iChord, 0, chordCount - 1));
  }

  function responseChordCount(inputStr) {
    const newChordCount = Number(inputStr.slice(1));

    if (!newChordCount) return;

    // Set chord count
    setChordCount(() => newChordCount);

    // Trim or extend the arrays to have so many chords.
    setParts(parts => {
      const newParts = [...parts];

      // Trim if fewer
      if (newChordCount < chordCount) {
        for (let iPart = 0; iPart < 4; iPart++) {
          newParts[iPart] = newParts[iPart].slice(0, newChordCount);
        }
      }
      // Extend if more
      else if (newChordCount > chordCount) {
        for (let iPart = 0; iPart < 4; iPart++) {
          newParts[iPart] = [
            ...newParts[iPart],
            ...Array(newChordCount - newParts[iPart].length).fill(null),
          ];
        }
      }

      return newParts;
    });
    setChordAnalyses(chordAnalyses => {
      // Trim if fewer
      if (newChordCount < chordCount) {
        return chordAnalyses.slice(0, newChordCount);
      }
      // Extend if more
      else if (newChordCount > chordCount) {
        return [
          ...chordAnalyses,
          ...Array(newChordCount - chordAnalyses.length).fill(null),
        ];
      }

      return chordAnalyses;
    });

    select(clamp(selection.iChord, 0, newChordCount - 1));
  }

  function responseMusicParameterShorthand(inputStr) {
    const args = inputStr.slice(1).split(" ");

    // For each, prepend 0 as a throwaway character
    responseKey("0" + args[0]);
    responseTime("0" + `${args[1]} ${args[3] ?? ""}`);
    responseChordCount("0" + args[2]);
  }

  function responseClear(inputStr) {
    const target = inputStr.slice(1);
    console.log(`Clearing target ${target.length}`);

    // Clear selection
    if (target === "%") {
      clear(selection);

      return;
    }

    // Clear chord
    if (target[0] === "`") {
      const targetSelection = parseSelection(target);
      if (targetSelection) clear(targetSelection);

      return;
    }

    // Clear measure
    if (target === "%%%") {
      const firstChord =
        chordsPerMeasure * Math.floor(selection.iChord / chordsPerMeasure);
      const lastChord = firstChord + chordsPerMeasure - 1;

      clearRange(firstChord, lastChord);

      return;
    }

    // Clear score
    if (target === "%%%%%%%") {
      clearRange(0, chordCount - 1);

      return;
    }
  }

  function responseChordAnalyses(inputStr) {
    const args = inputStr.slice(1).split(" ");

    const analyses = args.map(item =>
      item === "%" ? null : ChordAnalysis.fromString(item),
    );
    setChordAnalyses(chordAnalyses => {
      const newChordAnalyses = [...chordAnalyses];

      const startChord = selection.iChord;
      // Iterate the number of pitches, but only up to the last chord
      const iterationCount = clamp(chordCount - startChord, 0, analyses.length);
      for (let iSymbol = 0; iSymbol < iterationCount; iSymbol++) {
        // Filter the undefined pitches
        if (analyses[iSymbol] === undefined) continue;
        newChordAnalyses[startChord + iSymbol] = analyses[iSymbol];
      }
      // Move the selection the same amount
      selectAfter(iterationCount);

      return newChordAnalyses;
    });
  }

  // #endregion

  function handleKeyDown(event) {
    // Submission
    if (event.key === "Enter") {
      submit();

      return;
    }

    // Actions for an empty input field
    if (inputRef.current.value === "") {
      if (event.key === "ArrowLeft") {
        selectBefore();
      } else if (event.key === "ArrowRight") {
        selectAfter();
      }
    }
  }

  function playAudio() {
    pianoPlayer.stop();
    pianoPlayer.playParts(parts, 0.85, 0.85);
  }

  const parameters = {
    parts,
    chordAnalyses,
    tonality,
    timeSignature,
    chordCount,
    chordsPerMeasure,
    selection,
  };

  return (
    <>
      <div className="my-20 flex justify-center">
        <div className="flex w-[48rem] flex-col justify-center gap-1">
          <nav className="flex items-baseline gap-2">
            <Link
              to=""
              className="font-comic text-2xl text-slate-600 no-underline dark:text-slate-400 max-sm:text-2xl"
            >
              <div>Four Part Harmony</div>
            </Link>
            <Link
              to="/tmap/practice"
              className="group h-8 font-comic text-2xl text-slate-400 no-underline dark:text-slate-700 max-sm:text-xl"
            >
              <div className="nav-up">
                {/* <div className="back"> */}
                (Practice)
              </div>
            </Link>
            <div className="self-bottom h-[2px] flex-auto bg-pink-400 dark:bg-pink-600"></div>
            <StopwatchDisplay />
            <div className="self-bottom h-[2px] w-[8px] rounded-tr-full bg-pink-400 dark:bg-pink-600"></div>
          </nav>
          <div className="my-2 rounded-lg border-solid border-orange-200 px-2 py-4 shadow-inner shadow-rose-300 dark:border-orange-300 dark:shadow-amber-800">
            <div className="thin-scrollbar overflow-auto">
              <div>
                {parts[0].length && (
                  <FourPartProgression {...parameters} scaleFactor={1} />
                )}
              </div>
            </div>
          </div>
          <div
            id="baguette-magique"
            className="group relative mb-5 flex gap-0.5"
          >
            <label className="mr-1 font-text text-4xl text-slate-500 group-focus-within:text-slate-700 group-[:has(input:not(:placeholder-shown))]:text-slate-700 dark:text-slate-600 dark:group-focus-within:text-slate-400 dark:group-[:has(input:not(:placeholder-shown))]:text-slate-400">
              &gt;
            </label>
            <input
              ref={inputRef}
              type="text"
              onKeyDown={handleKeyDown}
              onMouseOver={event => event.target.focus()}
              autoFocus
              placeholder=" "
              className="m-0 flex-auto border-0 border-b-2 border-dashed border-slate-500 bg-transparent p-0 px-1 text-end font-mono text-3xl text-slate-600 outline-0 hover:border-orange-400 focus:border-solid focus:border-slate-600 dark:border-slate-600 dark:text-slate-400 dark:hover:border-sky-300 dark:focus:border-slate-400"
            />
            <button
              onClick={submit}
              className="group/submit-button relative bottom-0.5 flex aspect-square cursor-pointer select-none flex-col items-start justify-center border-none bg-transparent"
            >
              <div className="text-3xl leading-none text-slate-600 dark:text-slate-500">
                ↜
              </div>
              <div className="pointer-events-none absolute -bottom-1 font-comic text-[0.60rem] text-slate-600 opacity-0 transition-opacity duration-200 group-hover/submit-button:opacity-100 dark:text-slate-500">
                submit
              </div>
            </button>
          </div>
          <button type="button" onClick={playAudio}>
            <div>play audio</div>
          </button>
          <button type="button" onClick={save}>
            <div>save</div>
          </button>
          <FourPartHarmonyEvaluation
            parts={parts}
            analyses={chordAnalyses}
            tonality={tonality}
          />
        </div>
      </div>
    </>
  );
}
