import { useState } from "react";
import { useRef } from "react";
import { Image } from "lucide-react";

import { uploadImageBlock } from "../../../services/courseService";

export default function ImageBlock({ block, onSave, onClose, baiHocID }) {
  const [preview, setPreview] = useState(block?.url || "");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  // save image
  const handleSave = async () => {
    if (!file) return;

    // call API
    if (baiHocID) {
      const fetchImage = await uploadImageBlock(baiHocID, file);
    }
    onSave();
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Giới hạn 10MB (10 * 1024 * 1024 bytes)
    const maxSize = 10 * 1024 * 1024;

    if (file.size > maxSize) {
      alert("Kích thước ảnh quá lớn! Vui lòng chọn ảnh dưới 5MB.");
      e.target.value = "";
      return;
    }

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    const objectUrl = URL.createObjectURL(file);
    setFile(file);
    setPreview(objectUrl);
  };

  return (
    <div className="shadow-lg p-3 space-y-2 mt-5 max-w-xl">
      {preview ? (
        <img
          src={preview}
          alt="preview"
          className="w-64 rounded object-cover"
        />
      ) : (
        <div className="h-30 bg-gray-200 flex flex-col gap-2 items-center justify-center rounded">
          <Image className="size-13 text-gray-400" />
          <span className="text-gray-500 text-sm">Chưa có hình ảnh</span>
        </div>
      )}

      <div className="flex justify-between w-full">
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            ref={fileInputRef}
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current.click()}
            className="mt-4 text-sm px-6 py-2 text-blue-500 border-1 hover:bg-blue-500 hover:text-white transition"
          >
            Chọn ảnh
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onClose()}
            className="mt-4 text-sm px-12 py-2 bg-gray-400 hover:bg-gray-500 text-white transition"
          >
            Hủy
          </button>
          <button
            name="submit"
            onClick={() => {
              handleSave();
              onClose();
            }}
            className="mt-4 text-sm px-12 py-2 bg-blue-500 hover:bg-blue-600 text-white transition"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
