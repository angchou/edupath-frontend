import { BASE_URL } from "../utils/apiConfig";

export const getApplication = async (trangThai) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/api/application/get/${trangThai}`, {
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
  return data.map((a) => ({
    userID: a.userID,
    hoTen: a.hoTen,
    email: a.email,
    hoSoID: a.hoSoID,
    ngayTao: a.ngayTao,
    url: a.url,
    trangThai: a.trangThai,
  }));
};

export const approveApplication = async (hoSoID) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/api/application/approve/${hoSoID}`, {
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

export const rejectApplication = async (hoSoID) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/api/application/reject/${hoSoID}`, {
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

export const grantMentor = async (hoSoID) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/api/application/grant/${hoSoID}`, {
    method: "POST",
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
