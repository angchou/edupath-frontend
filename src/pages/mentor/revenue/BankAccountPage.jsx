import {
  Plus,
  X,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  createBankAccount,
  getMyBankAccounts,
  updateBankAccount,
  enableBankAccount,
  disableBankAccount,
} from "../../../services/bankAccountService";

import { useToast } from "../../../contexts/ToastContext";

export default function BankAccountPage() {
  const { addToast } = useToast();

  const [selectedAccount, setSelectedAccount] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState("form"); // "form", "delete", "enable"
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState({
    tenNH: "",
    stk: "",
  });

  const [bankAccounts, setBankAccounts] = useState([]);

  // Lấy dữ liệu từ Server
  const fetchData = async () => {
    try {
      const data = await getMyBankAccounts();
      setBankAccounts(data || []);
    } catch (error) {
      addToast("Không thể tải danh sách tài khoản!", "error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Mở modal Thêm/Sửa
  const handleOpenForm = (account = null) => {
    setModalType("form");
    if (account) {
      setForm({ tenNH: account.tenNH, stk: account.stk });
      setSelectedAccount(account);
      setIsEdit(true);
    } else {
      setForm({ tenNH: "", stk: "" });
      setSelectedAccount(null);
      setIsEdit(false);
    }
    setOpenModal(true);
  };

  // Mở modal thay đổi trạng thái (Enable/Disable)
  const handleOpenStatusModal = (account, type) => {
    setForm(account);
    setModalType(type); // "delete" hoặc "enable"
    setOpenModal(true);
  };

  // Xử lý Thêm hoặc Cập nhật thông tin
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      tenNH: form.tenNH,
      stk: form.stk,
    };

    if (isEdit) {
      const res = await updateBankAccount(selectedAccount.tknhID, payload);
      if (res) {
        addToast("Cập nhật tài khoản thành công!", "success");
        fetchData();
      } else {
        addToast("Cập nhật không thành công!", "error");
      }
    } else {
      const res = await createBankAccount(payload);
      if (res) {
        addToast("Tạo tài khoản thành công!", "success");
        fetchData();
      } else {
        addToast("Tạo tài khoản không thành công!", "error");
      }
    }
    setOpenModal(false);
  };

  // Xác nhận thay đổi trạng thái (Khóa/Mở)
  const confirmToggleStatus = async () => {
    let res;
    if (modalType === "delete") {
      res = await disableBankAccount(form.tknhID);
    } else {
      res = await enableBankAccount(form.tknhID);
    }

    if (res) {
      addToast(
        `${modalType === "delete" ? "Vô hiệu hóa" : "Kích hoạt"} thành công!`,
        "success",
      );
      fetchData();
    } else {
      addToast("Đã có lỗi xảy ra!", "error");
    }
    setOpenModal(false);
  };

  return (
    <div className="flex h-[90vh] flex-col font-sans">
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="md:h-16 bg-white border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-4 md:px-8 py-3">
          <p className="text-sm text-gray-500">
            Bạn có {bankAccounts.length} tài khoản
          </p>
          <button
            className="flex text-sm items-center gap-2 px-4 py-2 text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white transition duration-300 shadow-sm"
            onClick={() => handleOpenForm()}
          >
            Thêm tài khoản
          </button>
        </header>

        <main className="flex-1 p-4 md:p-2">
          <div className="h-full bg-white border border-gray-100 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Mã
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Ngân hàng
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Số tài khoản
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Trạng thái
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-center"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {bankAccounts.length == 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center py-10 text-gray-400 italic"
                    >
                      Không tìm thấy giao dịch
                    </td>
                  </tr>
                ) : (
                  bankAccounts.map((item) => (
                    <tr
                      key={item.tknhID}
                      className="hover:bg-blue-50/20 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {item.tknhID}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {item.tenNH}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 tracking-wider">
                        {item.stk}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`font-semibold flex items-center gap-1.5 text-sm ${
                            item.trangThai === 1
                              ? "text-green-600"
                              : "text-red-400"
                          }`}
                        >
                          {item.trangThai === 1 ? <>Hoạt động</> : <>Đã khóa</>}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col items-center justify-center gap-2 w-full">
                          <button
                            onClick={() => handleOpenForm(item)}
                            className="text-blue-500 hover:text-blue-700 flex items-center gap-1.5 text-sm font-medium"
                          >
                            <Edit size={15} /> Chỉnh sửa
                          </button>

                          {item.trangThai === 1 ? (
                            <button
                              onClick={() =>
                                handleOpenStatusModal(item, "delete")
                              }
                              className="text-red-500 hover:text-red-700 flex items-center gap-1.5 text-sm font-medium"
                            >
                              Vô hiệu hóa
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                handleOpenStatusModal(item, "enable")
                              }
                              className="text-green-600 hover:text-green-800 flex items-center gap-1.5 text-sm font-medium"
                            >
                              Kích hoạt lại
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* MODAL SYSTEM */}
      {openModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md shadow-2xl relative rounded-sm overflow-hidden">
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black transition"
            >
              <X size={20} />
            </button>

            {modalType === "form" ? (
              <div className="p-8">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  {isEdit ? "Cập nhật tài khoản" : "Thêm tài khoản mới"}
                </h2>
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Tên ngân hàng"
                    className="w-full px-0 py-2 border-b outline-none focus:border-blue-500 transition"
                    value={form.tenNH}
                    onChange={(e) =>
                      setForm({ ...form, tenNH: e.target.value })
                    }
                    required
                  />
                  <input
                    type="text"
                    placeholder="Số tài khoản"
                    className="w-full px-0 py-2 border-b outline-none focus:border-blue-500 transition"
                    value={form.stk}
                    onChange={(e) => setForm({ ...form, stk: e.target.value })}
                    required
                  />

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setOpenModal(false)}
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
            ) : (
              <div className="p-8 text-center">
                <div
                  className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                    modalType === "delete" ? "bg-red-50" : "bg-green-50"
                  }`}
                >
                  {modalType === "delete" ? (
                    <AlertTriangle size={32} className="text-red-500" />
                  ) : (
                    <CheckCircle size={32} className="text-green-500" />
                  )}
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {modalType === "delete"
                    ? "Vô hiệu hóa tài khoản?"
                    : "Kích hoạt tài khoản?"}
                </h2>
                <p className="text-gray-500 mb-8 text-sm px-4">
                  Bạn có chắc chắn muốn{" "}
                  {modalType === "delete" ? "ngừng hoạt động" : "kích hoạt lại"}{" "}
                  tài khoản <b>{form.tenNH}</b>?
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setOpenModal(false)}
                    className="flex-1 py-2.5 border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition"
                  >
                    Đóng
                  </button>
                  <button
                    onClick={confirmToggleStatus}
                    className={`flex-1 py-2.5 text-white font-medium transition shadow-lg ${
                      modalType === "delete"
                        ? "bg-[#cf345a] hover:bg-[#b02a4a] shadow-red-100"
                        : "bg-[#25ba66] hover:bg-[#21a65b] shadow-green-100"
                    }`}
                  >
                    {modalType === "delete"
                      ? "Đồng ý khóa"
                      : "Xác nhận kích hoạt"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
