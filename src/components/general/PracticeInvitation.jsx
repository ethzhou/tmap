import NavTo from "./NavTo";

export default function PracticeInvitation({ to }) {
  return (
    <span className="inline-block border border-solid border-pink-400 font-straight text-xl text-pink-500 transition-all duration-300 ease-in-out hover:border-pink-600 hover:bg-pink-600 hover:text-slate-50 dark:border-pink-600 dark:text-pink-800 dark:hover:border-pink-800 dark:hover:bg-pink-800 dark:hover:text-slate-50">
      <NavTo to={to}>Practice!</NavTo>
    </span>
  );
}
