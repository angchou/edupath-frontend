import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";

import { X } from "lucide-react";

import { getLesson, getCourseResource } from "../../../services/courseService";
import SecureImage from "../../../components/SecureImage";
import SecureVideo from "../../../components/SecureVideo";

export default function CourseDetailPage() {
  const { khoaHocID } = useParams();

  const [blocks, setBlocks] = useState([]);
  const [lessons, setLessons] = useState([]);

  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [courseCode, setCourseCode] = useState(null);

  const fetchLesson = async () => {
    const data = await getLesson(khoaHocID);
    setLessons(data);
  };
  const fetchBlocks = async (baiHocID) => {
    const data = await getCourseResource(baiHocID);
    setBlocks(data);
  };
  useEffect(() => {
    fetchLesson();
  }, []);

  return (
    <div className="flex flex-col font-sans xl:text-sm 3xl:text-lg">
      <div className="p-1 flex-1 flex overflow-hidden">
        <div className="h-full bg-white shadow-lg mr-2 border border-gray-100 overflow-x-auto py-3 pr-3 pl-6">
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
        <div className="h-full bg-white shadow-sm border border-gray-100 overflow-x-auto">
          <div className="h-[85vh] overflow-y-auto px-20">
            <div className="w-[60vw] pt-10 pb-10">
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
