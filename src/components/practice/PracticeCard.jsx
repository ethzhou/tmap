import { Link } from "react-router-dom";

export default function PracticeCard({
  name,
  blurb,
  to,
  svgViewBox,
  graphicSource,
}) {
  return (
    <>
      <div className="practice-card relative flex h-96 items-center justify-center bg-slate-400 text-center before:pointer-events-none before:absolute before:inset-0 before:z-[3] before:h-full before:w-full before:opacity-0 before:transition-opacity before:duration-500 before:content-[''] after:absolute after:inset-0 after:z-[1] after:h-full after:w-full after:opacity-0 after:transition-opacity after:duration-500 after:content-[''] hover:before:opacity-100 group-hover:after:opacity-100 dark:bg-slate-400">
        <div className="practice-card-content absolute z-[2] flex h-[calc(100%-4px)] w-[calc(100%-4px)] items-center justify-center bg-slate-100 dark:bg-slate-800">
          <div className="h-full w-full text-center">
            <Link
              to={to}
              className="flex h-full w-full flex-col items-center text-slate-600 no-underline dark:text-slate-300"
            >
              <div className="flex h-full w-[94%] flex-col items-center">
                <div className="mb-6 mt-20 px-4 font-display text-xl">
                  {name}
                </div>
                {/* This div's height and width are independent of the SVG's */}
                <div className="flex h-[100px] w-[150px] content-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    // svgViewBox is likely "0 0 W H", where W and H are the width and height of the source graphic
                    viewBox={svgViewBox}
                    className="fill-slate-600 stroke-slate-600 dark:fill-slate-300 dark:stroke-slate-300"
                  >
                    <use href={graphicSource}></use>
                  </svg>
                </div>
                <div className="mt-10 font-text">{blurb}</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
