import { NavLink, Link } from "react-router-dom";
import { User, BellRing } from "lucide-react";

import { useState, useMemo } from "react";
import NotificationBell from "../notification/NotificationBell";
import NotificationDropdown from "../notification/NotificationDropdown";

import { useNotifications } from "../../hooks/useNotifications";

export default function MentorNavigationBar() {
  const { notifications, setNotifications } = useNotifications(
    localStorage.getItem("userID"),
  );

  const unreadCount = useMemo(() => {
    return notifications.length;
  }, [notifications]);

  const items = [
    {
      id: "course",
      label: "Khóa học",
      path: "/mentor/course",
    },
    {
      id: "roadmap",
      label: "Lộ trình",
      path: "/mentor/roadmap",
    },
    { id: "people", label: "Mọi người", path: "/mentor/people" },
    { id: "support", label: "Hỗ trợ", path: "/mentor/support" },
  ];

  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex items-center justify-between mb-2">
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
        <div className="relative">
          <NotificationBell
            count={unreadCount}
            onClick={() => setOpen(!open)}
          />

          {open && (
            <NotificationDropdown
              notifications={notifications}
              setNotifications={setNotifications}
            />
          )}
        </div>
        <Link to={"/mentor/profile"}>
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 hover:text-blue-500 transition">
            <User size={20} />
          </div>
        </Link>
      </div>
    </nav>
  );
}
