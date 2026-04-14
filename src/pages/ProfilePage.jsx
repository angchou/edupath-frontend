import { useState } from "react";

export default function ProfilePage() {
  const initialUser = {
    id: "U001",
    name: "Nguyen Van A",
    email: "a.nguyen@example.com",
    role: "Admin",
    createdAt: "2026-04-01",
    phone: "0123 456 789",
    avatar: "https://i.pravatar.cc/150?img=3",
  };

  const [user, setUser] = useState(initialUser);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ ...initialUser });

  const [changingPassword, setChangingPassword] = useState(false);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleSave = () => {
    setUser(formData);
    setEditing(false);
    // TODO: call API để lưu backend
  };

  const handleChangePassword = () => {
    if (!oldPass || !newPass || !confirmPass) return alert("Điền đủ thông tin");
    if (newPass !== confirmPass) return alert("Mật khẩu mới không khớp");
    alert("Đổi mật khẩu thành công (demo)");
    // TODO: call API để đổi mật khẩu backend
    setOldPass("");
    setNewPass("");
    setConfirmPass("");
    setChangingPassword(false);
  };

  return (
    <div className="flex justify-center mt-10 p-2">
      <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-center">Thông tin người dùng</h2>

        {/* Avatar */}
        <div className="flex justify-center">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-32 h-32 rounded-full border-4 border-blue-500"
          />
        </div>

        {/* Thông tin hoặc form edit */}
        {editing ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="font-semibold">Tên:</label>
              <input
                className="border p-2 rounded-md"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">Email:</label>
              <input
                className="border p-2 rounded-md"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">Số điện thoại:</label>
              <input
                className="border p-2 rounded-md"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => setEditing(false)}
                className="px-4 py-2 rounded-lg border"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
              >
                Lưu
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <span className="font-semibold">Mã người dùng:</span>
              <span>{user.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Tên:</span>
              <span>{user.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Email:</span>
              <span>{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Số điện thoại:</span>
              <span>{user.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Role:</span>
              <span>{user.role}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Ngày tạo tài khoản:</span>
              <span>{user.createdAt}</span>
            </div>

            <div className="flex justify-center mt-4 gap-4">
              <button
                onClick={() => setEditing(true)}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
              >
                Chỉnh sửa thông tin
              </button>
              <button
                onClick={() => setChangingPassword(true)}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
              >
                Đổi mật khẩu
              </button>
            </div>
          </div>
        )}

        {/* Form đổi mật khẩu modal inline */}
        {changingPassword && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-md flex flex-col gap-4">
              <h3 className="text-lg font-semibold">Đổi mật khẩu</h3>
              <input
                type="password"
                placeholder="Mật khẩu cũ"
                className="border p-2 rounded-md"
                value={oldPass}
                onChange={(e) => setOldPass(e.target.value)}
              />
              <input
                type="password"
                placeholder="Mật khẩu mới"
                className="border p-2 rounded-md"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
              />
              <input
                type="password"
                placeholder="Nhập lại mật khẩu mới"
                className="border p-2 rounded-md"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => setChangingPassword(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Hủy
                </button>
                <button
                  onClick={handleChangePassword}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Lưu
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
