import { NavLink } from "react-router-dom";
import { Users } from "lucide-react";
import {
  LuUserRoundSearch,
  LuUserRoundX,
  LuUserRoundCheck,
} from "react-icons/lu";
import { FaAngleDoubleUp } from "react-icons/fa";

export default function CustomerManagementSideBar() {
  const baseStyle =
    "flex items-center gap-3 p-3 rounded-lg mt-2 cursor-pointer transition-all";

  return (
    <div className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-gray-200">
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <Users className="text-white w-5 h-5" />
        </div>
        <span className="font-bold text-xl text-gray-800">Khách hàng</span>
      </div>

      <nav className="px-4 pb-4 md:mt-6">
        <NavLink
          to="/admin/customer/up_role"
          className={({ isActive }) =>
            `${baseStyle} ${
              isActive
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`
          }
        >
          <FaAngleDoubleUp size={20} />
          <span className="font-medium">Cấp quyền</span>
        </NavLink>

        <NavLink
          to="/admin/customer/ban"
          className={({ isActive }) =>
            `${baseStyle} ${
              isActive
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`
          }
        >
          <LuUserRoundX size={20} />
          <span className="font-medium">Chặn khách hàng</span>
        </NavLink>

        <NavLink
          to="/admin/customer/unban"
          className={({ isActive }) =>
            `${baseStyle} ${
              isActive
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`
          }
        >
          <LuUserRoundCheck size={20} />
          <span className="font-medium">Bỏ chặn khách hàng</span>
        </NavLink>

        <NavLink
          to="/admin/customer/search"
          className={({ isActive }) =>
            `${baseStyle} ${
              isActive
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`
          }
        >
          <LuUserRoundSearch size={20} />
          <span className="font-medium">Tìm kiếm</span>
        </NavLink>
      </nav>
    </div>
  );
}
