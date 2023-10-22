import { Link } from "react-router-dom";
import StopwatchDisplay from "../../general/StopwatchDisplay";

export default function IntervalExercise({ name, record, exerciseContent }) {
  return (
    <>
      <div className="my-16 flex justify-center">
        <div className="flex w-[48rem] flex-col justify-start gap-1">
          <nav className="flex items-baseline gap-2">
            <Link
              to=""
              className="font-comic text-2xl text-slate-600 no-underline dark:text-slate-400 max-sm:text-2xl"
            >
              <div>{name}</div>
            </Link>
            <Link
              to="/tmap/practice"
              className="group h-8 font-comic text-2xl text-slate-400 no-underline dark:text-slate-700 max-sm:text-xl"
            >
              <div className="nav-up">
                {/* <div className="back"> */}
                (Practice)
              </div>
            </Link>
            <div className="self-bottom h-[2px] flex-auto bg-pink-400 dark:bg-pink-600"></div>
            <StopwatchDisplay />
            <div className="self-bottom h-[2px] w-[8px] rounded-tr-full bg-pink-400 dark:bg-pink-600"></div>
          </nav>
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
        </div>
      </div>
    </>
  );
}
