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
          -12, // E2
          12 - (intervalSize - 1), // A5, but leave room for the upper note of the interval
        ),
        randInt(-1, 1),
      );
      const upperPitch = lowerPitch.scaleTone(intervalSize);
      const intervalQuality = Interval.randomQuality(
        intervalSize,
        upperPitch.accidental,
      );
      upperPitch.accidental += Interval.qualityToAccidental(
        intervalQuality,
        intervalSize,
      );

      const interval = new Interval(intervalQuality, intervalSize);
      const pitches = [lowerPitch, upperPitch];
      const clef =
        pitches[0].octave <= 2 ||
        (pitches[0].octave === 3 && "CD".includes(pitches[0].letter))
          ? "bass"
          : pitches[1].octave >= 5 ||
            (pitches[1].octave === 4 && "B".includes(pitches[1].letter))
          ? "treble"
          : Math.random() < 0.5
          ? "bass"
          : "treble";

      // console.log(pitches.map(pitch => pitch.toString()));
      return { interval, pitches, clef };
    },
    "IntervalReadingSubmit",
    (event, parameters) => {
      const responseStr = event.detail.text;
      if (responseStr.length !== 2) return;

      const { interval, pitches, clef } = parameters;

      const responseIntervalQuality = responseStr[0];
      const responseIntervalSize = Number(responseStr[1]);

      const score =
        0.5 *
        ((responseIntervalQuality === interval.quality) +
          (responseIntervalSize === interval.size));

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
      <div className="my-20 flex flex-col items-center">
        <div className="font-clear mb-20">
          <span className="inline-block min-w-[72px] text-right font-mono text-5xl text-slate-800 dark:text-slate-200">
            {record.score}
          </span>
          <span className="text-sm text-slate-600 dark:text-slate-400">
            {" "}
            of{" "}
          </span>
          <span className="font-mono text-2xl text-slate-700 dark:text-slate-300">
            {record.history.length}
          </span>
          <div>{totalSeconds}</div>
        </div>
        {parameters && (
          <>
            {/* {`${parameters.interval?.toString()} ${parameters.pitches[0]?.toString()} ${parameters.pitches[1]?.toString()} ${parameters.clef}`} */}
            <SingleChord {...parameters} scaleFactor={1.8} />
            <CharByCharField
              length={2}
              doClearOnSubmit={true}
              submitEventType={"IntervalReadingSubmit"}
              style={{ height: "2rem" }}
            />
          </>
        )}
        <div className="flex-auto"></div>
        <div className="mt-20 max-h-40 overflow-y-scroll">
          <table className="relative table-fixed">
            <tbody className="font-mono">
              {record.history.map((item, index) => (
                <tr key={index}>
                  <td className="w-28 text-center">
                    {item.pitches[0].toString()}
                  </td>
                  <td className="w-28 text-center">
                    {item.pitches[1].toString()}
                  </td>
                  <td className="w-28 text-center">{item.answer}</td>
                  <td className="w-28 text-center">{item.response}</td>
                  <td className="w-28 text-center">{item.score}</td>
                </tr>
              ))}
            </tbody>
            <thead className="font-clear sticky top-0">
              <tr>
                <th className="w-28 bg-slate-50 p-0 font-normal dark:bg-slate-900">
                  pitch 1
                </th>
                <th className="w-28 bg-slate-50 p-0 font-normal dark:bg-slate-900">
                  pitch 2
                </th>
                <th className="w-28 bg-slate-50 p-0 font-normal dark:bg-slate-900">
                  answer
                </th>
                <th className="w-28 bg-slate-50 p-0 font-normal dark:bg-slate-900">
                  response
                </th>
                <th className="w-28 bg-slate-50 p-0 font-normal dark:bg-slate-900">
                  score
                </th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </>
  );
}
