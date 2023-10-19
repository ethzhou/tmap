import { useCallback, useEffect, useState } from "react";
import useExercise from "../../../hooks/useExercise";
import PianoPlayer from "../../../classes/PianoPlayer";
import Pitch from "../../../classes/Pitch";
import Interval from "../../../classes/Interval";
import { randInt } from "../../../utils/utils";
import CharByCharField from "../../general/CharByCharField";

const pianoPlayer = new PianoPlayer();

function nextPlayType(playType) {
  return playType === "harmonic" ? "melodic" : "harmonic";
}

export default function IntervalDictation() {
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

      console.log(pitches.map(pitch => pitch.toString()));

      return { interval, pitches };
    },
    "IntervalDictationSubmit",
    (event, parameters) => {
      const responseStr = event.detail.text;
      if (responseStr.length !== 2) {
        if (event.detail.keyDownEvent.shiftKey) {
          setPlayType(nextPlayType);
          return;
        }
        playAudio();
        return;
      }

      const { interval, pitches } = parameters;

      const responseIntervalQuality = responseStr[0];
      const responseIntervalSize = Number(responseStr[1]);

      const responseInterval = new Interval(
        responseIntervalQuality,
        responseIntervalSize,
      );

      const score = +responseInterval.isEnharmonicTo(interval); // Maybe Number(...) is better here...

      return {
        score: score,
        response: responseStr,
        answer: `${interval.toString()}`,
        interval: interval,
        pitches: [...pitches],
      };
    },
  );
  const [playType, setPlayType] = useState(() => "melodic");
  const playAudio = useCallback(() => {
    if (!parameters) return;
    pianoPlayer.stop();
    pianoPlayer.playNotes(
      parameters.pitches,
      4,
      playType === "harmonic" ? 0 : 0.5,
    );
  }, [parameters, playType]);

  useEffect(() => {
    playAudio();
  }, [playAudio]);

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
            {/* {`${parameters.interval?.toString()} ${parameters.pitches[0]?.toString()} ${parameters.pitches[1]?.toString()}`}<br /> */}
            <button type="button" onClick={playAudio}>
              play audio
            </button>
            <button type="button" onClick={() => setPlayType(nextPlayType)}>
              use {playType === "harmonic" ? "melodic" : "harmonic"} intervals
            </button>
            <CharByCharField
              length={2}
              doClearOnSubmit={true}
              submitEventType={"IntervalDictationSubmit"}
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
