import { Users } from "lucide-react";
import {
  LuUserRoundPen,
  LuUserRoundSearch,
  LuUserRoundPlus,
  LuUserRoundMinus,
} from "react-icons/lu";
import { NavLink } from "react-router-dom";

export default function EmployeeManagementSideBar() {
  const baseStyle =
    "flex items-center gap-3 p-3 rounded-lg mt-2 cursor-pointer transition-all";

  return (
    <div className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-gray-200">
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <Users className="text-white w-5 h-5" />
        </div>
        <span className="font-bold text-xl text-gray-800">Nhân viên</span>
      </div>

      <nav className="px-4 pb-4 md:mt-6">
        <NavLink
          to="/admin/employee/add"
          className={({ isActive }) =>
            `${baseStyle} ${
              isActive
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`
          }
        >
          <LuUserRoundPlus size={20} />
          <span className="font-medium">Thêm nhân viên</span>
        </NavLink>

        <NavLink
          to="/admin/employee/del"
          className={({ isActive }) =>
            `${baseStyle} ${
              isActive
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`
          }
        >
          <LuUserRoundMinus size={20} />
          <span className="font-medium">Xóa nhân viên</span>
        </NavLink>

        <NavLink
          to="/admin/employee/search"
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

        <NavLink
          to="/admin/employee/edit"
          className={({ isActive }) =>
            `${baseStyle} ${
              isActive
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`
          }
        >
          <LuUserRoundPen size={20} />
          <span className="font-medium">Cập nhật</span>
        </NavLink>
      </nav>
    </div>
  );
}
