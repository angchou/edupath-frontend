import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { getMyRoadmap } from "../../../services/roadMapService";

export default function RoadmapPage() {
  const [loTrinhID, setLoTrinhID] = useState("");
  const [trangThai, setTrangThai] = useState("");
  const [steps, setSteps] = useState([]);

  const navigate = useNavigate();

  const [active, setActive] = useState(0);

  const progressWidth = (active / (steps.length - 1)) * 100;

  const fetchData = async () => {
    try {
      const data = await getMyRoadmap();
      setLoTrinhID(data.loTrinhID);
      setTrangThai(Number(data.trangThai));
      setSteps(data.danhSachDauViec);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-5 h-[85vh] flex flex-col items-center justify-between font-sans text-slate-800">
      <div className="w-full flex flex-col items-center">
        <h1 className="text-2xl font-extrabold mb-25 tracking-tight text-blue-500">
          {steps.length !== 0 ? (
            "Lộ trình học tập"
          ) : (
            <>
              Bạn chưa có lộ trình học tập?{" "}
              <a
                href="all"
                className="ml-2 text-blue-400 underline hover:text-blue-600 transition"
              >
                Tìm kiếm
              </a>
            </>
          )}
        </h1>

        <div className="relative w-full max-w-6xl">
          {steps.length !== 0 && (
            <div className="absolute top-6 left-6 right-6 h-1.5 z-0">
              <div className="absolute inset-0 bg-gray-200 rounded-full" />

              <motion.div
                className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
                animate={{ width: `${progressWidth}%` }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
            </div>
          )}

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
                    {step?.tenDauViec}
                  </motion.span>
                </div>
              );
            })}
          </div>

          {steps.length !== 0 && (
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
                    {steps[active]?.tenDauViec}
                  </h4>
                  <p className="text-gray-600 text-lg rounded-b-xl p-4 leading-relaxed italic">
                    {steps[active]?.moTa}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
