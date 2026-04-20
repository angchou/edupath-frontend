import { useState, useEffect } from "react";
import { getLearnerProfile } from "../../services/AccountService";

export default function LearnerProfilePage() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ ...user });

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

  return (
    <div className="flex justify-center mt-10 p-2">
      <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-center">Thông tin người dùng</h2>

        <div className="flex justify-center flex-col items-center gap-20">
          <img
            src="https://pbs.twimg.com/media/EbPnzPoXsAUD4N_.png"
            className="w-32 h-32 rounded-full border-4 border-blue-500"
          />
          <div className="w-full px-10 flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <span className="font-semibold">Mã người dùng:</span>
                <span>{user?.userID}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Tên người dùng:</span>
                <span>{user?.hoTen}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Email:</span>
                <span>{user?.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Vai trò:</span>
                <span>{user?.roles.map((role) => role).join(", ")}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Ngày tạo tài khoản:</span>
                <span>{user?.ngayTao}</span>
              </div>
            </div>
            <div className="border-t-1 pt-4 flex flex-col gap-4">
              <div className="flex justify-between">
                <span className="font-semibold">GPA:</span>
                <span>{user?.gpa}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Quốc gia du học:</span>
                <span>{user?.quocGiaDuHoc}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Ngành học:</span>
                <span>{user?.nganhHoc}</span>
              </div>
            </div>

            <div className="flex justify-center mt-4 gap-4">
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
                Chỉnh sửa thông tin
              </button>
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
                Đổi mật khẩu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
