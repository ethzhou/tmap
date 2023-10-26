import { useContext } from "react";
import { Link } from "react-router-dom";
import { ColorSchemeContext } from "../App";

export default function HomePage() {
  const [colorScheme, setColorScheme] = useContext(ColorSchemeContext);

  function handleMouseMoveLightPos(event) {
    const target = event.currentTarget;

    for (const card of target.children) {
      const rect = card.getBoundingClientRect();
      const relativeX = event.clientX - rect.x;
      const relativeY = event.clientY - rect.y;

      card.style.setProperty("--light-x", `${relativeX}px`);
      card.style.setProperty("--light-y", `${relativeY}px`);
    }
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="flex h-screen w-[40rem] flex-col justify-center gap-1">
          <nav className="flex items-baseline justify-between px-1">
            <Link
              to="/tmap"
              className="h-8 font-hand text-2xl text-slate-500 no-underline dark:text-slate-400 max-sm:text-xl"
            >
              <div>
                <h1 className="m-0 text-2xl font-normal">tmap&nbsp;♫</h1>
              </div>
            </Link>
            <div className="self-bottom ml-2 h-[2px] flex-auto rounded-tr-full bg-slate-500 dark:bg-slate-400"></div>
            <Link
              to="about"
              className="font-hand text-2xl text-slate-400 no-underline dark:text-slate-600 max-sm:text-xl"
            >
              <div className="before:ml-3 before:mr-1.5 before:inline-block before:content-['/\/']">
                (about)
              </div>
            </Link>
          </nav>
          <nav
            onMouseMove={handleMouseMoveLightPos}
            className="group relative grid h-80 grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-1"
          >
            <div className="home-card before after relative flex aspect-square flex-auto items-center justify-center bg-emerald-400 before:pointer-events-none before:absolute before:inset-0 before:z-[3] before:h-full before:w-full before:opacity-0 before:transition-opacity before:duration-500 before:content-[''] after:absolute after:inset-0 after:z-[1] after:h-full after:w-full after:opacity-0 after:transition-opacity after:duration-500 after:content-[''] hover:before:opacity-100 group-hover:after:opacity-100 dark:bg-emerald-600">
              <div className="home-card-content absolute z-[2] flex h-[calc(100%-4px)] w-[calc(100%-4px)] items-center justify-center bg-emerald-600 dark:bg-emerald-900">
                <Link
                  to="learn"
                  className="flex h-full w-full items-center justify-center text-slate-50 no-underline dark:text-slate-200"
                >
                  <div className="font-comic text-4xl">Learn</div>
                </Link>
              </div>
            </div>
            <div className="home-card before after relative flex aspect-square flex-auto items-center justify-center bg-pink-400 before:pointer-events-none before:absolute before:inset-0 before:z-[3] before:h-full before:w-full before:opacity-0 before:transition-opacity before:duration-500 before:content-[''] after:absolute after:inset-0 after:z-[1] after:h-full after:w-full after:opacity-0 after:transition-opacity after:duration-500 after:content-[''] hover:before:opacity-100 group-hover:after:opacity-100 dark:bg-pink-600">
              <div className="home-card-content absolute z-[2] h-[calc(100%-4px)] w-[calc(100%-4px)] bg-pink-600 dark:bg-pink-900">
                <Link
                  to="practice"
                  className="flex h-full w-full items-center justify-center text-slate-50 no-underline dark:text-slate-200"
                >
                  <div className="font-comic text-4xl">Practice</div>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
