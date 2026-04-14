import SearchBar from "../../../components/SearchBar";
import { useState } from "react";

import { Eye, X, Plus } from "lucide-react";
import { FaCode } from "react-icons/fa";
import { IoTicketSharp } from "react-icons/io5";

export default function TicketPage() {
  const tickets = [
    {
      ticketID: "T001",
      moTa: "Đây là dòng mô tả ticket Đây là dòng mô tả ticket Đây là dòng mô tả ticket Đây là dòng mô tả ticket Đây là dòng mô tả ticket",
      loaiTicket: "tài chính",
      ngayTao: "<ngày tạo>",
      ngayHetHan: "<ngày hết hạn>",
      trangThai: "chưa xử lý",
      nguoiTao: "U0001",
    },
    {
      ticketID: "T002",
      moTa: "Đây là dòng mô tả ticket",
      loaiTicket: "hỗ trợ",
      ngayTao: "<ngày tạo>",
      ngayHetHan: "<ngày hết hạn>",
      trangThai: "chưa xử lý",
      nguoiTao: "U0002",
    },
    {
      ticketID: "T003",
      moTa: "Lỗi không đăng nhập được hệ thống",
      loaiTicket: "lỗi",
      ngayTao: "<ngày tạo>",
      ngayHetHan: "<ngày hết hạn>",
      trangThai: "đang xử lý",
      nguoiTao: "U0003",
    },
    {
      ticketID: "T004",
      moTa: "Yêu cầu cấp quyền admin",
      loaiTicket: "yêu cầu",
      ngayTao: "<ngày tạo>",
      ngayHetHan: "<ngày hết hạn>",
      trangThai: "chưa xử lý",
      nguoiTao: "U0004",
    },
    {
      ticketID: "T005",
      moTa: "Giao diện hiển thị bị lỗi trên mobile",
      loaiTicket: "lỗi",
      ngayTao: "<ngày tạo>",
      ngayHetHan: "<ngày hết hạn>",
      trangThai: "đã xử lý",
      nguoiTao: "U0005",
    },
    {
      ticketID: "T006",
      moTa: "Cần hỗ trợ reset mật khẩu",
      loaiTicket: "hỗ trợ",
      ngayTao: "<ngày tạo>",
      ngayHetHan: "<ngày hết hạn>",
      trangThai: "đang xử lý",
      nguoiTao: "U0006",
    },
    {
      ticketID: "T007",
      moTa: "Đề xuất thêm chức năng báo cáo",
      loaiTicket: "đề xuất",
      ngayTao: "<ngày tạo>",
      ngayHetHan: "<ngày hết hạn>",
      trangThai: "chưa xử lý",
      nguoiTao: "U0007",
    },
  ];

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmployees = tickets.filter((ticket) => {
    const keyword = searchTerm.toLowerCase();

    return (
      ticket.ticketID.toLowerCase().includes(keyword) ||
      ticket.loaiTicket.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="flex flex-col bg-gray-50 font-sans">
      <div className="p-5 flex-1 flex flex-col overflow-hidden">
        <header className="md:h-16 bg-white border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-4 md:px-8 py-3">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            Xử lý ticket
          </h2>
        </header>

        <main className="flex-1 p-4 md:p-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-6">
            <p className="text-sm text-gray-500">
              Tổng cộng {tickets.length} ticket cần được xử lý
            </p>
            <SearchBar
              label="Tìm kiếm ticket"
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
                      Người tạo
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      Loại ticket
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      ngày tạo
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      Ngày hết hạn
                    </th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-50">
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((ticket) => (
                      <tr
                        key={ticket.ticketID}
                        className="hover:bg-blue-50/30 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {ticket.ticketID}
                        </td>

                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">
                            {ticket.nguoiTao}
                          </div>
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600">
                          {ticket.loaiTicket}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600">
                          {ticket.ngayTao}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600">
                          {ticket.ngayHetHan}
                        </td>

                        <td className="px-6 py-4 text-right">
                          <button
                            className="flex items-center gap-1 text-blue-500 hover:text-blue-600 hover:scale-110 text-sm font-medium transition"
                            onClick={() => {
                              setOpenModal(true);
                              setSelectedTicket(ticket);
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
              Thông tin ticket
            </h2>
            <div className="h-full flex flex-col items-center justify-center">
              <IoTicketSharp className="size-13" />
              <div className="mt-5 w-full flex flex-col gap-2">
                <div className="flex gap-3">
                  <FaCode size={20} className="mt-1 text-yellow-500" />
                  <span className="font-bold">Mã ticket:</span>
                  {selectedTicket?.ticketID}
                </div>
                <div className="flex gap-3">
                  <FaCode size={20} className="mt-1 text-green-500" />
                  <span className="font-bold">Người gửi:</span>
                  {selectedTicket?.nguoiTao}
                </div>
                <div className="flex gap-3">
                  <Plus size={20} className="mt-1" />
                  <span className="font-bold">Ngày tạo:</span>
                  {selectedTicket?.ngayTao}
                </div>
                <div className="flex gap-3">
                  <Plus size={20} className="mt-1" />
                  <span className="font-bold">Ngày hết hạn:</span>
                  {selectedTicket?.ngayHetHan}
                </div>
                <div className="flex gap-3">
                  <Plus size={20} className="mt-1 shrink-0" />
                  <span>
                    <b>Mô tả: </b> {selectedTicket.moTa}
                  </span>
                </div>
                <div className="flex gap-3">
                  <FaCode size={20} className="mt-1 text-red-500" />
                  <span className="font-bold">Trạng thái:</span>
                  {selectedTicket?.trangThai}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-6">
              <form className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Nội dung phản hồi"
                  name="chucVu"
                  className="w-full h-full border rounded-lg p-2 outline-none focus:border-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Xử lý
                </button>
              </form>

              <form className="flex flex-col gap-2">
                <select className="w-full border rounded-lg p-2 outline-none focus:border-blue-500">
                  <option value={0} disabled>
                    Ưu tiên
                  </option>
                  <option value={3}>Thấp</option>
                  <option value={4}>trung bình</option>
                  <option value={5}>Cao</option>
                  <option value={6}>Quan trọng</option>
                </select>
                <input
                  row={2}
                  type="text"
                  placeholder="Lý do chuyển tiếp"
                  className="w-full border rounded-lg p-2 outline-none focus:border-blue-500 resize-none"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Chuyển tiếp
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
