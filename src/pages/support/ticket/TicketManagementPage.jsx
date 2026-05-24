import SearchBar from "../../../components/SearchBar";
import { useState, useEffect } from "react";

import { Eye, X, Plus } from "lucide-react";
import { FaCode } from "react-icons/fa";
import { IoTicketSharp } from "react-icons/io5";

import {
  getClosedTicket,
  getExpiredTicket,
  getRejectedTicket,
} from "../../../services/ticketService";

import { useToast } from "../../../contexts/ToastContext";

export default function TicketManagementPage() {
  const { addToast } = useToast();

  const [tickets, setTickets] = useState([]);

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [priority, setPriority] = useState("");

  const [activeTab, setActiveTab] = useState("closed");

  const reFetch = async () => {
    if (activeTab === "closed") {
      await fetchClosedTicket();
    } else if (activeTab === "expired") {
      await fetchExpiredTicket();
    } else if (activeTab === "rejected") {
      await fetchRejectedTicket();
    }
  };

  const handleTabClick = async (type, fetchFunction) => {
    setActiveTab(type);
    await fetchFunction();
  };

  const getTicketStatus = (status) => {
    if (status == 0) {
      return "Chờ xử lý";
    } else if (status == 1) {
      return "Đã xử lý";
    } else if (status == 2) {
      return "Đã từ chối";
    }
  };

  const getTicketType = (type) => {
    if (type == 1) {
      return "Khóa học";
    } else if (type == 2) {
      return "Tài chính";
    } else if (type == 3) {
      return "Người dùng";
    } else if (type == 4) {
      return "Hệ thống";
    }
  };

  const filteredEmployees = tickets.filter((ticket) => {
    const keyword = searchTerm.toLowerCase();

    return (
      ticket.ticketID.toLowerCase().includes(keyword) ||
      getTicketType(ticket.loaiTicket).toLowerCase().includes(keyword)
    );
  });

  const fetchClosedTicket = async () => {
    const data = await getClosedTicket();
    setTickets(data);
  };
  const fetchExpiredTicket = async () => {
    const data = await getExpiredTicket();
    setTickets(data);
  };
  const fetchRejectedTicket = async () => {
    const data = await getRejectedTicket();
    setTickets(data);
  };
  useEffect(() => {
    fetchClosedTicket();
  }, []);

  return (
    <div className="flex h-[90vh] flex-col font-sans">
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="md:h-16 bg-white border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-4 md:px-8 py-3">
          <p className="text-sm text-gray-500">
            Tổng cộng {tickets.length} ticket
          </p>
          <SearchBar
            label="Tìm kiếm ticket"
            value={searchTerm}
            onChange={(value) => setSearchTerm(value)}
          />

          <div className="flex flex-wrap gap-3 text-sm">
            <button
              onClick={() => handleTabClick("closed", fetchClosedTicket)}
              className={`border p-2 transition ${
                activeTab === "closed"
                  ? "bg-blue-500 text-white scale-95"
                  : "text-blue-500 hover:text-white hover:bg-blue-500"
              }`}
            >
              Ticket đã xử lý
            </button>

            <button
              onClick={() => handleTabClick("rejected", fetchRejectedTicket)}
              className={`border p-2 transition ${
                activeTab === "rejected"
                  ? "bg-blue-500 text-white scale-95"
                  : "text-blue-500 hover:text-white hover:bg-blue-500"
              }`}
            >
              Ticket đã từ chối
            </button>

            <button
              onClick={() => handleTabClick("expired", fetchExpiredTicket)}
              className={`border p-2 transition ${
                activeTab === "expired"
                  ? "bg-blue-500 text-white scale-95"
                  : "text-blue-500 hover:text-white hover:bg-blue-500"
              }`}
            >
              Ticket quá hạn
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-2">
          <div className="h-full bg-white shadow-sm border border-gray-100 overflow-x-auto">
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
                          {getTicketType(ticket.loaiTicket)}
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
                        Không tìm thấy ticket
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
                  <Plus size={20} className="mt-1" />
                  <span className="font-bold">Nhân viên xử lý:</span>
                  {selectedTicket?.nhanVienXuLy}
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
                  {getTicketStatus(selectedTicket?.trangThai)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
