// src/pages/chat/ChatPage.jsx
import { useState, useEffect, useRef } from "react";

// Component ChatBubble
function ChatBubble({ message, sender }) {
  const isUser = sender === "user";
  const baseStyle = "p-3 rounded-xl max-w-[70%] break-words shadow-sm";
  const style = isUser
    ? `bg-gradient-to-r from-blue-500 to-blue-600 text-white self-end ${baseStyle}`
    : `bg-gray-200 text-gray-800 self-start ${baseStyle}`;

  return (
    <div
      className={`flex gap-2 items-end ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white text-sm font-bold">
          M
        </div>
      )}
      <div className={style}>{message}</div>
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">
          U
        </div>
      )}
    </div>
  );
}

export default function ChatPage() {
  const [mentors, setMentors] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [input, setInput] = useState("");

  const chatEndRef = useRef(null);

  useEffect(() => {
    // Demo mentors
    const demoMentors = [
      { id: "M001", name: "Nguyen Van Mentor" },
      { id: "M002", name: "Tran Thi Mentor" },
      { id: "M003", name: "Le Van Mentor" },
      { id: "M004", name: "Pham Thi Mentor" },
      { id: "M005", name: "Hoang Van Mentor" },
    ];
    setMentors(demoMentors);
    setSelectedMentor(demoMentors[0]);

    // Demo messages
    const demoMessages = [
      { sender: "mentor", message: "Chào bạn, mình là mentor!" },
      { sender: "user", message: "Chào bạn, mình cần tư vấn." },
    ];
    setMessages(demoMessages);
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", message: input.trim() }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "mentor",
          message: "Mentor trả lời: Tôi đã nhận tin nhắn của bạn.",
        },
      ]);
    }, 1000);
  };

  return (
    <div className="flex justify-center items-start p-4">
      {/* Card chính chat */}
      <div className="flex w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden h-[80vh]">
        {/* Sidebar mentors */}
        <div className="w-1/3 bg-gray-50 p-4 overflow-y-auto">
          <h3 className="font-semibold text-lg mb-4">Danh sách mentor</h3>
          {mentors.map((mentor) => (
            <div
              key={mentor.id}
              onClick={() => {
                setSelectedMentor(mentor);
                setMessages([]); // Reset messages hoặc fetch theo mentor
              }}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer mb-2 transition-all ${
                selectedMentor?.id === mentor.id
                  ? "bg-blue-100 shadow"
                  : "hover:bg-gray-100"
              }`}
            >
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold">
                {mentor.name[0]}
              </div>
              <span className="font-medium">{mentor.name}</span>
            </div>
          ))}
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col p-6">
          {/* Header chat */}
          <div className="mb-4 font-semibold text-xl">
            {selectedMentor?.name}
          </div>

          {/* Chat messages scrollable */}
          <div className="flex-1 overflow-y-auto flex flex-col gap-3 p-4 bg-gray-50 rounded-xl">
            {messages.map((msg, index) => (
              <ChatBubble
                key={index}
                sender={msg.sender}
                message={msg.message}
              />
            ))}
            <div ref={chatEndRef}></div>
          </div>

          {/* Input cố định */}
          <div className="mt-4 flex gap-2">
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              className="flex-1 p-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-full hover:scale-105 transition-transform"
            >
              Gửi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
