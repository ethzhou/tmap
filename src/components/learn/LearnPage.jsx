import { Link, useSearchParams } from "react-router-dom";
import LearnCard from "./LearnCard";
import PageLayout from "../layouts/PageLayout";
import PageHeader from "../general/PageHeader";

export default function Learn() {
  const [searchParams, setSearchParams] = useSearchParams({
    tags: "",
  });

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
          heading={"Learn"}
          navUp={{
            to: "/tmap",
            display: <span className="font-hand">tmap&nbsp;♫</span>,
          }}
          strokeTwColorClass={"bg-emerald-400 dark:bg-emerald-600"}
        />
        <div
          onMouseMove={handleMouseMoveLightPos}
          className="group flex flex-col gap-2"
        >
          <div className="font-text text-slate-700 dark:text-slate-300">
            under construction
          </div>
          <LearnCard
            name={"Naming Intervals"}
            to={"naming-intervals"}
            tags={["intervals"]}
          />
          <LearnCard
            name={"Recognizing Intervals by Music"}
            to={"recognizing-intervals-by-music"}
            tags={["intervals", "ear"]}
          />
          <LearnCard
            name={"The Rules of Four-Part Harmony"}
            tags={["four-part-harmony"]}
          />
        </div>
      </PageLayout>
    </>
  );
}
