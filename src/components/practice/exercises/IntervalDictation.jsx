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
      const lowerNote = Pitch.fromInt(
        randInt(
          -12,  // E2
          12 - (intervalSize - 1)  // A5, but leave room for the upper note of the interval
        ),
        randInt(-1,1)
      );
      const upperNote = lowerNote.scaleTone(intervalSize);
      const intervalQuality = Interval.randomQuality(intervalSize, upperNote.accidental);
      upperNote.accidental += Interval.qualityToAccidental(intervalQuality, intervalSize);

      const interval = new Interval(intervalQuality, intervalSize);
      const notes = [lowerNote, upperNote];

      console.log(notes.map(note => note.toString()));

      return { interval, notes };
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

      const { interval, notes } = parameters;
  
      const responseIntervalQuality = responseStr[0];
      const responseIntervalSize = Number(responseStr[1]);

      const responseInterval = new Interval(responseIntervalQuality, responseIntervalSize);
  
      const score = +responseInterval.isEnharmonicTo(interval);  // Maybe Number(...) is better here...

      return {
        score: score,
        response: responseStr,
        answer: `${interval.toString()}`,
        interval: interval,
        notes: [...notes],
      };
    },
  );
  const [playType, setPlayType] = useState(() => "melodic");
  const playAudio = useCallback(() => {
    if (!parameters) return;
    pianoPlayer.stop();
    pianoPlayer.playNotes(parameters.notes, 4, playType === "harmonic" ? 0 : .5);
  }, [parameters, playType]);

  useEffect(() => {
    playAudio();
  }, [playAudio]);

  return (
    <>
      <div>{`${record.score} of ${record.history.length}; ${totalSeconds}`}</div>
      {parameters && (
        <>
          {/* {`${parameters.interval?.toString()} ${parameters.notes[0]?.toString()} ${parameters.notes[1]?.toString()}`}<br /> */}
          <button type="button" onClick={playAudio}>play audio</button>
          <button type="button" 
            onClick={() => setPlayType(nextPlayType)}
          >
            use {playType === "harmonic" ? "melodic" : "harmonic"} intervals
          </button>
          <CharByCharField length={2} doClearOnSubmit={true} submitEventType={"IntervalDictationSubmit"} />
        </>
      )}
      {record.history.toReversed().map((item, index) => 
        <p key={index}>
          {item.notes[0].toString()} {item.notes[1].toString()} {item.answer} {item.response} {item.score}
        </p>
      )}
    </>
  )
}