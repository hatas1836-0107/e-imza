# Kurye Teslimat Sistemi

## Nasıl Çalışır?

### 1. Kurye Girişi
- Kurye `site/admin/kurye.html` adresinden giriş yapar
- Email ve şifre ile authenticate olur
- Panel açılır

### 2. Sipariş Alma
- Bekleyen siparişler listelenir (`confirmed`, `preparing`, `ready` durumdaki siparişler)
- Kurye "Siparişi Al" butonuna tıklar
- Sipariş otomatik olarak `shipped` durumuna geçer
- Kurye bilgileri Firebase'e kaydedilir

### 3. Konum Paylaşımı Başlatma
**"Yola Çıkıyorum" Butonu (Basılı Tut)**
- Kurye butona **basılı tutar** (1 saniye)
- Progress bar dolar
- Bırakınca konum paylaşımı başlar
- Buton kırmızıya döner: "Konum Paylaşılıyor"

### 4. Arka Plan Konum Takibi
Sistem şunları yapar:
- `watchPosition()` - sürekli konum takibi
- `getCurrentPosition()` - her 5 saniyede bir backup güncelleme
- `Wake Lock API` - ekran kilitli bile olsa konum alır
- `Page Visibility API` - arka planda bile tracking devam eder

Konum Firebase'e kaydedilir:
```
/locations/{email_key}/
  - latitude
  - longitude
  - accuracy
  - speed
  - heading
  - timestamp
  - lastUpdate
```

### 5. Müşteri Takibi
- Müşteri `site/takip.html?kod=ZE-2026-XXXX` sayfasını açar
- Kurye konumu gerçek zamanlı haritada gösterilir
- Mesafe hesaplanır ve gösterilir
- Yaklaşınca bildirim gelir

### 6. Teslimat Tamamlama
- Kurye "Teslim Edildi" butonuna basar
- Sipariş `delivered` durumuna geçer
- Konum paylaşımı durdurulur (eğer başka aktif sipariş yoksa)

## Özellikler

✅ **Basılı Tut Butonu** - Yanlışlıkla başlatmayı önler
✅ **Gerçek Arka Plan Takibi** - Wake Lock + Visibility API
✅ **Çift Güncelleme** - watchPosition + manuel interval
✅ **Otomatik Sipariş Atama** - Dropdown yok, kurye kendi alıyor
✅ **Canlı Harita** - Leaflet dark theme, güzel marker'lar
✅ **Yakınlık Bildirimleri** - 2km ve 500m'de bildirim

## Kurye Paneline Erişim

**URL:** `http://localhost:3000/site/admin/kurye.html`

**Test Kullanıcısı:**
- Email: `kurye@zirveeimza.com`
- Şifre: (Firebase Authentication'da oluşturulmalı)

## Admin Paneli Değişikliği

Admin panelinde artık:
- Kurye dropdown kaldırıldı
- Siparişler sadece durum güncellemesi için yönetilir
- Kuryeler kendi panellerinden sipariş alır

## Firebase Rules Gereksinimleri

```json
{
  "couriers": {
    ".read": "auth != null",
    ".write": "auth != null"
  },
  "locations": {
    ".read": true,
    "$email": {
      ".write": "auth != null"
    }
  },
  "orders": {
    ".read": true,
    ".write": true
  }
}
```

## Mobil Kullanım

Sistem mobil tarayıcılarda da çalışır:
- Chrome Android - ✅ Tam destekli
- Safari iOS - ✅ Konum çalışır (Wake Lock yok)
- Firefox Android - ✅ Tam destekli

## Troubleshooting

**Konum alınamıyor:**
- Tarayıcı ayarlarından konum iznini kontrol et
- HTTPS gerekli (localhost'ta çalışır)
- GPS açık olmalı

**Arka planda durduruyor:**
- Wake Lock izni ver
- Tarayıcıyı arka planda çalıştırma iznini aç
- Pil tasarrufu modunu kapat

**Konum güncellenmiyor:**
- İnternet bağlantısını kontrol et
- Firebase rules'ı kontrol et
- Console'da hata var mı bak
