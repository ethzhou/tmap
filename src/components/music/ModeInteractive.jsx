import React, { useEffect, useRef, useState } from "react";
import Pitch from "../../classes/Pitch";
import EdiText from "react-editext";
import {
  DIATONIC_MODES,
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
    ? scale.slice(0, 7)
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
      <div className="grid grid-cols-[repeat(3,auto)] grid-rows-[repeat(7,1.5rem)] items-center justify-center justify-items-start gap-x-8 gap-y-2">
        {displayedPitches.map((displayedPitch, i) => (
          <React.Fragment key={crypto.randomUUID()}>
            {i === 0 ? (
              <div
                className={`${
                  constantKeySignature && iActiveNote === 0
                    ? "-active-note"
                    : ""
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
            ) : (
              <div
                className={`${
                  constantKeySignature && iActiveNote === i
                    ? "-active-note "
                    : ""
                }w-6`}
              >
                {displayedPitch.toTextName()}
              </div>
            )}
            <div>{DIATONIC_MODES[i]}</div>
            <PianoButton
              onClick={() => startActiveNoteCycle(i)}
              pitches={displayedPitches[i]
                .scale(i)
                .map(pitch => pitch.toString())}
              spacing={playbackSpacing}
            />
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
