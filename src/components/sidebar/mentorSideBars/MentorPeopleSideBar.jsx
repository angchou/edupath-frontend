import { UserRoundSearch, Users, MessageCircleMore } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function MentorPeopleSideBar() {
  const baseStyle =
    "flex items-center gap-3 p-3 rounded-lg mt-2 cursor-pointer transition-all";

  return (
    <div className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-gray-200">
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <Users className="text-white w-5 h-5" />
        </div>
        <span className="font-bold text-xl text-gray-800">Mọi người</span>
      </div>

      <nav className="px-4 pb-4 md:mt-6">
        <NavLink
          to="/mentor/people/all"
          className={({ isActive }) =>
            `${baseStyle} ${
              isActive
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`
          }
        >
          <UserRoundSearch size={20} />
          <span className="font-medium">Tra cứu người dùng</span>
        </NavLink>

        <NavLink
          to="/mentor/people/message"
          className={({ isActive }) =>
            `${baseStyle} ${
              isActive
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`
          }
        >
          <MessageCircleMore size={20} />
          <span className="font-medium">Tin nhắn</span>
        </NavLink>
      </nav>
    </div>
  );
}
