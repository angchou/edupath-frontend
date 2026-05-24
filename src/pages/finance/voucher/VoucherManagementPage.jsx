import { useEffect, useState } from "react";
import {
  Ticket,
  Plus,
  X,
  Percent,
  Coins,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { useToast } from "../../../contexts/ToastContext";

import {
  getAllVouchers,
  createVoucher,
} from "../../../services/voucherService";

export default function VoucherManagementPage() {
  const { addToast } = useToast();

  const [vouchers, setVouchers] = useState([]);

  const [openCreateVoucherModal, setOpenCreateVoucherModal] = useState(false);
  const [formVoucher, setFormVoucher] = useState({
    maApDung: "",
    loaiVoucher: "0",
    triGia: "",
    slToiDa: "",
    hanSuDung: "",
  });

  const fetchData = async () => {
    const data = await getAllVouchers();
    setVouchers(data);
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

  const renderTriGia = (loaiVoucher, triGia) => {
    if (loaiVoucher === 0) {
      return <span className="text-blue-600">{triGia * 100}%</span>;
    }
    return <span className="text-green-600">{formatCurrency(triGia)}</span>;
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

  const handleChange = (e) => {
    setFormVoucher({
      ...formVoucher,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitCreateVoucher = async (e) => {
    e.preventDefault();

    let parsedTriGia = Number(formVoucher.triGia);
    const loai = Number(formVoucher.loaiVoucher);

    if (loai === 0 && parsedTriGia > 1) {
      parsedTriGia = parsedTriGia / 100;
    }

    const newVoucher = {
      maApDung: formVoucher.maApDung.toUpperCase(),
      loaiVoucher: loai,
      triGia: parsedTriGia,
      slToiDa: Number(formVoucher.slToiDa),
      hanSuDung: formVoucher.hanSuDung,
    };

    const res = await createVoucher(newVoucher);
    if (!res) {
      addToast("Tạo voucher không thành công, vui lòng thử lại!", "error");
      return;
    }
    setVouchers([newVoucher, ...vouchers]);
    setOpenCreateVoucherModal(false);
    setFormVoucher({
      maApDung: "",
      loaiVoucher: "0",
      triGia: "",
      slToiDa: "",
      hanSuDung: "",
    });
    fetchData();
    addToast("Tạo voucher mới thành công!", "success");
  };

  return (
    <div className="h-[90vh] py-4 px-4 flex justify-center">
      <div className="w-full max-w-6xl flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h1 className="font-bold text-gray-800">Quản lý Voucher</h1>
            <p className="text-gray-500 text-sm mt-1">
              Xem danh sách và tạo mã giảm giá mới
            </p>
          </div>
          <button
            onClick={() => setOpenCreateVoucherModal(true)}
            className="flex items-center gap-2 px-4 py-2 text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white transition duration-300 shadow-sm text-sm"
          >
            <Plus size={18} /> Tạo Voucher
          </button>
        </div>

        <div className="bg-white border border-gray-100 overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-2">
            <Ticket className="text-blue-500 mt-1" size={20} />
            <h3 className="text-lg text-gray-800">Danh sách mã giảm giá</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead className="bg-gray-50/50 border-b border-gray-100">
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
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {vouchers.length > 0 ? (
                  vouchers.map((item) => (
                    <tr
                      key={item.voucherID}
                      className="hover:bg-blue-50/20 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-800">
                        <span className="px-2 py-1 bg-gray-100 rounded tracking-widest font-semibold text-blue-700">
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
                        {item.slDaSuDung} / {item.slToiDa}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {item.hanSuDung}
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

      {/* MODAL TẠO VOUCHER */}
      {openCreateVoucherModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md shadow-lg relative p-6">
            <button
              onClick={() => setOpenCreateVoucherModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl mb-6 flex items-center gap-2 text-gray-800">
              <Ticket size={22} className="text-blue-600" />
              <p className="font-semibold text-blue-700">Thêm Voucher mới</p>
            </h2>

            <form
              onSubmit={handleSubmitCreateVoucher}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-2">
                <label className="text-gray-700">Mã áp dụng</label>
                <input
                  type="text"
                  name="maApDung"
                  value={formVoucher.maApDung}
                  onChange={handleChange}
                  required
                  placeholder="VD: MORGANA50"
                  className="w-full px-4 py-2 border-b-1 border-gray-300 outline-none focus:border-blue-500 focus:ring-blue-500 transition"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-gray-700">Loại giảm giá</label>
                <select
                  name="loaiVoucher"
                  value={formVoucher.loaiVoucher}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-b-1 border-gray-300 outline-none focus:border-blue-500 focus:ring-blue-500 transition bg-white"
                >
                  <option value="0">Giảm theo tỉ lệ (%)</option>
                  <option value="1">Giảm theo số tiền (VNĐ)</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-gray-700">
                  Trị giá{" "}
                  {formVoucher.loaiVoucher === "0"
                    ? "(Nhập số %, VD: 50)"
                    : "(Nhập VNĐ, VD: 100000)"}
                </label>
                <input
                  type="number"
                  name="triGia"
                  value={formVoucher.triGia}
                  onChange={handleChange}
                  required
                  min="1"
                  placeholder={
                    formVoucher.loaiVoucher === "0" ? "50" : "100000"
                  }
                  className="w-full px-4 py-2 border-b-1 border-gray-300 outline-none focus:border-blue-500 focus:ring-blue-500 transition bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-gray-700">Số lượng tối đa</label>
                  <input
                    type="number"
                    name="slToiDa"
                    value={formVoucher.slToiDa}
                    onChange={handleChange}
                    required
                    min="1"
                    placeholder="VD: 100"
                    className="w-full px-4 py-2 border-b-1 border-gray-300 outline-none focus:border-blue-500 focus:ring-blue-500 transition bg-white"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-gray-700">Hạn sử dụng</label>
                  <input
                    type="date"
                    name="hanSuDung"
                    value={formVoucher.hanSuDung}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border-b-1 border-gray-300 outline-none focus:border-blue-500 focus:ring-blue-500 transition bg-white"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setOpenCreateVoucherModal(false)}
                  className="flex-1 py-2.5 bg-[#cf345a] text-white font-medium hover:bg-[#b02a4a] transition"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                >
                  Xác nhận
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
