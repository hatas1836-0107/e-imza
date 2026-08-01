# 🚀 HIZLI BAŞLANGIÇ

## ✅ TAMAMLANAN İŞLEMLER

1. ✅ Firebase Realtime Database'e veriler eklendi
2. ✅ Admin ve Kurye kullanıcıları oluşturuldu
3. ✅ Örnek ürünler eklendi (4 adet)
4. ✅ Örnek sipariş oluşturuldu (ZE-2024-1001)

## 🎯 YAPILMASI GEREKENLER (Firebase Console'da)

### 1. Realtime Database'e Git
- Sol menüden **"Realtime Database"** seçin (Firestore değil!)
- Verilerin eklendiğini göreceksiniz

### 2. Database Rules'ı Ayarla
```
https://console.firebase.google.com/project/e-imza-4c867/database/e-imza-4c867-default-rtdb/rules
```

**Rules** sekmesine gidin ve şunu yapıştırın:

```json
{
  "rules": {
    "products": {
      ".read": true,
      ".write": "auth != null",
      ".indexOn": ["status", "price"]
    },
    "orders": {
      ".read": true,
      ".write": "auth != null",
      "$orderId": {
        ".indexOn": ["status", "createdAt", "customerPhone"]
      }
    },
    "couriers": {
      ".read": "auth != null",
      ".write": "auth != null",
      "$courierId": {
        "location": {
          ".read": true
        },
        ".indexOn": ["email"]
      }
    }
  }
}
```

**"Publish"** tıklayın!

### 3. Authentication Kontrol
```
https://console.firebase.google.com/project/e-imza-4c867/authentication/users
```

- 2 kullanıcı görmelisiniz:
  - ✅ hüseyinataş@gmail.com (Admin)
  - ✅ kurye@zirveeimza.com (Kurye)

### 4. Storage Aktifleştir (Görsel Yükleme İçin)
```
https://console.firebase.google.com/project/e-imza-4c867/storage
```

**"Get Started"** tıklayın, sonra **Rules** sekmesinde:

```
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
```

## 🌐 URL'LER

### 🖥️ Admin Paneli
```
http://localhost:8000/site/admin/index.html

Email: hüseyinataş@gmail.com
Şifre: hüseyinataş1234
```

**Yapabilecekleriniz:**
- ✅ Ürün ekleme/düzenleme/silme
- ✅ Sipariş oluşturma
- ✅ Sipariş durumu güncelleme
- ✅ Kurye atama
- ✅ Görsel yükleme

### 🚗 Kurye Paneli
```
http://localhost:8000/site/admin/kurye.html

Email: kurye@zirveeimza.com
Şifre: kurye123
```

**Yapabilecekleriniz:**
- ✅ Konum paylaşımını başlat
- ✅ Aktif teslimatları gör
- ✅ Teslimat tamamla
- ✅ Yol tarifi al

### 📦 Sipariş Takip
```
http://localhost:8000/site/takip.html?kod=ZE-2024-1001
```

**Müşteri görebilir:**
- ✅ Sipariş durumu
- ✅ Kurye konumu (harita)
- ✅ Mesafe bilgisi
- ✅ Sıra bilgisi
- ✅ Yakınlık bildirimleri

## 🎮 TEST SENARYOSU

### Adım 1: Admin Panele Giriş
1. `http://localhost:8000/site/admin/index.html` aç
2. Email: `hüseyinataş@gmail.com` / Şifre: `hüseyinataş1234`
3. 4 ürünü göreceksiniz

### Adım 2: Yeni Sipariş Oluştur
1. **Siparişler** tab'ına git
2. **+ Yeni Sipariş** tıkla
3. Müşteri bilgilerini gir
4. Takip kodu al (örn: ZE-2024-1002)

### Adım 3: Kurye Ata
1. Siparişi "Yolda" durumuna güncelle
2. Kurye email iste: `kurye@zirveeimza.com`
3. Kurye atandı!

### Adım 4: Kurye Panelde Konum Paylaş
1. Yeni tab: `http://localhost:8000/site/admin/kurye.html`
2. Kurye ile giriş yap
3. **Konum Paylaşımını Başlat** tıkla
4. Tarayıcı izni ver

### Adım 5: Müşteri Takip Sayfası
1. Yeni tab: `http://localhost:8000/site/takip.html?kod=ZE-2024-1002`
2. Haritada kurye konumunu gör
3. Mesafe bilgisini gör
4. Gerçek zamanlı güncellemeleri izle!

## 🐛 SORUN GİDERME

### "Permission denied" hatası
- Database Rules'ı ayarladınız mı?
- Kullanıcı giriş yaptı mı?

### Admin panelde ürünler görünmüyor
- Realtime Database'de veriler var mı kontrol edin
- Firebase config doğru mu?
- Browser console'da hata var mı? (F12)

### Harita görünmüyor
- Leaflet CDN yüklendi mi?
- Sipariş "Yolda" durumunda mı?
- Kurye konumu paylaşıyor mu?

### Konum paylaşılmıyor
- HTTPS kullanıyor musunuz? (localhost hariç)
- Tarayıcı izni verildi mi?
- GPS açık mı?

## 📊 VERİ YAPISI

### Products (Ürünler)
```json
{
  "product_1": {
    "name": "Bireysel E-İmza - 1 Yıl",
    "price": 1250,
    "duration": "1 yıl",
    "description": "...",
    "features": [...],
    "status": "active",
    "imageUrl": ""
  }
}
```

### Orders (Siparişler)
```json
{
  "ZE-2024-1001": {
    "id": "ZE-2024-1001",
    "customerName": "Test Müşteri",
    "customerPhone": "0532 123 45 67",
    "productName": "Bireysel E-İmza",
    "address": "Ataşehir, İstanbul",
    "latitude": 40.9829,
    "longitude": 29.1244,
    "status": "confirmed",
    "courier": {
      "name": "Test Kurye",
      "email": "kurye@zirveeimza.com",
      "phone": "0532 999 88 77",
      "location": {
        "latitude": 40.9830,
        "longitude": 29.1245,
        "timestamp": "2024-01-01T12:00:00Z"
      }
    },
    "queuePosition": 1,
    "history": [...]
  }
}
```

### Couriers (Kuryeler)
```json
{
  "kurye_zirveeimza_com": {
    "name": "Test Kurye",
    "email": "kurye@zirveeimza.com",
    "phone": "0532 999 88 77",
    "location": {
      "latitude": 40.9830,
      "longitude": 29.1245,
      "accuracy": 10,
      "timestamp": "2024-01-01T12:00:00Z"
    },
    "activeOrders": {
      "ZE-2024-1001": {
        "trackingCode": "ZE-2024-1001",
        "assignedAt": "2024-01-01T11:00:00Z"
      }
    }
  }
}
```

## 🎉 HER ŞEY HAZIR!

Artık:
- ✅ Admin panelden ürün yönetebilirsiniz
- ✅ Sipariş oluşturabilirsiniz
- ✅ Kurye atayabilirsiniz
- ✅ Müşteriler canlı takip yapabilir
- ✅ Kurye konumu gerçek zamanlı paylaşılır

**Kolay gelsin! 🚀**
