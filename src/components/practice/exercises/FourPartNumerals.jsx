import Pitch from "../../../classes/Pitch";
import useExercise from "../../../hooks/useExercise";
import FourPartProgression from "../../music/FourPartProgression";

function f(s) {
  return s.split(" ").map(e => Pitch.fromString(e));
}

export default function FourPartNumerals() {
  const { parameters, totalSeconds, record } = useExercise(

  );

  const parts = {
    soprano: f("C5 D5 F5 A5"),
    alto: f("E4 D4 C4 B3"),
    tenor: f("G3 A3 F3 D3"),
    bass: f("C2 F2 F2 G2"),
  };

  return (
    <>
      <FourPartProgression parts={parts} keySignature="Cb" timeSignature="4/4" chordsPerMeasure={4} />
      <div></div>
    </>
  )
}