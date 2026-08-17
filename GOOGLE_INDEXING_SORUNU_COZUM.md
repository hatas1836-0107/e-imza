# Google'da "İmza İstanbul" Görünmeme Sorunu - Çözüm Rehberi

**Tarih:** 17 Ağustos 2026  
**Sorun:** Google'da "imzaistanbul" veya "İmza İstanbul" aramasında site çıkmıyor  
**Durum:** 🔴 KRİTİK - Acil Müdahale Gerekiyor

---

## 🔍 SORUNUN KÖK NEDENLERİ

### 1. ❌ Site Henüz Index'lenmemiş (En Muhtemel)
**Belirti:** Google Search Console'da "Keşfedildi - dizine eklenmedi" 47 sayfa  
**Neden:** Yeni site veya yakın zamanda yapılan SEO değişiklikleri  
**Süre:** İlk indexlenme 1-4 hafta sürebilir

### 2. ❌ Google Marka Adını Tanımıyor
**Problem:** "İmza İstanbul" brand awareness henüz oluşmamış  
**Sonuç:** Google brand search olarak algılamıyor

### 3. ❌ Domain Authority Düşük
**Problem:** Yeni domain, backlink yok  
**Sonuç:** Google güven skoru düşük

### 4. ❌ Manuel İndexleme Yapılmamış
**Problem:** Sitemap submit edilmiş ama manuel URL inspection yapılmamış  
**Sonuç:** Google botları henüz siteyi tam taramadı

---

## 🚨 ACİL ÇÖZÜM ADIMLARI (1-2 Gün İçinde)

### ADIM 1: Google Search Console - Manuel İndexleme (ÇOK ÖNEMLİ)

#### A) Ana Sayfayı Manuel İndexle
```
1. Google Search Console'a git: https://search.google.com/search-console
2. Üst kısımda "URL İnceleme" arama çubuğunu bul
3. Bu URL'i yapıştır: https://www.imzaistanbul.com
4. "DİZİNE EKLEME İSTE" butonuna tıkla
5. "Canlı URL'yi test et" de çalıştır
6. Google'ın onayını bekle (2-3 dakika)
```

**SONUÇ:** Ana sayfa 24-48 saat içinde index'lenecek ✅

#### B) Öncelikli Sayfaları İndexle (Toplam 5 sayfa)
```
https://www.imzaistanbul.com/hizmetlerimiz
https://www.imzaistanbul.com/fiyatlandirma
https://www.imzaistanbul.com/iletisim
https://www.imzaistanbul.com/hakkimizda
https://www.imzaistanbul.com/umraniye-e-imza
```

Her biri için ADIM 1A'yı tekrarla.

---

### ADIM 2: Google Business Profile Oluştur (MARKA GÜVENİ)

Google'a "İmza İstanbul" ismini **resmi olarak** tanıt:

```
1. Google Business Profile'a git: https://business.google.com
2. "İşletme ekle" butonuna tıkla
3. İşletme adı: "İmza İstanbul"
4. Kategori: "Dijital İmza Hizmeti" veya "Elektronik İmza Sağlayıcısı"
5. Adres: İstanbul ofis adresi (gerçek adres olmalı)
6. Web sitesi: https://www.imzaistanbul.com
7. Telefon: 0850 255 06 06
8. Doğrulama: Posta kartı ile (5-7 gün)
```

**SONUÇ:** 
- ✅ Google'da marka tanınırlığı
- ✅ Google Maps'te görünürlük
- ✅ "İmza İstanbul" aramasında öncelik

---

### ADIM 3: Sitemap'leri Yeniden Submit Et

#### A) Mevcut Sitemap'leri Kontrol
```
1. Search Console > Dizin oluşturma > Sitemaps
2. Mevcut durumu kontrol et:
   - sitemap.xml → Durum?
   - google-ads-pages.xml → Durum?
```

#### B) Yeni Submit (Eğer "Başarısız" veya "Beklemede" ise)
```
1. Eski sitemap'leri sil (üç nokta menüsü)
2. Yeniden ekle:
   - https://www.imzaistanbul.com/sitemap.xml
   - https://www.imzaistanbul.com/google-ads-pages.xml
3. "Gönder" butonuna tıkla
4. 24-48 saat bekle
```

---

### ADIM 4: robots.txt Doğrulama

#### Kontrol URL:
```
https://www.imzaistanbul.com/robots.txt
```

#### Beklenen Çıktı:
```
User-agent: *
Allow: /
Sitemap: https://www.imzaistanbul.com/sitemap.xml
```

#### Test Aracı:
```
Search Console > Tarama > robots.txt Test Aracı
```

**Sorun varsa:** robots.txt'i düzenle ve yeniden deploy et.

---

## ⚡ HIZLI KAZANIM STRATEJİLERİ (Aynı Gün)

### 1. Google Ads Kampanyası Başlat (Marka Araması)
```
Kampanya: Marka Koruması
Hedef Kelimeler: 
  - "imza istanbul"
  - "imzaistanbul"
  - "İmza İstanbul"
  - "imzaistanbul.com"

Reklam Metni:
"İmza İstanbul - Aynı Gün E-İmza
 ✓ 39 İlçeye Ücretsiz Kurye
 ✓ Anında Teslimat - 0850 255 06 06"

Bütçe: 50-100 TRY/gün
Sonuç: Organik çıkmazsan bile reklamla 1. sırada ol
```

### 2. Sosyal Medya Brand Awareness
```
Instagram: @imzaistanbul
- Bio'ya website linki ekle
- Hikaye'de link paylaş
- Hashtag: #imzaistanbul #eimzaistanbul

LinkedIn Şirket Sayfası:
- İmza İstanbul
- Website link ekle
- Google bu profili crawl edecek

Facebook Sayfa:
- İmza İstanbul
- "Hakkında" kısmında domain belirt
```

### 3. Backlink (En Az 3 Link)
```
1. Yerel dizinlerde kayıt:
   - sahibinden.com (firma dizini)
   - yandex.com.tr (firma kaydı)
   - bing.com (webmaster tools)

2. İçerik siteleri:
   - Medium makale yaz: "İstanbul'da E-İmza Nasıl Alınır?"
   - Link: https://www.imzaistanbul.com

3. Forum/Soru-Cevap:
   - Ekşi Sözlük, İnstagram gibi platformlarda paylaşım
```

---

## 📊 ORTA VADEDE ÇÖZÜM (1-4 Hafta)

### 1. İçerik Üretimi (Blog)
```
Hedef: Haftada 1-2 blog yazısı

Örnekler:
- "E-İmza Nedir? Nasıl Alınır?"
- "İstanbul'da E-İmza Fiyatları 2026"
- "Mobil İmza vs E-İmza Farkı"
- "E-İmza İle Hangi İşlemler Yapılır?"

Format:
- Min. 800 kelime
- Görseller ekle
- İç linkleme (ilçe sayfalarına)
- CTA: "Hemen başvur" butonları
```

### 2. Schema.org - Organization Schema Ekle
Ana sayfaya **Organization** schema ekleyelim (şu anda sadece LocalBusiness var):

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "İmza İstanbul",
  "alternateName": ["İmzaİstanbul", "Imza Istanbul"],
  "url": "https://www.imzaistanbul.com",
  "logo": "https://www.imzaistanbul.com/logo.png",
  "description": "İstanbul'un 39 ilçesine aynı gün e-imza teslimatı",
  "telephone": "+908502550606",
  "email": "info@imzaistanbul.com",
  "sameAs": [
    "https://www.instagram.com/imzaistanbul",
    "https://www.facebook.com/imzaistanbul",
    "https://www.linkedin.com/company/imzaistanbul"
  ]
}
```

Bu sayede Google "İmza İstanbul" marka adını tanıyacak.

### 3. NAP Tutarlılığı (Name, Address, Phone)
Tüm platformlarda **aynı bilgi**:
```
İsim: İmza İstanbul
Adres: [Gerçek ofis adresi]
Telefon: 0850 255 06 06
Web: https://www.imzaistanbul.com
```

---

## 🔍 SORUN TESPİT ARAÇLARI

### 1. Site Index Kontrolü
```
Google'da ara: site:imzaistanbul.com

Sonuç:
- 0 sonuç → Site hiç index'lenmemiş ❌
- 1-5 sonuç → Sadece birkaç sayfa index'li ⚠️
- 40+ sonuç → Tüm sayfalar index'li ✅
```

### 2. Marka Arama Kontrolü
```
Google'da ara: "İmza İstanbul"

Beklenen:
- 1. sırada: www.imzaistanbul.com
- Google Business Profile (sağ panel)
- Sosyal medya profilleri (2-3. sıra)
```

### 3. Rich Results Test
```
URL: https://search.google.com/test/rich-results
Test Et: https://www.imzaistanbul.com

Kontrol:
- LocalBusiness schema ✅
- Product schema ✅
- Organization schema ⚠️ (eklenecek)
- Logo ✅
```

### 4. PageSpeed Insights
```
URL: https://pagespeed.web.dev/
Test Et: https://www.imzaistanbul.com

Hedef:
- Mobil: 60+ puan
- Desktop: 80+ puan
```

---

## 📈 TAKİP TAKVİMİ

### İlk 48 Saat:
- ✅ Manuel indexleme tamamlandı mı?
- ✅ Google Business Profile başvurusu yapıldı mı?
- ✅ Google Ads marka kampanyası aktif mi?

### 1 Hafta Sonra:
- ✅ site:imzaistanbul.com → Kaç sayfa index'li?
- ✅ "İmza İstanbul" → Kaçıncı sırada çıkıyor?
- ✅ Search Console'da hatalar var mı?

### 2 Hafta Sonra:
- ✅ Google Business Profile doğrulandı mı?
- ✅ Backlink sayısı 3+ oldu mu?
- ✅ Blog içerikleri yayınlandı mı?

### 1 Ay Sonra:
- ✅ "İmza İstanbul" → 1-3. sırada mı?
- ✅ 39 ilçe sayfası index'li mi?
- ✅ Organik trafik başladı mı?

---

## 🎯 BEKLENTİLER VE GERÇEKLER

### ❌ YANLIş BEKLENTI:
"Bugün değişiklik yaptım, yarın 1. sırada olmalıyım"

### ✅ DOĞRU BEKLENTI:
```
Gün 0: Manuel indexleme isteği gönder
Gün 1-2: Google botları siteyi tarayacak
Gün 3-7: İlk sayfalar index'e girmeye başlar
Gün 7-14: "İmza İstanbul" aramada görünmeye başlar (5-10. sayfa)
Gün 14-30: Ranking yükselir (1-3. sayfa)
Ay 2-3: Stabil 1-3. sıra
```

### Hızlandırma Faktörleri:
✅ Google Business Profile (onay sonrası)  
✅ Backlink sayısı (5+ kaliteli link)  
✅ Sosyal medya aktivitesi  
✅ Blog içerik üretimi  
✅ Google Ads (interim çözüm)  

---

## 🆘 ACİL KONTROL LİSTESİ (ŞİMDİ YAP)

### ☐ 1. Google Search Console'a Gir
- URL: https://search.google.com/search-console
- Ownership doğrulandı mı?

### ☐ 2. Ana Sayfayı Manuel İndexle
- https://www.imzaistanbul.com
- "Dizine ekleme iste" butonuna bas

### ☐ 3. Sitemap Durumunu Kontrol Et
- sitemap.xml başarılı mı?
- Kaç URL keşfedildi?

### ☐ 4. robots.txt Test Et
- Googlebot engellenmiş mi?
- Sitemap tanımlı mı?

### ☐ 5. Google Business Profile Başvurusu
- Başvuru yaptın mı?
- Doğrulama posta kartı bekleniyor mu?

### ☐ 6. Google Ads Marka Kampanyası
- "imza istanbul" kelimesi için reklam ver
- Interim çözüm olarak hemen başlat

---

## 📞 DESTEK KAYNAKLARI

### Google Araçları:
- Search Console: https://search.google.com/search-console
- Business Profile: https://business.google.com
- Rich Results Test: https://search.google.com/test/rich-results
- PageSpeed Insights: https://pagespeed.web.dev

### SEO Araçları:
- Site Index: `site:imzaistanbul.com`
- Backlink Check: https://ahrefs.com/backlink-checker
- Schema Validator: https://validator.schema.org

---

## 💡 SONUÇ

**Ana Sorun:** Site henüz Google'da index'lenmemiş veya yeni index'lenmeye başladı.

**Çözüm:**
1. ⚡ ACİL: Manuel indexleme (bugün yap)
2. 📍 KRİTİK: Google Business Profile (hemen başvur)
3. 🚀 HIZLI: Google Ads marka kampanyası (interim)
4. 📈 UZUN VADE: İçerik + backlink + sosyal medya

**Tahmini Süre:** 
- ✅ İlk görünürlük: 3-7 gün
- ✅ İlk sayfa: 14-30 gün
- ✅ Top 3 sıra: 2-3 ay

---

**Son Güncelleme:** 17 Ağustos 2026  
**Durum:** 🔴 Acil müdahale bekleniyor
