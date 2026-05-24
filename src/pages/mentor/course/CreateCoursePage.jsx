import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import { Settings, Users, View } from "lucide-react";

import AddCourseCard from "../../../components/course/AddCourseCard";
import {
  getCreatedCourses,
  getCourseRatings,
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
  RequestLockCourse,
  ViewCourseMarks,
  ViewCourseRatings,
} from "../../../components/course/mentorCourseSetting";

export default function CreateCoursePage() {
  const DISABLE_STATUS = {
    changeCover: [0, 1, 3, 4],
    changeInfor: [0, 1, 3, 4],
    viewMark: [],
    viewRating: [],
    requestOpen: [0, 1, 3, 4, 6],
    lockCourse: [0, 1, 2, 3, 4, 5],
  };

  const isDisable = (action, status) => {
    return DISABLE_STATUS[action]?.includes(status);
  };

  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);

  const [openMenu, setOpenMenu] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [openChangeCourseCoverPhoto, setOpenChangeCourseCoverPhoto] =
    useState(false);
  const [openChangeCourseInfor, setOpenchangeCourseInfor] = useState(false);
  const [openRequestOpenCourse, setOpenRequestOpenCourse] = useState(false);
  const [openLockCourse, setOpenLockCourse] = useState(false);
  const [openViewCourseMarks, setOpenViewCourseMarks] = useState(false);
  const [openViewCourseRatings, setOpenViewCourseRatings] = useState(false);

  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });

  const buttonRefs = useRef({});
  const menuRef = useRef(null);

  const fetchData = async () => {
    try {
      const data = await getCreatedCourses();
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

  return (
    <div className="flex flex-col font-sans">
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-4 md:px-8 py-3">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            TẠO KHÓA HỌC
          </h2>
        </header>

        <div className="p-6 max-h-[75vh] overflow-y-auto">
          <div className="grid grid-cols-1 xl:grid-cols-4 3xl:grid-cols-5 gap-3">
            <AddCourseCard onReload={() => fetchData()} />
            {courses.map((course) => (
              <div
                key={course.khoaHocID}
                className="flex flex-col bg-white text-sm shadow hover:shadow-lg transition overflow-hidden"
              >
                <div className="overflow-hidden">
                  <SecureImage
                    src={course.hinhAnh}
                    className="w-full h-48 object-cover hover:scale-110 transition duration-450"
                  />
                </div>

                <div className="flex flex-col justify-center p-6">
                  <h2 className="font-bold text-lg mb-2 line-clamp-1">
                    {course.tenKH}
                  </h2>

                  <p className="line-clamp-2">
                    <b>Mô tả: </b>
                    {course.moTa}
                  </p>

                  <p>
                    <b>Loại khóa học: </b>
                    {course.loaiKH == 0 ? "Du học" : "CV"}
                  </p>

                  <p className="flex items-center gap-2">
                    <b>Thời hạn: </b>
                    {course.thoiHan} tháng
                  </p>

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

                  <div className="w-full mt-2">
                    <div
                      className={`inline-block rounded-xl px-3 py-1 ${getCourseStatusColor(course.tinhTrang)}`}
                    >
                      {getCourseStatus(course.tinhTrang)}
                    </div>
                  </div>
                  <div className="flex gap-3 mt-5">
                    <div className="group w-full">
                      <button
                        disabled={isDisable("changeInfor", course.tinhTrang)}
                        className={`
                          cursor-pointer w-full text-center p-2 font-semibold transition border-1 group-hover:text-white
                          ${isDisable("changeInfor", course.tinhTrang) ? "text-gray-400 group-hover:bg-gray-400" : "text-blue-500 group-hover:bg-blue-500"}
                          `}
                        onClick={() => navigate(`edit/${course.khoaHocID}`)}
                      >
                        Cập nhật khóa học
                      </button>
                    </div>

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
                            x = rect.left - menuWidth - 10;
                          }

                          if (y + menuHeight > window.innerHeight - 50) {
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

                {openMenu === course.khoaHocID && (
                  <div
                    className="absolute w-60 z-50"
                    style={{
                      position: "fixed",
                      top: menuPos.y,
                      left: menuPos.x + 10,
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
                        disabled={isDisable("changeCover", course.tinhTrang)}
                        className={`w-full px-3 py-2 group-hover:translate-x-2 transition text-left border-l-2 shadow-lg
                            ${
                              isDisable("changeCover", course.tinhTrang)
                                ? "bg-gray-100 border-red-500"
                                : "bg-white border-blue-500"
                            }
                          `}
                        onClick={() => setOpenChangeCourseCoverPhoto(true)}
                      >
                        Thay đổi ảnh bìa
                      </button>
                    </div>
                    <div className="group">
                      <button
                        disabled={isDisable("changeInfor", course.tinhTrang)}
                        className={`w-full px-3 py-2 group-hover:translate-x-2 transition text-left border-l-2 shadow-lg
                            ${
                              isDisable("changeInfor", course.tinhTrang)
                                ? "bg-gray-100 border-red-500"
                                : "bg-white border-blue-500"
                            }
                          `}
                        onClick={() => setOpenchangeCourseInfor(true)}
                      >
                        Thay đổi thông tin
                      </button>
                    </div>
                    <div className="group">
                      <button
                        disabled={isDisable("viewMark", course.tinhTrang)}
                        className={`w-full px-3 py-2 group-hover:translate-x-2 transition text-left border-l-2 shadow-lg
                          ${
                            isDisable("viewMark", course.tinhTrang)
                              ? "bg-gray-100 border-red-500"
                              : "bg-white border-blue-500"
                          }
                          `}
                        onClick={() => setOpenViewCourseMarks(true)}
                      >
                        Xem phiếu đánh dấu
                      </button>
                    </div>
                    <div className="group">
                      <button
                        disabled={isDisable("viewRating", course.tinhTrang)}
                        className={`w-full px-3 py-2 group-hover:translate-x-2 transition text-left border-l-2 shadow-lg
                            ${
                              isDisable("viewRating", course.tinhTrang)
                                ? "bg-gray-100 border-red-500"
                                : "bg-white border-blue-500"
                            }
                          `}
                        onClick={() => setOpenViewCourseRatings(true)}
                      >
                        Xem đánh giá
                      </button>
                    </div>
                    <div className="group">
                      <button
                        disabled={isDisable("requestOpen", course.tinhTrang)}
                        className={`w-full px-3 py-2 group-hover:translate-x-2 transition text-left border-l-2 shadow-lg
                            ${
                              isDisable("requestOpen", course.tinhTrang)
                                ? "bg-gray-100 border-red-500"
                                : "bg-white border-blue-500"
                            }
                          `}
                        onClick={() => setOpenRequestOpenCourse(true)}
                      >
                        Mở công khai khóa học
                      </button>
                    </div>
                    <div className="group">
                      <button
                        onClick={() => setOpenLockCourse(true)}
                        disabled={isDisable("lockCourse", course.tinhTrang)}
                        className={`text-red-600 w-full px-3 py-2 group-hover:translate-x-2 transition text-left border-l-2 shadow-lg
                            ${isDisable("lockCourse", course.tinhTrang) ? "bg-gray-100 border-red-500" : "bg-white border-blue-500"}
                          `}
                      >
                        Khóa đăng ký mới
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {openChangeCourseCoverPhoto && (
        <ChangeCourseCoverPhoto
          onClose={() => setOpenChangeCourseCoverPhoto(false)}
          onSave={async () => {
            setOpenChangeCourseCoverPhoto(false);
            fetchData();
          }}
          khoaHocID={selectedCourse?.khoaHocID}
        />
      )}

      {openChangeCourseInfor && (
        <ChangeCourseInformation
          onClose={() => setOpenchangeCourseInfor(false)}
          onSave={async () => {
            setOpenchangeCourseInfor(false);
            fetchData();
          }}
          khoaHoc={selectedCourse}
        />
      )}

      {openRequestOpenCourse && (
        <RequestOpenCourse
          onClose={() => setOpenRequestOpenCourse(false)}
          onSave={async () => {
            setOpenRequestOpenCourse(false);
            fetchData();
          }}
          khoaHoc={selectedCourse}
        />
      )}

      {openLockCourse && (
        <RequestLockCourse
          onClose={() => setOpenLockCourse(false)}
          onSave={async () => {
            setOpenLockCourse(false);
            fetchData();
          }}
          khoaHoc={selectedCourse}
        />
      )}

      {openViewCourseMarks && (
        <ViewCourseMarks
          onClose={() => setOpenViewCourseMarks(false)}
          khoaHoc={selectedCourse}
        />
      )}

      {openViewCourseRatings && (
        <ViewCourseRatings
          onClose={() => setOpenViewCourseRatings(false)}
          khoaHoc={selectedCourse}
        />
      )}
    </div>
  );
}
