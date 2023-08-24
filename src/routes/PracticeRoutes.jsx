import { Route, Routes } from "react-router";
import PracticePage from '../components/practice/PracticePage';
import Exercise from '../components/practice/Exercise';
import PracticeLayout from '../components/practice/PracticeLayout';
import IntervalReading from "../components/practice/exercises/IntervalReading";
import IntervalDictation from "../components/practice/exercises/IntervalDictation";
import FourPartNumerals from "../components/practice/exercises/FourPartNumerals";

export default function PracticeRoutes() {
  return (
    <>
      <Routes>
        <Route element={<PracticeLayout />}>
          <Route index element={<PracticePage />} />
          <Route path='interval-reading' element={<IntervalReading />} />
          <Route path='interval-dictation' element={<IntervalDictation />} />
          <Route path='four-part-numerals' element={<FourPartNumerals />} />
          <Route path=':exerciseID' element={<Exercise />} />
        </Route>
      </Routes>
    </>
  );
}