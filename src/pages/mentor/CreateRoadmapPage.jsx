import { useState, useEffect, lazy } from "react";
import { motion, AnimatePresence, number } from "framer-motion";
import { Pencil, Trash2, Plus, Check, X } from "lucide-react"; // Thêm Check và X

import { useToast } from "../../contexts/ToastContext";

import {
  saveRoadmap,
  getMyShareRoadmap,
  publicRoadmap,
  saveRoadmapDesc,
} from "../../services/roadMapService";

export default function CreateRoadmapPage() {
  const [loTrinhID, setLoTrinhID] = useState("");
  const [trangThai, setTrangThai] = useState(-1);
  const [steps, setSteps] = useState([]);
  const [active, setActive] = useState(0);
  const { addToast } = useToast();

  const [showEditBubble, setShowEditBubble] = useState(false);
  const [moTaTongQuan, setMoTaTongQuan] = useState("");
  const [tempMoTa, setTempMoTa] = useState("");

  const fetchData = async () => {
    try {
      const data = await getMyShareRoadmap();
      setLoTrinhID(data.loTrinhID);
      setTrangThai(Number(data.trangThai));
      setSteps(data.danhSachDauViec);
      setMoTaTongQuan(data.moTa || "");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const buildPayload = () => {
    return {
      loTrinhID: loTrinhID,
      danhSachDauViec: steps.map((item) => ({
        dauViecID: item.dauViecID,
        tenDauViec: item.tenDauViec,
        moTa: item.moTa,
        stt: item.stt,
      })),
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = buildPayload();
    const res = await saveRoadmap(payload);
    if (!res) {
      addToast("Cập nhật lộ trình thất bại", "error");
      return;
    }
    addToast("Cập nhật lộ trình thành công", "success");
    await fetchData();
  };

  const handlePublic = async (e) => {
    e.preventDefault();
    const res = await publicRoadmap(loTrinhID);
    if (!res) {
      addToast(
        "Chưa thay đổi được trạng thái của lộ trình, vui lòng thử lại",
        "",
      );
      return;
    }
    if (trangThai == 1) {
      addToast(
        "Thành công tắt công khai lộ trình, mọi người sẽ không thể xem lộ trình của bạn nữa",
        "success",
      );
    } else {
      addToast(
        "Thành công mở công khai lộ trình, bây giờ mọi người có thể xem và lấy mẫu lộ trình của bạn",
        "success",
      );
    }

    await fetchData();
  };

  const handleAdd = () => {
    const newSTT = steps.length == 0 ? 0 : steps[steps.length - 1].stt;

    const newStep = {
      dauViecID: null,
      tenDauViec: "Bước mới",
      moTa: "Mô tả...",
      stt: newSTT + 10,
    };

    const newSteps = [...steps, newStep];

    setSteps(newSteps);
    setActive(newSteps.length - 1);
  };

  const handleAddBefore = () => {
    const curr = steps[active].stt;
    const prev = active - 1 >= 0 ? steps[active - 1].stt : 0;

    const newStep = {
      dauViecID: null,
      tenDauViec: "Bước mới",
      moTa: "Mô tả...",
      stt: Math.round((curr + prev) / 2),
    };

    const newSteps = [
      ...steps.slice(0, active),
      newStep,
      ...steps.slice(active),
    ];
    setSteps(newSteps);
    setActive(active);
  };

  const handleAddAfter = () => {
    const curr = steps[active].stt;
    const next = active + 1 < steps.length ? steps[active + 1].stt : 0;

    const newStep = {
      dauViecID: null,
      tenDauViec: "Bước mới",
      moTa: "Mô tả...",
      stt: Math.round((curr + next) / 2),
    };

    const newSteps = [
      ...steps.slice(0, active + 1),
      newStep,
      ...steps.slice(active + 1),
    ];
    setSteps(newSteps);
    setActive(active + 1);
  };

  const handleDelete = (index) => {
    const newSteps = steps.filter((_, i) => i !== index);

    setSteps(newSteps);

    if (newSteps.length === 0) {
      setActive(0);
      return;
    }

    if (active >= newSteps.length) {
      setActive(newSteps.length - 1);
    } else if (active > index) {
      setActive(active - 1);
    }
  };

  const handleUpdate = (field, value) => {
    const updatedSteps = [...steps];
    updatedSteps[active][field] = value;
    setSteps(updatedSteps);
  };

  const handleEdit = (index, newData) => {
    const newSteps = [...steps];
    newSteps[index] = {
      ...newSteps[index],
      ...newData,
    };

    setSteps(newSteps);
  };

  const handleSaveDesc = async () => {
    const payload = {
      moTa: tempMoTa,
      loTrinhID: loTrinhID,
    };
    const res = await saveRoadmapDesc(payload);
    setShowEditBubble(false);
    if (!res) {
      addToast("Đã xảy ra lỗi, vui lòng thử lại", "erroe");
      return;
    }

    await fetchData();
    addToast("Đã ghi nhận thay đổi mô tả", "success");
  };

  return (
    <div className="p-10 h-[90vh] flex flex-col items-center justify-between font-sans text-slate-800">
      <div className="w-full flex flex-col items-center">
        <h1 className="text-4xl font-extrabold mb-5 tracking-tight text-blue-500 uppercase">
          Chia sẻ lộ trình học tập
        </h1>
        <h1 className="text-xl font-extrabold mb-25 tracking-tight text-blue-500 uppercase">
          Tạo 1 lộ trình học tập và chia sẻ cho mọi người
        </h1>

        <div className="relative w-full max-w-6xl">
          <div className="absolute top-6 left-6 right-6 h-1.5 z-0">
            <div className="absolute inset-0 bg-gray-200 rounded-full" />
          </div>

          <div className="flex justify-between relative z-20">
            {steps.map((step, index) => {
              const isCompleted = index === active;
              const isCurrent = index === active;

              return (
                <div
                  key={step.dauViecID}
                  className="flex flex-col items-center flex-1"
                >
                  <div className="relative">
                    <AnimatePresence>
                      {isCurrent && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.8 }}
                          className="absolute -top-14 left-1/2 -translate-x-1/2 flex bg-white shadow-xl border border-gray-100 rounded-full p-1 z-30"
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddBefore();
                            }}
                            className="p-2 mr-2 hover:bg-blue-50 rounded-full text-blue-600 transition-colors"
                          >
                            <Plus size={20} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(index);
                            }}
                            className="p-2 mr-2 hover:bg-red-50 rounded-full text-red-600 transition-colors"
                          >
                            <Trash2 size={20} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddAfter();
                            }}
                            className="p-2 hover:bg-green-50 rounded-full text-green-600 transition-colors"
                          >
                            <Plus size={20} />
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button
                      onClick={() => setActive(index)}
                      className={`relative w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 shadow-sm
                    ${
                      isCompleted
                        ? "bg-blue-500 text-white shadow-blue-200"
                        : "bg-white text-gray-400 border-2 border-gray-200 hover:border-blue-300"
                    }
                    ${isCurrent ? "ring-4 ring-blue-100 scale-110" : "scale-100"}
                    `}
                    >
                      {index + 1}
                    </button>
                  </div>

                  <motion.span
                    animate={{
                      y: isCurrent ? 20 : 0,
                      color: isCurrent ? "#2563eb" : "#6b7280",
                      scale: isCurrent ? 1.1 : 1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    className="mt-5 font-bold text-sm whitespace-nowrap"
                  >
                    {step.tenDauViec}
                  </motion.span>
                </div>
              );
            })}

            {/* NÚT THÊM */}
            <div className="flex flex-col items-center flex-1">
              <button
                onClick={handleAdd}
                className="w-12 h-12 rounded-full border-4 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-all bg-white"
              >
                <Plus size={20} />
              </button>
              <span className="mt-5 font-bold text-sm text-gray-300">
                Thêm bước
              </span>
            </div>
          </div>

          <div className="mt-15 min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-xl shadow-xl text-center max-w-lg mx-auto"
              >
                <input
                  type="text"
                  value={steps[active]?.tenDauViec || ""}
                  onChange={(e) => handleUpdate("tenDauViec", e.target.value)}
                  className="w-full text-xl bg-blue-500 font-bold text-white p-2 pt-3 rounded-t-2xl uppercase tracking-wide text-center outline-none focus:bg-blue-600 transition-colors"
                  placeholder="Nhập tiêu đề..."
                />

                <textarea
                  value={steps[active]?.moTa || ""}
                  onChange={(e) => handleUpdate("moTa", e.target.value)}
                  className="w-full text-gray-600 text-lg rounded-b-xl p-4 leading-relaxed italic min-h-[120px] outline-none resize-none border-none focus:bg-gray-50 transition-colors text-center"
                  placeholder="Nhập mô tả chi tiết..."
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-between mr-10 gap-5 relative">
        <div className="ml-5 relative">
          <button
            onClick={() => {
              setTempMoTa(moTaTongQuan);
              setShowEditBubble(!showEditBubble);
            }}
            className="p-3 bg-blue-50 text-blue-500 rounded-xl flex gap-3 hover:bg-blue-100 transition relative z-10"
          >
            <Pencil></Pencil>
            Chỉnh sửa mô tả
          </button>

          <AnimatePresence>
            {showEditBubble && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 20, x: -20 }}
                animate={{ opacity: 1, scale: 1, y: -10, x: 100 }}
                exit={{ opacity: 0, scale: 0.5, y: 20 }}
                className="absolute bottom-full left-0 mb-4 w-100 md:w-120 bg-white shadow-lg border border-gray-100 p-5 z-50 origin-bottom-left"
              >
                <h4 className="text-sm font-black text-blue-500 uppercase mb-5 flex items-center gap-2">
                  Mô tả lộ trình
                </h4>
                <textarea
                  maxLength={50}
                  value={tempMoTa}
                  onChange={(e) => setTempMoTa(e.target.value)}
                  className="w-full h-20 p-3 bg-gray-50 rounded-sm border-none focus:ring-1 focus:ring-blue-100 text-slate-700 text-sm resize-none outline-none italic"
                  placeholder="Nhập mô tả tổng quan cho lộ trình của bạn (tối đa 50 ký tự)..."
                />
                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm font-bold text-gray-400">
                    {tempMoTa.length}/50
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowEditBubble(false)}
                      className="p-2 px-4 text-sm font-bold text-gray-500 hover:bg-gray-100 transition"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={handleSaveDesc}
                      className="p-2 px-4 text-sm font-bold bg-blue-500 text-white hover:bg-blue-600 shadow-md shadow-blue-100 transition flex items-center gap-1"
                    >
                      Lưu
                    </button>
                  </div>
                </div>
                <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white border-r border-b border-gray-100 rotate-45"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex gap-5">
          <button
            disabled={steps.length === 0}
            name="submit"
            onClick={handleSubmit}
            className={`hover:shadow-lg transition px-5 py-2 font-semibold ${steps.length === 0 ? "text-gray-600 border cursor-not-allowed" : "text-blue-500 border hover:bg-blue-500 hover:text-white"}`}
          >
            Lưu chỉnh sửa
          </button>
          <button
            disabled={steps.length === 0}
            name="submit"
            onClick={handlePublic}
            className={`hover:shadow-lg transition px-5 py-2 font-semibold ${steps.length === 0 ? "text-gray-600 border cursor-not-allowed" : "text-green-600 border hover:bg-green-600 hover:text-white"}`}
          >
            {trangThai == 1 ? "Tắt công khai" : "Công khai"}
          </button>
        </div>
      </div>
    </div>
  );
}
