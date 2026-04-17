import { BookOpenText, BookAlert, BookCheck, Library } from "lucide-react";
import { FaBookReader } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function MentorRoadmapSideBar() {
  const baseStyle =
    "flex items-center gap-3 p-3 rounded-lg mt-2 cursor-pointer transition-all";

  return (
    <div className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-gray-200">
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <FaBookReader className="text-white w-5 h-5" />
        </div>
        <span className="font-bold text-xl text-gray-800">Lộ trình</span>
      </div>

      <nav className="px-4 pb-4 md:mt-6">
        <NavLink
          to="/mentor/roadmap/create"
          className={({ isActive }) =>
            `${baseStyle} ${
              isActive
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`
          }
        >
          <BookOpenText size={20} />
          <span className="font-medium">Tạo lộ trình</span>
        </NavLink>

        <NavLink
          to="/mentor/roadmap/my_road"
          className={({ isActive }) =>
            `${baseStyle} ${
              isActive
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`
          }
        >
          <BookOpenText size={20} />
          <span className="font-medium">Lộ trình của tôi</span>
        </NavLink>

        <NavLink
          to="/mentor/roadmap/edit"
          className={({ isActive }) =>
            `${baseStyle} ${
              isActive
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`
          }
        >
          <BookAlert size={20} />
          <span className="font-medium">Chỉnh sửa lộ trình</span>
        </NavLink>

        <NavLink
          to="/mentor/roadmap/all"
          className={({ isActive }) =>
            `${baseStyle} ${
              isActive
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`
          }
        >
          <BookAlert size={20} />
          <span className="font-medium">Lộ trình</span>
        </NavLink>
      </nav>
    </div>
  );
}
