import { Routes, Route } from "react-router";
import LearnPage from '../components/learn/LearnPage';
import Lesson from '../components/learn/Lesson';
import LearnLayout from '../components/learn/LearnLayout';

export default function LearnRoutes() {
  return (
    <>
      <Routes>
        <Route element={<LearnLayout />}>
          <Route index element={<LearnPage />} />
          <Route path=':lessonID' element={<Lesson />} />
        </Route>
      </Routes>
    </>
  );
}