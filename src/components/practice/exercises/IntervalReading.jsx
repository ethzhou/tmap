import { createContext, useEffect, useRef, useState } from "react";
import SingleChord from "../../music/SingleChord";
import Pitch from "../../../classes/Pitch";
import { randInt } from "../../../utils/utils";
import Interval from "../../../classes/Interval";
import CharByCharField from "../../general/CharByCharField";

export default function IntervalReading() {
  const [record, setRecord] = useState([]);
  const [cummulativeScore, setCummulativeScore] = useState(0);

  const [interval, setInterval] = useState();
  const [notes, setNotes] = useState();
  const [clef, setClef] = useState();

  const renderCount = useRef(0);

  useEffect(() => {
    createNewExercise();

    document.addEventListener("charbycharfieldenter", handleResponse);

    return () =>
      document.removeEventListener("charbycharfieldenter", handleResponse);
  }, []);

  useEffect(() => {
    renderCount.current++;
  }, [interval, notes, clef, record]);

  function createNewExercise () {
    console.log("wow!", interval, renderCount.current);
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
    const newClef = (newNotes[0].octave <= 2
      || (newNotes[0].octave === 3 && "CD".includes(newNotes[0].letter))) ? "bass"
    : (newNotes[1].octave >= 5
      || (newNotes[1].octave === 4 && "B".includes(newNotes[1].letter))) ? "treble"
    : (Math.random() < .5) ? "bass" : "treble";

    console.log(newNotes.map(note => note.toString()), newIntervalQuality + newIntervalSize);
    
    setInterval(() => new Interval(newIntervalQuality, newIntervalSize));
    console.log("wow!!", interval, renderCount.current);
    setNotes(() => newNotes);
    setClef(() => newClef);
  }

  // function handleResponse(responseStr, interval, notes) {
  function handleResponse(event) {
    console.log("entered handleResponse function");
    console.log(interval);
    // if (!interval) return;
    // if (!notes) return;
    
    const responseStr = event.detail.text;
    console.assert(responseStr.length === 2);
    console.log("passed handleResponse assert");

    const responseIntervalQuality = responseStr[0];
    const responseIntervalSize = parseInt(responseStr[1]);

    console.log("response", responseIntervalQuality, responseIntervalSize);
    console.log("answer  ", interval.quality, interval.size);

    const score = .5 * (
      responseIntervalQuality === interval.quality
        + responseIntervalSize === interval.size
    );

    console.log("notes", notes);
    setRecord(record => [...record, {
      notes: [...notes],
      answer: interval.toString(),
      response: responseStr,
      score: score,
    }]);
    
    createNewExercise();
  }

  return (
    <>
      <p>asjdlfkasd</p>
      {interval?.toString()}
      {notes && <SingleChord clef={clef} notes={notes} />}
      {notes && notes.map(item => item.toString() + " ")}
      <CharByCharField length={2} />
      {record.map((item, index) => 
        <p key={index}>
          {item.notes[0].toString()} {item.notes[1].toString()} {item.answer} {item.response} {item.score}
        </p>
      )}
    </>
  );
}