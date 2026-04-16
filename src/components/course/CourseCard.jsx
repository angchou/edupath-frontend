import { useNavigate } from "react-router-dom";

export default function CourseCard({ course }) {
  const navigate = useNavigate();

  return (
    <div
      key={course.khoaHocID}
      className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
    >
      <div className="overflow-hidden">
        <img
          src={course.hinhAnh}
          className="w-full h-48 object-cover transform transition duration-300 hover:scale-110"
        />
      </div>

      <div className="flex flex-col justify-center p-6">
        <h2 className="font-semibold text-lg">{course.tenKhoaHoc}</h2>
        <div>
          <p>
            <b>Người hướng dẫn: </b>
            {course.hoTen} - {course.nguoiHuongDanID}
          </p>
        </div>
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
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white text-center p-2 rounded-xl mt-5 font-semibold"
            onClick={() => navigate(`${course.khoaHocID}`)}
          >
            Xem khóa học
          </button>
        </div>
      </div>
    </div>
  );
}
