import Interval from "./Interval";

export function accidentalString(accidental) {
  return (accidental < 0 ? "b" : "#").repeat(Math.abs(accidental));
}

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
    const letter = "ABCDEFG"[(((2 + spacesFromC4) % 7) + 7) % 7];
    
    // console.log(spacesFromC4, octave, (((2 + spacesFromC4) % 7) + 7) % 7, letter);
    return new Pitch(letter, accidental, octave);
  }

  /**
   * Constructs a pitch from string notation.
   * 
   * @param {string} strRepresentation For example, "C#4" or "D5".
   * @returns {Pitch}
   */
  static fromString(strRepresentation) {
    const letter = strRepresentation[0].toUpperCase();
    const accidental = strRepresentation[1] === "b" ? (strRepresentation[2] === "b" ? -2 : -1)
      : strRepresentation[1] === "#" ? (strRepresentation[2] === "#" ? 2 : 1)
      : strRepresentation[1] === "x" ? 2
      : 0;
    const octave = Number(strRepresentation.slice(1 + accidental.length));

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
    newPitch.accidental += Interval.qualityToAccidentalChange(interval.quality, interval.size);
    newPitch.octave += Math.floor((interval.size - 1) / 7) + pitch.letterIsAfterInOctave(letter);

    return newPitch;
  }

  toString() {
    return `${this.letter}${accidentalString(this.accidental)}${this.octave}`;
  }

  // 'key' by the terminology of VexFlow, as in `new StaveNote({keys: ['C/4', ...], ...})`
  toVFKey() {
    return `${this.letter}/${this.octave}`;
  }

  // EasyScore notation
  toVFEasy() {
    return `${this.letter}${accidentalString(this.accidental)}${this.octave}`;
  }

  alter(steps) {

  }

  raise(steps) {
    
  }

  lower(steps) {

  }

  static #halfstepsToNextLetter(letter) {
    return "BE".includes(letter) ? 1 : 2;
  }
  
  static #halfstepsToPrevLetter(letter) {
    return "CF".includes(letter) ? 1 : 2;
  }

  /**
   * Counts both the number of halfsteps to reach another letter and the simple interval size from pitch letter only.
   * 
   * @param {Pitch} otherPitch
   * @returns {object} The two counts.
   * @returns {number} halfsteps
   * @returns {number} intervalSize
   */
  #countToLetter(otherPitch) {
    let halfsteps = 0;
    let intervalSize = 0;
    let i = "ABCDEFG".indexOf(this.letter);
    while ("ABCDEFG"[i] !== otherPitch.letter) {
      halfsteps += Pitch.#halfstepsToNextLetter("ABCDEFG"[i]);
      intervalSize += 1;
      i = (i + 1) % 7;
    }
    
    return { halfsteps: halfsteps, intervalSize: intervalSize };
  }

  /**
   * Finds whether this pitch's letter falls before another's in the octave from C.
   * 
   * @param {string, Pitch} other
   * @returns {boolean}
   */
  letterIsBeforeInOctave(other) {
    if (typeof other === "object")
      other = other.letter;
    const thisIndex = "CDEFGAB".indexOf(this.letter);
    const otherIndex = "CDEFGAB".indexOf(other);
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
    if (typeof other === "object")
      other = other.letter;
    const thisIndex = "CDEFGAB".indexOf(this.letter);
    const otherIndex = "CDEFGAB".indexOf(other);
    console.assert(thisIndex > -1 && otherIndex > -1);

    return thisIndex > otherIndex;
  }

  /**
   * Finds whether this pitch and another are enharmonic.
   * 
   * @param {string | Pitch} other 
   * @returns {boolean}
   */
  isEnharmonicTo(otherPitch) {
    return this.#countToLetter(otherPitch).halfsteps === this.accidental - otherPitch.accidental;
  }
  
  /**
   * Finds whether this pitch is lower than another.
   * 
   * @param {Pitch} otherPitch
   * @param {boolean} considerAccidentals Whether or not to keep accidentals in the determination.
   * @returns {boolean}
   */
  isLowerThan(otherPitch, considerAccidentals = true) {
    if (considerAccidentals)
      return this.halfstepsTo(otherPitch) < 0;
    else
      return this.octave < otherPitch.octave
        || (this.octave === otherPitch.octave
          && this.letterIsBeforeInOctave(otherPitch));
  }
  
  /**
   * Finds whether this pitch is higher than another.
   * 
   * @param {Pitch} otherPitch
   * @param {boolean} considerAccidentals Whether or not to keep accidentals in the determination.
   * @returns {boolean}
   */
  isHigherThan(otherPitch, considerAccidentals = true) {
    if (considerAccidentals)
      return this.halfstepsTo(otherPitch) > 0;
    else
      return this.octave > otherPitch.octave
        || (this.octave === otherPitch.octave
          && this.letterIsAfterInOctave(otherPitch));
  }

  /**
   * Counts the number of halfsteps up to reach another pitch.
   * 
   * @param {Pitch} otherPitch The end pitch.
   * @returns {number} Number of halfsteps up, or down if negative.
   */
  halfstepsTo(otherPitch) {
    if (this.isHigherThan(otherPitch, false)) {
      return -otherPitch.halfstepsTo(this);
    }

    const { halfsteps } = this.#countToLetter(otherPitch);
      + (otherPitch.octave - this.octave) * 11;
      + (otherPitch.accidental - this.accidental);

    return halfsteps;
  }

  /**
   * Finds the requested scale tone of the major scale of the current pitch. 
   * 
   * @param {number} n Degree of the scale.
   * @returns {Pitch}
   */
  scaleTone(n) {
    let l = "ABCDEFG".indexOf(this.letter);
    const newLetter = "ABCDEFG"[(l + n - 1) % 7];
    console.log(" scaleTone", this.letter, n, newLetter);
    let newAccidental = this.accidental;
    for (let i = 0; i < n - 1; i++) {
      console.log("ABCDEFG"[(l + i) % 7], Pitch.#halfstepsToNextLetter("ABCDEFG"[(l + i) % 7]));
      // When the note passes from B to C or E to F, the accidental would heighten to make a full whole step.
      if (Pitch.#halfstepsToNextLetter("ABCDEFG"[(l + i) % 7]) === 1) {
        newAccidental++;
      }
    }
    // The fourth note of every tetrachord is only a halfstep away, so the accidental is reduced.
    newAccidental -= Math.floor(n / 4);
    const newOctave = this.octave + Math.floor((n - 1) / 7) + this.letterIsAfterInOctave(newLetter);

    console.log("/scaleTone", this.toString(), `M${n}`, new Pitch(newLetter, newAccidental, newOctave).toString());
    return new Pitch(newLetter, newAccidental, newOctave);
  }

  /**
   * Finds the interval between two pitches.
   * 
   * @param {Pitch} otherPitch 
   * @returns {Interval} Simple interval.
   */
  interval(otherPitch) {
    let { intervalSize } = this.#countToLetter(otherPitch);
    intervalSize = (size === 1) ? (this.octave === otherPitch.octave ? 1 : 8) : size;

    const baseScaleTone = this.scaleTone(intervalSize);
    const accidentalChange = otherPitch.accidental - baseScaleTone.accidental;
    const intervalQuality = Interval.accidentalChangeToQuality(accidentalChange, intervalSize);

    return new Interval(intervalQuality, intervalSize);
  }
}