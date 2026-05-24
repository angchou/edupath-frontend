import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Layout, Globe, Lock, User } from "lucide-react";

import {
  getPublicRoadmap,
  copyRoadmap,
} from "../../../services/roadMapService";

import { useToast } from "../../../contexts/ToastContext";

export default function AllRoadmapPage() {
  const [openId, setOpenId] = useState(null);
  const [activeSteps, setActiveSteps] = useState({});

  const { addToast } = useToast();

  const [roadmaps, setRoadmaps] = useState([]);
  const fetchData = async () => {
    const data = await getPublicRoadmap();
    setRoadmaps(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const toggleRoadmap = (id) => {
    setOpenId(openId === id ? null : id);
    if (!activeSteps[id]) {
      setActiveSteps((prev) => ({ ...prev, [id]: 0 }));
    }
  };

  const setActiveStep = (roadmapId, stepIndex) => {
    setActiveSteps((prev) => ({ ...prev, [roadmapId]: stepIndex }));
  };

  const handleCopyRoadmap = async (loTrinhID) => {
    const res = copyRoadmap(loTrinhID);
    setOpenId(null);
    if (!res) {
      addToast(
        "Không thể sử dụng lộ trình này vì một số vấn đề, vui lòng thử lại",
        "error",
      );
      return;
    }
    await fetchData();
    addToast(
      `Lấy lộ trình thành công, bạn có thể xem và chỉnh sửa lại lộ trình này tại "Lộ trình của tôi".`,
      "success",
    );
  };

  return (
    <div className="h-[90vh] overflow-y-auto p-5 font-sans text-slate-800">
      <div className="max-w-5xl mx-auto">
        <header className="text-center">
          <h1 className="text-2xl text-blue-500 font-extrabold tracking-tight mb-2">
            Danh sách lộ trình học tập
          </h1>
        </header>

        <div className="grid gap-6">
          {roadmaps.map((roadmap) => (
            <div
              key={roadmap.loTrinhID}
              className="bg-white shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md"
            >
              <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white">
                <div className="flex flex-col items-start gap-4">
                  <div className="flex gap-5">
                    <div className="p-3 rounded-lg text-blue-500">
                      <Layout size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        Lộ trình #{roadmap.loTrinhID}
                      </h3>
                      <p className="text-gray-600 mt-1">{roadmap.moTa}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span
                          className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                            roadmap.trangThai === 1
                              ? "bg-green-100 text-green-600"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          Công khai
                        </span>
                        <span className="text-xs text-gray-400 font-medium">
                          {roadmap.danhSachDauViec.length} đầu việc
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-5 mt-3 items-center">
                    <div className="p-3 rounded-lg text-blue-500">
                      <User size={24} />
                    </div>
                    <span>{roadmap.userID}</span>
                    <span>{roadmap.hoTen}</span>
                    <span>{roadmap.email}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                  <button
                    onClick={() => handleCopyRoadmap(roadmap.loTrinhID)}
                    className="w-[200px] flex items-center justify-center gap-2 px-5 py-2.5 font-semibold transition-all bg-blue-500 text-white hover:bg-blue-600 active:scale-95"
                  >
                    Sử dụng
                  </button>
                  <button
                    onClick={() => toggleRoadmap(roadmap.loTrinhID)}
                    className="w-[200px] flex items-center justify-center gap-2 px-5 py-2.5 font-semibold transition-all bg-blue-500 text-white hover:bg-blue-600 active:scale-95"
                  >
                    {openId === roadmap.loTrinhID
                      ? "Đóng chi tiết"
                      : "Xem lộ trình"}
                    <ChevronRight
                      size={18}
                      className={`transition-transform ${openId === roadmap.loTrinhID ? "rotate-90" : ""}`}
                    />
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {openId === roadmap.loTrinhID && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-gray-50 bg-gray-50/50 p-8"
                  >
                    <div className="relative w-full max-w-4xl mx-auto py-10">
                      <div className="absolute top-16 left-10 right-10 h-1 z-0 bg-gray-200 rounded-full" />

                      <div className="flex justify-between relative z-10">
                        {roadmap.danhSachDauViec
                          .sort((a, b) => a.stt - b.stt)
                          .map((step, index) => {
                            const isActive =
                              (activeSteps[roadmap.loTrinhID] || 0) === index;

                            return (
                              <div
                                key={step.dauViecID}
                                className="flex flex-col items-center flex-1"
                              >
                                <button
                                  onClick={() =>
                                    setActiveStep(roadmap.loTrinhID, index)
                                  }
                                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 shadow-sm
                                    ${
                                      isActive
                                        ? "bg-blue-500 text-white ring-4 ring-blue-100 scale-110"
                                        : "bg-white text-gray-400 border-2 border-gray-200 hover:border-blue-300"
                                    }`}
                                >
                                  {index + 1}
                                </button>
                                <motion.span
                                  animate={{
                                    y: isActive ? 12 : 8,
                                    color: isActive ? "#2563eb" : "#94a3b8",
                                    scale: isActive ? 1.05 : 1,
                                  }}
                                  className="font-bold text-xs mt-2 text-center max-w-[100px]"
                                >
                                  {step.tenDauViec}
                                </motion.span>
                              </div>
                            );
                          })}
                      </div>

                      <div className="mt-16">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activeSteps[roadmap.loTrinhID] || 0}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden max-w-lg mx-auto"
                          >
                            <div className="bg-blue-500 p-4 text-center">
                              <h4 className="text-white font-bold uppercase tracking-wide">
                                {
                                  roadmap.danhSachDauViec[
                                    activeSteps[roadmap.loTrinhID] || 0
                                  ]?.tenDauViec
                                }
                              </h4>
                            </div>
                            <div className="p-6 text-center">
                              <p className="text-gray-600 leading-relaxed italic">
                                {
                                  roadmap.danhSachDauViec[
                                    activeSteps[roadmap.loTrinhID] || 0
                                  ]?.moTa
                                }
                              </p>
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
