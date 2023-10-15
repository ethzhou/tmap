import { Link, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import LearnRoutes from "./routes/LearnRoutes";
import PracticeRoutes from "./routes/PracticeRoutes";
import SheetMusicTest from "./components/practice/exercises/SheetMusicTest";
import AboutRoutes from "./routes/AboutRoutes";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="learn/*" element={<LearnRoutes />} />
        <Route path="practice/*" element={<PracticeRoutes />} />
        <Route path="about/*" element={<AboutRoutes />} />
        <Route path="sheet-music-test" element={<SheetMusicTest />} />
        <Route path="*" element={<p>jajaja not a page</p>} />
      </Routes>
    </>
  );
}
