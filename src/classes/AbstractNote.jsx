export const Accidentals = Object.freeze({
  FLAT: "b",
  NATURAL: "",
  SHARP: "#",
})

export default class AbstractNote {
  constructor(letter, accidental, octave) {
    this.letter = letter.toLowerCase();
    this.accidental = accidental;
    this.octave = octave;
  }

  // construction from an integer representing spacing away from middle C
  static fromInt(integer, accidental=Accidentals.NATURAL) {
    const octave = 4 + Math.floor(integer / 7);
    const letter = "ABCDEFG"[(((2 + integer) % 7) + 7) % 7];
    console.log(
      integer,
      octave,
      (((2 + integer) % 7) + 7) % 7,
      letter
    );

    return new AbstractNote(letter, accidental, octave);
  }  

  static fromString(strRepresentation) {
    const letter = strRepresentation[0];
    const accidental = strRepresentation[1] === 'b' ? Accidentals.FLAT
      : strRepresentation[1] === '#' ? Accidentals.SHARP
      : Accidentals.NATURAL;
    const octave = strRepresentation.slice(accidental === Accidentals.NATURAL ? 1 : 2);

    return new AbstractNote(letter, accidental, octave);
  }

  toString() {
    let accidentalSymbol = this.accidental === Accidentals.FLAT ? "b"
      : this.accidental === Accidentals.NATURAL ? ""
      : "#";
    return this.letter + this.octave + accidentalSymbol;
  }

  // 'key' by the terminology of VexFlow, as in `new StaveNote({keys: ['c/4', ...], ...})`
  toKey() {
    return `${this.letter}/${this.octave}`;
  }

  // EasyScore notation
  toEasy() {
    return `${this.letter.toUpperCase()}${this.accidental}${this.octave}`;
  }

  intervalTo(otherNote) {
    let steps = 0;
    let size = 1;
    let i = "ABCDEFG".indexOf(this.letter);
    while ("ABCDEFG"[i] !== otherNote.letter) {
      steps += ("BE".indexOf("ABCDEFG"[i]) > -1) ? 1
        : 2;
      size += 1;
      i = (i + 1) % 7;
    }
    const intervalSize = (size === 1) ? (this.octave === otherNote.octave ? 1 : 8) : size;

    const qualityStepsMatrix = [
      [0]
    const intervalQuality = ;
  }
}