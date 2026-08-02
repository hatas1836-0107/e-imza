# 🔥 Firebase Rules Deployment Rehberi

## ❗ ÖNEMLİ: Rules Neden Çalışmıyor?

`database.rules.json` dosyasını güncelledik AMA bu sadece LOCAL bir dosya!
Firebase sunucusu bu değişiklikleri görmüyor. **Manuel olarak Firebase Console'dan yayınlanması gerekiyor.**

## 📋 ADIM ADIM DEPLOYMENT

### Yöntem 1: Firebase Console (EN KOLAY - ÖNERİLEN)

1. **Firebase Console'a git:**
   https://console.firebase.google.com/

2. **Projeyi seç:**
   - `e-imza-4c867` projesine tıkla

3. **Realtime Database'e git:**
   - Sol menüden "Build" → "Realtime Database" tıkla

4. **Rules sekmesine git:**
   - Üstteki "Rules" sekmesine tıkla

5. **Aşağıdaki rules'ı KOPYALA ve YAPIŞTIR:**

```json
{
  "rules": {
    "products": {
      ".read": true,
      ".write": "auth != null && (auth.token.email == 'huseyinatas@gmail.com' || auth.token.email == 'huseyin.atas@gmail.com' || auth.token.email == 'admin@zirveeimza.com' || auth.token.email == '2sthillman@gmail.com')",
      ".indexOn": ["status", "price", "createdAt", "category", "popular"]
    },
    "orders": {
      ".read": true,
      ".indexOn": ["status", "createdAt", "customerPhone", "customerEmail", "district"],
      "$orderId": {
        ".write": true
      }
    },
    "couriers": {
      ".read": "auth != null",
      ".write": "auth != null",
      ".indexOn": ["email", "name", "isActive"]
    },
    "locations": {
      ".read": true,
      "$emailKey": {
        ".write": "auth != null"
      }
    }
  }
}
```

6. **PUBLISH butonuna tıkla** (sağ üstte)

7. **Test et:**
   - Fiyatlandırma sayfasından bir ürüne "Sipariş Oluştur" tıkla
   - İletişim formunu doldur
   - Submit'e bas
   - Artık Firebase'e kaydedilmeli!

---

## ⚠️ Önemli Notlar:

- **orders** altındaki `$orderId` için `.write: true` - herkes sipariş oluşturabilir
- **products** sadece yetkililer yazabilir
- **couriers** ve **locations** sadece giriş yapmış kullanıcılar yazabilir

## 🔍 Deployment Kontrolü:

Console'da "Publish" dedikten sonra:
- Yeşil "Rules published successfully" mesajı göreceksiniz
- Timestamp güncellenecek

## ✅ Test Sonrası:

Tarayıcıda:
1. `Ctrl + Shift + R` (Windows) veya `Cmd + Shift + R` (Mac) ile cache temizle
2. Fiyatlandırma → Sipariş Oluştur → Form doldur → Gönder
3. Console'da error olmamalı
4. Firebase Console → Database → Data sekmesinde sipariş görünmeli
