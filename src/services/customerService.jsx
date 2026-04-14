import { BASE_URL } from "../utils/apiConfig";

export const getCustomers = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/customer/all/status=1`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("Failed");

    const data = await res.json();

    return data.map((u) => ({
      user_id: u.user_id,
      email: u.email,
      username: u.username,
      status: u.status,
      created_at: u.created_at,
      // Bê nguyên mảng sang, thêm ? phòng trường hợp API trả về null
      user_role: u.user_role || [],
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};
