import { useState, useEffect } from "react";
import {
  getMyCourses,
  createRating,
  getRating,
} from "../../../services/courseService";

import SearchBar from "../../../components/SearchBar";

import { X, Users } from "lucide-react";
import { FaStar } from "react-icons/fa";
import { FaUserCircle, FaCode, FaTag } from "react-icons/fa";

import SecureImage from "../../../components/SecureImage";
import { useToast } from "../../../contexts/ToastContext";

import {
  getCourseStatus,
  getCourseStatusColor,
} from "../../../utils/statusConfig";

export default function RatingCoursePage() {
  const [courses, setCourses] = useState([]);
  const { addToast } = useToast();

  const fetchData = async () => {
    try {
      const data = await getMyCourses();
      setCourses(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const [openRating, setOpenRating] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [phieuDanhGia, setPhieuDanhGia] = useState(null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [desc, setDesc] = useState("");

  const handleOpen = async (course) => {
    setSelectedCourse(course);
    if (course.daDanhGia) {
      const res = await getRating(course.khoaHocID);
      setPhieuDanhGia(res);
      setOpenRating(true);
    } else {
      setOpenModal(true);
    }
  };

  const buildPayload = () => {
    return {
      khoaHocID: selectedCourse?.khoaHocID,
      diemDanhGia: rating,
      chiTiet: desc,
    };
  };
  const handleClose = () => {
    setOpenRating(false);
    setOpenModal(false);
    setSelectedCourse(null);
    setDesc("");
    setRating(0);
    setHover(0);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = buildPayload();
    if (payload.diemDanhGia == 0) {
      addToast("Vui lòng chọn số sao đánh giá", "");
      return;
    }
    const res = await createRating(payload);
    if (!res) {
      addToast("Tạo đánh giá thất bại, vui lòng thử lại", "error");
      return;
    }
    await fetchData();
    addToast(
      "Tạo đánh giá thành công, đánh giá của bạn sẽ được hiển thị với những người khác",
      "success",
    );
    handleClose();
  };

  return (
    <div className="flex flex-col font-sans">
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-4 md:px-8 py-3">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            ĐÁNH GIÁ KHÓA HỌC
          </h2>
          <SearchBar label="Tìm kiếm khóa học" />
        </header>

        <div className="p-1 max-h-[90vh] overflow-y-auto">
          <div className="grid grid-cols-1 xl:grid-cols-4 3xl:grid-cols-5 gap-3">
            {courses.map((course, index) => (
              <div
                key={`${course.khoaHocID}_${index}`}
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

                  <p>
                    <b>Ngày tạo: </b>
                    {course.ngayTao}
                  </p>
                  <div className="w-full mt-2 flex gap-2">
                    <div
                      className={`inline-block rounded-xl px-3 py-1 ${getCourseStatusColor(course.tinhTrang)}`}
                    >
                      {getCourseStatus(course.tinhTrang)}
                    </div>
                    <div
                      className={`inline-block rounded-xl px-3 py-1 ${course.thoiHan >= 0 ? getCourseStatusColor(6) : getCourseStatusColor(1)}`}
                    >
                      {course.thoiHan >= 0 ? "Còn hạn" : "Hết hạn"}
                    </div>
                  </div>
                  <div className="flex gap-3 mt-5">
                    <div className="group w-full">
                      <button
                        disabled={!course.duocDanhGia}
                        onClick={() => handleOpen(course)}
                        className={`
                          cursor-pointer w-full text-center p-2 font-semibold transition border-1
                          ${!course.duocDanhGia ? "" : "group-hover:text-white text-blue-500 group-hover:bg-blue-500"}
                          `}
                      >
                        {!course.duocDanhGia
                          ? "Đánh giá khóa học sau 5 ngày"
                          : course.daDanhGia
                            ? "Đã đánh giá khóa học"
                            : "Đánh giá khóa học"}
                      </button>
                    </div>
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
              onClick={handleClose}
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
                {selectedCourse?.tenKH}
              </div>
              <div className="flex gap-3 flex items-center">
                <FaCode size={20} className="text-red-500" />
                <span className="font-bold">Mã khóa học:</span>
                {selectedCourse?.khoaHocID}
              </div>
              <div className="flex gap-3 flex items-center">
                <FaCode size={20} className="text-green-500" />
                <span className="font-bold">Người hướng dẫn:</span>
                {selectedCourse?.userID}
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
                      : "text-gray-200"
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

            <form action="" onSubmit={handleSubmit} className="mt-2">
              <textarea
                rows={4}
                maxLength={300}
                placeholder="Mô tả đánh giá"
                onChange={(e) => setDesc(e.target.value)}
                className="w-full p-2 bg-gray-50 rounded-sm outline-none resize-none"
                required
              />

              <button
                name="submit"
                className="w-full mt-2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Gửi đánh giá
              </button>
            </form>
          </div>
        </div>
      )}
      {openRating && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>
            <div className="flex gap-2 justify-center mb-4 mt-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={30}
                  className={`${phieuDanhGia.diemDanhGia >= star ? "text-yellow-500" : "text-gray-200"}`}
                />
              ))}
            </div>
            <div>
              <div>
                <p>
                  <b>Mã phiếu đánh giá: </b>
                  {phieuDanhGia.phieuDanhGiaID}
                </p>
              </div>
              <div>
                <p>
                  <b>Chi tiết: </b>
                  {phieuDanhGia.chiTiet}
                </p>
              </div>{" "}
              <div>
                <p>
                  <b>Ngày tạo phiếu: </b>
                  {phieuDanhGia.ngayTao}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
