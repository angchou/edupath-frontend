import { useState } from "react";
import { MoreVertical, Check, X } from "lucide-react";

import {
  deleteNotification,
  deleteAllNotifications,
} from "../../services/notificationService";

import { useToast } from "../../contexts/ToastContext";
import { useNotifications } from "../../hooks/useNotifications";

export default function NotificationDropdown({
  notifications,
  setNotifications,
}) {
  const [openMenu, setOpenMenu] = useState(false);
  const { addToast } = useToast();

  const handleDelete = async (nof) => {
    const res = await deleteNotification(nof.thongBaoID);
    if (res) {
      addToast("Đã xóa thông báo", "success");
      setNotifications((prev) => {
        const idXoa = String(nof.thongBaoID).trim();

        const mangMoi = prev.filter((item) => {
          const idTrongMang = String(item.thongBaoID).trim();
          return idTrongMang !== idXoa;
        });
        return mangMoi;
      });
      console.log(notifications);
    } else {
      addToast("Lỗi khi xóa", "error");
    }
  };
  const handleDeleteAll = async () => {
    const res = await deleteAllNotifications();
    if (res) {
      setNotifications([]);
      addToast("Đã xóa tất cả", "success");
    } else {
      addToast("Lỗi khi xóa", "error");
    }
  };

  return (
    <div className="absolute right-0 mt-3 w-100 bg-white shadow-lg z-50">
      <div className="flex p-3 font-semibold border-b bg-blue-500 justify-between text-white relative">
        <div>Thông báo</div>

        <div className="relative">
          <button onClick={() => setOpenMenu(!openMenu)}>
            <MoreVertical size={18} />
          </button>

          {openMenu && (
            <div className="absolute right-0 mt-2 w-50 bg-white text-black shadow-md rounded">
              <div
                className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer transition"
                onClick={() => {
                  console.log("Đánh dấu đã đọc hết");
                  setOpenMenu(false);
                }}
              >
                Đánh dấu đã đọc hết
              </div>
              <div
                className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer transition"
                onClick={() => {
                  handleDeleteAll();
                  setOpenMenu(false);
                }}
              >
                Xóa toàn bộ thông báo
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-gray-500 text-sm text-center">
            Không có thông báo
          </div>
        ) : (
          notifications.map((n, index) => (
            <div
              key={n.thongBaoID}
              className="p-3 gap-5 hover:bg-gray-100 cursor-pointer transition flex items-center justify-between"
            >
              <div>
                <div className="text-sm line-clamp-2 font-semibold">
                  {n.tieuDe}
                </div>
                <div className="line-clamp-2 text-xs text-gray-500 mt-1">
                  {n.noiDung}
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => handleDelete(n)}
                  className="bg-[#de335e] hover:scale-110 transition text-white p-1"
                >
                  <X size={16}></X>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
