import { useState } from "react";
import { CirclePlus } from "lucide-react";

export default function AddCourseCard({ onAdd }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    tenKhoaHoc: "",
    loaiKH: "",
    moTa: "",
    mucPhi: "",
    SLHV: null,
    anhBia: "",
  });

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("file", file);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);

    if (!form.tenKhoaHoc) return;

    onAdd(form);
    setIsOpen(false);

    setForm({
      tenKhoaHoc: "",
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
          name="tenKhoaHoc"
          placeholder="Tên khóa học"
          value={form.tenKhoaHoc}
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

            <option value="du_hoc">Du học</option>
            <option value="cv">CV</option>
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
                tenKhoaHoc: "",
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
