import { Route, Routes } from "react-router";
import AboutPage from "../AboutPage";
import AboutLayout from "../AboutLayout";

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
