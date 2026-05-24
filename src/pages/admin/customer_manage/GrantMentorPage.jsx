import SearchBar from "../../../components/SearchBar";
import { useEffect, useState } from "react";

import { X } from "lucide-react";
import { FaUserCircle, FaCode, FaTag } from "react-icons/fa";
import { MdEmail, MdBlock } from "react-icons/md";
import { FaGear } from "react-icons/fa6";
import { IoCreate } from "react-icons/io5";
import { FaAngleDoubleUp } from "react-icons/fa";

import { useToast } from "../../../contexts/ToastContext";

import {
  getApplication,
  grantMentor,
} from "../../../services/applicationService";

export default function GrantMentorPage() {
  const { addToast } = useToast();
  const [customers, setCustomers] = useState([]);

  const fetchApplication = async () => {
    const res = await getApplication(1);
    setCustomers(res);
  };

  useEffect(() => {
    fetchApplication();
  }, []);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [openGrantMentorModal, setOpenGrantMentorModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [userCode, setUserCode] = useState("");

  const handleClose = () => {
    setOpenGrantMentorModal(false);
    setSelectedCustomer(null);
    setUserCode("");
  };

  const handleGrantMentor = async (e) => {
    e.preventDefault();
    if (selectedCustomer.userID != userCode) {
      addToast("Mã học viên nhập lại không đúng!", "");
      return;
    }
    const res = await grantMentor(selectedCustomer.hoSoID);
    if (!res) {
      addToast("Cấp quyền cho người dùng thất bại!", "error");
      return;
    }
    fetchApplication();
    addToast("Cấp quyền cho người dùng thành công!", "success");

    handleClose();
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
    <div className="flex h-[90vh] flex-col font-sans">
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="md:h-16 bg-white border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-4 md:px-8 py-3">
          <p className="text-sm text-gray-500">
            Tổng cộng {customers.length} học viên chờ cấp quyền
          </p>
          <SearchBar
            label="Tìm kiếm học viên"
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
                          Học viên
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600">
                          {cus.ngayTao}
                        </td>

                        <td className="px-6 py-4 text-right">
                          <button
                            className="flex items-center gap-1 text-blue-500 hover:text-blue-600 hover:scale-110 text-sm font-medium transition"
                            onClick={() => {
                              setOpenGrantMentorModal(true);
                              setSelectedCustomer(cus);
                            }}
                          >
                            <FaAngleDoubleUp size={16} />
                            Cấp quyền
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
                        Không có hồ sơ chờ cấp quyền
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {openGrantMentorModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md shadow-lg p-6 relative">
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-5 mt-4">
              Thông tin người dùng
            </h2>
            <div className="h-full flex flex-col items-center justify-center">
              <FaUserCircle className="size-12" />
              <div className="mt-5 w-full flex flex-col gap-2">
                <div className="flex gap-3">
                  <FaCode size={20} className="mt-1 text-yellow-500" />
                  <span className="font-bold">Mã học viên:</span>
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
                  <IoCreate size={20} className="mt-1 -rotate-5" />
                  <span className="font-bold">Ngày tạo hồ sơ:</span>
                  {selectedCustomer?.ngayTao}
                </div>
              </div>
            </div>
            <form action="" className="mt-5" onSubmit={handleGrantMentor}>
              <input
                type="text"
                placeholder="Nhập lại mã học viên để cấp quyền"
                className="w-full border p-2 outline-none focus:border-blue-500"
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                required
              />
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
                  Đồng ý cấp quyền
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
