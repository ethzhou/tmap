import { Route, Routes } from "react-router";
import PracticePage from '../components/practice/PracticePage';
import Exercise from '../components/practice/Exercise';
import PracticeLayout from '../components/practice/PracticeLayout';
import IntervalReading from "../components/practice/exercises/IntervalReading";

export default function PracticeRoutes() {
  return (
    <>
      <Routes>
        <Route element={<PracticeLayout />}>
          <Route index element={<PracticePage />} />
          <Route path='interval-reading' element={<IntervalReading />} />
          <Route path=':exerciseID' element={<Exercise />} />
        </Route>
      </Routes>
    </>
  );
}