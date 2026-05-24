import SearchBar from "../../../components/SearchBar";
import { useEffect, useState } from "react";
import { X, Eye, ShieldAlert } from "lucide-react";
import {
  MdBlock,
  MdOutlineCategory,
  MdOutlineAttachMoney,
} from "react-icons/md";
import { FaUserTie, FaRegCalendarAlt, FaUsers } from "react-icons/fa";

import {
  getLockedAndPublicCourses,
  markCourse,
} from "../../../services/courseService";

import { useToast } from "../../../contexts/ToastContext";
import { BsBookmarkFill } from "react-icons/bs";

export default function MarkCoursePage() {
  const { addToast } = useToast();

  const [courses, setCourses] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [openCourseDetailModal, setOpenCourseDetailModal] = useState(false);
  const [openMarkCourseModal, setOpenMarkCourseModal] = useState(false);
  const [confirmID, setConfirmID] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [markForm, setMarkForm] = useState({
    moTa: "",
    mucDanhDau: "0",
  });

  const fetchCourses = async () => {
    const data = await getLockedAndPublicCourses();
    setCourses(data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const getStatusLabel = (status) => {
    return status === 6 ? (
      <span className="text-green-600 bg-green-50 px-2 py-1 rounded text-xs border border-green-100">
        Công khai
      </span>
    ) : (
      <span className="text-orange-600 bg-orange-50 px-2 py-1 rounded text-xs border border-orange-100">
        Đã khóa đăng ký
      </span>
    );
  };

  const filteredCourses = courses.filter((c) => {
    const keyword = searchTerm.toLowerCase();
    return (
      c.khoaHocID.toLowerCase().includes(keyword) ||
      c.tenKH.toLowerCase().includes(keyword)
    );
  });

  const handleMarkCourse = async (e) => {
    e.preventDefault();
    const payload = {
      moTa: markForm.moTa,
      mucDanhDau: Number(markForm.mucDanhDau),
      khoaHocID: selectedCourse.khoaHocID,
    };
    const res = await markCourse(payload);
    if (!res) {
      addToast("Đã xảy ra lỗi, vui lòng thử lại!", "error");
      return;
    }
    fetchCourses();
    setMarkForm({ moTa: "", mucDanhDau: "0" });
    setSelectedCourse(null);
    setOpenMarkCourseModal(false);

    addToast("Đã thành công đánh dấu khóa học!", "success");
  };

  return (
    <div className="flex h-[90vh] flex-col font-sans">
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="md:h-16 bg-white border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-4 md:px-8 py-3">
          <p className="text-sm text-gray-500">
            Tổng cộng {courses.length} khóa học đang hiển thị
          </p>
          <SearchBar
            label="Tìm kiếm khóa học..."
            value={searchTerm}
            onChange={(value) => setSearchTerm(value)}
          />
        </header>

        <main className="flex-1 p-4 md:p-2">
          <div className="overflow-x-auto border border-gray-100">
            <table className="w-full min-w-[900px] text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-xs text-gray-500 uppercase">
                    Mã khóa học
                  </th>
                  <th className="px-6 py-4 text-xs text-gray-500 uppercase">
                    Tên khóa học
                  </th>
                  <th className="px-6 py-4 text-xs text-gray-500 uppercase">
                    Người hướng dẫn
                  </th>
                  <th className="px-6 py-4 text-xs text-gray-500 uppercase">
                    Loại
                  </th>
                  <th className="px-6 py-4 text-xs text-gray-500 uppercase">
                    Học phí
                  </th>
                  <th className="px-6 py-4 text-xs text-gray-500 uppercase text-center">
                    Trạng thái
                  </th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50 text-sm">
                {filteredCourses.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center py-10 text-gray-400 italic"
                    >
                      Không tìm thấy khóa học nào
                    </td>
                  </tr>
                ) : (
                  filteredCourses.map((course) => (
                    <tr
                      key={course.khoaHocID}
                      className="hover:bg-blue-50/30 transition-colors"
                    >
                      <td className="px-6 py-4 font-semibold">
                        {course.khoaHocID}
                      </td>
                      <td className="px-6 py-4 text-gray-900">
                        {course.tenKH}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {course.hoTen}
                      </td>
                      <td className="px-6 py-4">
                        {course.loaiKH === 0 ? "Du học" : "CV"}
                      </td>
                      <td className="px-6 py-4 text-gray-800">
                        {formatCurrency(course.mucPhi)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {getStatusLabel(course.tinhTrang)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col items-center gap-3">
                          <button
                            onClick={() => {
                              setSelectedCourse(course);
                              setOpenCourseDetailModal(true);
                            }}
                            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition"
                          >
                            <Eye size={16} /> Xem chi tiết
                          </button>
                          <button
                            onClick={() => {
                              setSelectedCourse(course);
                              setOpenMarkCourseModal(true);
                            }}
                            className="flex items-center gap-1 text-red-600 hover:text-red-800 transition"
                          >
                            <BsBookmarkFill size={16} /> Đánh dấu
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* MODAL XEM CHI TIẾT */}
      {openCourseDetailModal && selectedCourse && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative">
            <button
              onClick={() => setOpenCourseDetailModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl mb-6 text-gray-800">Chi tiết khóa học</h2>

            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <FaUserTie className="text-blue-500 mt-1" size={18} />{" "}
                <span>
                  Người sở hữu: {selectedCourse.hoTen} ({selectedCourse.userID})
                </span>
              </div>
              <div className="flex gap-3">
                <MdOutlineCategory className="text-blue-500 mt-1" size={18} />{" "}
                <span>
                  Phân loại: {selectedCourse.loaiKH === 0 ? "Du học" : "CV"}
                </span>
              </div>
              <div className="flex gap-3">
                <MdOutlineAttachMoney
                  className="text-green-600 mt-1"
                  size={18}
                />{" "}
                <span>Mức phí: {formatCurrency(selectedCourse.mucPhi)}</span>
              </div>
              <div className="flex gap-3">
                <FaUsers className="text-orange-500 mt-1" size={18} />{" "}
                <span>
                  Học viên: {selectedCourse.slhvHienTai} / {selectedCourse.slhv}{" "}
                  (Tối đa)
                </span>
              </div>
              <div className="flex gap-3 text-gray-600 italic px-2 py-2 bg-gray-50 rounded border-l-4 border-blue-200">
                <span>"{selectedCourse.moTa}"</span>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="flex gap-2 text-xs text-gray-500">
                  <FaRegCalendarAlt className="mt-1" /> Ngày tạo:{" "}
                  {selectedCourse.ngayTao}
                </div>
                <div className="flex gap-2 text-xs text-gray-500">
                  <FaRegCalendarAlt className="mt-1" /> Hạn dùng:{" "}
                  {selectedCourse.thoiHan}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL CHẶN KHÓA HỌC */}
      {openMarkCourseModal && selectedCourse && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 flex flex-col gap-5">
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                <ShieldAlert size={28} />
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                Đánh dấu khóa học
              </h2>
              <p className="text-sm text-gray-500 px-4">
                Gửi thông báo hoặc cảnh báo đến người hướng dẫn về tình trạng
                của khóa học này.
              </p>
            </div>

            {/* Hiển thị mã khóa học đang chọn để tránh nhầm lẫn */}
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
              <p className="text-xs text-gray-500 uppercase font-semibold">
                Khóa học đang chọn:
              </p>
              <p className="text-sm font-bold text-gray-800">
                {selectedCourse.tenKH} ({selectedCourse.khoaHocID})
              </p>
            </div>

            <form onSubmit={handleMarkCourse} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Mức độ đánh dấu
                </label>
                <select
                  required
                  value={markForm.mucDanhDau}
                  onChange={(e) =>
                    setMarkForm({ ...markForm, mucDanhDau: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 transition"
                >
                  <option value="0">Yêu cầu chỉnh sửa nội dung</option>
                  <option value="1">Cảnh báo chặn khóa học</option>
                  <option value="2">Cảnh báo xóa (Vi phạm nghiêm trọng)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Lý do / Mô tả chi tiết
                </label>
                <textarea
                  required
                  rows={3}
                  value={markForm.moTa}
                  onChange={(e) =>
                    setMarkForm({ ...markForm, moTa: e.target.value })
                  }
                  placeholder="Nhập lý do cụ thể để người hướng dẫn nắm rõ"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setOpenMarkCourseModal(false);
                    setMarkForm({ moTa: "", mucDanhDau: "0" }); // Reset form
                  }}
                  className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className={`flex-1 py-2 text-white rounded-lg transition font-medium bg-blue-600 hover:bg-blue-700`}
                >
                  Xác nhận đánh dấu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
