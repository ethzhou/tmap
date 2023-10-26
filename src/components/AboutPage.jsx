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
              <div>
                <h1 className="m-0 text-2xl font-normal">About</h1>
              </div>
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
            <div className="self-bottom ml-2 h-[2px] flex-auto rounded-tr-full bg-yellow-400 dark:bg-yellow-600"></div>
          </nav>
          <main className="flex flex-col gap-12 font-text text-xl text-slate-700 dark:text-slate-300">
            <section>
              <h2 className="font-display text-3xl font-normal">
                <strong>tmap</strong> is the AP Music Theory tool I wanted
                during my study. Despite this, the letters in its name are
                completely coincidental to that of the course.
              </h2>
            </section>
            <section>
              <h2 className="text-2xl">
                Philosoph<span className="before:content-['icalit']">y</span>
              </h2>
              <p>
                Presently, the four-part harmony practice page is almost
                completely dependent on keyboard input. This is, arguably,{" "}
                <em className="font-hand">terrible—</em>
              </p>
              <p>
                I believe, though, in the optional only-keyboard approach,
                because the alternation between mouse and keyboard within a page
                is too inconvenient. It is that it is not so optional right now.
                It is planned to make it so optional in coming times.
              </p>
            </section>
            <section>
              <h2 className="text-2xl">History</h2>
              <p>Returning to TA for my teacher, I made it.</p>
              <p>
                The project formally began on 3 July 2023 at 3:30 pm PT. My
                birthday was this month, but I was born before then.
              </p>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
