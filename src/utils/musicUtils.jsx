import { Accidental, Voice } from "vexflow";
import Pitch from "../classes/Pitch";
import Interval from "../classes/Interval";

export const A_OCTAVE = "ABCDEFG";
export const C_OCTAVE = "CDEFGAB";

// This loops from F to F, including F twice
export const F_CIRCLE_OF_FIFTHS = "FCGDAEBF";

export const FOUR_VOICES = ["bass", "tenor", "alto", "soprano"];
export const GRAND_STAFF_STAVES = ["bass", "treble"];

export function accidentalToString(accidental) {
  // Returns "" for naturals
  return (accidental < 0 ? "b" : "#").repeat(Math.abs(accidental));
}

/**
 * Returns the string representation of an accidental for VexFlow Accidental constructor.
 * 
 * @param {number} accidental
 * @returns {string}
 */
export function accidentalToCode(accidental) {
  const accidentalString = accidentalToString(accidental);
  return accidentalString === "" ? "n" : accidentalString;
}

/**
 * Determines whether the time is valid.
 * 
 * @param {string | object} timeSignature
 * @param {undefined} chordsPerMeasure
 * @returns {boolean}
 */
export function isValidTime(timeSignature) {
  const isString = typeof timeSignature === "string";

  // Common time or cut time
  if (timeSignature === "C" || timeSignature === "C|") {
    return true;
  }

  const values = isString ? timeSignature.split("/") : [timeSignature.beatsPerMeasure, timeSignature.valuePerBeat];

  // No "/"
  if (values.length === 1)
    return false;

  // Some not numbers
  if (values.some(item => !Number(item))) {
    return false;
  }

  return true;
}

/**
 * Calculates the note duration.
 * 
 * @param {object} timeSignature
 * @param {number} chordsPerMeasure
 * @returns {number}
 */
export function calculateNoteDuration(timeSignature, chordsPerMeasure) {
  const { beatsPerMeasure, valuePerBeat } = timeSignature;

  return chordsPerMeasure * valuePerBeat / beatsPerMeasure;
}

/**
 * Determines whether the note duration is valid, i.e. an integer power of two.
 * 
 * @param {number} noteDuration
 * @returns {boolean}
 */
export function isValidNoteDuration(noteDuration) {
  const log2 = Math.log2(noteDuration);

  return log2 >= 0 && Number.isInteger(log2);
}

const patternAccidental = "[b#]";
const patternRomanNumeralMajor = "I{1,3}|IV|VI{0,2}";  // From https://stackoverflow.com/questions/267399/how-do-you-match-only-valid-roman-numerals-with-a-regular-expression
const patternRomanNumeralMinor = patternRomanNumeralMajor.toLowerCase();
const patternRomanNumeral = `${patternRomanNumeralMajor}|${patternRomanNumeralMinor}`;
const patternArabicNumberals = "\\d+";
const patternSecondaryDominant = `/(${patternRomanNumeral})`;

const patternChordSymbol = 
`^\
(?<accidental>${patternAccidental})?\
(?<roman>${patternRomanNumeral})\
(?<arabic>${patternArabicNumberals}){0,2}\
(?<secondary>${patternSecondaryDominant})?\
$`;

const regexpChordSymbol = new RegExp(patternChordSymbol);
console.log(regexpChordSymbol);

export function parseStringChordSymbol(string) {
  return string.match(regexpChordSymbol)?.groups || undefined;
}
