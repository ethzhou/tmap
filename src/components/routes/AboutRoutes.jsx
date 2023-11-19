import { Route, Routes } from "react-router";
import AboutPage from "../AboutPage";
import AboutLayout from "../layouts/AboutLayout";

export default function AboutRoutes() {
  return (
    <>
      <Routes>
        <Route element={<AboutLayout />}>
          <Route index element={<AboutPage />} />
        </Route>
      </Routes>
    </>
  );
}
