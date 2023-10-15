import { Link, Outlet } from "react-router-dom"

export default function LearnLayout() {
  return (
    <>
      <Link to='pitch'>pitch</Link>
      <Link to='rhythm'>rhythm</Link>
      <Outlet context={{foo: 'some outlet context for layouts'}} />
    </>
  );
}