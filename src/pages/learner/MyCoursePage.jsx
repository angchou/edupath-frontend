import { useState } from "react";
import MyCourseCard from "../../components/course/MyCourseCard";
import SearchBar from "../../components/SearchBar";

const courses = [
  {
    name: " fjasdlkjflkasdfjlk asdjlkfjasdlk fjalksdfj klasdjf lkasdjflkasdjlkf jasdlkfj alksdfjlkasd jflkasdfj lkasdjf lkasdjfl kasdjflk asdjlkfjasdlk fjaslkdf",
    mentor:
      "A asjdlkf jaslkdfjlk asdfjlkasd jlfkasdjflk asdjklf ajsdlkfjlk asdjflkasdj flkasjdlkf jasdlkf kjl jflkasd jlkfasdjlfk asjdlkf jaslkdf jlkasdjflk asdjlkf ajslkdfj",
    students: 100,
    price: "500000",
    status: "Đang mở",
  },
  {
    name: "React",
    mentor: "A",
    students: 100,
    price: "500000",
    status: "Đang mở",
  },
  {
    name: "Java",
    mentor: "A",
    students: 100,
    price: "500000",
    status: "Đang mở",
  },
  {
    name: "Spring Boot",
    mentor: "B",
    students: 200,
    price: "800000",
    status: "Đang mở",
  },
];

export default function MyCoursePage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const coursesPerPage = 6;

  const filteredCourses = courses.filter((course) =>
    `${course.name} ${course.mentor}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const indexOfLast = currentPage * coursesPerPage;
  const indexOfFirst = indexOfLast - coursesPerPage;

  const currentCourses = filteredCourses.slice(indexOfFirst, indexOfLast);

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
          currentCourses.map((course, index) => (
            <MyCourseCard key={index} course={course} />
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
