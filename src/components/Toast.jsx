import { useEffect, useState } from "react";
import { X } from "lucide-react";

function Toast({ message, type = "info", onClose }) {
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 300);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`
        bottom-25 left-5 z-50
        min-w-[400px] max-w-[500px]
        px-4 py-3 shadow-sm
        flex items-center justify-between gap-3
        ${
          type === "success"
            ? "bg-green-100 text-green-700 border border-green-300"
            : type === "error"
              ? "bg-red-100 text-red-700 border border-red-300"
              : "bg-gray-100 text-gray-700 border border-gray-300"
        }
        ${closing ? "animate-slideOut" : "animate-slideIn"}
      `}
    >
      <span className="text-sm font-medium">{message}</span>

      <button onClick={handleClose} className="hover:opacity-70 transition">
        <X size={16} />
      </button>
    </div>
  );
}

export default Toast;
