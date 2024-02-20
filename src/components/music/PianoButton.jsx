import PianoPlayer from "../../classes/PianoPlayer";

const pianoPlayer = new PianoPlayer();

export default function PianoButton({
  onClick,
  label,
  pitches,
  notePlayDuration,
  spacing,
  doStop,
}) {
  return (
    <>
      <button
        className="border-0 px-6 py-2 font-straight text-lg"
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
        {label}
      </button>
    </>
  );
}
