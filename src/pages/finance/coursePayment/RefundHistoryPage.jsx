import { Eye, X, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import { RiRefund2Fill } from "react-icons/ri";

import { getRefundByStatus } from "../../../services/transactionService";

export default function RefundHistoryPage() {
  const [selectedRefund, setSelectedRefund] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const [refunds, setRefunds] = useState([]);

  const fetchRefund = async () => {
    const data1 = await getRefundByStatus(1);
    const data2 = await getRefundByStatus(2);
    setRefunds([...data1, ...data2]);
  };
  useEffect(() => {
    fetchRefund();
  }, []);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleString("vi-VN");
  };

  const getCongGD = (congGD) => {
    if (congGD === 1) {
      return "Ví Momo";
    } else if (congGD === 2) {
      return "Chuyển khoản ngân hàng";
    } else if (congGD === 3) {
      return "Ví điện tử khác";
    }
  };

  return (
    <div className="flex h-[90vh] flex-col font-sans">
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="md:h-16 bg-white border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-4 md:px-8 py-3">
          <p className="text-sm text-gray-500">
            Có {refunds.length} yêu cầu hoàn tiền đã xử lý
          </p>
        </header>

        <main className="flex-1 p-4 md:p-2">
          <div className="overflow-x-auto border border-gray-100">
            <div className="max-h-[50vh] overflow-y-auto">
              <table className="w-full min-w-[700px] text-left">
                <thead className="bg-gray-50 border-b border-gray-100 sticky top-0">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      Mã giao dịch
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      Ngày giao dịch
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      Ngày yêu cầu hoàn tiền
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      Giá gốc
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      Trị giá cuối cùng
                    </th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-50">
                  {refunds.length !== 0 ? (
                    refunds.map((refund) => (
                      <tr
                        key={refund.hoanTienID}
                        className="hover:bg-blue-50/30 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {refund.giaoDichID}
                        </td>

                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">
                            {formatDate(refund.ngayGD)}
                          </div>
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600">
                          {refund.ngayTao}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600">
                          {refund.giaGoc.toLocaleString("vi-VN")} đ
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600">
                          {refund.triGia.toLocaleString("vi-VN")} đ
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
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-10 text-gray-400 italic"
                      >
                        Không tìm thấy yêu cầu hoàn tiền nào
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
                  <FaCode size={20} className="mt-1 text-red-500" />
                  <span className="font-bold">Mã khóa học:</span>
                  {selectedRefund?.khoaHocID}
                </div>
                <div className="flex gap-3">
                  <span className="font-bold">Ngày giao dịch:</span>
                  {formatDate(selectedRefund?.ngayGD)}
                </div>
                <div className="flex gap-3">
                  <span className="font-bold">Ngày yêu cầu hoàn tiền:</span>
                  {formatDate(selectedRefund?.ngayTao)}
                </div>
                <div className="flex gap-3">
                  <span className="font-bold">Cổng giao dịch:</span>
                  {getCongGD(selectedRefund?.congGD)}
                </div>
                <div className="flex gap-3">
                  <span className="font-bold">Voucher:</span>
                  {selectedRefund?.voucherID} - {selectedRefund?.maApDung}
                </div>
                <div className="flex gap-3">
                  <Plus size={20} className="mt-1" />
                  <span className="font-bold">Trị giá hoàn tiền:</span>
                  {selectedRefund?.triGia.toLocaleString("vi-VN")} đ
                </div>

                <div className="flex gap-3">
                  <Plus size={20} className="mt-1 shrink-0" />
                  <span>
                    <b>Lí do: </b> {selectedRefund.liDo}
                  </span>
                </div>
              </div>
            </div>

            <form action="">
              <div className="flex gap-1 mt-5">
                <button
                  type="button"
                  className="w-full bg-blue-600 text-white py-2 hover:bg-blue-700 transition"
                  onClick={() => {
                    setSelectedRefund(false);
                    setOpenModal(false);
                  }}
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
