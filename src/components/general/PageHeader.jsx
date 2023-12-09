import { Link } from "react-router-dom";

export default function PageHeader({
  heading,
  navUp,
  strokeTwColorClass,
  right,
}) {
  return (
    <>
      <header className="flex items-baseline gap-2 font-display">
        <Link
          to=""
          className="text-2xl text-slate-600 no-underline dark:text-slate-400 max-sm:text-2xl"
        >
          <div>
            <h1 className="m-0 text-2xl font-normal">{heading}</h1>
          </div>
        </Link>
        <Link
          to={navUp.to}
          className="group text-2xl text-slate-400 no-underline dark:text-slate-700 max-sm:text-xl"
        >
          <div className="nav-up">
            <span className="font-comic">(</span>
            {navUp.display}
            <span className="font-comic">)</span>
          </div>
        </Link>
        {right ? (
          <>
            <div
              className={`self-bottom h-[2px] flex-auto ${
                strokeTwColorClass ?? ""
              }`}
            ></div>
            <div className="text-2xl text-slate-700 dark:text-slate-300">
              {right}
            </div>
            <div
              className={`self-bottom h-[2px] w-[8px] rounded-tr-full ${
                strokeTwColorClass ?? ""
              }`}
            ></div>
          </>
        ) : (
          <div
            className={`self-bottom ml-2 h-[2px] flex-auto rounded-tr-full ${
              strokeTwColorClass ?? ""
            }`}
          ></div>
        )}
      </header>
    </>
  );
}
