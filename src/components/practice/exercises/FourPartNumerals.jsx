import Pitch from "../../../classes/Pitch";
import useExercise from "../../../hooks/useExercise";
import FourPartProgression from "../../music/FourPartProgression";

function f(s) {
  return s.split(" ").filter(item => item !== "").map(e => e === "r" ? null : Pitch.fromString(e));
}
const parts = {
  soprano: f("C5  D5  E6  r   B5  C5  D#5 D5  E6  D#5 D5  E6  r   B5  C5  C5  D5  E6"),
  alto:    f("E4  F#3 F#3 E4  E4  E4  D#5 D#5 D#5 D5  F#3 F#3 E4  E4  E4  E4  F#3 F3"),
  tenor:   f("G3  Ab4 F3  A4  E3  D3  G3  Ab4 F3  G3  Ab4 F3  A4  E3  D3  G3  Ab4 F3"),
  bass:    f("C2  F2  F2  G1  E2  F2  C2  F2  F2  C2  F2  F2  G1  E2  F2  C2  F2  F2"),
};

export default function FourPartNumerals() {



  return (
    <>
      <FourPartProgression parts={parts} keySignature="Ab" timeSignature="5/4" chordsPerMeasure={5} />
      <div></div>
    </>
  )
}