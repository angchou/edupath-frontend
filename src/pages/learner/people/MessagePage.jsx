import React, { useEffect, useState, useRef } from "react";
import { useToast } from "../../../contexts/ToastContext";
import {
  getMyMentors,
  getConversation,
  getMessagesOfConversation,
  createMessage,
} from "../../../services/messageService";
import { Send } from "lucide-react";
import {
  connectSocket,
  connectMessagePage,
  sendMessageSocket,
} from "../../../services/chatSocket";

export default function MessagePage() {
  const { addToast } = useToast();

  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [activeConversation, setActiveConversation] = useState(null);
  const [activeMessages, setActiveMessages] = useState([]);
  const [input, setInput] = useState("");

  const currentUserID = localStorage.getItem("userID") || "ME";
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeMessages]);

  useEffect(() => {
    const initPageData = async () => {
      try {
        const data = await getMyMentors();
        setMentors(data || []);
        connectSocket(currentUserID);
      } catch (err) {
        addToast("Không thể tải danh sách người hướng dẫn!");
      }
    };
    initPageData();
  }, [currentUserID, addToast]);

  useEffect(() => {
    if (!activeConversation?.cuocTroChuyenID) return;

    const unsubscribe = connectMessagePage(
      activeConversation.cuocTroChuyenID,
      (newMsg) => {
        setActiveMessages((prev) => {
          const getID = (m) => m?.tinNhanID || m?.tinNhan_ID;
          const isExist = prev.some((m) => getID(m) === getID(newMsg));
          if (isExist) return prev;
          return [...prev, newMsg];
        });
      },
    );

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [activeConversation]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "Vừa xong";
    if (Array.isArray(dateStr)) {
      const [y, m, d, h, min] = dateStr;
      return `${h}:${min} ${d}/${m}/${y}`;
    }
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? "Vừa xong" : date.toLocaleString("vi-VN");
  };

  const handleSelectMentor = async (mentor) => {
    setSelectedMentor(mentor);
    setActiveConversation(null);
    setActiveMessages([]);

    try {
      const conv = await getConversation(mentor.userID);
      if (conv && conv.cuocTroChuyenID) {
        setActiveConversation(conv);
        const msgs = await getMessagesOfConversation(conv.cuocTroChuyenID);
        setActiveMessages(msgs || []);
      } else {
        setActiveConversation(null);
      }
    } catch (error) {
      console.error("Lỗi lấy thông tin cuộc trò chuyện:", error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || !selectedMentor) return;

    if (!activeConversation?.cuocTroChuyenID) {
      const payload = {
        cuocTroChuyenID: null,
        noiDung: input,
        nguoiNhan: selectedMentor.userID,
      };

      try {
        await createMessage(payload);
        const conv = await getConversation(selectedMentor.userID);
        const realConv = conv?.data || conv;
        if (realConv && realConv.cuocTroChuyenID) {
          setActiveConversation(realConv);
          const msgs = await getMessagesOfConversation(
            realConv.cuocTroChuyenID,
          );
          setActiveMessages(msgs || []);

          setInput("");
        } else {
          addToast("Không thể tìm thấy phòng chat vừa tạo!");
        }
      } catch (err) {
        console.error("Lỗi xử lý tin nhắn đầu tiên:", err);
        addToast("Không thể gửi tin nhắn mở đầu cuộc trò chuyện!");
      }
      return;
    }

    try {
      sendMessageSocket(
        activeConversation.cuocTroChuyenID,
        selectedMentor.userID,
        input,
      );
      setInput("");
    } catch (err) {
      addToast("Mất kết nối đường truyền Realtime. Vui lòng thử lại!");
    }
  };

  const renderStatus = (status) => {
    if (status === 0)
      return (
        <span className="px-2 py-0.5 text-xs font-medium rounded bg-red-100 text-red-600">
          Bị xóa
        </span>
      );
    if (status === 1)
      return (
        <span className="px-2 py-0.5 text-xs font-medium rounded bg-amber-100 text-amber-600">
          Bị chặn
        </span>
      );
    return (
      <span className="px-2 py-0.5 text-xs font-medium rounded bg-green-100 text-green-600">
        Hoạt động
      </span>
    );
  };

  return (
    <div className="h-[85vh] mx-3 my-2 flex bg-white text-gray-900 overflow-hidden border border-gray-200">
      <div className="w-75 flex flex-col bg-slate-50 border-r border-gray-200">
        <div className="p-5 border-b border-gray-200 bg-white">
          <h1 className="text-xl font-bold tracking-tight text-blue-500">
            Danh sách người hướng dẫn
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {mentors.map((mentor) => {
            const isActive = selectedMentor?.userID === mentor.userID;
            return (
              <div
                key={mentor.userID}
                onClick={() => handleSelectMentor(mentor)}
                className={`p-4 rounded-lg cursor-pointer transition-all border ${
                  isActive
                    ? "bg-blue-50 border-blue-500 shadow-sm"
                    : "bg-white border-gray-100 hover:bg-gray-100"
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h3
                    className={`font-semibold text-sm ${isActive ? "text-blue-500" : "text-gray-800"}`}
                  >
                    {mentor.hoTen}
                  </h3>
                  {renderStatus(mentor.trangThai)}
                </div>
                <div className="space-y-1 text-xs text-gray-500">
                  <p>
                    <span className="font-medium text-gray-700">ID:</span>{" "}
                    {mentor.userID}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Email:</span>{" "}
                    {mentor.email}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-white">
        {selectedMentor ? (
          <>
            <div className="p-4 bg-white flex justify-between items-center border-b border-gray-200 shadow-sm z-10">
              <div>
                <div className="font-bold text-gray-800 text-lg flex items-center gap-2">
                  {selectedMentor.userID} - {selectedMentor.hoTen}
                </div>
                <p className="text-xs text-gray-400 mt-0.5">
                  Vai trò: {selectedMentor.roleName || "Người hướng dẫn"}
                </p>
              </div>

              {activeConversation && (
                <div className="text-right text-xs bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-lg text-blue-500">
                  <div>
                    <span className="font-semibold">Mã cuộc trò chuyện:</span>{" "}
                    {activeConversation.cuocTroChuyenID}
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-2 bg-slate-50/50">
              {activeMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-2">
                  <div className="p-3 bg-blue-50 text-blue-500 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501c1.153-.086 2.294-.213 3.423-.379 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-600 font-medium">
                    Chưa có cuộc trò chuyện
                  </p>
                  <p className="text-sm text-gray-400 max-w-xs">
                    Nhắn tin để bắt đầu
                  </p>
                </div>
              ) : (
                <>
                  {activeMessages.map((msg) => {
                    const senderID = msg.nguoiGui?.userID || msg.nguoiGui;
                    const isMe = senderID === currentUserID;

                    return (
                      <div
                        key={msg.tinNhanID || msg.tinNhan_ID}
                        className={`flex flex-col max-w-[70%] ${isMe ? "self-end items-end" : "self-start items-start"}`}
                      >
                        <span className="text-[10px] text-gray-400 mb-1 px-1">
                          {formatDate(msg.thoiGianGui)}
                        </span>
                        <div
                          className={`p-3 text-sm rounded-xl shadow-sm break-words whitespace-pre-wrap ${isMe ? "bg-blue-500 text-white rounded-br-none" : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"}`}
                        >
                          {msg.noiDung}
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            <form
              onSubmit={handleSendMessage}
              className="p-4 bg-white border-t border-gray-200 flex gap-3 items-center"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Nhập tin nhắn..."
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-all bg-slate-50/50"
              />
              <button
                type="submit"
                className="flex gap-2 items-center px-4 py-1.5 bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm rounded-xl transition-all shadow-sm active:scale-95"
              >
                <Send className="size-4"></Send>
                Gửi
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 bg-slate-50/20">
            <p className="text-sm font-medium text-gray-500">
              Chọn một người để bắt đầu trò chuyện
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
