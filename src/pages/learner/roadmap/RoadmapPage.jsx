import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    dauViecID: "DV0001",
    tenDauViec: "Bắt đầu",
    moTa: "Làm quen với các khái niệm cơ bản và cài đặt môi trường.",
  },
  {
    dauViecID: "DV0002",
    tenDauViec: "Nền tảng",
    moTa: "Học về HTML, CSS và các kiến thức cơ bản về lập trình.",
  },
  {
    dauViecID: "DV0003",
    tenDauViec: "JavaScript",
    moTa: "Làm quen với JavaScript, xử lý logic và thao tác với DOM.",
  },
  {
    dauViecID: "DV0004",
    tenDauViec: "Framework",
    moTa: "Học các framework phổ biến như React để xây dựng giao diện.",
  },
  {
    dauViecID: "DV0005",
    tenDauViec: "Dự án",
    moTa: "Thực hành bằng cách xây dựng các dự án thực tế.",
  },
  {
    dauViecID: "DV0006",
    tenDauViec: "Việc làm",
    moTa: "Chuẩn bị CV, portfolio và kỹ năng phỏng vấn xin việc.",
  },
];

export default function RoadmapPage() {
  const navigate = useNavigate();

  const [active, setActive] = useState(0);

  const progressWidth = (active / (steps.length - 1)) * 100;

  return (
    <div className="p-10 bg-gray-50 h-[85vh] flex flex-col items-center justify-between font-sans text-slate-800">
      <div className="w-full flex flex-col items-center">
        <h1 className="text-4xl font-extrabold mb-25 tracking-tight text-blue-500 uppercase">
          Lộ trình học tập
        </h1>

        <div className="relative w-full max-w-6xl">
          <div className="absolute top-6 left-6 right-6 h-1.5 z-0">
            {/* Track */}
            <div className="absolute inset-0 bg-gray-200 rounded-full" />

            {/* Fill */}
            <motion.div
              className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
              animate={{ width: `${progressWidth}%` }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </div>

          <div className="flex justify-between relative z-20">
            {steps.map((step, index) => {
              const isCompleted = index <= active;
              const isCurrent = index === active;

              return (
                <div key={index} className="flex flex-col items-center flex-1">
                  <button
                    onClick={() => setActive(index)}
                    className={`relative w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 shadow-sm
                  ${isCompleted ? "bg-blue-500 text-white shadow-blue-200" : "bg-white text-gray-400 border-2 border-gray-200 hover:border-blue-300"}
                  ${isCurrent ? "ring-4 ring-blue-100 scale-110" : "scale-100"}
                  `}
                  >
                    {index + 1}

                    {isCurrent && (
                      <motion.div
                        layoutId="crosshair"
                        className="absolute -inset-5 flex items-center justify-center pointer-events-none"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            repeat: Infinity,
                            duration: 5,
                            ease: "linear",
                          }}
                          className="relative w-full h-full flex items-center justify-center"
                        >
                          <div className="absolute inset-0 border-[2px] border-dashed border-blue-500/30 rounded-full" />

                          <div className="absolute inset-2 border-[2px] border-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.4)]" />

                          <div className="absolute top-[-4px] left-1/2 -translate-x-1/2 w-1 h-5 bg-blue-600 rounded-full" />
                          <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-1 h-5 bg-blue-600 rounded-full" />
                          <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 h-1 w-5 bg-blue-600 rounded-full" />
                          <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 h-1 w-5 bg-blue-600 rounded-full" />
                        </motion.div>
                      </motion.div>
                    )}
                  </button>

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
                <h4 className="text-xl bg-blue-500 font-bold text-white p-2 pt-3 rounded-t-2xl uppercase tracking-wide">
                  {steps[active].tenDauViec}
                </h4>
                <p className="text-gray-600 text-lg rounded-b-xl p-4 leading-relaxed italic">
                  {steps[active].moTa}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end-safe mr-10">
        <button
          onClick={() => navigate(`../edit`)}
          className="bg-blue-500 hover:bg-blue-600 hover:shadow-lg transition rounded-lg px-5 py-2 text-white font-semibold"
        >
          Chỉnh sửa lộ trình
        </button>
      </div>
    </div>
  );
}
