import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

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

export const requestPermission = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey:
        "BNtg7q0kRIapuWQYO1iZOYFeSRC4CV42piytAt__fFydSsCmyK7bUaT7Hl_b3lirvGqq54QgXPzvGaZ5IaTRz9M",
    });

    if (token) {
      console.log("FCM Token:", token);
      // Отправь token на сервер для хранения
    } else {
      console.log("No registration token available");
    }
  } catch (error) {
    console.error("Error getting token:", error);
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      resolve(payload);
    });
  });
