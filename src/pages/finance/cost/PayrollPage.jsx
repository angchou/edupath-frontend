import React, { useEffect, useState } from "react";
import {
  Users,
  Filter,
  Calendar,
  AlertTriangle,
  Eye,
  Plus,
  X,
  DollarSign,
} from "lucide-react";

import { useToast } from "../../../contexts/ToastContext";

import {
  getEmployeesInfoForPayroll,
  getEmployeePayroll,
  createPayroll,
  finishPayment,
} from "../../../services/EmployeeService";

export default function PayrollPage() {
  const { addToast } = useToast();
  const [employees, setEmployees] = useState([]);

  const [lichSuLuong, setLichSuLuong] = useState([]);

  const [filterTreLuong, setFilterTreLuong] = useState(false);
  const [openPayrollHistoryModal, setOpenPayrollHistoryModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const fetchEmployees = async () => {
    const data = await getEmployeesInfoForPayroll();
    setEmployees(data);
  };

  const fetchPayroll = async (userID) => {
    const data = await getEmployeePayroll(userID);
    setLichSuLuong(data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const [formData, setFormData] = useState({
    userID: "",
    luongThuong: 0,
    luongKhauTru: 0,
  });

  const handleOpenHistory = (nv) => {
    setOpenPayrollHistoryModal(true);
    setSelectedEmployee(nv);
    fetchPayroll(nv.userID);
  };

  const formatVND = (value) => {
    if (!value) return "";
    return value
      .toString()
      .replace(/\D/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const parseVND = (value) => {
    if (!value) return 0;
    return Number(value.toString().replace(/\./g, ""));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "luongThuong" || name === "luongKhauTru") {
      const rawValue = value.replace(/\./g, "");
      setFormData({
        ...formData,
        [name]: rawValue === "" ? 0 : Number(rawValue),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const tinhNgayTre = (ngayTraCuoi) => {
    if (ngayTraCuoi === null) return;

    const homNay = new Date();
    const ngayCuoi = new Date(ngayTraCuoi);
    const hanTraTiepTheo = new Date(ngayCuoi.setDate(ngayCuoi.getDate() + 30));

    if (homNay > hanTraTiepTheo) {
      const diffTime = Math.abs(homNay - hanTraTiepTheo);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const filteredNhanViens = employees.filter((nv) => {
    if (filterTreLuong) {
      return tinhNgayTre(nv.ngayTraLuongCuoiCung) > 0;
    }
    return true;
  });

  const handleSubmitCreatePayroll = async (e) => {
    e.preventDefault();
    if (!selectedEmployee) {
      addToast("Chưa chọn nhân viên để tạo phiếu lương!");
      return;
    }

    const payload = {
      userID: selectedEmployee.userID,
      luongThuong: formData.luongThuong,
      luongKhauTru: formData.luongKhauTru,
    };
    const res = await createPayroll(payload);
    if (!res) {
      addToast("Đã xảy ra lỗi, vui lòng thử lại!", "error");
      return;
    }
    fetchEmployees();
    addToast("Tạo phiếu lương thành công, vui lòng thanh toán!", "success");
    setSelectedEmployee(null);
    setFormData({
      userID: "",
      luongThuong: 0,
      luongKhauTru: 0,
    });
  };

  const handleFinishPayment = async (luongChiTietID) => {
    const data = await finishPayment(luongChiTietID);
    if (!data) {
      addToast("Đã xảy ra lỗi, vui lòng thử lại!", "error");
      return;
    }
    addToast("Đã cập nhật phiếu lương thành đã thanh toán!", "success");
    fetchPayroll(selectedEmployee?.userID);
  };

  const tamTinhCuoiCung = selectedEmployee
    ? Number(selectedEmployee.luongCoBan) +
      Number(selectedEmployee.luongPhuCap) +
      Number(formData.luongThuong) -
      Number(formData.luongKhauTru)
    : 0;

  return (
    <div className="h-[90vh] p-2 font-sans">
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-3">
        <div className="xl:col-span-3 bg-white p-2 border border-gray-100 flex flex-col">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2 ml-3 mt-1">
              <Users size={18} className="text-blue-500" /> Nhân viên đang hoạt
              động ({filteredNhanViens.length})
            </h2>

            <button
              onClick={() => setFilterTreLuong(!filterTreLuong)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all ${
                filterTreLuong
                  ? "bg-rose-50 text-rose-600"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Filter size={16} />
              {filterTreLuong
                ? "Đang lọc: Chưa nhập lương quá hạn"
                : "Lọc nhân viên trễ hạn nhập lương"}
            </button>
          </div>

          <div className="overflow-x-auto border border-gray-100">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Nhân viên
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Chức vụ
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-right">
                    Lương Cơ Bản
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-center">
                    Ngày trả cuối
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-center">
                    Trạng thái
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-center">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                {filteredNhanViens.map((nv) => {
                  const ngayTre = tinhNgayTre(nv.ngayTraLuongCuoiCung);
                  return (
                    <tr
                      key={nv.userID}
                      className={`
                        transition-colors
                        ${selectedEmployee === nv ? "bg-blue-50/80" : "hover:bg-gray-50/80"}
                        `}
                    >
                      <td className="p-4">
                        <div className="font-semibold text-gray-900">
                          {nv.hoTen}
                        </div>
                        <div className="text-xs text-gray-400">
                          {nv.email} | {nv.userID}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium">
                          {nv.chucVu}
                        </span>
                      </td>
                      <td className="p-4 text-right font-medium text-gray-800">
                        {nv.luongCoBan.toLocaleString()} đ
                      </td>
                      <td className="p-4 text-center text-gray-500">
                        {nv.ngayTraLuongCuoiCung || "Chưa có"}
                      </td>
                      <td className="p-4 text-center">
                        {ngayTre > 0 ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-rose-50 text-rose-600 text-xs font-semibold animate-pulse">
                            <AlertTriangle size={12} /> Trễ {ngayTre} ngày
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 bg-emerald-50 text-emerald-600 text-xs font-medium">
                            Đã trả lương
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedEmployee(nv);
                              setFormData({
                                userID: "",
                                luongThuong: 0,
                                luongKhauTru: 0,
                              });
                            }}
                            className={`
                              flex justify-center items-center gap-1 px-3 py-1.5 text-white font-medium text-xs rounded-md shadow-sm border border-emerald-700/10 transition-colors
                              ${selectedEmployee === nv ? "scale-95 bg-blue-700" : "bg-blue-500 hover:bg-blue-600"}
                            `}
                          >
                            Cấp phiếu
                          </button>

                          <button
                            onClick={() => {
                              handleOpenHistory(nv);
                            }}
                            className="flex justify-center items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-md border border-slate-200 transition-colors duration-150 justify-center"
                          >
                            Lịch sử
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filteredNhanViens.length === 0 && (
                  <tr>
                    <td
                      colSpan="7"
                      className="p-8 text-center text-gray-400 italic"
                    >
                      Không tìm thấy nhân viên nào đang hoạt động
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="xl:col-span-1 bg-white p-5 shadow-sm border border-gray-100 h-fit">
          <h2 className="text-base font-bold text-gray-800 justify-center mb-4 flex items-center gap-2 pb-2 border-b border-gray-100">
            Thêm Phiếu Lương Mới
          </h2>

          <form
            onSubmit={handleSubmitCreatePayroll}
            className="space-y-4 text-sm"
          >
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                {selectedEmployee ? "Đã chọn nhân viên" : "Chọn nhân viên"}
              </label>
              <div className="p-2 bg-gray-100/80">
                {selectedEmployee?.userID} - {selectedEmployee?.hoTen}
              </div>
            </div>

            {selectedEmployee && (
              <div className="bg-gray-50 p-2.5 text-xs space-y-1 border border-gray-100">
                <div className="flex justify-between">
                  <span className="text-gray-500">Lương cơ bản:</span>{" "}
                  <span className="font-medium">
                    {selectedEmployee?.luongCoBan.toLocaleString()}đ
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Phụ cấp cố định:</span>{" "}
                  <span className="font-medium text-blue-600">
                    +{selectedEmployee?.luongPhuCap.toLocaleString()}đ
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Lương thưởng:</span>{" "}
                  <span className="font-medium text-green-700">
                    +{formData.luongThuong.toLocaleString()}đ
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Lương khấu trừ:</span>{" "}
                  <span className="font-medium text-red-600">
                    -{formData.luongKhauTru.toLocaleString()}đ
                  </span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Lương thưởng (VNĐ)
                </label>
                <div className="relative">
                  <input
                    disabled={!selectedEmployee}
                    type="text"
                    name="luongThuong"
                    value={
                      formData.luongThuong === 0
                        ? ""
                        : formatVND(formData.luongThuong)
                    }
                    onChange={handleInputChange}
                    placeholder="0"
                    className={`
                      w-full p-2 text-left border border-gray-200 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                      ${!selectedEmployee && "bg-gray-100"}
                      `}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Khấu trừ (VNĐ)
                </label>
                <div className="relative">
                  <input
                    disabled={!selectedEmployee}
                    type="text"
                    name="luongKhauTru"
                    value={
                      formData.luongKhauTru === 0
                        ? ""
                        : formatVND(formData.luongKhauTru)
                    }
                    onChange={handleInputChange}
                    placeholder="0"
                    className={`
                      w-full p-2 text-left border border-gray-200 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                      ${!selectedEmployee && "bg-gray-100"}
                      `}
                  />
                </div>
              </div>
            </div>

            {selectedEmployee && (
              <div className="p-3 bg-emerald-50 text-emerald-600 flex justify-between items-center border border-emerald-100">
                <span className="text-xs font-bold uppercase">
                  Thực nhận tạm tính:
                </span>
                <span className="font-black text-emerald-700">
                  {tamTinhCuoiCung.toLocaleString()} đ
                </span>
              </div>
            )}

            <button
              disabled={!selectedEmployee}
              type="submit"
              className={`
                  w-full py-2.5 text-white font-semibold shadow-sm transition-colors duration-200
                  ${selectedEmployee ? "bg-blue-500 hover:bg-blue-600" : "bg-slate-400 cursor-not-allowed"}
                `}
            >
              Chốt phiếu Lương
            </button>
          </form>
        </div>
      </div>

      {openPayrollHistoryModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50">
          <div className="bg-white shadow-xl max-w-4xl w-full max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Lịch Sử Phiếu Lương
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Nhân viên:{" "}
                  <span className="font-semibold text-gray-700">
                    {selectedEmployee.hoTen} ({selectedEmployee.userID})
                  </span>{" "}
                  - {selectedEmployee.chucVu}
                </p>
              </div>
              <button
                onClick={() => {
                  setOpenPayrollHistoryModal(false);
                  setSelectedEmployee(null);
                }}
                className="p-1.5 hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="px-6 py-3 bg-blue-50/50 border-b border-gray-100 grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-gray-500">
                  Mức lương cơ bản hiện tại:
                </span>{" "}
                <strong className="text-gray-800 ml-1">
                  {selectedEmployee.luongCoBan.toLocaleString()} đ
                </strong>
              </div>
              <div>
                <span className="text-gray-500">Phụ cấp cố định:</span>{" "}
                <strong className="text-gray-800 ml-1">
                  {selectedEmployee.luongPhuCap.toLocaleString()} đ
                </strong>
              </div>
            </div>

            <div className="p-3 overflow-y-auto flex-1">
              {lichSuLuong && lichSuLuong.length > 0 ? (
                <div className="overflow-x-auto border border-gray-100">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-100">
                        <th className="px-3 py-4 text-xs font-semibold text-gray-500 uppercase">
                          Mã phiếu
                        </th>
                        <th className="px-3 py-4 text-xs font-semibold text-gray-500 uppercase text-center">
                          Thời gian lập
                        </th>
                        <th className="px-3 py-4 text-xs font-semibold text-gray-500 uppercase text-right">
                          Lương thưởng
                        </th>
                        <th className="px-3 py-4 text-xs font-semibold text-gray-500 uppercase text-right">
                          Khấu trừ
                        </th>
                        <th className="px-3 py-4 text-xs font-semibold text-gray-500 uppercase text-right text-emerald-700">
                          Lương cuối cùng
                        </th>
                        <th className="px-3 py-4 text-xs font-semibold text-gray-500 uppercase text-center">
                          Trạng thái
                        </th>
                        <th className="px-3 py-4 text-xs font-semibold text-gray-500 uppercase text-right">
                          Hành động
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-700">
                      {lichSuLuong.map((p) => (
                        <tr
                          key={p.luongChiTietID}
                          className="hover:bg-gray-50/60"
                        >
                          <td className="p-3 font-medium text-gray-900">
                            {p.luongChiTietID}
                          </td>
                          <td className="p-3 text-center text-gray-500">
                            {p.ngayTao}
                          </td>
                          <td className="p-3 text-right text-blue-600">
                            +{p.luongThuong.toLocaleString()} đ
                          </td>
                          <td className="p-3 text-right text-rose-600">
                            -{p.luongKhauTru.toLocaleString()} đ
                          </td>
                          <td className="p-3 text-right font-bold text-emerald-600">
                            {p.luongCuoiCung.toLocaleString()} đ
                          </td>
                          <td className="p-3 text-center">
                            <span
                              className={`px-2 py-0.5 text-xs font-medium border rounded-full ${
                                p.trangThai === 1
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                                  : "bg-amber-50 text-amber-700 border-amber-100"
                              }`}
                            >
                              {p.trangThai === 1
                                ? "Đã thanh toán"
                                : "Chưa thanh toán"}
                            </span>
                          </td>
                          <td className="p-2 text-right text-green-700">
                            {p.trangThai === 0 && (
                              <button
                                onClick={() =>
                                  handleFinishPayment(p.luongChiTietID)
                                }
                                className="py-1 px-2 bg-green-100 rounded-xl cursor-pointer hover:bg-green-200 transition"
                              >
                                Thanh toán lương
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-10 text-gray-400 flex flex-col items-center gap-2">
                  <Calendar size={26} className="text-gray-300" />
                  <span className="text-sm italic">
                    Nhân viên này chưa có phiếu lương trên hệ thống
                  </span>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-100 flex justify-end bg-gray-50">
              <button
                onClick={() => {
                  setOpenPayrollHistoryModal(false);
                  setSelectedEmployee(null);
                }}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium text-sm transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
