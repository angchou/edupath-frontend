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

  if (!res.ok) throw new Error("Failed");

  const data = await res.json();

  return data.map((emp) => ({
    userID: emp.userID,
    hoTen: emp.hoTen,
    email: emp.email,
    password: emp.password,
    roleName: emp.roleName,
    ngayTao: emp.ngayTao,
    chucVu: emp.chucVu,
    luongCoBan: emp.luongCoBan,
    luongPhuCap: emp.luongPhuCap,
  }));
};
