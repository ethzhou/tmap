import React from "react";
import PageHeader from "../../general/PageHeader";
import PageLayout from "../../layouts/PageLayout";
import fphErrors from "./fphErrors.json";
import PracticeInvitation from "../../general/PracticeInvitation";

export default function TheRulesOfFourPartHarmony() {
  const { errorsByCategory } = fphErrors;

  let ruleCounter = 1;

  return (
    <>
      <PageLayout>
        <PageHeader
          heading={"The Rules of Four-Part Harmony"}
          navUp={{ to: "/tmap/learn", display: "Learn" }}
          strokeTwColorClass="bg-emerald-400 dark:bg-emerald-600"
          right={<PracticeInvitation to={"/tmap/practice/four-part-harmony"} />}
        />
        <main className="relative flex flex-col gap-12 font-text text-lg text-slate-700 dark:text-slate-300">
          <p>
            Despite each rule's getting a whole index on the list all the same,
            their importances vary.
          </p>
          <section>
            <h2 className="font-text text-4xl">Rules</h2>
            <nav className="relative mb-20 ml-12 flex flex-col gap-6 before:absolute before:-left-5 before:top-0 before:h-full before:w-px before:bg-slate-300 before:content-[''] dark:before:bg-slate-700">
              {errorsByCategory.map(({ category }) => (
                <a
                  key={category}
                  className="text-slate-500 no-underline before:mr-1 before:opacity-0 before:transition-opacity before:duration-300 before:content-['#'] hover:before:opacity-100 dark:text-slate-500"
                  href={`#${category}`}
                >
                  {category}
                </a>
              ))}
            </nav>
            <div className="flex flex-col gap-16">
              {errorsByCategory.map(({ category, errors }) => (
                <section key={category}>
                  <div className="flex w-full items-baseline">
                    <h3 id={category} className="my-10 flex-auto list-none">
                      {category}
                    </h3>
                    <div className="h-px w-[30%] rounded-tr-full bg-slate-900 dark:bg-slate-100"></div>
                  </div>
                  {/* Start each category's list from where the last left off */}
                  <ol start={ruleCounter} className="ml-6 flex flex-col gap-11">
                    {errors.map(({ rule, notes }) => {
                      // Keep track of the list indexing
                      ruleCounter++;
                      return (
                        <li key={rule}>
                          {rule}
                          {notes ? (
                            <ul className="text-slate-600 marker:text-sm marker:content-['→___'] dark:text-slate-400">
                              {notes.map(note => (
                                <li key={note} className="font-straight">
                                  {note}
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </li>
                      );
                    })}
                  </ol>
                </section>
              ))}
            </div>
          </section>
        </main>
      </PageLayout>
    </>
  );
}
