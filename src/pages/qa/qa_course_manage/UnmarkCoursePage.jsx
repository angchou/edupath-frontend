import SearchBar from "../../../components/SearchBar";
import { useEffect, useState } from "react";
import {
  MdBlock,
  MdOutlineCategory,
  MdOutlineAttachMoney,
} from "react-icons/md";
import { FaUserTie, FaRegCalendarAlt, FaUsers } from "react-icons/fa";
import {
  FileText,
  User,
  AlertCircle,
  X,
  ShieldAlert,
  Info,
  Eye,
} from "lucide-react";
import {
  getLockedAndPublicCourses,
  getBannedCourses,
  getCourseMarks,
  deleteMarkCourse,
} from "../../../services/courseService";

import { useToast } from "../../../contexts/ToastContext";
import { BsBookmarkFill, BsBookmarkXFill } from "react-icons/bs";

export default function UnmarkCoursePage() {
  const { addToast } = useToast();

  const [courses, setCourses] = useState([]);
  const [markList, setMarkList] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [openCourseDetailModal, setOpenCourseDetailModal] = useState(false);
  const [openUnmarkCourseModal, setOpenUnmarkCourseModal] = useState(false);
  const [confirmID, setConfirmID] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [markForm, setMarkForm] = useState({
    moTa: "",
    mucDanhDau: "0",
  });

  const fetchCourses = async () => {
    const lockedAndPublic = await getLockedAndPublicCourses();
    const banned = await getBannedCourses();
    setCourses([...lockedAndPublic, ...banned]);
  };
  const fetchCourseMarks = async (khoaHocID) => {
    const data = await getCourseMarks(khoaHocID);
    setMarkList(data);
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
    switch (status) {
      case 6:
        return (
          <span className="text-green-600 bg-green-50 px-2 py-1 rounded text-xs border border-green-100">
            Công khai
          </span>
        );

      case 5:
        return (
          <span className="text-orange-600 bg-orange-50 px-2 py-1 rounded text-xs border border-orange-100">
            Khóa đăng ký mới
          </span>
        );

      case 1:
        return (
          <span className="text-red-600 bg-red-50 px-2 py-1 rounded text-xs border border-red-100">
            Bị chặn
          </span>
        );

      default:
        return (
          <span className="text-gray-600 bg-gray-50 px-2 py-1 rounded text-xs border border-gray-100">
            Không xác định
          </span>
        );
    }
  };

  const filteredCourses = courses.filter((c) => {
    const keyword = searchTerm.toLowerCase();
    return (
      c.khoaHocID.toLowerCase().includes(keyword) ||
      c.tenKH.toLowerCase().includes(keyword)
    );
  });

  const handleDeleteCourseMark = async (phieu) => {
    const res = await deleteMarkCourse(phieu.phieuDanhDauID);
    if (!res) {
      addToast("Xóa phiếu không thành công!", "error");
      return;
    }
    fetchCourseMarks(selectedCourse.khoaHocID);
    addToast("Xóa phiếu thành công!", "success");
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
                            onClick={async () => {
                              setSelectedCourse(course);
                              setOpenUnmarkCourseModal(true);
                              fetchCourseMarks(course.khoaHocID);
                            }}
                            className="flex items-center gap-1 text-red-600 hover:text-red-800 transition"
                          >
                            <BsBookmarkXFill size={16} /> Xóa đánh dấu
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

      {openUnmarkCourseModal && selectedCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full h-full rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            {/* HEADER */}
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                  <FileText size={24} />
                </div>
                <div>
                  <h2 className="font-bold text-gray-800">
                    Lịch sử đánh dấu khóa học
                  </h2>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                    {selectedCourse.tenKH} — Mã: {selectedCourse.khoaHocID}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpenUnmarkCourseModal(false)}
                className="p-2 hover:bg-gray-200 rounded-full transition text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white">
              {markList && markList.length > 0 ? (
                markList.map((phieu, index) => (
                  <div
                    key={phieu.phieuDanhDauID}
                    className={`
                      group border border-gray-100 px-5 py-2 hover:shadow-md transition-all duration-300 bg-white relative overflow-hidden
                      ${phieu.mucDanhDau === 0 ? "hover:border-blue-200" : phieu.mucDanhDau === 1 ? "hover:border-yellow-200" : "hover:border-red-200"}
                    `}
                  >
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                        phieu.mucDanhDau === 0
                          ? "bg-blue-400"
                          : phieu.mucDanhDau === 1
                            ? "bg-amber-400"
                            : "bg-red-500"
                      }`}
                    />

                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          #{phieu.phieuDanhDauID}
                        </span>
                        <span
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                            phieu.mucDanhDau === 0
                              ? "bg-blue-50 text-blue-600"
                              : phieu.mucDanhDau === 1
                                ? "bg-amber-50 text-amber-600"
                                : "bg-red-50 text-red-600"
                          }`}
                        >
                          {phieu.mucDanhDau === 0 && <Info size={14} />}
                          {phieu.mucDanhDau === 1 && <AlertCircle size={14} />}
                          {phieu.mucDanhDau === 2 && <ShieldAlert size={14} />}

                          {phieu.mucDanhDau === 0
                            ? "Yêu cầu chỉnh sửa"
                            : phieu.mucDanhDau === 1
                              ? "Cảnh báo chặn"
                              : "Cảnh báo xóa"}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-gray-700">
                        <User size={14} />
                        <span className="text-xs font-medium">
                          NV: {phieu.nhanVienID}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-700 leading-relaxed bg-gray-50/50 p-2 rounded-lg">
                        "{phieu.moTa}"
                      </div>
                      <div>
                        <button
                          onClick={() => handleDeleteCourseMark(phieu)}
                          className="text-sm py-1 px-3 bg-red-50 hover:bg-red-100 transition rounded-lg text-red-600 flex gap-1 items-center"
                        >
                          xóa
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-20 flex flex-col items-center justify-center text-gray-400">
                  <FileText
                    size={48}
                    strokeWidth={1}
                    className="mb-3 opacity-20"
                  />
                  <p>Khóa học này chưa có phiếu đánh dấu nào.</p>
                </div>
              )}
            </div>

            {/* FOOTER */}
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button
                onClick={() => setOpenUnmarkCourseModal(false)}
                className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition font-semibold text-sm shadow-sm"
              >
                Đóng danh sách
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
