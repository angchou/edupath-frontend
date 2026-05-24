import { useState, useEffect } from "react";
import {
  getLearnerProfile,
  changePassword,
  changeLearnerProfile,
} from "../../services/accountService";
import { useToast } from "../../contexts/ToastContext";
import {
  X,
  User,
  Mail,
  Shield,
  Calendar,
  Hash,
  Edit,
  Key,
  GraduationCap,
  Globe,
  BookOpen,
} from "lucide-react";

export default function LearnerProfilePage() {
  const { addToast } = useToast();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ ...user });
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [openChangeProfile, setOpenChangeProfile] = useState(false);
  const [form, setForm] = useState({
    password: "",
    new_password: "",
    reenter_password: "",
  });
  const [userForm, setUserForm] = useState({
    hoTen: "",
    email: "",
    gpa: 0,
    quocGiaDuHoc: "",
    nganhHoc: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLearnerProfile();
        setUser(data);
        setFormData(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (user) {
      setUserForm({
        hoTen: user?.hoTen || "",
        email: user?.email || "",
        gpa: user?.gpa || 0,
        quocGiaDuHoc: user?.quocGiaDuHoc || "",
        nganhHoc: user?.nganhHoc || "",
      });
    }
  }, [user]);

  const handleClose = () => {};

  const buildPasswordPayload = () => {
    return {
      password: form.password,
      new_password: form.new_password,
      reenter_password: form.reenter_password,
    };
  };

  const buildChangeProfilePayload = () => {
    return {
      hoTen: userForm.hoTen,
      email: userForm.email,
      gpa: Number(userForm.gpa),
      quocGiaDuHoc: userForm.quocGiaDuHoc,
      nganhHoc: userForm.nganhHoc,
    };
  };

  const handleSubmitChangePassword = async (e) => {
    e.preventDefault();
    const payload = buildPasswordPayload();
    if (payload.new_password != payload.reenter_password) {
      addToast("Mật khẩu nhập lại không trùng!", "");
      return;
    }
    const res = await changePassword(payload);
    if (!res) {
      addToast("Thay đổi mật khẩu không thành công!", "error");
      return;
    }
    addToast("Thay đổi mật khẩu thành công!", "success");
    setForm({
      password: "",
      new_password: "",
      reenter_password: "",
    });
    setOpenChangePassword(false);
  };

  const handleChangeProfile = async (e) => {
    e.preventDefault();
    const payload = buildChangeProfilePayload();
    const res = await changeLearnerProfile(payload);
    if (res) {
      const newData = await getLearnerProfile();
      setUser(newData);
      addToast("Đã thay đổi thông tin cá nhân thành công!", "success");
    } else {
      addToast("Đã xảy ra lỗi!", "error");
      return;
    }
    setOpenChangeProfile(false);
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
          </div>

          <h2 className="text-xl font-bold text-gray-800 mt-5 text-center">
            {user?.hoTen || "Đang tải..."}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {user?.roles?.map((role) => role).join(", ")}
          </p>

          <div className="w-full flex flex-col gap-3 mt-8">
            <button
              onClick={() => setOpenChangeProfile(true)}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              <Edit size={18} /> Chỉnh sửa thông tin
            </button>
            <button
              onClick={() => setOpenChangePassword(true)}
              className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-200 py-2.5 rounded-lg hover:bg-gray-50 transition font-medium"
            >
              <Key size={18} /> Đổi mật khẩu
            </button>
          </div>
        </div>

        {/* Cột phải: Thông tin chi tiết */}
        <div className="w-full md:w-2/3 p-8">
          <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-3">
            Thông tin tài khoản
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
                <Calendar size={16} /> Ngày tạo tài khoản
              </span>
              <p className="font-semibold text-gray-800 ml-6">
                {user?.ngayTao}
              </p>
            </div>
          </div>

          <h3 className="text-lg font-bold text-gray-800 mt-8 mb-6 border-b pb-3">
            Hồ sơ học thuật
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 flex items-center gap-4">
              <div className="bg-indigo-100 p-3 rounded-full text-indigo-600">
                <GraduationCap size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Điểm GPA</p>
                <p className="text-lg font-bold text-gray-800">
                  {user?.gpa || "Chưa cập nhật"}
                </p>
              </div>
            </div>

            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex items-center gap-4">
              <div className="bg-emerald-100 p-3 rounded-full text-emerald-600">
                <Globe size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Quốc gia du học</p>
                <p className="text-lg font-bold text-gray-800 truncate max-w-[150px]">
                  {user?.quocGiaDuHoc || "Chưa cập nhật"}
                </p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-center gap-4 md:col-span-2">
              <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                <BookOpen size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Ngành học</p>
                <p className="text-lg font-bold text-gray-800">
                  {user?.nganhHoc || "Chưa cập nhật"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: ĐỔI MẬT KHẨU */}
      {openChangePassword && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-2xl relative p-6">
            <button
              onClick={() => setOpenChangePassword(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black transition"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold mb-5 flex items-center gap-2 text-gray-800">
              <Key size={20} className="text-blue-600" /> Đổi mật khẩu
            </h2>

            <form className="space-y-4" onSubmit={handleSubmitChangePassword}>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-600">
                  Mật khẩu hiện tại
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
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
                  value={form.new_password}
                  onChange={handleChange}
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
                  value={form.reenter_password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setOpenChangePassword(false)}
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
          </div>
        </div>
      )}

      {/* MODAL: CHỈNH SỬA THÔNG TIN */}
      {openChangeProfile && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-2xl relative p-6">
            <button
              onClick={() => setOpenChangeProfile(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black transition"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold mb-5 flex items-center gap-2 text-gray-800">
              <Edit size={20} className="text-blue-600" /> Cập nhật hồ sơ
            </h2>

            <form onSubmit={handleChangeProfile} className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-600">
                  Họ tên
                </label>
                <input
                  type="text"
                  name="hoTen"
                  value={userForm.hoTen || ""}
                  onChange={(e) =>
                    setUserForm({ ...userForm, hoTen: e.target.value })
                  }
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
                  value={userForm.email || ""}
                  onChange={(e) =>
                    setUserForm({ ...userForm, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-600">
                    GPA
                  </label>
                  <input
                    type="number"
                    name="gpa"
                    value={userForm.gpa ?? ""}
                    min="0"
                    max="5"
                    step="0.01"
                    onChange={(e) => {
                      let value = e.target.value;
                      if (value === "") {
                        setUserForm({ ...userForm, gpa: "" });
                        return;
                      }
                      let num = Number(value);
                      if (num < 0) num = 0;
                      if (num > 4) num = 4;
                      setUserForm({ ...userForm, gpa: num });
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-600">
                    Quốc gia du học
                  </label>
                  <input
                    type="text"
                    name="quocGiaDuHoc"
                    value={userForm.quocGiaDuHoc || ""}
                    onChange={(e) =>
                      setUserForm({ ...userForm, quocGiaDuHoc: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-600">
                  Ngành học
                </label>
                <input
                  type="text"
                  name="nganhHoc"
                  value={userForm.nganhHoc || ""}
                  onChange={(e) =>
                    setUserForm({ ...userForm, nganhHoc: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setOpenChangeProfile(false)}
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
          </div>
        </div>
      )}
    </div>
  );
}
