import {
  A_OCTAVE,
  C_OCTAVE,
  MAJOR_SIMPLE_INTERVAL_HALFSTEP_COUNTS,
  accidentalToString,
  accidentalToText,
} from "../utils/musicUtils";
import Interval from "./Interval";

export default class Pitch {
  /**
   * @param {string} letter Converted to upper case if not already.
   * @param {number} accidental
   * @param {number} octave
   */
  constructor(letter, accidental, octave) {
    this.letter = letter.toUpperCase();
    this.accidental = accidental;
    this.octave = octave;
  }

  /**
   *  Constructs a pitch from an integer representing spacing away from middle C.
   *
   * @param {number} spacesFromC4 The number of spaces away from middle C.
   * @param {number} accidental An accidental to be tacked onto the note.
   * @returns {Pitch}
   */
  static fromInt(spacesFromC4, accidental = 0) {
    const octave = 4 + Math.floor(spacesFromC4 / 7);
    const letter = A_OCTAVE[(((2 + spacesFromC4) % 7) + 7) % 7];

    return new Pitch(letter, accidental, octave);
  }

  /**
   * Constructs a pitch from string notation. Returns `undefined` if invalid.
   *
   * @param {string} strRepresentation For example, "C#4" or "D5".
   * @returns {Pitch | undefined}
   */
  static fromString(strRepresentation) {
    const letter = strRepresentation[0]?.toUpperCase();
    const accidental =
      strRepresentation[1] === "b"
        ? strRepresentation[2] === "b"
          ? -2
          : -1
        : strRepresentation[1] === "#"
        ? strRepresentation[2] === "#"
          ? 2
          : 1
        : strRepresentation[1] === "x"
        ? 2
        : 0;
    const octave = Number(strRepresentation.slice(1 + Math.abs(accidental)));

    // Check validity
    if (!C_OCTAVE.includes(letter)) return;
    if (Number.isNaN(octave))
      // octave is NaN: either the accidental was invalid or octave was invalid
      return;

    return new Pitch(letter, accidental, octave);
  }

  /**
   * Constructs a pitch from displayed text. Returns `undefined` if invalid.
   *
   * @param {string} strRepresentation For example, "C#4" or "D5".
   * @returns {Pitch | undefined}
   */
  static fromText(strRepresentation) {
    const letter = strRepresentation[0]?.toUpperCase();
    const accidental =
      strRepresentation[1] === "𝄫"
        ? -2
        : strRepresentation[1] === "♭"
        ? -1
        : strRepresentation[1] === "♮"
        ? 0
        : strRepresentation[1] === "♯"
        ? 1
        : strRepresentation[1] === "𝄪"
        ? 2
        : 0;
    console.log(
      "dfdfdafsdf",
      strRepresentation,
      new String(strRepresentation),
      strRepresentation.slice(1)[0],
      new String(strRepresentation)[1],
      1 + (accidental !== 0 || strRepresentation[1] === "♮"),
      strRepresentation.slice(
        1 + (accidental !== 0 || strRepresentation[1] === "♮"),
      ),
    );
    const octave = Number(
      strRepresentation.slice(
        1 + (accidental !== 0 || strRepresentation[1] === "♮"),
      ),
    );

    // Check validity
    if (!C_OCTAVE.includes(letter)) return;
    if (Number.isNaN(octave))
      // octave is NaN: either the accidental was invalid or octave was invalid
      return;

    return new Pitch(letter, accidental, octave);
  }

  /**
   * Constructs a pitch from a pitch and interval.
   *
   * @param {Pitch} pitch From this pitch.
   * @param {Interval} interval
   * @returns {Pitch}
   */
  static fromInterval(pitch, interval) {
    const newPitch = pitch.scaleTone(interval.size);
    newPitch.accidental += Interval.qualityToAccidental(
      interval.quality,
      interval.size,
    );
    newPitch.octave +=
      Math.floor((interval.size - 1) / 7) +
      pitch.letterIsAfterInOctave(newPitch.letter);

    return newPitch;
  }

  /**
   * @returns {string}
   */
  toString() {
    return `${this.letter}${accidentalToString(this.accidental) ?? ""}${
      this.octave
    }`;
  }

  /**
   * @returns {string}
   */
  toText() {
    return `${this.letter}${accidentalToText(this.accidental) ?? ""}${
      this.octave
    }`;
  }

  /**
   * Represents the pitch in displayed text without the octave.
   *
   * @returns {string}
   */
  toTextName() {
    return `${this.letter}${accidentalToText(this.accidental) ?? ""}`;
  }

  /**
   * Returns the letter and octave of the pitch as a string.
   *
   * @returns {string}
   */
  toSpace() {
    return `${this.letter}${this.octave}`;
  }

  /**
   * Returns the letter and accidental of the pitch as a string.
   *
   * @returns {string}
   */
  toName() {
    return `${this.letter}${accidentalToString(this.accidental)}`;
  }

  // 'key' by the terminology of VexFlow, as in `new StaveNote({keys: ['C/4', ...], ...})`
  toVF() {
    return `${this.letter}${accidentalToString(this.accidental)}/${
      this.octave
    }`;
  }

  // EasyScore notation
  toVFEasy() {
    return `${this.letter}${accidentalToString(this.accidental)}${this.octave}`;
  }

  alter(steps) {}

  raise(steps) {}

  lower(steps) {}

  static halfstepsToNextLetter(letter) {
    return "BE".includes(letter) ? 1 : 2;
  }

  static halfstepsToPrevLetter(letter) {
    return "CF".includes(letter) ? 1 : 2;
  }

  /**
   * Counts both the number of halfsteps to reach another letter and the simple interval size from pitch letter only.
   *
   * @param {Pitch} other
   * @returns {{ halfsteps: number, spaces: number }} Neither count includes the starting pitch.
   */
  #countTo(other) {
    let halfsteps = 0;
    let spaces = 0;

    let i = A_OCTAVE.indexOf(this.letter);
    while (A_OCTAVE[i] !== other.letter) {
      halfsteps += Pitch.halfstepsToNextLetter(A_OCTAVE[i]);
      spaces += 1;
      i = (i + 1) % 7;
    }
    spaces +=
      (other.octave - this.octave - this.letterIsAfterInOctave(other)) * 7;

    return { halfsteps: halfsteps, spaces: spaces };
  }

  /**
   * @param {string | Pitch} other
   * @returns {boolean}
   */
  static prevLetterInOctave(other) {
    if (typeof other === "object") other = other.letter;
    // Modify via ASCII, but check for end of loop
    return other === "A" ? "G" : String.fromCharCode(other.charCodeAt(0) - 1);
  }

  /**
   * @param {string | Pitch} letter
   * @returns {boolean}
   */
  static nextLetterInOctave(letter) {
    if (typeof letter === "object") other = other.letter;
    // Modify via ASCII, but check for end of loop
    return letter === "G" ? "A" : String.fromCharCode(letter.charCodeAt(0) + 1);
  }

  /**
   * Finds whether this pitch's letter falls before another's in the octave from C.
   *
   * @param {string | Pitch} other
   * @returns {boolean}
   */
  letterIsBeforeInOctave(other) {
    if (typeof other === "object") other = other.letter;
    const thisIndex = C_OCTAVE.indexOf(this.letter);
    const otherIndex = C_OCTAVE.indexOf(other);
    console.assert(thisIndex > -1 && otherIndex > -1);

    return thisIndex < otherIndex;
  }

  /**
   * Finds whether this pitch's letter falls after another's in the octave from C.
   *
   * @param {string | Pitch} other
   * @returns {boolean}
   */
  letterIsAfterInOctave(other) {
    if (typeof other === "object") other = other.letter;
    const thisIndex = C_OCTAVE.indexOf(this.letter);
    const otherIndex = C_OCTAVE.indexOf(other);
    console.assert(thisIndex > -1 && otherIndex > -1);

    return thisIndex > otherIndex;
  }

  /**
   * Finds whether this pitch and another share the same letter and octave.
   *
   * @param {Pitch} other
   * @returns {boolean | undefined}
   */
  isSameSpaceAs(other) {
    if (!other) return;
    return this.letter === other.letter && this.octave === other.octave;
  }

  /**
   * Finds whether this pitch and another share the same letter and accidental.
   *
   * @param {Pitch} other
   * @returns {boolean | undefined}
   */
  isSameNameAs(other) {
    if (!other) return;
    return this.letter === other.letter && this.accidental === other.accidental;
  }

  /**
   * Finds whether this pitch and another are enharmonic.
   *
   * @param {Pitch} other
   * @returns {boolean}
   */
  isEnharmonicTo(other) {
    if (!other) return;
    return (
      this.#countTo(other).halfsteps === this.accidental - other.accidental
    );
  }

  /**
   * Finds whether this pitch is lower than another.
   *
   * @param {Pitch} other
   * @param {boolean} considerAccidentals Whether or not to keep accidentals in the determination.
   * @returns {boolean}
   */
  isLowerThan(other, considerAccidentals = true) {
    if (considerAccidentals) return this.halfstepsTo(other) > 0;
    else
      return (
        this.octave < other.octave ||
        (this.octave === other.octave && this.letterIsBeforeInOctave(other))
      );
  }

  /**
   * Finds whether this pitch is higher than another.
   *
   * @param {Pitch} other
   * @param {boolean} considerAccidentals Whether or not to keep accidentals in the determination.
   * @returns {boolean}
   */
  isHigherThan(other, considerAccidentals = true) {
    if (considerAccidentals) return this.halfstepsTo(other) < 0;
    else
      return (
        this.octave > other.octave ||
        (this.octave === other.octave && this.letterIsAfterInOctave(other))
      );
  }

  /**
   * Counts the number of halfsteps up to reach another pitch. The start pitch is excluded from the count.
   *
   * @param {Pitch} other The end pitch.
   * @returns {number} Number of halfsteps up, or down if negative.
   */
  halfstepsTo(other) {
    if (this.isHigherThan(other, false)) {
      return -other.halfstepsTo(this);
    }

    const halfsteps =
      this.#countTo(other).halfsteps +
      (other.octave - this.octave - this.letterIsAfterInOctave(other)) * 11 +
      (other.accidental - this.accidental);

    return halfsteps;
  }

  /**
   * Counts the number of spaces (and lines) up to reach another pitch. The start pitch is excluded from the count.
   *
   * @param {Pitch} other The end pitch.
   * @returns {number} Number of spaces up, or down if negative.
   */
  spacesTo(other) {
    if (this.isHigherThan(other, false)) {
      return -other.spacesTo(this);
    }

    const spaces = this.#countTo(other).spaces;

    return spaces;
  }

  /**
   * Finds the requested scale tone of the major scale of the current pitch.
   *
   * @param {number} n Degree of the scale.
   * @returns {Pitch}
   */
  scaleTone(n) {
    let l = A_OCTAVE.indexOf(this.letter);
    const newLetter = A_OCTAVE[(l + n - 1) % 7];
    let newAccidental = this.accidental;
    for (let i = 0; i < n - 1; i++) {
      // When the note passes from B to C or E to F, the accidental would heighten to make a full whole step.
      if (Pitch.halfstepsToNextLetter(A_OCTAVE[(l + i) % 7]) === 1) {
        newAccidental++;
      }
    }
    // Reduce the accidental per halfstep step in the scale
    // Two notes per complete octave are only a halfstep away
    newAccidental -= 2 * Math.floor((n - 1) / 7);
    // In the last octave, the fourth note of each tetrachord is only a halfstep away
    newAccidental -= Math.floor((((n - 1) % 7) + 1) / 4);
    const newOctave =
      this.octave +
      Math.floor((n - 1) / 7) +
      this.letterIsAfterInOctave(newLetter);

    return new Pitch(newLetter, newAccidental, newOctave);
  }

  /**
   * Generates the diatonic scale spanning an octave from the current pitch.
   *
   * @param {number} modeNumber 0-based ordinal of the mode.
   * @returns {Array<Pitch>}
   */
  scale(modeNumber = 0) {
    const pitches = [];
    pitches.push(this);

    let l = A_OCTAVE.indexOf(this.letter);
    for (let i = 1; i < 8; i++) {
      const newPitch = new Pitch(A_OCTAVE[(l + i) % 7], 0, this.octave);

      newPitch.octave += !this.letterIsBeforeInOctave(newPitch);

      newPitch.accidental +=
        MAJOR_SIMPLE_INTERVAL_HALFSTEP_COUNTS[(modeNumber + i - 1) % 7] -
        pitches.at(-1).halfstepsTo(newPitch);

      pitches.push(newPitch);
    }

    // console.log(pitches);
    return pitches;
  }

  /**
   * Finds the interval between two pitches.
   *
   * @param {Pitch} other
   * @returns {Interval}
   */
  interval(other) {
    if (this.isHigherThan(other)) {
      return other.interval(this);
    }

    const intervalSize = this.#countTo(other).spaces + 1;

    const baseScaleTone = this.scaleTone(intervalSize);
    const accidental = other.accidental - baseScaleTone.accidental;
    const intervalQuality = Interval.accidentalToQuality(
      accidental,
      intervalSize,
    );

    return new Interval(intervalQuality, intervalSize);
  }
}
