// Firebase Messaging Service Worker
// Site kapalıyken bile push notification almak için

importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyADykV8-GjNNoK30CUkPlqCNMjR7Ggc1M8",
  authDomain: "e-imza-4c867.firebaseapp.com",
  databaseURL: "https://e-imza-4c867-default-rtdb.firebaseio.com",
  projectId: "e-imza-4c867",
  storageBucket: "e-imza-4c867.firebasestorage.app",
  messagingSenderId: "856535109805",
  appId: "1:856535109805:web:39f6fa2e23275f7be77624"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Arka plan bildirimi
messaging.onBackgroundMessage((payload) => {
  console.log('[SW] Background message received:', payload);
  
  const notificationTitle = payload.notification.title || 'İmza İstanbul';
  const notificationOptions = {
    body: payload.notification.body || 'Yeni bir güncelleme var',
    icon: '/assets/images/logo.png',
    badge: '/assets/images/badge.png',
    tag: 'courier-notification',
    requireInteraction: true,
    vibrate: [200, 100, 200],
    data: payload.data || {}
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Bildirime tıklandığında
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked:', event.notification.tag);
  event.notification.close();
  
  // Takip sayfasını aç
  event.waitUntil(
    clients.openWindow('/takip')
  );
});
