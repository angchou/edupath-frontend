import { BASE_URL } from "../utils/apiConfig";

export const getMyMentors = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/api/message/get/mentor`, {
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
    roleName: a.roleName,
    trangThai: a.trangThai,
    ngayTao: a.ngayTao,
  }));
};

export const getMyStudents = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/api/message/get/student`, {
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
    roleName: a.roleName,
    trangThai: a.trangThai,
    ngayTao: a.ngayTao,
  }));
};

export const getConversation = async (targetID) => {
  const token = localStorage.getItem("token");
  const res = await fetch(
    `${BASE_URL}/api/message/get/conversation/${targetID}`,
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
  const c = await res.json();
  return {
    cuocTroChuyenID: c.cuocTroChuyenID,
    thoiGianTao: c.thoiGianTao,
    nguoiKhoiTao: c.nguoiKhoiTao,
    nguoiNhan: c.nguoiNhan,
    expired: c.expired,
  };
};

export const getMessagesOfConversation = async (cuocTroChuyenID) => {
  const token = localStorage.getItem("token");
  const res = await fetch(
    `${BASE_URL}/api/message/get/message/conversation/${cuocTroChuyenID}`,
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
  return data.map((m) => ({
    tinNhanID: m.tinNhanID,
    cuocTroChuyenID: m.cuocTroChuyenID,
    nguoiGui: m.nguoiGui,
    thoiGianGui: m.thoiGianGui,
    noiDung: m.noiDung,
  }));
};

export const createMessage = async (payload) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/api/message/create`, {
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
