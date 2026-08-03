# 🏷️ META TAG KAPSAMLI EKLEME REHBERİ

## 📋 MEVCUT DURUM ANALİZİ

### ✅ Zaten Var Olan Meta Tags
```html
✓ charset="UTF-8"
✓ viewport
✓ title
✓ description
✓ canonical
✓ theme-color
✓ robots
✓ author
✓ geo.region
✓ geo.placename
✓ og:type, og:title, og:description, og:url
✓ og:site_name, og:locale, og:image
✓ twitter:card, twitter:title, twitter:description
```

### ❌ Eksik Olan Meta Tags (Eklenecek)

1. **Google Site Verification** (HTML etiket yöntemi)
2. **Keywords** (opsiyonel ama eklenebilir)
3. **Language** tags
4. **Mobile web app** tags
5. **Social media** additional tags
6. **Security** headers
7. **Performance** hints

---

## 🎯 KAPSAMLI META TAG PAKETİ

### 1. Google Doğrulama Meta Tag

Google Search Console'dan aldığınız kodu buraya ekleyin:

```html
<!-- Google Search Console Doğrulama -->
<meta name="google-site-verification" content="BURAYA-GOOGLE-KODUNUZ-GELECEK" />
```

**Nasıl Alınır:**
1. Google Search Console'a git
2. "Ayarlar" > "Mülkiyet doğrulama"
3. "HTML etiketi" metodunu seç
4. `content="..."` içindeki kodu kopyala

---

### 2. Bing/Microsoft Doğrulama

```html
<!-- Bing Webmaster Tools Doğrulama -->
<meta name="msvalidate.01" content="BING-KODUNUZ" />
```

---

### 3. Yandex Doğrulama (Türkiye için önemli)

```html
<!-- Yandex Webmaster Doğrulama -->
<meta name="yandex-verification" content="YANDEX-KODUNUZ" />
```

---

### 4. Keyword Meta Tag (Opsiyonel)

```html
<!-- Keywords (Google'da artık kullanılmıyor ama Yandex'te var) -->
<meta name="keywords" content="e-imza, elektronik imza, istanbul e-imza, nitelikli elektronik imza, e-imza başvuru, aynı gün kurye, e-imza fiyat, kurumsal e-imza, bireysel e-imza, mobil imza" />
```

---

### 5. Language & Region Tags

```html
<!-- Dil ve Bölge -->
<meta http-equiv="content-language" content="tr" />
<meta name="language" content="Turkish" />
```

---

### 6. Mobile Web App Tags (PWA Hazırlığı)

```html
<!-- Mobile Web App -->
<meta name="mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<meta name="apple-mobile-web-app-title" content="Zirve E-İmza" />
```

---

### 7. Additional Open Graph Tags

```html
<!-- Ek Open Graph Tags -->
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Zirve E-İmza - İstanbul'da Aynı Gün E-İmza Teslimatı" />
<meta property="og:updated_time" content="2026-08-04T12:00:00+03:00" />
```

---

### 8. Twitter Additional Tags

```html
<!-- Ek Twitter Tags -->
<meta name="twitter:site" content="@zirveeimza" />
<meta name="twitter:creator" content="@zirveeimza" />
<meta name="twitter:image" content="https://www.zirveeimza.com/assets/img/og-cover.jpg" />
<meta name="twitter:image:alt" content="Zirve E-İmza Logo" />
```

---

### 9. Contact & Business Info

```html
<!-- İletişim Bilgileri -->
<meta name="contact" content="info@zirveeimza.com" />
<meta name="reply-to" content="info@zirveeimza.com" />
<meta name="phone" content="+90-850-255-06-06" />
```

---

### 10. Copyright & Legal

```html
<!-- Telif Hakkı -->
<meta name="copyright" content="© 2026 Zirve E-İmza. Tüm hakları saklıdır." />
<meta name="rating" content="general" />
<meta name="distribution" content="global" />
```

---

### 11. Referrer Policy (Güvenlik)

```html
<!-- Güvenlik -->
<meta name="referrer" content="origin-when-cross-origin" />
```

---

### 12. Format Detection (Mobil)

```html
<!-- Format Algılama -->
<meta name="format-detection" content="telephone=yes" />
<meta name="format-detection" content="address=yes" />
```

---

## 📝 TAM KAPSAMLI HEAD BÖLÜMÜbireysel

Site/index.html için **tam optimized** head bölümü:

```html
<!DOCTYPE html>
<html lang="tr">
<head>
<!-- ===== TEMEL META TAGS ===== -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta http-equiv="X-UA-Compatible" content="IE=edge">

<!-- ===== SEO TEMEL ===== -->
<title>E-İmza Başvurusu ve Aynı Gün Kurye Teslimatı | Zirve E-İmza İstanbul</title>
<meta name="description" content="İstanbul'un 39 ilçesinde aynı gün kurye ile e-imza teslimatı. Nitelikli elektronik imza başvurusu online, bilgisayara anında teslim. Hemen fiyat alın.">
<meta name="keywords" content="e-imza, elektronik imza, istanbul e-imza, nitelikli elektronik imza, e-imza başvuru, aynı gün kurye, e-imza fiyat, kurumsal e-imza, bireysel e-imza, mobil imza, kadıköy e-imza, beşiktaş e-imza, şişli e-imza">
<link rel="canonical" href="https://www.zirveeimza.com/">

<!-- ===== ARAMA MOTORU YÖNETİMİ ===== -->
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<meta name="googlebot" content="index, follow">
<meta name="bingbot" content="index, follow">

<!-- ===== DOĞRULAMA KODLARI ===== -->
<meta name="google-site-verification" content="GOOGLE-KODUNUZ-BURAYA" />
<meta name="msvalidate.01" content="BING-KODUNUZ-BURAYA" />
<meta name="yandex-verification" content="YANDEX-KODUNUZ-BURAYA" />

<!-- ===== DİL & BÖLGE ===== -->
<meta http-equiv="content-language" content="tr" />
<meta name="language" content="Turkish" />
<meta name="geo.region" content="TR-34" />
<meta name="geo.placename" content="İstanbul" />
<meta name="geo.position" content="41.0082;28.9784" />
<meta name="ICBM" content="41.0082, 28.9784" />

<!-- ===== AUTHOR & COPYRIGHT ===== -->
<meta name="author" content="Zirve E-İmza" />
<meta name="copyright" content="© 2026 Zirve E-İmza. Tüm hakları saklıdır." />
<meta name="rating" content="general" />
<meta name="distribution" content="global" />

<!-- ===== İLETİŞİM BİLGİLERİ ===== -->
<meta name="contact" content="info@zirveeimza.com" />
<meta name="reply-to" content="info@zirveeimza.com" />
<meta name="phone" content="+90-850-255-06-06" />

<!-- ===== OPEN GRAPH (Facebook, LinkedIn) ===== -->
<meta property="og:type" content="website" />
<meta property="og:title" content="E-İmza Başvurusu ve Aynı Gün Kurye Teslimatı | Zirve E-İmza İstanbul" />
<meta property="og:description" content="İstanbul'un 39 ilçesinde aynı gün kurye ile e-imza teslimatı. Nitelikli elektronik imza başvurusu online, bilgisayara anında teslim. Hemen fiyat alın." />
<meta property="og:url" content="https://www.zirveeimza.com/" />
<meta property="og:site_name" content="Zirve E-İmza" />
<meta property="og:locale" content="tr_TR" />
<meta property="og:image" content="https://www.zirveeimza.com/assets/img/og-cover.jpg" />
<meta property="og:image:secure_url" content="https://www.zirveeimza.com/assets/img/og-cover.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Zirve E-İmza - İstanbul'da Aynı Gün E-İmza Teslimatı" />
<meta property="og:image:type" content="image/jpeg" />
<meta property="og:updated_time" content="2026-08-04T12:00:00+03:00" />

<!-- ===== TWITTER CARD ===== -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@zirveeimza" />
<meta name="twitter:creator" content="@zirveeimza" />
<meta name="twitter:title" content="E-İmza Başvurusu ve Aynı Gün Kurye Teslimatı | Zirve E-İmza İstanbul" />
<meta name="twitter:description" content="İstanbul'un 39 ilçesinde aynı gün kurye ile e-imza teslimatı. Nitelikli elektronik imza başvurusu online, bilgisayara anında teslim. Hemen fiyat alın." />
<meta name="twitter:image" content="https://www.zirveeimza.com/assets/img/og-cover.jpg" />
<meta name="twitter:image:alt" content="Zirve E-İmza Logo" />

<!-- ===== MOBİL WEB APP ===== -->
<meta name="mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<meta name="apple-mobile-web-app-title" content="Zirve E-İmza" />
<meta name="application-name" content="Zirve E-İmza" />

<!-- ===== THEME & APPEARANCE ===== -->
<meta name="theme-color" content="#0b0e1a" />
<meta name="msapplication-TileColor" content="#0b0e1a" />
<meta name="msapplication-navbutton-color" content="#0b0e1a" />

<!-- ===== GÜVENLİK & PRIVACY ===== -->
<meta name="referrer" content="origin-when-cross-origin" />
<meta http-equiv="X-Content-Type-Options" content="nosniff" />

<!-- ===== FORMAT DETECTION (Mobil) ===== -->
<meta name="format-detection" content="telephone=yes" />
<meta name="format-detection" content="address=yes" />
<meta name="format-detection" content="email=yes" />

<!-- ===== FAVICON ===== -->
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%234f46e5'/%3E%3Cstop offset='1' stop-color='%237c3aed'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='24' height='24' rx='6' fill='url(%23g)'/%3E%3Cpath d='M5 16 c3-6 5 -2 7 -7 c1.5 3 2 5 3.5 2' stroke='white' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">

<!-- ===== PRECONNECT (Performance) ===== -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="dns-prefetch" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="https://fonts.gstatic.com">

<!-- ===== STYLESHEET ===== -->
<link rel="stylesheet" href="assets/css/style.css">

<!-- ===== STRUCTURED DATA (Schema.org) ===== -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "name": "Zirve E-İmza",
      "image": "https://www.zirveeimza.com/assets/img/og-cover.jpg",
      "url": "https://www.zirveeimza.com/",
      "telephone": "+908502550606",
      "email": "info@zirveeimza.com",
      "priceRange": "₺₺",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "156",
        "bestRating": "5",
        "worstRating": "1"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "41.0082",
        "longitude": "28.9784"
      },
      "areaServed": [
        "Kadıköy", "Beşiktaş", "Şişli", "Ümraniye", "Üsküdar",
        "Bakırköy", "Beyoğlu", "Fatih", "Maltepe", "Kartal"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "İstanbul",
        "addressCountry": "TR"
      },
      "openingHoursSpecification": [{
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
        "opens": "09:00",
        "closes": "19:00"
      }],
      "paymentAccepted": ["Kredi Kartı", "Banka Havalesi", "EFT", "Kapıda Ödeme"],
      "currenciesAccepted": "TRY"
    },
    {
      "@type": "WebSite",
      "@id": "https://www.zirveeimza.com/#website",
      "url": "https://www.zirveeimza.com/",
      "name": "Zirve E-İmza",
      "description": "İstanbul'da e-imza başvurusu ve aynı gün kurye teslimatı",
      "publisher": {
        "@id": "https://www.zirveeimza.com/#organization"
      },
      "potentialAction": [{
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://www.zirveeimza.com/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }],
      "inLanguage": "tr"
    }
  ]
}
</script>

</head>
<body>
<!-- Sayfa içeriği buradan başlar -->
```

---

## 🚀 UYGULAMA ADIMLARI

### Adım 1: Google Verification Meta Tag Al

1. https://search.google.com/search-console/ git
2. Mülkünüzü seç
3. Ayarlar > Mülkiyet doğrulama
4. "HTML etiketi" seç
5. Kodu kopyala:
   ```html
   <meta name="google-site-verification" content="ABC123XYZ..." />
   ```

### Adım 2: index.html Dosyasını Güncelle

`<head>` bölümündeki mevcut meta tag'lerden sonra, eksik olanları ekle:

```html
<!-- Mevcut meta tag'lerden sonra ekle -->
<meta name="google-site-verification" content="BURAYA-KODUNUZ" />
<meta name="keywords" content="e-imza, elektronik imza, istanbul e-imza, ..." />
<meta http-equiv="content-language" content="tr" />
<!-- ... diğer eksik tag'ler -->
```

### Adım 3: Diğer Sayfalara da Uygula

Aynı meta tag'leri şu sayfalara da ekle:
- fiyatlandirma.html
- hakkimizda.html
- iletisim.html
- bolgeler.html
- hizmetlerimiz.html
- sss.html

**NOT:** Her sayfada sadece **Google verification** meta tag'i aynı. Diğer tag'ler (title, description, og:title, etc.) sayfa bazlı değişir.

---

## 📊 META TAG ETKİLERİ

| Meta Tag | Etki | Öncelik |
|----------|------|---------|
| Google Verification | Search Console erişimi | 🔴 CRITICAL |
| Title | Arama sonuçlarında başlık | 🔴 CRITICAL |
| Description | Arama sonuçlarında açıklama | 🔴 CRITICAL |
| Open Graph | Sosyal medya paylaşımı | 🟠 HIGH |
| Twitter Card | Twitter görünümü | 🟠 HIGH |
| Keywords | Yandex için | 🟡 MEDIUM |
| Geo Tags | Yerel SEO | 🟡 MEDIUM |
| Mobile App Tags | PWA hazırlığı | 🟢 LOW |

---

## ✅ KONTROL LİSTESİ

Meta tag'lerin doğru eklendiğini kontrol et:

```bash
1. [ ] Google verification meta tag eklendi
2. [ ] Keywords meta tag eklendi (10-15 keyword)
3. [ ] Language meta tags eklendi
4. [ ] Open Graph width/height eklendi
5. [ ] Twitter creator tag eklendi
6. [ ] Mobile web app tags eklendi
7. [ ] Contact info tags eklendi
8. [ ] Copyright tag eklendi
9. [ ] Referrer policy eklendi
10. [ ] Format detection tags eklendi
```

---

## 🧪 TEST ARAÇLARI

### 1. Meta Tag Validator
```
https://metatags.io/
```
→ Sitenizin URL'sini gir, tüm meta tag'leri görürsün

### 2. Facebook Sharing Debugger
```
https://developers.facebook.com/tools/debug/
```
→ Open Graph tag'lerini test et

### 3. Twitter Card Validator
```
https://cards-dev.twitter.com/validator
```
→ Twitter Card'larını test et

### 4. Google Rich Results Test
```
https://search.google.com/test/rich-results
```
→ Schema.org yapılandırılmış veriyi test et

---

## 📞 ÖZET

**Şu anda eksik olan:**
- Google verification meta tag (en önemli!)
- Keywords meta tag
- Language tags
- Mobile web app tags
- Additional OG/Twitter tags

**Yapılması gereken:**
1. Google Search Console'dan verification code al
2. Meta tag'leri site/index.html'e ekle
3. Git commit + push
4. Google'da "Doğrula" butonuna bas

**Hazırladım:** Bu dosyayı okuyarak tüm eksik meta tag'leri ekleyebilirsiniz!

