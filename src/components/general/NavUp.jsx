import { Link } from "react-router-dom";

export default function NavUp({ to, children }) {
  return (
    <Link to={to} className="group text-inherit no-underline">
      <div className="before:mr-0.5 before:inline-block before:rotate-0 before:transition-transform before:duration-500 before:ease-in-out before:content-['⇡'] group-hover:before:rotate-[360deg]">
        <span className="font-comic">(</span>
        {children}
        <span className="font-comic">)</span>
      </div>
    </Link>
  );
}
