import NavTo from "./NavTo";

export default function PracticeInvitation({ to }) {
  return (
    <span className="font-straight text-xl text-pink-500 dark:text-pink-800">
      <NavTo to={to}>Practice!</NavTo>
    </span>
  );
}
