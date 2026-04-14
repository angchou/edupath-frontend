import { Plus, Eye, X } from "lucide-react";
import { useState } from "react";

export default function AddEmployee() {
  const [openModal, setOpenModal] = useState(false);
  const [form, setForm] = useState({
    hoTen: "",
    email: "",
    password: "",
    reenter_password: "",
    chucVu: "",
    roleID: 0,
  });
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();

    console.log(form);
  };

  const employees = [];

  return (
    <div className="flex flex-col bg-gray-50 font-sans">
      <div className="p-5 flex-1 flex flex-col overflow-hidden">
        <header className="md:h-16 bg-white border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-4 md:px-8 py-3">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            Thêm nhân viên
          </h2>
        </header>

        <main className="flex-1 p-4 md:p-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-6">
            <p className="text-sm text-gray-500">
              Có {employees.length} nhân viên mới được thêm
            </p>

            <button
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition hover:scale-105"
              onClick={() => setOpenModal(true)}
            >
              <Plus size={18} />
              Thêm nhân viên
            </button>
          </div>

          <div className="h-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
            <div className="max-h-[50vh] overflow-y-auto">
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
                      key={emp.id}
                      className="hover:bg-blue-50/30 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {emp.id}
                      </td>

                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">
                          {emp.name}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {emp.email}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {emp.role}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {emp.createdAt}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium">
                          <Eye size={16} />
                          Xem chi tiết
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-5 mt-4">
              Nhập thông tin nhân viên
            </h2>

            <form className="space-y-3" onSubmit={submitForm}>
              <input
                type="text"
                placeholder="Họ và tên"
                name="hoTen"
                value={form.hoTen}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 outline-none focus:border-blue-500"
              />

              <input
                type="email"
                placeholder="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 outline-none focus:border-blue-500"
              />

              <input
                type="password"
                placeholder="Mật khẩu"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 outline-none focus:border-blue-500"
              />

              <input
                type="password"
                placeholder="Nhập lại mật khẩu"
                name="reenter_password"
                value={form.reenter_password}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 outline-none focus:border-blue-500"
              />

              <input
                type="text"
                placeholder="Chức vụ"
                name="chucVu"
                value={form.chucVu}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 outline-none focus:border-blue-500"
              />

              <select
                value={form.roleID}
                name="roleID"
                onChange={handleChange}
                className="w-full border-b-1 p-2 outline-none focus:border-blue-500"
              >
                <option value={0} disabled>
                  Chọn vai trò
                </option>

                <option value={3}>Hỗ trợ</option>
                <option value={4}>Quản lý chất lượng</option>
                <option value={5}>Tài chính</option>
                <option value={6}>Admin</option>
              </select>

              <div className="flex gap-1 mt-5">
                <button
                  type="button"
                  className="w-full bg-[#cf345a] text-white py-2 rounded-lg hover:bg-[#c71c46] transition"
                  onClick={() => setOpenModal(false)}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
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
