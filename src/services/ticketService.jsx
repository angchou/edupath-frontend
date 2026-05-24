import { BASE_URL } from "../utils/apiConfig";

export const ticketMapping = (data) => {
  return data.map((t) => ({
    ticketID: t.ticketID,
    doUuTien: t.doUuTien,
    moTa: t.moTa,
    loaiTicket: t.loaiTicket,
    trangThai: t.trangThai,
    ngayTao: t.ngayTao,
    ngayHetHan: t.ngayHetHan,
    nguoiTao: t.nguoiTao,
    nhanVienXuLy: t.nhanVienXuLy,
  }));
};

export const getMyTickets = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/api/ticket/get/my_ticket`, {
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
  return ticketMapping(data);
};

export const getWaitingTickets = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/api/ticket/get/waiting`, {
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
  return ticketMapping(data);
};

export const getClosedTicket = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/api/ticket/get/closed`, {
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
  return ticketMapping(data);
};

export const getExpiredTicket = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/api/ticket/get/expired`, {
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
  return ticketMapping(data);
};

export const getRejectedTicket = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/api/ticket/get/rejected`, {
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
  return ticketMapping(data);
};

export const getNearExpiredTicket = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/api/ticket/get/near_expired`, {
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
  return ticketMapping(data);
};

export const createTicket = async (payload) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/api/ticket/create`, {
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

export const closeTicket = async (ticketID) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/api/ticket/close/${ticketID}`, {
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

export const rejectTicket = async (ticketID) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/api/ticket/reject/${ticketID}`, {
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
