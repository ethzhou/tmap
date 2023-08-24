import { Link, Outlet } from "react-router-dom";

export default function PracticeLayout() {
  return (
    <>
      <nav>
        <Link to='interval-reading'>interval-reading</Link><br />
        <Link to='interval-dictation'>interval-dictation</Link><br />
      </nav>
      <nav>
        <Link to='four-part-figured-bass'>four-part-figured-bass</Link><br />
        <Link to='four-part-numerals'>four-part-numerals</Link><br />
      </nav>
      <Outlet context={{foo: 'some outlet context for exercises'}} />
    </>
  )
}