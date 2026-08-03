# Sosyal Medya OG Image Cache Temizleme

## Sorun
WhatsApp, Facebook, Twitter gibi platformlar OG image'leri cache'liyor. Bir kez görünce tekrar kontrol etmiyor.

## Çözümler

### 1. Facebook Sharing Debugger
**URL:** https://developers.facebook.com/tools/debug/

**Adımlar:**
1. Sitenizin URL'sini girin: `https://e-imza.vercel.app`
2. "Fetch new information" (Yeni bilgi çek) butonuna tıklayın
3. Cache temizlenecek ve yeni OG image görünecek
4. Her sayfa için tekrarlayın (index, hakkimizda, fiyatlandirma vs.)

### 2. WhatsApp Link Preview Cache
WhatsApp için özel bir debugger yok, ama:

**Yöntem 1: URL'ye parametre ekle**
- `https://e-imza.vercel.app/?v=2`
- `https://e-imza.vercel.app/?refresh=1`
- Farklı parametre = yeni URL = yeni cache

**Yöntem 2: Bekleyin**
- WhatsApp cache'i 7-30 gün içinde otomatik temizlenir
- Acil değilse bekleyebilirsiniz

### 3. Twitter Card Validator
**URL:** https://cards-dev.twitter.com/validator

**Adımlar:**
1. URL'inizi girin
2. "Preview card" butonuna tıklayın
3. Yeni görsel yüklenecek

### 4. LinkedIn Post Inspector
**URL:** https://www.linkedin.com/post-inspector/

**Adımlar:**
1. URL'inizi girin
2. "Inspect" butonuna tıklayın
3. Cache temizlenecek

## Önizleme Test Linkleri

```
Facebook: https://developers.facebook.com/tools/debug/?q=https://e-imza.vercel.app
Twitter: https://cards-dev.twitter.com/validator
LinkedIn: https://www.linkedin.com/post-inspector/inspect/https://e-imza.vercel.app
```

## Güncel OG Image Bilgileri

- **URL:** `https://e-imza.vercel.app/og-image.png`
- **Boyut:** 1200x630 piksel
- **Format:** PNG
- **Dosya Boyutu:** ~1.4 MB

## Meta Tag Kontrolü

Sayfada şu tagların olması gerekiyor:

```html
<meta property="og:image" content="https://e-imza.vercel.app/og-image.png">
<meta property="og:image:secure_url" content="https://e-imza.vercel.app/og-image.png">
<meta property="og:image:type" content="image/png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Zirve E-İmza - İstanbul'da Aynı Gün E-İmza Teslimatı">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://e-imza.vercel.app/og-image.png">
```

## Hızlı Test

1. Vercel deploy edilene kadar bekleyin (1-2 dakika)
2. `https://e-imza.vercel.app/og-image.png` adresini tarayıcıda açın
3. Görsel görünüyorsa ✅
4. Facebook Debugger ile cache'i temizleyin
5. WhatsApp'ta yeni bir sohbette test edin

## İpuçları

- ✅ Her zaman HTTPS kullanın
- ✅ Görsel boyutu 1200x630 olmalı (önerilen)
- ✅ Dosya boyutu 2MB'dan küçük olmalı
- ✅ URL'de özel karakter olmamalı
- ✅ Görsel public olarak erişilebilir olmalı

## Sorun Devam Ederse

Eğer Facebook Debugger'da hala eski görsel görünüyorsa:
1. Tarayıcı cache'ini temizleyin
2. Incognito/Private modda test edin
3. Meta tagların doğru olduğunu `view-source:` ile kontrol edin
4. Vercel deployment loglarını kontrol edin
