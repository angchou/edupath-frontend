import { Routes, Route } from "react-router-dom";
import PaycheckLayout from "../layouts/PaycheckLayout";
import PaycheckPage from "../pages/paycheck/PaycheckPage";

export default function PaycheckRoutes() {
  return (
    <Routes>
      <Route element={<PaycheckLayout />}>
        <Route path="" element={<PaycheckPage />} />
      </Route>
    </Routes>
  );
}
