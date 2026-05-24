import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import SearchBar from "../../../components/SearchBar";
import CourseCard from "../../../components/course/CourseCard";
import { getMyActiveCourses } from "../../../services/courseService";

export default function MyCoursePage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMyActiveCourses();
        setCourses(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="flex flex-col font-sans">
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-4 md:px-8 py-3">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            DANH SÁCH KHÓA HỌC CỦA TÔI
          </h2>
          <SearchBar label="Tìm kiếm khóa học" />
        </header>

        <div className="p-1 max-h-[90vh] overflow-y-auto">
          <div className="grid grid-cols-1 xl:grid-cols-4 3xl:grid-cols-5 gap-3">
            {courses.map((course) => (
              <CourseCard key={course.khoaHocID} course={course} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
