import { useEffect, useState } from "react";
import SingleChord from "../../music/SingleChord";
import Pitch from "../../../classes/Pitch";
import { randInt } from "../../../utils/utils";
import Interval from "../../../classes/Interval";

export default function IntervalReading() {
  const [answerRecord, setAnswerRecord] = useState([]);

  const [intervalSize, setIntervalSize] = useState();
  const [intervalQuality, setIntervalQuality] = useState();

  const [notes, setNotes] = useState([]);
  const [clef, setClef] = useState();

  const [inputValue, setInputValue] = useState(() => createNewExercise());

  const handleInput = event => setInputValue(() => event.target.value);

  useEffect(() => {
    createNewExercise();
  }, []);

  function createNewExercise () {
    const newIntervalSize = randInt(1, 8);
    const newLowerNote = Pitch.fromInt(
      randInt(
        -12,  // E2
        12 - (newIntervalSize - 1)  // A5, but leave room for the upper note of the interval
      ),
      randInt(-1,1)
    );
    const newUpperNote = newLowerNote.scaleTone(newIntervalSize);
    const newIntervalQuality = Interval.randomQuality(newIntervalSize, newUpperNote.accidental);
    newUpperNote.accidental += Interval.qualityToAccidentalChange(newIntervalQuality, newIntervalSize);
    const newNotes = [newLowerNote, newUpperNote];

    console.log(newNotes.map(note => note.toString()), newIntervalQuality + newIntervalSize);
    
    setIntervalSize(() => newIntervalSize);
    setIntervalQuality(() => newIntervalQuality);

    setNotes(() => newNotes);
    setClef(() =>
      (newNotes[0].octave <= 2
        || (newNotes[0].octave === 3 && "CD".includes(newNotes[0].letter))) ? "bass"
      : (newNotes[1].octave >= 5
        || (newNotes[1].octave === 4 && "B".includes(newNotes[1].letter))) ? "treble"
      : (Math.random() < .5) ? "bass" : "treble"
    );

    return "";
  }

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