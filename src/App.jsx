import { Link, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import LearnRoutes from "./components/routes/LearnRoutes";
import PracticeRoutes from "./components/routes/PracticeRoutes";
import SheetMusicTest from "./components/practice/exercises/SheetMusicTest";
import AboutRoutes from "./components/routes/AboutRoutes";
import { useMediaQuery } from "react-responsive";
import { createContext, useContext, useEffect, useState } from "react";
import Belt from "./components/Belt";

export const ColorSchemeContext = createContext("system");

export default function App() {
  const colorSchemeState = useState(
    localStorage.getItem("colorScheme") ?? "system",
  );

  useEffect(() => {
    localStorage.setItem("colorScheme", colorSchemeState[0]);
  }, [colorSchemeState[0]]);

  console.log(colorSchemeState);

  return (
    <>
      <ColorSchemeContext.Provider value={colorSchemeState}>
        <Belt />
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="learn/*" element={<LearnRoutes />} />
          <Route path="practice/*" element={<PracticeRoutes />} />
          <Route path="about/*" element={<AboutRoutes />} />
          <Route path="sheet-music-test" element={<SheetMusicTest />} />
          <Route path="*" element={<p>jajaja not a page</p>} />
        </Routes>
      </ColorSchemeContext.Provider>
    </>
  );
}
