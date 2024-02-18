/**
 *
 * @param {number} gap A TailwindCSS gap value.
 * @param {Array<string>} notes The notes to print.
 * @param {Array<number>} selections Specifications 0-based index on which notes to indicate as selected.
 * @param {Array<number>} highlights Specifications by 0-based index on which notes to emphasize. If this is defined, the notes not included are faded.
 * @param {boolean} invert Whether to invert which notes are highlighted as specified by `highlights`.
 * @returns {import("react").ReactElement}
 */
export default function ScaleDisplay({
  gap = 6,
  notes,
  selections,
  highlights,
  invert = false,
}) {
  return (
    <>
      <div
        className={`flex items-baseline justify-center justify-items-center${
          highlights ? " text-slate-300 dark:text-slate-700" : ""
        }`}
        style={{ gap: `${gap / 4}rem` }}
      >
        {notes.map((note, i) => (
          <span
            /* TODO: Think about centering the text only if the item is selected. */
            className={`w-6 text-center${
              highlights && highlights.includes(i) !== invert
                ? " text-slate-800 dark:text-slate-200"
                : ""
            }${
              selections && selections.includes(i)
                ? " border border-solid border-slate-800 dark:border-slate-200"
                : ""
            }`}
            key={crypto.randomUUID()}
          >
            {note}
          </span>
        ))}
      </div>
    </>
  );
}
