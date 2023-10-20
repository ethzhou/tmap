import { Link } from "react-router-dom";

export default function IntervalExercise({
  record,
  totalSeconds,
  exerciseContent,
}) {
  return (
    <>
      <div className="my-10">
        <nav>
          <Link
            to="/tmap/practice"
            className="group ml-2 h-8 font-comic text-2xl text-slate-400 no-underline dark:text-slate-700 max-sm:text-xl"
          >
            <div className="nav-up">
              {/* <div className="back"> */}
              (Practice)
            </div>
          </Link>
        </nav>
        <div className="flex flex-col items-center">
          <div className="mb-6 font-clear">
            <span className="inline-block min-w-[72px] text-right font-mono text-6xl text-slate-800 dark:text-slate-200">
              {record.score}
            </span>
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {" "}
              of{" "}
            </span>
            <span className="w-8 font-redacted text-2xl text-slate-700 hover:font-mono dark:text-slate-300">
              {record.history.length}
            </span>
            <div>{totalSeconds}</div>
          </div>
          {exerciseContent}
          <div className="flex-auto"></div>
          <div className="mt-20 max-h-40 overflow-y-scroll scroll-smooth">
            <table className="relative table-fixed">
              <tbody className="font-comic">
                {record.history.map((item, index) => (
                  <tr key={index}>
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
              <thead className="sticky top-0 font-clear">
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
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
