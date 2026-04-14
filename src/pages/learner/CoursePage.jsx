import { useState, useEffect } from "react";
import CourseCard from "../../components/course/CourseCard";
import SearchBar from "../../components/SearchBar";
import { getNormalCourses } from "../../services/courseService";

export default function CoursePage() {
  const [courses, setCourses] = useState([]); // <-- khai báo state trước useEffect
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  const coursesPerPage = 6;

  useEffect(() => {
    getNormalCourses()
      .then(setCourses)
      .finally(() => setLoading(false));
  }, []);

  const filteredCourses = courses.filter((course) =>
    `${course.courseName} ${course.mentorSummaryResponse?.mentorUserName}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const indexOfLast = currentPage * coursesPerPage;
  const indexOfFirst = indexOfLast - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirst, indexOfLast);

  if (loading) return <p className="text-center mt-6">Đang tải...</p>;
  // if (error) return <p className="text-center mt-6 text-red-500">{error}</p>;

  return (
    <div className="w-full flex flex-col items-center">
      <SearchBar
        label="Tìm kiếm khóa học..."
        value={search}
        onChange={(value) => {
          setSearch(value);
          setCurrentPage(1);
        }}
      />

      <div className="w-full max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentCourses.length > 0 ? (
          currentCourses.map((course) => (
            <CourseCard key={course.courseId} course={course} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            Không tìm thấy khóa học
          </p>
        )}
      </div>

      <div className="flex gap-4 items-center mb-6">
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition disabled:opacity-50"
        >
          ←
        </button>

        <span className="font-medium">
          Trang {totalPages === 0 ? 0 : currentPage} / {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition disabled:opacity-50"
        >
          →
        </button>
      </div>
    </div>
  );
}
