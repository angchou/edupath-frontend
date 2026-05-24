import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import { Settings, Users, X } from "lucide-react";

import AddCourseCard from "../../../components/course/AddCourseCard";
import {
  publicCourse,
  rejectCourse,
  getWaitingPublicCourses,
} from "../../../services/courseService";
import SecureImage from "../../../components/SecureImage";
import {
  getCourseStatus,
  getCourseStatusColor,
} from "../../../utils/statusConfig";

import { useToast } from "../../../contexts/ToastContext";

export default function OpenCoursePage() {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [courses, setCourses] = useState([]);

  const [openMenu, setOpenMenu] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseCode, setCourseCode] = useState(null);

  const [openPublicModal, setOpenPublicModal] = useState(false);
  const [openRejectModal, setOpenRejectModal] = useState(false);

  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });

  const buttonRefs = useRef({});
  const menuRef = useRef(null);

  const fetchData = async () => {
    try {
      const data = await getWaitingPublicCourses();
      setCourses(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    const handleClose = () => setOpenMenu(null);
    window.addEventListener("click", handleClose);
    return () => window.removeEventListener("click", handleClose);
  }, []);

  const handlePublicCourse = async () => {
    setOpenPublicModal(false);
    const res = await publicCourse(selectedCourse?.khoaHocID);
    await fetchData();
    if (!res) {
      addToast("Có vẻ có một vài lỗi đã xảy ra, vui lòng thử lại", "error");
      return;
    }
    addToast("Thành công mở công khai khóa học!", "success");
  };

  const handleReject = async () => {
    setOpenRejectModal(false);
    const res = await rejectCourse(selectedCourse?.khoaHocID);
    await fetchData();
    if (!res) {
      addToast("Có vẻ có một vài lỗi đã xảy ra, vui lòng thử lại", "error");
      return;
    }
    addToast(
      "Thành công từ chối khóa học, khóa học sẽ được chuyển về trạng thái không công khai",
      "success",
    );
  };

  return (
    <div className="flex v-[90vh] flex-col font-sans">
      <div className="p-5 flex-1 flex flex-col overflow-hidden">
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          <div className="grid grid-cols-1 xl:grid-cols-4 3xl:grid-cols-5 gap-3">
            {courses.map((course) => (
              <div
                key={course.khoaHocID}
                className="flex text-sm flex-col bg-white shadow hover:shadow-lg transition overflow-hidden"
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

                  <div className="flex justify-between">
                    <p>
                      <b>Loại khóa học: </b>
                      {course.loaiKH == 1 ? "Du học" : "CV"}
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
                  <div className="w-full flex items-center justify-between mt-2">
                    <div
                      className={`inline-block rounded-xl px-3 py-1 ${getCourseStatusColor(course.tinhTrang)}`}
                    >
                      {getCourseStatus(course.tinhTrang)}
                    </div>
                    <div className="flex gap-3">
                      <div className="flex justify-center shrink-0">
                        <button
                          ref={(el) =>
                            (buttonRefs.current[course.khoaHocID] = el)
                          }
                          className={`text-gray-500 cursor-pointer group transition duration-300`}
                          onClick={(e) => {
                            e.stopPropagation();

                            const rect =
                              buttonRefs.current[
                                course.khoaHocID
                              ].getBoundingClientRect();

                            const menuWidth = 160;
                            const menuHeight = 170;

                            let x = rect.right;
                            let y = rect.bottom;

                            if (x + menuWidth > window.innerWidth) {
                              x = rect.left - menuWidth;
                            }

                            if (y + menuHeight > window.innerHeight) {
                              y = rect.top - menuHeight;
                            }

                            if (x < 0) x = 10;

                            if (y < 0) y = 10;

                            setMenuPos({ x, y });

                            setOpenMenu(
                              openMenu === course.khoaHocID
                                ? null
                                : course.khoaHocID,
                            );
                            setSelectedCourse(course);
                          }}
                        >
                          <Settings
                            className={`size-8 group-hover:rotate-180 group-hover:scale-110 group-hover:text-blue-500 transition duration-450
                            ${openMenu && course.khoaHocID == selectedCourse?.khoaHocID ? "delay-450 rotate-180 scale-110 text-blue-600" : "rotate-0"}
                            `}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {openMenu === course.khoaHocID && (
                  <div
                    className="absolute w-60 z-50"
                    style={{
                      position: "fixed",
                      top: menuPos.y,
                      left: menuPos.x,
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="group">
                      <p className="bg-blue-500 text-white w-full px-3 py-2 text-left border-blue-500 shadow-lg font-semibold">
                        Settings
                      </p>
                    </div>
                    <div className="group">
                      <button
                        onClick={() => setOpenPublicModal(true)}
                        disabled={course.tinhTrang != 4}
                        className={`w-full px-3 py-2 group-hover:translate-x-2 transition text-left border-l-2 shadow-lg
                            ${
                              course.tinhTrang != 4
                                ? "bg-gray-100 border-red-500"
                                : "bg-white border-blue-500"
                            }
                          `}
                      >
                        Mở công khai
                      </button>
                    </div>
                    <div className="group">
                      <button
                        onClick={() => setOpenRejectModal(true)}
                        disabled={course.tinhTrang != 4}
                        className={`w-full px-3 py-2 group-hover:translate-x-2 transition text-left border-l-2 shadow-lg
                            ${
                              course.tinhTrang != 4
                                ? "bg-gray-100 border-red-500"
                                : "bg-white border-blue-500"
                            }
                          `}
                      >
                        Từ chối mở công khai
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {openPublicModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md shadow-lg p-6 relative">
            <button
              onClick={() => setOpenPublicModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-5 mt-4">
              Xác nhận mở công khai khóa học
            </h2>
            <p className="text-gray-600 mb-4">
              Vui lòng kiểm tra và xác nhận thông tin khóa học trước khi thực
              hiện mở công khai. Khóa học sẽ được mở công khai cho toàn bộ học
              viên xem và đăng ký.
            </p>
            <div>
              <div className="flex gap-1 mt-8">
                <button
                  onClick={() => setOpenPublicModal(false)}
                  type="button"
                  className="w-full bg-blue-600 text-white py-2 hover:bg-blue-700 transition"
                >
                  Hủy
                </button>
                <button
                  onClick={handlePublicCourse}
                  type="submit"
                  className="w-full bg-[#cf345a] text-white py-2 hover:bg-[#c71c46] transition"
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {openRejectModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md shadow-lg p-6 relative">
            <button
              onClick={() => setOpenRejectModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-5 mt-4">
              Xác nhận từ chối mở công khai khóa học
            </h2>
            <p className="text-gray-600 mb-4">
              Vui lòng kiểm tra và xác nhận thông tin khóa học trước khi thực
              hiện từ chối. Sau khi được từ chối, khóa học sẽ được chuyển về
              trạng thái không công khai.
            </p>
            <div>
              <div className="flex gap-1 mt-8">
                <button
                  onClick={() => setOpenRejectModal(false)}
                  type="button"
                  className="w-full bg-blue-600 text-white py-2 hover:bg-blue-700 transition"
                >
                  Hủy
                </button>
                <button
                  onClick={handleReject}
                  type="submit"
                  className="w-full bg-[#cf345a] text-white py-2 hover:bg-[#c71c46] transition"
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
