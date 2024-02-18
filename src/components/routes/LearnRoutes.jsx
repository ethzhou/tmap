import { Routes, Route } from "react-router";
import LearnPage from "../learn/LearnPage";
import Lesson from "../learn/Lesson";
import LearnLayout from "../layouts/LearnLayout";
import NamingIntervals from "../learn/material/NamingIntervals";
import RecognizingIntervalsByMusic from "../learn/material/RecognizingIntervalsByMusic";
import TheRulesOfFourPartHarmony from "../learn/material/TheRulesOfFourPartHarmony";
import SoundsAndPitch from "../learn/material/SoundsAndPitch";
import NotesAndTheScale from "../learn/material/NotesAndTheScale";
import ExploringScales from "../learn/material/ExploringScales";

export default function LearnRoutes() {
  return (
    <>
      <Routes>
        <Route element={<LearnLayout />}>
          <Route index element={<LearnPage />} />
          <Route path="sound-and-pitch" element={<SoundsAndPitch />} />
          <Route path="notes-and-the-scale" element={<NotesAndTheScale />} />
          <Route path="exploring-scales" element={<ExploringScales />} />
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
