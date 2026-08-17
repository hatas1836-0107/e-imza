# Schema.org Doğrulama ve Google Search Console Hatası

**Tarih:** 17 Ağustos 2026  
**Sorun:** "Söz dizimi hatası olan yapılandırılmış veri algılandı"  
**Durum:** 🟡 Düzeltme yapıldı - test bekleniyor

---

## 🔍 TESPİT EDİLEN SORUN

Google Search Console'da **"Ayrıntırılamayan yapılandırılmış veri"** hatası:
- **Hata Mesajı:** "Yinelenen benzerini mük"
- **Tarih:** 17 Ağustos 2026, 23:00:05
- **Durum:** Başarıyla tarandı ama yapılandırılmış veri hatası var

---

## ✅ YAPILAN DÜZELTME

### Organization Schema - JSON Syntax Hatası Düzeltildi

**Problem:** `sameAs` array'i düzgün kapatılmamıştı (eksik kapanış parantezi)

**Önceki (HATALI):**
```json
"sameAs": [
  "https://www.instagram.com/imzaistanbul",
  "https://www.facebook.com/imzaistanbul",
  "https://www.linkedin.com/company/imzaistanbul",
  "https://twitter.com/imzaistanbul"
  // KAPANIŞ EKSİK!
```

**Sonraki (DOĞRU):**
```json
"sameAs": [
  "https://www.instagram.com/imzaistanbul",
  "https://www.facebook.com/imzaistanbul",
  "https://www.linkedin.com/company/imzaistanbul",
  "https://twitter.com/imzaistanbul"
  ]
}
</script>
```

---

## 🧪 DOĞRULAMA ADIMLARİ

### 1. Google Rich Results Test (EN ÖNEMLİ)

```
URL: https://search.google.com/test/rich-results
Test URL: https://www.imzaistanbul.com
```

**Beklenen Sonuç:**
- ✅ Organization schema geçerli
- ✅ LocalBusiness schema geçerli  
- ✅ Product schema geçerli
- ✅ FAQPage schema geçerli
- ✅ Breadcrumb schema geçerli

**Test Şimdi Yap:**
1. https://search.google.com/test/rich-results adresine git
2. "https://www.imzaistanbul.com" URL'ini yapıştır
3. "Test URL" butonuna tıkla
4. Sonuçları kontrol et

---

### 2. Schema.org Validator

```
URL: https://validator.schema.org/
Test URL: https://www.imzaistanbul.com
```

**Kontrol:**
- JSON syntax hataları var mı?
- Tüm required field'lar dolu mu?
- Array'ler düzgün kapalı mı?

---

### 3. Google Search Console - Manuel URL İnceleme

```
1. Google Search Console > URL İnceleme
2. URL: https://www.imzaistanbul.com
3. "CANLI URL'Yİ TEST ET" butonuna bas
4. Yapılandırılmış Veri bölümünü kontrol et
```

**Beklenen:**
- ✅ Hata yok
- ✅ Tüm schema'lar algılandı
- ✅ "Geçerli" durumu

---

## 📊 MEVCUT SCHEMA'LAR (index.html)

### 1. ✅ LocalBusiness Schema
```
- @type: ["LocalBusiness", "ProfessionalService"]
- name: İmza İstanbul
- logo: ✅
- geo coordinates: ✅
- areaServed: 39 ilçe ✅
- aggregateRating: ✅
```

### 2. ✅ Organization Schema (DÜZELTİLDİ)
```
- @type: Organization
- alternateName: ✅ (marka varyasyonları)
- logo: ImageObject ✅
- sameAs: ✅ (DÜZELTME: array properly closed)
- contactPoint: ✅
```

### 3. ✅ FAQPage Schema
```
- @type: FAQPage
- mainEntity: 42 soru ✅
```

### 4. ✅ Product Schema
```
- @type: Product
- offers: AggregateOffer ✅
- aggregateRating: ✅
- review: ✅
```

### 5. ✅ Breadcrumb Schema
```
- @type: BreadcrumbList
- itemListElement: ✅
```

---

## ⚡ GOOGLE SEARCH CONSOLE'DA YAPILACAKLAR

### ADIM 1: URL İnceleme ile Test Et (ŞİMDİ)
```
1. Search Console > URL İnceleme
2. https://www.imzaistanbul.com gir
3. "CANLI URL'Yİ TEST ET" butonuna bas
4. Sonuçları bekle (2-3 dakika)
5. "Yapılandırılmış Veri" sekmesini kontrol et
```

**Beklenen:** Hata mesajı kaybolmalı

---

### ADIM 2: Yeniden İndexleme İste
```
1. Canlı test tamamlandıktan sonra
2. "DİZİNE EKLEME İSTE" butonuna bas
3. 24-48 saat bekle
```

---

### ADIM 3: Geliştirmeler > Yapılandırılmış Veri
```
1. Search Console > Geliştirmeler
2. Sol menüden ilgili schema türünü seç:
   - Organization
   - LocalBusiness  
   - Product
   - FAQ
3. Hata sayısının azaldığını kontrol et
```

---

## 🔄 BEKLENTİLER

### 24 Saat İçinde:
- ✅ Google yeni schema'yı tarayacak
- ✅ "Söz dizimi hatası" kaybolmalı
- ✅ Tüm schema'lar "Geçerli" olmalı

### 48-72 Saat İçinde:
- ✅ Search Console'da hata sayısı 0
- ✅ Organization logo Google'da görünmeye başlar
- ✅ "İmza İstanbul" aramasında brand panel çıkabilir

---

## 🚨 DİĞER OLASI HATALAR (Kontrol Et)

### 1. Duplicate Schema
Aynı schema'nın birden fazla kez tanımlandığı durumlar:
```
❌ Sorun: İki ayrı Organization schema
✅ Çözüm: Sadece bir tane olmalı (düzelttik)
```

### 2. Invalid URL Format
```
❌ Sorun: http:// yerine https:// kullanılmalı
✅ Kontrol: Tüm URL'ler https:// ile başlıyor mu?
```

### 3. Empty Arrays
```
❌ Sorun: "sameAs": []
✅ Çözüm: Boş bırakılacaksa silin veya dolu kullanın
```

**Düzeltme:**
- LocalBusiness schema'da `"sameAs": []` boş - bu normaldir
- Organization schema'da dolu - doğru ✅

---

## 🎯 SONRAKI ADIMLAR

### 1. Rich Results Test Yap (ŞİMDİ)
```
https://search.google.com/test/rich-results?url=https://www.imzaistanbul.com
```

### 2. Schema.org Validator (Opsiyonel)
```
https://validator.schema.org/#url=https://www.imzaistanbul.com
```

### 3. Manuel İndexleme İste
```
Search Console > URL İnceleme > DİZİNE EKLEME İSTE
```

### 4. 24 Saat Sonra Kontrol
```
Search Console > Geliştirmeler > Organization
Hata sayısı: 0 olmalı
```

---

## 📝 NOTLAR

1. **JSON Syntax:** Tüm array'ler ve object'ler düzgün kapatılmalı
2. **Virgül Kullanımı:** Son element'ten sonra virgül OLMAMALI
3. **String Format:** URL'ler ve tel. no'lar string olmalı
4. **Required Fields:** @context, @type, name her zaman olmalı

---

## ✅ YAPILAN İYİLEŞTİRMELER (Özet)

- ✅ Organization schema JSON syntax hatası düzeltildi
- ✅ `sameAs` array düzgün kapatıldı
- ✅ Logo ImageObject formatında
- ✅ AlternateName ile marka varyasyonları eklendi
- ✅ ContactPoint detayları tam
- ✅ Sosyal medya linkleri eklendi

---

**Sonraki Kontrol:** 18 Ağustos 2026 (24 saat sonra)  
**Beklenen Sonuç:** Search Console'da yapılandırılmış veri hatası kaybolmalı
