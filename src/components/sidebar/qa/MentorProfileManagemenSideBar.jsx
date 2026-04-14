import { Trash2, ClipboardCheck } from "lucide-react";
import { FaBookReader } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import {
  BsBookmarkCheckFill,
  BsBookmarkFill,
  BsBookmarkXFill,
} from "react-icons/bs";
import { RiProfileFill } from "react-icons/ri";
import { TbDeviceIpadSearch } from "react-icons/tb";

export default function MentorProfileManagementSideBar() {
  const baseStyle =
    "flex items-center gap-3 p-3 rounded-lg mt-2 cursor-pointer transition-all";

  return (
    <div className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-gray-200">
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <RiProfileFill className="text-white w-5 h-5" />
        </div>
        <span className="font-bold text-xl text-gray-800">Hồ sơ đăng ký</span>
      </div>

      <nav className="px-4 pb-4 md:mt-6">
        <NavLink
          to="/qa/mentor_profile/approve"
          className={({ isActive }) =>
            `${baseStyle} ${
              isActive
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`
          }
        >
          <ClipboardCheck size={20} />
          <span className="font-medium">Duyệt hồ sơ</span>
        </NavLink>

        <NavLink
          to="/qa/mentor_profile/search"
          className={({ isActive }) =>
            `${baseStyle} ${
              isActive
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`
          }
        >
          <TbDeviceIpadSearch size={20} />
          <span className="font-medium">Tra cứu hồ sơ</span>
        </NavLink>

        <NavLink
          to="/qa/mentor_profile/del"
          className={({ isActive }) =>
            `${baseStyle} ${
              isActive
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`
          }
        >
          <Trash2 size={20} />
          <span className="font-medium">Xóa hồ sơ</span>
        </NavLink>
      </nav>
    </div>
  );
}
