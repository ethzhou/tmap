import { REGEXP_ChordAnalysis } from "../utils/musicUtils";
import { romanToDegree } from "../utils/musicUtils";
import Key from "./Key";
import Pitch from "./Pitch";

export default class ChordAnalysis {
  /**
   * @param {Object}
   * @property {string} accidental
   * @property {string} roman Case sensitive.
   * @property {string} arabic
   * @property {string} secondary
   */
  constructor({accidental, roman, arabic, secondary}) {
    this.accidental = accidental;
    this.roman = roman;
    this.arabic = arabic;
    this.secondary = secondary;
  }

  /**
   * @param {string} value
   */
  set roman(value) {
    this._roman = value;
    this.degree = romanToDegree(value);
  }

  get roman() {
    return this._roman;
  }

  /**
   * Constructs an analysis from string notation. Returns `undefined` if invalid.
   * 
   * @param {string} strRepresentation For example, "V65/IV" or "bii".
   * @returns {ChordAnalysis | undefined}
   */
  static fromString(strRepresentation) {
    const groups = strRepresentation?.match(REGEXP_ChordAnalysis)?.groups || undefined;

    return groups ? new ChordAnalysis(groups) : undefined;
  }

  toString() {
    return `${this.accidental}${this.roman}${this.arabic}${this.secondary}`;
  }

  isSeventh() {
    return ["7", "65", "43", "42"].includes(this.arabic);
  }

  inversion() {
    return ["42"].includes(this.arabic) ? 3
    : ["43", "64"].includes(this.arabic) ? 2
    : ["65", "6", "63"].includes(this.arabic) ? 1
    : ["7", "53", "", undefined].includes(this.arabic) ? 0
    // Otherwise, the arabic numerals are invalid
    : -1;
  }

  /**
   * Find the degree of the bass of the chord.
   * 
   * @returns {number} Scale degree of the bass.
   */
  bassDegree() {
    const inversion = this.inversion();

    return (this.degree + 2 * inversion - 1) % 7 + 1;
  }

  /**
   * Returns the pitch of the bass of the chord in a key.
   * 
   * @param {Key} key
   * @returns {Pitch}
   */
  bass(key) {
    return key.scaleTone(this.bassDegree());
  }

  /**
   * Finds the interval size between the roots of the analyses. 
   * 
   * @param {ChordAnalysis} other
   * @returns {number} The result is always positive.
   */
  movementTo(other) {
    return (other.degree - this.degree + 7) % 7 + 1;
  }
}