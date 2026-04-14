import SearchBar from "../../../components/SearchBar";
import { useState } from "react";

import { Eye, X, Plus } from "lucide-react";
import { FaCode } from "react-icons/fa";
import { IoTicketSharp } from "react-icons/io5";

export default function RefundTicketPage() {
  const tickets = [
    {
      ticketID: "T001",
      doUuTien: 1,
      moTa: "Đây là dòng mô tả ticket Đây là dòng mô tả ticket Đây là dòng mô tả ticket Đây là dòng mô tả ticket Đây là dòng mô tả ticket",
      loaiTicket: "tài chính",
      ngayTao: "<ngày tạo>",
      ngayHetHan: "<ngày hết hạn>",
      trangThai: "chưa xử lý",
      chuyenTiep: "Đây là lí do chuyển tiếp cho phòng ban",
      nguoiTao: "U0001",
      nhanVienChuyenTiepID: "U1234",
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
            Ticket thanh toán
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
                      Độ ưu tiên
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
                          {ticket.doUuTien}
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
              Thông tin ticket thanh toán
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
                  <Plus size={20} className="mt-1 shrink-0" />
                  <span>
                    <b>Lí do chuyển tiếp: </b> {selectedTicket.chuyenTiep}
                  </span>
                </div>
                <div className="flex gap-3">
                  <FaCode size={20} className="mt-1 text-red-500" />
                  <span className="font-bold">Nhân viên chuyển tiếp:</span>
                  {selectedTicket?.nhanVienChuyenTiepID}
                </div>
                <div className="flex gap-3">
                  <FaCode size={20} className="mt-1 text-red-500" />
                  <span className="font-bold">Trạng thái:</span>
                  {selectedTicket?.trangThai}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 mt-6">
              <form className="flex flex-col gap-2">
                <input
                  row={2}
                  type="text"
                  placeholder="Nội dung phản hồi"
                  className="w-full border rounded-lg p-2 outline-none focus:border-blue-500 resize-none"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Xử lý
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
