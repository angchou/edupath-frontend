import { BASE_URL } from "../utils/apiConfig";

export const getNormalCourses = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(BASE_URL + "/api/course/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Failed");

    const data = await res.json();

    return data.map((c) => ({
      id: c.courseId,
      title: c.courseName,
      description: c.courseDescription,
      students: c.courseSize,
      price: c.coursePrice,
      mentor: c.mentorSummaryResponse?.mentorUserName || "Unknown",
      image:
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2161700/header.jpg?t=1764776430",
    }));
  } catch (err) {
    console.error(err);
    return [];
  }
};
