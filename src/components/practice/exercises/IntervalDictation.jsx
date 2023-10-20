import { useCallback, useEffect, useState } from "react";
import useExercise from "../../../hooks/useExercise";
import PianoPlayer from "../../../classes/PianoPlayer";
import Pitch from "../../../classes/Pitch";
import Interval from "../../../classes/Interval";
import { randInt } from "../../../utils/utils";
import CharByCharField from "../../general/CharByCharField";
import IntervalExercise from "./IntervalExercise";

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
    <IntervalExercise
      record={record}
      totalSeconds={totalSeconds}
      exerciseContent={
        parameters && (
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
        )
      }
    />
  );
}
