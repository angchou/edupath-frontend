import SearchBar from "../../../components/SearchBar";
import { useState, useEffect } from "react";

import { Eye, X, Plus } from "lucide-react";
import { FaCode } from "react-icons/fa";
import { IoTicketSharp } from "react-icons/io5";

import { useToast } from "../../../contexts/ToastContext";

import { getAllTransactions } from "../../../services/transactionService";
import { GrTransaction } from "react-icons/gr";

export default function TransactionHistoryPage() {
  const { addToast } = useToast();
  const [transactions, setTransactions] = useState([]);

  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [openTransactionDetailModal, setOpenTransactionDetailModal] =
    useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [liDo, setLiDo] = useState("");

  const fetchData = async () => {
    const data = await getAllTransactions();
    setTransactions(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getTransactionStatus = (status) => {
    if (status == 0) {
      return "Chưa thanh toán";
    } else if (status == 1) {
      return "Đã thanh toán";
    } else if (status == 2) {
      return "Đã hoàn tiền";
    }
  };
  const getCongGD = (congGD) => {
    if (congGD == 1) {
      return "Momo";
    } else if (congGD == 2) {
      return "Ngân hàng";
    } else if (congGD == 3) {
      return "Ví điện tử khác";
    }
  };
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleString("vi-VN");
  };

  return (
    <div className="flex h-[90vh] flex-col font-sans">
      <div className="flex-1 flex flex-col overflow-hidden min-h-0">
        <header className="md:h-16 bg-white border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-4 md:px-8 py-3">
          <p className="text-sm text-gray-500">
            Bạn có tổng cộng {transactions.length} giao dịch
          </p>
        </header>

        <main className="flex-1 p-4 md:p-2 min-h-0">
          <div className="h-full bg-white border border-gray-100 overflow-y-auto">
            <div className="overflow-y-auto">
              <table className="w-full min-w-[700px] text-left">
                <thead className="bg-gray-50 border-b border-gray-100 sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      Mã giao dịch
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      Cổng giao dịch
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      ngày giao dịch
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      Giá gốc
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
                  {transactions.length > 0 ? (
                    transactions.map((transaction) => (
                      <tr
                        key={transaction.giaoDichID}
                        className="hover:bg-blue-50/30 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {transaction.giaoDichID}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600">
                          {getCongGD(transaction.congGD)}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600">
                          {formatDate(transaction.ngayGD)}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600">
                          {transaction.giaGoc.toLocaleString("vi-VN")} đ
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600">
                          {transaction.triGia.toLocaleString("vi-VN")} đ
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600">
                          {getTransactionStatus(transaction.trangThai)}
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-2 items-center">
                            <button
                              className="flex items-center gap-1 text-blue-500 hover:text-blue-600 hover:scale-110 text-sm font-medium transition"
                              onClick={() => {
                                setSelectedTransaction(transaction);
                                setOpenTransactionDetailModal(true);
                              }}
                            >
                              <Eye size={16} />
                              Xem chi tiết
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="text-center py-10 text-gray-400 italic"
                      >
                        Không tìm thấy giao dịch
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {openTransactionDetailModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md shadow-lg p-6 relative">
            <button
              onClick={() => setOpenTransactionDetailModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-5 mt-4">
              Thông tin giao dịch
            </h2>
            <div className="h-full flex flex-col items-center justify-center">
              <GrTransaction className="size-13 mb-5 text-slate-500" />
              <div className="mt-5 w-full flex flex-col gap-2">
                <div className="flex gap-3">
                  <FaCode size={20} className="mt-1 text-yellow-500" />
                  <span className="font-bold">Mã giao dịch:</span>
                  {selectedTransaction?.giaoDichID}
                </div>
                <div className="flex gap-3">
                  <FaCode size={20} className="mt-1 text-green-500" />
                  <span className="font-bold">Giá gốc:</span>
                  {selectedTransaction?.giaGoc.toLocaleString("vi-VN")} đ
                </div>
                <div className="flex gap-3">
                  <FaCode size={20} className="mt-1 text-red-500" />
                  <span className="font-bold">Trị giá sau cùng:</span>
                  {selectedTransaction?.triGia.toLocaleString("vi-VN")} đ
                </div>
                <div className="flex gap-3">
                  <Plus size={20} className="mt-1" />
                  <span className="font-bold">Ngày giao dịch:</span>
                  {formatDate(selectedTransaction?.ngayGD)}
                </div>
                <div className="flex gap-3">
                  <Plus size={20} className="mt-1" />
                  <span className="font-bold">Cổng giao dịch:</span>
                  {getCongGD(selectedTransaction?.congGD)}
                </div>
                <div className="flex gap-3">
                  <Plus size={20} className="mt-1" />
                  <span className="font-bold">Voucher sử dụng:</span>
                  {selectedTransaction.voucherID} -{" "}
                  {selectedTransaction.maApDung}
                </div>
                <div className="flex gap-3">
                  <Plus size={20} className="mt-1" />
                  <span className="font-bold">Khóa học đăng ký:</span>
                  {selectedTransaction?.khoaHocID}
                </div>
                <div className="flex gap-3">
                  <Plus size={20} className="mt-1" />
                  <span className="font-bold">Trạng thái:</span>
                  {getTransactionStatus(selectedTransaction?.trangThai)}
                </div>
                <button
                  onClick={() => setOpenTransactionDetailModal(false)}
                  className={`mt-6 w-full py-2 rounded bg-blue-500 text-white font-semibold transition hover:text-white hover:bg-blue-600`}
                >
                  Thoát
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
