import { useNavigate } from "react-router-dom";
import SecureImage from "../SecureImage";

import { Users } from "lucide-react";

import {
  getCourseStatus,
  getCourseStatusColor,
} from "../../utils/statusConfig";

export default function CourseCard({ course }) {
  const navigate = useNavigate();

  return (
    <div
      key={course.khoaHocID}
      className="flex flex-col bg-white shadow hover:shadow-lg transition overflow-hidden"
    >
      <div className="overflow-hidden">
        <SecureImage
          src={course.hinhAnh}
          className="w-full h-48 object-cover hover:scale-110 transition duration-450"
        />
      </div>

      <div className="flex flex-col justify-center p-6">
        <h2 className="font-bold text-lg mb-2">{course.tenKH}</h2>

        <p className="line-clamp-2">
          <b>Mô tả: </b>
          {course.moTa}
        </p>

        <div className="flex gap-5">
          <p>
            <b>Loại khóa học: </b>
            {course.loaiKH == 0 ? "Du học" : "CV"}
          </p>
          <p className="flex items-center gap-2">
            <Users></Users> {course.slhv}
          </p>
        </div>
        <div>
          <p>
            <b>Hiệu lực:</b> {course.thoiHan} ngày
          </p>
        </div>
        <div className="w-full mt-2">
          <div
            className={`inline-block rounded-xl px-3 py-1 ${getCourseStatusColor(course.tinhTrang)}`}
          >
            {getCourseStatus(course.tinhTrang)}
          </div>
        </div>
        <div className="flex gap-3 mt-5">
          <div className="group w-full">
            <button
              className="cursor-pointer w-full text-center p-2 font-semibold transition border-1 group-hover:text-white text-blue-500 group-hover:bg-blue-500"
              onClick={() => navigate(`${course.khoaHocID}`)}
            >
              Chi tiết khóa học
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
