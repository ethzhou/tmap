export const COLOR_CHORD_SELECT = "#db2777";

export function clamp(x, lower, upper) {
  return Math.max(lower, Math.min(x, upper));
}

export function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Compose a two-dimensional index into one-dimension (row-major).
 *
 * @param {Array<number>} i The row and column.
 * @param {number} rowLength
 * @param {boolean} fromOne Whether input and output indices count are 1-based (otherwise 0-based).
 * @returns {number} The index.
 */
export function composeIndex(I, rowLength, fromOne = false) {
  const index = rowLength * (I[0] - fromOne) + I[1];

  return index;
}

/**
 * Decompose a one-dimensional (row-major) index into two-dimensions.
 *
 * @param {number} i The index.
 * @param {number} rowLength
 * @param {boolean} fromOne Whether input and output indices count are 1-based (otherwise 0-based).
 * @returns {Array<number>} The row and column.
 */
export function decomposeIndex(i, rowLength, fromOne = false) {
  const rowIndex = Math.floor((i - fromOne) / rowLength) + fromOne;
  const columnIndex = ((i + rowLength - fromOne) % rowLength) + fromOne;

  return [rowIndex, columnIndex];
}

/**
 * Casts the first character of a string to upper case.
 *
 * @param {string} string
 * @returns {string}
 */
export function capitalize(s) {
  return s && s[0].toUpperCase() + s.slice(1);
}

/**
 * Convert the name of an attribute into a prop key.
 *
 * @param {string} attributeName
 * @returns {string}
 */
export function attributeToProp(attributeName) {
  return attributeName.replaceAll(/-[a-z]/g, substring =>
    substring[1].toUpperCase(),
  );
}
