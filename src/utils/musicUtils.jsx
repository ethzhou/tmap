import { Accidental, Voice } from "vexflow";
import Pitch from "../classes/Pitch";

export const A_OCTAVE = "ABCDEFG";
export const C_OCTAVE = "CDEFGAB";

export const F_CIRCLE_OF_FIFTHS = "FCGDAEBF";

export const FOUR_PARTS = ["bass", "tenor", "alto", "soprano"];
export const GRAND_STAFF_STAVES = ["bass", "treble"];

export function keyAccidentalType(keySignature) {
  return keySignature === "F" || keySignature[1] === "b" ? -1
    : keySignature === "C" ? 0
    : 1;
}

/**
 * Returns the letters of the notes affected by the key.
 * 
 * @param {string} keySignature A standard key.
 * @returns {string}
 */
export function keyAffectedLetters(keySignature) {
  if (keyAccidentalType(keySignature) === -1)
    return F_CIRCLE_OF_FIFTHS.slice(F_CIRCLE_OF_FIFTHS.indexOf(keySignature[0], 1) - 1, -1);
  else
    return F_CIRCLE_OF_FIFTHS.slice(F_CIRCLE_OF_FIFTHS.indexOf(Pitch.nextLetterInOctave(keySignature[0])));
}

export function accidentalToString(accidental) {
  // Returns "" for naturals
  return (accidental < 0 ? "b" : "#").repeat(Math.abs(accidental));
}

export function accidentalToCode(accidental) {
  const accidentalString = accidentalToString(accidental);
  return accidentalString === "" ? "n" : accidentalString;
}
