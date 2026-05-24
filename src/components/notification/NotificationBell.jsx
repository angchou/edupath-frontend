import { BellRing } from "lucide-react";

export default function NotificationBell({ onClick, count }) {
  return (
    <div className="relative">
      <div
        onClick={onClick}
        className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 transition"
      >
        <BellRing size={20} />

        {count > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full">
            {count}
          </span>
        )}
      </div>
    </div>
  );
}
