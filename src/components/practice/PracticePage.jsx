import { Link } from "react-router-dom";
import PracticeCard from "./PracticeCard";
import intervalReadingGraphic from "../../assets/practice/cards/interval-reading-graphic.svg";
import intervalDictationGraphic from "../../assets/practice/cards/interval-dictation-graphic.svg";
import fourPartHarmonyGraphic from "../../assets/practice/cards/four-part-harmony-graphic.svg";
import PageLayout from "../layouts/PageLayout";
import PageHeader from "../general/PageHeader";

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
      <PageLayout>
        <PageHeader
          heading={"Practice"}
          navUp={{
            to: "/tmap",
            display: <span className="font-hand">tmap&nbsp;♫</span>,
          }}
          strokeTwColorClass={"bg-pink-400 dark:bg-pink-600"}
        />
        <div
          onMouseMove={handleMouseMoveLightPos}
          className="group grid grid-flow-row-dense grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-1"
        >
          <PracticeCard
            name={"Interval Reading"}
            blurb={"Okay."}
            to={"interval-reading"}
            graphicSource={`${intervalReadingGraphic}#graphic`}
            svgAttributes={{ viewBox: "0 0 160 120" }}
          />
          <PracticeCard
            name={"Interval Dictation"}
            blurb={"hm–⁠hm… hm… hm…"}
            to={"interval-dictation"}
            graphicSource={`${intervalDictationGraphic}#graphic`}
            svgAttributes={{
              viewBox: "0 0 263.4 92.3",
              fillOpacity: "0",
              strokeWidth: "4.7px",
              strokeLinecap: "round",
            }}
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
            graphicSource={`${fourPartHarmonyGraphic}#graphic`}
            svgAttributes={{ viewBox: "0 0 196.9 88.6" }}
          />
        </div>
      </PageLayout>
    </>
  );
}
