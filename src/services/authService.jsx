import { BASE_URL } from "../utils/apiConfig";
import { jwtDecode } from "jwt-decode";

export const loginService = async (payload) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    return "";
  }

  const data = await res.json();
  localStorage.setItem("token", data.token);

  const decode = jwtDecode(localStorage.getItem("token"));
  const roles = decode.roles;

  return roles;
};

export const registerService = async (payload) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    return false;
  }
  return true;
};
