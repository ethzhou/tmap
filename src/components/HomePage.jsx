import { useNavigate } from "react-router";
import useKeyPress from "../hooks/useKeyPress";
import { Link } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  useKeyPress(["l"], () => {
    navigate("learn");
  });
  useKeyPress(["p"], () => {
    navigate("practice");
  });

  function handleMouseMoveLightPos(event) {
    const target = event.currentTarget;

    for (const card of target.children) {
      const rect = card.getBoundingClientRect();
      const relativeX = event.clientX - rect.x;
      const relativeY = event.clientY - rect.y;

      card.style.setProperty("--light-x", `${relativeX}px`);
      card.style.setProperty("--light-y", `${relativeY}px`);
    }
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="flex h-screen w-[40rem] flex-col justify-center gap-0.5">
          <nav className="flex justify-between px-1">
            <Link
              to="/tmap/"
              className="font-name h-8 text-2xl text-black no-underline"
            >
              <div>tmap ♫</div>
            </Link>
            <Link
              to="about"
              className="font-name text-2xl text-slate-400 no-underline"
            >
              <div>// (about)</div>
            </Link>
          </nav>
          <nav
            onMouseMove={handleMouseMoveLightPos}
            className="group relative flex h-80 w-full flex-wrap items-center justify-center justify-items-center gap-1 overflow-x-hidden font-display"
          >
            <div className="light-card relative flex aspect-square flex-auto items-center justify-center rounded bg-emerald-400 before:pointer-events-none before:absolute before:inset-0 before:z-[3] before:h-full before:w-full before:rounded before:opacity-0 before:transition-opacity before:duration-500 before:content-[''] after:absolute after:inset-0 after:z-[1] after:h-full after:w-full after:rounded after:opacity-0 after:transition-opacity after:duration-500 after:content-[''] hover:animate-cardhover hover:before:opacity-100 group-hover:after:opacity-100">
              <div className="light-card-content absolute z-[2] flex h-[calc(100%-4px)] w-[calc(100%-4px)] items-center justify-center rounded bg-emerald-600">
                <Link
                  to="learn"
                  className="flex h-full w-full items-center justify-center text-4xl text-white no-underline"
                >
                  <div>Learn</div>
                </Link>
              </div>
            </div>
            <div className="light-card relative flex aspect-square flex-auto items-center justify-center rounded bg-pink-400 before:pointer-events-none before:absolute before:inset-0 before:z-[3] before:h-full before:w-full before:rounded before:opacity-0 before:transition-opacity before:duration-500 before:content-[''] after:absolute after:inset-0 after:z-[1] after:h-full after:w-full after:rounded after:opacity-0 after:transition-opacity after:duration-500 after:content-[''] hover:animate-cardhover hover:before:opacity-100 group-hover:after:opacity-100">
              <div className="light-card-content absolute z-[2] h-[calc(100%-4px)] w-[calc(100%-4px)] rounded bg-pink-600">
                <Link
                  to="practice"
                  className="flex h-full w-full items-center justify-center text-4xl text-white no-underline"
                >
                  <div>Practice</div>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
