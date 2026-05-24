import { useEffect, useState } from "react";
import {
  connectNotificationSocket,
  disconnectSocket,
} from "../services/notificationSocket";

import { getNotificaions } from "../services/notificationService";

export const useNotifications = (userId) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!userId) return;

    const fetchNotifications = async () => {
      const data = await getNotificaions();
      if (data) {
        const dataWithFlag = data.map((n) => ({ ...n, isDeleted: false }));
        setNotifications(dataWithFlag);
      }
    };
    fetchNotifications();

    connectNotificationSocket(userId, (newNotif) => {
      setNotifications((prev) => [{ ...newNotif, isDeleted: false }, ...prev]);
    });

    return () => disconnectSocket();
  }, [userId]);

  return { notifications, setNotifications };
};
