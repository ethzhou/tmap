import { Routes, Route } from "react-router";
import LearnPage from "../learn/LearnPage";
import Lesson from "../learn/Lesson";
import LearnLayout from "../layouts/LearnLayout";
import NamingIntervals from "../learn/material/NamingIntervals";
import RecognizingIntervalsByMusic from "../learn/material/RecognizingIntervalsByMusic";
import TheRulesOfFourPartHarmony from "../learn/material/TheRulesOfFourPartHarmony";

export default function LearnRoutes() {
  return (
    <>
      <Routes>
        <Route element={<LearnLayout />}>
          <Route index element={<LearnPage />} />
          <Route path="naming-intervals" element={<NamingIntervals />} />
          <Route
            path="recognizing-intervals-by-music"
            element={<RecognizingIntervalsByMusic />}
          />
          <Route
            path="the-rules-of-four-part-harmony"
            element={<TheRulesOfFourPartHarmony />}
          />
        </Route>
      </Routes>
    </>
  );
}
