import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerService } from "../../services/authService";

import { useToast } from "../../contexts/ToastContext";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [form, setForm] = useState({
    hoTen: "",
    email: "",
    password: "",
    reenter_password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const buildPayload = () => {
    return {
      hoTen: form.hoTen,
      email: form.email,
      password: form.password,
      reenter_password: form.reenter_password,
    };
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = buildPayload(form);
    if (
      !payload.email ||
      !payload.email ||
      !payload.password ||
      !payload.reenter_password
    ) {
      addToast("Không được để trống thông tin đăng ký", "");
      return;
    }
    if (payload.password !== payload.reenter_password) {
      addToast("Mật khẩu nhập lại không khớp, vui lòng thử lại", "error");
      return;
    }

    const status = await registerService(payload);
    if (status) {
      navigate("/auth/login");
      addToast(
        "Đăng ký thành công, vui lòng đăng nhập vào hệ thống",
        "success",
      );
    } else {
      addToast(
        "Đăng ký thất bại, có vẻ đã xảy ra lỗi, vui lòng đăng ký lại",
        "error",
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Đăng ký</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium">
              Tên người dùng
            </label>
            <input
              name="hoTen"
              value={form.hoTen}
              onChange={handleChange}
              placeholder="Nhập tên người dùng"
              className="w-full px-4 py-2 border-b-1 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Nhập email"
              className="w-full px-4 py-2 border-b-1 outline-none"
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
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Nhập lại mật khẩu
            </label>
            <input
              type="password"
              name="reenter_password"
              value={form.reenter_password}
              onChange={handleChange}
              placeholder="Nhập lại mật khẩu"
              className="w-full px-4 py-2 border-b-1 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Đăng ký
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Đã có tài khoản?{" "}
          <Link
            to="/auth/login"
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}
