import { useState, useMemo, useEffect } from "react";
import {
  UploadCloud,
  FileText,
  X,
  Trash2,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";
import { BASE_URL } from "../../../utils/apiConfig";
import { useToast } from "../../../contexts/ToastContext";

export default function RegisterMentorPage() {
  const { addToast } = useToast();

  const [file, setFile] = useState(null);
  const [saveName, setSaveName] = useState("");
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(0);

  const fetchApplication = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${BASE_URL}/api/learner/application/get`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        const data = await response.json();

        setStatus(data.trangThai);
        setSaveName(data.url || "");

        const fileRes = await fetch(
          `${BASE_URL}/api/learner/view-pdf/${data.url}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (!fileRes.ok) throw new Error("Không load được PDF");

        const blob = await fileRes.blob();
        const blobUrl = URL.createObjectURL(blob);

        setFile({
          name: data.url,
          isServerFile: true,
          url: blobUrl,
        });
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchApplication();
  }, []);

  useEffect(() => {
    return () => {
      if (file?.isServerFile && file?.url) {
        URL.revokeObjectURL(file.url);
      }
    };
  }, [file]);

  const currentPdfUrl = useMemo(() => {
    if (!file) return null;
    if (file.isServerFile) return file.url;
    return URL.createObjectURL(file);
  }, [file]);

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;
    if (selectedFile.type !== "application/pdf") {
      addToast("Chỉ chấp nhận file PDF!", "error");
      return;
    }
    setFile(selectedFile);
    setSaveName(selectedFile.name.replace(".pdf", ""));
    setStatus(-1);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || file.isServerFile) {
      addToast("Vui lòng chọn file mới trước khi gửi!", "error");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("tenHoSo", saveName);

    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/api/learner/mentor_application/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        },
      );

      if (response.ok) {
        fetchApplication();
        addToast("Gửi hồ sơ thành công!", "success");
        setStatus(3);
      } else {
        addToast("Gửi hồ sơ thất bại!", "error");
      }
    } catch (error) {
      addToast("Lỗi kết nối đến máy chủ!", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRegistration = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/learner/application/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (!response.ok) {
        addToast("Đã xảy ra lỗi khi xóa hồ sơ!", "error");
        return;
      }

      setFile(null);
      setSaveName("");
      setStatus(0);

      await fetchApplication();

      addToast("Đã xóa hồ sơ đăng ký thành công!", "success");
    } catch (error) {
      console.error("Lỗi xóa hồ sơ:", error);
      addToast("Lỗi kết nối máy chủ!", "error");
    }
  };

  const getStatusConfig = () => {
    switch (status) {
      case 0:
        return {
          percent: 50,
          color: "bg-blue-400",
          label: "Chờ duyệt",
          icon: <Clock size={16} className="text-blue-500" />,
        };
      case 1:
        return {
          percent: 75,
          color: "bg-blue-500",
          label: "Đã phê duyệt, chờ cấp quyền",
          icon: <Clock size={16} className="text-blue-500" />,
        };
      case 2:
        return {
          percent: 100,
          color: "bg-green-500",
          label: "Chấp nhận",
          icon: <CheckCircle size={16} className="text-green-500" />,
        };
      case 3:
        return {
          percent: 0,
          color: "bg-red-500",
          label: "Từ chối",
          icon: <AlertCircle size={16} className="text-red-500" />,
        };
      default:
        return {
          percent: 25,
          color: "bg-blue-200",
          label: "Chọn file",
          icon: <Clock size={16} className="text-blue-500" />,
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="flex items-center justify-center p-6 h-[90vh]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[60vw]">
        <div className="bg-white shadow p-4 flex items-center justify-center h-[80vh]">
          {currentPdfUrl ? (
            <iframe
              src={currentPdfUrl}
              title="PDF Preview"
              className="w-full h-full min-h-[77vh] border-0"
            />
          ) : (
            <p className="text-gray-400">Chưa có file để hiển thị</p>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-white shadow p-8 flex flex-col gap-4 items-center">
            <div className="text-center">
              <h1 className="text-xl font-bold">Đăng ký người hướng dẫn</h1>
              <p className="text-gray-500 text-sm">
                Tải lên hồ sơ PDF để xét duyệt
              </p>
            </div>

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              className={`w-full border-2 border-dashed px-10 py-10 flex flex-col items-center justify-center text-center transition 
                ${dragging ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
            >
              {!file ? (
                <>
                  <UploadCloud className="w-12 h-12 text-blue-500 mb-4" />
                  <p className="text-gray-600 mb-4">
                    Kéo & thả file PDF của bạn vào đây
                  </p>
                  <label className="cursor-pointer bg-blue-500 text-white px-6 py-2 hover:bg-blue-600 transition">
                    Chọn file
                    <input
                      type="file"
                      accept="application/pdf"
                      hidden
                      onChange={(e) => handleFile(e.target.files[0])}
                    />
                  </label>
                </>
              ) : (
                <div className="w-full max-w-sm">
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded border border-gray-200">
                    <div className="flex items-center gap-3">
                      <FileText className="text-red-500" />
                      <span className="text-gray-700 text-sm truncate max-w-[150px]">
                        {file.name}
                      </span>
                    </div>
                    <button
                      disabled={file?.isServerFile}
                      onClick={() => {
                        if (file?.isServerFile) return;
                        setFile(null);
                        setStatus(-1);
                      }}
                      className={`text-gray-400 ${
                        file?.isServerFile
                          ? "cursor-not-allowed opacity-50"
                          : "hover:text-red-500"
                      }`}
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <div className="mt-6 text-left">
                    <label className="text-xs font-semibold text-gray-500 uppercase">
                      Tên hồ sơ lưu trữ
                    </label>
                    <input
                      type="text"
                      value={saveName}
                      disabled={file?.isServerFile}
                      onChange={(e) => setSaveName(e.target.value)}
                      className="w-full border-b-2 border-blue-500 mt-1 outline-none p-2 bg-transparent focus:bg-blue-50 transition"
                      placeholder="Nhập tên lưu hồ sơ..."
                    />
                  </div>
                </div>
              )}
            </div>

            {status === 3 && file && (
              <button
                onClick={handleDeleteRegistration}
                className="flex items-center gap-2 text-red-500 hover:text-red-700 font-medium transition mt-2"
              >
                <Trash2 size={18} /> Xóa hồ sơ bị từ chối
              </button>
            )}

            <button
              onClick={handleSubmit}
              disabled={
                loading ||
                !file ||
                file.isServerFile ||
                status === 1 ||
                status === 3
              }
              className={`w-full py-3 px-10 mt-4 font-semibold transition duration-300 border-2
                ${
                  loading ||
                  !file ||
                  file.isServerFile ||
                  status === 1 ||
                  status === 3
                    ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                    : "text-blue-500 bg-white border-blue-500 hover:text-white hover:bg-blue-500"
                }`}
            >
              {status === 0
                ? "Đang đợi phê duyệt"
                : status === 1
                  ? "Phê duyệt hoàn tất, đợi cấp quyền"
                  : status === 2
                    ? "Đã cấp quyền"
                    : file?.isServerFile
                      ? "Hồ sơ đã bị xóa"
                      : "Gửi hồ sơ đăng ký"}
            </button>
          </div>

          <div className="bg-white shadow p-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                Tiến trình xử lý hồ sơ
              </h2>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-50 border border-gray-100">
                {config.icon}
                <span
                  className={`text-xs font-bold ${status === 3 ? "text-red-500" : "text-blue-500"}`}
                >
                  {config.label}
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden shadow-inner">
              <div
                className={`${config.color} h-full transition-all duration-1000 ease-out`}
                style={{ width: `${file ? config.percent : 0}%` }}
              />
            </div>
            <div className="flex justify-end mt-3">
              <p className="text-xs font-bold text-gray-500">
                {file ? config.percent : 0}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
