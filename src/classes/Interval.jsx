export default class Interval {
  constructor(quality, size) {
    this.quality = quality;
    this.size = size;
  }

  /**
   * Finds the accidental difference corresponding to the size and quality of an interval.
   * 
   * @param {number} size Size of the hypothetical interval.
   * @param {string} quality
   * @returns {number}
   */
  static qualityToAccidentalDifference(quality, size) {
    return [1, 4, 5, 8].includes(size) ? (
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
   * Finds the quality corresponding to an interval size and accidental difference.
   * 
   * @param {number} size Size of the hypothetical interval.
   * @param {number} difference Difference in accidentals.
   * @returns {number}
   */
  static accidentalDifferenceToQuality(difference, size) {
    return [1, 4, 5, 8].includes(size) ? (
      difference === -1 ? "d"
        : difference === 0 ? "P"
        : difference === 1 ? "A"
        : "?"
    ) : (
      difference === -2 ? "d"
        : difference === -1 ? "m"
        : difference === 0 ? "M"
        : difference === 1 ? "A"
        : "?"
    );
  }

  isEnharmonicTo(otherInterval) {
    // TODO
  }
}