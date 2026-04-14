import SearchBar from "../../../components/SearchBar";
import { useState, useEffect } from "react";
import { FaPencil } from "react-icons/fa6";

import { Eye, EyeOff, X } from "lucide-react";

export default function UpdateEmployee() {
  const employees = [
    {
      userID: "EMP001",
      hoTen: "Nguyễn Văn A",
      email: "vana@company.com",
      password: "1234",
      roleID: 3,
      chucVu: "Dev",
      ngayTao: "2024-10-12",
    },
    {
      userID: "EMP002",
      hoTen: "Trần Thị B",
      email: "thib@company.com",
      password: "1234",
      roleID: 4,
      chucVu: "QA",
      ngayTao: "2024-09-20",
    },
    {
      userID: "EMP003",
      hoTen: "Lê Văn C",
      email: "vanc@company.com",
      password: "1234",
      roleID: 6,
      chucVu: "PM",
      ngayTao: "2024-08-15",
    },
    {
      userID: "EMP004",
      hoTen: "Phạm Thị D",
      email: "thid@company.com",
      password: "1234",
      roleID: 5,
      chucVu: "UI/UX",
      ngayTao: "2024-07-10",
    },
    {
      userID: "EMP005",
      hoTen: "Hoàng Văn E",
      email: "vane@company.com",
      password: "1234",
      roleID: 3,
      chucVu: "Ops",
      ngayTao: "2024-06-05",
    },
    {
      userID: "EMP006",
      hoTen: "Đỗ Thị F",
      email: "thif@company.com",
      password: "1234",
      roleID: 4,
      chucVu: "Nhân sự",
      ngayTao: "2024-05-01",
    },
  ];

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [openModal, setOpenModal] = useState(false);
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
  });

  const filteredEmployees = employees.filter((emp) => {
    const keyword = searchTerm.toLowerCase();

    return (
      emp.userID.toLowerCase().includes(keyword) ||
      emp.hoTen.toLowerCase().includes(keyword) ||
      emp.email.toLowerCase().includes(keyword)
    );
  });
  const getRoleName = (roleID) => {
    switch (roleID) {
      case 3:
        return "Hỗ trợ";
      case 4:
        return "Quản lý chất lượng";
      case 5:
        return "Tài chính";
      case 6:
        return "Quản trị viên";
      default:
        return "Không rõ";
    }
  };
  useEffect(() => {
    if (selectedEmployee) {
      setForm({
        hoTen: selectedEmployee.hoTen || "",
        email: selectedEmployee.email || "",
        password: selectedEmployee.password || "",
        reenter_password: selectedEmployee.reenter_password || "",
        chucVu: selectedEmployee.chucVu || "",
        roleID: selectedEmployee.roleID || 0,
      });
    }
  }, [selectedEmployee]);
  const submitForm = (e) => {
    e.preventDefault();

    if (
      form.password !== selectedEmployee.password &&
      form.password !== form.reenter_password
    ) {
      alert("Password doesn't match");
      return;
    }

    console.log(form);
  };
  return (
    <div className="flex flex-col bg-gray-50 font-sans">
      <div className="p-5 flex-1 flex flex-col overflow-hidden">
        <header className="md:h-16 bg-white border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-4 md:px-8 py-3">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            Cập nhật thông tin nhân viên<nav></nav>
          </h2>
        </header>

        <main className="flex-1 p-4 md:p-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-6">
            <p className="text-sm text-gray-500">
              Tổng cộng {employees.length} nhân viên
            </p>
            <SearchBar
              label="Tìm kiếm nhân viên"
              value={searchTerm}
              onChange={(value) => setSearchTerm(value)}
            />
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
                              setOpenModal(true);
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

      {openModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">
            <button
              onClick={() => {
                setOpenModal(false);
                setSeePassword(false);
              }}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-5 mt-4">
              Cập nhật thông tin nhân viên
            </h2>

            <form className="space-y-3 cursor-default" onSubmit={submitForm}>
              <input
                type="text"
                name="hoTen"
                value={form.hoTen}
                placeholder="Họ và tên"
                onChange={(e) => setForm({ ...form, hoTen: e.target.value })}
                className="w-full border rounded-lg p-2 outline-none focus:border-blue-500"
                required
              />

              <input
                type="email"
                name="email"
                value={form.email}
                placeholder="Email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border rounded-lg p-2 outline-none focus:border-blue-500"
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
                  className="w-full border rounded-lg p-2 outline-none focus:border-blue-500"
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
                placeholder="Nhập lại mật khẩu"
                onChange={(e) =>
                  setForm({ ...form, reenter_password: e.target.value })
                }
                className="w-full border rounded-lg p-2 outline-none focus:border-blue-500"
              />

              <input
                type="text"
                name="chucVu"
                value={form.chucVu}
                placeholder="Chức vụ"
                onChange={(e) => setForm({ ...form, chucVu: e.target.value })}
                className="w-full border rounded-lg p-2 outline-none focus:border-blue-500"
                required
              />
              <select
                name="roleID"
                value={form.roleID || 0}
                onChange={(e) =>
                  setForm({
                    ...form,
                    roleID: Number(e.target.value),
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
                  className="w-full bg-[#cf345a] text-white py-2 rounded-lg hover:bg-[#c71c46] transition"
                  onClick={() => {
                    setOpenModal(false);
                    setSeePassword(false);
                  }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
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
