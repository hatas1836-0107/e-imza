# 🚚 Sipariş Takip Sistemi - Kurulum Rehberi

## ✅ Sistem Özellikleri

### 🎯 Müşteri Tarafı
- ✅ Takip kodu ile sipariş sorgulama
- ✅ Gerçek zamanlı durum güncellemeleri
- ✅ Canlı harita üzerinde kurye konumu
- ✅ Mesafe hesaplama (km/metre)
- ✅ Yakınlık bildirimleri (500m, 2km)
- ✅ Sipariş geçmişi timeline
- ✅ Sıra bilgisi (Kaçıncı müşteri)
- ✅ Tahmini varış saati
- ✅ Arka planda konum takibi (izinle)

### 👨‍💼 Admin Tarafı
- ✅ Sipariş oluşturma
- ✅ Sipariş durumu güncelleme
- ✅ Kurye atama
- ✅ Sıra yönetimi
- ✅ Ürün yönetimi
- ✅ Görsel yükleme
- ✅ Realtime güncellemeler

### 🚗 Kurye Tarafı
- ✅ Konum paylaşımı (arka planda)
- ✅ Aktif teslimat listesi
- ✅ Sıra gösterimi
- ✅ Teslimat tamamlama
- ✅ Google Maps entegrasyonu
- ✅ Ekran kilidi engelleme

---

## 🔥 Firebase Kurulumu

### ADIM 1: Database Rules

Firebase Console > Realtime Database > Rules:

\`\`\`json
{
  "rules": {
    "products": {
      ".read": true,
      ".write": "auth != null"
    },
    "orders": {
      ".read": true,
      ".write": "auth != null",
      "$orderId": {
        ".indexOn": ["status", "createdAt"]
      }
    },
    "couriers": {
      ".read": "auth != null",
      ".write": "auth != null",
      "$courierId": {
        "location": {
          ".read": true
        }
      }
    }
  }
}
\`\`\`

**Açıklama:**
- `products`: Herkes okuyabilir, sadece adminler yazabilir
- `orders`: Herkes okuyabilir (takip için), sadece adminler yazabilir
- `couriers`: Sadece giriş yapmış kullanıcılar görebilir
- `location`: Kurye konumları herkese açık (müşteri takibi için)

### ADIM 2: Storage Rules

Firebase Console > Storage > Rules:

\`\`\`
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{productId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null 
                   && request.resource.size < 5 * 1024 * 1024
                   && request.resource.contentType.matches('image/.*');
      allow delete: if request.auth != null;
    }
  }
}
\`\`\`

### ADIM 3: Authentication

1. **Email/Password** aktif olmalı
2. **Google Sign-In** aktif olmalı

### ADIM 4: Indexes (Performans için)

Firebase Console > Realtime Database > Indexes:

\`\`\`json
{
  "rules": {
    "orders": {
      ".indexOn": ["status", "createdAt", "courier/email"]
    }
  }
}
\`\`\`

---

## 📝 Kullanım Senaryoları

### Senaryo 1: Yeni Sipariş Oluşturma

1. **Admin panelde:**
   - Siparişler tab'ına git
   - "+ Yeni Sipariş" tıkla
   - Müşteri bilgilerini gir
   - Ürün seç
   - Adres ve konum bilgisi gir
   - Oluştur

2. **Sistem otomatik:**
   - Takip kodu oluşturur (örn: ZE-2024-1234)
   - Firebase'e kaydeder
   - İlk durum: "Sipariş Alındı"

3. **Müşteriye:**
   - Takip kodunu SMS/WhatsApp ile gönder
   - Link: `https://yourdomain.com/site/takip.html?kod=ZE-2024-1234`

### Senaryo 2: Sipariş İşleme

1. **Admin panelde sipariş durumunu güncelle:**
   ```
   pending → confirmed (Onaylandı)
   confirmed → preparing (Hazırlanıyor)
   preparing → ready (Hazır)
   ready → shipped (Yola Çıktı - Kurye ata)
   shipped → delivered (Teslim Edildi)
   ```

2. **Her güncelleme:**
   - Timeline'a eklenir
   - Müşteri anlık görür
   - Timestamp kaydedilir

### Senaryo 3: Kurye Atama ve Teslimat

1. **Admin "Yola Çıktı" durumuna günceller:**
   - Kurye e-postası ister
   - Kurye siparişe atanır
   - Siparişe `queuePosition: 1` atanır

2. **Kurye panelde:**
   - Aktif siparişleri görür
   - "Konum Paylaşımını Başlat" tıklar
   - GPS konumu anlık paylaşılır

3. **Müşteri takip sayfasında:**
   - Haritada kurye konumunu görür
   - Mesafe bilgisi güncellenir
   - Yaklaştığında bildirim alır

4. **Kurye teslim eder:**
   - "Teslim Edildi" tıklar
   - Sipariş tamamlanır
   - Sıradaki siparişe geçer

### Senaryo 4: Çoklu Teslimat Sırası

1. **Admin aynı kuryeye 3 sipariş atar:**
   - Sipariş A: queuePosition = 1
   - Sipariş B: queuePosition = 2
   - Sipariş C: queuePosition = 3

2. **Müşteri B görür:**
   ```
   ℹ️ Kurye 1. müşteriye teslimat yapıyor.
   Siz sonraki teslimat noktasısınız.
   ```

3. **Müşteri C görür:**
   ```
   ℹ️ Kurye 1. müşteriye teslimat yapıyor.
   Siz 2. sırada teslimat noktasısınız.
   ```

4. **Sipariş A tamamlanınca:**
   - B otomatik `queuePosition = 1` olur
   - C otomatik `queuePosition = 2` olur
   - B müşterisi: "Kurye size doğru geliyor!"

---

## 🎨 Özelleştirme

### Yakınlık Bildirimleri

`site/assets/js/tracking.js` dosyasında:

\`\`\`javascript
// 500m'de bildirim
if (distance < 0.5 && lastProximityAlert !== 'close') {
  showNotification('🎯 Kurye Yakınınızda!', 'Kurye 500 metre içerisinde.');
  lastProximityAlert = 'close';
}

// 2km'de bildirim
else if (distance < 2 && lastProximityAlert === null) {
  showNotification('🚚 Kurye Yaklaşıyor', \`Kurye \${distance.toFixed(1)} km uzaklıkta.\`);
  lastProximityAlert = 'approaching';
}
\`\`\`

Mesafeleri istediğiniz gibi değiştirebilirsiniz (örn: 1km, 5km).

### Durum Metinleri

`site/assets/js/tracking.js` içinde:

\`\`\`javascript
const statusMap = {
  pending: { text: 'Sipariş Alındı', class: 'status-pending', icon: '📝' },
  confirmed: { text: 'Onaylandı', class: 'status-confirmed', icon: '✅' },
  // ... daha fazla durum
};
\`\`\`

### Tahmini Varış Saati

Admin panelde sipariş oluştururken:

\`\`\`javascript
const orderData = {
  // ... diğer alanlar
  estimatedArrival: new Date(Date.now() + 30 * 60000).toISOString() // 30 dakika sonra
};
\`\`\`

---

## 🧪 Test Senaryoları

### Test 1: Takip Sayfası

1. `http://localhost:8000/site/takip.html` aç
2. Takip kodu gir: `ZE-2024-001`
3. Sorgula
4. Sipariş bilgilerini gör
5. Timeline'ı kontrol et

### Test 2: Kurye Konum Paylaşımı

1. `http://localhost:8000/site/admin/kurye.html` aç
2. Kurye hesabıyla giriş yap
3. "Konum Paylaşımını Başlat" tıkla
4. Tarayıcı konum izni ver
5. Yeni tab'da takip sayfası aç
6. Haritada kendi konumunu gör

### Test 3: Gerçek Zamanlı Güncelleme

1. **Tab 1:** Takip sayfası
2. **Tab 2:** Admin paneli
3. Admin'den sipariş durumunu güncelle
4. Tab 1'de anlık güncellemeyi gör

### Test 4: Yakınlık Bildirimi

1. Takip sayfasını aç
2. Tarayıcı bildirim izni ver
3. Kurye konumunu manuel değiştir (Firebase Console)
4. Müşteri konumuna 500m yaklaştır
5. Bildirim geldiğini gör

---

## 📱 Mobil Optimizasyon

### iOS Safari

\`\`\`html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
\`\`\`

### Android Chrome

Arka planda konum için:

\`\`\`javascript
// Wake Lock API kullan (kurye.js'de mevcut)
const wakeLock = await navigator.wakeLock.request('screen');
\`\`\`

### Bildirimler

\`\`\`javascript
// İzin iste
if ('Notification' in window && Notification.permission === 'default') {
  await Notification.requestPermission();
}
\`\`\`

---

## 🔐 Güvenlik

### Admin Paneli

- Sadece giriş yapmış kullanıcılar erişebilir
- Firebase Auth ile korunur
- Email/Password veya Google ile giriş

### Kurye Paneli

- Kurye e-postası database'de kayıtlı olmalı
- Giriş yapmadan erişilemez
- Konum sadece aktif siparişlere gönderilir

### Müşteri Takip

- Takip kodu bilen herkes görür
- Sadece o siparişin bilgilerini görür
- Yazma yetkisi yok (read-only)

---

## 🚀 Production Deployment

### 1. Firebase Hosting

\`\`\`bash
firebase init hosting
# Public directory: site
# Single-page app: No
# GitHub: İsteğe bağlı

firebase deploy
\`\`\`

### 2. Custom Domain

Firebase Console > Hosting > Add custom domain

### 3. SSL

Otomatik aktif olur (Let's Encrypt)

### 4. Environment Variables

Production'da:
- Firebase config doğru olmalı
- Database rules aktif olmalı
- Storage rules aktif olmalı

---

## 📊 Monitoring

### Firebase Console'da İzle

1. **Realtime Database > Usage**
   - Bağlantı sayısı
   - Okuma/yazma sayısı
   - Storage kullanımı

2. **Authentication > Users**
   - Aktif kullanıcılar
   - Son giriş zamanları

3. **Storage > Usage**
   - Yüklenen görseller
   - Storage boyutu

### Performans

- Orders indexleri aktif olmalı
- Location updates throttle edilmeli (5-10 saniyede bir)
- Eski siparişler arşivlenebilir

---

## 🐛 Sorun Giderme

### Konum paylaşımı çalışmıyor

1. **Tarayıcı:** Sadece HTTPS'de çalışır (localhost hariç)
2. **İzin:** Kullanıcı izin vermeli
3. **GPS:** Cihazda GPS aktif olmalı

### Harita görünmüyor

1. Leaflet CDN'leri yüklendi mi kontrol et
2. `#map` div'inin height'ı var mı
3. Console'da hata var mı

### Bildirimler gelmiyor

1. Tarayıcı bildirimleri destekliyor mu
2. Kullanıcı izin verdi mi
3. HTTPS kullanılıyor mu

### Realtime güncelleme yok

1. Firebase config doğru mu
2. Database rules doğru mu
3. Internet bağlantısı var mı

---

## 📞 Destek

### Loglar

Browser Console (F12) ve Firebase Console'u kontrol edin.

### Test Komutları

\`\`\`bash
# Development server
npm start

# Admin paneli
http://localhost:8000/site/admin/index.html

# Kurye paneli
http://localhost:8000/site/admin/kurye.html

# Takip sayfası
http://localhost:8000/site/takip.html?kod=ZE-2024-001
\`\`\`

---

**🎉 Sistem Hazır!**

Sipariş takip sisteminiz artık tamamen çalışır durumda. Müşterileriniz gerçek zamanlı olarak kurye konumunu takip edebilir!

**Özellikler:**
- ✅ Gerçek zamanlı konum takibi
- ✅ Çoklu teslimat sırası
- ✅ Yakınlık bildirimleri
- ✅ Arka planda çalışma
- ✅ Mobil uyumlu
- ✅ Firebase entegrasyonu

**İyi teslimatlar! 🚚**
