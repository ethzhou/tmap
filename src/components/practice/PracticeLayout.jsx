import { Link, Outlet } from "react-router-dom";

export default function PracticeLayout() {
  return (
    <>
      <nav>
        <Link to='interval-reading'>interval-reading</Link><br />
        <Link to='interval-dictation'>interval-dictation</Link><br />
      </nav>
      <nav>
        <Link to='four-part-harmony'>four-part-harmony</Link><br />
      </nav>
      <Outlet context={{foo: 'some outlet context for exercises'}} />
    </>
  )
}