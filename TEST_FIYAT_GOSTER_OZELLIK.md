# 💰 Fiyat Göster/Gizle Özelliği Test Rehberi

## ✅ Eklenen Özellik
Admin panelinde ürünlere "Fiyat Göster/Gizle" switch'i eklendi.

---

## 🎯 Nasıl Kullanılır?

### Admin Panelinde:
1. **Admin Panel** → **Ürünler** sayfasına git
2. Yeni ürün eklerken veya mevcut ürünü düzenlerken:
   - **"Fiyat Göster"** toggle switch'ini göreceksin
   - **AÇIK** (yeşil) → Ürün kartında fiyat görünür
   - **KAPALI** (gri) → Ürün kartında "Fiyat için iletişime geçin" yazar
3. Varsayılan olarak **AÇIK** gelir (tüm yeni ürünlerde fiyat gösterilir)

### Frontend'de (Ziyaretçiler için):
- **Fiyat Göster AÇIK** → Normal fiyat gösterilir: `450₺ +KDV`
- **Fiyat Göster KAPALI** → "Fiyat için iletişime geçin" mesajı gösterilir

---

## 📍 Hangi Sayfalarda Çalışır?

✅ **Ana Sayfa** (index.html / anasayfa.html)
✅ **Fiyatlandırma Sayfası** (fiyatlandirma.html)
✅ **Tüm ürün kartları**

---

## 🔧 Teknik Detaylar

### Değişen Dosyalar:
1. `site/admin/products.html` - Toggle switch UI eklendi
2. `site/admin/products-admin.js` - showPrice kaydetme/yükleme eklendi
3. `site/assets/js/products-premium.js` - Frontend render mantığı
4. `site/assets/js/firebase-products.js` - Alternatif render mantığı

### Veri Yapısı:
```json
{
  "name": "Bireysel E-İmza",
  "price": 450,
  "showPrice": true,  // ← YENİ ALAN
  "status": "active"
}
```

### Frontend Mantığı:
```javascript
// Eğer showPrice false ise
if (product.showPrice === false) {
  // "Fiyat için iletişime geçin" göster
} else {
  // Normal fiyat göster
}
```

---

## 🧪 Test Senaryoları

### Test 1: Yeni Ürün Ekle
1. Admin panelde yeni ürün ekle
2. "Fiyat Göster" switch'ini **KAPALI** yap
3. Kaydet
4. Ana sayfaya git
5. ✅ Ürün kartında "Fiyat için iletişime geçin" yazmalı

### Test 2: Mevcut Ürünü Düzenle
1. Admin panelde mevcut ürünü düzenle
2. "Fiyat Göster" switch'ini **AÇIK** yap
3. Kaydet
4. Ana sayfaya git
5. ✅ Ürün kartında fiyat görünmeli

### Test 3: Eski Ürünler (Geriye Dönük Uyumluluk)
- `showPrice` alanı olmayan eski ürünler otomatik olarak **fiyat gösterir**
- Default değer: `true`

---

## 💡 Kullanım Örnekleri

### Örnek 1: Özel Fiyatlı Kurumsal Paketler
- Kurumsal e-imza paketleri için fiyat gizlenebilir
- Müşteriler direkt iletişime geçmeye yönlendirilir

### Örnek 2: Kampanya Dönemleri
- Normal dönemde fiyat göster
- Kampanya döneminde fiyat gizle ve "Özel fiyat için arayın" de

### Örnek 3: VIP Müşteriler
- Standart ürünler → Fiyat göster
- Premium ürünler → Fiyat gizle

---

## 🎨 Görsel Özellikler

### Admin Panel:
- Modern toggle switch (mor gradient)
- Açıklama metni: "Ürün kartında fiyat bilgisi görüntülensin mi?"
- Badge gösterimi: 💰 Fiyat Göster / 🚫 Fiyat Gizli

### Frontend:
- Fiyat gösterildiğinde: Büyük, vurgulu tipografi
- Fiyat gizlendiğinde: Nazik, orta boyut "İletişime geçin" mesajı

---

## 🚀 Sonraki Adımlar

1. Admin panele git ve bir ürünün fiyatını gizle
2. Ana sayfaya git ve değişikliği gör
3. İletişim formunu test et
4. Her şey çalışıyorsa deploy et! 🎉
