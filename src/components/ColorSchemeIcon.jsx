import { useContext } from "react";
import { ColorSchemeContext } from "../App";
import { useMediaQuery } from "react-responsive";

export default function ColorSchemeIcon() {
  const [colorScheme, setColorScheme] = useContext(ColorSchemeContext);

  const displayedColorScheme = isLight(colorScheme);

  const colorSchemeCycle = ["system", "light", "dark"];
  function cycleColorScheme() {
    console.log("asdfasdf", colorScheme);
    setColorScheme(
      (colorScheme) =>
        colorSchemeCycle[(colorSchemeCycle.indexOf(colorScheme) + 1) % 3],
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={cycleColorScheme}
        className="group flex select-none flex-col items-end border-none bg-transparent"
      >
        <div className="text-4xl leading-none text-slate-400 dark:text-slate-700">
          {colorScheme === "light" ? "☉" : colorScheme === "dark" ? "☽︎" : "◑"}
        </div>
        <div className="self-center font-hand text-slate-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:text-slate-700">
          {colorScheme}
        </div>
      </button>
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
    return useMediaQuery({ query: "prefers-color-scheme: light" });
  }

  // Safety

  console.warn(`Color scheme ${colorScheme} is unrecognized.`);

  return true;
}
