import { Plus, Eye, X } from "lucide-react";
import { useState, useEffect } from "react";

import {
  getNewEmployees,
  createEmployee,
} from "../../../services/EmployeeService";

export default function AddEmployee() {
  const [openAddEmployeeForm, setOpenAddEmployeeForm] = useState(false);
  const [form, setForm] = useState({
    hoTen: "",
    email: "",
    password: "",
    reenter_password: "",
    chucVu: "",
    luongCoBan: 0,
    luongPhuCap: 0,
    roleID: 0,
  });
  const [employees, setEmployees] = useState([]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const getRoleName = (id) => {
    if (id == 3) {
      return "Hỗ trợ";
    } else if (id == 4) {
      return "Đảm bảo chất lượng";
    } else if (id == 5) {
      return "Tài chính";
    } else return "Quản trị viên";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNewEmployees();
        setEmployees(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const resetForm = () => {
    setForm({
      hoTen: "",
      email: "",
      password: "",
      reenter_password: "",
      chucVu: "",
      luongCoBan: 0,
      luongPhuCap: 0,
      roleID: 0,
    });
  };

  const buildPayload = () => {
    return {
      hoTen: form.hoTen,
      email: form.email,
      password: form.password,
      reenter_password: form.reenter_password,
      chucVu: form.chucVu,
      luongCoBan: Number(form.luongCoBan),
      luongPhuCap: Number(form.luongPhuCap),
      roleID: Number(form.roleID),
    };
  };

  const handleCreateEmployee = async (e) => {
    const payload = buildPayload();
    if (payload.password !== payload.reenter_password) {
      alert("Nhập lại mật khẩu sai!");
      return;
    }

    const data = await createEmployee(payload);
    if (data) {
      console.log(data);
    }

    resetForm();
    setOpenAddEmployeeForm(false);
  };

  return (
    <div className="flex h-[90vh] flex-col font-sans">
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="md:h-16 bg-white border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-4 md:px-8 py-3">
          <p className="text-sm text-gray-500">
            Có {employees.length} nhân viên mới được thêm ngày hôm nay
          </p>

          <div className="group">
            <button
              className="flex text-sm items-center justify-center gap-2 px-4 py-2 text-blue-500 border-1 border-blue-500 group-hover:text-white group-hover:bg-blue-500 transition"
              onClick={() => setOpenAddEmployeeForm(true)}
            >
              <Plus size={18} />
              Thêm nhân viên
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-2">
          <div className="h-full bg-white border border-gray-100 overflow-x-auto">
            <div className="max-h-[85vh] overflow-y-auto">
              <table className="w-full min-w-[700px] text-left">
                <thead className="bg-gray-50 border-b border-gray-100 sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      Mã
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      Họ và Tên
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      Email
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      Vai trò
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      Ngày tạo
                    </th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-50">
                  {employees.map((emp) => (
                    <tr
                      key={emp.userID}
                      className="hover:bg-blue-50/30 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {emp.userID}
                      </td>

                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">
                          {emp.hoTen}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {emp.email}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {getRoleName(emp.roleID)}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {emp.ngayTao}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {openAddEmployeeForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md shadow-lg p-6 relative">
            <button
              onClick={() => setOpenAddEmployeeForm(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-5 mt-4">
              Nhập thông tin nhân viên
            </h2>

            <form className="space-y-3" onSubmit={handleCreateEmployee}>
              <input
                type="text"
                placeholder="Họ và tên"
                name="hoTen"
                value={form.hoTen}
                onChange={handleChange}
                className="w-full px-4 py-2 border-b-1 outline-none focus:border-blue-500 transition"
                required
              />

              <input
                type="email"
                placeholder="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border-b-1 outline-none focus:border-blue-500 transition"
                required
              />

              <input
                type="password"
                placeholder="Mật khẩu"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border-b-1 outline-none focus:border-blue-500 transition"
                required
              />

              <input
                type="password"
                placeholder="Nhập lại mật khẩu"
                name="reenter_password"
                value={form.reenter_password}
                onChange={handleChange}
                className="w-full px-4 py-2 border-b-1 outline-none focus:border-blue-500 transition"
                required
              />

              <input
                type="text"
                placeholder="Chức vụ"
                name="chucVu"
                value={form.chucVu}
                onChange={handleChange}
                className="w-full px-4 py-2 border-b-1 outline-none focus:border-blue-500 transition"
                required
              />

              <input
                type="text"
                name="luongCoBan"
                value={
                  form.luongCoBan
                    ? Number(form.luongCoBan).toLocaleString("vi-VN")
                    : ""
                }
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, "");
                  setForm({ ...form, luongCoBan: raw });
                }}
                placeholder="Lương cơ bản (đồng)"
                className="w-full px-4 py-2 border-b-1 outline-none focus:border-blue-500 transition"
                required
              />

              <input
                type="text"
                name="luongPhuCap"
                value={
                  form.luongPhuCap
                    ? Number(form.luongPhuCap).toLocaleString("vi-VN")
                    : ""
                }
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, "");
                  setForm({ ...form, luongPhuCap: raw });
                }}
                placeholder="Lương phụ cấp (đồng)"
                className="w-full px-4 py-2 border-b-1 outline-none focus:border-blue-500 transition"
                required
              />

              <select
                value={form.roleID}
                name="roleID"
                onChange={handleChange}
                className="w-full px-4 py-2 border-b-1 outline-none focus:border-blue-500 transition"
                required
              >
                <option value={0} disabled>
                  Chọn vai trò
                </option>

                <option value={3}>Hỗ trợ</option>
                <option value={4}>Quản lý chất lượng</option>
                <option value={5}>Tài chính</option>
              </select>

              <div className="flex gap-1 mt-5">
                <button
                  type="button"
                  className="w-full text-white py-2 bg-[#cf345a] hover:bg-[#c71c46] transition"
                  onClick={() => {
                    setOpenAddEmployeeForm(false);
                  }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 hover:bg-blue-700 transition"
                >
                  Tạo nhân viên
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
