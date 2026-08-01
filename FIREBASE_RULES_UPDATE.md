# Firebase Database Rules Güncelleme Talimatı

## ⚠️ ÖNEMLİ: Permission Denied Hatası Çözümü

Admin panelde `Permission denied` hatası alıyorsanız, Firebase Database rules'unu güncellemeniz gerekiyor.

## 🔗 Firebase Console Linki

Direkt erişim: https://console.firebase.google.com/project/e-imza-4c867/database/e-imza-4c867-default-rtdb/rules

## 📋 Yapılacaklar

1. Yukarıdaki linke tıklayın
2. Firebase Console'da "Rules" sekmesine gidin
3. Mevcut rules'u silin
4. Aşağıdaki rules'u yapıştırın
5. Sağ üstteki **"Publish"** butonuna tıklayın

## 🔒 Yeni Database Rules

```json
{
  "rules": {
    "products": {
      ".read": true,
      ".write": "auth != null && (auth.token.email == 'huseyinatas@gmail.com' || auth.token.email == 'hüseyinataş@gmail.com' || auth.token.email == 'admin@zirveeimza.com')",
      ".indexOn": ["status", "price", "createdAt"]
    },
    "orders": {
      ".read": true,
      ".write": "auth != null",
      "$orderId": {
        ".indexOn": ["status", "createdAt", "customerPhone"]
      }
    },
    "couriers": {
      ".read": "auth != null",
      ".write": "auth != null",
      "$courierId": {
        "location": {
          ".read": true
        },
        ".indexOn": ["email"]
      }
    }
  }
}
```

## ✅ Kontrolün Başarılı Olduğunu Anlamak

Rules'u yayınladıktan sonra:
1. Admin paneli sayfasını yenileyin (F5)
2. Giriş yapın
3. Artık "Permission denied" hatası almamalısınız
4. Ürünler listelenmeli ve yeni ürün ekleyebilmelisiniz

## 📝 Rules Açıklaması

- **products**: Herkes okuyabilir, sadece admin emailler yazabilir
- **orders**: Herkes okuyabilir, giriş yapmış kullanıcılar yazabilir  
- **couriers**: Sadece giriş yapmış kullanıcılar görebilir ve yazabilir
- **indexOn**: Performans için sıralama ve filtreleme alanları

## 🆘 Sorun Devam Ederse

1. Firebase Console'da Authentication sekmesine gidin
2. Users tabında `huseyinatas@gmail.com` kullanıcısının olduğundan emin olun
3. Çıkış yapıp tekrar giriş yapın
4. Tarayıcı cache'ini temizleyin (Ctrl+Shift+Del)

## 🚀 Sonraki Adımlar

Rules güncellendikten sonra admin panelde:
- ✅ Yeni ürün ekleyin
- ✅ Mevcut ürünleri düzenleyin  
- ✅ Ürün kategorisi ve popülerlik ayarlayın
- ✅ Ürün görsellerini yükleyin
- ✅ Ürünleri kopyalayın
