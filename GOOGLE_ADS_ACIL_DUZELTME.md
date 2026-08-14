# 🚨 GOOGLE ADS ACİL DÜZELTİLMESİ GEREKEN SORUNLAR

## SORUN 1: Reklamlarda "Ümraniye E-İmza" Yazmıyor

### NEDEN?
Google Ads kampanyanızda yanlış **Landing Page** veya **Keyword targeting** olabilir.

### ÇÖZÜM - HEMEN YAPIN:

#### A. Reklam Başlıklarını Düzeltin

Google Ads'e gidin → Kampanyalar → Reklam Grupları → Reklamlar

**MEVCUT (YANLIŞ):**
```
Başlık 1: E-İmza Başvurusu
Başlık 2: Aynı Gün Teslimat
Başlık 3: 850 TL'den Başlayan Fiyatlar
```

**YENİ (DOĞRU):**
```
Başlık 1: Ümraniye E-İmza Aynı Gün
Başlık 2: Ümraniye'ye Kurye Teslimat
Başlık 3: 850 TL - Ümraniye E-İmza
```

#### B. Dynamic Keyword Insertion (DKI) Kullanın

Reklam başlığına şunu ekleyin:
```
{KeyWord:Ümraniye E-İmza} - Aynı Gün Teslimat
```

Bu şekilde:
- Kullanıcı "Ümraniye e-imza" ararsa → "Ümraniye E-İmza - Aynı Gün Teslimat"
- Kullanıcı "Kadıköy e-imza" ararsa → "Kadıköy E-İmza - Aynı Gün Teslimat"

---

## SORUN 2: Form Lead Ads Çıkıyor (Web Sitesine Gitmiyor)

### NEDEN?
Google'ın **Lead Form Extension** aktif olabilir veya **Search Ads** yerine **Lead Generation** kampanyası seçilmiş olabilir.

### ÇÖZÜM:

#### 1. Kampanya Tipini Kontrol Edin
```
Google Ads → Kampanyalar → [Kampanya Adı]
Kampanya Alt Türü: "Search" olmalı
Hedef: "Website Traffic" olmalı (Lead Generation değil!)
```

#### 2. Lead Form Extensions'ı Devre Dışı Bırakın
```
Google Ads → Reklamlar ve uzantılar → Uzantılar
Lead form uzantısı varsa → Kaldır
```

#### 3. Site Link Extensions Ekleyin
```
Uzantı Türü: Sitelink
Link 1: Ümraniye E-İmza (/umraniye-e-imza)
Link 2: Fiyatlandırma (/fiyatlandirma)
Link 3: Hemen Başvur (/siparis-formu)
Link 4: WhatsApp İletişim (https://wa.me/905453863407)
```

---

## SORUN 3: "Ümraniye E-İmza" Aramasında Çıkmıyor

### NEDEN?
1. **Quality Score düşük** (reklam-landing page uyumsuz)
2. **Teklif çok düşük** (rakipler daha yüksek teklif veriyor)
3. **Keyword'ler yanlış eklenmiş**

### ÇÖZÜM A: Anahtar Kelimeleri Kontrol Edin

```
Google Ads → Anahtar Kelimeler

EKLEMEN GEREKENLER (TAM EŞLEŞMELİ):
[ümraniye e-imza]
[ümraniye e imza]
[ümraniye elektronik imza]
[ümraniye e-imza nereden alınır]
[ümraniye e-imza fiyatları]
[ümraniye aynı gün e-imza]

EKLEMEN GEREKENLER (İFADE EŞLEŞMELİ):
"ümraniye e-imza kurye"
"ümraniye e-imza teslimatı"
"ümraniye e-imza başvurusu"
```

### ÇÖZÜM B: Landing Page'i Düzelt

**HATA:** Reklam "Ümraniye e-imza" için ama landing page "anasayfa"

**DOĞRU:**
```
Anahtar Kelime: [ümraniye e-imza]
→ Landing Page: https://www.imzaistanbul.com/umraniye-e-imza
```

### ÇÖZÜM C: Teklifi Artır

```
Şu anki teklif: Muhtemelen 1-2 TL/tıklama
Önerilen teklif: 5-8 TL/tıklama (başlangıç için)

Google Ads → Teklifler ve Bütçe
Manuel TBM (Tıklama Başı Maliyet)
Maksimum teklif: 8 TL
```

---

## SORUN 4: Sayfanın En Altında Çıkıyor

### NEDEN?
- **Ad Rank düşük** = (Teklif x Quality Score)
- Quality Score = Landing page deneyimi + Reklam uyumu + Beklenen TTO

### ÇÖZÜM: Quality Score'u Artırın

#### 1. Reklam - Landing Page Uyumu
```
❌ YANLIŞ:
Arama: "ümraniye e-imza"
Reklam Başlığı: "E-İmza Başvurusu"
Landing Page: Ana Sayfa (ümraniye kelimesi yok)
Quality Score: 3/10

✅ DOĞRU:
Arama: "ümraniye e-imza"
Reklam Başlığı: "Ümraniye E-İmza Aynı Gün"
Landing Page: /umraniye-e-imza (ümraniye 15+ kez geçiyor)
Quality Score: 9/10
```

#### 2. Title Tag'i Optimize Edin

**MEVCUT:**
```html
<title>Ümraniye E-İmza | Finans Merkezi, Küçükbakkalköy, Çakmak | Tüm İstanbul'a Aynı Gün Teslimat</title>
```

**DAHA İYİ:**
```html
<title>Ümraniye E-İmza - Aynı Gün Kurye Teslimat | 850 TL'den Başlayan Fiyatlar</title>
```

**NEDEN?**
- "Ümraniye E-İmza" başta
- "Aynı Gün" vurgusu
- Fiyat bilgisi (kullanıcılar bunu arıyor)
- Daha kısa (60 karakter altı)

#### 3. H1 Tag'i Düzelt

**MEVCUT:**
```html
<h1>Ümraniye E-İmza<br><span>Tüm İstanbul'a Aynı Gün</span></h1>
```

**DAHA İYİ:**
```html
<h1>Ümraniye E-İmza - Aynı Gün Kurye ile Teslimat</h1>
```

#### 4. İlk Paragrafı Optimize Edin

**MEVCUT:**
```html
<p>Finans Merkezi, Küçükbakkalköy, Çakmak ve İstanbul'un tüm 39 ilçesine...</p>
```

**DAHA İYİ:**
```html
<p>Ümraniye e-imza başvurusu için hemen online başvuru yapın. Ümraniye'nin tüm mahallelerine (Finans Merkezi, Küçükbakkalköy, Çakmak) aynı gün kurye ile teslimat. Nitelikli elektronik imza 850 TL'den başlayan fiyatlarla.</p>
```

**NEDEN?**
- "Ümraniye" kelimesi 3 kez
- "e-imza" kelimesi 3 kez
- "aynı gün" vurgusu
- Fiyat bilgisi
- CTA (hemen başvuru yapın)

---

## SORUN 5: Logo Görünmüyor

### KONTROL EDİN:

1. **Google Search Console'da test edin:**
```
https://search.google.com/test/rich-results
URL: https://www.imzaistanbul.com
```

2. **Schema.org validator'da test edin:**
```
https://validator.schema.org
URL: https://www.imzaistanbul.com
```

3. **Cache temizleme:**
```
Google'ın eski versiyonu cache'lemiş olabilir
2-4 hafta sürebilir
```

---

## ACİL YAPILACAKLAR LİSTESİ:

### 1. Google Ads'i Düzelt (5 dakika)
- [ ] Reklam başlıklarına "Ümraniye E-İmza" ekle
- [ ] Lead Form Extensions'ı kaldır
- [ ] Landing page'i /umraniye-e-imza yap
- [ ] Teklifi 5-8 TL'ye çıkar
- [ ] Dynamic Keyword Insertion ekle

### 2. Ümraniye Sayfasını Optimize Et (10 dakika)
- [ ] Title tag'i kısalt ve optimize et
- [ ] H1'i düzelt
- [ ] İlk paragrafı optimize et
- [ ] "Ümraniye" kelimesini daha fazla kullan

### 3. Test Et (24 saat sonra)
- [ ] "Ümraniye e-imza" araması yap
- [ ] Reklamın üstte çıktığını gör
- [ ] Reklam başlığında "Ümraniye" olduğunu doğrula
- [ ] Tıklayınca /umraniye-e-imza sayfasına gittiğini kontrol et

---

## BEKLENEN SONUÇLAR:

| Metrik | Şu an | Hedef (7 gün sonra) |
|--------|-------|---------------------|
| Reklam Pozisyonu | Alt sıralarda | 1-3. sıra |
| Quality Score | 3-4/10 | 8-9/10 |
| Tıklama Başı Maliyet | 8-10 TL | 2-4 TL |
| Tıklama Oranı (CTR) | %1-2 | %8-12 |
| Dönüşüm Oranı | %1.5 | %5-7 |

---

## NOTLAR:

1. **Form Lead Ads neden kötü?**
   - Kullanıcı sitenizi görmüyor
   - Güven oluşmuyor
   - Fiyatları görmüyor
   - Düşük kalite lead'ler
   - Dönüşüm oranı çok düşük

2. **Neden "Ümraniye" kelimesi önemli?**
   - Google reklam ile landing page arasında uyum arıyor
   - Kullanıcı "Ümraniye e-imza" yazıyor, sayfada "Ümraniye" görmek istiyor
   - Quality Score direkt bu uyumdan etkileniyor

3. **Logo neden görünmüyor?**
   - Google 1-2 hafta süre ile cache yapıyor
   - Schema markup'ınız doğru ama Google henüz indekslememiş
   - Sabır gerektiriyor (normal)
