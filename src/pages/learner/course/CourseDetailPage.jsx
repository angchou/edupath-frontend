import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";

export default function CourseDetailPage() {
  const { khoaHocID } = useParams();

  // cần phải fetch api để kiểm tra nếu học viên có sở hữu khóa học -> tải tài nguyên của khóa học lên (đã được sắp xếp STT tăng dần)

  const blocks = [
    {
      taiNguyenID: "TN001",
      loaiTN: "text",
      STT: 1,
      text: `<blockquote><p>This is a basic paragraph!</p></blockquote><p><span style="font-size: 16px;"><strong>Tôi không thể tưởng tượng nổi là chuyện này có thể diễn ra như thế này</strong></span></p><p>Nhưng mọi chuyện đã vượt quá tầm kiểm soát rồi. Các bạn nên <mark>chú ý vào đoạn này</mark> nhé, đừng để mất cơ hội:</p><ol><li><p>Chuyện</p></li><li><p>Là</p></li><li><p>Như</p></li><li><p>Thế</p></li><li><p>Này</p></li></ol><table style="min-width: 50px;"><colgroup><col style="min-width: 25px;"><col style="min-width: 25px;"></colgroup><tbody><tr><td colspan="2" rowspan="1"><p>Khung đáp án</p></td></tr><tr><td colspan="1" rowspan="1"><p>A. Đáp án A là đúng</p></td><td colspan="1" rowspan="1"><p>C. Không cái nào đúng</p></td></tr><tr><td colspan="1" rowspan="1"><p>B. Tất cả đều đúng</p></td><td colspan="1" rowspan="1"><p>D. Đáp án D là đúng</p></td></tr></tbody></table><p></p>`,
      url: null,
      khoaHocID: "KH001",
    },
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
    {
      taiNguyenID: "TN003",
      loaiTN: "video",
      STT: 3,
      text: null,
      url: "nothing",
      khoaHocID: "KH001",
    },
  ];

  return (
    <div className="flex flex-col bg-gray-50 font-sans">
      <div className="p-5 flex-1 flex flex-col items-center overflow-hidden">
        <div className="h-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
          <div className="max-h-[77vh] overflow-y-auto px-20">
            <div className="max-w-[50vw] pt-10 pb-5">
              {blocks.map((block, index) => {
                switch (block.loaiTN) {
                  case "text":
                    return (
                      <div
                        key={index}
                        className="tiptap text-justify"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(block.text),
                        }}
                      />
                    );
                  case "image":
                    return (
                      <div key={index} className="w-full flex mt-5">
                        <img
                          src={block.url}
                          alt=""
                          className="max-h-[50vh] w-auto object-contain rounded-xl"
                        />
                      </div>
                    );

                  case "video":
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
  );
}
