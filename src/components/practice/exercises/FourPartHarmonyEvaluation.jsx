import { useEffect, useState } from "react";
import ChordAnalysis from "../../../classes/ChordAnalysis";
import Key from "../../../classes/Key";
import Pitch from "../../../classes/Pitch";
import { FOUR_VOICES, VOICE_RANGES } from "../../../utils/musicUtils";
import ProgressionError from "../../../classes/ProgressionError";

/**
 * @callback EvaluationFunction
 * @param {Array<Pitch>} chords
 * @param {Array<ChordAnalysis>} analyses
 * @param {Key} tonality
 * @param {Array<Pitch>} triads
 * @param {Array<Map<string, Array<number>>>} charts
 * @returns {Array<ProgressionError>}
 */

/**
 * 
 * @param {Object} props
 * @param {Object} parts
 * @returns 
 */
export default function FourPartHarmonyEvaluation({ parts, analyses, tonality }) {
  /**
   * Array of provided chords, each in BTAS order.
   * @type {Array<Array<Pitch | Null>>}
   */
  const chords = parts[0].map((_, i) => 
    parts.map(part => part[i])
  );

  /**
   * Array of triads.
   * @type {Array<Array<Pitch>>}
   */
  const triads = analyses.map(analysis => 
    analysis ? tonality.triad(analysis.roman, analysis.isSeventh(), analysis.accidental) : null
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
      if (!pitch)
        return;

      const pitchName = pitch.toName();
      // If 
      if (!counts.has(pitchName)) {
        counts.set(pitchName, []);
      }

      counts.get(pitchName).push(iVoice);
    });
  });

  /**
   * Array of the completenesses of each chord, i.e. whether every pitch is not null in each chord. 
   * @type {Array<boolean>}
   */
  const chordCompletenesses = chords.map(chord => chord.every(pitch => pitch));

  const errors = {
    spellingErrors: [],
    progressionErrors: [],
    leadingErrors: [],
  };
  
  spellingEvalutions.forEach(evaluation => 
    errors.spellingErrors.push(...evaluation(chords, analyses, tonality, triads, charts))
  );
  progressionEvaluations.forEach(evaluation => 
    errors.progressionErrors.push(...evaluation(chords, analyses, tonality, triads, charts))
  );
  leadingEvaluations.forEach(evaluation => 
    errors.leadingErrors.push(...evaluation(chords, analyses, tonality, triads, charts))
  );

  // console.log(errors);

  return (
    <div>
      { errors.spellingErrors.map((error, i) => <p key={i}>{ error.toElement() }</p>) }
    </div>
  )
}

/** @type {Array<EvaluationFunction>} */
const spellingEvalutions = [
  // The voices are in their ranges
  (chords) => {
    const errors = [];
    
    chords.forEach((chord, i) => {
      chord.forEach((pitch, iVoice) => {
        if (!pitch)
          return;

        const range = VOICE_RANGES[iVoice];
        if (!pitch.isLowerThan(range[0]) && !pitch.isHigherThan(range[1]))
          return;

        errors.push(new ProgressionError("voice-out-of-range", [
          { i, voices: [iVoice] }
        ]));
      });
    });

    return errors;
  },
  // Consecutive upper voices are within an octave
  (chords) => {
    const errors = [];

    chords.forEach((chord, i) => {
      for (let iVoice = 1; iVoice < 3; iVoice++) {
        if (!chord[iVoice] || !chord[iVoice + 1])
          continue;
          
        if (Math.abs(chord[iVoice]?.halfstepsTo(chord[iVoice + 1])) <= 12)
          continue;
        
        errors.push(new ProgressionError("upper-spacing", [
          { i, voices: [iVoice, iVoice + 1] }
        ]));
      }
    });

    return errors;
  },
  // The voices do not cross
  (chords) => {
    const errors = [];
    
    chords.forEach((chord, i) => {
      for (let iVoice1 = 0; iVoice1 < 4; iVoice1++) {
        if (!chord[iVoice1])
          continue;
        
        for (let iVoice2 = iVoice1 + 1; iVoice2 < 4; iVoice2++) {
          if (!chord[iVoice2])
            continue;

          if ([false, true].every(considerAccidentals => !chord[iVoice1].isHigherThan(chord[iVoice2], considerAccidentals)))
            continue;

        errors.push(new ProgressionError("crossed-voices", [
            { i, voices: [iVoice1, iVoice2] }
          ]));
        }
      }
    });

    return errors;
  },
  // Every note is chordal
  (chords, analyses, tonality, triads) => {
    const errors = [];

    analyses.forEach((analysis, i) => {
      if (!analysis)
        return;

      const triadPitchNames = triads[i].map(pitch => pitch.toName())
      chords[i].forEach((pitch, iVoice) => {
        if (!pitch)
          return;

        if (triadPitchNames.includes(pitch.toName()))
          return;

        errors.push(new ProgressionError("non-chordal-tone", [
          { i, voices: [iVoice] }
        ]));
      });
    });

    return errors;
  },
  // The bass matches the analysis
  (chords, analyses, tonality) => {
    const errors = [];

    analyses.forEach((analysis, i) => {
      if (!analysis)
        return;
      
      const bass = analysis.bass(tonality);
      // Check whether the bass note is the same pitch name as the correct bass
      if (chords[i][0]?.isSameNameAs(bass))
        return;

      errors.push(new ProgressionError("bass-mismatch", [
        { i, voices: [0] }
      ]));
    });
    
    return errors;
  },
  // There is a root
  (chords, analyses, tonality, triads, charts) => {
    const errors = [];

    analyses.forEach((analysis, i) => {
      if (!analysis)
        return;
      
      const root = triads[i][0];
      if (charts[i].get(root.toName())?.length)
        return;

      errors.push(new ProgressionError("missing-root", [
        { i, voices: [0, 1, 2, 3] }
      ]));
    });

    return errors;
  },
  // There is a third
  (chords, analyses, tonality, triads, charts) => {
    const errors = [];

    analyses.forEach((analysis, i) => {
      if (!analysis)
        return;
      
      const third = triads[i][1];
      if (charts[i].get(third.toName())?.length)
        return;

      errors.push(new ProgressionError("missing-third", [
        { i, voices: [0, 1, 2, 3] }
      ]));
    });

    return errors;
  },
  // The fifth is omitted only in a root-position chord
  (chords, analyses, tonality, triads, charts) => {
    const errors = [];

    analyses.forEach((analysis, i) => {
      if (!analysis)
        return;
      
      const fifth = triads[i][2];
      // const [third, fifth] = [1, 2].map(item => triads[i][item]);
      if (charts[i].get(fifth.toName())?.length || !analysis.inversion())
        return;

      errors.push(new ProgressionError("non-root-missing-fifth", [
        { i, voices: [0, 1, 2, 3] }
      ]))
    });

    return errors;
  },
  // There is a seventh in 7 chords
  (chords, analyses, tonality, triads, charts) => {
    const errors = [];

    analyses.forEach((analysis, i) => {
      if (!analysis)
        return;

      if (!analysis.isSeventh())
        return;
      
      const seventh = triads[i][3];
      const seventhEntries = charts[i].get(seventh.toName());
      console.log(seventh, seventhEntries, charts, triads);
      if (seventhEntries && seventhEntries.length)
        return;

      errors.push(new ProgressionError("missing-seventh", [
        { i, voices: [0, 1, 2, 3] }
      ]));
    });

    return errors;
  },
  // The leading tone is not doubled
  (chords, analyses, tonality, triads, charts) => {
    const errors = [];

    analyses.forEach((analysis, i) => {
      const leadingTone = tonality.leadingTone();
      const leadingToneEntries = charts[i].get(leadingTone.toName());

      if (!leadingToneEntries || leadingToneEntries.length < 2)
        return;
    
      errors.push(new ProgressionError("double-leading", [
        { i, voices: leadingToneEntries }
      ]))
    });

    return errors;
  },
  // The seventh is not doubled
  (chords, analyses, tonality, triads, charts) => {
    const errors = [];

    analyses.forEach((analysis, i) => {
      if (!analysis)
        return;
      
      const seventh = triads[i][3];
      // Do not evaluate non-seventh chords
      if (!seventh)
        return;

      const seventhEntries = charts[i].get(seventh.toName());
      if (!seventhEntries || seventhEntries.length < 2)
        return;

      errors.push(new ProgressionError("double-seventh", [
        { i, voices: charts[i]?.get(seventh.toName()) }
      ]));
    });

    return errors;
  },
];

const progressionEvaluations = [
  // The progression begins with the tonic chord
  // The progression ends with the tonic chord
  // V chords do not resolve to IV chords
  // 6/4 chords are either passing, neighbor, or cadential
];

const leadingEvaluations = [
  // There are no parallel fifths
  // There are no parallel octaves
  // 
]

// Kohs Music Theory
// Connecting I, IV, and V in the Major Mode
// abridged

//  1. Begin on the tonic chord (I).

//  2. End on the tonic.

//  3. Hold common tones and move the other voices stepwise. If there is no common tone (as in IV-V), move the upper voices in contrary motion against the bass, keeping all leaps to a minimum.

//  4. Avoid V-IV.

//  5. Melodic interest...

//  6. In general, change chords on every beat (and particularly over the bar line).

//  7. As in two-voice counterpoint, avoid consecutive fifths and octaves; motion into these sensitive intervals by oblique motion ("hidden" fifths or octaves) is objectionable if the upper voice leaps to the interval, but it is usually permissible for the lower voice to leap this way. You should also avoid parallel octaves and fifths.

//  8. Keep each of the upper voices within an octave of its neighbor. This bass may be any distance from the tenor, but these two should not be very close if they are both in an extremely low register.

//  9. In general, double the root of the triad in one of the upper voices. The third or fifth may be doubled, but only if considerations of voice leading (melodic values) make this the lesser evil. The leading tone (third of the V chord) should not be doubled because of its high "voltage" (need to resolve).

// 10. Notes doubled at the octave or unison are best approached and quitted in contrary motion, and stepwise if possible. This applies with particular strength to any irregular doubling, such as that of the third or fifth of the chord.

// 11. It is possible to omit the fifth, leaving it understood. If this is done it should be with a view to improve the voice leading, and the root should be tripled. Do not double the third in such a case.

// 12. Occassional use of the P.T. and N.T. is permitted. Do not use any other dissonances at this time.

// 13. Observe the approximate vocal ranges indicated in Example I.