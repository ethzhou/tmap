import FourPartProgression from "../../../music/FourPartProgression";

export default function FourPartProgressionDisplay(props) {
  return (
    <>
      <div className="rounded-lg border-solid border-orange-200 px-2 py-4 shadow-inner shadow-rose-300 dark:border-orange-300 dark:shadow-amber-800">
        {/* The double scaleY flips puts the scrollbar above the content instead of below it */}
        <div className="-scale-y-100 overflow-auto">
          <div className="-scale-y-100">
            {props.parts[0].length !== 0 && (
              <FourPartProgression {...props} scaleFactor={1} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
