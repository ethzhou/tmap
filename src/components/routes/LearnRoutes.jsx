import { Routes, Route } from "react-router";
import LearnPage from "../learn/LearnPage";
import Lesson from "../learn/Lesson";
import LearnLayout from "../layouts/LearnLayout";
import IntervalsPage from "../learn/material/IntervalsPage";

export default function LearnRoutes() {
  return (
    <>
      <Routes>
        <Route element={<LearnLayout />}>
          <Route index element={<LearnPage />} />
          <Route path="intervals" element={<IntervalsPage />} />
        </Route>
      </Routes>
    </>
  );
}
