import { Routes, Route } from "react-router";
import LearnPage from "../learn/LearnPage";
import Lesson from "../learn/Lesson";
import LearnLayout from "../layouts/LearnLayout";
import NamingIntervals from "../learn/material/NamingIntervals";

export default function LearnRoutes() {
  return (
    <>
      <Routes>
        <Route element={<LearnLayout />}>
          <Route index element={<LearnPage />} />
          <Route path="naming-intervals" element={<NamingIntervals />} />
        </Route>
      </Routes>
    </>
  );
}
