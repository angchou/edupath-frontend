import { BASE_URL } from "../utils/apiConfig";

export const createBankAccount = async (payload) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/api/bank_account/create`, {
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

export const getMyBankAccounts = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/api/bank_account/get/my`, {
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
    tknhID: b.tknhID,
    tenNH: b.tenNH,
    stk: b.stk,
    trangThai: b.trangThai,
  }));
};

export const disableBankAccount = async (tknhID) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/api/bank_account/disable/${tknhID}`, {
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

export const enableBankAccount = async (tknhID) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/api/bank_account/enable/${tknhID}`, {
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

export const updateBankAccount = async (tknhID, payload) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/api/bank_account/update/${tknhID}`, {
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
  return true;
};
