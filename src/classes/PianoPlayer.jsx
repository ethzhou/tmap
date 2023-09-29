import { SplendidGrandPiano, Soundfont, Reverb } from "smplr";
import Pitch from "./Pitch";

export default class PianoPlayer {
  constructor() {
    this.context = new AudioContext();
    this.piano = new SplendidGrandPiano(this.context);
  }

  /**
   * Stops the piano playback.
   */
  stop() {
    this.piano.stop();
  }

  /**
   * Plays a note.
   * 
   * @param {Pitch} pitch
   * @param {number} duration Duration in seconds.
   */
  playNote(pitch, duration) {
    this.piano.start({
      note: pitch.toString(),
      duration,
    });
  }

  /**
   * Plays notes.
   * 
   * @param {Array<Pitch>} pitches
   * @param {number} notePlayDuration Duration in seconds.
   * @param {number} spacing Time between the start of each pitch. Measured in seconds.
   * @param {boolean} doStop Whether to first stop other audio from this player.
   */
  playNotes(pitches, notePlayDuration, spacing = 0, doStop = false) {
    if (doStop)
      this.piano.stop();
    this.piano.loaded().then(piano => {
      const currentTime = this.context.currentTime;
      pitches.forEach((pitch, i) => {
        piano.start({
          note: pitch.toString(),
          duration: notePlayDuration,
          time: currentTime + i * spacing,
        });
      });
    });
  }

  /**
   * 
   * @param {Array<Array<Pitch>>} parts
   * @param {number} notePlayDuration Duration of each chord's notes in seconds.
   * @param {*} spacing Time between the start of each pitch. Measured in seconds.
   * @param {*} doStop Whether to first stop other audio from this player.
   */
  playParts(parts, notePlayDuration, spacing = 0, doStop = false) {
    if (doStop)
      this.piano.stop();
    this.piano.loaded().then(piano => {
      const chords = parts[0].map((_, i) => 
      parts.map(part => part[i])
      );
      const currentTime = this.context.currentTime;
      chords.forEach((chord, i) => {
        chord.forEach((pitch) => {
          if (!pitch)
            return;
          piano.start({
            note: pitch.toString(),
            duration: notePlayDuration,
            time: currentTime + i * spacing,
          });
        });
      });
    });
  }
}