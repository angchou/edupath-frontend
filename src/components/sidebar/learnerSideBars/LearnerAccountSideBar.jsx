import { NavLink } from "react-router-dom";
import { BookOpenText, BookUser, NotebookPen } from "lucide-react";
import { FaBookReader } from "react-icons/fa";

import { MdAccountCircle } from "react-icons/md";
import { RiProfileFill } from "react-icons/ri";
import { GrTransaction } from "react-icons/gr";
import { IoLogOutOutline } from "react-icons/io5";

export default function LearnerAccountSideBar() {
  const baseStyle =
    "flex items-center gap-3 p-3 rounded-lg mt-2 cursor-pointer transition-all";

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
          to="/learner/profile/detail"
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

        <NavLink
          to="/learner/profile/transaction"
          className={({ isActive }) =>
            `${baseStyle} ${
              isActive
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`
          }
        >
          <GrTransaction size={20} />
          <span className="font-medium">Giao dịch</span>
        </NavLink>

        <NavLink
          to="/auth/login"
          className={({ isActive }) =>
            `${baseStyle} ${
              isActive
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`
          }
        >
          <IoLogOutOutline size={20} />
          <span className="font-medium">Đăng xuất</span>
        </NavLink>
      </nav>
    </div>
  );
}
