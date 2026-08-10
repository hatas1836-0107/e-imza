# Push Notification Kurulum Rehberi

## 1. VAPID Key Alma (Firebase Console)

### Adım 1: Firebase Console'a Gir
1. https://console.firebase.google.com/ adresine git
2. `e-imza-4c867` projesini seç

### Adım 2: Cloud Messaging Ayarları
1. Sol menüden **Project Settings** (Proje Ayarları) > **⚙️ Settings** tıkla
2. **Cloud Messaging** sekmesine geç
3. **Web configuration** bölümünü bul

### Adım 3: Web Push Certificate Oluştur
1. **Web Push certificates** bölümünde **Generate key pair** butonuna tıkla
2. Oluşan **Key pair** değerini kopyala (Örnek: `BHxxx...`)
3. Bu değer **VAPID_KEY**'dir

### Adım 4: VAPID Key'i Koda Ekle
`site/assets/js/tracking.js` dosyasında:

```javascript
// Bu satırı bul:
const VAPID_KEY = 'YOUR_VAPID_KEY_HERE';

// Şununla değiştir (kendi key'inle):
const VAPID_KEY = 'BHxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
```

### Adım 5: Token Alma Kodunu Aktif Et
Aynı dosyada yorum satırlarını kaldır:

```javascript
const token = await getToken(messaging, {
  vapidKey: VAPID_KEY,
  serviceWorkerRegistration: registration
});

if (token) {
  console.log('✅ FCM Token:', token);
  if (currentUser) {
    const emailKey = currentUser.email.replace(/[.@]/g, '_');
    await set(ref(database, `fcmTokens/${emailKey}`), {
      token: token,
      timestamp: Date.now()
    });
  }
}
```

---

## 2. Test Etme

### Tarayıcıda Test
1. Takip sayfasını aç: `https://imzaistanbul.com/takip`
2. Tarayıcı bildirim izni isteyecek → **İzin Ver**
3. Console'da "✅ FCM Token" mesajını gör
4. Service Worker kaydını kontrol et:
   - Chrome: `chrome://serviceworker-internals/`
   - Edge: `edge://serviceworker-internals/`

### Mobil'de Test
1. Android Chrome veya iOS Safari'de siteyi aç
2. "Add to Home Screen" yap (PWA olarak)
3. Bildirim izni ver
4. Test bildirimi gönder

---

## 3. Backend - Bildirim Gönderme (Admin Panel)

Admin panelden otomatik bildirim göndermek için:

### Firebase Admin SDK ile Bildirim Gönder

```javascript
// Admin panelde (Node.js backend)
const admin = require('firebase-admin');

// FCM Token'ı al (müşterinin)
const customerToken = 'fcm_token_from_database';

// Bildirim gönder
const message = {
  notification: {
    title: 'Teslimatçı Yaklaşıyor! 🚗',
    body: 'Teslimatçınız 2 km uzaklıkta. Tahmini 10 dakika.'
  },
  data: {
    orderId: 'ZE-2026-4136',
    distance: '2.0',
    eta: '10'
  },
  token: customerToken
};

admin.messaging().send(message)
  .then(response => console.log('✅ Bildirim gönderildi:', response))
  .catch(error => console.error('❌ Hata:', error));
```

---

## 4. Otomatik Bildirim Tetikleyicileri

### A. Teslimatçı Yakınlık Bildirimi (Tracking.js)
- **500m yakınlık**: "Teslimatçı çok yakın!"
- **100m yakınlık**: "Teslimatçı geldi!"

### B. Durum Değişikliği Bildirimi (Firebase Trigger)
Firebase Realtime Database Trigger:
```javascript
// functions/index.js
exports.orderStatusChanged = functions.database
  .ref('/orders/{orderId}/status')
  .onUpdate(async (change, context) => {
    const newStatus = change.after.val();
    const orderId = context.params.orderId;
    
    // Müşteri token'ını al
    const order = await admin.database().ref(`/orders/${orderId}`).once('value');
    const customerEmail = order.val().customerEmail;
    const emailKey = customerEmail.replace(/[.@]/g, '_');
    const tokenSnap = await admin.database().ref(`/fcmTokens/${emailKey}`).once('value');
    const token = tokenSnap.val()?.token;
    
    if (!token) return;
    
    // Bildirim mesajı
    const statusMessages = {
      'confirmed': 'Siparişiniz onaylandı! 🎉',
      'preparing': 'Siparişiniz hazırlanıyor... 📦',
      'shipped': 'Teslimatçı yola çıktı! 🚗',
      'delivered': 'Siparişiniz teslim edildi! ✅'
    };
    
    const message = {
      notification: {
        title: 'Sipariş Güncellemesi',
        body: statusMessages[newStatus] || 'Siparişinizde güncelleme var'
      },
      token: token
    };
    
    return admin.messaging().send(message);
  });
```

---

## 5. Sorun Giderme

### "Service Worker kayıt hatası"
- HTTPS gereklidir (localhost hariç)
- Vercel otomatik HTTPS sağlar ✅

### "Bildirim izni reddedildi"
Tarayıcı ayarlarından manuel izin ver:
- Chrome: `chrome://settings/content/notifications`
- Edge: `edge://settings/content/notifications`

### "FCM Token alınamıyor"
- VAPID_KEY doğru mu kontrol et
- Firebase Console > Cloud Messaging > Web Push certificate var mı?

### "Arka plan bildirimi gelmiyor"
- Service Worker aktif mi kontrol et
- Site kapalıyken test et
- Mobile'da "Add to Home Screen" yaptın mı?

---

## 6. Gerekli İzinler

### Firebase Console'da Aktif Olması Gerekenler:
✅ Cloud Messaging API (Firebase Console > APIs)
✅ Realtime Database (aktif)
✅ Authentication (aktif)

### Tarayıcı İzinleri:
✅ Notification permission
✅ Service Worker support
✅ Background sync (opsiyonel)

---

## Özet Checklist

- [ ] Firebase Console'dan VAPID key al
- [ ] `tracking.js`'e VAPID_KEY ekle
- [ ] Token alma kodunu aktif et (yorum satırlarını kaldır)
- [ ] Git push yap, Vercel deploy et
- [ ] Tarayıcıda test et (bildirim izni ver)
- [ ] Service Worker kontrolü yap
- [ ] Mobil'de test et
- [ ] Backend'den test bildirimi gönder
- [ ] Otomatik tetikleyicileri aktif et

---

**NOT:** Bu sistem hem bilgisayar hem mobil'de çalışır. Ancak:
- **iOS Safari**: PWA olarak "Add to Home Screen" gerektirir
- **Android Chrome**: Direkt tarayıcıda çalışır
- **Desktop**: Tüm modern tarayıcılarda çalışır
