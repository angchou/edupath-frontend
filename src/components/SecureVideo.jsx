import { useState, useEffect } from "react";
import { BASE_URL } from "../utils/apiConfig";

const SecureVideo = ({ src, className }) => {
  const [videoSrc, setVideoSrc] = useState(null);

  useEffect(() => {
    let objectURL = null;
    const loadVideo = async () => {
      if (!src) return;
      const fullUrl = src.startsWith("http") ? src : `${BASE_URL}${src}`;
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(fullUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const contentType = response.headers.get("content-type");
        if (
          !response.ok ||
          (contentType && contentType.includes("text/html"))
        ) {
          console.error("Không tìm thấy video tại:", fullUrl);
          return;
        }

        const blob = await response.blob();
        objectURL = URL.createObjectURL(blob);
        setVideoSrc(objectURL);
      } catch (error) {
        console.error("Lỗi load video:", error);
      }
    };

    loadVideo();

    return () => {
      if (objectURL) {
        URL.revokeObjectURL(objectURL);
      }
    };
  }, [src]);

  return videoSrc ? (
    <video controls className={className} src={videoSrc} />
  ) : (
    <div
      className={`${className} bg-gray-900 animate-pulse flex items-center justify-center text-gray-500 text-sm`}
    >
      <span>Đang tải video an toàn...</span>
    </div>
  );
};

export default SecureVideo;
