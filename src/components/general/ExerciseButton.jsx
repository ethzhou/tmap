import { Link } from "react-router-dom";

const buttonPurposeColors = {
  play: [
    "bg-emerald-100 border-emerald-500 text-emerald-600 hover:bg-emerald-300 dark:bg-emerald-600 dark:border-emerald-300 dark:border-emerald-200 dark:text-emerald-200 dark:hover:bg-emerald-400",
  ],
  save: [
    "bg-sky-100 border-sky-500 text-sky-600 hover:bg-sky-300 dark:bg-sky-600 dark:border-sky-300 dark:border-sky-200 dark:text-sky-200 dark:hover:bg-sky-400",
  ],
  option: [
    "bg-rose-100 border-rose-500 text-rose-600 hover:bg-rose-300 dark:bg-rose-600 dark:border-rose-300 dark:border-rose-200 dark:text-rose-200 dark:hover:bg-rose-400",
  ],
};

export default function ExerciseButton({ buttonPurpose, onClick, children }) {
  const color = buttonPurposeColors[buttonPurpose];
  return (
    <div className="place-center flex place-content-center">
      <button
        className={`${color} exercise-button min-w-[8em] flex-none rounded-full border border-solid px-4 py-2 font-text text-lg`}
        type="button"
        onClick={onClick}
      >
        <span className="text-center">{children}</span>
      </button>
    </div>
  );
}
