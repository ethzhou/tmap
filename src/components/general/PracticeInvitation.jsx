import NavTo from "./NavTo";

export default function PracticeInvitation({ to }) {
  return (
    <span className="font-comic text-xl text-pink-500 dark:text-fuchsia-500">
      <NavTo to={to}>Practice!</NavTo>
    </span>
  );
}
