import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";

import {
  getLessonResource,
  getLesson,
  createTextBlock,
  createLesson,
  deleteLesson,
  deleteLessonResource,
  updateLesson,
  updateResourceBlock,
  swapLessonPriority,
  swapResourcePriority,
} from "../../../services/courseService";
import TextBlock from "../../../components/course/block/TextBlock";
import ImageBlock from "../../../components/course/block/ImageBlock";
import VideoBlock from "../../../components/course/block/VideoBlock";
import SecureImage from "../../../components/SecureImage";
import SecureVideo from "../../../components/SecureVideo";

import {
  X,
  ChevronDown,
  ChevronUp,
  Pencil,
  Image,
  Video,
  TextAlignCenter,
} from "lucide-react";
import { Tiptap } from "@tiptap/react";

export default function EditCoursePage() {
  const { khoaHocID } = useParams();
  const [blocks, setBlocks] = useState([]);
  const [lessons, setLessons] = useState([]);

  const [createLessonForm, setCreateLessonForm] = useState({
    tenBaiHoc: "",
  });
  const [updateLessonForm, setUpdateLessonForm] = useState({
    tenBaiHoc: "",
  });

  const [showTipTap, setShowTipTap] = useState(false);
  const [showImageBlock, setShowImageBlock] = useState(false);
  const [showVideoBlock, setShowVideoBlock] = useState(false);
  const [showCreateLesson, setShowCreateLesson] = useState(false);
  const [showUpdateLesson, setShowUpdateLesson] = useState(false);
  const [showUpdateText, setShowUpdateText] = useState(false);

  const [activeBlock, setActiveBlock] = useState(null);
  const [selectedUpdateLesson, setSelectedUpdateLesson] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedUpdateBlock, setSelectedUpdateBlock] = useState(null);

  const handleClose = () => {
    setActiveBlock(null);
    setShowTipTap(false);
    setShowImageBlock(false);
    setShowVideoBlock(false);
  };

  const fetchBlocks = async (baiHocID) => {
    try {
      const data = await getLessonResource(baiHocID);
      setBlocks(data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchLessons = async () => {
    try {
      const data = await getLesson(khoaHocID);
      setLessons(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchLessons();
  }, []);

  const handleDeleteResource = async (taiNguyenID, baiHocID) => {
    const res = await deleteLessonResource(taiNguyenID);
    if (!res) {
      alert("Something went wrong!");
      return;
    }
    await fetchBlocks(selectedLesson?.baiHocID);
  };

  const handleCreateText = async (html) => {
    try {
      const payload = {
        baiHocID: selectedLesson?.baiHocID,
        url: null,
        loaiTN: 1,
        text: html,
      };

      const res = await createTextBlock(payload);
      handleClose();
      setShowTipTap(false);
      if (!res) {
        alert("Something went wrong, please try again!");
        return;
      }
      await fetchBlocks(selectedLesson?.baiHocID);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateLesson = async (e) => {
    e.preventDefault();
    const payload = {
      tenBaiHoc: createLessonForm.tenBaiHoc,
      khoaHocID: khoaHocID,
    };
    const data = await createLesson(payload);
    if (!data) {
      alert("Something went wrong!");
      return;
    }
    await fetchLessons();
    setShowCreateLesson(false);
  };

  const handleDeleteLesson = async (baiHocID, index) => {
    const currentLessons = [...lessons];

    let newSelected = selectedLesson;

    if (selectedLesson?.baiHocID === baiHocID) {
      if (currentLessons.length === 1) {
        newSelected = null;
      } else if (index === currentLessons.length - 1) {
        newSelected = currentLessons[index - 1];
      } else {
        newSelected = currentLessons[index + 1];
      }
    }

    const data = await deleteLesson(baiHocID);

    if (!data) {
      alert("Something went wrong!");
      return;
    }

    await fetchLessons();

    setSelectedLesson(newSelected);

    if (newSelected?.baiHocID) {
      await fetchBlocks(newSelected.baiHocID);
    } else {
      setBlocks([]);
    }
  };

  const handleUpdateLesson = async (e) => {
    e.preventDefault();
    const payload = {
      baiHocID: selectedUpdateLesson.baiHocID,
      tenBaiHoc: updateLessonForm.tenBaiHoc,
    };
    const data = await updateLesson(payload);
    if (!data) {
      alert("Something went wrong!");
      return;
    }
    await fetchLessons();
    setShowUpdateLesson(false);
  };

  const handleSwapLessonPriority = async (index) => {
    if (index + 1 == lessons.length) {
      return;
    }
    const payload = {
      baiHoc1: lessons[index].baiHocID,
      baiHoc2: lessons[index + 1].baiHocID,
    };
    const res = await swapLessonPriority(payload);
    if (!res) {
      alert("Something went wrong!");
      return;
    }
    await fetchLessons();
  };

  const handleUpdateBlock = async (text) => {
    const payload = {
      taiNguyenID: selectedUpdateBlock?.taiNguyenID,
      loaiTN: selectedUpdateBlock?.loaiTN,
      text: text,
      url: selectedUpdateBlock?.url,
    };
    const res = await updateResourceBlock(payload);
    if (!res) {
      alert("Something went wrong!");
      return;
    }
    setShowUpdateText(false);
    setSelectedUpdateBlock(null);
    await fetchBlocks(selectedLesson?.baiHocID);
  };

  const handleSwapResourcePriority = async (index1, index2) => {
    if (index2 < 0 || index2 >= blocks.length) {
      return;
    }
    const payload = {
      taiNguyen1: blocks[index1].taiNguyenID,
      taiNguyen2: blocks[index2].taiNguyenID,
    };
    const res = await swapResourcePriority(payload);
    if (!res) {
      alert("Somethine went wrong!");
      return;
    }
    await fetchBlocks(selectedLesson?.baiHocID);
  };

  return (
    <div className="flex flex-col font-sans xl:text-sm 3xl:text-lg">
      <div className=" ml-1 flex-1 flex overflow-hidden">
        <div className="h-full bg-white shadow-lg mr-2 border border-gray-100 overflow-x-auto py-3 pr-3 pl-6">
          <button
            onClick={() => setShowCreateLesson(true)}
            className="w-full mb-3 px-3 py-2 bg-blue-500 hover:bg-blue-600 transition text-white"
          >
            Thêm bài học
          </button>

          <div>
            <div className="min-w-[200px] 3xl:min-w-[300px] flex flex-col gap-2 mt-5">
              {lessons.map((lesson, index) => (
                <div
                  key={lesson.baiHocID}
                  className="relative flex items-center gap-2"
                >
                  <div className="w-full group bg-gray-100">
                    <button
                      onClick={() => {
                        setSelectedLesson(lesson);
                        fetchBlocks(lesson.baiHocID);
                        handleClose();
                      }}
                      id={lesson.baiHocID}
                      className={`cursor-pointer w-full min-w-[200px] max-w-[200px] 3xl:min-w-[300px] 3xl:min-w-[300px] p-2 text-left border-1 border-l-3 overflow-hidden text-ellipsis whitespace-nowrap
                        group-hover:-translate-x-3 transition bg-white
                      ${
                        selectedLesson?.baiHocID == lesson.baiHocID
                          ? "border-blue-600 -translate-x-3"
                          : "border-l-gray-300 group-hover:border-l-blue-300 border-white"
                      }`}
                    >
                      {lesson.tenBaiHoc}
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      setShowUpdateLesson(true);
                      setSelectedUpdateLesson(lesson);
                    }}
                    className="text-green-600 p-1 hover:bg-green-100 hover:rotate-5 hover:scale-120 rounded-full transition"
                  >
                    <Pencil></Pencil>
                  </button>
                  <button
                    onClick={() => handleDeleteLesson(lesson.baiHocID, index)}
                    className="text-red-500 p-1 hover:scale-140 hover:rotate-5 transition"
                  >
                    <X></X>
                  </button>
                  <button
                    onClick={() => handleSwapLessonPriority(index)}
                    className="text-gray-500 hover:scale-150 hover:rotate-5 transition bg-gray-100 rounded-full"
                  >
                    <ChevronDown></ChevronDown>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="h-full bg-white shadow-lg border border-gray-100 overflow-x-auto">
          <div className="max-h-[90vh] overflow-y-auto px-10">
            <div className="w-[55vw] pt-3 pb-5">
              <div className="flex gap-5">
                <button
                  disabled={activeBlock !== null || !selectedLesson}
                  onClick={() => {
                    setShowTipTap(true);
                    setActiveBlock("text");
                  }}
                  className={`text-sm flex items-center gap-2 text-blue-500 border-1 border-blue-500 hover:bg-blue-500 hover:text-white transition px-2 py-1.5 ${activeBlock !== null || !selectedLesson ? "bg-gray-400 text-white border-white hover:bg-gray-400" : ""}`}
                >
                  <TextAlignCenter />
                  Thêm ký tự
                </button>
                <button
                  disabled={activeBlock !== null || !selectedLesson}
                  onClick={() => {
                    setShowImageBlock(true);
                    setActiveBlock("image");
                  }}
                  className={`text-sm flex items-center gap-2 text-blue-500 border-1 border-blue-500 hover:bg-blue-500 hover:text-white transition px-2 py-1.5 ${activeBlock !== null || !selectedLesson ? "bg-gray-400 text-white border-white hover:bg-gray-400" : ""}`}
                >
                  <Image />
                  Thêm hình ảnh
                </button>
                <button
                  disabled={activeBlock !== null || !selectedLesson}
                  onClick={() => {
                    setShowVideoBlock(true);
                    setActiveBlock("video");
                  }}
                  className={`text-sm flex items-center gap-2 text-blue-500 border-1 border-blue-500 hover:bg-blue-500 hover:text-white transition px-2 py-1.5 ${activeBlock !== null || !selectedLesson ? "bg-gray-400 text-white border-white hover:bg-gray-400" : ""}`}
                >
                  <Video />
                  Thêm video
                </button>
              </div>

              {showTipTap && (
                <TextBlock
                  onSave={handleCreateText}
                  onClose={() => {
                    handleClose();
                    setShowTipTap(false);
                  }}
                ></TextBlock>
              )}

              {showImageBlock && (
                <ImageBlock
                  baiHocID={selectedLesson.baiHocID}
                  onSave={() => {
                    handleClose();
                    setShowImageBlock(false);
                    fetchBlocks(selectedLesson.baiHocID);
                  }}
                  onClose={() => {
                    handleClose();
                    setShowImageBlock(false);
                  }}
                />
              )}

              {showVideoBlock && (
                <VideoBlock
                  baiHocID={selectedLesson.baiHocID}
                  onSave={() => {
                    handleClose();
                    setShowVideoBlock(false);
                    fetchBlocks(selectedLesson.baiHocID);
                  }}
                  onClose={() => {
                    handleClose();
                    setShowVideoBlock(false);
                  }}
                />
              )}

              <div className="w-full pt-5 pb-5 flex flex-col gap-5">
                {blocks.map((block, index) => {
                  switch (block.loaiTN) {
                    case 0:
                      return (
                        <div key={block.taiNguyenID} className="relative pt-2">
                          <div className="absolute top-2 right-2 flex gap-5">
                            <button
                              onClick={() => {
                                setShowUpdateText(true);
                                setSelectedUpdateBlock(block);
                              }}
                              className="text-gray-500 group"
                            >
                              <Pencil
                                size={22}
                                className="group-hover:text-blue-500 hover:scale-120 transition"
                              />
                            </button>
                            <button
                              className="text-gray-500 group"
                              onClick={() =>
                                handleSwapResourcePriority(index, index + 1)
                              }
                            >
                              <ChevronDown
                                size={25}
                                className="group-hover:text-blue-500 hover:scale-150 transition"
                              />
                            </button>
                            <button
                              className="text-gray-500 group"
                              onClick={() =>
                                handleSwapResourcePriority(index, index - 1)
                              }
                            >
                              <ChevronUp
                                size={25}
                                className="group-hover:text-green-500 hover:scale-150 transition"
                              />
                            </button>
                            <button
                              className="text-gray-500 group"
                              onClick={() =>
                                handleDeleteResource(
                                  block.taiNguyenID,
                                  selectedLesson?.baiHocID,
                                )
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
                            className="tiptap text-justify p-3 pl-6 border-l-5 border-green-600 mt-5"
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(block.text),
                            }}
                          />
                        </div>
                      );
                    case 1:
                      return (
                        <div key={index} className="relative pt-2">
                          <div className="absolute top-2 right-2 flex gap-5">
                            <button
                              className="text-gray-500 group"
                              onClick={() =>
                                handleSwapResourcePriority(index, index + 1)
                              }
                            >
                              <ChevronDown
                                size={25}
                                className="group-hover:text-blue-500 hover:scale-150 transition"
                              />
                            </button>
                            <button
                              className="text-gray-500 group"
                              onClick={() =>
                                handleSwapResourcePriority(index, index - 1)
                              }
                            >
                              <ChevronUp
                                size={25}
                                className="group-hover:text-green-500 hover:scale-150 transition"
                              />
                            </button>
                            <button
                              className="text-gray-500 group"
                              onClick={() =>
                                handleDeleteResource(
                                  block.taiNguyenID,
                                  selectedLesson?.baiHocID,
                                )
                              }
                            >
                              <X
                                size={25}
                                className="group-hover:text-red-500 hover:scale-150 transition"
                              />
                            </button>
                          </div>
                          <div className="p-3 pl-6 border-l-5 border-green-600">
                            <SecureImage
                              src={block.url}
                              alt=""
                              className="h-35 object-cover transform transition duration-300 hover:scale-105"
                            />
                          </div>
                        </div>
                      );

                    case 2:
                      return (
                        <div key={index} className="relative pt-2">
                          <div className="absolute top-2 right-2 flex gap-5">
                            <button
                              className="text-gray-500 group"
                              onClick={() =>
                                handleSwapResourcePriority(index, index + 1)
                              }
                            >
                              <ChevronDown
                                size={25}
                                className="group-hover:text-blue-500 hover:scale-150 transition"
                              />
                            </button>
                            <button
                              className="text-gray-500 group"
                              onClick={() =>
                                handleSwapResourcePriority(index, index - 1)
                              }
                            >
                              <ChevronUp
                                size={25}
                                className="group-hover:text-green-500 hover:scale-150 transition"
                              />
                            </button>
                            <button
                              className="text-gray-500 group"
                              onClick={() =>
                                handleDeleteResource(
                                  block.taiNguyenID,
                                  selectedLesson?.baiHocID,
                                )
                              }
                            >
                              <X
                                size={25}
                                className="group-hover:text-red-500 hover:scale-150 transition"
                              />
                            </button>
                          </div>
                          <div className="p-3 pl-6 border-l-5 border-green-600">
                            <SecureVideo
                              src={block.url}
                              alt=""
                              className="h-42 object-cover transform transition duration-300 hover:scale-105"
                            />
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

      {showCreateLesson && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md shadow-lg p-6 relative">
            <button
              onClick={() => setShowCreateLesson(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>
            <header className="text-xl font-bold mb-5">Tạo bài học mới</header>
            <form action="" onSubmit={handleCreateLesson}>
              <input
                type="text"
                className="w-full p-2 border-1 border-blue-500 outline-none"
                placeholder="Nhập tên bài học"
                name="tenBaiHoc"
                onChange={(e) =>
                  setCreateLessonForm({
                    ...createLessonForm,
                    [e.target.name]: e.target.value,
                  })
                }
                required
              />
              <div className="flex gap-1 mt-3">
                <button
                  type="submit"
                  className="w-full text-white p-2 bg-blue-500 hover:bg-blue-600 transition"
                >
                  Xác nhận
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateLesson(false)}
                  className="w-full text-white p-2 bg-[#cf345a] hover:bg-[#c71c46] transition"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showUpdateLesson && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md shadow-lg p-6 relative">
            <button
              onClick={() => setShowUpdateLesson(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>
            <header className="text-xl font-bold mb-5">Đổi tên bài học</header>
            <form action="" onSubmit={handleUpdateLesson}>
              <input
                type="text"
                className="w-full p-2 border-1 border-blue-500 outline-none"
                placeholder="Nhập tên bài học"
                name="tenBaiHoc"
                onChange={(e) =>
                  setUpdateLessonForm({
                    ...updateLessonForm,
                    [e.target.name]: e.target.value,
                  })
                }
                required
              />
              <div className="flex gap-1 mt-3">
                <button
                  type="submit"
                  className="w-full text-white p-2 bg-blue-500 hover:bg-blue-600 transition"
                >
                  Xác nhận
                </button>
                <button
                  type="button"
                  onClick={() => setShowUpdateLesson(false)}
                  className="w-full text-white p-2 bg-[#cf345a] hover:bg-[#c71c46] transition"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showUpdateText && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-5xl shadow-lg p-6 relative">
            <TextBlock
              content={selectedUpdateBlock?.text}
              onSave={handleUpdateBlock}
              onClose={() => {
                setShowUpdateText(false);
              }}
            ></TextBlock>
          </div>
        </div>
      )}
    </div>
  );
}
