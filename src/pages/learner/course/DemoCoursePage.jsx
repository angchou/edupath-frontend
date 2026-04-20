import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";
import { LockKeyhole, UnlockKeyhole } from "lucide-react";
import { FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import { getCourseResource } from "../../../services/courseService";

export default function DemoCoursePage() {
  const { khoaHocID } = useParams();
  const [blocks, setBlocks] = useState([]);
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const data = await getCourseResource(khoaHocID);
        console.log(data);
        setBlocks(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBlocks();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="flex flex-row bg-gray-50 font-sans">
      <div className="w-full p-5 basis-128 flex-1 flex flex-col items-center overflow-hidden">
        <div className="w-full h-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
          <div className="max-h-[77vh] overflow-y-auto pl-20 pr-10">
            <div className="max-w-[50vw] py-10">
              {blocks.map((block, index) => {
                switch (block.loaiTN) {
                  case 1:
                    return (
                      <div
                        key={index}
                        className="tiptap prose max-w-none prose-h2:text-blue-600 prose-p:text-gray-700 prose-img:rounded-xl prose-strong:text-black mt-5"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(block.text),
                        }}
                      />
                    );

                  case 2:
                    return (
                      <div
                        key={index}
                        className="w-full flex justify-left mt-5"
                      >
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
        <button
          className="bg-blue-500 hover:bg-blue-600 transition p-4 mt-5 text-white font-bold rounded-xl"
          onClick={() => navigate(`../paycheck/${khoaHocID}`)}
        >
          ĐĂNG KÝ KHÓA HỌC
        </button>
      </div>
      <div className="p-5 basis-64 flex-1 flex flex-col items-center overflow-hidden">
        <div className="w-full h-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
          <div className="max-h-[77vh] overflow-y-auto pl-20 pr-10">
            <div className="flex flex-col gap-5 py-10">
              <header className="text-2xl font-bold mt-5">
                <h1>CÁC ĐÁNH GIÁ KHÓA HỌC</h1>
              </header>
              <div className="border border-gray-300 mb-7"></div>
              {ratings.map((rating) => (
                <div key={rating.phieuDanhGiaID} className="group">
                  <div className="group-hover:translate-x-2 hover:shadow-lg transition border-l-5 border-blue-500 p-3 flex items-center justify-between gap-1">
                    <div>
                      <div className="font-bold">
                        {rating.hoTen} - {rating.userID}
                      </div>
                      <div>
                        <span className="font-bold">Mô tả: </span>
                        <p className="pr-5">{rating.moTa}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 p-2 pr-5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          size={30}
                          className={`text-gray-300 $ ${star <= rating.diemDanhGia ? "text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
