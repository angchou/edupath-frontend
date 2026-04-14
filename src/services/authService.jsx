import { BASE_URL } from "../utils/apiConfig";
import { jwtDecode } from "jwt-decode";

export const loginService = async (form) => {
  const res = await fetch(BASE_URL + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Login failed!");
  }

  const data = await res.json();
  localStorage.setItem("token", data.token);

  const decode = jwtDecode(localStorage.getItem("token"));
  const roles = decode.roles;

  return roles;
};

export const registerService = async (form) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Register failed!");
  }
  return true;
};
