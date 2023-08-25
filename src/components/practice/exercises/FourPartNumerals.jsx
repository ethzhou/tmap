import Pitch from "../../../classes/Pitch";
import useExercise from "../../../hooks/useExercise";
import FourPartProgression from "../../music/FourPartProgression";

function f(s) {
  return s.split(" ").map(e => e === "r" ? null : Pitch.fromString(e));
}

export default function FourPartNumerals() {
  const { parameters, totalSeconds, record } = useExercise(

  );

  const parts = {
    soprano: f("C5 D5 E6 r B5 C5 C5 D5 E6"),
    alto: f("E4 F#3 F3 E4 G4 F4 E4 F#3 F3"),
    tenor: f("G3 Ab4 F3 A4 E3 D3 G3 Ab4 F3"),
    bass: f("C2 F2 F2 G1 E2 F2 C2 F2 F2"),
  };

  return (
    <>
      <FourPartProgression parts={parts} keySignature="Ab" timeSignature="2/4" chordsPerMeasure={2} />
      <div></div>
    </>
  )
}