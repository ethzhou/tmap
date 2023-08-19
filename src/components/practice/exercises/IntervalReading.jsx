import { useEffect, useState } from "react";
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

  const [handleResponse, setHandleResponse] = useState();

  useEffect(() => {
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

    const newInterval = new Interval(newIntervalQuality, newIntervalSize);
    const newNotes = [newLowerNote, newUpperNote];
    const newClef = (newNotes[0].octave <= 2
      || (newNotes[0].octave === 3 && "CD".includes(newNotes[0].letter))) ? "bass"
    : (newNotes[1].octave >= 5
      || (newNotes[1].octave === 4 && "B".includes(newNotes[1].letter))) ? "treble"
    : (Math.random() < .5) ? "bass" : "treble";

    // console.log(newNotes.map(note => note.toString()), newIntervalQuality + newIntervalSize);
    
    setInterval(_ => newInterval);
    setNotes(_ => newNotes);
    setClef(_ => newClef);
    
  }, [record]);

  // Create a new response submit handler
  useEffect(() => {
    document.removeEventListener("charbycharfieldenter", handleResponse);
    (interval && notes && clef) &&
      setHandleResponse(() => (event) => {

        const responseStr = event.detail.text;
        if (responseStr.length !== 2) return;
    
        const responseIntervalQuality = responseStr[0];
        const responseIntervalSize = Number(responseStr[1]);
    
        const score = .5 * (
          (responseIntervalQuality === interval.quality)
            + (responseIntervalSize === interval.size)
        );
        setCummulativeScore(cummulativeScore => cummulativeScore + score);
        setRecord(record => [...record, {
          notes: [...notes],
          answer: interval.toString(),
          response: responseStr,
          score: score,
        }]);
    });
  }, [interval, notes, clef]);

  useEffect(() => {
    document.addEventListener("charbycharfieldenter", handleResponse);

    // return () =>
    //   document.removeEventListener("charbycharfieldenter", handleResponse);
  }, [handleResponse]);


  return (
    <>
      <div>{`${cummulativeScore ?? 0}`}</div>
      {interval && (
        <>
          {`${interval?.toString()} ${notes[0]?.toString()} ${notes[1]?.toString()} ${clef}`}
          <SingleChord clef={clef} notes={notes} />
          <CharByCharField length={2} doClearOnEnter={true} />
        </>
      )}
      {record.map((item, index) => 
        <p key={index}>
          {item.notes[0].toString()} {item.notes[1].toString()} {item.answer} {item.response} {item.score}
        </p>
      )}
    </>
  );
}