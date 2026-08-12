# 🚀 Vercel Deployment - Merchant API

## Neden Vercel?

API endpoint'leri `file://` protokolünden çalışmaz. Serverless function gerekli.

## 📦 Hızlı Deployment (5 Dakika)

### 1. Vercel CLI Yükle

```bash
npm install -g vercel
```

### 2. Vercel'e Login

```bash
vercel login
```

### 3. Dependencies Yükle

```bash
npm install
```

### 4. İlk Deploy (Test)

```bash
vercel
```

Çıktı:
```
🔗 Preview: https://imza-istanbul-xxx.vercel.app
```

### 5. Production Deploy

```bash
vercel --prod
```

Çıktı:
```
✅ Production: https://www.imzaistanbul.com
```

## 🔐 Environment Variables Ekle

### Vercel Dashboard Üzerinden:

1. https://vercel.com/dashboard → Proje seç
2. **Settings** → **Environment Variables**
3. Şunları ekle:

```env
GOOGLE_PROJECT_ID=trim-saga-505323-b4
GOOGLE_PRIVATE_KEY_ID=054a5894e895f1d1c8f9e3e8b5a9d4c3f2e1d0c9
GOOGLE_CLIENT_EMAIL=imzaistanbul@trim-saga-505323-b4.iam.gserviceaccount.com
GOOGLE_CLIENT_ID=112345678901234567890
MERCHANT_CENTER_ID=5838463772
GOOGLE_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/imzaistanbul%40trim-saga-505323-b4.iam.gserviceaccount.com
```

**GOOGLE_PRIVATE_KEY:**
```
-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDE4UZF5T2VS8RL
... (tüm key'i kopyala .env.local'den)
-----END PRIVATE KEY-----
```

⚠️ **ÖNEMLİ:** `\n` karakterlerini **olduğu gibi** kopyala!

### CLI Üzerinden (Alternatif):

```bash
# Her variable için
vercel env add GOOGLE_PROJECT_ID production
# Value gir: trim-saga-505323-b4

vercel env add GOOGLE_PRIVATE_KEY production
# Value gir (multi-line): -----BEGIN PRIVATE KEY-----\n...
```

### 6. Re-deploy (Env Variables Sonrası)

```bash
vercel --prod
```

## ✅ Test Et

### API Endpoint Test:

```bash
curl -X POST https://www.imzaistanbul.com/api/merchant-sync-endpoint \
  -H "Content-Type: application/json" \
  -d '{
    "products": [
      {
        "id": "test-1y",
        "name": "Test E-İmza 1 Yıl",
        "price": 950,
        "status": "active"
      }
    ]
  }'
```

**Beklenen Response:**
```json
{
  "success": true,
  "count": 1,
  "details": {
    "success": ["test-1y"],
    "updated": [],
    "failed": []
  }
}
```

### Admin Panel Test:

1. https://www.imzaistanbul.com/site/admin/sync-to-merchant.html
2. "Ürünleri Yükle"
3. "Google Shopping'e Yükle"
4. Başarılı! ✅

## 🐛 Troubleshooting

### API 500 Hatası?

```bash
# Logları kontrol et
vercel logs --follow

# Env variables kontrol et
vercel env ls
```

### CORS Hatası?

Admin paneli de **production URL'den** aç:
```
https://www.imzaistanbul.com/site/admin/sync-to-merchant.html
```

`file://` protokolünden değil!

### Private Key Hatası?

.env.local'deki `GOOGLE_PRIVATE_KEY`'i **tam olarak** kopyala:
- `\n` karakterlerini koru
- Başında/sonunda boşluk olmasın
- Tırnak içinde olmalı

## 📁 Deployment Yapısı

```
imza-istanbul/
├── api/
│   └── merchant-sync-endpoint.js  ← Serverless function
├── site/
│   └── admin/
│       └── sync-to-merchant.html  ← Frontend
├── vercel.json                     ← Config
├── package.json                    ← Dependencies
└── .env.local                      ← Local env (Vercel'e yüklenmiyor!)
```

## 🎯 Sonraki Adımlar

1. ✅ `vercel --prod` ile deploy et
2. ✅ Environment variables ekle
3. ✅ API'yi test et
4. ✅ Admin paneli kullan
5. ✅ Google Merchant Center'da ürünleri gör!

## 💡 Pro Tips

- **Auto-deployment:** GitHub repo'ya push → Otomatik deploy
- **Preview URLs:** Her commit için unique URL
- **Logs:** Real-time monitoring
- **Free tier:** Aylık 100GB bandwidth, 100 serverless invocations

## 🔗 Linkler

- Vercel Dashboard: https://vercel.com/dashboard
- Merchant Center: https://merchants.google.com
- Admin Panel: https://www.imzaistanbul.com/site/admin/sync-to-merchant.html
