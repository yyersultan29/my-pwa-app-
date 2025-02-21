import { useEffect, useState } from "react";
import {
  requestNotificationPermission,
  onForegroundMessage,
} from "../firebase";

const NotificationManager = () => {
  const [token, setToken] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [notification, setNotification] = useState<any>(null);

  useEffect(() => {
    const requestPermission = async () => {
      const fcmToken = await requestNotificationPermission();
      if (fcmToken) {
        setToken(fcmToken);
        // Here you would typically send this token to your backend
        // saveTokenToBackend(fcmToken);
      }
    };

    requestPermission();

    // Set up foreground message handler
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const unsubscribe = onForegroundMessage((payload: any) => {
      setNotification({
        title: payload.notification?.title,
        body: payload.notification?.body,
      });

      // Display a custom notification UI or use the browser's native notification
      if (Notification.permission === "granted") {
        new Notification(payload.notification?.title, {
          body: payload.notification?.body,
          icon: "/pwa-192x192.png",
        });
      }
    });

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      unsubscribe && unsubscribe();
    };
  }, []);

  return (
    <div>
      {token ? (
        <p>Push notifications are enabled!</p>
      ) : (
        <button onClick={requestNotificationPermission}>
          Enable Push Notifications
        </button>
      )}

      {notification && (
        <div className="notification-preview">
          <h3>{notification.title}</h3>
          <p>{notification.body}</p>
        </div>
      )}
    </div>
  );
};

export default NotificationManager;
