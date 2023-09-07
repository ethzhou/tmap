import { Accidental, Voice } from "vexflow";
import Pitch from "../classes/Pitch";

export const A_OCTAVE = "ABCDEFG";
export const C_OCTAVE = "CDEFGAB";

export const F_CIRCLE_OF_FIFTHS = "FCGDAEBF";

export const FOUR_VOICES = ["bass", "tenor", "alto", "soprano"];
export const GRAND_STAFF_STAVES = ["bass", "treble"];

/**
 * Determines whether the key is valid and practical. To pass, the letter must be capitalized, and a flat must be lowercase b.
 * 
 * @param {string} keySignature
 * @returns {boolean}
 */
export function isValidKey(keySignature) {
  const letter = keySignature[0].toUpperCase();

  // Pitch should be an octave letter
  if (!C_OCTAVE.includes(letter))
    return false;

  // No accidental is okay
  if (keySignature.length === 1)
    return true;

  // Accidental symbol should be at most 1 symbol
  if (keySignature.length > 2)
    return false;

  const accidental = keySignature[1];

  // Check flat signature
  if (accidental === "b" || accidental === "B")
    // All but Fb are valid flat keys
    return letter !== "F";

  // Check sharp signature
  if (accidental === "#") {
    // Only F# and C# are valid sharp keys
    return letter === "F" || letter === "C";
  }
}

/**
 * Conforms a key signature to what VexFlow wants in Stave.addKeySignature.
 * 
 * @param {string} keySignature
 * @returns {string}
 */
export function conformToVFKey(keySignature) {
  if (!isValidKey(keySignature))
    return ;

  return `${keySignature[0].toUpperCase()}${keySignature[1]?.toLowerCase() ?? ""}`;
}

export function keyAccidentalType(keySignature) {
  return keySignature === "F" || keySignature[1] === "b" ? -1
    : keySignature === "C" ? 0
    : 1;
}

/**
 * Returns the letters of the notes affected by the key.
 * 
 * @param {string} keySignature A valid key.
 * @returns {string}
 */
export function keyAffectedLetters(keySignature) {
  if (keyAccidentalType(keySignature) === -1)
    return F_CIRCLE_OF_FIFTHS.slice(F_CIRCLE_OF_FIFTHS.indexOf(keySignature[0], 1) - 1, -1);
  else
    return F_CIRCLE_OF_FIFTHS.slice(F_CIRCLE_OF_FIFTHS.indexOf(Pitch.nextLetterInOctave(keySignature[0])));
}

/**
 * Determines whether the time is valid.
 * 
 * @param {string} timeSignature
 * @returns {boolean}
 */
export function isValidTime(timeSignature) {
  // Common time or cut time
  if (timeSignature === "C" || timeSignature === "C|") {
    return true;
  }

  const params = timeSignature.split("/");
  console.log(params);
  // No "/"
  if (params.length === 1)
    return false;

  // Some not numbers
  if (params.some(item => !Number(item))) {
    return false;
  }

  return true;
}

export function accidentalToString(accidental) {
  // Returns "" for naturals
  return (accidental < 0 ? "b" : "#").repeat(Math.abs(accidental));
}

export function accidentalToCode(accidental) {
  const accidentalString = accidentalToString(accidental);
  return accidentalString === "" ? "n" : accidentalString;
}
