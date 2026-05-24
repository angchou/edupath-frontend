import React from "react";
import { Send } from "lucide-react";

export const ConversationItem = ({ conv, isActive, onClick }) => (
  <div
    onClick={onClick}
    className={`p-4 cursor-pointer transition-all duration-200 border-blue-100
      ${isActive ? "bg-blue-50 border-l-4 border-blue-500" : "hover:bg-gray-50"}`}
  >
    <div
      className={`font-semibold ${isActive ? "text-indigo-700" : "text-gray-800"}`}
    >
      {conv.nguoiNhan}
    </div>
    <div className="text-xs text-gray-500 truncate mt-1">
      ID: {conv.cuocTroChuyenID}
    </div>
  </div>
);

export const MessageBubble = ({ msg, currentUserID }) => {
  const isMe = msg.nguoiGui === currentUserID;
  return (
    <div
      className={`max-w-xs px-4 py-2 text-sm shadow-sm rounded-2xl ${
        isMe
          ? "self-end bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-br-none"
          : "self-start bg-gray-100 text-gray-800 rounded-bl-none border border-gray-200"
      }`}
    >
      {msg.noiDung}
    </div>
  );
};

export const ChatInput = ({ value, onChange, onSend }) => (
  <div className="p-4 bg-white border-t border-gray-200 flex items-center gap-3">
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && onSend()}
      placeholder="Nhập tin nhắn..."
      className="flex-1 bg-gray-50 border border-gray-200 px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition-all text-gray-800"
    />
    <button
      onClick={onSend}
      className="p-2.5 bg-indigo-600 hover:bg-indigo-700 transition rounded-xl text-white shadow-md shadow-indigo-200"
    >
      <Send size={18} />
    </button>
  </div>
);
