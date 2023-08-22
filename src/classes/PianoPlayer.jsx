import { SplendidGrandPiano, Soundfont } from "smplr";
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
   * @param {number} durations Duration in seconds.
   * @param {number} spacing Time between the start of each pitch. Measured in seconds.
   */
  playNotes(pitches, duration, spacing = 0) {
    const currentTime = this.context.currentTime;
    pitches.forEach((pitch, i) => {
      this.piano.start({
        note: pitch.toString(),
        duration,
        time: currentTime + i * spacing,
      });
    });
  }
}