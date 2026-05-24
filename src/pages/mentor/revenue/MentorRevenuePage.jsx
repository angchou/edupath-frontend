import { useEffect, useState } from "react";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownToLine,
  CheckCircle2,
  Clock,
  XCircle,
  Plus,
  FileText,
  X,
  Landmark,
} from "lucide-react";

import {
  getMentorRevenue,
  createWithdraw,
  getMyWithdraws,
} from "../../../services/transactionService";
import { getMyBankAccounts } from "../../../services/bankAccountService";
import { useToast } from "../../../contexts/ToastContext";

export default function MentorRevenuePage() {
  const { addToast } = useToast();
  const [bankAccounts, setBankAccounts] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);

  const [tongDoanhThu, setTongDoanhThu] = useState(0);
  const [daRutThanhCong, setDaRutThanhCong] = useState(0);
  const [soDuKhaDung, setSoDuKhaDung] = useState(0);

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [formRutTien, setFormRutTien] = useState({
    soTienRut: "",
    tknhID: "",
  });

  const fetchRevenue = async () => {
    const data = await getMentorRevenue();
    setTongDoanhThu(data.tongDoanhThu);
    setDaRutThanhCong(data.daRutThanhCong);
    setSoDuKhaDung(data.soDuKhaDung);
    setWithdrawals(data.danhSachRutTien);
  };

  const fetchBankAccounts = async () => {
    const data = await getMyBankAccounts();
    const activeBankAccounts = data.filter(
      (account) => account.trangThai === 1,
    );
    setBankAccounts(activeBankAccounts);
  };

  useEffect(() => {
    fetchRevenue();
  }, []);

  useEffect(() => {
    fetchBankAccounts();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const handleChange = (e) => {
    setFormRutTien({
      ...formRutTien,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateWithdrawal = async (e) => {
    e.preventDefault();
    const payload = {
      soTienRut: Number(formRutTien.soTienRut),
      tknhID: formRutTien.tknhID,
    };
    if (payload.soTienRut < 5000) {
      addToast("Số tiền rút phải lớn hơn hoặc bằng 5000");
    }
    if (payload.soTienRut > tongDoanhThu) {
      addToast("Số tiền rút phải bé hơn hoặc bằng tổng doanh thu");
    }
    const res = await createWithdraw(payload);
    setFormRutTien({
      soTienRut: "",
      tknhID: "",
    });
    setOpenCreateModal(false);
    if (!res) {
      addToast("Tạo phiếu rút tiền thất bại, vui lòng thử lại!", "error");
      return;
    }
    addToast(
      "Tạo phiếu rút tiền thành công, vui lòng theo dõi trạng thái của phiếu rút tiền!",
      "success",
    );
    fetchRevenue();
    fetchMyWithdraw();
  };

  const renderStatusBadge = (status) => {
    switch (status) {
      case 0:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-600 border border-amber-200">
            <Clock size={14} /> Đang xử lý
          </span>
        );
      case 1:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-600 border border-green-200">
            <CheckCircle2 size={14} /> Thành công
          </span>
        );
      case 2:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-600 border border-red-200">
            <XCircle size={14} /> Thất bại
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-[90vh] py-4 px-4 flex justify-center relative">
      <div className="w-full max-w-6xl flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <button
            onClick={() => setOpenCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white transition duration-300 shadow-sm"
          >
            Tạo lệnh rút tiền
          </button>
        </div>

        {/* Thống kê (Dashboard Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div className="bg-white px-5 py-3 shadow-sm border border-gray-100 flex items-center gap-5">
            <div className="bg-blue-50 p-2 rounded-full text-blue-600">
              <Wallet size={28} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium mb-1">
                Tổng doanh thu
              </p>
              <p className="text-xl font-bold text-gray-800">
                {formatCurrency(tongDoanhThu)}
              </p>
            </div>
          </div>

          <div className="bg-white px-5 py-3 shadow-sm border border-gray-100 flex items-center gap-5">
            <div className="bg-green-50 p-2 rounded-full text-green-600">
              <ArrowUpRight size={28} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium mb-1">
                Đã rút thành công
              </p>
              <p className="text-xl font-bold text-gray-800">
                {formatCurrency(daRutThanhCong)}
              </p>
            </div>
          </div>

          <div className="bg-white px-5 py-3 shadow-sm border border-gray-100 flex items-center gap-5">
            <div className="bg-indigo-50 p-2 rounded-full text-indigo-600">
              <ArrowDownToLine size={28} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium mb-1">
                Số dư khả dụng
              </p>
              <p className="text-xl font-bold text-gray-800">
                {formatCurrency(soDuKhaDung)}
              </p>
            </div>
          </div>
        </div>

        {/* Danh sách phiếu rút tiền */}
        <div className="bg-white shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="px-6 py-2 border-b border-gray-100 flex items-center gap-2">
            <FileText className="text-blue-500 mt-1" size={20} />
            <h3 className="text-lg font-bold text-gray-800">
              Lịch sử rút tiền
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Mã phiếu
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Ngày rút
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Ngân hàng
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Số tài khoản
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Số tiền rút
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">
                    Trạng thái
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {withdrawals.length > 0 ? (
                  withdrawals.map((item) => (
                    <tr
                      key={item.rutTienID}
                      className="hover:bg-blue-50/20 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {item.rutTienID}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {item.ngayRutTien}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">
                        {item.tenNH}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                        {item.stk}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-800">
                        {formatCurrency(item.soTienRut)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {renderStatusBadge(item.trangThai)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-12 text-center italic text-gray-400"
                    >
                      Chưa có lịch sử rút tiền nào
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {openCreateModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md shadow-lg relative p-6">
            <button
              onClick={() => setOpenCreateModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl mb-4 flex items-center gap-2 text-gray-800">
              <Landmark size={22} className="text-blue-600" /> Tạo lệnh rút tiền
            </h2>

            <p className="mb-6 flex items-center gap-2 text-gray-600">
              Số dư có thể rút:{" "}
              <b className="text-blue-500">
                {soDuKhaDung >= 0 ? formatCurrency(soDuKhaDung) : 0} đồng
              </b>
            </p>

            <form
              onSubmit={handleCreateWithdrawal}
              className="flex flex-col gap-4"
            >
              {/* Nhập số tiền */}
              <div className="flex flex-col gap-2">
                <label className="text-gray-700">Số tiền muốn rút (VNĐ)</label>
                <div className="relative">
                  <input
                    type="text"
                    name="soTienRut"
                    value={
                      formRutTien.soTienRut
                        ? Number(formRutTien.soTienRut).toLocaleString("vi-VN")
                        : ""
                    }
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/\D/g, "");
                      const numericValue = rawValue
                        ? parseInt(rawValue, 10)
                        : "";
                      setFormRutTien({
                        ...formRutTien,
                        soTienRut: numericValue,
                      });
                    }}
                    required
                    placeholder="Ví dụ: 5.000.000"
                    className="w-full px-4 py-2 pr-14 border border-gray-300 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium pointer-events-none">
                    VNĐ
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-gray-700">
                  Chọn tài khoản nhận tiền
                </label>
                <select
                  name="tknhID"
                  value={formRutTien.tknhID}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white transition"
                >
                  <option value="" disabled>
                    Chọn ngân hàng đã lưu
                  </option>
                  {bankAccounts.map((acc) => (
                    <option key={acc.tknhID} value={acc.tknhID}>
                      {acc.tenNH} - {acc.stk}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500">
                  Bạn có thể quản lý danh sách này trong Tài khoản ngân hàng.
                </p>
              </div>

              <div className="flex gap-4 pt-6 border-t border-gray-100 mt-2">
                <button
                  type="button"
                  onClick={() => setOpenCreateModal(false)}
                  className="flex-1 py-2 text-white bg-[#cf345a] hover:bg-[#c71c46] transition"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Xác nhận rút
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
