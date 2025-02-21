importScripts(
  "https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js",
);

// Initialize Firebase using the compat version
firebase.initializeApp({
  apiKey: "AIzaSyBD2oTYCXAOb4eDjMUosDviS80gVzIcoiE",
  authDomain: "my-pwa-app-1a654.firebaseapp.com",
  projectId: "my-pwa-app-1a654",
  storageBucket: "my-pwa-app-1a654.firebasestorage.app",
  messagingSenderId: "341501050315",
  appId: "1:341501050315:web:41ce8d4f5adfb6f8f80a4e",
  measurementId: "G-XTGRXGB4X7",
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function (payload) {
  console.log("Background message received:", payload);

  const notificationTitle = payload.notification.title || "New Notification";
  const notificationOptions = {
    body: payload.notification.body || "",
    icon: "/pwa-192x192.png",
    data: payload.data,
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions,
  );
});
