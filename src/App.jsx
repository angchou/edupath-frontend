import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthRoutes from "./routes/AuthRoutes";
import LearnerRoutes from "./routes/LearnerRoutes";
import PaycheckRoutes from "./routes/PaycheckRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import FinanceRoutes from "./routes/FinanceRoutes";
import SupportRoutes from "./routes/SupportRoutes";
import QaRoutes from "./routes/QaRoutes";
import MentorRoutes from "./routes/MentorRoutes";
import { ToastProvider } from "./contexts/ToastContext";

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/auth/login" replace />} />
          <Route path="/auth/*" element={<AuthRoutes />} />
          <Route path="/learner/*" element={<LearnerRoutes />} />
          <Route path="/paycheck/*" element={<PaycheckRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/finance/*" element={<FinanceRoutes />} />
          <Route path="/support/*" element={<SupportRoutes />} />
          <Route path="/qa/*" element={<QaRoutes />} />
          <Route path="/mentor/*" element={<MentorRoutes />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
