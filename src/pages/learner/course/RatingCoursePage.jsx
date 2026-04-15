import { useState } from "react";

import SearchBar from "../../../components/SearchBar";

import { X } from "lucide-react";
import { FaStar } from "react-icons/fa";
import { FaUserCircle, FaCode, FaTag } from "react-icons/fa";

export default function RatingCoursePage() {
  const courses = [
    {
      khoaHocID: "KH0001",
      tenKhoaHoc: "Du học cùng six seven",
      moTa: "mô tả khóa học mô tả khóa học mô mô tả khóa học mô mô tả khóa học mô mô tả khóa học mô",
      nguoiHuongDanID: "U0003",
      hoTen: "Châu Gia An",
      ngayTao: "<ngày tạo khóa học>",
      soLuongHocVien: "100",
      giaBan: 1500000,
      hinhAnh:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3PoprumCX_HbXTfKRwKHg6M9iev5dapLsbg&s",
    },
    {
      khoaHocID: "KH0002",
      tenKhoaHoc: "Du học cùng six seven",
      moTa: "mô tả khóa học mô tả khóa học mô",
      nguoiHuongDanID: "U0003",
      hoTen: "Châu Gia An",
      ngayTao: "<ngày tạo khóa học>",
      soLuongHocVien: "100",
      giaBan: 1500000,
      hinhAnh:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3PoprumCX_HbXTfKRwKHg6M9iev5dapLsbg&s",
    },
    {
      khoaHocID: "KH0003",
      tenKhoaHoc: "Du học cùng six seven",
      moTa: "mô tả khóa học mô tả khóa học mô",
      nguoiHuongDanID: "U0003",
      hoTen: "Châu Gia An",
      ngayTao: "<ngày tạo khóa học>",
      soLuongHocVien: "100",
      giaBan: 1500000,
      hinhAnh:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3PoprumCX_HbXTfKRwKHg6M9iev5dapLsbg&s",
    },
    {
      khoaHocID: "KH0004",
      tenKhoaHoc: "Du học cùng six seven",
      moTa: "mô tả khóa học mô tả khóa học mô",
      nguoiHuongDanID: "U0003",
      hoTen: "Châu Gia An",
      ngayTao: "<ngày tạo khóa học>",
      soLuongHocVien: "100",
      giaBan: 1500000,
      hinhAnh:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3PoprumCX_HbXTfKRwKHg6M9iev5dapLsbg&s",
    },
    {
      khoaHocID: "KH0005",
      tenKhoaHoc: "Du học cùng six seven",
      moTa: "mô tả khóa học mô tả khóa học mô",
      nguoiHuongDanID: "U0003",
      hoTen: "Châu Gia An",
      ngayTao: "<ngày tạo khóa học>",
      soLuongHocVien: "100",
      giaBan: 1500000,
      hinhAnh:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3PoprumCX_HbXTfKRwKHg6M9iev5dapLsbg&s",
    },
  ];

  const [openModal, setOpenModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="flex flex-col bg-gray-50 font-sans">
      <div className="p-5 flex-1 flex flex-col overflow-hidden">
        <header className="md:h-20 bg-white border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-4 md:px-8 py-3">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            ĐÁNH GIÁ KHÓA HỌC
          </h2>
          <SearchBar label="Tìm kiếm khóa học" />
        </header>

        <div className="p-6 max-h-[750px] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
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
                      onClick={() => {
                        setOpenModal(true);
                        setSelectedCourse(course);
                      }}
                    >
                      Đánh giá khóa học
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">
            <button
              onClick={() => {
                setOpenModal(false);
                setRating(0);
              }}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold my-5">
              Phiếu đánh giá khóa học
            </h2>

            <div className="flex flex-col gap-1 mb-5">
              <div className="flex gap-3 flex items-center">
                <FaCode size={20} className="text-yellow-500" />
                <span className="font-bold">Tên khóa học:</span>
                {selectedCourse?.tenKhoaHoc}
              </div>
              <div className="flex gap-3 flex items-center">
                <FaCode size={20} className="text-red-500" />
                <span className="font-bold">Mã khóa học:</span>
                {selectedCourse?.khoaHocID}
              </div>
              <div className="flex gap-3 flex items-center">
                <FaCode size={20} className="text-green-500" />
                <span className="font-bold">Người hướng dẫn:</span>
                {selectedCourse?.nguoiHuongDanID}
              </div>
            </div>

            <div className="flex gap-2 justify-center mb-4 mt-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={30}
                  className={`cursor-pointer transition ${
                    (hover || rating) >= star
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                />
              ))}
            </div>

            <p className="text-center text-gray-600 mb-4">
              {rating === 0 ? "Chưa đánh giá" : `Bạn đã đánh giá ${rating} sao`}
            </p>

            <form action="" className="mt-2">
              <textarea
                rows={4}
                maxLength={300}
                placeholder="Mô tả đánh giá"
                className="w-full p-2 bg-gray-200 rounded-sm outline-none resize-none"
                required
              />

              <button
                name="submit"
                className="w-full mt-2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                onClick={() => {
                  console.log("Rating:", rating);
                }}
              >
                Gửi đánh giá
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
