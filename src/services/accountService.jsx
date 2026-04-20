import { BASE_URL } from "../utils/apiConfig";
import { jwtDecode } from "jwt-decode";

export const getLearnerProfile = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/account/learner/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed!");

  const data = await res.json();
  const roles = jwtDecode(token).roles;

  console.log(roles);

  return {
    userID: data.userID,
    hoTen: data.hoTen,
    email: data.email,
    gpa: data.gpa,
    quocGiaDuHoc: data.quocGiaDuHoc,
    nganhHoc: data.nganhHoc,
    roles: roles,
    ngayTao: data.ngayTao,
  };
};

export const getMentorProfile = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/account/mentor/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed!");

  const data = await res.json();
  const roles = jwtDecode(token).roles;

  console.log(roles);

  return {
    userID: data.userID,
    hoTen: data.hoTen,
    email: data.email,
    trungBinhDanhGia: data.trungBinhDanhGia,
    doanhThu: data.doanhThu,
    roles: roles,
    ngayTao: data.ngayTao,
  };
};
