import { useEffect, useState } from "react";
import {
  Ticket,
  Plus,
  X,
  Percent,
  Coins,
  CheckCircle2,
  XCircle,
  Eye,
  CreditCard,
  Wallet,
  Building2,
  Smartphone,
} from "lucide-react";

import { useToast } from "../../../contexts/ToastContext";

import {
  getAllVouchers,
  createVoucher,
} from "../../../services/voucherService";
import { getTransactionsByVoucher } from "../../../services/transactionService";

export default function PromotionPage() {
  const { addToast } = useToast();
  const [transactions, setTransactions] = useState([]);

  const [vouchers, setVouchers] = useState([]);

  const [openTxModal, setOpenTxModal] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [activeTab, setActiveTab] = useState("all"); // 'all', 'paid', 'refunded'

  const fetchData = async () => {
    const data = await getAllVouchers();
    setVouchers(data || []);
  };

  const fetchTransaction = async (voucherID) => {
    const data = await getTransactionsByVoucher(voucherID);
    setTransactions(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleString("vi-VN");
  };

  const renderTriGia = (loaiVoucher, triGia) => {
    if (loaiVoucher === 0) {
      return <span className="text-blue-600 font-medium">{triGia * 100}%</span>;
    }
    return (
      <span className="text-green-600 font-medium">
        {formatCurrency(triGia)}
      </span>
    );
  };

  const renderTypeBadge = (loai) => {
    return loai === 0 ? (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs bg-blue-50 text-blue-600 border border-blue-100">
        <Percent size={12} /> Giảm tỉ lệ
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs bg-green-50 text-green-600 border border-green-100">
        <Coins size={12} /> Giảm tiền
      </span>
    );
  };

  const renderStatusBadge = (status) => {
    return status === 1 ? (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-green-50 text-green-600 border border-green-200">
        <CheckCircle2 size={12} /> Đang hoạt động
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-gray-100 text-gray-500 border border-gray-200">
        <XCircle size={12} /> Vô hiệu hóa
      </span>
    );
  };

  const getCongGDInfo = (congGD) => {
    switch (congGD) {
      case 1:
        return {
          label: "MoMo",
          icon: <Wallet size={14} className="text-pink-500" />,
        };
      case 2:
        return {
          label: "Ngân hàng",
          icon: <Building2 size={14} className="text-blue-500" />,
        };
      case 3:
        return {
          label: "Ví khác",
          icon: <Smartphone size={14} className="text-orange-500" />,
        };
      default:
        return {
          label: "Không xác định",
          icon: <CreditCard size={14} className="text-gray-500" />,
        };
    }
  };

  const handleOpenTransactions = async (voucher) => {
    setSelectedVoucher(voucher);
    fetchTransaction(voucher.voucherID);
    setActiveTab("all");
    setOpenTxModal(true);
  };

  const filteredTransactions = transactions.filter((tx) => {
    if (activeTab === "paid") return tx.trangThai === 1;
    if (activeTab === "refunded") return tx.trangThai === 2;
    return true; // "all"
  });

  const totalPromotionalCost = filteredTransactions.reduce(
    (total, tx) => total + (tx.giaGoc - tx.triGia),
    0,
  );

  return (
    <div className="h-[90vh] py-10 px-4 flex justify-center">
      <div className="w-full max-w-6xl flex flex-col gap-6">
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2 bg-gray-50/30">
            <Ticket className="text-blue-500" size={20} />
            <h3 className="text-lg font-medium text-gray-800">
              Danh sách mã giảm giá
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead className="bg-gray-50/80 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Mã áp dụng
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Loại
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Trị giá
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Đã dùng / Tối đa
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Hạn sử dụng
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-center">
                    Trạng thái
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-center">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {vouchers.length > 0 ? (
                  vouchers.map((item) => (
                    <tr
                      key={item.voucherID || item.maApDung}
                      className="hover:bg-blue-50/30 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-800">
                        <span className="px-2 py-1 bg-gray-100 border border-gray-200 rounded tracking-widest font-semibold text-blue-700">
                          {item.maApDung}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {renderTypeBadge(item.loaiVoucher)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {renderTriGia(item.loaiVoucher, item.triGia)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {item.slDaSuDung || 0} / {item.slToiDa}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {item.hanSuDung}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {renderStatusBadge(item.trangThai || 1)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleOpenTransactions(item)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors mx-auto flex items-center justify-center"
                          title="Xem giao dịch"
                        >
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-12 text-center text-gray-400 italic"
                    >
                      Chưa có voucher nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {openTxModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full h-full flex flex-col overflow-hidden relative">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <CreditCard className="text-blue-600" size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    Lịch sử sử dụng mã:
                    <span className="px-2 bg-blue-100 text-blue-700 rounded text-base border border-blue-200 tracking-wider">
                      {selectedVoucher?.maApDung}
                    </span>
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Danh sách các giao dịch áp dụng voucher này.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpenTxModal(false)}
                className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-full transition"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex border-b border-gray-200 px-6 bg-gray-50/50">
              {[
                { id: "all", label: "Tất cả" },
                { id: "paid", label: "Đã thanh toán" },
                { id: "refunded", label: "Đã hoàn tiền" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 px-6 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-blue-600 text-blue-600 bg-blue-50/30"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="overflow-y-auto flex-1 bg-white">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead className="bg-gray-50 sticky top-0 shadow-sm">
                  <tr>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                      Mã giao dịch
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                      Ngày giao dịch
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                      Mã Học viên
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                      mã Khóa học
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                      Cổng giao dịch
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-center">
                      Trạng thái
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-right">
                      Giá gốc
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-right">
                      Trị giá
                    </th>
                    <th className="px-6 py-3 text-xs font-bold text-blue-600 uppercase text-right bg-blue-50">
                      Chi phí khuyến mãi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((tx) => {
                      const chiPhiKM = tx.giaGoc - tx.triGia;
                      const congInfo = getCongGDInfo(tx.congGD);

                      return (
                        <tr
                          key={tx.giaoDichID}
                          className="hover:bg-blue-50/20 transition-colors"
                        >
                          <td className="px-6 py-3.5 text-sm font-medium text-gray-700">
                            {tx.giaoDichID}
                          </td>
                          <td className="px-6 py-3.5 text-sm text-gray-500">
                            {formatDate(tx.ngayGD)}
                          </td>
                          <td className="px-6 py-3.5 text-sm text-gray-600">
                            {tx.userID}
                          </td>
                          <td className="px-6 py-3.5 text-sm text-gray-600">
                            {tx.khoaHocID}
                          </td>
                          <td className="px-6 py-3.5 text-sm text-gray-600">
                            <span className="flex items-center gap-1.5 bg-gray-50 w-max px-2 py-1 rounded border border-gray-100">
                              {congInfo.icon} {congInfo.label}
                            </span>
                          </td>
                          <td className="px-6 py-3.5 text-center">
                            {tx.trangThai === 1 ? (
                              <span className="inline-flex px-2 py-1 rounded-md text-[11px] font-medium bg-green-50 text-green-600 border border-green-100">
                                Đã thanh toán
                              </span>
                            ) : (
                              <span className="inline-flex px-2 py-1 rounded-md text-[11px] font-medium bg-red-50 text-red-600 border border-red-100">
                                Đã hoàn tiền
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-3.5 text-sm text-gray-600 text-right">
                            {formatCurrency(tx.giaGoc)}
                          </td>
                          <td className="px-6 py-3.5 text-sm text-blue-600 font-medium text-right">
                            {formatCurrency(tx.triGia)}
                          </td>
                          <td className="px-6 py-3.5 text-sm font-bold text-red-600 text-right bg-blue-50/50">
                            {formatCurrency(chiPhiKM)}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan="9"
                        className="px-6 py-12 text-center text-gray-400 italic"
                      >
                        Không có giao dịch nào phù hợp.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Hiển thị{" "}
                <span className="font-semibold text-gray-800">
                  {filteredTransactions.length}
                </span>{" "}
                giao dịch
              </p>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-600 tracking-wide">
                  Tổng chi phí khuyến mãi:
                </span>
                <span className="font-bold text-blue-600 bg-white px-4 py-1.5 rounded-lg border border-blue-200 shadow-sm">
                  {formatCurrency(totalPromotionalCost)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
