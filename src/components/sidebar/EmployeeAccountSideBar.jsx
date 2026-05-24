import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { RiProfileFill } from "react-icons/ri";
import { MdAccountCircle } from "react-icons/md";
import { IoLogOutOutline, IoHelpCircleOutline } from "react-icons/io5";

export default function EmployeeAccountSideBar() {
  const [isConfirming, setIsConfirming] = useState(false);
  const navigate = useNavigate();

  const baseStyle =
    "flex items-center gap-3 p-3 rounded-lg mt-2 cursor-pointer transition-all w-full text-left";

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/auth/login");
  };

  return (
    <div className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-gray-200">
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <MdAccountCircle className="text-white w-5 h-5" />
        </div>
        <span className="font-bold text-xl text-gray-800">Tài khoản</span>
      </div>

      <nav className="px-4 pb-4 md:mt-6">
        <NavLink
          to="detail"
          className={({ isActive }) =>
            `${baseStyle} ${
              isActive
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`
          }
        >
          <RiProfileFill size={20} />
          <span className="font-medium">Thông tin cá nhân</span>
        </NavLink>

        {!isConfirming ? (
          <button
            type="button"
            onClick={() => setIsConfirming(true)}
            className={`${baseStyle} text-gray-600 hover:bg-gray-50`}
          >
            <IoLogOutOutline size={20} />
            <span className="font-medium">Đăng xuất</span>
          </button>
        ) : (
          <div className="mt-2 p-2 bg-red-50 rounded-lg border border-red-100 flex flex-col gap-2 transition-all duration-200">
            <div className="text-xs text-red-600 font-medium px-1 flex items-center gap-1">
              <IoHelpCircleOutline size={16} />
              <span>Bạn chắc chắn muốn đăng xuất?</span>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleLogout}
                className="flex-1 py-1.5 px-3 bg-[#d4334e] text-white text-xs font-semibold rounded-md hover:bg-red-700 transition text-center"
              >
                Xác nhận
              </button>
              <button
                type="button"
                onClick={() => setIsConfirming(false)}
                className="flex-1 py-1.5 px-3 bg-white border border-gray-200 text-gray-600 text-xs font-medium rounded-md hover:bg-gray-100 transition text-center"
              >
                Hủy
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
