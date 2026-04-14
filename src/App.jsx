import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthRoutes from "./routes/AuthRoutes";
import LearnerRoutes from "./routes/LearnerRoutes";
import PaycheckRoutes from "./routes/PaycheckRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import FinanceRoutes from "./routes/FinanceRoutes";
import SupportRoutes from "./routes/SupportRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="/learner/*" element={<LearnerRoutes />} />
        <Route path="/paycheck/*" element={<PaycheckRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/finance/*" element={<FinanceRoutes />} />
        <Route path="/support/*" element={<SupportRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
