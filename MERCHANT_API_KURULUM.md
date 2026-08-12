# Google Merchant Center API Otomatik Senkronizasyon

## 🎯 Ne İşe Yarar?

Firebase'deki ürünleri **tek tıkla** Google Shopping'e otomatik yükler. Manuel XML yükleme yok!

## 📦 Kurulum

### 1. Dependencies Yükle
```bash
npm install googleapis firebase-admin
```

### 2. Environment Variables Ayarla

`.env.local` dosyasındaki tüm Google credentials'ları Vercel'e ekle:

```bash
# Vercel Dashboard → Settings → Environment Variables
GOOGLE_PROJECT_ID=trim-saga-505323-b4
GOOGLE_PRIVATE_KEY_ID=...
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_CLIENT_EMAIL=imzaistanbul@trim-saga-505323-b4.iam.gserviceaccount.com
GOOGLE_CLIENT_ID=...
GOOGLE_CERT_URL=...
MERCHANT_CENTER_ID=5838463772
```

### 3. Vercel Deploy
```bash
vercel --prod
```

## 🚀 Kullanım

### Admin Panelden Senkronizasyon

1. `site/admin/sync-to-merchant.html` sayfasını aç
2. **"Ürünleri Yükle"** → Firebase'den ürünleri çek
3. **"Google Shopping'e Yükle"** → API ile otomatik yükle
4. ✅ Ürünler Merchant Center'da yayında!

### API Endpoint

```javascript
// POST /api/merchant-sync-endpoint
fetch('/api/merchant-sync-endpoint', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    products: [
      { id: '1y', name: 'E-İmza 1 Yıl', price: 950, status: 'active' },
      { id: '2y', name: 'E-İmza 2 Yıl', price: 1450, status: 'active' }
    ]
  })
})
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "details": {
    "success": ["1y"],
    "updated": ["2y"],
    "failed": []
  }
}
```

## ✅ Düzeltilen Hatalar

### Önceki Sorunlar:
- ❌ **Region Hatası**: `<g:region>İstanbul</g:region>` → Google kabul etmedi
- ❌ **GTIN Eksik**: identifier_exists belirtilmedi
- ❌ **XML Escape**: Özel karakterler hata verdi

### Çözümler:
- ✅ Region kaldırıldı, sadece `country: TR` kullanılıyor
- ✅ `identifierExists: false` eklendi
- ✅ XML escape fonksiyonu eklendi
- ✅ Price'ı string'e çevirme (`toString()`)
- ✅ ProductTypes düzgün format: `['Elektronik İmza > Nitelikli E-İmza']`

## 🔧 Troubleshooting

### API çalışmıyor?
```bash
# Vercel loglarını kontrol et
vercel logs

# Environment variables kontrol et
vercel env ls
```

### Ürünler onaylanmadı?
- Merchant Center → Ürünler → Diagnostics
- Hataları oku ve düzelt
- Yaygın sorunlar:
  - Image link geçersiz (https:// gerekli)
  - Description çok kısa (min 100 karakter)
  - Price formatı yanlış

## 📝 API vs XML Feed Karşılaştırması

| Özellik | Content API | XML Feed |
|---------|------------|----------|
| **Kurulum** | Vercel + Environment | Manuel XML yükleme |
| **Güncelleme** | Tek tıkla otomatik | Manuel dosya değişimi |
| **Hız** | Anında | 24 saate kadar |
| **Hata Yönetimi** | Gerçek zamanlı log | Geri bildirim yok |
| **Tavsiye** | ✅ Kullan | Yedek olarak |

## 🎉 Sonuç

Artık ürün güncellemeleri **otomatik**! Firebase'de ürün ekle/düzenle → Admin panelden sync et → Google Shopping'de yayında!
