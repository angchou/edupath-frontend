import { transform } from "framer-motion";
import { BASE_URL } from "../utils/apiConfig";

export const getMyShareRoadmap = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/api/roadmap/get/my_share`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    return {
      loTrinhID: null,
      trangthai: -1,
      moTa: "",
      danhSachDauViec: [],
    };
  }
  const data = await res.json();
  return {
    loTrinhID: data.loTrinhID,
    trangThai: data.trangThai,
    moTa: data.moTa,
    danhSachDauViec: data.danhSachDauViec.map((d) => ({
      dauViecID: d.dauViecID,
      tenDauViec: d.tenDauViec,
      stt: d.stt,
      moTa: d.moTa,
    })),
  };
};

export const getMyRoadmap = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/api/roadmap/get/roadmap`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    return {
      loTrinhID: null,
      trangthai: -1,
      danhSachDauViec: [],
    };
  }
  const data = await res.json();
  return {
    loTrinhID: data.loTrinhID,
    trangThai: data.trangThai,
    moTa: "",
    danhSachDauViec: data.danhSachDauViec.map((d) => ({
      dauViecID: d.dauViecID,
      tenDauViec: d.tenDauViec,
      stt: d.stt,
      moTa: d.moTa,
    })),
  };
};

export const getPublicRoadmap = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/api/roadmap/get/public`, {
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
  return data.map((l) => ({
    loTrinhID: l.loTrinhID,
    moTa: l.moTa,
    trangThai: l.trangThai,
    userID: l.userID,
    hoTen: l.hoTen,
    email: l.email,
    danhSachDauViec: l.danhSachDauViec.map((d) => ({
      dauViecID: d.dauViecID,
      tenDauViec: d.tenDauViec,
      stt: d.stt,
      moTa: d.moTa,
    })),
  }));
};

export const saveRoadmap = async (payload) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/api/roadmap/save`, {
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

export const saveRoadmapDesc = async (payload) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/api/roadmap/edit_desc`, {
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

export const publicRoadmap = async (loTrinhID) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/api/roadmap/public/${loTrinhID}`, {
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

export const copyRoadmap = async (loTrinhID) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/api/roadmap/copy/${loTrinhID}`, {
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
