import SearchBar from "../../../components/SearchBar";
import { useEffect, useState } from "react";
import { X, Eye, ShieldCheck } from "lucide-react";
import {
  MdCheckCircle,
  MdOutlineCategory,
  MdOutlineAttachMoney,
} from "react-icons/md";
import { FaUserTie, FaRegCalendarAlt, FaUsers } from "react-icons/fa";
import { useToast } from "../../../contexts/ToastContext";

import { getBannedCourses, unbanCourse } from "../../../services/courseService";

export default function UnbanCoursePage() {
  const { addToast } = useToast();

  const [courses, setCourses] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [openCourseDetailModal, setOpenCourseDetailModal] = useState(false);
  const [openUnbanModal, setOpenUnbanModal] = useState(false);
  const [confirmID, setConfirmID] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCourses = async () => {
    const data = await getBannedCourses();
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
    return (
      <span className="text-red-600 bg-red-50 px-2 py-1 rounded text-xs border border-red-100">
        Đang bị chặn
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

  const handleUnbanCourse = async (e) => {
    e.preventDefault();
    if (confirmID !== selectedCourse.khoaHocID) {
      addToast("Mã khóa học không chính xác!", "error");
      return;
    }

    const res = await unbanCourse(selectedCourse.khoaHocID);
    if (!res) {
      addToast("Đã xảy ra lỗi!", "error");
      return;
    }
    fetchCourses();
    setOpenUnbanModal(false);
    setConfirmID("");
    setSelectedCourse(null);
    addToast("Đã bỏ chặn khóa học thành công!", "success");
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
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Mã khóa học
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Tên khóa học
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Người hướng dẫn
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Loại
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Học phí
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Trạng thái
                  </th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50 text-sm">
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => (
                    <tr
                      key={course.khoaHocID}
                      className="hover:bg-green-50/30 transition-colors"
                    >
                      <td className="px-6 py-4 font-semibold text-gray-800">
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
                      <td className="px-6 py-4">
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
                              setOpenUnbanModal(true);
                            }}
                            className="flex items-center gap-1 text-green-600 hover:text-green-800 transition"
                          >
                            <MdCheckCircle size={16} /> Bỏ chặn khóa học
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center py-10 text-gray-400 italic"
                    >
                      Không tìm thấy khóa học nào bị chặn
                    </td>
                  </tr>
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
                <FaUserTie className="text-blue-500 mt-1" size={18} />
                <span>
                  Người sở hữu: {selectedCourse.hoTen} ({selectedCourse.userID})
                </span>
              </div>
              <div className="flex gap-3">
                <MdOutlineCategory className="text-blue-500 mt-1" size={18} />
                <span>
                  Phân loại: {selectedCourse.loaiKH === 0 ? "Du học" : "CV"}
                </span>
              </div>
              <div className="flex gap-3">
                <MdOutlineAttachMoney
                  className="text-green-600 mt-1"
                  size={18}
                />
                <span>Mức phí: {formatCurrency(selectedCourse.mucPhi)}</span>
              </div>
              <div className="flex gap-3">
                <FaUsers className="text-orange-500 mt-1" size={18} />
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
                  <FaRegCalendarAlt /> Ngày tạo: {selectedCourse.ngayTao}
                </div>
                <div className="flex gap-2 text-xs text-gray-500">
                  <FaRegCalendarAlt /> Hạn dùng: {selectedCourse.thoiHan}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL BỎ CHẶN KHÓA HỌC */}
      {openUnbanModal && selectedCourse && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 flex flex-col gap-5">
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <ShieldCheck size={28} />
              </div>
              <h2 className="text-xl text-green-600">Xác nhận bỏ chặn</h2>
              <p className="text-sm text-gray-500 px-4">
                Hành động này sẽ khôi phục quyền truy cập và đăng ký cho khóa
                học này. Vui lòng nhập lại mã khóa học để xác nhận.
              </p>
            </div>

            <form onSubmit={handleUnbanCourse} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-500 uppercase tracking-wider">
                  Nhập mã:{" "}
                  <span className="font-bold text-gray-800">
                    {selectedCourse.khoaHocID}
                  </span>
                </label>
                <input
                  type="text"
                  autoFocus
                  required
                  value={confirmID}
                  onChange={(e) => setConfirmID(e.target.value)}
                  placeholder="Nhập chính xác mã khóa học"
                  className="w-full px-4 py-2 border-b-2 border-green-200 outline-none focus:border-green-500 focus:ring-green-500 bg-green-50/30 transition"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setOpenUnbanModal(false);
                    setConfirmID("");
                  }}
                  className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 text-white rounded-lg bg-[#3abd5d] hover:bg-[#30ab51] transition"
                >
                  Xác nhận bỏ chặn
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
