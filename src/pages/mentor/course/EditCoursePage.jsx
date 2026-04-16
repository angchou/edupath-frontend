import { useParams } from "react-router-dom";
import { useState } from "react";

import Tiptap from "../../../components/Tiptap";
import ImageBlock from "../../../components/course/block/ImageBlock";
import VideoBlock from "../../../components/course/block/VideoBlock";

export default function EditCoursePage() {
  const { khoaHocID } = useParams();

  const blocks = [
    {
      taiNguyenID: "TN002",
      loaiTN: "image",
      STT: 2,
      text: null,
      url: "https://images.rpgsite.net/image/da49c9a1/160022/original/persona-3-reload_20251021_switch-2-full-game-review-6.png",
      khoaHocID: "KH001",
    },
    {
      taiNguyenID: "TN001",
      loaiTN: "text",
      STT: 1,
      text: "<h2>Tiêu đề</h2><p><b>Nội dung</b> có format</p><h1>Đây là hình ảnh<h2/>",
      url: null,
      khoaHocID: "KH001",
    },
  ];

  const [activeBlock, setActiveBlock] = useState(null);
  const [showTipTap, setShowTipTap] = useState(false);
  const [showImageBlock, setShowImageBlock] = useState(false);
  const [showVideoBlock, setShowVideoBlock] = useState(false);

  const handleClose = () => setActiveBlock(null);

  return (
    <div className="flex flex-col bg-gray-50 font-sans">
      <div className="p-5 flex-1 flex flex-col items-center overflow-hidden">
        <div className="h-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
          <div className="max-h-[77vh] overflow-y-auto px-20">
            <header className="mt-10 text-2xl font-bold">
              Chỉnh sửa khóa học {khoaHocID}
            </header>
            <div className="w-[50vw] pt-10 pb-10">
              <div className="flex gap-5">
                <button
                  disabled={activeBlock !== null}
                  onClick={() => {
                    setShowTipTap(true);
                    setActiveBlock("text");
                  }}
                  className={`bg-blue-500 hover:bg-blue-600 transition px-4 py-2 rounded-sm text-white font-semibold ${activeBlock !== null ? "bg-gray-400 hover:bg-gray-500" : ""}`}
                >
                  Thêm ký tự
                </button>
                <button
                  disabled={activeBlock !== null}
                  onClick={() => {
                    setShowImageBlock(true);
                    setActiveBlock("image");
                  }}
                  className={`bg-blue-500 hover:bg-blue-600 transition px-4 py-2 rounded-sm text-white font-semibold ${activeBlock !== null ? "bg-gray-400 hover:bg-gray-500" : ""}`}
                >
                  Thêm hình ảnh
                </button>
                <button
                  disabled={activeBlock !== null}
                  onClick={() => {
                    setShowVideoBlock(true);
                    setActiveBlock("video");
                  }}
                  className={`bg-blue-500 hover:bg-blue-600 transition px-4 py-2 rounded-sm text-white font-semibold ${activeBlock !== null ? "bg-gray-400 hover:bg-gray-500" : ""}`}
                >
                  Thêm video
                </button>
              </div>

              {showTipTap && (
                <Tiptap
                  onSave={(html) => {
                    console.log("HTML:", html);
                    handleClose();
                    setShowTipTap(false);
                  }}
                  onClose={() => {
                    handleClose();
                    setShowTipTap(false);
                  }}
                ></Tiptap>
              )}

              {showImageBlock && (
                <ImageBlock
                  onSave={() => {
                    handleClose();
                    setShowImageBlock(false);
                  }}
                  onClose={() => {
                    handleClose();
                    setShowImageBlock(false);
                  }}
                />
              )}

              {showVideoBlock && (
                <VideoBlock
                  onSave={() => {
                    handleClose();
                    setShowVideoBlock(false);
                  }}
                  onClose={() => {
                    handleClose();
                    setShowVideoBlock(false);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
