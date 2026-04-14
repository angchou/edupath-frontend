import SearchBar from "../../../components/SearchBar";
import { useState } from "react";

import { X } from "lucide-react";
import { FaUserCircle, FaCode, FaTag } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaGear } from "react-icons/fa6";
import { IoCreate } from "react-icons/io5";
import { CgUnblock } from "react-icons/cg";

export default function UnbanCustomerPage() {
  const customers = [
    {
      userID: "EMP001",
      hoTen: "Nguyễn Văn A",
      email: "vana@company.com",
      roleID: 1,
      ngayTao: "2024-10-12",
    },
    {
      userID: "EMP002",
      hoTen: "Trần Thị B",
      email: "thib@company.com",
      roleID: 1,
      ngayTao: "2024-09-20",
    },
    {
      userID: "EMP003",
      hoTen: "Lê Văn C",
      email: "vanc@company.com",
      roleID: 2,
      ngayTao: "2024-08-15",
    },
    {
      userID: "EMP004",
      hoTen: "Phạm Thị D",
      email: "thid@company.com",
      roleID: 1,
      ngayTao: "2024-07-10",
    },
    {
      userID: "EMP005",
      hoTen: "Hoàng Văn E",
      email: "vane@company.com",
      roleID: 1,
      ngayTao: "2024-06-05",
    },
    {
      userID: "EMP006",
      hoTen: "Đỗ Thị F",
      email: "thif@company.com",
      roleID: 1,
      ngayTao: "2024-05-01",
    },
  ];

  const getRoleName = (roleID) => {
    switch (roleID) {
      case 1:
        return "Học viên";
      case 2:
        return "Người hướng dẫn";
      default:
        return "Không rõ";
    }
  };

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const buildPayload = () => {
    return {
      userID: selectedCustomer?.userID,
    };
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = buildPayload();
    console.log(payload);
  };

  const filteredEmployees = customers.filter((cus) => {
    const keyword = searchTerm.toLowerCase();

    return (
      cus.userID.toLowerCase().includes(keyword) ||
      cus.hoTen.toLowerCase().includes(keyword) ||
      cus.email.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="flex flex-col bg-gray-50 font-sans">
      <div className="p-5 flex-1 flex flex-col overflow-hidden">
        <header className="md:h-16 bg-white border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-4 md:px-8 py-3">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            Bỏ chặn khách hàng
          </h2>
        </header>

        <main className="flex-1 p-4 md:p-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-6">
            <p className="text-sm text-gray-500">
              Tổng cộng {customers.length} khách hàng bị chặn
            </p>
            <SearchBar
              label="Tìm kiếm khách hàng"
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
                    filteredEmployees.map((cus) => (
                      <tr
                        key={cus.userID}
                        className="hover:bg-blue-50/30 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {cus.userID}
                        </td>

                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">
                            {cus.hoTen}
                          </div>
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600">
                          {cus.email}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600">
                          {getRoleName(cus.roleID)}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600">
                          {cus.ngayTao}
                        </td>

                        <td className="px-6 py-4 text-right">
                          <button
                            className="flex items-center gap-1 text-[#cf345a] hover:text-[#c71c46] hover:scale-110 text-sm font-medium transition"
                            onClick={() => {
                              setOpenModal(true);
                              setSelectedCustomer(cus);
                            }}
                          >
                            <CgUnblock size={16} />
                            Bỏ chặn
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
              Thông tin khách hàng
            </h2>
            <div className="h-full flex flex-col items-center justify-center">
              <FaUserCircle className="size-12" />
              <div className="mt-5 w-full flex flex-col gap-2">
                <div className="flex gap-3">
                  <FaCode size={20} className="mt-1 text-yellow-500" />
                  <span className="font-bold">Mã khách hàng:</span>
                  {selectedCustomer?.userID}
                </div>
                <div className="flex gap-3">
                  <FaTag size={20} className="mt-1 text-blue-500" />
                  <span className="font-bold">Họ và tên:</span>
                  {selectedCustomer?.hoTen}
                </div>
                <div className="flex gap-3">
                  <MdEmail size={20} className="mt-1 text-red-600" />
                  <span className="font-bold">Email:</span>
                  {selectedCustomer?.email}
                </div>
                <div className="flex gap-3">
                  <FaGear size={20} className="mt-1 rotate-5 text-gray-500" />
                  <span className="font-bold">Vai trò:</span>
                  {getRoleName(selectedCustomer?.roleID)}
                </div>
                <div className="flex gap-3">
                  <IoCreate size={20} className="mt-1 -rotate-5" />
                  <span className="font-bold">Ngày tạo tài khoản:</span>
                  {selectedCustomer?.ngayTao}
                </div>
              </div>
            </div>
            <form action="" className="mt-5" onSubmit={handleSubmit}>
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
                  Xác nhận bỏ chặn
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
