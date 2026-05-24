import { BASE_URL } from "../utils/apiConfig";

export const getAllBudgets = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/api/budget/get`, {
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
  return data.map((b) => ({
    nganSachID: b.nganSachID,
    loaiNganSachID: b.loaiNganSachID,
    ngayBatDau: b.ngayBatDau,
    ngayKetThuc: b.ngayKetThuc,
    triGia: b.triGia,
  }));
};

export const getBudgetTypes = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/api/budget/get/type`, {
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
  return data.map((b) => ({
    loaiNganSachID: b.loaiNganSachID,
    tenLNS: b.tenLNS,
  }));
};

export const createBudget = async (payload) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/api/budget/create`, {
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
