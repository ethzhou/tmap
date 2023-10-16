import { Route, Routes } from "react-router";
import AboutPage from "../AboutPage";

export default function AboutRoutes() {
  return (
    <>
      <Routes>
        {/* temporary */}
        <Route element={<AboutLayout />}>
          <Route index element={<AboutPage />} />
        </Route>
      </Routes>
    </>
  );
}
