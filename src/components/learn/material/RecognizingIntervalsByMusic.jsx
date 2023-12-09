import PageHeader from "../../general/PageHeader";
import PageLayout from "../../layouts/PageLayout";
import { data } from "./piecesByInterval.json";
import PracticeInvitation from "../../general/PracticeInvitation";

export default function RecognizingIntervalsByMusic() {
  return (
    <>
      <PageLayout>
        <PageHeader
          heading={"Recognizing Intervals by Music"}
          navUp={{ to: "/tmap/learn", display: "Learn" }}
          strokeTwColorClass="bg-emerald-400 dark:bg-emerald-600"
          right={
            <PracticeInvitation to={"/tmap/practice/interval-dictation"} />
          }
        />
        <main className="relative flex flex-col gap-12 font-text text-lg text-slate-700 dark:text-slate-300">
          <p>
            A method of identifying intervals is fitting them into known
            melodies.
          </p>
          <section>
            <h2 className="font-text text-4xl">Intervals</h2>
            <div className="flex w-full justify-center">
              <nav className="mb-10 grid h-20 w-[70%] grid-cols-7 place-content-evenly place-items-center">
                {data.map(({ interval }) => (
                  <a
                    key={interval}
                    className="text-slate-500 no-underline before:mr-1 before:opacity-0 before:transition-opacity before:duration-300 before:content-['#'] hover:before:opacity-100 dark:text-slate-500"
                    href={`#${interval}`}
                  >
                    {interval}
                  </a>
                ))}
              </nav>
            </div>
            <div className="grid grid-cols-2 gap-x-14 gap-y-4">
              {data.map(
                ({ interval, enharmonic, pieces, gridRow, gridColumn }) => {
                  return (
                    <div
                      key={interval}
                      id={interval}
                      style={{ gridRow, gridColumn }}
                    >
                      <h3>{interval}</h3>
                      <ul>
                        {pieces.map(
                          (
                            {
                              name,
                              movement,
                              subtitle,
                              composer,
                              motion,
                              note,
                            },
                            i,
                          ) => {
                            return (
                              <li key={i} className="my-3">
                                <span className="inline-flex w-full items-end justify-between gap-4">
                                  <span>
                                    <span>
                                      {name[0] === '"' ? (
                                        name
                                      ) : (
                                        <cite>{name}</cite>
                                      )}
                                    </span>
                                    <span>
                                      {`${movement ? `, ${movement}` : ""}${
                                        subtitle ? ` "${subtitle}"` : ""
                                      } `}
                                    </span>
                                  </span>
                                  <span className="text-slate-400 dark:text-slate-600">
                                    {composer}
                                  </span>
                                </span>
                                {note ? (
                                  <ul className="relative -top-2 ml-4 text-slate-600 marker:text-sm marker:content-['→___'] dark:text-slate-400">
                                    <li>
                                      <span className="font-straight text-base">
                                        {note}
                                      </span>
                                    </li>
                                  </ul>
                                ) : null}
                              </li>
                            );
                          },
                        )}
                      </ul>
                    </div>
                  );
                },
              )}
            </div>
          </section>
        </main>
      </PageLayout>
    </>
  );
}
