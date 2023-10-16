import { Link } from "react-router-dom";

export default function PracticePage() {
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
        <div className="mt-20 flex h-screen w-[48rem] flex-col justify-start gap-0.5">
          <nav className="flex items-baseline">
            <Link
              to=""
              className="h-8 font-comic text-2xl text-slate-700 no-underline dark:text-slate-400 max-sm:text-2xl"
            >
              <div>Practice</div>
            </Link>
            <Link
              to="/tmap/"
              className="group ml-2 h-8 font-hand text-2xl text-slate-400 no-underline dark:text-slate-700 max-sm:text-xl"
            >
              <div className="before:inline-block before:rotate-0 before:transition-transform before:duration-500 before:ease-in-out before:content-['⇡'] group-hover:before:rotate-[360deg]">
                {/* <div className="back"> */}
                (tmap&nbsp;♫)
              </div>
            </Link>
            <div className="self-bottom ml-2 h-[3px] flex-auto rounded-tr-full bg-pink-600"></div>
          </nav>
          <div
            onMouseMove={handleMouseMoveLightPos}
            className="group flex flex-wrap items-start justify-between justify-items-center gap-y-6"
          >
            <div className="practice-card relative flex h-96 w-60 items-center justify-center bg-slate-500 text-center before:pointer-events-none before:absolute before:inset-0 before:z-[3] before:h-full before:w-full before:opacity-0 before:transition-opacity before:duration-500 before:content-[''] after:absolute after:inset-0 after:z-[1] after:h-full after:w-full after:opacity-0 after:transition-opacity after:duration-500 after:content-[''] hover:before:opacity-100 group-hover:after:opacity-100">
              <div className="practice-card-content absolute z-[2] flex h-[calc(100%-4px)] w-[calc(100%-4px)] items-center justify-center bg-slate-100 dark:bg-slate-800">
                <div className="h-full w-full px-4 text-center">
                  <Link
                    to="interval-reading"
                    className="flex h-full w-full flex-col items-center text-slate-600 no-underline dark:text-slate-300"
                  >
                    <div className="mb-4 mt-20 font-comic text-2xl">
                      Interval Reading
                    </div>
                    <svg
                      strokeWidth="0.3"
                      xmlns="http://www.w3.org/2000/svg"
                      strokeDasharray="none"
                      width="122"
                      height="150"
                      viewBox="0 0 122 150"
                      className="fill-slate-700 stroke-slate-700 dark:fill-slate-300 dark:stroke-slate-300"
                    >
                      <use href="/src/assets/interval-reading.svg#graphic"></use>
                    </svg>
                    <div className="font-clean">One, two, three, four…</div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="practice-card relative flex h-96 w-60 items-center justify-center bg-slate-500 text-center before:pointer-events-none before:absolute before:inset-0 before:z-[3] before:h-full before:w-full before:opacity-0 before:transition-opacity before:duration-500 before:content-[''] after:absolute after:inset-0 after:z-[1] after:h-full after:w-full after:opacity-0 after:transition-opacity after:duration-500 after:content-[''] hover:before:opacity-100 group-hover:after:opacity-100">
              <div className="practice-card-content absolute z-[2] flex h-[calc(100%-4px)] w-[calc(100%-4px)] items-center justify-center bg-slate-100 dark:bg-slate-800">
                <div className="h-full w-full px-4 text-center">
                  <Link
                    to="interval-dictation"
                    className="flex h-full w-full flex-col items-center text-slate-600 no-underline dark:text-slate-300"
                  >
                    <div className="mb-4 mt-20 font-comic text-2xl">
                      Interval Dictation
                    </div>
                    <svg
                      strokeWidth="0.3"
                      xmlns="http://www.w3.org/2000/svg"
                      strokeDasharray="none"
                      width="122"
                      height="150"
                      viewBox="0 0 122 150"
                      className="fill-slate-700 stroke-slate-700 dark:fill-slate-300 dark:stroke-slate-300"
                    >
                      <use href="/src/assets/interval-dictation.svg#graphic"></use>
                    </svg>
                    <div className="font-clean">hm–⁠hm… hm… hm…</div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="practice-card relative flex h-96 w-60 items-center justify-center bg-slate-500 text-center before:pointer-events-none before:absolute before:inset-0 before:z-[3] before:h-full before:w-full before:opacity-0 before:transition-opacity before:duration-500 before:content-[''] after:absolute after:inset-0 after:z-[1] after:h-full after:w-full after:opacity-0 after:transition-opacity after:duration-500 after:content-[''] hover:before:opacity-100 group-hover:after:opacity-100">
              <div className="practice-card-content absolute z-[2] flex h-[calc(100%-4px)] w-[calc(100%-4px)] items-center justify-center bg-slate-100 dark:bg-slate-800">
                <div className="h-full w-full px-4 text-center">
                  <Link
                    to="four-part-harmony"
                    className="flex h-full w-full flex-col items-center text-slate-600 no-underline dark:text-slate-300"
                  >
                    <div className="mb-4 mt-20 font-comic text-2xl">
                      Four-Part Harmony
                    </div>
                    <svg
                      strokeWidth="0.3"
                      xmlns="http://www.w3.org/2000/svg"
                      strokeDasharray="none"
                      width="122"
                      height="150"
                      viewBox="0 0 122 150"
                      className="fill-slate-700 stroke-slate-700 dark:fill-slate-300 dark:stroke-slate-300"
                    >
                      <use href="/src/assets/four-part-harmony.svg#graphic"></use>
                    </svg>
                    <div className="font-clean">I - IV - V - I!</div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="practice-card relative flex h-96 w-60 items-center justify-center bg-slate-500 text-center before:pointer-events-none before:absolute before:inset-0 before:z-[3] before:h-full before:w-full before:opacity-0 before:transition-opacity before:duration-500 before:content-[''] after:absolute after:inset-0 after:z-[1] after:h-full after:w-full after:opacity-0 after:transition-opacity after:duration-500 after:content-[''] hover:before:opacity-100 group-hover:after:opacity-100">
              <div className="practice-card-content absolute z-[2] flex h-[calc(100%-4px)] w-[calc(100%-4px)] items-center justify-center bg-slate-100 dark:bg-slate-800">
                <div className="h-full w-full px-4 text-center">
                  <Link
                    to=""
                    className="flex h-full w-full flex-col items-center text-slate-600 no-underline dark:text-slate-300"
                  >
                    <div className="mb-4 mt-20 font-comic text-2xl">
                      Something Else
                    </div>
                    <svg
                      strokeWidth="0.3"
                      xmlns="http://www.w3.org/2000/svg"
                      strokeDasharray="none"
                      width="122"
                      height="150"
                      viewBox="0 0 122 150"
                      className="fill-slate-700 stroke-slate-700 dark:fill-slate-300 dark:stroke-slate-300"
                    >
                      <use href="/src/assets/something-else.svg#graphic"></use>
                    </svg>
                    <div className="font-clean">
                      What's the lorem ipsum of music?
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
