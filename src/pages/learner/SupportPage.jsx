import { useState } from "react";

export default function SupportPage() {
  const [tickets, setTickets] = useState([
    { id: "T001", description: "Lỗi đăng nhập", status: "Đang xử lý" },
    { id: "T002", description: "Không thể tải file", status: "Đã xử lý" },
  ]);
  const [newTicket, setNewTicket] = useState("");

  const handleAddTicket = () => {
    if (!newTicket.trim()) return;
    const ticket = {
      id: `T${(Math.random() * 1000).toFixed(0)}`,
      description: newTicket.trim(),
      status: "Đang xử lý",
    };
    setTickets([ticket, ...tickets]);
    setNewTicket("");
  };

  const handleDeleteTicket = (id) => {
    setTickets(tickets.filter((t) => t.id !== id));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Đang xử lý":
        return "bg-yellow-100 text-yellow-800";
      case "Đã xử lý":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="w-[50%] px-4 flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-center">Hỗ trợ / Ticket</h2>

        {/* Form tạo ticket */}
        <div className="bg-white p-6 rounded-xl shadow flex flex-col gap-4">
          <h3 className="font-semibold text-lg">Tạo ticket mới</h3>
          <textarea
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            rows={4}
            placeholder="Miêu tả vấn đề của bạn..."
            value={newTicket}
            onChange={(e) => setNewTicket(e.target.value)}
          />
          <button
            onClick={handleAddTicket}
            className="self-end bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Gửi
          </button>
        </div>

        {/* Danh sách ticket */}
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-lg">Danh sách ticket của bạn</h3>
          {tickets.length === 0 && (
            <p className="text-gray-500">Bạn chưa gửi ticket nào.</p>
          )}
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white p-4 rounded-xl shadow flex flex-col md:flex-row justify-between items-start gap-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex-1">
                <p className="font-semibold">Mã ticket: {ticket.id}</p>
                <p className="text-gray-700 line-clamp-4">
                  {ticket.description}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span
                  className={`px-2 py-1 text-sm font-medium rounded-full ${getStatusColor(ticket.status)}`}
                >
                  {ticket.status}
                </span>
                <button
                  onClick={() => handleDeleteTicket(ticket.id)}
                  className="mr-2 text-red-500 hover:text-red-700 font-semibold"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
