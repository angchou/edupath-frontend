import { BASE_URL } from "../utils/apiConfig";

export const getAllEmployees = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/emp/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) return [];

  const data = await res.json();

  return data.map((emp) => ({
    userID: emp.userID,
    hoTen: emp.hoTen,
    email: emp.email,
    password: emp.password,
    roleID: emp.roleID,
    ngayTao: emp.ngayTao,
    chucVu: emp.chucVu,
    luongCoBan: emp.luongCoBan,
    luongPhuCap: emp.luongPhuCap,
    trangThai: emp.trangThai,
  }));
};

export const getEmployeesInfoForPayroll = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/emp/all/payroll`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) return [];

  const data = await res.json();

  return data.map((emp) => ({
    userID: emp.userID,
    hoTen: emp.hoTen,
    email: emp.email,
    password: emp.password,
    roleID: emp.roleID,
    ngayTao: emp.ngayTao,
    chucVu: emp.chucVu,
    luongCoBan: emp.luongCoBan,
    luongPhuCap: emp.luongPhuCap,
    trangThai: emp.trangThai,
    ngayTraLuongCuoiCung: emp.ngayTraLuongCuoiCung,
  }));
};

export const getEmployeePayroll = async (userID) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/emp/payroll/${userID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) return [];

  const data = await res.json();
  console.log(data);
  return data.map((p) => ({
    luongChiTietID: p.luongChiTietID,
    luongThuong: p.luongThuong,
    luongKhauTru: p.luongKhauTru,
    luongCuoiCung: p.luongCuoiCung,
    trangThai: p.trangThai,
    ngayTao: p.ngayTao,
  }));
};

export const getActiveEmployees = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/emp/deleted`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed");

  const data = await res.json();

  return data.map((emp) => ({
    userID: emp.userID,
    hoTen: emp.hoTen,
    email: emp.email,
    password: emp.password,
    roleID: emp.roleID,
    ngayTao: emp.ngayTao,
    chucVu: emp.chucVu,
    luongCoBan: emp.luongCoBan,
    luongPhuCap: emp.luongPhuCap,
    trangThai: emp.trangThai,
  }));
};

export const getNewEmployees = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/emp/newbie`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed");

  const data = await res.json();

  return data.map((emp) => ({
    userID: emp.userID,
    hoTen: emp.hoTen,
    email: emp.email,
    password: emp.password,
    roleID: emp.roleID,
    ngayTao: emp.ngayTao,
    chucVu: emp.chucVu,
    luongCoBan: emp.luongCoBan,
    luongPhuCap: emp.luongPhuCap,
    trangThai: emp.trangThai,
  }));
};

export const createEmployee = async (payload) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/emp/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    console.log("Failed!");
    return;
  }

  const data = await res.text();
  return data;
};

export const createPayroll = async (payload) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/emp/create/payroll`, {
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

export const deleteEmployee = async (nhanVienID) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/emp/delete/${nhanVienID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return false;
  }

  const data = await res.text();
  return data;
};

export const updateEmployee = async (payload) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/emp/edit`, {
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

  const data = await res.text();
  return data;
};

export const finishPayment = async (luongChiTietID) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${BASE_URL}/api/emp/finish-payment/${luongChiTietID}`,
    {
      method: "PATCH",
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
