import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ForgetPasswordPage from "../pages/auth/ForgetPasswordPage";

export default function AuthRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forget_password" element={<ForgetPasswordPage />} />
      </Route>
    </Routes>
  );
}
