import { MAJOR_SIMPLE_INTERVAL_HALFSTEP_COUNTS } from "../utils/musicUtils";
import { clamp, randInt } from "../utils/utils";

/**
 * @typedef {"d" | "m" | "M" | "A" | "P"} Quality
 */

export default class Interval {
  /**
   * @param {Quality} quality
   * @param {number} size
   */
  constructor(quality, size) {
    this.quality = quality;
    this.size = size;
  }

  /**
   * @param {number} value
   */
  set size(value) {
    this._size = value;
    this.simple = ((value - 1) % 7) + 1;
    if (this.simple === 1) this.simple = value === 1 ? 1 : 8;
  }

  get size() {
    return this._size;
  }

  /**
   * Constructs a interval from string notation.
   *
   * @param {string} strRepresentation For example, "m7" or "A4".
   * @returns {Interval}
   */
  static fromString(strRepresentation) {
    const quality = strRepresentation[0];
    const size = strRepresentation[1];

    return new Interval(quality, size);
  }

  toString() {
    return this.quality + this.size;
  }

  /**
   * Determines whether an interval size is perfect.
   *
   * @param {number | Interval} size
   * @returns {boolean}
   */
  static isPerfect(size) {
    if (typeof size === "object") size = size.size;

    return [1, 4, 5].includes(((size - 1) % 7) + 1);
  }

  /**
   * Generates a random interval quality given an interval size, avoiding triple accidentals and beyond.
   *
   * @param {number} size
   * @param {number} baseAccidental The accidental of the major interval whose specification avoids excessive accidentals. For instance, a diminished third above Gb would be Bbbb; specifying baseAccidental = 1 in this case disallows the random selection of the diminished quality.
   * @returns {Quality}
   */
  static randomQuality(size, baseAccidental = 0) {
    return Interval.isPerfect(size)
      ? "dPA"[
          randInt(
            clamp(-1 - baseAccidental, size === 1 ? 1 : 0, 2),
            clamp(3 - baseAccidental, 0, 2),
          )
        ]
      : "dmMA"[
          randInt(clamp(-baseAccidental, 0, 3), clamp(4 - baseAccidental, 0, 3))
        ];
  }

  /**
   * Finds the accidental corresponding to the size and quality of an interval.
   *
   * @param {Quality} quality
   * @param {number} size Size of the hypothetical interval.
   * @returns {number}
   */
  static qualityToAccidental(quality, size) {
    return Interval.isPerfect(size)
      ? quality === "d"
        ? -1
        : quality === "P"
        ? 0
        : quality === "A"
        ? 1
        : "?"
      : quality === "d"
      ? -2
      : quality === "m"
      ? -1
      : quality === "M"
      ? 0
      : quality === "A"
      ? 1
      : "?";
  }

  /**
   * Finds the quality corresponding to an interval size and accidental.
   *
   * @param {number} change Change in accidental.
   * @param {number} size Size of the hypothetical interval.
   * @returns {Quality}
   */
  static accidentalToQuality(change, size) {
    return Interval.isPerfect(size)
      ? change === -1
        ? "d"
        : change === 0
        ? "P"
        : change === 1
        ? "A"
        : "?"
      : change === -2
      ? "d"
      : change === -1
      ? "m"
      : change === 0
      ? "M"
      : change === 1
      ? "A"
      : "?";
  }

  /**
   * Counts the halfsteps lept by the interval.
   *
   * @returns {number}
   */
  halfsteps() {
    const halfsteps =
      (this.size === 8
        ? 1
        : MAJOR_SIMPLE_INTERVAL_HALFSTEP_COUNTS[this.simple - 1]) +
      Math.floor((this.size - 1) / 7) * 11 +
      Interval.qualityToAccidental(this.quality, this.size);

    return halfsteps;
  }

  /**
   * Finds the difference in the number of halfsteps of each interval.
   *
   * @param {Interval} otherInterval
   * @returns {number}
   */
  halfstepDifference(otherInterval) {
    return otherInterval.halfsteps() - this.halfsteps();
  }

  /**
   * Finds whether the other interval is enharmonic.
   *
   * @param {Interval} otherInterval
   * @param {boolean} simple Whether to evaluate the simple intervals.
   * @returns {boolean}
   */
  isEnharmonicTo(otherInterval, simple = false) {
    return simple
      ? this.halfstepDifference(otherInterval) % 11 === 0
      : this.halfstepDifference(otherInterval) === 0;
  }
}
