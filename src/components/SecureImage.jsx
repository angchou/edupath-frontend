import { useState, useEffect } from "react";

const SecureImage = ({ src, className, alt }) => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(src, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Không thể tải ảnh");

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
    <div className={className + " bg-gray-200 animate-pulse"} />
  );
};

export default SecureImage;
