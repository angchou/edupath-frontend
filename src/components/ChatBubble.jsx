export default function ChatBubble({ message, sender }) {
  const isUser = sender === "user";
  const baseStyle = "p-3 rounded-xl max-w-[70%] break-words";
  const style = isUser
    ? `bg-blue-500 text-white self-end ${baseStyle}`
    : `bg-gray-200 text-gray-800 self-start ${baseStyle}`;

  return <div className={style}>{message}</div>;
}
