export default class ProgressionError {
  /**
   * @param {string} type The type of error.
   * @param {Array<Object>} selections The relevant notes.
   */
  constructor(type, selections) {
    this.type = type;
    this.selections = selections;
  }

  toElement() {
    return `${this.type} at ${this.selections.map(selection => `${selection.i}:${selection.voices}`).join(" ")}`;
  }
}