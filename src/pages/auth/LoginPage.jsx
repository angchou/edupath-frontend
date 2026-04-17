import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginService } from "../../services/authService";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("All fields are required!");
      return;
    }

    setError("");
    const roles = await loginService(form);
    if (roles.includes("Learner")) {
      navigate("/learner/course");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Đăng nhập</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Nhập email"
              className="w-full px-4 py-2 border-b-1 outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Nhập mật khẩu"
              className="w-full px-4 py-2 border-b-1 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Đăng nhập
          </button>

          {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        </form>

        <div className="flex justify-between">
          <p className="text-sm text-center mt-4">
            <Link
              to="/auth/forget_password"
              className="text-blue-500 cursor-pointer hover:underline"
            >
              Quên mật khẩu?
            </Link>
          </p>

          <p className="text-sm text-center mt-4">
            Chưa có tài khoản?{" "}
            <Link
              to="/auth/register"
              className="text-blue-500 cursor-pointer hover:underline"
            >
              Đăng ký
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
