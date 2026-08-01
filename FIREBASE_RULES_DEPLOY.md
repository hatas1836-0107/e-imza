# 🔥 Firebase Rules Deployment

## ⚠️ ÖNEMLİ: Bu adımları takip edin

### 1️⃣ Firebase Console'a gidin:
👉 https://console.firebase.google.com/project/e-imza-4c867/database/e-imza-4c867-default-rtdb/rules

### 2️⃣ Aşağıdaki rules'u kopyalayıp yapıştırın:

```json
{
  "rules": {
    "products": {
      ".read": true,
      ".write": "auth != null && (auth.token.email == 'huseyinatas@gmail.com' || auth.token.email == 'hüseyinataş@gmail.com' || auth.token.email == '3sthillman@gmail.com' || auth.token.email == 'admin@zirveeimza.com')",
      ".indexOn": ["status", "price", "createdAt", "category", "popular"]
    },
    "orders": {
      ".read": true,
      ".write": "auth != null",
      "$orderId": {
        ".validate": "newData.hasChildren(['id', 'customerName', 'customerPhone', 'customerEmail', 'productName', 'status', 'createdAt'])",
        ".indexOn": ["status", "createdAt", "customerPhone", "customerEmail"]
      }
    },
    "couriers": {
      ".read": "auth != null",
      ".write": "auth != null",
      "$courierId": {
        "location": {
          ".read": true,
          ".write": "auth != null"
        },
        "activeOrders": {
          ".read": "auth != null",
          ".write": "auth != null"
        },
        ".indexOn": ["email", "name"]
      }
    },
    "locations": {
      ".read": true,
      ".write": "auth != null",
      "$email": {
        ".validate": "newData.hasChildren(['latitude', 'longitude', 'timestamp'])"
      }
    }
  }
}
```

### 3️⃣ "Yayınla" butonuna tıklayın

### 4️⃣ Sayfayı yenileyin (Ctrl+F5)

## ✅ Değişiklikler:
- ✅ Admin emaillerine 3sthillman@gmail.com eklendi
- ✅ Orders write permission tüm authenticated kullanıcılara açıldı
- ✅ Locations read permission herkes için açık (takip için gerekli)
- ✅ Validasyonlar basitleştirildi

## 🎯 Sonuç:
- Admin artık sipariş alabilir (Ben Götürürüm butonu)
- Kuryeler "ready" siparişleri görebilir
- Konum paylaşımı tam çalışıyor
- Müşteriler kurye konumunu görebilir
