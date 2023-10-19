import { Route, Routes } from "react-router";
import PracticePage from "../practice/PracticePage";
import PracticeLayout from "../practice/PracticeLayout";
import IntervalReading from "../practice/exercises/IntervalReading";
import IntervalDictation from "../practice/exercises/IntervalDictation";
import FourPartHarmony from "../practice/exercises/FourPartHarmony";

export default function PracticeRoutes() {
  return (
    <>
      <Routes>
        <Route element={<PracticeLayout />}>
          <Route index element={<PracticePage />} />
          <Route path="interval-reading" element={<IntervalReading />} />
          <Route path="interval-dictation" element={<IntervalDictation />} />
          <Route path="four-part-harmony" element={<FourPartHarmony />} />
        </Route>
      </Routes>
    </>
  );
}
