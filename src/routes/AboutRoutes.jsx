import { Route, Routes } from "react-router";
import AboutPage from "../components/AboutPage";

export default function AboutRoutes() {
  return (
    <>
      <Routes>
        {/* temporary */}
        <Route element={<PracticeLayout />}>
          <Route index element={<AboutPage />} />
        </Route>
      </Routes>
    </>
  );
}
