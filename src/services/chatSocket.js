import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

let stompClient = null;

export const connectSocket = (userID) => {
  if (stompClient && stompClient.connected) return;

  const socket = new SockJS("http://localhost:6767/ws");
  stompClient = Stomp.over(socket);
  stompClient.debug = () => {};

  const token = localStorage.getItem("token");

  stompClient.connect(
    { Authorization: `Bearer ${token}` },
    () => {
      console.log("[CHAT SOCKET] Đã kết nối thành công!");
    },
    (error) => {
      console.error("[CHAT SOCKET] Lỗi kết nối:", error);
    },
  );
};

export const connectMessagePage = (cuocTroChuyenID, onNewMessageReceived) => {
  if (!stompClient || !stompClient.connected) {
    console.warn(
      "[CHAT SOCKET] Chưa sẵn sàng lắng nghe phòng: " + cuocTroChuyenID,
    );
    return null;
  }

  const subscription = stompClient.subscribe(
    `/topic/room.${cuocTroChuyenID}`,
    (message) => {
      if (message.body) {
        onNewMessageReceived(JSON.parse(message.body));
      }
    },
  );

  return () => {
    if (subscription) subscription.unsubscribe();
  };
};

export const sendMessageSocket = (cuocTroChuyenID, nguoiNhan, noiDung) => {
  if (stompClient && stompClient.connected) {
    const payload = {
      cuocTroChuyenID: String(cuocTroChuyenID),
      nguoiNhan: String(nguoiNhan),
      noiDung: String(noiDung),
    };

    stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(payload));
  } else {
    console.error("[CHAT SOCKET] Chưa kết nối, không thể gửi!");
    throw new Error("SOCKET_DISCONNECTED");
  }
};
