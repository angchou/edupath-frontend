import SearchBar from "../../../components/SearchBar";
import { useState, useEffect } from "react";
import { FaPencil } from "react-icons/fa6";

import { Eye, EyeOff, X } from "lucide-react";
import {
  getAllEmployees,
  updateEmployee,
} from "../../../services/EmployeeService";

import { useToast } from "../../../contexts/ToastContext";

export default function UpdateEmployee() {
  const { addToast } = useToast();

  const [employees, setEmployees] = useState([]);

  const fetchData = async () => {
    try {
      const data = await getAllEmployees();
      setEmployees(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [openUpdateEmployeeForm, setOpenUpdateEmployeeForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [seePassword, setSeePassword] = useState(false);
  const [form, setForm] = useState({
    userID: "",
    hoTen: "",
    email: "",
    password: "",
    reenter_password: "",
    roleID: 0,
    chucVu: "",
    luongCoBan: 0,
    luongPhuCap: 0,
  });

  const filteredEmployees = employees.filter((emp) => {
    const keyword = searchTerm.toLowerCase();

    return (
      emp.userID.toLowerCase().includes(keyword) ||
      emp.hoTen.toLowerCase().includes(keyword) ||
      emp.email.toLowerCase().includes(keyword) ||
      getRoleName(emp.roleID).toLowerCase().includes(keyword)
    );
  });

  useEffect(() => {
    if (selectedEmployee) {
      setForm({
        hoTen: selectedEmployee?.hoTen || "",
        email: selectedEmployee?.email || "",
        password: selectedEmployee?.password || "",
        reenter_password: "",
        chucVu: selectedEmployee?.chucVu || "",
        roleID: selectedEmployee?.roleID || 0,
        luongCoBan: selectedEmployee?.luongCoBan || 0,
        luongPhuCap: selectedEmployee?.luongPhuCap || 0,
      });
    }
  }, [selectedEmployee]);

  const buildPayload = () => {
    return {
      userID: selectedEmployee?.userID,
      hoTen: form?.hoTen,
      email: form?.email,
      password: form?.password,
      chucVu: form?.chucVu,
      roleID: form?.roleID,
      luongCoBan: form?.luongCoBan,
      luongPhuCap: form?.luongPhuCap,
    };
  };

  const handleClose = () => {
    setSeePassword(false);
    setOpenUpdateEmployeeForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = buildPayload();
    if (form.reenter_password === "") {
      addToast("Vui lòng nhập lại mật khẩu nhân viên!", "");
      return;
    }
    if (payload.password !== form.reenter_password) {
      addToast("Mật khẩu nhập lại không chính xác!", "");
      return;
    }

    const data = await updateEmployee(payload);
    if (data) {
      addToast("Thay đổi thông tin nhân viên không thành công!", "error");
    } else {
      fetchData();
      addToast("Thay đổi thông tin nhân viên thành công!", "success");
    }
    handleClose();
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

  return (
    <div className="flex h-[90vh] flex-col font-sans">
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="md:h-16 bg-white border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-4 md:px-8 py-3">
          <p className="text-sm text-gray-500">
            Tổng cộng {employees.length} nhân viên
          </p>
          <SearchBar
            label="Tìm kiếm nhân viên"
            value={searchTerm}
            onChange={(value) => setSearchTerm(value)}
          />
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
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((emp) => (
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

                        <td className="px-6 py-4 text-right flex gap-5">
                          <button
                            className="flex items-center gap-1 text-[#14b83a] hover:text-[#0b9e2d] hover:scale-110 text-sm font-medium transition"
                            onClick={() => {
                              setOpenUpdateEmployeeForm(true);
                              setSelectedEmployee(emp);
                            }}
                          >
                            <FaPencil size={16} />
                            Chỉnh sửa
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-10 text-gray-400 italic"
                      >
                        Không tìm thấy nhân viên
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {openUpdateEmployeeForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md shadow-lg p-6 relative">
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-5 mt-4">
              Cập nhật thông tin nhân viên
            </h2>

            <form className="space-y-3 cursor-default" onSubmit={handleSubmit}>
              <input
                type="text"
                name="hoTen"
                value={form.hoTen}
                placeholder="Họ và tên"
                onChange={(e) => setForm({ ...form, hoTen: e.target.value })}
                className="w-full px-4 py-2 border-b-1 outline-none"
                required
              />

              <input
                type="email"
                name="email"
                value={form.email}
                placeholder="Email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2 border-b-1 outline-none"
                required
              />

              <div className="relative flex items-center">
                <input
                  type={seePassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  placeholder="Mật khẩu"
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="w-full px-4 py-2 border-b-1 outline-none"
                  required
                />

                {seePassword ? (
                  <EyeOff
                    className="absolute right-3 cursor-pointer text-blue-500 transition"
                    onClick={() => setSeePassword(false)}
                  />
                ) : (
                  <Eye
                    className="absolute right-3 cursor-pointer transition"
                    onClick={() => setSeePassword(true)}
                  />
                )}
              </div>

              <input
                type="password"
                name="reenter_password"
                value={form.reenter_password}
                placeholder="Nếu thay đổi mật khẩu thì nhập lại"
                onChange={(e) =>
                  setForm({ ...form, reenter_password: e.target.value })
                }
                className="w-full px-4 py-2 border-b-1 outline-none"
              />

              <input
                type="text"
                name="chucVu"
                value={form.chucVu}
                placeholder="Chức vụ"
                onChange={(e) => setForm({ ...form, chucVu: e.target.value })}
                className="w-full px-4 py-2 border-b-1 outline-none"
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
                placeholder="Lương cơ bản"
                className="w-full px-4 py-2 border-b-1 outline-none"
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
                placeholder="Lương phụ cấp"
                className="w-full px-4 py-2 border-b-1 outline-none"
                required
              />

              <select
                name="roleID"
                value={form.roleID || 0}
                onChange={(e) =>
                  setForm({
                    ...form,
                    roleID: e.target.value,
                  })
                }
                className="w-full border-b-1 p-2 outline-none focus:border-blue-500"
                required
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
                  className="w-full bg-[#cf345a] text-white py-2 hover:bg-[#c71c46] transition"
                  onClick={handleClose}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 hover:bg-blue-700 transition"
                >
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
