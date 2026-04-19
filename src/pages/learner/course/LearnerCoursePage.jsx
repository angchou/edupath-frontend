import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getNormalCourses } from "../../../services/courseService";

import SearchBar from "../../../components/SearchBar";

import SecureImage from "../../../components/SecureImage";

export default function LearnerCoursePage() {
  const [courses, setCourses] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNormalCourses();
        setCourses(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col bg-gray-50 font-sans">
      <div className="p-5 flex-1 flex flex-col overflow-hidden">
        <header className="md:h-20 bg-white border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-4 md:px-8 py-3">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            DANH SÁCH KHÓA HỌC
          </h2>
          <SearchBar label="Tìm kiếm khóa học" />
        </header>

        <div className="p-6 max-h-[75vh] overflow-y-auto">
          <div className="h-full flex flex-col grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <div
                key={course.khoaHocID}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden flex flex-col h-full"
              >
                <div className="overflow-hidden">
                  <SecureImage
                    src={course.hinhAnh}
                    className="w-full h-48 object-cover transform transition duration-300 hover:scale-110"
                  />
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <div className="flex-1">
                    <h2 className="font-semibold text-lg">{course.tenKH}</h2>
                    <p>
                      <b>Người hướng dẫn: </b>
                      {course.hoTen} - {course.nguoiHuongDanID}
                    </p>
                    <p className="line-clamp-2">
                      <b>Mô tả: </b>
                      {course.moTa}
                    </p>
                    <p>
                      <b>Số lượng học viên: </b>
                      {course.soLuongHocVien}
                    </p>
                    <p>
                      <b>Giá bán: </b>
                      {course.mucPhi} đồng
                    </p>
                  </div>

                  <div className="mt-auto">
                    <button
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white text-center p-2 rounded-xl mt-5 font-semibold"
                      onClick={() => navigate(`demo/${course.khoaHocID}`)}
                    >
                      Đăng ký khóa học
                    </button>
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
