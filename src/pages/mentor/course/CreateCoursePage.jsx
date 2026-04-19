import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import AddCourseCard from "../../../components/course/AddCourseCard";
import { getCreatedCourses } from "../../../services/courseService";

import SecureImage from "../../../components/SecureImage";

export default function CreateCoursePage() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCreatedCourses();
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
            TẠO KHÓA HỌC
          </h2>{" "}
        </header>

        <div className="p-6 max-h-[75vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <div
                key={course.khoaHocID}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
              >
                <div className="overflow-hidden">
                  <SecureImage
                    src={course.hinhAnh}
                    className="w-full h-48 object-cover transform transition duration-300 hover:scale-110"
                  />
                </div>

                <div className="flex flex-col justify-center p-6">
                  <h2 className="font-semibold text-lg">{course.tenKhoaHoc}</h2>
                  <div>
                    <p className="line-clamp-1">
                      <b>Mô tả: </b>
                      {course.moTa}
                    </p>
                  </div>
                  <div>
                    <p>
                      <b>Số lượng học viên: </b>
                      {course.soLuongHocVien}
                    </p>
                  </div>
                  <div>
                    <p>
                      <b>Giá bán: </b>
                      {course.giaBan} đồng
                    </p>
                  </div>
                  <div>
                    <p>
                      <b>Ngày tạo: </b>
                      {course.ngayTao}
                    </p>
                  </div>
                  <div>
                    <button
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white text-center p-2 rounded-xl mt-5 font-semibold"
                      onClick={() => navigate(`edit/${course.khoaHocID}`)}
                    >
                      Cập nhật khóa học
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <AddCourseCard
              onAdd={(course) => {
                const newItem = {
                  ...course,
                  khoaHocID: "KH" + Date.now(),
                  hoTen: "Châu Gia An",
                  nguoiHuongDanID: "U0003",
                  soLuongHocVien: 0,
                };

                // setCourses([newItem, ...courses]);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
