import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";

export default function DemoCoursePage() {
  const { khoaHocID } = useParams();

  // cần phải fetch api để kiểm tra nếu học viên có sở hữu khóa học -> tải tài nguyên của khóa học lên (đã được sắp xếp STT tăng dần)

  const blocks = [
    {
      taiNguyenID: "TN001",
      loaiTN: "text",
      STT: 1,
      text: `<h2 style="font-size:28px; font-weight:700; margin-bottom:12px;">🚀 Hành trình học tập hiệu quả</h2>
            <p style="font-size:16px; line-height:1.7; margin-bottom:10px;">
              Việc học không chỉ là tiếp thu kiến thức, mà còn là quá trình <strong>rèn luyện tư duy</strong>
              và xây dựng thói quen kỷ luật. Một người học tốt không phải là người học nhiều nhất,
              mà là người <em>học đúng cách</em>.
            </p>
            <h3 style="font-size:22px; font-weight:600; margin-top:16px; margin-bottom:8px;">📌 Nguyên tắc quan trọng</h3>
            <ul style="font-size:16px; padding-left:20px; margin-bottom:10px;">
              <li><strong>Tập trung:</strong> Loại bỏ các yếu tố gây xao nhãng</li>
              <li><strong>Thực hành:</strong> Áp dụng ngay sau khi học</li>
              <li><strong>Lặp lại:</strong> Ôn tập để ghi nhớ lâu dài</li>
            </ul>
            <h3 style="font-size:22px; font-weight:600; margin-top:16px; margin-bottom:8px;">💡 Gợi ý phương pháp</h3>
            <p style="font-size:16px; line-height:1.7; margin-bottom:10px;">
              Bạn có thể áp dụng phương pháp <strong style="font-size:17px;">Pomodoro</strong>:
              học tập trung trong 25 phút, nghỉ 5 phút và lặp lại chu kỳ này để tối ưu hiệu suất.
            </p>
            <blockquote style="font-size:15px; font-style:italic; border-left:4px solid #3b82f6; padding-left:12px; color:#555; margin:12px 0;">
              “Không có con đường tắt nào dẫn đến thành công — chỉ có sự kiên trì mỗi ngày.”
            </blockquote>
            <h3 style="font-size:22px; font-weight:600; margin-top:16px; margin-bottom:8px;">🎯 Kết luận</h3>
            <p style="font-size:16px; line-height:1.7;">
              Hãy bắt đầu từ những bước nhỏ, duy trì đều đặn mỗi ngày, vì chính những nỗ lực tưởng chừng rất nhỏ đó
              sẽ tạo nên sự khác biệt lớn trong tương lai.
            </p>`,
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
  ];

  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-gray-50 font-sans">
      <div className="p-5 flex-1 flex flex-col items-center overflow-hidden">
        <div className="h-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
          <div className="max-h-[77vh] overflow-y-auto pl-20 pr-10">
            <div className="max-w-[50vw]">
              {blocks.map((block, index) => {
                switch (block.loaiTN) {
                  case "text":
                    return (
                      <div
                        key={index}
                        className="prose max-w-none prose-h2:text-blue-600 prose-p:text-gray-700 prose-img:rounded-xl prose-strong:text-black mt-5"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(block.text),
                        }}
                      />
                    );

                  case "image":
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
        <button
          className="bg-blue-500 hover:bg-blue-600 transition p-4 mt-5 text-white font-bold rounded-xl"
          onClick={() => navigate(`../paycheck/${khoaHocID}`)}
        >
          ĐĂNG KÝ KHÓA HỌC
        </button>
      </div>
    </div>
  );
}
