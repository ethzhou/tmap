import { Routes, Route } from "react-router";
import LearnPage from "../learn/LearnPage";
import Lesson from "../learn/Lesson";
import LearnLayout from "../learn/LearnLayout";

export default function LearnRoutes() {
  return (
    <>
      <Routes>
        <Route element={<LearnLayout />}>
          <Route index element={<LearnPage />} />
          <Route path=":lessonID" element={<Lesson />} />
        </Route>
      </Routes>
    </>
  );
}
