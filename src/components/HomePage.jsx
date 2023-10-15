import { useNavigate } from "react-router";
import useKeyPress from "../hooks/useKeyPress";
import { Link } from "react-router-dom";
import HomeCard from "./HomeCard";

export default function HomePage() {
  const navigate = useNavigate();

  useKeyPress(["l"], () => {
    navigate("learn");
  });
  useKeyPress(["p"], () => {
    navigate("practice");
  });

  function handleMouseMove(event) {
    const target = event.currentTarget;

    for (const card of target.children) {
      const rect = card.getBoundingClientRect();
      const relativeX = event.clientX - rect.left;
      const relativeY = event.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${relativeX}px`);
      card.style.setProperty("--mouse-y", `${relativeY}px`);
    }
  }

  return (
    <>
      <nav
        onMouseMove={handleMouseMove}
        className="font-display group flex h-screen flex-wrap content-center items-center justify-center justify-items-center gap-0.5 overflow-x-hidden"
      >
        <div className="light-card hover:animate-cardhover relative flex h-80 w-80 items-center justify-center rounded bg-emerald-400 before:absolute before:inset-0 before:h-full before:w-full before:rounded before:opacity-0 before:transition-opacity before:duration-500 before:content-[''] after:absolute after:inset-0 after:h-full after:w-full after:rounded after:opacity-0 after:transition-opacity after:duration-500 after:content-[''] hover:before:opacity-100 group-hover:after:opacity-100">
          <div className="light-card-content absolute z-[2] flex h-[calc(100%-4px)] w-[calc(100%-4px)] items-center justify-center rounded bg-emerald-600">
            <Link to="learn" className="text-4xl text-white no-underline">
              <p>Learn</p>
            </Link>
          </div>
        </div>
        <div className="light-card hover:animate-cardhover relative flex h-80 w-80 items-center justify-center rounded bg-pink-400 before:absolute before:inset-0 before:h-full before:w-full before:rounded before:opacity-0 before:transition-opacity before:duration-500 before:content-[''] after:absolute after:inset-0 after:h-full after:w-full after:rounded after:opacity-0 after:transition-opacity after:duration-500 after:content-[''] hover:before:opacity-100 group-hover:after:opacity-100">
          <div className="light-card-content absolute z-[2] flex h-[calc(100%-4px)] w-[calc(100%-4px)] items-center justify-center rounded bg-pink-600">
            <Link to="practice" className="text-4xl text-white no-underline">
              <p>Practice</p>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
