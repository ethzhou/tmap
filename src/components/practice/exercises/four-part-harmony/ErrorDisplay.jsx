import { useContext } from "react";
import { FOUR_VOICES } from "../../../../utils/musicUtils";
import { capitalize, decomposeIndex } from "../../../../utils/utils";
import { FPHContext } from "./FourPartHarmony";

export default function ErrorDisplay({ progressionError }) {
  const errorData = errorTable[progressionError.type];

  const { chordsPerMeasure } = useContext(FPHContext);

  return (
    <div
      tabIndex={0}
      className="group relative cursor-pointer border-[1px] border-solid border-red-400 bg-rose-100 p-6 text-slate-700 shadow-md shadow-red-300 outline-0 transition-colors duration-300 last:rounded-b-md hover:border-violet-400 hover:bg-fuchsia-100 hover:shadow-violet-300 focus:border-sky-400 focus:bg-indigo-100 focus:shadow-sky-300 dark:border-red-500 dark:bg-rose-800 dark:text-slate-300 dark:shadow-red-800 dark:hover:border-violet-500 dark:hover:bg-fuchsia-800 dark:hover:shadow-violet-800  dark:focus:border-sky-500 dark:focus:bg-indigo-800 dark:focus:shadow-sky-800"
    >
      <span className="absolute right-4 top-6 align-baseline font-mono text-red-300 group-hover:text-violet-300 group-focus:text-sky-300 dark:text-rose-500 dark:group-hover:text-violet-500 dark:group-focus:text-indigo-500">
        {errorData.type}
      </span>
      <span className="font-mono text-sm">At</span>
      <div className="mb-2">
        {progressionError.concerns.map((concern, i) => {
          const [iMeasure, imChord] = decomposeIndex(
            concern.i + 1,
            chordsPerMeasure,
            true,
          );

          return (
            <div
              key={i}
              className="error-container relative left-4 font-mono text-sm"
            >
              `{iMeasure}`{imChord}`
              {concern.voices.map(voice => (voice === -1 ? "" : "btas"[voice]))}{" "}
              (chord {concern.i + 1} :{" "}
              {concern.voices
                .map(iVoice => FOUR_VOICES[iVoice]?.toLowerCase() ?? "analysis")
                .join(", ")}
              )
            </div>
          );
        })}
      </div>
      <span className="text-md font-text">
        {capitalize(errorData.message)}.
      </span>
    </div>
  );
}

const errorTable = {
  // Spelling
  "voice-out-of-range": {
    type: "voice-out-of-range",
    message: "the voice is not in its range",
  },
  "upper-spacing": {
    type: "upper-spacing",
    message: "consecutive upper voices are more than an octave apart",
  },
  "crossed-voices": {
    type: "crossed-voices",
    message: "the voices cross",
  },
  "miscased-roman": {
    type: "miscased-roman",
    message: "the roman numeral is of the wrong mode",
  },
  "invalid-arabic": {
    type: "invalid-arabic",
    message: "the arabic numerals are invalid",
  },
  "non-chordal-tone": {
    type: "non-chordal-tone",
    message: "the tone is non chordal",
  },
  "bass-mismatch": {
    type: "bass-mismatch",
    message: "the bass does not match the analysis",
  },
  "missing-root": {
    type: "missing-root",
    message: "the root is missing",
  },
  "missing-third": {
    type: "missing-third",
    message: "the third is missing",
  },
  "non-root-missing-fifth": {
    type: "non-root-missing-fifth",
    message: "the fifth is omitted in a chord not in root position",
  },
  "missing-seventh": {
    type: "missing-seventh",
    message: "the seventh is missing",
  },
  "double-leading": {
    type: "double-leading",
    message: "there are two leading tones",
  },
  "double-seventh": {
    type: "double-seventh",
    message: "the seventh is doubled",
  },
  "64-not-double-fifth": {
    type: "64-not-double-fifth",
    message: "the fifth is not doubled in a 6/4 chord",
  },
  // Progression
  "begin-not-tonic": {
    type: "begin-not-tonic",
    message: "the progression does not begin with a tonic chord",
  },
  "end-not-tonic": {
    type: "end-not-tonic",
    message: "the progression does not end on a tonic chord",
  },
  "v-iv": {
    type: "v-iv",
    message: "the IV chord resolves to a V chord",
  },
  "bad-64": {
    type: "bad-64",
    message: "the 6/4 chord is not a cadential, passing, nor neighbor 6/4",
  },
  "bad-cadence": {
    type: "bad-cadence",
    message: "the cadence is invalid",
  },
  // Leading
  "common-not-held": {
    type: "common-not-held",
    message: "the common tone is not held",
  },
  "voice-leap": {
    type: "voice-leap",
    message: "the voice leaps",
  },
  "parallel-fifths": {
    type: "parallel-fifths",
    message: "there are parallel fifths",
  },
  "parallel-octaves": {
    type: "parallel-octaves",
    message: "there are parallel octaves",
  },
  "d5-P5-not-upper": {
    type: "d5-P5-not-upper",
    message: "the d5 to P5 is not within the upper voices",
  },
  "d5-P5-not-passing": {
    type: "d5-P5-not-passing",
    message:
      "the d5 to P5 is ascending but not passing between an I chord and an I6 chord",
  },
  "hidden-fifth-soprano-not-step": {
    type: "hidden-fifth-soprano-not-step",
    message: "the soprano is not moving stepwise at the hidden fifth",
  },
  "hidden-octave-soprano-not-step": {
    type: "hidden-octave-soprano-not-step",
    message: "the soprano is not moving stepwise at the hidden octave",
  },
  "overlapping-voices": {
    type: "overlapping-voices",
    message: "the voices overlap",
  },
  "unresolved-seventh": {
    type: "unresolved-seventh",
    message: "the seventh is unresolved",
  },
  "augmented-second-leap": {
    type: "augmented-second-leap",
    message: "the voice leaps an augmented second",
  },
  "tritone-leap": {
    type: "tritone-leap",
    message: "the voice leaps a tritone",
  },
};
