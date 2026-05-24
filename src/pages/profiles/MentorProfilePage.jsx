import { useState, useEffect } from "react";
import {
  X,
  User,
  Mail,
  Shield,
  Calendar,
  Star,
  DollarSign,
  Hash,
  Edit,
  Key,
} from "lucide-react";
import {
  getMentorProfile,
  changePassword,
  changeMentorProfile,
} from "../../services/accountService";

import { useToast } from "../..//contexts/ToastContext";

export default function MentorProfilePage() {
  const { addToast } = useToast();

  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [passwordForm, setPasswordForm] = useState({
    password: "",
    new_password: "",
    reenter_password: "",
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const [modalType, setModalType] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMentorProfile();
        setUser(data);
        setFormData(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleInfoChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    const payload = {
      hoTen: formData.hoTen,
      email: formData.email,
    };
    const res = await changeMentorProfile(payload);
    if (!res) {
      addToast("Đã xảy ra lỗi!", "error");
      return;
    } else {
      const newData = await getMentorProfile();
      setUser(newData);
      addToast("Đã thay đổi thông tin cá nhân thành công!", "success");
    }
    setModalType(null);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordForm.new_password !== passwordForm.reenter_password) {
      addToast("Mật khẩu nhập lại không trùng!", "");
      return;
    }
    const payload = {
      password: passwordForm.password,
      new_password: passwordForm.new_password,
      reenter_password: passwordForm.reenter_password,
    };
    const res = await changePassword(payload);
    if (!res) {
      addToast("Thay đổi mật khẩu không thành công!", "error");
      return;
    }
    addToast("Thay đổi mật khẩu thành công!", "success");
    setPasswordForm({ password: "", new_password: "", reenter_password: "" });
    setModalType(null);
  };

  return (
    <div className="h-[90vh] bg-gray-50 flex justify-center py-10 px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row overflow-hidden h-fit">
        {/* Cột trái: Avatar & Hành động nhanh */}
        <div className="w-full md:w-1/3 bg-blue-50/50 p-8 flex flex-col items-center border-b md:border-b-0 md:border-r border-gray-100">
          <div className="relative">
            <img
              src="https://i.pinimg.com/originals/16/69/2c/16692c248260ceadcb73963190b1f5e5.png"
              alt="Profile"
              className="w-36 h-36 rounded-full border-4 border-white shadow-md object-cover"
            />
            <div
              className="absolute bottom-2 right-2 bg-green-500 w-4 h-4 rounded-full border-2 border-white"
              title="Đang hoạt động"
            ></div>
          </div>

          <h2 className="text-xl font-bold text-gray-800 mt-5 text-center">
            {user?.hoTen || "Đang tải..."}
          </h2>
          <p className="text-sm text-gray-500 mt-1">Người hướng dẫn</p>

          <div className="w-full flex flex-col gap-3 mt-8">
            <button
              onClick={() => {
                setFormData(user);
                setModalType("editInfo");
              }}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              <Edit size={18} /> Chỉnh sửa thông tin
            </button>
            <button
              onClick={() => setModalType("changePassword")}
              className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-200 py-2.5 rounded-lg hover:bg-gray-50 transition font-medium"
            >
              <Key size={18} /> Đổi mật khẩu
            </button>
          </div>
        </div>

        {/* Cột phải: Thông tin chi tiết */}
        <div className="w-full md:w-2/3 p-8">
          <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-3">
            Thông tin chi tiết
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <span className="flex items-center gap-2 text-sm text-gray-500">
                <Hash size={16} /> Mã người dùng
              </span>
              <p className="font-semibold text-gray-800 ml-6">{user?.userID}</p>
            </div>

            <div className="space-y-1">
              <span className="flex items-center gap-2 text-sm text-gray-500">
                <User size={16} /> Tên người dùng
              </span>
              <p className="font-semibold text-gray-800 ml-6">{user?.hoTen}</p>
            </div>

            <div className="space-y-1">
              <span className="flex items-center gap-2 text-sm text-gray-500">
                <Mail size={16} /> Email
              </span>
              <p className="font-semibold text-gray-800 ml-6">{user?.email}</p>
            </div>

            <div className="space-y-1">
              <span className="flex items-center gap-2 text-sm text-gray-500">
                <Shield size={16} /> Vai trò
              </span>
              <p className="font-semibold text-gray-800 ml-6">
                Người hướng dẫn
              </p>
            </div>

            <div className="space-y-1">
              <span className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar size={16} /> Ngày tạo tài khoản
              </span>
              <p className="font-semibold text-gray-800 ml-6">
                {user?.ngayTao}
              </p>
            </div>
          </div>

          <h3 className="text-lg font-bold text-gray-800 mt-8 mb-6 border-b pb-3">
            Thống kê hoạt động
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-full text-orange-500">
                <Star size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Trung bình đánh giá</p>
                <p className="text-xl font-bold text-gray-800">
                  {user?.trungBinhDanhGia}
                </p>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-xl border border-green-100 flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full text-green-600">
                <DollarSign size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Doanh thu</p>
                <p className="text-xl font-bold text-gray-800">
                  {formatCurrency(user?.doanhThu)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL ZONE */}
      {modalType && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-2xl relative p-6">
            <button
              onClick={() => setModalType(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black"
            >
              <X size={20} />
            </button>

            {modalType === "editInfo" && (
              <>
                <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
                  <Edit size={20} className="text-blue-600" /> Cập nhật thông
                  tin
                </h2>
                <form onSubmit={handleUpdateInfo} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-600">
                      Tên người dùng
                    </label>
                    <input
                      type="text"
                      name="hoTen"
                      value={formData.hoTen || ""}
                      onChange={handleInfoChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-600">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email || ""}
                      onChange={handleInfoChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setModalType(null)}
                      className="flex-1 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                    >
                      Lưu thay đổi
                    </button>
                  </div>
                </form>
              </>
            )}

            {modalType === "changePassword" && (
              <>
                <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
                  <Key size={20} className="text-blue-600" /> Đổi mật khẩu
                </h2>
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-600">
                      Mật khẩu hiện tại
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={passwordForm.password}
                      onChange={handlePasswordChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-600">
                      Mật khẩu mới
                    </label>
                    <input
                      type="password"
                      name="new_password"
                      value={passwordForm.new_password}
                      onChange={handlePasswordChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-600">
                      Nhập lại mật khẩu mới
                    </label>
                    <input
                      type="password"
                      name="reenter_password"
                      value={passwordForm.reenter_password}
                      onChange={handlePasswordChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setModalType(null)}
                      className="flex-1 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                    >
                      Xác nhận đổi
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
