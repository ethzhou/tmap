import useExercise from "../../../hooks/useExercise";
import SingleChord from "../../music/SingleChord";
import Pitch from "../../../classes/Pitch";
import { randInt } from "../../../utils/utils";
import Interval from "../../../classes/Interval";
import CharByCharField from "../../general/CharByCharField";

export default function IntervalReading() {
  const { parameters, totalSeconds, record } = useExercise(
    () => {
      const intervalSize = randInt(1, 8);
      const lowerNote = Pitch.fromInt(
        randInt(
          -12,  // E2
          12 - (intervalSize - 1)  // A5, but leave room for the upper note of the interval
        ),
        randInt(-1,1)
      );
      const upperNote = lowerNote.scaleTone(intervalSize);
      const intervalQuality = Interval.randomQuality(intervalSize, upperNote.accidental);
      upperNote.accidental += Interval.qualityToAccidentalChange(intervalQuality, intervalSize);

      const interval = new Interval(intervalQuality, intervalSize);
      const notes = [lowerNote, upperNote];
      const clef = (notes[0].octave <= 2
        || (notes[0].octave === 3 && "CD".includes(notes[0].letter))) ? "bass"
      : (notes[1].octave >= 5
        || (notes[1].octave === 4 && "B".includes(notes[1].letter))) ? "treble"
      : (Math.random() < .5) ? "bass" : "treble";

      return { interval, notes, clef };
    },
    "IntervalReadingSubmit",
    (event, parameters) => {
      const responseStr = event.detail.text;
      if (responseStr.length !== 2) return;

      const { interval, notes, clef } = parameters;
  
      const responseIntervalQuality = responseStr[0];
      const responseIntervalSize = Number(responseStr[1]);
  
      const score = .5 * (
        (responseIntervalQuality === interval.quality)
          + (responseIntervalSize === interval.size)
      );

      return {
        score: score,
        response: responseStr,
        answer: interval.toString(),
        interval: interval,
        notes: [...notes],
        clef: clef,
      };
    },
  );

  return (
    <>
      <div>{`${record.score} of ${record.history.length}; ${totalSeconds}`}</div>
      {parameters && (
        <>
          {`${parameters.interval?.toString()} ${parameters.notes[0]?.toString()} ${parameters.notes[1]?.toString()} ${parameters.clef}`}
          <SingleChord clef={parameters.clef} notes={parameters.notes} />
          <CharByCharField length={2} doClearOnSubmit={true} submitEventType={"IntervalReadingSubmit"} />
        </>
      )}
      {record.history.map((item, index) => 
        <p key={index}>
          {item.notes[0].toString()} {item.notes[1].toString()} {item.answer} {item.response} {item.score}
        </p>
      )}
    </>
  );
}