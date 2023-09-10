export const COLOR_CHORD_SELECT = "#f00";

export function clamp(x, lower, upper) {
  return Math.max(lower, Math.min(x, upper));
}

export function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Compose a two-dimensional index into one-dimension (row-major).
 * 
 * @param {Array<number>[2]} i The row and column.
 * @param {number} rowLength
 * @param {boolean} fromOne Whether input and output indices count are 1-based (otherwise 0-based).
 * @returns {number} The index.
 */
export function composeIndex(I, rowLength, fromOne) {
  const index = rowLength * (I[0] - fromOne) + I[1];

  return index;
}

/**
 * Decompose a one-dimensional (row-major) index into two-dimensions.
 * 
 * @param {number} i The index.
 * @param {number} rowLength
 * @param {boolean} fromOne Whether input and output indices count are 1-based (otherwise 0-based).
 * @returns {Array<number>[2]} The row and column.
 */
export function decomposeIndex(i, rowLength, fromOne = false) {
  const rowIndex = Math.floor((i - fromOne) / rowLength) + fromOne;
  const columnIndex = (i + rowLength - fromOne) % rowLength + fromOne;

  return [rowIndex, columnIndex];
}
