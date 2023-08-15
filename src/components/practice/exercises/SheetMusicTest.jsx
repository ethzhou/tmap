import { useEffect } from "react";
import { Vex } from "vexflow";
import SingleChord from "../../music/SingleChord";
import Pitch from "../../../classes/Pitch";

export default function SheetMusicTest() {
  useEffect(() => {
    const VF = Vex.Flow;

    // Create an SVG renderer and attach it to the DIV element named "boo".
    var vf = new VF.Factory({renderer: {elementId: 'boo', width: 500, height: 300}});

    var score = vf.EasyScore();
    var system = vf.System();

    system.addStave({
      voices: [
        score.voice(score.notes('C#5/q, B4, A4, G#4', {stem: 'up'})),
        score.voice(score.notes('C#4/h, C#4', {stem: 'down'}))
      ]
    }).addClef('treble').addTimeSignature('4/4');

    system.addStave({
      voices: [
        score.voice(score.notes('C#3/q, B2, A2/8, B2, C#3, D3', {clef: 'bass', stem: 'up'})),
        score.voice(score.notes('C#2/h, C#2', {clef: 'bass', stem: 'down'}))
      ]
    }).addClef('bass').addTimeSignature('4/4');

    system.addConnector();

    vf.draw();
  }, []);

  return (
    <>
      <h1>Sheet Music Test</h1>
      <div id="boo"></div>
      <SingleChord
        name="chord1"
        clef="treble"
        notes={[
          Pitch.fromString('c4'),
          Pitch.fromString('e4'),
          Pitch.fromString('g4')
        ]}
      />
      <SingleChord
        name="chord2"
        clef="bass"
        notes={[
          Pitch.fromString('f4'),
          Pitch.fromString('a4'),
          Pitch.fromString('c4')
        ]}
      />
    </>
  );
}