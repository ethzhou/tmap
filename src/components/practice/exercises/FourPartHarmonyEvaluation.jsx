import Pitch from "../../../classes/Pitch";

export default function FourPartHarmonyEvaluation({ parts, analysis, tonality }) {

  return (
    <div>
      scale: {Array(8).fill().map((_, i) => tonality.scaleTone(i + 1).toName() + " ")}<br />
    </div>
  )
}

// Check that the chord analysis matches the chords given.
/**
 * Finds whether the chord matches the analysis.
 * 
 * @param {*} chord
 */
function isCorrectChordAnalysis(chord, analysis, keyPitch) {
  // Find triad

  // Check bass note

  

}

/**
 * Get indices of the chords whose notes match the given analysis.
 */
function getICorrectAnalyses(parts, analysis, keyPitch) {

}

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