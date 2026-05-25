import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import { Settings, Users } from "lucide-react";

import AddCourseCard from "../../../components/course/AddCourseCard";
import {
  getMyCourses,
  getNormalCourses,
} from "../../../services/courseService";
import SecureImage from "../../../components/SecureImage";
import {
  getCourseStatus,
  getCourseStatusColor,
} from "../../../utils/statusConfig";
import {
  ChangeCourseCoverPhoto,
  ChangeCourseInformation,
  RequestOpenCourse,
} from "../../../components/course/mentorCourseSetting";

export default function LearnerCoursePage() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const fetchData = async () => {
    try {
      const allCourses = await getNormalCourses();

      const finalCourses = allCourses
        .filter((c) => c.userID !== localStorage.getItem("userID"))
        .map((c) => ({
          ...c,
        }));

      setCourses(finalCourses);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col font-sans">
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-4 md:px-8 py-3">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            DANH SÁCH KHÓA HỌC
          </h2>
        </header>

        <div className="p-2 max-h-[90vh] overflow-y-auto">
          <div className="grid grid-cols-1 xl:grid-cols-4 3xl:grid-cols-5 gap-3">
            {courses.map((course) => (
              <div
                key={course.khoaHocID}
                className="flex flex-col h-full bg-white text-sm shadow hover:shadow-lg transition overflow-hidden"
              >
                <div className="overflow-hidden shrink-0">
                  <SecureImage
                    src={course.hinhAnh}
                    className="w-full h-48 object-cover hover:scale-110 transition duration-450"
                  />
                </div>

                <div className="flex flex-col flex-1 p-6">
                  <h2 className="font-bold text-lg mb-2">{course.tenKH}</h2>

                  <p className="line-clamp-2">
                    <b>Mô tả: </b>
                    {course.moTa}
                  </p>

                  <div className="flex justify-between">
                    <p>
                      <b>Loại khóa học: </b>
                      {course.loaiKH == 0 ? "Du học" : "CV"}
                    </p>
                    <p className="flex items-center gap-2">
                      <b>Thời hạn: </b>
                      {course.thoiHan} tháng
                    </p>
                  </div>

                  <p>
                    <b>Giá bán: </b>
                    {Number(course.mucPhi).toLocaleString("vi-VN")} đồng
                  </p>

                  <p>
                    <b>Ngày tạo: </b>
                    {course.ngayTao}
                  </p>
                  <p>
                    <b>Số lượng học viên: </b>
                    {course.slhvHienTai} / {course.slhv} học viên
                  </p>

                  <div className="flex gap-3 mt-auto pt-5">
                    <div className="group w-full">
                      <button
                        className="cursor-pointer w-full text-center p-2 font-semibold transition border-1 group-hover:text-white text-blue-500 group-hover:bg-blue-500"
                        onClick={() => {
                          course.daSoHuu
                            ? navigate(`../my_course/${course.khoaHocID}`)
                            : navigate(`demo/${course.khoaHocID}`);
                        }}
                      >
                        {course.daSoHuu
                          ? "Chi tiết khóa học"
                          : "Xem thử khóa học"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
