# 🚚 Teslimat & Canlı Konum Tracking Kılavuzu

## ✨ Yeni Özellikler

### 1. Admin "Yolda" Durumuna Geçirince
- ✅ Sipariş otomatik olarak **kurye paneline düşer**
- ✅ `couriers/{courierId}/activeOrders/{orderId}` altında kaydedilir
- ✅ Kurye panelinde "Teslimata Hazır Siparişler" bölümünde görünür

### 2. "Yola Çıktım" Butonu
- ✅ **Admin Panelinde**: Shipped durumundaki her sipariş kartında
- ✅ **Kurye Panelinde**: Zaten mevcut olan "Yola Çıkıyorum" butonu
- ✅ **Fonksiyonlar**:
  - Konum izni ister
  - Wake Lock aktif eder (ekran kilitli olsa bile çalışır)
  - Her 10 saniyede bir konum günceller
  - watchPosition + manual interval (çift güvenlik)

### 3. Otomatik Durdurma
- ✅ Sipariş "delivered" veya "cancelled" olunca → Konum tracking **otomatik durur**
- ✅ Kurye/Admin panelinde realtime sipariş durumu takip edilir
- ✅ Wake Lock serbest bırakılır
- ✅ Toast bildirimi: "Teslimat tamamlandı - Konum paylaşımı durduruldu"

### 4. Müşteri Takip Sayfası
- ✅ **Sadece "shipped" durumunda** harita gösterilir
- ✅ Müşteri sayfayı açtığı sürece **canlı konum** görür
- ✅ Sayfa kapatılınca → Konum Firebase'den temizlenir (gereksiz veri yok)
- ✅ Teslim edildi/iptal edildi → Harita gizlenir

## 📱 Kullanım Senaryoları

### Senaryo 1: Admin Teslimat Başlatır
```
1. Admin → Sipariş durumu → "Yolda" seçer → Kaydet
2. Sistem → Kurye email'ine göre courier bulur
3. Sistem → `couriers/{courierId}/activeOrders/{orderId}` kaydeder
4. Kurye paneli → Sipariş otomatik görünür
5. Admin/Kurye → "Yola Çıktım" butonuna basar
6. Sistem → Konum paylaşımı başlar (ekran kilitli olsa bile)
7. Müşteri → Takip sayfasında canlı konum görür
8. Sipariş teslim edilince → Konum tracking otomatik durur
```

### Senaryo 2: Kurye Kendi Başlatır
```
1. Kurye panelinde → "Yola Çıkıyorum" butonunu basılı tutar (3 saniye)
2. Konum izni ister → İzin verilir
3. Wake Lock aktif → Ekran kilitli olsa bile konum gönderir
4. Her 10 saniyede Firebase'e konum günceller
5. Müşteri → Takip sayfasından canlı izler
6. Teslim tamamlanınca → Manuel veya otomatik durur
```

### Senaryo 3: Müşteri Takip Eder
```
1. Müşteri → Takip kodunu girer
2. Sipariş "shipped" ise → Harita açılır
3. Kurye konumu → Canlı olarak güncellenir (her 10 saniye)
4. Mesafe gösterilir: "Teslimatçı 2.3 km uzaklıkta"
5. Müşteri sayfayı kapatırsa → Artık konum çekilmez (Firebase tasarrufu)
6. Sipariş teslim edilince → Harita gizlenir
```

## 🔐 Güvenlik & İzinler

### Konum İzinleri
- ✅ Tarayıcıdan konum izni istenir
- ✅ İzin reddedilirse → Kullanıcıya açıklayıcı mesaj
- ✅ İzin verilmezse → Tracking başlatılamaz

### Firebase Rules
- ✅ `locations/{emailKey}` → Sadece auth olan kullanıcılar yazabilir
- ✅ `locations/{emailKey}` → Herkes okuyabilir (müşteri tracking için)
- ✅ `couriers/{courierId}/activeOrders` → Sadece auth kullanıcılar yazabilir

### Wake Lock
- ✅ Ekran kapansa bile konum gönderilir
- ✅ Teslimat bitince otomatik serbest bırakılır
- ✅ Tarayıcı desteklemezse → Tracking gene çalışır (opsiyonel)

## 🐛 Hata Durumları

### Konum Alınamıyor
- **Sebep 1**: GPS kapalı → "GPS aktif mi kontrol edin"
- **Sebep 2**: İzin reddedildi → "Tarayıcı ayarlarından izin verin"
- **Sebep 3**: Timeout → "Tekrar deneyin"

### Tracking Durmuyor
- **Çözüm**: Sayfa yenilenir → Otomatik temizlenir
- **Çözüm 2**: beforeunload event → Otomatik stopTracking()

### Firebase Hatası
- **Tracking devam eder** → Sadece console'da log
- **Kritik hata değil** → Kullanıcı bilgilendirilmez

## 📊 Performans

### Güncelleme Sıklığı
- ✅ **watchPosition**: Konum değiştiğinde otomatik
- ✅ **Manual interval**: Her 10 saniye kesin güncelleme
- ✅ **High accuracy**: GPS kullanılır (enerji tüketir ama doğru)

### Firebase Kullanımı
- ✅ Sadece **shipped** durumda konum gönderilir
- ✅ Müşteri sayfayı kapatınca → Veri temizlenir
- ✅ Teslim edilince → Tracking durur, veri kalmaz

### Batarya Tasarrufu
- ❌ High accuracy → Batarya tüketir (GPS)
- ✅ Teslimat bitince → Otomatik durur
- ✅ Wake Lock → Gerektiğinde kullanılır

## 🧪 Test Adımları

### Test 1: Admin "Yola Çıktım"
1. Admin panel → Giriş yap
2. Sipariş durumu → "Yolda" yap
3. "Yola Çıktım" butonuna bas
4. Konum izni ver
5. Console'da "Konum güncellendi" loglarını gör
6. Firebase → `locations/{email}` altında veri olmalı
7. Sipariş "delivered" yap → Toast: "Tracking durduruldu"

### Test 2: Kurye Paneli
1. Kurye panel → Giriş yap
2. "Yola Çıkıyorum" → 3 saniye basılı tut
3. Konum izni ver → "Konum Paylaşılıyor"
4. Firebase → `locations/{email}` güncelleniyor mu?
5. Sipariş teslim et → Tracking otomatik durmalı

### Test 3: Müşteri Takip
1. Takip sayfası → Takip kodu gir
2. Sipariş "shipped" ise → Harita açılmalı
3. Kurye marker → Canlı güncellemeli
4. Mesafe → Hesaplanmalı
5. Sayfayı kapat → `locations` verisi temizlenmeli
6. Sipariş "delivered" → Harita gizlenmeli

## ✅ Tamamlanan İşler

- [x] Admin "shipped" → Kurye paneline düşüyor
- [x] "Yola Çıktım" butonu eklendi (Admin & Kurye)
- [x] Wake Lock entegrasyonu
- [x] Otomatik durdurma (delivered/cancelled)
- [x] Müşteri takip → Sadece sayfa açıkken
- [x] Firebase optimizasyonu (gereksiz veri yok)
- [x] Çift güvenlik (watchPosition + interval)
- [x] Hata yönetimi ve toast bildirimleri

## 🎯 Sonuç

Sistem artık **production-ready**! 
- Konum tracking sadece gerektiğinde çalışır
- Firebase veri tasarrufu maksimum
- Kullanıcı deneyimi optimize edildi
- Hata durumları düzgün yönetiliyor
