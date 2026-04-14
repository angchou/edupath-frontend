import { ContactRound, ScrollText, Notebook } from "lucide-react";
import { BiSolidReport } from "react-icons/bi";

import { NavLink } from "react-router-dom";

export default function FinancialReportSideBar() {
  const baseStyle =
    "flex items-center gap-3 p-3 rounded-lg mt-2 cursor-pointer transition-all";

  return (
    <div className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-gray-200">
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <BiSolidReport className="text-white w-5 h-5" />
        </div>
        <span className="font-bold text-xl text-gray-800">Báo cáo</span>
      </div>

      <nav className="px-4 pb-4 md:mt-6">
        <NavLink
          to="/finance/report/revenue"
          className={({ isActive }) =>
            `${baseStyle} ${
              isActive
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`
          }
        >
          <ScrollText size={20} />
          <span className="font-medium">Báo cáo doanh thu</span>
        </NavLink>

        <NavLink
          to="/finance/report/mentor_revenue"
          className={({ isActive }) =>
            `${baseStyle} ${
              isActive
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`
          }
        >
          <ContactRound size={20} className="shrink-0" />
          <span className="font-medium">Báo cáo doanh thu người hướng dẫn</span>
        </NavLink>

        <NavLink
          to="/finance/report/course"
          className={({ isActive }) =>
            `${baseStyle} ${
              isActive
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`
          }
        >
          <Notebook size={20} />
          <span className="font-medium">Thống kê số khóa học</span>
        </NavLink>
      </nav>
    </div>
  );
}
