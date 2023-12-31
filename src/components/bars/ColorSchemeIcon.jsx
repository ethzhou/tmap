import { useContext } from "react";
import { ColorSchemeContext } from "../../App";

export default function ColorSchemeIcon() {
  const [colorScheme, setColorScheme] = useContext(ColorSchemeContext);

  const colorSchemeCycle = ["system", "light", "dark"];
  function cycleColorScheme() {
    setColorScheme(
      colorScheme =>
        colorSchemeCycle[(colorSchemeCycle.indexOf(colorScheme) + 1) % 3],
    );
  }

  return (
    <>
      <div className="relative">
        <button
          type="button"
          onClick={cycleColorScheme}
          className="group flex h-8 w-8 cursor-pointer select-none flex-col items-center justify-center overflow-hidden rounded-full border-none bg-transparent p-2"
        >
          <div className="text-4xl leading-none text-slate-400 dark:text-slate-700">
            {colorScheme === "light"
              ? "☉"
              : colorScheme === "dark"
              ? "☽︎"
              : "◑"}
          </div>
          <div className="pointer-events-none absolute -bottom-5 font-comic text-slate-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:text-slate-700">
            {colorScheme}
          </div>
        </button>
      </div>
    </>
  );
}
