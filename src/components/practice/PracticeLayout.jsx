import { Link, Outlet } from "react-router-dom";

export default function PracticeLayout() {
  return (
    <>
      <Link to='interval-reading'>interval-reading</Link>
      <Link to='interval-dictation'>interval-dictation</Link>
      <Outlet context={{foo: 'some outlet context for exercises'}} />
    </>
  )
}