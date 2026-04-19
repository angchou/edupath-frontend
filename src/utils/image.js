import { BASE_URL } from "./apiConfig";

export const getImageUrl = (url) => {
  if (!url) return "/default.png";

  if (url.startsWith("http")) return url;

  return `${BASE_URL}${url}`;
};
