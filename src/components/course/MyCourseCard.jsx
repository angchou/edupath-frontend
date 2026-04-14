import { Users } from "lucide-react";

export default function CourseCard({ course }) {
  return (
    <div className="bg-white/20 border border-white/30 rounded-2xl shadow-lg overflow-hidden w-full hover:scale-[1.03] transition duration-300">
      <div className="h-44 w-full overflow-hidden">
        <img
          src={course.image}
          alt="course"
          className="w-full h-full object-cover hover:scale-110 transition"
        />
      </div>

      <div className="p-4 text-black">
        <h2 className="text-lg font-bold mb-1 line-clamp-1">{course.title}</h2>

        <p className="text-sm text-black/70 mb-2 line-clamp-1">
          Mentor: {course.mentor}
        </p>

        <div className="flex items-center text-sm text-black/80 mb-2">
          <Users className="w-4 h-4 mr-1" />
          {course.students} học viên
        </div>

        <p className="text-sm text-bblack/70 line-clamp-2 mb-4">
          {course.description}
        </p>

        <button className="w-full text-white py-2 rounded-lg font-semibold bg-blue-500/60 hover:bg-blue-500 transition">
          Xem chi tiết
        </button>
      </div>
    </div>
  );
}
