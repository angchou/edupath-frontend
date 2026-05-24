import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";

import { X } from "lucide-react";
import { BsStarFill } from "react-icons/bs";

import {
  getDemoLesson,
  getDemoResource,
  getCourseRatings,
} from "../../../services/courseService";
import SecureImage from "../../../components/SecureImage";
import SecureVideo from "../../../components/SecureVideo";

export default function DemoCoursePage() {
  const { khoaHocID } = useParams();
  const navigate = useNavigate();

  const [blocks, setBlocks] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [ratings, setRatings] = useState([]);

  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [courseCode, setCourseCode] = useState(null);

  const fetchLesson = async () => {
    const data = await getDemoLesson(khoaHocID);
    setLessons(data);
  };
  const fetchBlocks = async (baiHocID) => {
    const data = await getDemoResource(baiHocID);
    setBlocks(data);
  };
  const fetchRatings = async () => {
    const data = await getCourseRatings(khoaHocID);
    setRatings(data);
  };
  useEffect(() => {
    fetchLesson();
  }, []);
  useEffect(() => {
    fetchRatings();
  }, []);

  return (
    <div className="flex flex-col font-sans xl:text-sm 3xl:text-lg">
      <div className="p-1 flex-1 flex overflow-hidden">
        <div className="h-full bg-white shadow-sm mr-2 border border-gray-100 overflow-x-auto py-3 pr-3 pl-6">
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
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="h-full bg-white shadow-sm border border-gray-100 overflow-x-auto mr-2">
          <div className="h-[85vh] overflow-y-auto px-10">
            <div className="w-[40vw] pt-10 pb-10">
              <div className="w-full pb-5 flex flex-col">
                {blocks.map((block, index) => {
                  switch (block.loaiTN) {
                    case 0:
                      return (
                        <div key={block.taiNguyenID} className="relative">
                          <div
                            key={block.taiNguyenID}
                            className="tiptap text-justify p-3 pl-6"
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(block.text),
                            }}
                          />
                        </div>
                      );
                    case 1:
                      return (
                        <div key={block.taiNguyenID} className="relative">
                          <div className="p-3 pl-6 justify-center flex">
                            <button onClick={() => setSelectedImage(block.url)}>
                              <SecureImage
                                src={block.url}
                                alt=""
                                className="h-72 object-cover transform transition duration-300 hover:scale-102"
                              />
                            </button>
                          </div>
                        </div>
                      );

                    case 2:
                      return (
                        <div key={block.taiNguyenID} className="relative">
                          <div className="p-3 pl-6 justify-center flex">
                            <SecureVideo
                              src={block.url}
                              alt=""
                              className="h-72 object-cover transform transition duration-300"
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
        <div className="h-full bg-white shadow-sm border border-gray-100 overflow-x-auto">
          <div className="h-[85vh] overflow-y-auto px-5">
            <div className="w-[20vw] pt-10 pb-10">
              <div className="w-full flex flex-col items-center">
                <h2 className="font-black text-xl text-blue-500 mb-10">
                  Nhận xét khóa học
                </h2>
                <div className="w-full flex flex-col gap-5">
                  {ratings.map((rating, index) => {
                    return (
                      <div key={rating.phieuDanhGiaID} className="group">
                        <div className="cursor-default group-hover:translate-x-2 group-hover:border-blue-500 transition py-2 px-5 border-l-3 flex items-center gap-5 shadow-sm border-slate-200">
                          <div className="w-full">
                            <div className="text-sm">{rating.chiTiet}</div>
                            <div className="text-sm flex gap-2 mt-1 ml-1">
                              <span>{rating.hocVienID}</span>
                              <span>{rating.hoTen}</span>
                            </div>
                            <div className="text-sm ml-1">{rating.email}</div>
                          </div>
                          <div className="flex flex-col gap-1 items-center">
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((point, index) => {
                                return (
                                  <BsStarFill
                                    key={index}
                                    className={`${rating.diemDanhGia >= point ? "text-yellow-500" : "text-gray-200"}`}
                                  />
                                );
                              })}
                            </div>
                            <div className="text-sm">{rating.ngayTao}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
        <button
          onClick={() => navigate(`../paycheck/${khoaHocID}`)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-5 transform transition hover:scale-105 active:scale-100 flex items-center gap-2 animate-bounce"
        >
          Đăng ký khóa học ngay
        </button>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/30 bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <SecureImage
            src={selectedImage}
            alt=""
            className="h-[80%] max-w-[80%] rounded-lg transform scale-75 opacity-0 animate-zoomIn"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
