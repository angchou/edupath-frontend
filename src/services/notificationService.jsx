import { BASE_URL } from "../utils/apiConfig";

export const getNotificaions = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/notification/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    console.log("OK");
    return [];
  }
  const data = await res.json();
  return data.map((tb) => ({
    thongBaoID: tb.thongBaoID,
    tieuDe: tb.tieuDe,
    noiDung: tb.noiDung,
    ngayTao: tb.ngayTao,
  }));
};

export const deleteNotification = async (thongBaoID) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/notification/delete/${thongBaoID}`, {
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

export const deleteAllNotifications = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/notification/delete/all`, {
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
