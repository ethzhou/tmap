import { useEffect, useRef, useState } from "react";
import Pitch from "../../classes/Pitch";
import EdiText from "react-editext";
import {
  REGEXP_Pitch,
  REGEXP_TextPitch,
  pitchTextToString,
} from "../../utils/musicUtils";
import Key from "../../classes/Key";
import PianoButton from "./PianoButton";

export default function ModeInteractive({
  constantKeySignature = true,
  playbackSpacing = 0.4,
}) {
  const inputRef = useRef();

  const [basePitch, setBasePitch] = useState(new Pitch("C", 0, 4));

  const [iActiveNote, setIActiveNote] = useState();
  const timeout = useRef();

  const baseNoteName = basePitch?.toName();
  const baseNoteTextName = basePitch?.toTextName();

  const scale = basePitch?.scale();

  const displayedPitches = constantKeySignature
    ? scale
    : Array(7).fill(basePitch);

  function validateInput(value) {
    if (!value.match(REGEXP_Pitch)) return;

    const pitchString = pitchTextToString(`${value}4`);
    const key = Key.fromPitch(Pitch.fromString(pitchString));

    if (!key.isValidKey()) return;

    return true;
  }

  function handleSave(value) {
    const pitchString = pitchTextToString(`${value}4`);
    setBasePitch(basePitch => Pitch.fromString(pitchString));
  }

  // #region Active note cycle

  function cycleActiveNote(n) {
    if (n === 0) {
      setIActiveNote(iActiveNote => undefined);
      return;
    }

    setIActiveNote(iActiveNote => (iActiveNote + 1) % 7);

    timeout.current = setTimeout(
      () => cycleActiveNote(n - 1),
      playbackSpacing * 1000,
    );
  }

  function startActiveNoteCycle(iStart) {
    // Stop any existing cycling
    clearTimeout(timeout.current);

    // Set the initial active note
    // Start one less than supposed, since the cycle instantly increments
    setIActiveNote(iPlayingNote => iStart - 1);

    cycleActiveNote(8);
  }

  // #endregion

  return (
    <>
      <div className="grid grid-flow-col grid-rows-[repeat(7,1.5rem)] items-baseline justify-center justify-items-start gap-x-8 gap-y-2">
        <div className="absolute left-0 top-0 border-none bg-transparent p-0 text-lg text-inherit hover:bg-transparent"></div>
        <div
          className={`${
            constantKeySignature && iActiveNote === 0 ? "-active-note" : ""
          }`}
        >
          <EdiText
            renderValue={() => baseNoteTextName}
            value={baseNoteName}
            validation={validateInput}
            validationMessage={"Try another note."}
            onSave={handleSave}
            inputProps={{ ref: inputRef }}
            viewProps={{ className: "cursor-pointer" }}
            buttonsAlign="before"
            // editButtonContent={
            //   <span className="font-straight text-sm lowercase text-inherit">
            //     Change
            //   </span>
            // }
            startEditingOnEnter
            editOnViewClick
            submitOnEnter
            submitOnUnfocus
            cancelOnEscape
            tabIndex={0}
          />
        </div>
        {displayedPitches.slice(1, 7).map((displayedPitch, i) => (
          <div
            key={crypto.randomUUID()}
            className={`${
              constantKeySignature && iActiveNote === i + 1
                ? "-active-note "
                : ""
            }w-6`}
          >
            {displayedPitch.toTextName()}
          </div>
        ))}
        <div>Ionian</div>
        <div>Dorian</div>
        <div>Phrygian</div>
        <div>Lydian</div>
        <div>Mixolydian</div>
        <div>Aeolian</div>
        <div>Locrian</div>
        {scale.slice(0, 7).map((_, i) => (
          <PianoButton
            key={crypto.randomUUID()}
            onClick={() => startActiveNoteCycle(i)}
            pitches={displayedPitches[i]
              .scale(i)
              .map(pitch => pitch.toString())}
            spacing={playbackSpacing}
          />
        ))}
      </div>
    </>
  );
}
