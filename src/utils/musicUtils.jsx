import { Accidental, Voice } from "vexflow";
import Pitch from "../classes/Pitch";

export const A_OCTAVE = "ABCDEFG";
export const C_OCTAVE = "CDEFGAB";

export const F_CIRCLE_OF_FIFTHS = "FCGDAEBF";
export const B_CIRCLE_OF_FOURTHS = "BEADGCF";  // fCircleOfFifths in reverse

/**
 * Returns the letters of the notes affected by the key.
 * 
 * @param {string} keySignature A standard key.
 * @returns {string}
 */
export function keyAccidentals(keySignature) {
  if (keySignature === "F" || keySignature[1] === "b")
    return F_CIRCLE_OF_FIFTHS.slice(F_CIRCLE_OF_FIFTHS.indexOf(keySignature[0] - 1, 1), -1);
  else
    return F_CIRCLE_OF_FIFTHS.slice(F_CIRCLE_OF_FIFTHS.indexOf(Pitch.nextLetterInOctave(keySignature[0])));
}

/**
 * Apply accidentals well. VexFlow's Accidental.applyAccidentals does not handle unisons well.
 * 
 * @param {Voice[]} voices
 * @param {string} keySignature  
 */
function applyAccidentalsWell(voices, keySignature) {
  Accidental.applyAccidentals(voices, keySignature ?? undefined);
  
  const keyAccidentals = keyAccidentals(keySignature);
  // vfAccidentals : _Accidental[][]
  const vfAccidentals = voices.tickables[0].map(
    // tickable : _Tickable
    tickable =>
      tickable.modifiers.filter(modifier =>
        modifier.constructor.name === "_Accidental")
  );

  
}