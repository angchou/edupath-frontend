import { useState } from "react";
import { motion, AnimatePresence, number } from "framer-motion";
import { Pencil, Trash2, Plus } from "lucide-react";

const initialSteps = [
  {
    dauViecID: "DV0001",
    tenDauViec: "Bắt đầu",
    moTa: "Làm quen với các khái niệm cơ bản và cài đặt môi trường.",
    stt: 10,
  },
  {
    dauViecID: "DV0002",
    tenDauViec: "Nền tảng",
    moTa: "Học về HTML, CSS và các kiến thức cơ bản về lập trình.",
    stt: 20,
  },
  {
    dauViecID: "DV0003",
    tenDauViec: "JavaScript",
    moTa: "Làm quen với JavaScript, xử lý logic và thao tác với DOM.",
    stt: 30,
  },
  {
    dauViecID: "DV0004",
    tenDauViec: "Framework",
    moTa: "Học các framework phổ biến như React để xây dựng giao diện.",
    stt: 40,
  },
  {
    dauViecID: "DV0005",
    tenDauViec: "Dự án",
    moTa: "Thực hành bằng cách xây dựng các dự án thực tế.",
    stt: 50,
  },
  {
    dauViecID: "DV0006",
    tenDauViec: "Việc làm",
    moTa: "Chuẩn bị CV, portfolio và kỹ năng phỏng vấn xin việc.",
    stt: 60,
  },
];

export default function EditRoadmapPage() {
  const [steps, setSteps] = useState(initialSteps);
  const [active, setActive] = useState(0);

  const buildPayload = () => {
    return {
      loTrinhID: "LT001",
      dauViecLoTrinh: steps.map((item) => ({
        dauViecID: item.dauViecID,
        tenDauViec: item.tenDauViec,
        moTa: item.moTa,
        stt: item.moTa,
      })),
    };
  };
  const deleteRoadmap = () => {
    const payload = {
      loTrinhID: "LT001",
    };

    console.log(payload);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = buildPayload();

    console.log(payload);
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

  // prototype, not currently used
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

  return (
    <div className="p-10 bg-gray-50 h-[85vh] flex flex-col items-center justify-between font-sans text-slate-800">
      <div className="w-full flex flex-col items-center">
        <h1 className="text-4xl font-extrabold mb-25 tracking-tight text-blue-500 uppercase">
          Lộ trình học tập
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
                <div key={index} className="flex flex-col items-center flex-1">
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

          <div className="mt-20 min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-xl shadow-xl text-center max-w-lg mx-auto"
              >
                {/* Input tenDauViec */}
                <input
                  type="text"
                  value={steps[active]?.tenDauViec || ""}
                  onChange={(e) => handleUpdate("tenDauViec", e.target.value)}
                  className="w-full text-xl bg-blue-500 font-bold text-white p-2 pt-3 rounded-t-2xl uppercase tracking-wide text-center outline-none focus:bg-blue-600 transition-colors"
                  placeholder="Nhập tiêu đề..."
                />

                {/* Textarea moTa */}
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

      <div className="w-full flex justify-end-safe mr-10 gap-5">
        <button
          name="submit"
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 hover:shadow-lg transition rounded-lg px-5 py-2 text-white font-semibold"
        >
          Lưu chỉnh sửa
        </button>
        <button
          onClick={deleteRoadmap}
          className="bg-[#cf345a] hover:bg-[#c71c46] hover:shadow-lg transition rounded-lg px-5 py-2 text-white font-semibold"
        >
          Xóa lộ trình
        </button>
      </div>
    </div>
  );
}
