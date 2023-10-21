import { Link } from "react-router-dom";

export default function IntervalExercise({
  name,
  record,
  stopwatch,
  exerciseContent,
}) {
  return (
    <>
      <div className="my-16 flex justify-center">
        <div className="flex w-[48rem] flex-col justify-start gap-1">
          <nav className="mb-10 flex items-baseline gap-2">
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
            <div className="self-bottom h-[2px] flex-auto bg-pink-600"></div>
            <div className="font-mono text-2xl text-slate-700 no-underline dark:text-slate-200">
              {stopwatch.days !== 0 && <span>{stopwatch.days}:</span>}
              {(stopwatch.days !== 0 || stopwatch.hours !== 0) && (
                <span>{String(stopwatch.hours).padStart(2, "0")}:</span>
              )}
              {(stopwatch.days !== 0 ||
                stopwatch.hours !== 0 ||
                stopwatch.minutes !== 0) && (
                <span>{String(stopwatch.minutes).padStart(2, "0")}:</span>
              )}
              {(stopwatch.days !== 0 ||
                stopwatch.hours !== 0 ||
                stopwatch.minutes !== 0 ||
                stopwatch.seconds !== 0 ||
                stopwatch.totalSeconds === 0) && (
                <span>{String(stopwatch.seconds).padStart(2, "0")}</span>
              )}
            </div>
            <div className="self-bottom h-[2px] w-[8px] rounded-tr-full bg-pink-600"></div>
          </nav>
          <div className="flex flex-col items-center">
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
