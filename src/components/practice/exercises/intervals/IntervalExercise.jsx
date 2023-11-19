import { Link } from "react-router-dom";
import StopwatchDisplay from "../../../general/StopwatchDisplay";
import PageLayout from "../../../layouts/PageLayout";
import PageHeader from "../../../general/PageHeader";

export default function IntervalExercise({ name, record, exerciseContent }) {
  return (
    <>
      <PageLayout>
        <PageHeader
          heading={name}
          navUp={{ to: "/tmap/practice", display: "Practice" }}
          strokeTwColorClass={"bg-pink-400 dark:bg-pink-600"}
          right={<StopwatchDisplay />}
        />
        <div className="mt-10 flex flex-col items-center">
          <div className="mb-6 font-display">
            <span className="inline-block min-w-[72px] text-right font-display text-6xl text-slate-700 dark:text-slate-300">
              {record.score}
            </span>
            <span className="text-sm text-slate-500 dark:text-slate-500">
              {" "}
              of{" "}
            </span>
            <span className="w-8 font-display text-xl text-slate-500 dark:text-slate-500">
              {record.history.length}
            </span>
          </div>
          {exerciseContent}
          <div className="flex-auto"></div>
          <div className="mt-20 max-h-40 overflow-y-scroll scroll-smooth">
            <table className="relative table-fixed">
              <thead className="sticky top-0 font-display text-slate-700 dark:text-slate-300">
                <tr>
                  <th className="w-28 bg-slate-50 p-0 font-normal dark:bg-slate-900">
                    pitch 1
                  </th>
                  <th className="w-28 bg-slate-50 p-0 font-normal dark:bg-slate-900">
                    pitch 2
                  </th>
                  <th className="w-28 bg-slate-50 p-0 font-normal dark:bg-slate-900">
                    answer
                  </th>
                  <th className="w-28 bg-slate-50 p-0 font-normal dark:bg-slate-900">
                    response
                  </th>
                  <th className="w-28 bg-slate-50 p-0 font-normal dark:bg-slate-900">
                    score
                  </th>
                </tr>
              </thead>
              <tbody className="font-comic text-slate-400 dark:text-slate-600">
                {record.history.toReversed().map((item, index) => (
                  <tr
                    key={index}
                    className="first:text-slate-600 dark:first:text-slate-400"
                  >
                    <td className="w-28 text-center">
                      {item.pitches[0].toText()}
                    </td>
                    <td className="w-28 text-center">
                      {item.pitches[1].toText()}
                    </td>
                    <td className="w-28 text-center">{item.answer}</td>
                    <td className="w-28 text-center">{item.response}</td>
                    <td className="w-28 text-center">{item.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </PageLayout>
    </>
  );
}
