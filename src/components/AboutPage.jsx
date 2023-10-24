import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <>
      <div className="my-20 flex justify-center">
        <div className="flex w-[48rem] flex-col justify-start gap-1">
          <nav className="flex items-baseline">
            <Link
              to=""
              className="font-comic text-2xl text-slate-600 no-underline dark:text-slate-400 max-sm:text-2xl"
            >
              <div>About</div>
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
            <div className="self-bottom ml-2 h-[2px] flex-auto rounded-tr-full bg-yellow-400 dark:bg-yellow-600"></div>
          </nav>
          <div className="my-4 font-text text-slate-700 dark:text-slate-300">
            <p className="text-lg">
              <strong>tmap</strong> is the AP Music Theory tool I wanted during
              my study. Despite this, the letters in its name are completely
              coincidental to that of the course.
            </p>
            <p>
              Planning on returning to TA for my teacher, I thought I'd make it.
            </p>
            <p>
              The project formally began on 3 July 2023 at 3:30 pm PT. My
              birthday was this month, but I was born before then.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
