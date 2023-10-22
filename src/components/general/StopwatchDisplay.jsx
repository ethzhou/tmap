import { useStopwatch } from "react-timer-hook";

export default function StopwatchDisplay({ stopwatch }) {
  stopwatch ??= useStopwatch({
    autoStart: true,
  });

  return (
    <>
      <div className="font-mono text-2xl text-slate-700 dark:text-slate-200">
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
    </>
  );
}
