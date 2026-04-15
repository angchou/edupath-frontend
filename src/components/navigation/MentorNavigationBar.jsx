import { NavLink, Link } from "react-router-dom";
import { User } from "lucide-react";

export default function MentorNavigationBar() {
  const items = [
    { id: "course", label: "Khóa học", path: "/mentor/course" },
    { id: "roadmap", label: "Lộ trình", path: "/mentor/roadmap" },
    { id: "people", label: "Mọi người", path: "/mentor/people" },
    { id: "chat", label: "Tin nhắn", path: "/mentor/chat" },
    { id: "support", label: "Hỗ trợ", path: "/mentor/support" },
  ];

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex items-center justify-between mb-10">
      <div className="flex items-center gap-8">
        <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center"></div>
      </div>

      <div className="flex gap-6 text-gray-700 font-medium">
        {items.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `font-bold border-b-2 text-lg transition-all ${
                isActive
                  ? "border-blue-500 text-blue-500"
                  : "border-transparent hover:border-blue-400"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300 transition">
          <Link to={"/learner/profile"}>
            <User size={20} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
