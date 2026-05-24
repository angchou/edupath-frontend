import { BASE_URL } from "../utils/apiConfig";

export const checkVoucherApplied = async (maApDung) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/voucher/check/${maApDung}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return false;
  }
  const data = await res.json();
  return {
    voucherID: data.voucherID,
    maApDung: data.maApDung,
    loaiVoucher: data.loaiVoucher,
    triGia: data.triGia,
  };
};

export const getAllVouchers = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/voucher/all`, {
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
  return data.map((v) => ({
    voucherID: v.voucherID,
    maApDung: v.maApDung,
    loaiVoucher: v.loaiVoucher,
    triGia: v.triGia,
    slToiDa: v.slToiDa,
    slDaSuDung: v.slDaSuDung,
    hanSuDung: v.hanSuDung,
    trangThai: v.trangThai,
  }));
};

export const createVoucher = async (payload) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/voucher/create`, {
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
