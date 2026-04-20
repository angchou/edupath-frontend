import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";

import {
  getCourseResource,
  deleteResource,
} from "../../../services/courseService";
import { uploadText } from "../../../services/courseService";

import TextBlock from "../../../components/course/block/TextBlock";
import ImageBlock from "../../../components/course/block/ImageBlock";
import VideoBlock from "../../../components/course/block/VideoBlock";

import { X, ChevronDown, ChevronUp } from "lucide-react";

export default function EditCoursePage() {
  const { khoaHocID } = useParams();
  const [blocks, setBlocks] = useState([]);

  const [activeBlock, setActiveBlock] = useState(null);
  const [showTipTap, setShowTipTap] = useState(false);
  const [showImageBlock, setShowImageBlock] = useState(false);
  const [showVideoBlock, setShowVideoBlock] = useState(false);

  const handleClose = () => setActiveBlock(null);

  const moveBlock = (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= blocks.length) return;

    const updated = [...blocks];
    const temp = updated[fromIndex];
    updated[fromIndex] = updated[toIndex];
    updated[toIndex] = temp;

    setBlocks(updated);
  };

  const fetchBlocks = async () => {
    try {
      const data = await getCourseResource(khoaHocID);
      console.log(data);
      setBlocks(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBlocks();
  }, []);

  const handleDeleteResource = async (taiNguyenID) => {
    try {
      await deleteResource(khoaHocID, taiNguyenID);

      await fetchBlocks();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUploadText = async (html) => {
    try {
      const nextSTT =
        blocks.length === 0
          ? 1
          : Math.max(...blocks.map((b) => b.stt || 0)) + 1;

      const newBlock = {
        url: null,
        loaiTN: 1,
        stt: nextSTT,
        text: html,
      };

      await uploadText(newBlock, khoaHocID);

      await fetchBlocks();

      handleClose();
      setShowTipTap(false);
    } catch (err) {
      console.error(err);
    }
  };

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
                <TextBlock
                  onSave={handleUploadText}
                  onClose={() => {
                    handleClose();
                    setShowTipTap(false);
                  }}
                ></TextBlock>
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

              <div className="w-full pt-10 pb-5 flex flex-col gap-5">
                {blocks.map((block, index) => {
                  switch (block.loaiTN) {
                    case 1:
                      return (
                        <div key={index} className="relative pt-8">
                          <div className="absolute top-2 right-2 flex gap-5">
                            <button
                              className="text-gray-500 group"
                              onClick={() => moveBlock(index, index + 1)}
                            >
                              <ChevronDown
                                size={25}
                                className="group-hover:text-blue-500 hover:scale-150 transition"
                              />
                            </button>
                            <button
                              className="text-gray-500 group"
                              onClick={() => moveBlock(index, index - 1)}
                            >
                              <ChevronUp
                                size={25}
                                className="group-hover:text-green-500 hover:scale-150 transition"
                              />
                            </button>
                            <button
                              className="text-gray-500 group"
                              onClick={() =>
                                handleDeleteResource(block.taiNguyenID)
                              }
                            >
                              <X
                                size={25}
                                className="group-hover:text-red-500 hover:scale-150 transition"
                              />
                            </button>
                          </div>
                          <div
                            key={index}
                            className="tiptap text-justify p-3 pl-6 border-l-5 border-green-600"
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(block.text),
                            }}
                          />
                        </div>
                      );
                    case 2:
                      return (
                        <div key={index} className="w-full flex mt-5">
                          <img
                            src={block.url}
                            alt=""
                            className="max-h-[50vh] w-auto object-contain rounded-xl"
                          />
                        </div>
                      );

                    case 3:
                      return (
                        <div
                          key={index}
                          className="w-full flex justify-left mt-5"
                        >
                          <div className="w-full max-w-5xl aspect-video">
                            <video
                              controls
                              className="w-full h-full rounded-xl shadow-md object-cover"
                            >
                              <source src={block.url} type="video/mp4" />
                            </video>
                          </div>
                        </div>
                      );

                    default:
                      return null;
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
