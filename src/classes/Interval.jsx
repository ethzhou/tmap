import { randInt } from "../utils/utils";

export default class Interval {
  /**
   * @param {string} quality
   * @param {number} size
   */
  constructor(quality, size) {
    this.quality = quality;
    this.size = size;
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
    if (typeof size === "object")
      size = size.size;
    return [1, 4, 5, 8].includes(size);
  }

  /**
   * Generates a random interval quality given an interval size.
   * 
   * @param {number} size
   * @param {number} baseAccidental The accidental of the major interval whose specification avoids triple accidentals. For instance, a diminished third above Gb would be Bbbb; specifying baseAccidental = 1 in this case disallows the random selection of the diminished quality.
   * @returns {string}
   */
  static randomQuality(size, baseAccidental = 0) {
    return Interval.isPerfect(size) ? "dPA"[
      randInt(
        size === 1 ? 1 : 0,
        2
      )
    ] : "dmMA"[
      randInt(
        baseAccidental === -1 ? 1 : 0,
        3
      )
    ];
  }

  /**
   * Finds the accidental change corresponding to the size and quality of an interval.
   * 
   * @param {string} quality
   * @param {number} size Size of the hypothetical interval.
   * @returns {number}
   */
  static qualityToAccidentalChange(quality, size) {
    return Interval.isPerfect(size) ? (
      quality === "d" ? -1
        : quality === "P" ? 0
        : quality === "A" ? 1
        : "?"
    ) : (
      quality === "d" ? -2
        : quality === "m" ? -1
        : quality === "M" ? 0
        : quality === "A" ? 1
        : "?"
    );
  }

  /**
   * Finds the quality corresponding to an interval size and accidental change.
   * 
   * @param {number} change Change in accidental.
   * @param {number} size Size of the hypothetical interval.
   * @returns {number}
   */
  static accidentalChangeToQuality(change, size) {
    return Interval.isPerfect(size) ? (
      change === -1 ? "d"
        : change === 0 ? "P"
        : change === 1 ? "A"
        : "?"
    ) : (
      change === -2 ? "d"
        : change === -1 ? "m"
        : change === 0 ? "M"
        : change === 1 ? "A"
        : "?"
    );
  }

  isEnharmonicTo(otherInterval) {
    // TODO
  }
}