import { Link } from "react-router-dom";

export default function NavTo({ to, children }) {
  return (
    <Link to={to} className="group text-inherit no-underline">
      <div className="flex before:relative before:right-0 before:mr-1 before:translate-x-0 before:translate-y-[-10%] before:rotate-0 before:transition-all before:duration-300 before:ease-in-out before:content-['⇢'] before:group-hover:-right-full before:group-hover:-translate-x-full before:group-hover:rotate-[-10deg]">
        <div className="relative left-0 translate-x-0 transition-all duration-300 ease-in-out group-hover:-left-full group-hover:translate-x-full">
          {children}
        </div>
      </div>
    </Link>
  );
}
