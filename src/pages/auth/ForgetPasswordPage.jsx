import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgetPasswordPage() {
  const [form, setForm] = useState({
    user_email: "",
    pin: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", form);
    // call API ở đây
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Quên mật khẩu</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              name="user_email"
              value={form.user_email}
              onChange={handleChange}
              placeholder="Nhập email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="">
            <label className="block mb-1 text-sm font-medium">
              Mã nhận được qua Email
            </label>
            <input
              type=""
              name="pin"
              value={form.pin}
              onChange={handleChange}
              placeholder="Nhập mã"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Lấy lại mật khẩu
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          <Link
            to="/auth/login"
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Quay lại đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}
