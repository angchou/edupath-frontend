import React, { useEffect, useState } from "react";
import { Plus, Search, X } from "lucide-react";
import { useToast } from "../../../contexts/ToastContext";
import { FaCashRegister } from "react-icons/fa";

import {
  getAllBudgets,
  getBudgetTypes,
  createBudget,
} from "../../../services/budgetService";

export default function BudgetManagement() {
  const { addToast } = useToast();
  const [categories, setCategories] = useState([]);

  const [budgets, setBudgets] = useState([]);

  const [budgetFormData, setBudgetFormData] = useState({
    loaiNganSachID: "",
    ngayBatDau: "",
    ngayKetThuc: "",
    triGia: "",
  });

  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");

  const fetchBudgetTypes = async () => {
    const data = await getBudgetTypes();
    setCategories(data);
  };
  const fetchBudgets = async () => {
    const data = await getAllBudgets();
    setBudgets(data);
  };

  useEffect(() => {
    fetchBudgetTypes();
  }, []);
  useEffect(() => {
    fetchBudgets();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "triGia") {
      const rawValue = value.replace(/\D/g, "");
      setBudgetFormData({ ...budgetFormData, [name]: rawValue });
    } else {
      setBudgetFormData({ ...budgetFormData, [name]: value });
    }
  };

  const handleSubmitCreateBudget = async (e) => {
    e.preventDefault();
    if (
      !budgetFormData.loaiNganSachID ||
      !budgetFormData.ngayBatDau ||
      !budgetFormData.ngayKetThuc ||
      !budgetFormData.triGia
    ) {
      addToast("Vui lòng điền đầy đủ thông tin ngân sách!");
      return;
    }

    const newBudget = {
      loaiNganSachID: budgetFormData.loaiNganSachID,
      ngayBatDau: budgetFormData.ngayBatDau,
      ngayKetThuc: budgetFormData.ngayKetThuc,
      triGia: Number(budgetFormData.triGia),
    };

    const res = await createBudget(newBudget);
    if (!res) {
      addToast("Đã xảy ra lỗi, vui lòng thử lại!", "error");
      return;
    }
    fetchBudgets();
    addToast("Đã thành công tạo ngân sách mới!", "success");
    setBudgetFormData({
      loaiNganSachID: "",
      ngayBatDau: "",
      ngayKetThuc: "",
      triGia: "",
    });
  };

  const getCategoryName = (id) => {
    const category = categories.find((c) => c.loaiNganSachID === id);
    return category ? category.tenLNS : "Không xác định";
  };

  const filteredBudgets = budgets.filter((item) => {
    const matchStart = filterStartDate
      ? item.ngayBatDau >= filterStartDate
      : true;
    const matchEnd = filterEndDate ? item.ngayKetThuc <= filterEndDate : true;
    return matchStart && matchEnd;
  });

  return (
    <div className="h-[90vh] py-5 px-4 flex flex-col overflow-hidden">
      <div className="max-w-6xl w-full mx-auto flex flex-col flex-1 min-h-0 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch flex-1 min-h-0">
          <div className="bg-white p-6 shadow-sm border border-gray-100 lg:col-span-1 h-fit">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <span className="p-2 bg-blue-50 text-blue-500 text-sm">
                <Plus />
              </span>
              Tạo Ngân Sách Mới
            </h2>

            <form onSubmit={handleSubmitCreateBudget} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Loại ngân sách
                </label>
                <select
                  name="loaiNganSachID"
                  value={budgetFormData.loaiNganSachID}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 bg-white px-4 py-2.5 text-gray-800 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                >
                  <option value="">Chưa chọn loại ngân sách</option>{" "}
                  {categories.map((cat) => (
                    <option key={cat.loaiNganSachID} value={cat.loaiNganSachID}>
                      {cat.tenLNS} ({cat.loaiNganSachID})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Trị giá ngân sách (VNĐ)
                </label>
                <input
                  type="text"
                  name="triGia"
                  placeholder="Trị giá ngân sách"
                  value={
                    budgetFormData.triGia
                      ? Number(budgetFormData.triGia).toLocaleString("vi-VN")
                      : ""
                  }
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 px-4 py-2.5 text-gray-800 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ngày bắt đầu
                </label>
                <input
                  type="date"
                  name="ngayBatDau"
                  value={budgetFormData.ngayBatDau}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 px-4 py-2.5 text-gray-800 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ngày kết thúc
                </label>
                <input
                  type="date"
                  name="ngayKetThuc"
                  value={budgetFormData.ngayKetThuc}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 px-4 py-2.5 text-gray-800 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 shadow-md shadow-blue-100 transition-colors duration-200 mt-2"
              >
                Cấp phát ngân sách
              </button>
            </form>
          </div>

          <div className="space-y-4 lg:col-span-2 flex flex-col h-full min-h-0">
            <div className="bg-white p-4 border border-gray-100 flex flex-wrap items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Search className="w-4 h-4 text-gray-400" />
                <span>Lọc theo thời gian áp dụng:</span>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <input
                  type="date"
                  value={filterStartDate}
                  onChange={(e) => setFilterStartDate(e.target.value)}
                  className="border border-gray-300 px-3 py-1.5 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <span className="text-gray-400 text-sm">đến</span>
                <input
                  type="date"
                  value={filterEndDate}
                  onChange={(e) => setFilterEndDate(e.target.value)}
                  className="border border-gray-300 px-3 py-1.5 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />

                {(filterStartDate || filterEndDate) && (
                  <button
                    onClick={() => {
                      setFilterStartDate("");
                      setFilterEndDate("");
                    }}
                    className="p-1.5 bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="bg-white shadow-sm border border-gray-100 overflow-hidden flex flex-col flex-1">
              <div className="overflow-y-auto flex-1 min-h-0">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold border-b border-gray-100">
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                        Mã ngân sách
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                        Loại ngân sách
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                        Trị giá
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                        Thời hạn áp dụng
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                    {filteredBudgets.map((item) => (
                      <tr
                        key={item.nganSachID}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 font-medium text-blue-600">
                          {item.nganSachID}
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-semibold text-gray-900">
                            {getCategoryName(item.loaiNganSachID)}
                          </span>
                          <span className="block text-xs text-gray-400">
                            {item.loaiNganSachID}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-semibold text-emerald-600">
                          {item.triGia.toLocaleString("vi-VN")} VNĐ
                        </td>
                        <td className="px-6 py-4 text-gray-500">
                          <div className="flex items-center gap-1.5">
                            <span>{item.ngayBatDau}</span>
                            đến
                            <span>{item.ngayKetThuc}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredBudgets.length === 0 && (
                <div className="p-5 text-center text-gray-400 italic shrink-0">
                  Không tìm thấy ngân sách nào
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
