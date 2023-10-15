import { Link } from "react-router-dom";

export default function HomeCard({ text, twHue, graphic }) {
  function handleMouseMove(event) {
    const target = event.currentTarget;

    const rect = target.getBoundingClientRect();
    const relativeX = event.clientX - rect.left;
    const relativeY = event.clientY - rect.top;

    target.style.setProperty("--mouse-x", `${relativeX}px`);
    target.style.setProperty("--mouse-y", `${relativeY}px`);
  }

  return (
    <>
      <div
        onMouseMove={handleMouseMove}
        className={`light-card hover:animate-cardhover relative h-80 w-80 bg-${twHue}-600 text-4xl`}
      >
        <div className="light-card-content">
          <Link
            to="learn"
            className="flex h-full items-center justify-center text-inherit no-underline"
          >
            <p>Learn</p>
          </Link>
        </div>
      </div>
    </>
  );
}
