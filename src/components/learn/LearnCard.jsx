import { Link } from "react-router-dom";

export default function LearnCard({ name, blurb, to, tags }) {
  return (
    <>
      <div className="learn-card group/card relative z-[2] flex rounded-bl-lg border-0 border-l-2 border-solid border-sky-200 bg-slate-100 transition-all duration-500 before:pointer-events-none before:absolute before:inset-0 before:z-[3] before:h-full before:w-full before:rounded-bl-lg before:opacity-0 before:transition-opacity before:duration-300 before:content-[''] after:absolute after:-left-[2px] after:top-[80%] after:h-0 after:w-[2px] after:rounded-bl-full after:opacity-0 after:transition-all after:duration-500 after:ease-in-out after:content-[''] hover:border-transparent hover:border-opacity-0 hover:before:opacity-100 hover:after:top-[10%] hover:after:h-[70%] hover:after:opacity-100 dark:border-slate-600 dark:bg-slate-800 dark:hover:border-transparent">
        <Link
          to={to}
          className="w-full flex-auto items-center text-left text-slate-700 no-underline dark:text-slate-400"
        >
          <div className="flex-auto px-5 py-4">
            <div className="relative items-baseline">
              <span className="z-[5] mb-1 mr-2 font-text text-2xl">{name}</span>
              <span className="absolute bottom-0 right-0 z-[4] flex gap-2 font-mono text-lg text-slate-300 transition-all duration-300 group-hover/card:text-slate-400 dark:text-slate-700 dark:group-hover/card:text-slate-400">
                {tags.map(tag => (
                  <span key={tag}>#{tag}</span>
                ))}
              </span>
            </div>
            {blurb ? (
              <div className="font-straight text-lg text-slate-500 before:m-3 before:text-slate-300 before:content-['>'] dark:text-slate-400 dark:before:text-slate-700">
                {blurb}
              </div>
            ) : null}
          </div>
        </Link>
      </div>
    </>
  );
}
