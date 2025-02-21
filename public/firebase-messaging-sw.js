importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js",
);
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBD2oTYCXAOb4eDjMUosDviS80gVzIcoiE",
  authDomain: "my-pwa-app-1a654.firebaseapp.com",
  projectId: "my-pwa-app-1a654",
  storageBucket: "my-pwa-app-1a654.firebasestorage.app",
  messagingSenderId: "341501050315",
  appId: "1:341501050315:web:41ce8d4f5adfb6f8f80a4e",
  measurementId: "G-XTGRXGB4X7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Обработчик входящих пуш-уведомлений
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message ", payload);

  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/icon512_maskable.png",
  });
});
