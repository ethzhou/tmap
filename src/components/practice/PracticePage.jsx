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
      <div className="my-20 flex justify-center">
        <div className="flex w-[48rem] flex-col justify-start gap-1">
          <nav className="flex items-baseline">
            <Link
              to=""
              className="font-comic text-2xl text-slate-600 no-underline dark:text-slate-400 max-sm:text-2xl"
            >
              <div>Practice</div>
            </Link>
            <Link
              to="/tmap/"
              className="group ml-2 text-2xl text-slate-400 no-underline dark:text-slate-700 max-sm:text-xl"
            >
              <div className="nav-up">
                {/* <div className="back"> */}
                <span className="h-full font-comic">(</span>
                <span className="h-full font-hand">tmap&nbsp;♫</span>
                <span className="h-full font-comic">)</span>
              </div>
            </Link>
            <div className="self-bottom ml-2 h-[2px] flex-auto rounded-tr-full bg-pink-400 dark:bg-pink-600"></div>
          </nav>
          <div
            onMouseMove={handleMouseMoveLightPos}
            className="group grid grid-flow-row-dense grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-1"
          >
            <div className="practice-card relative flex h-96 items-center justify-center bg-slate-600 text-center before:pointer-events-none before:absolute before:inset-0 before:z-[3] before:h-full before:w-full before:opacity-0 before:transition-opacity before:duration-500 before:content-[''] after:absolute after:inset-0 after:z-[1] after:h-full after:w-full after:opacity-0 after:transition-opacity after:duration-500 after:content-[''] hover:before:opacity-100 group-hover:after:opacity-100 dark:bg-slate-400">
              <div className="practice-card-content absolute z-[2] flex h-[calc(100%-4px)] w-[calc(100%-4px)] items-center justify-center bg-slate-100 dark:bg-slate-800">
                <div className="h-full w-full text-center">
                  <Link
                    to="interval-reading"
                    className="flex h-full w-full flex-col items-center text-slate-600 no-underline dark:text-slate-300"
                  >
                    <div className="flex h-full w-full flex-col items-center px-4">
                      <div className="mb-4 mt-20 px-4 font-display text-xl">
                        Interval Reading
                      </div>
                      <svg
                        strokeWidth="0.3"
                        xmlns="http://www.w3.org/2000/svg"
                        strokeDasharray="none"
                        width="122"
                        height="150"
                        viewBox="0 0 122 150"
                        className="fill-slate-600 stroke-slate-600 dark:fill-slate-300 dark:stroke-slate-300"
                      >
                        <use href="/src/assets/interval-reading.svg#graphic"></use>
                      </svg>
                      <div className="font-text">Okay.</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="practice-card relative flex h-96 items-center justify-center bg-slate-600 text-center before:pointer-events-none before:absolute before:inset-0 before:z-[3] before:h-full before:w-full before:opacity-0 before:transition-opacity before:duration-500 before:content-[''] after:absolute after:inset-0 after:z-[1] after:h-full after:w-full after:opacity-0 after:transition-opacity after:duration-500 after:content-[''] hover:before:opacity-100 group-hover:after:opacity-100 dark:bg-slate-400">
              <div className="practice-card-content absolute z-[2] flex h-[calc(100%-4px)] w-[calc(100%-4px)] items-center justify-center bg-slate-100 dark:bg-slate-800">
                <div className="h-full w-full text-center">
                  <Link
                    to="interval-dictation"
                    className="flex h-full w-full flex-col items-center text-slate-600 no-underline dark:text-slate-300"
                  >
                    <div className="flex h-full w-full flex-col items-center px-4">
                      <div className="mb-4 mt-20 px-4 font-display text-xl">
                        Interval Dictation
                      </div>
                      <svg
                        strokeWidth="0.3"
                        xmlns="http://www.w3.org/2000/svg"
                        strokeDasharray="none"
                        width="122"
                        height="150"
                        viewBox="0 0 122 150"
                        className="fill-slate-600 stroke-slate-600 dark:fill-slate-300 dark:stroke-slate-300"
                      >
                        <use href="/src/assets/interval-dictation.svg#graphic"></use>
                      </svg>
                      <div className="font-text">hm–⁠hm… hm… hm…</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="practice-card relative flex h-96 items-center justify-center bg-slate-600 text-center before:pointer-events-none before:absolute before:inset-0 before:z-[3] before:h-full before:w-full before:opacity-0 before:transition-opacity before:duration-500 before:content-[''] after:absolute after:inset-0 after:z-[1] after:h-full after:w-full after:opacity-0 after:transition-opacity after:duration-500 after:content-[''] hover:before:opacity-100 group-hover:after:opacity-100 dark:bg-slate-400">
              <div className="practice-card-content absolute z-[2] flex h-[calc(100%-4px)] w-[calc(100%-4px)] items-center justify-center bg-slate-100 dark:bg-slate-800">
                <div className="h-full w-full text-center">
                  <Link
                    to="four-part-harmony"
                    className="flex h-full w-full flex-col items-center text-slate-600 no-underline dark:text-slate-300"
                  >
                    <div className="flex h-full w-full flex-col items-center px-4">
                      <div className="mb-4 mt-20 px-4 font-display text-xl">
                        Four-Part Harmony
                      </div>
                      <svg
                        strokeWidth="0.3"
                        xmlns="http://www.w3.org/2000/svg"
                        strokeDasharray="none"
                        width="122"
                        height="150"
                        viewBox="0 0 122 150"
                        className="fill-slate-600 stroke-slate-600 dark:fill-slate-300 dark:stroke-slate-300"
                      >
                        <use href="/src/assets/four-part-harmony.svg#graphic"></use>
                      </svg>
                      <div className="font-text">
                        IV - V - I<br />
                        IV - V - I<br />
                        IV - V - I
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="practice-card relative flex h-96 items-center justify-center bg-slate-600 text-center before:pointer-events-none before:absolute before:inset-0 before:z-[3] before:h-full before:w-full before:opacity-0 before:transition-opacity before:duration-500 before:content-[''] after:absolute after:inset-0 after:z-[1] after:h-full after:w-full after:opacity-0 after:transition-opacity after:duration-500 after:content-[''] hover:before:opacity-100 group-hover:after:opacity-100 dark:bg-slate-400">
              <div className="practice-card-content absolute z-[2] flex h-[calc(100%-4px)] w-[calc(100%-4px)] items-center justify-center bg-slate-100 dark:bg-slate-800">
                <div className="h-full w-full text-center">
                  <Link
                    to=""
                    className="flex h-full w-full flex-col items-center text-slate-600 no-underline dark:text-slate-300"
                  >
                    <div className="flex h-full w-full flex-col items-center px-4">
                      <div className="mb-4 mt-20 font-display text-xl">
                        Something Else
                      </div>
                      <svg
                        strokeWidth="0.3"
                        xmlns="http://www.w3.org/2000/svg"
                        strokeDasharray="none"
                        width="122"
                        height="150"
                        viewBox="0 0 122 150"
                        className="fill-slate-600 stroke-slate-600 dark:fill-slate-300 dark:stroke-slate-300"
                      >
                        <use href="/src/assets/something-else.svg#graphic"></use>
                      </svg>
                      <div className="font-text">
                        what's the lorem ipsum of music
                      </div>
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
