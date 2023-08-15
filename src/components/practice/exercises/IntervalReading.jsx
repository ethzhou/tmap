import { useState } from "react";
import SingleChord from "../../music/SingleChord";
import Pitch, { Accidentals } from "../../../classes/Pitch";

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randNoteAccidental(integer) {
  return Pitch.fromInt(
    integer,
    [Accidentals.FLAT, Accidentals.NATURAL, Accidentals.SHARP][randInt(0,2)]
  );
}

export default function IntervalReading() {
  const [answerRecord, setAnswerRecord] = useState([]);

  const [intervalSize, setIntervalSize] = useState(() => randInt(1, 8));
  const [notes, setNotes] = useState(() => {
    const lowerNoteInteger = randInt(
      -11,  // F2
      12 - (intervalSize - 1)  // A5, but leave room for the upper note of the interval
    );
    const lowerNote = randNoteAccidental(lowerNoteInteger);
    const upperNote = randNoteAccidental(lowerNoteInteger + intervalSize - 1);
    
    return [lowerNote, upperNote];
  });
  const [clef, setClef] = useState(() => (notes[0].octave <= 2 
      || (notes[1].octave === 3 && "CDE".indexOf(notes[1].letter) > -1)) ? "bass" 
    : (notes[1].octave >= 5
      || (notes[0].octave === 4 && "B".indexOf(notes[0].letter) > -1)) ? "treble"
    : (Math.random() < .5) ? "bass" : "treble"
  );

  const [inputValue, setInputValue] = useState("");

  const handleInput = event => setInputValue(() => event.target.value);

  return (
    <>
      <p>asjdlfkasd</p>
      <SingleChord clef={clef} notes={notes} />
      <input type="text" onChange={handleInput} />
      <button>check</button>
      {inputValue}
    </>
  );
}