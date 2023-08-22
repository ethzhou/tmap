import { useEffect, useRef } from "react";
import useExercise from "../../../hooks/useExercise";
import PianoPlayer from "../../../classes/PianoPlayer";
import Pitch from "../../../classes/Pitch";
import Interval from "../../../classes/Interval";
import { randInt } from "../../../utils/utils";
import CharByCharField from "../../general/CharByCharField";

const pianoPlayer = new PianoPlayer();

export default function IntervalDictation() {
  const playAudio = useRef(() => {
    console.log("Playback not yet setup");
  });
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

      console.log(notes.map(note => note.toString()));
      playAudio.current = () => {
        pianoPlayer.stop();
        pianoPlayer.playNotes(notes, 2, .5);
      };
      playAudio.current();

      return { interval, notes };
    },
    "IntervalDictationSubmit",
    (event, parameters) => {
      const responseStr = event.detail.text;
      if (responseStr.length !== 2) {
        playAudio.current();
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
        answer: `${interval.toString()}; varies`,
        interval: interval,
        notes: [...notes],
      };
    },
  );

  return (
    <>
      <div>{`${record.score} of ${record.history.length}; ${totalSeconds}`}</div>
      {parameters && (
        <>
          {`${parameters.interval?.toString()} ${parameters.notes[0]?.toString()} ${parameters.notes[1]?.toString()} ${parameters.clef}`}<br />
          <button type="button" onClick={playAudio.current}>play audio</button>
          <CharByCharField length={2} doClearOnSubmit={true} submitEventType={"IntervalDictationSubmit"} />
        </>
      )}
      {record.history.map((item, index) => 
        <p key={index}>
          {item.notes[0].toString()} {item.notes[1].toString()} {item.answer} {item.response} {item.score}
        </p>
      )}
    </>
  )
}