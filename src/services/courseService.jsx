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

export const getCourseResource = async (khoaHocID) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/course/get/resource/${khoaHocID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed");

  const data = await res.json();

  return data.map((r) => ({
    taiNguyenID: r.taiNguyenID,
    loaiTN: r.loaiTN,
    stt: r.stt,
    text: r.text,
    url: r.url,
  }));
};

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
    console.log("Failed!");
    return false;
  }
  return true;
};

export const uploadText = async (payload, khoaHocID) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/course/create/${khoaHocID}/text`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Upload Failed!");
  }
};

export const deleteResource = async (khoaHocID, taiNguyenID) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${BASE_URL}/api/course/delete/${khoaHocID}/${taiNguyenID}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Delete Failed!");
  }
};
