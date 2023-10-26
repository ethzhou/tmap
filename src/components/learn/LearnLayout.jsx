import { Link, Outlet } from "react-router-dom";

export default function LearnLayout() {
  return (
    <>
      <Outlet context={{ foo: "some outlet context for layouts" }} />
    </>
  );
}
