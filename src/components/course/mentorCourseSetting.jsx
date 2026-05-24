import { useState, useEffect } from "react";

import {
  X,
  FileText,
  ShieldAlert,
  User,
  AlertCircle,
  CircleDot,
  Info,
} from "lucide-react";
import { BsStarFill } from "react-icons/bs";

import {
  uploadCourseCoverPhoto,
  updateCourse,
  requestOpenCourse,
  lockCourse,
  getCourseMarks,
  getCourseRatings,
} from "../../services/courseService";

import { useToast } from "../../contexts/ToastContext";

function ChangeCourseCoverPhoto({ onClose, onSave, khoaHocID }) {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const { addToast } = useToast();

  const handleSave = async () => {
    const res = await uploadCourseCoverPhoto(khoaHocID, file);
    if (!res) {
      addToast("Đã xảy ra lỗi khi tải ảnh, vui lòng thử lại", "error");
      return;
    }
    onSave();
    addToast("Thay đổi ảnh bìa của khóa học thành công", "success");
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Giới hạn 10MB (10 * 1024 * 1024 bytes)
    const maxSize = 10 * 1024 * 1024;

    if (file.size > maxSize) {
      addToast("Kích thước ảnh quá lớn! Vui lòng chọn ảnh dưới 10MB.", "");
      e.target.value = ""; // Reset input file
      return;
    }

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    const objectUrl = URL.createObjectURL(file);
    setFile(file);
    setPreview(objectUrl);
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>
        <h2 className="text-lg font-semibold mb-4">
          Thay đổi ảnh bìa khóa học
        </h2>

        <div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
            required
            id="upload"
          />

          <label
            htmlFor="upload"
            className="block w-full border border-dashed hover:text-blue-500 transition text-black font-semibold text-lg p-2 mb-3 text-center cursor-pointer"
          >
            Tải ảnh bìa khóa học
          </label>
        </div>

        {preview && (
          <div className="mb-4">
            <img
              src={preview}
              alt="preview"
              className="w-full h-48 object-cover"
            />
          </div>
        )}

        <div className="flex gap-2 mt-5">
          <button
            className="w-full bg-gray-400 text-white py-2 hover:bg-gray-500 transition"
            onClick={onClose}
          >
            Hủy
          </button>

          <button
            className="w-full bg-blue-500 text-white py-2 hover:bg-blue-600 transition"
            onClick={handleSave}
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}

function ChangeCourseInformation({ onClose, onSave, khoaHoc }) {
  const [form, setForm] = useState({
    tenKH: "",
    loaiKH: 0,
    moTa: "",
    mucPhi: 0,
  });
  const { addToast } = useToast();

  useEffect(() => {
    setForm({
      tenKH: khoaHoc.tenKH || "",
      loaiKH: khoaHoc.loaiKH,
      moTa: khoaHoc.moTa || "",
      mucPhi: khoaHoc.mucPhi || 0,
    });
  }, []);

  const buildPayload = () => {
    return {
      khoaHocID: khoaHoc.khoaHocID,
      tenKH: form.tenKH,
      loaiKH: Number(form.loaiKH),
      moTa: form.moTa,
      mucPhi: Number(form.mucPhi),
    };
  };
  const handleSave = async (e) => {
    e.preventDefault();

    const payload = buildPayload();
    const res = await updateCourse(payload);
    if (!res) {
      addToast(
        "Đã xảy ra lỗi không thể lưu thông tin mới của khóa học, vui lòng thử lại",
        "error",
      );
      return;
    }
    onSave();
    addToast("Thay đổi thông tin của khóa học thành công", "success");
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>
        <h2 className="text-lg font-semibold mb-4">
          Thay đổi thông tin khóa học
        </h2>

        <form action="" className="flex flex-col gap-2" onSubmit={handleSave}>
          <input
            name="tenKH"
            placeholder="Tên khóa học"
            value={form.tenKH}
            onChange={(e) => setForm({ ...form, tenKH: e.target.value })}
            className="p-2 w-full outline-none border-b-1 focus:border-blue-500"
            required
          />
          <textarea
            name="moTa"
            rows={4}
            minLength={50}
            maxLength={300}
            placeholder="Mô tả khóa học (tối thiểu 50 ký tự)"
            value={form.moTa}
            onChange={(e) => setForm({ ...form, moTa: e.target.value })}
            className="p-2 outline-none focus:border-blue-500 resize-none bg-gray-100 rounded-lg"
            required
          />
          <div className="relative">
            <input
              type="text"
              name="mucPhi"
              value={
                form.mucPhi ? Number(form.mucPhi).toLocaleString("vi-VN") : ""
              }
              onChange={(e) => {
                const raw = e.target.value.replace(/\D/g, "");
                setForm({ ...form, mucPhi: raw });
              }}
              placeholder="Mức phí"
              className="p-2 w-full outline-none border-b-1 focus:border-blue-500"
              required
            />
            <div className="absolute top-1 right-1 mt-1 mr-5">
              <p>Đồng</p>
            </div>
          </div>
          <select
            name="loaiKH"
            value={form.loaiKH}
            onChange={(e) => setForm({ ...form, loaiKH: e.target.value })}
            className="w-full p-2 outline-none border-b-1"
            required
          >
            <option value="" disabled>
              Loại khóa học
            </option>

            <option value={0}>Du học</option>
            <option value={1}>CV</option>
          </select>

          <div className="flex gap-2 mt-5">
            <button
              type="button"
              className="w-full bg-gray-400 text-white py-2 hover:bg-gray-500 transition"
              onClick={onClose}
            >
              Hủy
            </button>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 hover:bg-blue-600 transition"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function RequestOpenCourse({ onClose, onSave, khoaHoc }) {
  const [agreed, setAgreed] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const { addToast } = useToast();

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleSubmit = async () => {
    if (!agreed || countdown > 0) return;
    const res = await requestOpenCourse(khoaHoc.khoaHocID);
    if (!res) {
      addToast("Đã xảy ra lỗi, vui lòng thử lại!", "error");
      return false;
    }
    addToast(
      "Đã gửi yêu cầu kiểm duyệt khóa học, khóa học của bạn sẽ sớm được xem xét!",
      "success",
    );
    onSave();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-xl p-6 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-semibold mb-4">
          Yêu cầu mở công khai khóa học
        </h2>

        <p className="font-semibold text-red-600">
          Vui lòng đọc kỹ và đồng ý với các điều khoản trước khi tiếp tục.
        </p>

        <p>
          Đây là bước để bạn gửi yêu cầu mở công khai khóa học. Hãy đảm bảo rằng
          bạn đã kiểm tra kỹ thông tin khóa học cũng như nội dung của từng bài
          học.
        </p>

        <p>
          Sau khi gửi yêu cầu mở khóa học "{khoaHoc.tenKH}", bạn sẽ cần chờ tối
          đa <b>3 ngày</b> để chúng tôi tiến hành xem xét. Trong thời gian này,
          <i className="m-1">
            bạn sẽ không thể gửi thêm yêu cầu mới cho đến khi có kết quả cuối
            cùng. Đồng thời bạn cũng không thể thay đổi bất kỳ thông tin gì của
            khóa học.
          </i>
        </p>

        <p>
          Nếu khóa học bị từ chối, bạn có thể chỉnh sửa lại nội dung và gửi yêu
          cầu xét duyệt lại.
        </p>

        <p className="font-semibold">
          Kết quả xét duyệt sẽ được thông báo đến bạn thông qua hệ thống thông
          báo.
        </p>

        <p>
          Mọi hành vi không phù hợp hoặc vi phạm tiêu chuẩn cộng đồng trong khóa
          học sẽ bị xử lý.{" "}
          <b>Hãy cân nhắc kỹ nội dung, ngôn từ và hình ảnh sử dụng</b>. Trong
          các trường hợp vi phạm nghiêm trọng, chúng tôi có thể tạm ngưng đăng
          ký khóa học, xóa khóa học, hoặc thậm chí{" "}
          <b className="text-red-500">khóa tài khoản vĩnh viễn</b>.
        </p>

        <div className="mt-4 flex items-center gap-2">
          <input
            type="checkbox"
            id="agree"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="accent-blue-500 cursor-pointer"
          />
          <label htmlFor="agree" className="cursor-pointer">
            Tôi đã đọc và đồng ý với các điều khoản
          </label>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!agreed || countdown > 0}
          className={`mt-6 w-full py-2 rounded text-white transition ${
            !agreed || countdown > 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {countdown > 0
            ? `Vui lòng chờ ${countdown}s`
            : "Đồng ý và gửi yêu cầu"}
        </button>
      </div>
    </div>
  );
}

function RequestLockCourse({ onClose, onSave, khoaHoc }) {
  const [agreed, setAgreed] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const { addToast } = useToast();

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleSubmit = async () => {
    if (!agreed || countdown > 0) return;
    const res = await lockCourse(khoaHoc.khoaHocID);
    if (!res) {
      addToast("Đã xảy ra lỗi, vui lòng thử lại!", "error");
      return false;
    }
    addToast("Thành công khóa đăng ký mới khóa học!", "success");
    onSave();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-xl p-6 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-semibold mb-4">
          Khóa đăng ký mới khóa học {khoaHoc.tenKH}
        </h2>

        <p className="font-semibold text-red-600">
          Vui lòng đọc kỹ và đồng ý với các điều khoản trước khi tiếp tục.
        </p>

        <p>
          Đây là bước để bạn khóa đăng ký mới khóa học, việc này sẽ không cho
          phép bất kì ai có thể thấy hoặc đăng ký khóa học của bạn nữa. Những
          học viên đang tham gia khóa học sẽ không bị ảnh hưởng, họ vẫn sẽ thấy
          và được quyền xem khóa học này.
        </p>
        <p>
          Khi thực hiện khóa đăng ký mới thành công, nếu bạn muốn mở công khai
          khóa học bạn sẽ cần phải yêu cầu mở công khai khóa học. Chúng tôi sẽ
          kiểm duyệt lại khóa học của bạn.
        </p>

        <div className="mt-4 flex items-center gap-2">
          <input
            type="checkbox"
            id="agree"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="accent-blue-500 cursor-pointer"
          />
          <label htmlFor="agree" className="cursor-pointer">
            Tôi đã đọc và đồng ý với các điều khoản
          </label>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!agreed || countdown > 0}
          className={`mt-6 w-full py-2 rounded text-white transition ${
            !agreed || countdown > 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {countdown > 0
            ? `Vui lòng chờ ${countdown}s`
            : "Đồng ý và gửi yêu cầu"}
        </button>
      </div>
    </div>
  );
}

function ViewCourseMarks({ onClose, khoaHoc }) {
  const { addToast } = useToast();

  const [markList, setMarkList] = useState([]);

  const fetchCourseMarks = async () => {
    const data = await getCourseMarks(khoaHoc.khoaHocID);
    setMarkList(data);
  };

  useEffect(() => {
    fetchCourseMarks();
  }, []);

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full h-full shadow-2xl flex flex-col overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <FileText size={24} />
            </div>
            <div>
              <h2 className="text font-bold text-gray-800">
                Lịch sử đánh dấu khóa học
              </h2>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                {khoaHoc.tenKH} — Mã: {khoaHoc.khoaHocID}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-200 rounded-full transition text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white">
          {markList && markList.length > 0 ? (
            markList.map((phieu, index) => (
              <div
                key={phieu.phieuDanhDauID}
                className={`
                  group border border-gray-100 px-5 py-2 hover:shadow-md transition-all duration-300 bg-white relative overflow-hidden
                  ${phieu.mucDanhDau === 0 ? "hover:border-blue-200" : phieu.mucDanhDau === 1 ? "hover:border-yellow-200" : "hover:border-red-200"}
                  `}
              >
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                    phieu.mucDanhDau === 0
                      ? "bg-blue-400"
                      : phieu.mucDanhDau === 1
                        ? "bg-amber-400"
                        : "bg-red-500"
                  }`}
                />

                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      #{phieu.phieuDanhDauID}
                    </span>
                    <span
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs   font-bold uppercase tracking-wide ${
                        phieu.mucDanhDau === 0
                          ? "bg-blue-50 text-blue-600"
                          : phieu.mucDanhDau === 1
                            ? "bg-amber-50 text-amber-600"
                            : "bg-red-50 text-red-600"
                      }`}
                    >
                      {phieu.mucDanhDau === 0 && <Info size={14} />}
                      {phieu.mucDanhDau === 1 && <AlertCircle size={14} />}
                      {phieu.mucDanhDau === 2 && <ShieldAlert size={14} />}

                      {phieu.mucDanhDau === 0
                        ? "Yêu cầu chỉnh sửa"
                        : phieu.mucDanhDau === 1
                          ? "Cảnh báo chặn"
                          : "Cảnh báo xóa"}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-gray-700">
                    <User size={14} />
                    <span className="text-xs font-medium">
                      NV: {phieu.nhanVienID}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-700 leading-relaxed bg-gray-50/50 p-2 rounded-lg">
                    "{phieu.moTa}"
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 flex flex-col items-center justify-center text-gray-400">
              <FileText size={48} strokeWidth={1} className="mb-3 opacity-20" />
              <p>Khóa học này chưa có phiếu đánh dấu nào.</p>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end">
          <button
            onClick={handleClose}
            className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition font-semibold text-sm shadow-sm"
          >
            Đóng danh sách
          </button>
        </div>
      </div>
    </div>
  );
}

function ViewCourseRatings({ onClose, khoaHoc }) {
  const [phieuList, setPhieuList] = useState([]);

  const fetchCourseRatings = async () => {
    const data = await getCourseRatings(khoaHoc.khoaHocID);
    setPhieuList(data);
  };

  useEffect(() => {
    fetchCourseRatings();
  }, []);

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full h-full flex flex-col overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <FileText size={24} />
            </div>
            <div>
              <h2 className="font-bold text-gray-800">Đánh giá khóa học</h2>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                {khoaHoc.tenKH} — Mã: {khoaHoc.khoaHocID}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-200 rounded-full transition text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-white">
          {phieuList && phieuList.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {phieuList.map((phieu, index) => (
                <div key={phieu.phieuDanhGiaID} className="group">
                  <div className="h-full cursor-default group-hover:translate-x-2 group-hover:border-blue-500 group-hover:border-b transition py-2 px-5 border-l-4 flex flex-col justify-between gap-2 shadow-sm border-slate-200 bg-white">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-blue-500 uppercase tracking-wider">
                          Mã học viên: {phieu.hocVienID}
                        </span>
                        <span className="font-bold text-slate-800 text-sm">
                          {phieu.hoTen}
                        </span>
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((point) => (
                            <BsStarFill
                              key={point}
                              size={20}
                              className={`${
                                phieu.diemDanhGia >= point
                                  ? "text-yellow-500"
                                  : "text-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-400">
                          {phieu.ngayTao}
                        </span>
                      </div>
                    </div>

                    <div className="text-sm text-slate-600 leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">
                      "{phieu.chiTiet}"
                    </div>

                    <div className="pt-2 border-t border-slate-50 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-blue-500 mt-0.5"></div>
                      <span className="text-xs text-gray-400 truncate group-hover:text-blue-500">
                        {phieu.email}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 flex flex-col items-center justify-center text-gray-400">
              <FileText size={48} strokeWidth={1} className="mb-3 opacity-20" />
              <p>Khóa học này chưa có phiếu đánh giá nào.</p>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end">
          <button
            onClick={handleClose}
            className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition font-semibold text-sm shadow-sm"
          >
            Đóng danh sách
          </button>
        </div>
      </div>
    </div>
  );
}

export {
  ChangeCourseCoverPhoto,
  ChangeCourseInformation,
  RequestOpenCourse,
  RequestLockCourse,
  ViewCourseMarks,
  ViewCourseRatings,
};
