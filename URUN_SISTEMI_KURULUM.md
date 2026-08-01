# ÜRÜN YÖNETİM SİSTEMİ - KURULUM REHBERİ

## ✅ Yapılan Değişiklikler

### 1. Navigasyon Düzeltildi
- ✅ "Fiyatlar" linki tekrarı kaldırıldı (sadece 1 tane)
- ✅ Navigasyon: Ana Sayfa > Hizmetlerimiz > Fiyatlandırma > İletişim
- ✅ Mobile drawer da düzeltildi

### 2. Ürünler Bölümü Eklendi
- ✅ Anasayfaya 2 ürün bölümü eklendi:
  - **Üst bölüm**: Hizmetler'in üstünde (#products-section)
  - **Alt bölüm**: Testimonials'dan önce (#products-grid-bottom)
- ✅ Firebase'den dinamik yükleme
- ✅ Loading ve error state'leri

### 3. Sipariş Formu Modal
- ✅ "Sipariş Oluştur" butonu her üründe
- ✅ Modal form açılır
- ✅ Otomatik ürün bilgisi doldurulur
- ✅ **Konumumu Al** butonu:
  - GPS koordinat alır
  - Reverse geocoding ile açık adres alır
  - Koordinat hidden field'larda saklanır
- ✅ Firebase'e tam bilgi gider (koordinat dahil)
- ✅ WhatsApp'a **sadece açık adres** gider (koordinat GİTMEZ)

### 4. Admin Panel - Ürün Yönetimi
- ✅ Yeni sayfa: `/site/admin/products.html`
- ✅ CRUD işlemleri:
  - Ürün ekleme
  - Ürün düzenleme
  - Ürün silme
  - Aktif/Pasif durumu değiştirme
- ✅ Özellikler:
  - Ürün adı, fiyat, açıklama
  - Özellikler listesi (her satır bir özellik)
  - Popüler ürün işaretleme
  - Durum (aktif/pasif)

### 5. Firebase Yapılandırması
- ✅ Firebase SDK eklendi (index.html)
- ✅ Database URL düzeltildi: `firebaseio.com`
- ✅ Products collection rules:
  ```json
  "products": {
    ".read": true,
    ".write": "auth != null && (admin emails)"
  }
  ```

## 📁 Eklenen Dosyalar

```
site/
├── assets/
│   ├── js/
│   │   └── products.js           ← Ürün yükleme & sipariş formu
│   └── css/
│       └── style.css             ← Modal & product card stilleri (eklendi)
├── admin/
│   ├── products.html             ← Ürün yönetimi sayfası
│   ├── products-admin.js         ← Admin CRUD işlemleri
│   └── add-sample-products.html  ← Test için örnek ürünler
└── index.html                    ← Güncellenmiş (2 ürün bölümü + modal)
```

## 🚀 Kullanım Adımları

### 1. Örnek Ürünleri Ekle
```
http://localhost:8000/site/admin/add-sample-products.html
```
Bu sayfayı aç ve otomatik olarak 3 örnek ürün Firebase'e eklenecek.

### 2. Admin Panelden Ürün Yönet
```
http://localhost:8000/site/admin/products.html
```
- Giriş yap
- Ürün ekle/düzenle/sil
- Durumları değiştir

### 3. Anasayfada Test Et
```
http://localhost:8000/site/index.html
```
- Ürünler 2 bölümde görünmeli
- "Sipariş Oluştur" butonuna tıkla
- Formu doldur
- "Konumumu Al" ile konum al
- Siparişi oluştur

## 🔧 Sipariş Formu Özellikleri

### Form Alanları
- Ad Soyad *
- Telefon *
- E-posta *
- İlçe * (39 İstanbul ilçesi dropdown)
- Açık Adres * (textarea)
- Teslimat Tercihi * (Kurye / Online)
- Not (opsiyonel)

### Konumumu Al Butonu
```javascript
// GPS koordinat alır
latitude: 41.015137
longitude: 28.979530

// Reverse geocoding yapar
address: "Cumhuriyet Cad No:15, Taksim, Beyoğlu"

// Firebase'e GİDER:
{
  latitude: 41.015137,
  longitude: 28.979530,
  address: "Cumhuriyet Cad No:15...",
  location: "41.015137,28.979530"
}

// WhatsApp'a SADECE adres gider:
"*Adres:* Cumhuriyet Cad No:15, Taksim, Beyoğlu"
```

### Sipariş Takibi
Kurye, Firebase'deki koordinatları kullanarak müşterinin **TAM** konumunu görebilir:
```javascript
// tracking.js içinde
const customerLat = order.latitude;
const customerLng = order.longitude;
map.setView([customerLat, customerLng], 14);
```

## 🐛 Hata Giderme

### Ürünler Görünmüyorsa
1. Console'a bak:
```javascript
console.log('Loading products from Firebase...');
console.log('Firebase snapshot received:', true/false);
console.log('Product data:', {...});
```

2. Firebase Rules kontrol et:
```json
"products": {
  ".read": true  // ← Mutlaka true olmalı
}
```

3. Database URL kontrol et:
```javascript
databaseURL: "https://e-imza-4c867-default-rtdb.firebaseio.com"
// NOT: europe-west1 DEĞİL!
```

### Features Split Hatası
Eğer `features.split is not a function` hatası alıyorsan:
- Admin panelden features'ı **string** olarak kaydet
- Her satıra bir özellik yaz
- Kod otomatik `\n` ile split eder

## 📊 Firebase Data Yapısı

```json
{
  "products": {
    "-N1234567": {
      "name": "Bireysel E-İmza",
      "price": 450,
      "description": "...",
      "features": "1 yıl geçerlilik\nAkıllı kart dahil\n...",
      "priceNote": "/ yıl",
      "status": "active",
      "popular": true,
      "createdAt": "2026-08-01T...",
      "updatedAt": "2026-08-01T..."
    }
  },
  "orders": {
    "ZE-2026-1234": {
      "id": "ZE-2026-1234",
      "productId": "-N1234567",
      "productName": "Bireysel E-İmza",
      "productPrice": 450,
      "customerName": "Ahmet Yılmaz",
      "customerPhone": "05551234567",
      "customerEmail": "ahmet@email.com",
      "district": "Kadıköy",
      "address": "Moda Cad. No:15 Daire:3",
      "latitude": 40.987654,    ← Kurye için
      "longitude": 29.123456,   ← Kurye için
      "location": "40.987654,29.123456",
      "deliveryType": "courier",
      "notes": "...",
      "status": "pending",
      "createdAt": "2026-08-01T..."
    }
  }
}
```

## ✅ Test Checklist

- [ ] Anasayfada 2 bölümde ürünler görünüyor mu?
- [ ] Admin panelde ürün ekleyebiliyor musun?
- [ ] Ürün düzenleyebiliyor musun?
- [ ] "Sipariş Oluştur" modal açılıyor mu?
- [ ] "Konumumu Al" butonu çalışıyor mu?
- [ ] Koordinat ve adres alınıyor mu?
- [ ] Sipariş Firebase'e kaydediliyor mu?
- [ ] WhatsApp'a sadece adres (koordinat YOK) gidiyor mu?
- [ ] Kurye panelde koordinatlar görünüyor mu?

## 🎯 Sonuç

Artık tam çalışan bir ürün yönetim sisteminiz var:
- ✅ Admin ürün ekler/düzenler
- ✅ Anasayfa ürünleri gösterir
- ✅ Müşteri sipariş oluşturur
- ✅ Konum otomatik alınır
- ✅ Firebase'e tam bilgi gider
- ✅ WhatsApp'a gizli koordinat
- ✅ Kurye tam konumu görür
