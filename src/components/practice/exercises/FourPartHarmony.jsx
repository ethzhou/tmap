import { useEffect, useRef, useState } from "react";
import Pitch from "../../../classes/Pitch";
import FourPartProgression from "../../music/FourPartProgression";
import { randInt } from "../../../utils/utils";

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

  const [sopranoPart, setSopranoPart] = useState([]);
  const [altoPart, setAltoPart] = useState([]);
  const [tenorPart, setTenorPart] = useState([]);
  const [bassPart, setBassPart] = useState([]);

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
  }, []);

  function generateParameters() {
    const beatsPerMeasure = [2, 4, 8][randInt(0, 1)];
    const valuePerBeat = 2 ** [randInt(1, 3)];
    const timeSignature = `${beatsPerMeasure}/${valuePerBeat}`;

    const chordCount = 2 * randInt(2, 6) + 1;
    const chordsPerMeasure = [2, 4, 8][randInt(0, 1)];

    setSopranoPart(() => Array(chordCount).fill(null));  // null represents a rest
    setAltoPart(() => Array(chordCount).fill(null));
    setTenorPart(() => Array(chordCount).fill(null));
    setBassPart(() => Array(chordCount).fill(null));

    setTimeSignature(() => timeSignature);
    setChordCount(() => chordCount);
    setChordsPerMeasure(() => chordsPerMeasure);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      parseInput(inputRef.current.value);
      inputRef.current.value = "";
    }
  };

  /**
   * Handles input.
   * 
   * @param {string} inputStr
   */
  function parseInput(inputStr) {
    // Navigation
    if (inputStr[0] === "'") {
      const newSelection = { };
      [newSelection.measure, newSelection.chord] = inputStr.slice(1).split(" ").map(n => Number(n));
      
      // Run checks
      // Check that measure and chord are numbers
      if (!newSelection.measure || !newSelection.chord)
        return;
      // Check that there is the indicated chord of the measure
      if (newSelection.chord > chordsPerMeasure)
        return;
      // Check that the chord is within range
      if (chordsPerMeasure * (newSelection.measure - 1) + (newSelection.chord) > chordCount)
        return;

      newSelection.voices = [...Array(4).keys()];
      
      setSelection(() => {
        console.log(newSelection);
        return newSelection;
      });
    }
  }

  const parts = {
    soprano: sopranoPart,
    alto: altoPart,
    tenor: tenorPart,
    bass: bassPart
  };

  return (
    <>
      {
        chordCount
        &&
        <FourPartProgression
          parts={testParts}
          keySignature={keySignature}
          timeSignature={timeSignature}
          chordCount={chordCount}
          chordsPerMeasure={chordsPerMeasure}
          selection={selection}
        />
      }
      <input ref={inputRef} type="text" onKeyDown={handleKeyDown} />
    </>
  )
}