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
    soLuongHocVien: c.slhv,
    mucPhi: c.mucPhi,
    hinhAnh: getImageUrl(c.url),
  }));
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

  return courseMapping(data);
};

export const getMyCourses = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/course/get/mine`, {
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
