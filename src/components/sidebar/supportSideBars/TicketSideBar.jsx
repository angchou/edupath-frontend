import { MdPayments } from "react-icons/md";
import { RiRefundFill } from "react-icons/ri";
import { History, Ticket } from "lucide-react";

import { NavLink } from "react-router-dom";

export default function TicketSideBar() {
  const baseStyle =
    "flex items-center gap-3 p-3 rounded-lg mt-2 cursor-pointer transition-all";

  return (
    <div className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-gray-200">
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <MdPayments className="text-white w-5 h-5" />
        </div>
        <span className="font-bold text-xl text-gray-800">Yêu cầu hỗ trợ</span>
      </div>

      <nav className="px-4 pb-4 md:mt-6">
        <NavLink
          to="/support/ticket/process"
          className={({ isActive }) =>
            `${baseStyle} ${
              isActive
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`
          }
        >
          <RiRefundFill size={20} />
          <span className="font-medium">Xử lý ticket</span>
        </NavLink>

        <NavLink
          to="/support/ticket/manage"
          className={({ isActive }) =>
            `${baseStyle} ${
              isActive
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`
          }
        >
          <History size={20} />
          <span className="font-medium">Quản lý ticket</span>
        </NavLink>
      </nav>
    </div>
  );
}
