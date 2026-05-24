import SearchBar from "../../../components/SearchBar";
import { useEffect, useState } from "react";

import { X, Eye, Info } from "lucide-react";
import {
  FaUserCircle,
  FaCode,
  FaTag,
  FaMoneyBillWave,
  FaStar,
  FaGlobeAsia,
  FaGraduationCap,
  FaBook,
} from "react-icons/fa";
import { MdEmail, MdBlock } from "react-icons/md";
import { FaGear } from "react-icons/fa6";
import { IoCreate } from "react-icons/io5";
import { useToast } from "../../../contexts/ToastContext";
import { getCustomers } from "../../../services/customerService";

export default function PeoplePage() {
  const [customers, setCustomers] = useState([]);
  const { addToast } = useToast();
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [userCode, setUserCode] = useState("");

  const fetchCustomers = async () => {
    const data = await getCustomers(2);
    setCustomers(data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const getTrangThai = (trangThai) => {
    switch (trangThai) {
      case 0:
        return (
          <span className="px-2 py-1 rounded-sm text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200">
            Đã bị xóa
          </span>
        );
      case 1:
        return (
          <span className="px-2 py-1 rounded-sm text-xs font-semibold bg-red-100 text-red-600 border border-red-200">
            Đã bị chặn
          </span>
        );
      case 2:
        return (
          <span className="px-2 py-1 rounded-sm text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
            Bình thường
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 rounded-sm text-xs font-semibold bg-yellow-100 text-yellow-700">
            Không xác định
          </span>
        );
    }
  };

  const handleClose = () => {
    setSelectedCustomer(null);
    setOpenModal(false);
    setUserCode("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userCode !== selectedCustomer.userID) {
      addToast("Nhập lại mã người dùng không chính xác!");
      return;
    }

    handleClose();
  };

  const filteredEmployees = customers.filter((cus) => {
    const keyword = searchTerm.toLowerCase();

    return (
      cus.userID.toLowerCase().includes(keyword) ||
      cus.hoTen.toLowerCase().includes(keyword) ||
      cus.email.toLowerCase().includes(keyword) ||
      cus.roleName.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="flex h-[90vh] flex-col font-sans">
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="md:h-16 bg-white border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-4 md:px-8 py-3">
          <p className="text-sm text-gray-500">
            Tổng cộng {customers.length} người dùng
          </p>
          <SearchBar
            label="Tìm kiếm người dùng"
            value={searchTerm}
            onChange={(value) => setSearchTerm(value)}
          />
        </header>

        <main className="flex-1 p-4 md:p-2">
          <div className="h-full bg-white border border-gray-100 overflow-x-auto">
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
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      Trạng thái
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
                          {cus.roleName}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600">
                          {cus.ngayTao}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600">
                          {getTrangThai(cus.trangThai)}
                        </td>

                        <td className="px-6 py-4 text-right">
                          <button
                            className="flex items-center gap-1 text-blue-500 hover:text-blue-600 hover:scale-110 text-sm font-medium transition"
                            onClick={() => {
                              setOpenModal(true);
                              setSelectedCustomer(cus);
                            }}
                          >
                            <Eye size={16} />
                            Xem chi tiết
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
                        Không tìm thấy người dùng
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
          <div className="bg-white w-full max-w-md shadow-lg p-6 relative">
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-5 mt-4 text-center">
              Thông tin người dùng
            </h2>

            <div className="h-full flex flex-col items-center justify-center">
              <FaUserCircle className="size-16 text-gray-400" />

              <div className="mt-5 w-full flex flex-col gap-3 text-sm text-gray-700">
                <div className="flex gap-3 items-center">
                  <FaCode size={18} className="text-yellow-500 shrink-0" />
                  <span className="font-bold w-36">Mã người dùng:</span>
                  <span>{selectedCustomer?.userID}</span>
                </div>

                <div className="flex gap-3 items-center">
                  <FaTag size={18} className="text-blue-500 shrink-0" />
                  <span className="font-bold w-36">Họ và tên:</span>
                  <span>{selectedCustomer?.hoTen}</span>
                </div>

                <div className="flex gap-3 items-center">
                  <MdEmail size={18} className="text-red-600 shrink-0" />
                  <span className="font-bold w-36">Email:</span>
                  <span className="break-all">{selectedCustomer?.email}</span>
                </div>

                <div className="flex gap-3 items-center">
                  <FaGear
                    size={18}
                    className="rotate-45 text-gray-500 shrink-0"
                  />
                  <span className="font-bold w-36">Vai trò:</span>
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-semibold ${
                      selectedCustomer?.roleName === "Mentor"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {selectedCustomer?.roleName}
                  </span>
                </div>

                <div className="flex gap-3 items-center">
                  <IoCreate
                    size={18}
                    className="-rotate-5 text-amber-700 shrink-0"
                  />
                  <span className="font-bold w-36">Ngày tạo tài khoản:</span>
                  <span>{selectedCustomer?.ngayTao}</span>
                </div>

                <div className="flex gap-3 items-center">
                  <Info
                    size={18}
                    className="-rotate-5 text-orange-500 shrink-0"
                  />
                  <span className="font-bold w-36">Trạng thái:</span>
                  <span>{getTrangThai(selectedCustomer?.trangThai)}</span>
                </div>

                <div className="border-t border-gray-100 my-1"></div>

                {selectedCustomer?.roleName === "Người hướng dẫn" && (
                  <>
                    <div className="flex gap-3 items-center">
                      <FaMoneyBillWave
                        size={18}
                        className="text-emerald-600 shrink-0"
                      />
                      <span className="font-bold w-36">Doanh thu:</span>
                      <span className="text-emerald-600 font-semibold">
                        {selectedCustomer?.doanhThu?.toLocaleString("vi-VN")} đ
                      </span>
                    </div>
                    <div className="flex gap-3 items-center">
                      <FaStar size={18} className="text-orange-400 shrink-0" />
                      <span className="font-bold w-36">
                        Đánh giá trung bình:
                      </span>
                      <span>{selectedCustomer?.trungBinhDanhGia} / 5</span>
                    </div>
                  </>
                )}

                {selectedCustomer?.roleName === "Học viên" && (
                  <>
                    <div className="flex gap-3 items-center">
                      <FaGlobeAsia
                        size={18}
                        className="text-teal-500 shrink-0"
                      />
                      <span className="font-bold w-36">Quốc gia du học:</span>
                      <span>
                        {selectedCustomer?.quocGiaDuHoc || "Chưa cập nhật"}
                      </span>
                    </div>
                    <div className="flex gap-3 items-center">
                      <FaGraduationCap
                        size={18}
                        className="text-indigo-500 shrink-0"
                      />
                      <span className="font-bold w-36">Điểm GPA:</span>
                      <span>{selectedCustomer?.gpa || "Chưa cập nhật"}</span>
                    </div>
                    <div className="flex gap-3 items-center">
                      <FaBook size={18} className="text-pink-500 shrink-0" />
                      <span className="font-bold w-36">Ngành học:</span>
                      <span>
                        {selectedCustomer?.nganhHoc || "Chưa cập nhật"}
                      </span>
                    </div>
                  </>
                )}
                <div className="mt-6">
                  <button
                    type="button"
                    className="w-full bg-blue-500 py-2 text-sm text-white font-medium hover:bg-blue-600 transition"
                    onClick={handleClose}
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
