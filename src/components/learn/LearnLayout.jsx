import { Link, Outlet } from "react-router-dom"

export default function LearnLayout() {
  return (
    <>
      <Link to='/learn/pitch'>pitch</Link>
      <Link to='/learn/rhythm'>rhythm</Link>
      <Outlet context={{foo: 'some outlet context for layouts'}} />
    </>
  );
}