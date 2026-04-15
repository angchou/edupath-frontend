import { BookOpenText, BookUser, NotebookPen } from "lucide-react";
import { FaBookReader } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function LearnerCourseSideBar() {
  const baseStyle =
    "flex items-center gap-3 p-3 rounded-lg mt-2 cursor-pointer transition-all";

  return (
    <div className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-gray-200">
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <FaBookReader className="text-white w-5 h-5" />
        </div>
        <span className="font-bold text-xl text-gray-800">Khóa học</span>
      </div>

      <nav className="px-4 pb-4 md:mt-6">
        <NavLink
          to="/learner/course/all"
          className={({ isActive }) =>
            `${baseStyle} ${
              isActive
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`
          }
        >
          <BookOpenText size={20} />
          <span className="font-medium">Khóa học</span>
        </NavLink>

        <NavLink
          to="/learner/course/my_course"
          className={({ isActive }) =>
            `${baseStyle} ${
              isActive
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`
          }
        >
          <BookUser size={20} />
          <span className="font-medium">Khóa học của tôi</span>
        </NavLink>

        <NavLink
          to="/learner/course/rating"
          className={({ isActive }) =>
            `${baseStyle} ${
              isActive
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`
          }
        >
          <NotebookPen size={20} />
          <span className="font-medium">Đánh giá khóa học</span>
        </NavLink>
      </nav>
    </div>
  );
}
