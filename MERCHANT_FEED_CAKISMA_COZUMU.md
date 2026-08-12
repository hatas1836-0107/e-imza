# 🔴 "Öge-birden çok feed aracılığıyla yüklendi" Hatası Çözümü

## Sorun Nedir?

Aynı ürünler **birden fazla kaynaktan** yüklenmiş:
1. XML Feed (manuel/otomatik)
2. Content API (programatik)
3. Başka bir feed

Google Merchant Center aynı `offerId` ile gelen ürünleri kabul etmiyor.

## ✅ Hızlı Çözüm (3 Dakika)

### 1. Mevcut Feed'leri Kontrol Et

```
Merchant Center → Ürünler ve mağaza → Ürün kaynakları (Product Sources)
```

Göreceğin şeyler:
- `PRODUCTS SOURCE 3` (3 ürün) ← **Bunu sil!**
- Başka XML feed varsa onları da sil

### 2. Eski Feed'leri Sil

Her feed'in yanındaki **3 nokta (⋮)** → **Sil**

**VEYA**

"Ürün dosyanız" → "1 sorun bulundu" → Detaylara gir → Problemi gör → Feed'i kaldır

### 3. 24 Saat Bekle (Opsiyonel)

Google önbelleği temizler. Ama genelde hemen düzelir.

### 4. Content API ile Tekrar Yükle

```
site/admin/sync-to-merchant.html → Google Shopping'e Yükle
```

## 🎯 Kalıcı Çözüm: Tek Kaynak Kullan

### Seçenek A: Content API (Tavsiye Edilen) ✅

**Avantajları:**
- Otomatik senkronizasyon
- Gerçek zamanlı güncelleme
- Hata logları

**Kullanım:**
```bash
# Admin panelden tek tıkla
site/admin/sync-to-merchant.html
```

### Seçenek B: XML Feed

**Kullanım Durumu:**
- API çalışmıyorsa
- Vercel deployment yapamıyorsan

**Nasıl:**
1. XML oluştur (admin panel)
2. Merchant Center'a manuel yükle
3. **Content API'yi kullanma!**

## ❌ Yapma!

```
❌ Hem XML feed hem Content API kullanma
❌ Aynı offerId'yi farklı kaynaklardan gönderme
❌ Birden fazla feed aktif bırakma
```

## ✅ Yap!

```
✅ Tek kaynak seç (Content API tercih et)
✅ Eski feed'leri sil
✅ offerId'lerin unique olduğundan emin ol
```

## 🔍 Debug: Hangi Feed Aktif?

```bash
# Merchant Center
Ürünler ve mağaza → Ürün kaynakları

# Aktif feed'ler:
- "PRODUCTS SOURCE 3" → SİL
- "Primary Feed" → SİL  
- "product-feed.xml" → SİL

# Sadece Content API kullan!
```

## 📊 Feed Çakışması Kontrolü

| Feed Adı | Durum | Aksiyon |
|----------|-------|---------|
| PRODUCTS SOURCE 3 | ❌ Aktif | **SİL** |
| product-feed.xml | ❌ Aktif | **SİL** |
| Content API | ✅ Kullan | **Koru** |

## 🚀 Sonraki Adımlar

1. ✅ Eski feed'leri sil
2. ✅ `site/admin/sync-to-merchant.html` kullan
3. ✅ Ürünler "Onaylandı" durumuna gelecek
4. ✅ Google Shopping'de yayın!

## 💡 Pro Tip

Content API kullanırken **feed ekleme**. API direkt ürün ekler, feed gereksiz!
