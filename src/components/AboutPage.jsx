import { Link } from "react-router-dom";
import tmapLogo from "../assets/tmap-logo.svg";
import PageLayout from "./layouts/PageLayout";
import PageHeader from "./general/PageHeader";

export default function AboutPage() {
  return (
    <>
      <PageLayout>
        <PageHeader
          heading={"About"}
          navUp={{
            to: "/tmap",
            display: <span className="font-hand">tmap&nbsp;♫</span>,
          }}
          strokeTwColorClass={"bg-yellow-400 dark:bg-yellow-600"}
        />
        <main className="relative flex flex-col gap-12 font-text text-xl text-slate-700 dark:text-slate-300">
          <section className="flex">
            <h2 className="font-display text-3xl font-normal">
              <strong>tmap</strong> is the AP Music Theory tool I wanted during
              my study. Despite this, the letters in its name are completely
              coincidental to those of the course.
            </h2>
          </section>
          <img
            src={tmapLogo}
            alt="tmap"
            className="absolute bottom-8 right-20 -z-[1] w-[55%] opacity-10"
          />
          <section>
            <h2 className="text-2xl">
              Philosoph<span className="before:content-['icalit']">y</span>
            </h2>
            <p>
              Presently, the four-part harmony practice page is almost
              completely dependent on keyboard input. This is arguably terrible—
            </p>
            <p>
              I believe, though, in the optional only-keyboard approach, because
              the alternation between mouse and keyboard within a page is too
              inconvenient. It is that it is not so optional right now. It is
              planned to make it so optional in coming times.
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
        </main>{" "}
      </PageLayout>
    </>
  );
}
