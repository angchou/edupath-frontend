import { BASE_URL } from "../utils/apiConfig";

export const getMyTransactions = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/api/transaction/get/my`, {
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
  return data.map((t) => ({
    giaoDichID: t.giaoDichID,
    giaGoc: t.giaGoc,
    triGia: t.triGia,
    ngayGD: t.ngayGD,
    congGD: t.congGD,
    trangThai: t.trangThai,
    voucherID: t.voucherID,
    maApDung: t.maApDung,
    khoaHocID: t.khoaHocID,
    isRefunded: t.refunded,
  }));
};

export const getAllTransactions = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/api/transaction/all`, {
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
  return data.map((t) => ({
    giaoDichID: t.giaoDichID,
    giaGoc: t.giaGoc,
    triGia: t.triGia,
    ngayGD: t.ngayGD,
    congGD: t.congGD,
    trangThai: t.trangThai,
    voucherID: t.voucherID,
    maApDung: t.maApDung,
    khoaHocID: t.khoaHocID,
    isRefunded: t.refunded,
  }));
};

export const getRefundByStatus = async (trangThai) => {
  const token = localStorage.getItem("token");
  const res = await fetch(
    `${BASE_URL}/api/transaction/get/refund/${trangThai}`,
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
  return data.map((t) => ({
    giaoDichID: t.giaoDichID,
    giaGoc: t.giaGoc,
    triGia: t.triGia,
    ngayGD: t.ngayGD,
    congGD: t.congGD,
    trangThai: t.trangThai,
    voucherID: t.voucherID,
    maApDung: t.maApDung,
    khoaHocID: t.khoaHocID,
    hoanTienID: t.hoanTienID,
    ngayHT: t.ngayHT,
    liDo: t.liDo,
    ngayTao: t.ngayTao,
    phiSan: t.phiSan,
  }));
};

export const getTransactionsByVoucher = async (voucherID) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/api/transaction/get/${voucherID}`, {
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
  return data.map((t) => ({
    giaoDichID: t.giaoDichID,
    giaGoc: t.giaGoc,
    triGia: t.triGia,
    ngayGD: t.ngayGD,
    congGD: t.congGD,
    trangThai: t.trangThai,
    khoaHocID: t.khoaHocID,
    userID: t.userID,
  }));
};

export const getMentorRevenue = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/api/transaction/get/revenue`, {
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
  return {
    tongDoanhThu: data.tongDoanhThu,
    daRutThanhCong: data.daRutThanhCong,
    soDuKhaDung: data.soDuKhaDung,
    danhSachRutTien: data.danhSachRutTien.map((r) => ({
      rutTienID: r.rutTienID,
      soTienRut: r.soTienRut,
      trangThai: r.trangThai,
      ngayRutTien: r.ngayRutTien,
      tknh_id: r.tknh_id,
      stk: r.stk,
      tenNH: r.tenNH,
    })),
  };
};

export const getMyWithdraws = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/api/transaction/withdraw/get/my`, {
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
  return data.map((rt) => ({
    rutTienID: r.rutTienID,
    soTienRut: r.soTienRut,
    trangThai: r.trangThai,
    ngayRutTien: r.ngayRutTien,
    tknh_id: r.tknh_id,
    stk: r.stk,
    tenNH: r.tenNH,
  }));
};

export const requestRefundTransaction = async (payload) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/api/transaction/refund`, {
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

export const createTransaction = async (payload) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/api/transaction/create`, {
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

export const createWithdraw = async (payload) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/api/transaction/withdraw/create`, {
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

export const acceptRefund = async (hoanTienID) => {
  const token = localStorage.getItem("token");
  const res = await fetch(
    `${BASE_URL}/api/transaction/refund/accept/${hoanTienID}`,
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

export const rejectRefund = async (hoanTienID) => {
  const token = localStorage.getItem("token");
  const res = await fetch(
    `${BASE_URL}/api/transaction/refund/reject/${hoanTienID}`,
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
