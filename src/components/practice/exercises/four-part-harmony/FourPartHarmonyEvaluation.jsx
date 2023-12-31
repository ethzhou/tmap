import ChordAnalysis from "../../../../classes/ChordAnalysis";
import Key from "../../../../classes/Key";
import Pitch from "../../../../classes/Pitch";
import {
  MAJOR_ROMAN,
  MINOR_ROMAN,
  VOICE_RANGES,
} from "../../../../utils/musicUtils";
import ProgressionError from "../../../../classes/ProgressionError";
import Interval from "../../../../classes/Interval";
import ErrorDisplay from "./ErrorDisplay";

/**
 * @callback EvaluationFunction
 * @param {Array<Pitch>} chords
 * @param {Array<Array<Array<Interval | null>>>} intervals
 * @param {Array<ChordAnalysis>} analyses
 * @param {Key} tonality
 * @param {Array<Pitch>} triads
 * @param {Array<Map<string, Array<number>>>} charts
 * @returns {Array<ProgressionError>}
 */

/**
 * @param {Object} props
 * @param {Object} parts
 * @returns
 */
export default function FourPartHarmonyEvaluation({
  parts,
  analyses,
  tonality,
  sort,
}) {
  // #region Create parameter arrays

  /**
   * Array of provided chords, each in BTAS order.
   * @type {Array<Array<Pitch | Null>>}
   */
  const chords = parts[0].map((_, i) => parts.map(part => part[i]));

  /**
   * Array of triads. The seventh is included in a given triad if the matching analysis indicates a seventh chord.
   * @type {Array<Array<Pitch>>}
   */
  const triads = analyses.map(analysis =>
    analysis
      ? tonality.triad(
          analysis.roman,
          analysis.isSeventh(),
          analysis.accidental,
          true,
        )
      : null,
  );

  /**
   * Array of the occurances of pitches in a chord keeping track of the voices using each pitch name.
   * For example, [{ "F": [0, 3], "C": [1], "A": [2] }].
   * @type {Array<Map<string, Array<number>>>}
   */
  const charts = [];
  triads.forEach((triad, i) => {
    const counts = new Map();
    charts.push(counts);

    chords[i].forEach((pitch, iVoice) => {
      if (!pitch) return;

      const pitchName = pitch.toName();
      if (!counts.has(pitchName)) {
        counts.set(pitchName, []);
      }

      counts.get(pitchName).push(iVoice);
    });
  });

  /**
   * Array of the intervals between each voice and the higher voices of a chord.
   * @type {Array<Array<Array<Interval | null>>>}
   */
  const intervals = [];
  for (let i = 0; i < chords.length; i++) {
    const chordIntervals = [];
    for (let iVoice1 = 0; iVoice1 < 4; iVoice1++) {
      const intervalsFromVoice = [];
      for (let iVoice2 = iVoice1 + 1; iVoice2 < 4; iVoice2++) {
        const interval =
          chords[i][iVoice1] && chords[i][iVoice2]
            ? chords[i][iVoice1].interval(chords[i][iVoice2])
            : null;

        intervalsFromVoice.push(interval);
      }

      chordIntervals.push(intervalsFromVoice);
    }

    intervals.push(chordIntervals);
  }

  // #endregion

  const errors = [];
  evaluations.forEach(evaluation =>
    errors.push(
      ...evaluation(chords, intervals, analyses, tonality, triads, charts),
    ),
  );

  errors.sort(sortings[sort]);

  return (
    <div className="flex flex-col gap-1">
      {errors.length !== 0 ? (
        errors.map((error, i) => (
          <ErrorDisplay key={i} progressionError={error} />
        ))
      ) : (
        <div className="no-errors px-6 py-2 font-display text-slate-700 dark:text-slate-300">
          none!
        </div>
      )}
    </div>
  );
}

const sortings = {
  type: (a, b) => a.type - b.type,
  chord: (a, b) =>
    a.concerns[0].i - b.concerns[0].i || a.concerns[1]?.i - b.concerns[1]?.i,
  severity: (a, b) => a.severity - b.severity,
};

/** @type {Array<EvaluationFunction>} */
const evaluations = [
  // #region Spelling

  // The voices are in their ranges
  chords => {
    const errors = [];

    chords.forEach((chord, i) => {
      chord.forEach((pitch, iVoice) => {
        if (!pitch) return;

        const range = VOICE_RANGES[iVoice];
        if (!pitch.isLowerThan(range[0]) && !pitch.isHigherThan(range[1]))
          return;

        errors.push(
          new ProgressionError("voice-out-of-range", [{ i, voices: [iVoice] }]),
        );
      });
    });

    return errors;
  },
  // Consecutive upper voices are within an octave
  chords => {
    const errors = [];

    chords.forEach((chord, i) => {
      for (let iVoice = 2; iVoice < 4; iVoice++) {
        if (!chord[iVoice - 1] || !chord[iVoice]) continue;

        if (Math.abs(chord[iVoice - 1]?.halfstepsTo(chord[iVoice])) < 12)
          continue;

        errors.push(
          new ProgressionError("upper-spacing", [
            { i, voices: [iVoice - 1, iVoice] },
          ]),
        );
      }
    });

    return errors;
  },
  // The voices do not cross
  chords => {
    const errors = [];

    chords.forEach((chord, i) => {
      for (let iVoice1 = 0; iVoice1 < 4; iVoice1++) {
        if (!chord[iVoice1]) continue;

        for (let iVoice2 = iVoice1 + 1; iVoice2 < 4; iVoice2++) {
          if (!chord[iVoice2]) continue;

          if (
            [false, true].every(
              considerAccidentals =>
                !chord[iVoice1].isHigherThan(
                  chord[iVoice2],
                  considerAccidentals,
                ),
            )
          )
            continue;

          errors.push(
            new ProgressionError("crossed-voices", [
              { i, voices: [iVoice1, iVoice2] },
            ]),
          );
        }
      }
    });

    return errors;
  },
  // The analysis' roman numeral is cased correctly (all roman numerals should be validated by the input process, so a mismatch is only a case issue)
  (chords, intervals, analyses, tonality) => {
    const errors = [];

    analyses.forEach((analysis, i) => {
      if (!analysis) return;

      if (
        (tonality.mode === "minor" ? MINOR_ROMAN : MAJOR_ROMAN).includes(
          analysis.roman,
        )
      )
        return;

      errors.push(
        new ProgressionError("miscased-roman", [{ i, voices: [-1] }]),
      );
    });

    return errors;
  },
  // The analysis' arabic numerals are valid
  (chords, intervals, analyses) => {
    const errors = [];

    analyses.forEach((analysis, i) => {
      if (!analysis) return;

      if (analysis.inversion() > -1) return;

      errors.push(
        new ProgressionError("invalid-arabic", [{ i, voices: [-1] }]),
      );
    });

    return errors;
  },
  // Every note is chordal
  (chords, intervals, analyses, tonality, triads) => {
    const errors = [];

    analyses.forEach((analysis, i) => {
      if (!analysis) return;

      const triadPitchNames = triads[i].map(pitch => pitch.toName());
      chords[i].forEach((pitch, iVoice) => {
        if (!pitch) return;

        if (triadPitchNames.includes(pitch.toName())) return;

        errors.push(
          new ProgressionError("non-chordal-tone", [{ i, voices: [iVoice] }]),
        );
      });
    });

    return errors;
  },
  // The bass matches the analysis
  (chords, intervals, analyses, tonality) => {
    const errors = [];

    analyses.forEach((analysis, i) => {
      if (!analysis) return;

      const bass = analysis.bass(tonality);
      // Check whether the bass note is the same pitch name as the correct bass
      if (chords[i][0]?.isSameNameAs(bass)) return;

      errors.push(new ProgressionError("bass-mismatch", [{ i, voices: [0] }]));
    });

    return errors;
  },
  // There is a root
  (chords, intervals, analyses, tonality, triads, charts) => {
    const errors = [];

    analyses.forEach((analysis, i) => {
      if (!analysis) return;

      const root = triads[i][0];
      if (charts[i].get(root.toName())?.length) return;

      errors.push(
        new ProgressionError("missing-root", [{ i, voices: [0, 1, 2, 3] }]),
      );
    });

    return errors;
  },
  // There is a third
  (chords, intervals, analyses, tonality, triads, charts) => {
    const errors = [];

    analyses.forEach((analysis, i) => {
      if (!analysis) return;

      const third = triads[i][1];
      if (charts[i].get(third.toName())?.length) return;

      errors.push(
        new ProgressionError("missing-third", [{ i, voices: [0, 1, 2, 3] }]),
      );
    });

    return errors;
  },
  // The fifth is omitted only in a root-position chord
  (chords, intervals, analyses, tonality, triads, charts) => {
    const errors = [];

    analyses.forEach((analysis, i) => {
      if (!analysis) return;

      const fifth = triads[i][2];
      // const [third, fifth] = [1, 2].map(item => triads[i][item]);
      if (charts[i].get(fifth.toName())?.length || !analysis.inversion())
        return;

      errors.push(
        new ProgressionError("non-root-missing-fifth", [
          { i, voices: [0, 1, 2, 3] },
        ]),
      );
    });

    return errors;
  },
  // There is a seventh in 7 chords
  (chords, intervals, analyses, tonality, triads, charts) => {
    const errors = [];

    analyses.forEach((analysis, i) => {
      if (!analysis) return;

      if (!analysis.isSeventh()) return;

      const seventh = triads[i][3];
      const seventhEntries = charts[i].get(seventh.toName());
      if (seventhEntries && seventhEntries.length) return;

      errors.push(
        new ProgressionError("missing-seventh", [{ i, voices: [0, 1, 2, 3] }]),
      );
    });

    return errors;
  },
  // The leading tone is not doubled
  (chords, intervals, analyses, tonality, triads, charts) => {
    const errors = [];

    analyses.forEach((analysis, i) => {
      const leadingTone = tonality.leadingTone();
      const leadingToneEntries = charts[i].get(leadingTone.toName());

      if (!leadingToneEntries || leadingToneEntries.length < 2) return;

      errors.push(
        new ProgressionError("double-leading", [
          { i, voices: leadingToneEntries },
        ]),
      );
    });

    return errors;
  },
  // The seventh is not doubled
  (chords, intervals, analyses, tonality, triads, charts) => {
    const errors = [];

    analyses.forEach((analysis, i) => {
      if (!analysis) return;

      const seventh = triads[i][3];
      // Do not evaluate non-seventh chords
      if (!seventh) return;

      const seventhEntries = charts[i].get(seventh.toName());
      if (!seventhEntries || seventhEntries.length < 2) return;

      errors.push(
        new ProgressionError("double-seventh", [{ i, voices: seventhEntries }]),
      );
    });

    return errors;
  },
  // The bass of a 6/4 chord is doubled
  (chords, intervals, analyses, tonality, triads, charts) => {
    const errors = [];

    analyses.forEach((analysis, i) => {
      if (analysis?.arabic !== "64") return;

      const fifth = triads[i][2];
      if (charts[i].get(fifth.toName())?.length === 2) return;

      errors.push(
        new ProgressionError("64-not-double-fifth", [
          { i, voices: [0, 1, 2, 3] },
        ]),
      );
    });

    return errors;
  },

  // #endregion

  // #region Progression

  // The progression begins with the tonic chord
  (chords, intervals, analyses) => {
    const errors = [];

    const analysis = analyses[0];
    if (!analysis || analysis.degree !== 1) {
      errors.push(
        new ProgressionError("begin-not-tonic", [{ i: 0, voices: [-1] }]),
      );
    }

    return errors;
  },
  // The progression ends with the tonic chord
  (chords, intervals, analyses) => {
    const errors = [];

    const analysis = analyses.at(-1);
    if (!analysis || analysis.degree !== 1) {
      errors.push(
        new ProgressionError("end-not-tonic", [
          { i: analyses.length - 1, voices: [-1] },
        ]),
      );
    }

    return errors;
  },
  // V chords do not resolve to IV chords
  (chords, intervals, analyses) => {
    const errors = [];

    for (let i = 1; i < analyses.length; i++) {
      if (!analyses[i - 1] || !analyses[i]) continue;

      if (analyses[i - 1].degree !== 5 || analyses[i].degree !== 4) continue;

      errors.push(
        new ProgressionError("v-iv", [
          { i: i - 1, voices: [-1] },
          { i, voices: [-1] },
        ]),
      );
    }

    return errors;
  },
  // 6/4 chords are either passing, neighbor, or cadential
  (chords, intervals, analyses, tonality, triads, charts) => {
    const errors = [];

    for (let i = 0; i < analyses.length; i++) {
      if (analyses[i]?.arabic !== "64") continue;

      const isCadential =
        // The chord is a I chord three chords from the end
        i === analyses.length - 3 &&
        analyses[i].degree === 1 &&
        // It resolves to a root position V chord
        analyses[i + 1]?.degree === 5 &&
        analyses[i + 1]?.inversion() === 0;
      if (isCadential) continue;

      const isPassing =
        // The chord is approached by and resolves down a fifth (relative I-V64-I6 pattern)
        analyses[i - 1]?.movementTo(analyses[i]) === 5 &&
        analyses[i + 1]?.movementTo(analyses[i]) === 5 &&
        // Exactly one neighboring chord is inverted
        ((analyses[i - 1]?.inversion() === 0 &&
          analyses[i + 1]?.inversion() === 1) ||
          (analyses[i - 1]?.inversion() === 1 &&
            analyses[i + 1]?.inversion() === 0));
      if (isPassing) continue;

      const isNeighbor =
        // The chord is approached by and resolves down a fourth (relative I-IV64-I pattern)
        analyses[i - 1]?.movementTo(analyses[i]) === 4 &&
        analyses[i + 1]?.movementTo(analyses[i]) === 4 &&
        // Neither neighbor chord is inverted
        !analyses[i - 1]?.inversion() &&
        !analyses[i + 1]?.inversion();
      if (isNeighbor) continue;

      errors.push(new ProgressionError("bad-64", [{ i, voices: [-1] }]));
    }

    return errors;
  },
  // The cadence should be authentic or plagal
  (chords, intervals, analyses) => {
    const errors = [];

    const secondLast = analyses.at(-2);
    const last = analyses.at(-1);
    if (
      ![4, 5].includes(secondLast?.degree) ||
      1 !== last?.degree ||
      last.inversion()
    ) {
      errors.push(
        new ProgressionError("bad-cadence", [
          { i: analyses.length - 2, voices: [-1] },
          { i: analyses.length - 1, voices: [-1] },
        ]),
      );
    }

    return errors;
  },

  // #endregion

  // #region Leading

  // Common tones are held
  (chords, intervals, analyses, tonality, triads, charts) => {
    const errors = [];

    for (let i = 1; i < analyses.length; i++) {
      if (!analyses[i - 1] || !analyses[i]) continue;

      // This rule does not apply when the chord does not change
      if (analyses[i - 1].degree === analyses[i].degree) continue;

      for (let iVoice = 1; iVoice < 4; iVoice++) {
        // The pitch from the previous chord in the consecutive pair (i - 1, i)
        const pitch = chords[i - 1][iVoice];
        if (!pitch) continue;

        // The entries in the chart of the previous chord
        const entriesPrev = charts[i - 1].get(pitch.toName());
        // The entries in the chart of the current chord
        const entries = charts[i].get(pitch.toName());

        // The rule does not apply if the tone is not in the current chord (i.e. it is not a common tone)
        if (!entries) continue;

        // Otherwise, the tone appears, so check that the tone appears on some voice on both chords
        if (entries.some(entry => entriesPrev.includes(entry))) continue;

        errors.push(
          new ProgressionError("common-not-held", [
            { i: i - 1, voices: [iVoice] },
            { i, voices: entries },
          ]),
        );
      }
    }

    return errors;
  },
  // Upper voices are primarily stepwise
  chords => {
    const errors = [];

    for (let i = 1; i < chords.length; i++) {
      for (let iVoice = 1; iVoice < 4; iVoice++) {
        if (!chords[i - 1][iVoice] || !chords[i][iVoice]) continue;

        const spaceDistance = chords[i - 1][iVoice].spacesTo(chords[i][iVoice]);
        if (Math.abs(spaceDistance) < 3) continue;

        errors.push(
          new ProgressionError("voice-leap", [
            { i: i - 1, voices: [iVoice] },
            { i, voices: [iVoice] },
          ]),
        );
      }
    }

    return errors;
  },
  // There are no parallel fifths
  (chords, intervals, analyses, tonality, triads, charts) => {
    const errors = [];

    for (let i = 1; i < intervals.length; i++) {
      if (!analyses[i - 1] || !analyses[i]) continue;

      // Parallel fifths in repeated harmony are not functionally parallel
      if (analyses[i - 1].degree === analyses[i].degree) continue;

      for (let iVoice1 = 0; iVoice1 < 4; iVoice1++) {
        // This loop uses change in voice index rather than voice index because of the way `intervals` is constructed (only records intervals between higher voices)
        for (let delVoice = 0; delVoice + iVoice1 < 3; delVoice++) {
          const intervalPrevious = intervals[i - 1][iVoice1][delVoice];
          const interval = intervals[i][iVoice1][delVoice];

          if (!intervalPrevious || !interval) continue;

          if (intervalPrevious.quality !== "P" || interval.quality !== "P")
            continue;

          if (intervalPrevious.simple !== 5 || interval.simple !== 5) continue;

          const iVoice2 = iVoice1 + delVoice + 1;

          errors.push(
            new ProgressionError("parallel-fifths", [
              { i: i - 1, voices: [iVoice1, iVoice2] },
              { i, voices: [iVoice1, iVoice2] },
            ]),
          );
        }
      }
    }

    return errors;
  },
  // There are no parallel octaves
  (chords, intervals, analyses, tonality, triads, charts) => {
    const errors = [];

    for (let i = 1; i < intervals.length; i++) {
      if (!analyses[i - 1] || !analyses[i]) continue;

      // Parallel octave in repeated harmony are not functionally parallel
      if (analyses[i - 1].degree === analyses[i].degree) continue;

      for (let iVoice1 = 0; iVoice1 < 4; iVoice1++) {
        // This loop uses change in voice index rather than voice index because of the way `intervals` is constructed (only records intervals between higher voices)
        for (let delVoice = 0; delVoice + iVoice1 < 3; delVoice++) {
          const intervalPrevious = intervals[i - 1][iVoice1][delVoice];
          const interval = intervals[i][iVoice1][delVoice];

          if (!intervalPrevious || !interval) continue;

          if (intervalPrevious.quality !== "P" || interval.quality !== "P")
            continue;

          if (intervalPrevious.simple !== 8 || interval.simple !== 8) continue;

          const iVoice2 = iVoice1 + delVoice + 1;

          errors.push(
            new ProgressionError("parallel-octaves", [
              { i: i - 1, voices: [iVoice1, iVoice2] },
              { i, voices: [iVoice1, iVoice2] },
            ]),
          );
        }
      }
    }

    return errors;
  },
  // A d5 to P5 is in the upper voices
  (chords, intervals, analyses, tonality, triads, charts) => {
    const errors = [];

    for (let i = 1; i < intervals.length; i++) {
      // Check the intervals between the bass and upper voices
      // This loop uses change in voice index rather than voice index because of the way `intervals` is constructed (only records intervals between higher voices)
      for (let delVoice = 0; delVoice < 3; delVoice++) {
        const intervalPrevious = intervals[i - 1][0][delVoice];
        const interval = intervals[i][0][delVoice];

        if (!intervalPrevious || !interval) continue;

        if (intervalPrevious.quality !== "d" || interval.quality !== "P")
          continue;

        if (intervalPrevious.simple !== 5 || interval.simple !== 5) continue;

        const iVoiceUpper = delVoice + 1;

        errors.push(
          new ProgressionError("d5-P5-not-upper", [
            { i: i - 1, voices: [iVoice1, iVoiceUpper] },
            { i, voices: [iVoice1, iVoiceUpper] },
          ]),
        );
      }
    }

    return errors;
  },
  // An ascending d5 to P5 is passing between I and I6
  (chords, intervals, analyses, tonality, triads, charts) => {
    const errors = [];

    for (let i = 1; i < intervals.length; i++) {
      for (let iVoice1 = 0; iVoice1 < 4; iVoice1++) {
        // This loop uses change in voice index rather than voice index because of the way `intervals` is constructed (only records intervals between higher voices)
        for (let delVoice = 0; delVoice + iVoice1 < 4; delVoice++) {
          const intervalPrevious = intervals[i - 1][iVoice1][delVoice];
          const interval = intervals[i][iVoice1][delVoice];

          if (!intervalPrevious || !interval) continue;

          if (intervalPrevious.quality !== "d" || interval.quality !== "P")
            continue;

          if (intervalPrevious.simple !== 5 || interval.simple !== 5) continue;

          if (
            (analyses[i - 1].degree === 1 &&
              analyses[i - 1].inversion() === 0) ||
            (analyses[i].degree === 1 && analyses[i].inversion() === 1)
          )
            continue;

          const iVoice2 = iVoice1 + delVoice + 1;

          errors.push(
            new ProgressionError("d5-P5-not-passing", [
              { i: i - 1, voices: [iVoice1, iVoice2] },
              { i, voices: [iVoice1, iVoice2] },
            ]),
          );
        }
      }
    }

    return errors;
  },
  // A hidden fifth in outer voices features a step in the higher voice
  (chords, intervals, analyses, tonality, triads, charts) => {
    const errors = [];

    for (let i = 1; i < intervals.length; i++) {
      // The interval between the bass and soprano
      const intervalPrevious = intervals[i - 1][0][2];
      const interval = intervals[i][0][2];

      if (!intervalPrevious || !interval) continue;

      if (interval.quality !== "P") continue;

      if (interval.simple !== 5) continue;

      const spaceDistanceBass = chords[i - 1][0].spacesTo(chords[i][0]);
      const spaceDistanceSoprano = chords[i - 1][3].spacesTo(chords[i][3]);

      // Contrary or oblique motion is okay
      if (spaceDistanceBass * spaceDistanceSoprano <= 0) continue;

      if (Math.abs(spaceDistanceSoprano) < 2) continue;

      errors.push(
        new ProgressionError("hidden-fifth-soprano-not-step", [
          { i: i - 1, voices: [0, 3] },
          { i, voices: [0, 3] },
        ]),
      );
    }

    return errors;
  },
  // A hidden octave features a step in the higher voice
  (chords, intervals, analyses, tonality, triads, charts) => {
    const errors = [];

    for (let i = 1; i < intervals.length; i++) {
      // The interval between the bass and soprano
      const intervalPrevious = intervals[i - 1][0][2];
      const interval = intervals[i][0][2];

      if (!intervalPrevious || !interval) continue;

      if (interval.quality !== "P") continue;

      if (interval.simple !== 8) continue;

      const spaceDistanceBass = chords[i - 1][0].spacesTo(chords[i][0]);
      const spaceDistanceSoprano = chords[i - 1][3].spacesTo(chords[i][3]);

      // Contrary or oblique motion is okay
      if (spaceDistanceBass * spaceDistanceSoprano <= 0) continue;

      if (Math.abs(spaceDistanceSoprano) < 2) continue;

      errors.push(
        new ProgressionError("hidden-octave-soprano-not-step", [
          { i: i - 1, voices: [0, 3] },
          { i, voices: [0, 3] },
        ]),
      );
    }

    return errors;
  },
  // There are no overlapping voices (n.b. overlapping voices are not the same as crossed voices)
  chords => {
    const errors = [];

    for (let i = 1; i < chords.length; i++) {
      for (let iVoice1 = 0; iVoice1 < 4; iVoice1++) {
        if (!chords[i][iVoice1]) continue;

        for (let iVoice2Previous = 0; iVoice2Previous < 4; iVoice2Previous++) {
          if (iVoice1 === iVoice2Previous) continue;

          if (!chords[i - 1][iVoice2Previous]) continue;

          if (
            [false, true].every(considerAccidentals =>
              iVoice1 < iVoice2Previous
                ? !chords[i][iVoice1].isHigherThan(
                    chords[i - 1][iVoice2Previous],
                    considerAccidentals,
                  )
                : !chords[i][iVoice1].isLowerThan(
                    chords[i - 1][iVoice2Previous],
                    considerAccidentals,
                  ),
            )
          )
            continue;

          errors.push(
            new ProgressionError("overlapping-voices", [
              { i: i - 1, voices: [iVoice2Previous] },
              { i, voices: [iVoice1] },
            ]),
          );
        }
      }
    }

    return errors;
  },
  // The leading tone resolves up to the tonic unless in a I7 chord
  (chords, intervals, analyses, tonality, traids, charts) => {
    const errors = [];

    const leadingTone = tonality.leadingTone();
    const leadingToneName = leadingTone.toName();

    for (let i = 1; i < chords.length; i++) {
      if (analyses[i - 1]?.degree === 1 && analyses[i - 1]?.isSeventh())
        continue;

      const leadingToneEntries = charts[i - 1].get(leadingToneName);

      leadingToneEntries?.forEach(iVoice => {
        const pitch = chords[i - 1][iVoice];

        // The next pitch in the voice
        const resolution = chords[i][iVoice];

        // Leading tones should resolve to a halfstep up
        if (resolution && pitch.halfstepsTo(resolution) === 1) return;

        errors.push(
          new ProgressionError("unresolved-leading", [
            { i: i - 1, voices: [iVoice] },
            { i, voices: [iVoice] },
          ]),
        );
      });
    }

    return errors;
  },
  // The seventh resolves down
  (chords, intervals, analyses, tonality, triads, charts) => {
    const errors = [];

    for (let i = 1; i < chords.length; i++) {
      if (!analyses[i - 1]) continue;

      if (!analyses[i - 1].isSeventh()) continue;

      const seventh = triads[i - 1][3];
      const seventhEntries = charts[i - 1].get(seventh.toName());

      seventhEntries?.forEach(iVoice => {
        const pitch = chords[i - 1][iVoice];

        // The next pitch in the voice
        const resolution = chords[i][iVoice];

        // Sevenths should resolve a space down
        if (resolution && pitch.spacesTo(resolution) === -1) return;

        errors.push(
          new ProgressionError("unresolved-seventh", [
            { i: i - 1, voices: [iVoice] },
            { i, voices: [iVoice] },
          ]),
        );
      });
    }

    return errors;
  },
  // Voices do not leap by augmented seconds
  chords => {
    const errors = [];

    for (let i = 1; i < chords.length; i++) {
      for (let iVoice = 0; iVoice < 4; iVoice++) {
        if (!chords[i - 1][iVoice] || !chords[i][iVoice]) continue;

        const melodicInterval = chords[i - 1][iVoice].interval(
          chords[i][iVoice],
        );
        if (melodicInterval.quality !== "A" || melodicInterval.size !== 2)
          continue;

        errors.push(
          new ProgressionError("augmented-second-leap", [
            { i: i - 1, voices: [iVoice] },
            { i: i, voices: [iVoice] },
          ]),
        );
      }
    }

    return errors;
  },
  // Voices do not leap by tritones
  chords => {
    const errors = [];

    const tritone = new Interval("A", 4);

    for (let i = 1; i < chords.length; i++) {
      for (let iVoice = 0; iVoice < 4; iVoice++) {
        if (!chords[i - 1][iVoice] || !chords[i][iVoice]) continue;

        if (
          !chords[i - 1][iVoice]
            .interval(chords[i][iVoice])
            .isEnharmonicTo(tritone, true)
        )
          continue;

        errors.push(
          new ProgressionError("tritone-leap", [
            { i: i - 1, voices: [iVoice] },
            { i: i, voices: [iVoice] },
          ]),
        );
      }
    }

    return errors;
  },

  // #endregion
];

/**
 * References:
 *  - Kohs Music Theory
 *  - https://apcentral.collegeboard.org/media/pdf/ap23-sg-music-theory.pdf
 */
