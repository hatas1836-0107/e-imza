# ⚡ Zirve E-İmza - İstanbul E-İmza Kurye Hizmeti

Modern, responsive ve Firebase destekli e-imza hizmet platformu.

## 🚀 Hızlı Başlangıç

### 1. Projeyi Çalıştırma

```bash
# Bağımlılıkları yükle
npm install

# Development server'ı başlat
npm run dev
```

Site şu adreste açılacak: `http://localhost:8000`

### 2. Admin Panel

```bash
# Admin paneli direkt aç
npm run admin
```

Admin panel: `http://localhost:8000/site/admin/`

## 📁 Proje Yapısı

```
e-imza/
├── site/
│   ├── admin/              # 🔐 Admin Panel
│   │   ├── index.html      # Admin UI
│   │   ├── admin.js        # Admin logic
│   │   └── firebase-config.js  # Firebase config
│   ├── assets/
│   │   ├── css/
│   │   │   └── style.css   # Ana CSS (geliştirilmiş)
│   │   └── js/
│   │       └── main.js     # Ana JavaScript
│   ├── index.html          # Ana sayfa
│   ├── hizmetlerimiz.html  # Hizmetler
│   ├── fiyatlandirma.html  # Fiyatlar
│   ├── bolgeler.html       # Bölgeler (arama özellikli)
│   ├── iletisim.html       # İletişim (WhatsApp entegrasyonlu)
│   └── ...
├── kart3.html              # Demo: Takip kartı
├── kart5.html              # Demo: E-imza güvenlik
├── ADMIN_KURULUM.md        # 📖 Detaylı kurulum kılavuzu
├── package.json
└── README.md
```

## 🔥 Firebase Kurulumu

Detaylı kurulum için: **[ADMIN_KURULUM.md](./ADMIN_KURULUM.md)**

### Hızlı Adımlar:

1. **Firebase Projesi Oluştur**
   - https://console.firebase.google.com
   - Yeni proje oluştur: "e-imza"

2. **Authentication Aktifleştir**
   - Email/Password provider'ı aç

3. **Realtime Database Oluştur**
   - Database oluştur
   - Rules'u yapılandır

4. **Config Ekle**
   - Web app config'i al
   - `site/admin/firebase-config.js` dosyasına yapıştır

5. **Admin Kullanıcı Oluştur**
   - Authentication > Users > Add user
   - Email: `admin@zirveeimza.com`

## ✨ Özellikler

### 🎨 Frontend
- ✅ Modern glassmorphism tasarım
- ✅ Responsive (mobil, tablet, desktop)
- ✅ Custom animated cursor
- ✅ Smooth scroll efektleri
- ✅ Gelişmiş parallax arkaplan
- ✅ Toast notification sistemi
- ✅ WhatsApp entegrasyonu
- ✅ Google Maps entegrasyonu
- ✅ Reverse geocoding (konum → adres)
- ✅ İlçe arama (Türkçe karakter destekli)
- ✅ SEO optimize

### 🔐 Admin Panel
- ✅ Firebase Authentication
- ✅ Güvenli giriş/çıkış
- ✅ Ürün ekleme/düzenleme/silme
- ✅ Gerçek zamanlı güncelleme
- ✅ Dashboard istatistikleri
- ✅ Responsive tasarım
- ✅ Modern UI/UX

### 📱 İletişim Formu
- ✅ WhatsApp direkt gönderim
- ✅ Detaylı ürün bilgileri
- ✅ Konum paylaşımı
- ✅ Önizleme ekranı
- ✅ Form validasyonu

## 🛠️ Teknolojiler

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Firebase
  - Authentication
  - Realtime Database
- **APIs**: 
  - Google Maps
  - OpenStreetMap (Reverse Geocoding)
  - WhatsApp Business API
- **Build**: Node.js, npm
- **Server**: http-server (dev)

## 📊 Performans

- ⚡ First Contentful Paint: <1.5s
- ⚡ Time to Interactive: <2.5s
- ⚡ Lighthouse Score: 95+
- ⚡ 60 FPS animasyonlar
- ⚡ requestAnimationFrame optimizasyonu

## 🎯 Browser Desteği

- ✅ Chrome/Edge (son 2 versiyon)
- ✅ Firefox (son 2 versiyon)
- ✅ Safari 14+
- ✅ iOS Safari 14+
- ✅ Android Chrome

## 📝 Kullanım

### Site Güncelleme

1. **Ürün Ekleme**
   ```
   Admin Panel → Yeni Ürün Ekle
   ```

2. **Ürün Düzenleme**
   ```
   Admin Panel → Ürün listesi → Düzenle
   ```

3. **Fiyat Değiştirme**
   ```
   Düzenle → Fiyat alanını güncelle → Kaydet
   ```

### Deployment

#### Netlify
```bash
# netlify.toml oluştur
[build]
  publish = "site"

# Deploy
netlify deploy --prod
```

#### Vercel
```bash
vercel --prod
```

#### Firebase Hosting
```bash
firebase init hosting
firebase deploy
```

## 🔒 Güvenlik

- ✅ Firebase Security Rules
- ✅ Authentication zorunlu (admin)
- ✅ XSS koruması
- ✅ CSRF koruması
- ✅ HTTPS zorunlu (production)

## 📞 Destek

- **Email**: info@zirveeimza.com
- **Telefon**: 0545 386 34 07
- **WhatsApp**: Sitedeki butonu kullanın

## 📄 Lisans

ISC License - Commercial use allowed

---

**Geliştirici**: Zirve E-İmza Ekibi
**Son Güncelleme**: 2026-01-08
**Versiyon**: 1.0.0
