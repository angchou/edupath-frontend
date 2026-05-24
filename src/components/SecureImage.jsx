import { useState, useEffect } from "react";
import { BASE_URL } from "../utils/apiConfig";

const SecureImage = ({ src, className, alt, onOpen }) => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
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
          console.error("Không tìm thấy ảnh tại:", fullUrl);
          return;
        }

        const blob = await response.blob();
        const objectURL = URL.createObjectURL(blob);
        setImageSrc(objectURL);

        return () => URL.revokeObjectURL(objectURL);
      } catch (error) {
        console.error("Lỗi load ảnh:", error);
      }
    };

    loadImage();
  }, [src]);

  return imageSrc ? (
    <img src={imageSrc} className={className} alt={alt} />
  ) : (
    <div className={`${className} bg-gray-200 animate-pulse`} />
  );
};

export default SecureImage;
