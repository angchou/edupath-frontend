import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let stompClient = null;

export const initSocketConnection = () => {
  if (stompClient && stompClient.connected) return stompClient;

  const socket = new SockJS("http://localhost:6767/ws");
  stompClient = new Client({
    webSocketFactory: () => socket,
    connectHeaders: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    reconnectDelay: 5000,
  });

  stompClient.activate();
  return stompClient;
};

export const connectNotificationSocket = (userId, onMessageReceived) => {
  const socket = new SockJS("http://localhost:6767/ws");
  stompClient = new Client({
    webSocketFactory: () => socket,
    connectHeaders: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    onConnect: () => {
      stompClient.subscribe("/user/queue/notifications", (message) => {
        onMessageReceived(JSON.parse(message.body));
      });
    },
  });
  stompClient.activate();
};

export const disconnectSocket = () => {
  if (stompClient) {
    stompClient.deactivate();
    stompClient = null;
  }
};
