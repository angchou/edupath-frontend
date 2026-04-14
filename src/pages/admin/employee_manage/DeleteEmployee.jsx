import SearchBar from "../../../components/SearchBar";
import { useState } from "react";

import { Eye, X } from "lucide-react";
import { FaUserCircle, FaCode, FaTag } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaGear } from "react-icons/fa6";
import { IoCreate } from "react-icons/io5";

export default function DeleteEmployee() {
  const employees = [
    {
      userID: "EMP001",
      hoTen: "Nguyễn Văn A",
      email: "vana@company.com",
      roleID: "Developer",
      chucVu: "Dev",
      ngayTao: "2024-10-12",
    },
    {
      userID: "EMP002",
      hoTen: "Trần Thị B",
      email: "thib@company.com",
      roleID: "Tester",
      chucVu: "QA",
      ngayTao: "2024-09-20",
    },
    {
      userID: "EMP003",
      hoTen: "Lê Văn C",
      email: "vanc@company.com",
      roleID: "Project Manager",
      chucVu: "PM",
      ngayTao: "2024-08-15",
    },
    {
      userID: "EMP004",
      hoTen: "Phạm Thị D",
      email: "thid@company.com",
      roleID: "Designer",
      chucVu: "UI/UX",
      ngayTao: "2024-07-10",
    },
    {
      userID: "EMP005",
      hoTen: "Hoàng Văn E",
      email: "vane@company.com",
      roleID: "DevOps",
      chucVu: "Ops",
      ngayTao: "2024-06-05",
    },
    {
      userID: "EMP006",
      hoTen: "Đỗ Thị F",
      email: "thif@company.com",
      roleID: "HR",
      chucVu: "Nhân sự",
      ngayTao: "2024-05-01",
    },
  ];

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmployees = employees.filter((emp) => {
    const keyword = searchTerm.toLowerCase();

    return (
      emp.userID.toLowerCase().includes(keyword) ||
      emp.hoTen.toLowerCase().includes(keyword) ||
      emp.email.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="flex flex-col bg-gray-50 font-sans">
      <div className="p-5 flex-1 flex flex-col overflow-hidden">
        <header className="md:h-16 bg-white border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-4 md:px-8 py-3">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            Xóa nhân viên
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
                          {emp.roleID}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600">
                          {emp.ngayTao}
                        </td>

                        <td className="px-6 py-4 text-right flex gap-5">
                          <button
                            className="flex items-center gap-1 text-[#cf345a] hover:text-[#c71c46] hover:scale-110 text-sm font-medium transition"
                            onClick={() => {
                              setOpenModal(true);
                              setSelectedEmployee(emp);
                            }}
                          >
                            Xóa nhân viên
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
              onClick={() => setOpenModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-5 mt-4">
              Xem lại thông tin nhân viên
            </h2>
            <div className="h-full flex flex-col items-center justify-center">
              <FaUserCircle className="size-12" />
              <div className="mt-5 w-full flex flex-col gap-2">
                <div className="flex gap-3">
                  <FaCode size={20} className="mt-1 text-yellow-500" />
                  <span className="font-bold">Mã nhân viên:</span>
                  {selectedEmployee?.userID}
                </div>
                <div className="flex gap-3">
                  <FaTag size={20} className="mt-1 text-blue-500" />
                  <span className="font-bold">Họ và tên:</span>
                  {selectedEmployee?.hoTen}
                </div>
                <div className="flex gap-3">
                  <MdEmail size={20} className="mt-1 text-red-600" />
                  <span className="font-bold">Email:</span>
                  {selectedEmployee?.email}
                </div>
                <div className="flex gap-3">
                  <FaGear size={20} className="mt-1 text-green-700" />
                  <span className="font-bold">Chức vụ:</span>
                  {selectedEmployee?.chucVu}
                </div>
                <div className="flex gap-3">
                  <FaGear size={20} className="mt-1 rotate-5 text-gray-500" />
                  <span className="font-bold">Vai trò:</span>
                  {selectedEmployee?.roleID}
                </div>
                <div className="flex gap-3">
                  <IoCreate size={20} className="mt-1 -rotate-5" />
                  <span className="font-bold">Ngày tạo tài khoản:</span>
                  {selectedEmployee?.ngayTao}
                </div>
              </div>
            </div>

            <form action="">
              <input
                type="text"
                placeholder="Nhập lại mã nhân viên để xóa"
                className="w-full border mt-4 rounded-lg p-2 outline-none focus:border-blue-500"
                required
              />
              <div className="flex gap-1 mt-5">
                <button
                  type="button"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  onClick={() => setOpenModal(false)}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="w-full bg-[#cf345a] text-white py-2 rounded-lg hover:bg-[#c71c46] transition"
                >
                  Xác nhận xóa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
