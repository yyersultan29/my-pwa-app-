import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { VAPID_KEY } from "./constants";

const firebaseConfig = {
  apiKey: "AIzaSyBD2oTYCXAOb4eDjMUosDviS80gVzIcoiE",
  authDomain: "my-pwa-app-1a654.firebaseapp.com",
  projectId: "my-pwa-app-1a654",
  storageBucket: "my-pwa-app-1a654.firebasestorage.app",
  messagingSenderId: "341501050315",
  appId: "1:341501050315:web:41ce8d4f5adfb6f8f80a4e",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      // Get FCM token
      const currentToken = await getToken(messaging, {
        vapidKey: VAPID_KEY,
      });

      if (currentToken) {
        console.log("FCM token:", currentToken);
        return currentToken;
      } else {
        console.log("No registration token available");
        return null;
      }
    } else {
      console.log("Notification permission denied");
      return null;
    }
  } catch (error) {
    console.error("Error getting notification permission:", error);
    return null;
  }
};

export const onForegroundMessage = (callback: (s: unknown) => void) => {
  return onMessage(messaging, (payload) => {
    console.log("Message received in foreground:", payload);
    callback(payload);
  });
};

export { messaging };
