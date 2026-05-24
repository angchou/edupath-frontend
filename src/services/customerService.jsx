import { BASE_URL } from "../utils/apiConfig";

export const getCustomers = async (trangThai) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/customer/get/${Number(trangThai)}`, {
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

  return data.map((u) => ({
    userID: u.userID,
    hoTen: u.hoTen,
    email: u.email,
    ngayTao: u.ngayTao,
    roleName: u.roleName,
    trangThai: u.trangThai,
    quocGiaDuHoc: u.quocGiaDuHoc,
    gpa: u.gpa,
    nganhHoc: u.nganhHoc,
    doanhThu: u.doanhThu,
    trungBinhDanhGia: u.trungBinhDanhGia,
  }));
};

export const banCustomer = async (userID) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/customer/ban/${userID}`, {
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

export const unbanCustomer = async (userID) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/customer/unban/${userID}`, {
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
