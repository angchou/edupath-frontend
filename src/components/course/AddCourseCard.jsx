import { useState } from "react";
import { CirclePlus } from "lucide-react";
import {
  createCourse,
  uploadCourseCoverPhoto,
} from "../../services/courseService";

export default function AddCourseCard({ onAdd }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [form, setForm] = useState({
    tenKH: "",
    loaiKH: "",
    moTa: "",
    mucPhi: "",
    slhv: null,
    anhBia: "",
  });
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Giới hạn 10MB (10 * 1024 * 1024 bytes)
    const maxSize = 10 * 1024 * 1024;

    if (file.size > maxSize) {
      alert("Kích thước ảnh quá lớn! Vui lòng chọn ảnh dưới 5MB.");
      e.target.value = ""; // Reset input file
      return;
    }

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    const objectUrl = URL.createObjectURL(file);
    setFile(file);
    setPreview(objectUrl);

    const formData = new FormData();
    formData.append("file", file);
  };
  const buildPayload = () => {
    return {
      tenKH: form.tenKH,
      loaiKH: form.loaiKH,
      moTa: form.moTa,
      mucPhi: Number(form.mucPhi),
      slhv: Number(form.slhv),
    };
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = buildPayload();
    console.log(payload);

    // create course
    const newCourseID = await createCourse(payload);
    console.log(newCourseID);

    // upload cover photo
    if (newCourseID) {
      const fetchImage = await uploadCourseCoverPhoto(newCourseID, file);
      console.log("Successed!");
    } else {
      console.log("Failed uploading photo!");
    }

    // reset :>
    onAdd(form);
    setIsOpen(false);
    setForm({
      tenKH: "",
      loaiKH: "",
      moTa: "",
      mucPhi: "",
      SLHV: null,
      anhBia: "",
    });
    setPreview(null);
  };

  if (!isOpen) {
    return (
      <div
        onClick={() => setIsOpen(true)}
        className="group h-full bg-white rounded-2xl shadow hover:shadow-lg transition flex items-center justify-center cursor-pointer border-2 border-dashed border-gray-300 hover:border-blue-400"
      >
        <span className="text-5xl text-gray-400 hover:text-blue-500 transition">
          <CirclePlus className="size-20 group-hover:text-blue-500 transition" />
        </span>
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white rounded-2xl shadow p-5 flex flex-col h-full gap-2">
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
          required
          id="upload"
        />

        <label
          htmlFor="upload"
          className="block w-full border border-dashed hover:text-blue-500 transition text-black font-semibold text-lg p-2 rounded-xl mb-3 text-center cursor-pointer"
        >
          Tải ảnh bìa khóa học
        </label>

        {preview && (
          <img
            src={preview}
            className="w-full h-40 object-cover rounded-lg mb-2"
          />
        )}

        <input
          name="tenKH"
          placeholder="Tên khóa học"
          value={form.tenKH}
          onChange={handleChange}
          className="p-2 outline-none border-b-1 focus:border-blue-500"
          required
        />

        <input
          type="text"
          name="mucPhi"
          value={form.mucPhi ? Number(form.mucPhi).toLocaleString("vi-VN") : ""}
          onChange={(e) => {
            const raw = e.target.value.replace(/\D/g, "");
            setForm({ ...form, mucPhi: raw });
          }}
          placeholder="Mức phí"
          className="p-2 outline-none border-b-1 focus:border-blue-500"
          required
        />

        <textarea
          name="moTa"
          rows={4}
          minLength={50}
          maxLength={300}
          placeholder="Mô tả khóa học (tối thiểu 50 ký tự)"
          value={form.moTa}
          onChange={handleChange}
          className="p-2 outline-none focus:border-blue-500 resize-none bg-gray-100 rounded-lg"
          required
        />

        <div className="flex gap-2">
          <select
            name="loaiKH"
            value={form.loaiKH}
            required
            onChange={handleChange}
            className="w-full p-2 outline-none rounded-sm"
          >
            <option value="" disabled>
              Loại khóa học
            </option>

            <option value={1}>Du học</option>
            <option value={2}>CV</option>
          </select>

          <select
            name="SLHV"
            value={form.SLHV ?? ""}
            required
            onChange={(e) => {
              const value = e.target.value;
              setForm({
                ...form,
                SLHV: value ? Number(value) : null,
              });
            }}
            className="w-full p-2 outline-none rounded-sm"
          >
            <option value="" disabled>
              Số lượng học viên
            </option>

            <option value={50}>50 học viên</option>
            <option value={75}>75 học viên</option>
            <option value={100}>100 học viên</option>
            <option value={150}>150 học viên</option>
          </select>
        </div>

        <div className="flex gap-1 mt-auto">
          <button
            type="submit"
            className="w-full flex-1 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-xl transition font-semibold"
          >
            Đồng ý
          </button>

          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              setForm({
                tenKH: "",
                loaiKH: "",
                moTa: "",
                mucPhi: "",
                SLHV: null,
                anhBia: "",
              });
              setPreview(null);
            }}
            className="w-full h-full flex-1 bg-gray-400 hover:bg-gray-500 text-white p-2 rounded-xl transition font-semibold"
          >
            Hủy
          </button>
        </div>
      </div>
    </form>
  );
}
