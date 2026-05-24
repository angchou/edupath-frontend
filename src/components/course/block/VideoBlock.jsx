import { useState } from "react";
import { useRef } from "react";
import { Image, FilePlay } from "lucide-react";

import { uploadVideoBlock } from "../../../services/courseService";

export default function VideoBlock({ block, onSave, onClose, baiHocID }) {
  const [preview, setPreview] = useState(block?.url || "");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;

    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  // lưu ảnh
  const handleSave = async () => {
    if (!preview) return;

    if (baiHocID) {
      const res = await uploadVideoBlock(baiHocID, file);
    }
    onSave();
  };

  const handleCancel = () => {
    setPreview(block?.url || "");
    setFile(null);
  };

  return (
    <div className="shadow-lg p-3 space-y-2 mt-5 max-w-xl">
      {preview ? (
        <video src={preview} controls className="w-100 rounded object-cover" />
      ) : (
        <div className="h-30 bg-gray-200 flex flex-col gap-2 items-center justify-center rounded">
          <FilePlay className="size-13 text-gray-400" />
          <span className="text-gray-500 text-sm">Chưa có video</span>
        </div>
      )}

      <div className="flex justify-between w-full">
        <div>
          <input
            type="file"
            accept="video/*"
            onChange={handleChange}
            ref={fileInputRef}
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current.click()}
            className="mt-4 text-sm px-12 py-2 bg-blue-500 hover:bg-blue-600 text-white transition"
          >
            Chọn video
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
            onClick={handleSave}
            className="mt-4 text-sm px-12 py-2 bg-blue-500 hover:bg-blue-600 text-white transition"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
