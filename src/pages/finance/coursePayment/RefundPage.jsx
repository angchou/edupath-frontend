import { Eye, X, Plus } from "lucide-react";
import { useState } from "react";
import { FaCode } from "react-icons/fa";
import { RiRefund2Fill } from "react-icons/ri";

export default function RefundPage() {
  const [selectedRefund, setSelectedRefund] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const refunds = [
    {
      hoanTienID: "1",
      giaoDichID: "idk",
      ngayGD: "<date>",
      triGiaHT: 500000,
      ngayTao: "<date>",
      liDo: "tui thay khoa hoc nay chat luong qua te tui thay khoa hoc nay chat luong qua tetui thay khoa hoc nay chat luong qua tetui thay khoa hoc nay chat luong qua tetui thay khoa hoc nay chat luong qua tetui thay khoa hoc nay chat luong qua te",
      trangThai: "chưa xử lý",
    },
  ];

  return (
    <div className="flex flex-col bg-gray-50 font-sans">
      <div className="p-5 flex-1 flex flex-col overflow-hidden">
        <header className="md:h-16 bg-white border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-4 md:px-8 py-3">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            Xử lý hoàn tiền
          </h2>
        </header>

        <main className="flex-1 p-8">
          <p className="text-sm text-gray-500 mb-6">
            Có {refunds.length} yêu cầu hoàn tiền đang chờ xử lý
          </p>

          <div className="h-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
            <div className="max-h-[50vh] overflow-y-auto">
              <table className="w-full min-w-[700px] text-left">
                <thead className="bg-gray-50 border-b border-gray-100 sticky top-0">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      Mã
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      Mã giao dịch
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      Ngày giao dịch
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      Ngày tạo
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      Trị giá
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      Trạng thái
                    </th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-50">
                  {refunds.map((refund) => (
                    <tr
                      key={refund.hoanTienID}
                      className="hover:bg-blue-50/30 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {refund.hoanTienID}
                      </td>

                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">
                          {refund.giaoDichID}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {refund.ngayGD}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {refund.ngayTao}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {refund.triGiaHT}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {refund.trangThai}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                          onClick={() => {
                            setOpenModal(true);
                            setSelectedRefund(refund);
                          }}
                        >
                          <Eye size={16} />
                          Xem chi tiết
                        </button>
                      </td>
                    </tr>
                  ))}
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
              Thông tin yêu cầu hoàn tiền
            </h2>
            <div className="h-full flex flex-col items-center justify-center">
              <RiRefund2Fill className="size-13" />
              <div className="mt-5 w-full flex flex-col gap-2">
                <div className="flex gap-3">
                  <FaCode size={20} className="mt-1 text-yellow-500" />
                  <span className="font-bold">Mã hoàn tiền:</span>
                  {selectedRefund?.hoanTienID}
                </div>
                <div className="flex gap-3">
                  <FaCode size={20} className="mt-1 text-green-500" />
                  <span className="font-bold">Mã giao dịch:</span>
                  {selectedRefund?.giaoDichID}
                </div>
                <div className="flex gap-3">
                  <span className="font-bold">Ngày giao dịch:</span>
                  {selectedRefund?.ngayGD}
                </div>
                <div className="flex gap-3">
                  <Plus size={20} className="mt-1" />
                  <span className="font-bold">Trị giá hoàn tiền:</span>
                  {selectedRefund?.triGiaHT}
                </div>
                <div className="flex gap-3">
                  <Plus size={20} className="mt-1 shrink-0" />
                  <span>
                    <b>Lí do: </b> {selectedRefund.liDo}
                  </span>
                </div>
                <div className="flex gap-3">
                  <FaCode size={20} className="mt-1 text-red-500" />
                  <span className="font-bold">Trạng thái hoàn tiền:</span>
                  {selectedRefund?.trangThai}
                </div>
              </div>
            </div>

            <form action="">
              <div className="flex gap-1 mt-5">
                <button
                  type="button"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  onClick={() => {
                    setSelectedRefund(false);
                    setOpenModal(false);
                  }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="w-full bg-[#cf345a] hover:bg-[#c71c46] text-white py-2 rounded-lg transition"
                >
                  Xác nhận hoàn
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
