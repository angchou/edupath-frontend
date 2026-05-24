import SearchBar from "../../components/SearchBar";
import { useState, useEffect } from "react";

import { Eye, X, Plus, Minus } from "lucide-react";
import { FaCode } from "react-icons/fa";
import { IoTicketSharp } from "react-icons/io5";

import { createTicket, getMyTickets } from "../../services/ticketService";

import { useToast } from "../../contexts/ToastContext";

export default function LearnerSupportPage() {
  const { addToast } = useToast();
  const [tickets, setTickets] = useState([]);

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState({
    moTa: "",
    loaiTicket: 0,
  });

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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = () => {
    setOpenCreate(false);
    setForm({
      moTa: "",
      loaiTicket: 0,
    });
  };

  const fetchTicket = async () => {
    const data = await getMyTickets();
    setTickets(data);
  };
  useEffect(() => {
    fetchTicket();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.loaiTicket == 0) {
      addToast("Vui lòng chọn loại ticket", "");
      return;
    }
    const payload = {
      moTa: form.moTa,
      loaiTicket: Number(form.loaiTicket),
    };
    const res = await createTicket(payload);
    if (!res) {
      addToast("Tạo ticket không thành công!", "error");
      return;
    }
    setOpenCreate(false);
    setForm({ moTa: "", loaiTicket: 0 });
    await fetchTicket();
    addToast("Tạo ticket thành công!", "success");
  };

  return (
    <div className="flex h-[90vh] flex-col font-sans">
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="md:h-16 bg-white border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-4 md:px-8 py-3">
          <p className="text-sm text-gray-500">
            Tổng cộng {tickets.length} người dùng
          </p>
          <button
            onClick={() => setOpenCreate(true)}
            className="flex text-sm items-center justify-center gap-2 px-4 py-2 text-blue-500 border-1 border-blue-500 hover:text-white hover:bg-blue-500 transition"
          >
            Tạo ticket
          </button>
        </header>

        <main className="flex-1 p-4 md:p-2">
          <div className="h-full bg-white border border-gray-100 overflow-x-auto">
            <div className="max-h-[85vh] overflow-y-auto">
              <table className="w-full min-w-[700px] text-left">
                <thead className="bg-gray-50 border-b border-gray-100 sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      Mã ticket
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      Nhân viên xử lý
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
                  {tickets.length > 0 ? (
                    tickets.map((ticket) => (
                      <tr
                        key={ticket.ticketID}
                        className="hover:bg-blue-50/30 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {ticket.ticketID}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600">
                          {ticket.nhanVienXuLy || "---"}
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

      {openCreate && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md shadow-lg p-6 relative">
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-5 mt-4">
              Nhập thông tin ticket
            </h2>

            <form className="space-y-3" onSubmit={handleSubmit}>
              <textarea
                type="text"
                placeholder="Mô tả ticket"
                name="moTa"
                value={form.moTa}
                onChange={handleChange}
                className="w-full px-4 py-2 border-b-1 outline-none"
                required
              />

              <select
                value={form.loaiTicket}
                name="loaiTicket"
                onChange={handleChange}
                className="w-full px-4 py-2 border-b-1 outline-none"
                required
              >
                <option value={0} disabled>
                  Chọn Loại ticket
                </option>

                <option value={1}>Khóa học</option>
                <option value={2}>Tài chính</option>
                <option value={3}>Người dùng</option>
                <option value={4}>Hệ thống</option>
              </select>

              <div className="flex gap-1 mt-5">
                <button
                  type="button"
                  className="w-full text-white py-2 bg-[#cf345a] hover:bg-[#c71c46] transition"
                  onClick={handleClose}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 hover:bg-blue-700 transition"
                >
                  Tạo ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
