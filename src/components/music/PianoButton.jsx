import PianoPlayer from "../../classes/PianoPlayer";

const pianoPlayer = new PianoPlayer();

export default function PianoButton({
  onClick,
  title,
  pitches,
  notePlayDuration,
  spacing,
  doStop,
  children,
  gap = 2,
}) {
  return (
    <>
      <div
        className="flex items-center [&>*]:flex-none"
        style={{ gap: `${gap / 4}rem` }}
      >
        <button
          className="flex h-4 w-4 place-content-center place-items-center rounded-full border-[1.5px] border-solid border-emerald-400 bg-emerald-300/40 p-0 text-center font-straight text-inherit hover:bg-emerald-300/20 dark:border-emerald-400 dark:bg-emerald-300/40 dark:hover:border-emerald-400/80 dark:hover:bg-emerald-300/20"
          title={title}
          onClick={event => {
            if (onClick) onClick(event);
            pianoPlayer.playNotes(
              pitches,
              notePlayDuration ?? 1,
              spacing,
              doStop ?? true,
            );
          }}
        >
          <span>{/* {label} */}</span>
        </button>
        {children && <div>{children}</div>}
      </div>
    </>
  );
}
