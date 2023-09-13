import { C_OCTAVE, F_CIRCLE_OF_FIFTHS, accidentalToString } from "../utils/musicUtils";
import Interval from "./Interval";
import Pitch from "./Pitch";

export default class Key {
  /**
   * @param {string} letter
   * @param {number} accidental
   * @param {"major" | "minor"} mode 
   */
  constructor(letter, accidental = 0, mode = "major") {
    this.pitch = new Pitch(letter, accidental, 0);

    this.mode = mode;
    this.letter = letter.toUpperCase();
    this.accidental = accidental;
  }

  /**
   * @param {string} val
   */
  set letter(val) {
    this._letter = val;
    this.pitch.letter = val;
    // The key of the relative major
    this.ionian = this.ionian = this.mode === "major" ? this
    : Key.fromPitch(Pitch.fromInterval(this.pitch, new Interval("m", 3)))
  }

  get letter() {
    return this.mode === "major" ? this._letter.toUpperCase() : this._letter.toLowerCase();
  }

  /**
   * @param {number} val
   */
  set accidental(val) {
    this._accidental = val;
    this.pitch.accidental = val;
    this.ionian = this.mode === "major" ? this
      : Key.fromPitch(Pitch.fromInterval(this.pitch, new Interval("m", 3)));
  }

  get accidental() {
    return this._accidental;
  }

  /**
   * Constructs a key from string notation. Returns `undefined` if invalid.
   * 
   * @param {string} strRepresentation For example, "Cb" or "A".
   * @returns {Key | undefined}
   */
  static fromString(strRepresentation) {
    const pitch = Pitch.fromString(strRepresentation + "0");
    if (!pitch)
      return;

    // If the key letter was uppercase, use major; otherwise use minor
    const mode = strRepresentation[0] === strRepresentation[0].toUpperCase() ? "major" : "minor";

    return new Key(pitch.letter, pitch.accidental, mode);
  }

  /**
   * @param {Pitch} pitch
   * @param {"major" | "minor"} mode
   * @returns {Key}
   */
  static fromPitch(pitch, mode = "major") {
    return new Key(pitch.letter, pitch.accidental, mode);
  }

  toString() {
    return `${this.letter}${accidentalToString(this.accidental)}`;
  }

  // As displayed in analysis
  toAnalysis () {
    const accidentalString = this.accidental === -1 ? "♭"
      : this.accidental === 1 ? "♯"
      : "";
    return `${this.letter}${this.accidental ? accidentalString : ""}`;
  }

  /**
   * Determines whether the key is valid and practical (non theoretical).
   * 
   * @returns {boolean}
   */
  isValidKey() {
    // No accidental is okay
    if (this.ionian.accidental === 0)
      return true;

    // Check flat signature
    if (this.ionian.accidental === -1)
      // All but Fb are valid flat keys
      return this.ionian.letter !== "F";
  
    // Check sharp signature
    if (this.ionian.accidental === 1)
      // Only F# and C# are valid sharp keys
      return this.ionian.letter === "F" || this.ionian.letter === "C";

    // Otherwise, the accidental's size automatically makes the key invalid
    return false;
  }

  // As required by VexFlow Stave.addKeySignature
  toVF() {
    return this.ionian.toString();
  }
  
  /**
   * Finds the accidental symbol with which this key is displayed.
   * 
   * @returns {number}
   */
  accidentalType() {
    return this.ionian.letter === "F" || this.ionian.accidental === -1 ? -1
      : this.ionian.letter === "C" ? this.ionian.accidental
      : 1;
  }

  /**
   * Returns the letters of the pitches affected by the key.
   * 
   * @returns {string}
   */
  affectedLetters() {
    // The key C returns empty
    if (this.ionian.letter === "C" && this.ionian.accidental === 0)
      return "";

    // A flat key is named with the letter second to last flatted letter in the display order
    if (this.ionian.accidentalType() === -1)
      return F_CIRCLE_OF_FIFTHS.slice(
        F_CIRCLE_OF_FIFTHS.indexOf(this.ionian.letter, 1) - 1,
        -1
      );

    // A sharp key is named with the letter is named with the letter one semitone higher than the last sharp
    return F_CIRCLE_OF_FIFTHS.slice(
      0,
      F_CIRCLE_OF_FIFTHS.indexOf(Pitch.prevLetterInOctave(this.ionian.letter)) + 1
    );
  }

  /**
   * Finds the requested scale tone of the major scale of the current pitch. 
   * 
   * @param {number} n Degree of the scale.
   * @returns {Pitch}
   */
  scaleTone(n) {
    console.log((n + 7 - 2 - 1) % 7 + 1);
    return this.ionian.pitch.scaleTone(
      this.mode === "major" ? n
      // For a minor key, find the scale tone via the ionian, and use the scale degree two below
        : (n + 7 - 2 - 1) % 7 + 1
    );
  }
}