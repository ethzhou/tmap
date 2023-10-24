import ErrorDisplay from "../components/practice/exercises/four-part-harmony/ErrorDisplay";

export default class ProgressionError {
  /**
   * @param {string} type The type of error.
   * @param {Array<{ i: number, voices: Array<number> }>} concerns The relevant notes.
   */
  constructor(type, concerns) {
    this.type = type;
    this.concerns = concerns;
  }

  toElement() {
    // return `${this.type} at ${this.concerns.map(concern => `${concern.i}:${concern.voices}`).join(" ")}`;
    return <ErrorDisplay progressionError={this} />;
  }
}
