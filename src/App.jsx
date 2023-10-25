import { Link, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import LearnRoutes from "./components/routes/LearnRoutes";
import PracticeRoutes from "./components/routes/PracticeRoutes";
import SheetMusicTest from "./components/practice/exercises/SheetMusicTest";
import AboutRoutes from "./components/routes/AboutRoutes";
import { useMediaQuery } from "react-responsive";
import { createContext, useContext, useEffect, useState } from "react";
import Necklace from "./components/bars/Necklace";
import Belt from "./components/bars/Belt";

export const ColorSchemeContext = createContext("system");

export default function App() {
  const colorSchemeState = useState(
    localStorage.getItem("colorScheme") ?? "system",
  );
  const [colorScheme, setColorScheme] = colorSchemeState;

  useEffect(() => {
    localStorage.setItem("colorScheme", colorScheme);
  }, [colorScheme]);

  const systemColorSchemeIsLight = useMediaQuery(
    { query: "(prefers-color-scheme: light" },
    undefined,
    matches =>
      colorScheme === "system" &&
      setColorScheme(colorScheme => (matches ? true : false)),
  );

  /**
   * @type {"light" | "dark"}
   */
  const displayColorSchemeIsLight =
    colorScheme === "system"
      ? systemColorSchemeIsLight
      : colorScheme === "light";

  if (displayColorSchemeIsLight) {
    document.documentElement.classList.remove("dark");
  } else {
    document.documentElement.classList.add("dark");
  }

  return (
    <>
      <ColorSchemeContext.Provider value={colorSchemeState}>
        <Necklace />
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="learn/*" element={<LearnRoutes />} />
          <Route path="practice/*" element={<PracticeRoutes />} />
          <Route path="about/*" element={<AboutRoutes />} />
          <Route path="sheet-music-test" element={<SheetMusicTest />} />
          <Route path="*" element={<p>jajaja not a page</p>} />
        </Routes>
        <Belt />
      </ColorSchemeContext.Provider>
    </>
  );
}

export function isLight(colorScheme) {
  if (colorScheme === "light") {
    return true;
  }

  if (colorScheme === "dark") {
    return false;
  }

  if (colorScheme === "system") {
    return window.matchMedia("(prefers-color-scheme: light)").matches;
  }

  // Safety

  console.warn(`Color scheme ${colorScheme} is unrecognized.`);

  return true;
}
