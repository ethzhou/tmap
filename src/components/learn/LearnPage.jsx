import { Link } from "react-router-dom";

export default function Learn() {
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
              <div>Learn</div>
            </Link>
            <Link
              to="/tmap"
              className="group ml-2 text-2xl text-slate-400 no-underline dark:text-slate-700 max-sm:text-xl"
            >
              <div className="nav-up">
                {/* <div className="back"> */}
                <span className="h-full font-comic">(</span>
                <span className="h-full font-hand">tmap&nbsp;♫</span>
                <span className="h-full font-comic">)</span>
              </div>
            </Link>
            <div className="self-bottom ml-2 h-[2px] flex-auto rounded-tr-full bg-emerald-400 dark:bg-emerald-600"></div>
          </nav>
          <div
            onMouseMove={handleMouseMoveLightPos}
            className="group grid grid-flow-row-dense grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-1"
          >
            <div className="font-text text-slate-700 dark:text-slate-300">
              under construction
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
