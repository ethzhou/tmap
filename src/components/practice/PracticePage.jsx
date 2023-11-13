import { Link } from "react-router-dom";
import PracticeCard from "./PracticeCard";
import intervalReadingGraphic from "../../assets/interval-reading.svg";

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
              <div>
                <h1 className="m-0 text-2xl font-normal">Practice</h1>
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
            <div className="self-bottom ml-2 h-[2px] flex-auto rounded-tr-full bg-pink-400 dark:bg-pink-600"></div>
          </nav>
          <div
            onMouseMove={handleMouseMoveLightPos}
            className="group grid grid-flow-row-dense grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-1"
          >
            <PracticeCard
              name={"Interval Reading"}
              blurb={"Okay."}
              to={"interval-reading"}
              svgViewBox={"0 0 160 120"}
              graphicSource={`${intervalReadingGraphic}#graphic`}
            />
            <PracticeCard
              name={"Interval Dictation"}
              blurb={"hm–⁠hm… hm… hm…"}
              to={"interval-dictation"}
              svgViewBox={"0 0 160 120"}
              graphicHRef={""}
            />
            <PracticeCard
              name={"Four-Part Harmony"}
              blurb={
                <>
                  IV - V - I<br />
                  IV - V - I<br />
                  IV - V - I
                </>
              }
              to={"four-part-harmony"}
              svgViewBox={"0 0 160 120"}
              graphicHRef={""}
            />
            <PracticeCard
              name={"Something Else"}
              blurb={"what's the lorem ipsum of music"}
              to={""}
              svgViewBox={"0 0 160 120"}
              graphicHRef={""}
            />
          </div>
        </div>
      </div>
    </>
  );
}
