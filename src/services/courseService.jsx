import { data, useParams } from "react-router-dom";
import { BASE_URL } from "../utils/apiConfig";
import { getImageUrl } from "../utils/image";

export const courseMapping = (data) => {
  return data.map((c) => ({
    khoaHocID: c.khoaHocID,
    tenKH: c.tenKH,
    moTa: c.moTa,
    userID: c.userID,
    hoTen: c.hoTen,
    ngayTao: c.ngayTao,
    slhv: Number(c.slhv),
    mucPhi: c.mucPhi,
    hinhAnh: getImageUrl(c.url),
    tinhTrang: c.tinhTrang,
    loaiKH: Number(c.loaiKH),
    thoiHan: Number(c.thoiHan),
    slhvHienTai: Number(c.slhvHienTai),
  }));
};

export const getCourse = async (khoaHocID) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/course/get/${khoaHocID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) return [];

  const data = await res.json();
  return {
    khoaHocID: data.khoaHocID,
    tenKH: data.tenKH,
    moTa: data.moTa,
    userID: data.userID,
    hoTen: data.hoTen,
    ngayTao: data.ngayTao,
    slhv: Number(data.slhv),
    mucPhi: data.mucPhi,
    hinhAnh: getImageUrl(data.url),
    tinhTrang: data.tinhTrang,
    loaiKH: Number(data.loaiKH),
    thoiHan: Number(data.thoiHan),
  };
};

export const getNormalCourses = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/course/get/normal`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed");

  const data = await res.json();
  return data.map((c) => ({
    khoaHocID: c.khoaHocID,
    tenKH: c.tenKH,
    moTa: c.moTa,
    userID: c.userID,
    hoTen: c.hoTen,
    ngayTao: c.ngayTao,
    slhv: Number(c.slhv),
    mucPhi: c.mucPhi,
    hinhAnh: getImageUrl(c.url),
    tinhTrang: c.tinhTrang,
    loaiKH: Number(c.loaiKH),
    thoiHan: Number(c.thoiHan),
    daSoHuu: c.daDanhGia,
    slhvHienTai: c.slhvHienTai,
  }));
};

export const getMyActiveCourses = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/course/get/active_course`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed");

  const data = await res.json();

  return courseMapping(data);
};

export const getMyCourses = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/course/get/my_course`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed");

  const data = await res.json();

  return data.map((c) => ({
    khoaHocID: c.khoaHocID,
    tenKH: c.tenKH,
    moTa: c.moTa,
    userID: c.userID,
    hoTen: c.hoTen,
    ngayTao: c.ngayTao,
    slhv: Number(c.slhv),
    mucPhi: c.mucPhi,
    hinhAnh: getImageUrl(c.url),
    tinhTrang: c.tinhTrang,
    loaiKH: Number(c.loaiKH),
    thoiHan: Number(c.thoiHan),
    daDanhGia: c.daDanhGia,
    duocDanhGia: c.duocDanhGia,
  }));
};

export const getCreatedCourses = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/course/get/created_course`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed");

  const data = await res.json();

  return courseMapping(data);
};

export const getRequestOpenCourses = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/course/get/request_open`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed");

  const data = await res.json();

  return courseMapping(data);
};

export const getWaitingPublicCourses = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/course/get/waiting_public`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed");

  const data = await res.json();

  return courseMapping(data);
};

export const getLockedAndPublicCourses = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/course/get/locked_public`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed");

  const data = await res.json();

  return courseMapping(data);
};

export const getBannedCourses = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/course/get/banned`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed");

  const data = await res.json();

  return courseMapping(data);
};

export const getCourseResource = async (baiHocID) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/course/get/resource/${baiHocID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return [];
  }

  const data = await res.json();

  return data.map((r) => ({
    taiNguyenID: r.taiNguyenID,
    loaiTN: r.loaiTN,
    stt: r.stt,
    text: r.text,
    url: r.url,
  }));
};

export const getCourseMarks = async (khoaHocID) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/course/get/mark/${khoaHocID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return [];
  }
  const data = await res.json();
  return data.map((p) => ({
    phieuDanhDauID: p.phieuDanhDauID,
    moTa: p.moTa,
    mucDanhDau: p.mucDanhDau,
    nhanVienID: p.nhanVienID,
  }));
};

// -------

//create course
export const createCourse = async (payload) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/course/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    return false;
  }
  const data = await res.text();
  return data;
};
export const uploadCourseCoverPhoto = async (khoaHocID, file) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("image", file);
  formData.append("khoaHocID", khoaHocID);

  const res = await fetch(`${BASE_URL}/api/image/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    return false;
  }
  return true;
};

export const updateCourse = async (payload) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/course/update`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    return false;
  }
  return true;
};

export const requestOpenCourse = async (khoaHocID) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/course/request_open/${khoaHocID}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return false;
  }
  return true;
};

export const approveCourse = async (khoaHocID) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/course/approve/${khoaHocID}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return false;
  }
  return true;
};

export const rejectCourse = async (khoaHocID) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/course/reject/${khoaHocID}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return false;
  }
  return true;
};

export const lockCourse = async (khoaHocID) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/course/lock/${khoaHocID}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return false;
  }
  return true;
};

export const publicCourse = async (khoaHocID) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/course/public/${khoaHocID}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return false;
  }
  return true;
};

export const banCourse = async (khoaHocID) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/course/ban/${khoaHocID}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return false;
  }
  return true;
};

export const unbanCourse = async (khoaHocID) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/course/unban/${khoaHocID}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return false;
  }
  return true;
};

export const markCourse = async (payload) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/course/create/mark`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    return false;
  }
  return true;
};

export const deleteMarkCourse = async (phieuDanhDauKH) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${BASE_URL}/api/course/delete/mark/${phieuDanhDauKH}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) {
    return false;
  }
  return true;
};

// RESOURCE
export const getLessonResource = async (baiHocID) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/course/get/resource/${baiHocID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return false;
  }

  const data = await res.json();

  return data.map((r) => ({
    taiNguyenID: r.taiNguyenID,
    loaiTN: r.loaiTN,
    stt: r.stt,
    text: r.text,
    url: r.url,
  }));
};

export const getDemoResource = async (baiHocID) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${BASE_URL}/api/course/get/demo/resource/${baiHocID}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) {
    return false;
  }

  const data = await res.json();

  return data.map((r) => ({
    taiNguyenID: r.taiNguyenID,
    loaiTN: r.loaiTN,
    stt: r.stt,
    text: r.text,
    url: r.url,
  }));
};

export const createTextBlock = async (payload) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/course/create/text_block`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    return false;
  }
  return true;
};

export const uploadImageBlock = async (baiHocID, file) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("image", file);
  formData.append("baiHocID", baiHocID);

  const res = await fetch(`${BASE_URL}/api/image/block/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    return false;
  }
  return true;
};

export const uploadVideoBlock = async (baiHocID, file) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("video", file);
  formData.append("baiHocID", baiHocID);

  const res = await fetch(`${BASE_URL}/api/video/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    return false;
  }
  return true;
};

export const deleteLessonResource = async (taiNguyenID) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${BASE_URL}/api/course/resource/del/${taiNguyenID}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) {
    return false;
  }
  return true;
};

export const updateResourceBlock = async (payload) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/course/resource/update`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    return false;
  }
  return true;
};

export const swapResourcePriority = async (payload) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/course/resource/swap_prio`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    return false;
  }
  return true;
};

// LESSON
export const getLesson = async (khoaHocID) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/course/get/lesson/${khoaHocID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return [];
  }
  const data = await res.json();

  return data.map((b) => ({
    baiHocID: b.baiHocID,
    tenBaiHoc: b.tenBaiHoc,
    stt: b.stt,
  }));
};

export const getDemoLesson = async (khoaHocID) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${BASE_URL}/api/course/get/demo/lesson/${khoaHocID}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) {
    return [];
  }
  const data = await res.json();

  return data.map((b) => ({
    baiHocID: b.baiHocID,
    tenBaiHoc: b.tenBaiHoc,
    stt: b.stt,
  }));
};

export const createLesson = async (payload) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/course/lesson/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    return false;
  }
  return true;
};

export const updateLesson = async (payload) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/course/lesson/update`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    return false;
  }
  return true;
};

export const deleteLesson = async (baiHocID) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/course/lesson/del/${baiHocID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return false;
  }
  return true;
};

export const swapLessonPriority = async (payload) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/course/lesson/swap_prio`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    return false;
  }
  return true;
};

// RATING
export const getCourseRatings = async (khoaHocID) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/course/get/rating/${khoaHocID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return [];
  }
  const data = await res.json();

  return data.map((r) => ({
    phieuDanhGiaID: r.phieuDanhGiaID,
    chiTiet: r.chiTiet,
    diemDanhGia: r.diemDanhGia,
    ngayTao: r.ngayTao,
    hocVienID: r.hocVienID,
    hoTen: r.hoTen,
    email: r.email,
  }));
};

export const createRating = async (payload) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/course/create/rating`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    return false;
  }
  return true;
};

export const getRating = async (khoaHocID) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${BASE_URL}/api/course/get/rating/single/${khoaHocID}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const data = await res.json();
  return {
    phieuDanhGiaID: data.phieuDanhGiaID,
    chiTiet: data.chiTiet,
    diemDanhGia: data.diemDanhGia,
    ngayTao: data.ngayTao,
  };
};
