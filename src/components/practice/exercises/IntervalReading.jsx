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
      const lowerPitch = Pitch.fromInt(
        randInt(
          -12,  // E2
          12 - (intervalSize - 1)  // A5, but leave room for the upper note of the interval
        ),
        randInt(-1,1)
      );
      const upperPitch = lowerPitch.scaleTone(intervalSize);
      const intervalQuality = Interval.randomQuality(intervalSize, upperPitch.accidental);
      upperPitch.accidental += Interval.qualityToAccidentalChange(intervalQuality, intervalSize);

      const interval = new Interval(intervalQuality, intervalSize);
      const pitches = [lowerPitch, upperPitch];
      const clef = (pitches[0].octave <= 2
        || (pitches[0].octave === 3 && "CD".includes(pitches[0].letter))) ? "bass"
      : (pitches[1].octave >= 5
        || (pitches[1].octave === 4 && "B".includes(pitches[1].letter))) ? "treble"
      : (Math.random() < .5) ? "bass" : "treble";

      console.log(pitches.map(pitch => pitch.toString()));
      return { interval, pitches, clef };
    },
    "IntervalReadingSubmit",
    (event, parameters) => {
      const responseStr = event.detail.text;
      if (responseStr.length !== 2) return;

      const { interval, pitches, clef } = parameters;
  
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
        pitches: [...pitches],
        clef: clef,
      };
    },
  );

  return (
    <>
      <div>{`${record.score} of ${record.history.length}; ${totalSeconds}`}</div>
      {parameters && (
        <>
          {`${parameters.interval?.toString()} ${parameters.pitches[0]?.toString()} ${parameters.pitches[1]?.toString()} ${parameters.clef}`}
          <SingleChord clef={parameters.clef} pitches={parameters.pitches} />
          <CharByCharField length={2} doClearOnSubmit={true} submitEventType={"IntervalReadingSubmit"} />
        </>
      )}
      {record.history.toReversed().map((item, index) => 
        <p key={index}>
          {item.pitches[0].toString()} {item.pitches[1].toString()} {item.answer} {item.response} {item.score}
        </p>
      )}
    </>
  );
}