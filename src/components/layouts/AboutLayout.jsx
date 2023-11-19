import { Link, Outlet } from "react-router-dom";

export default function AboutLayout() {
  return (
    <>
      <Outlet context={{ foo: "some outlet context for exercises" }} />
    </>
  );
}
