import { useState } from "react";

export default function SupportReportPage() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [embedUrl, setEmbedUrl] = useState("");

  const handleLoadReport = () => {
    // demo URL Power BI
    setEmbedUrl("https://app.powerbi.com/view?r=YOUR_REPORT_ID");
  };

  // 🔥 In đúng Power BI (mở tab riêng)
  const handlePrint = () => {
    if (!embedUrl) return;

    const newWindow = window.open(embedUrl, "_blank");
    if (newWindow) {
      newWindow.focus();
    }
  };

  return (
    <div className="bg-gray-50 flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-8">
          Báo cáo hỗ trợ
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border-b-1 px-4 py-2 outline-none focus:border-blue-500 w-full md:w-auto"
          />

          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border-b-1 px-4 py-2 outline-none focus:border-blue-500 w-full md:w-auto"
          />

          <select className="p-2 border-b-1 outline-none">
            <option value="">Tất cả trạng thái</option>
            <option value="done">Đã xử lý</option>
            <option value="processing">Đang xử lý</option>
            <option value="overdue">Quá hạn</option>
          </select>

          <button
            onClick={handleLoadReport}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition font-medium"
          >
            Thống kê
          </button>
        </div>

        {embedUrl && (
          <div className="w-full">
            <div className="w-full h-[600px] rounded-xl overflow-hidden border border-gray-200 shadow-sm">
              <iframe
                title="Power BI Report"
                src={embedUrl}
                className="w-full h-full"
                frameBorder="0"
                allowFullScreen
              />
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={handlePrint}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition"
              >
                In báo cáo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
