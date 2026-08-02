# 🔥 Firebase Database Rules Deployment

## ⚡ HIZLI ÇÖZÜM (3 Adım)

### 1️⃣ Firebase Console'a Git
👉 **LİNK:** https://console.firebase.google.com/project/e-imza-4c867/database/e-imza-4c867-default-rtdb/rules

### 2️⃣ Sol menüden "Rules" sekmesine tıkla

### 3️⃣ Aşağıdaki kuralları KOPYALA ve tüm içeriği YAPıŞTıR:

```json
{"rules": {"products": {".read": true,".write": "auth != null && (auth.token.email == 'huseyinatas@gmail.com' || auth.token.email == 'huseyin.atas@gmail.com' || auth.token.email == 'hüseyinataş@gmail.com' || auth.token.email == 'admin@zirveeimza.com' || auth.token.email == '2sthillman@gmail.com')",".indexOn": ["status", "price", "createdAt", "category", "popular"]},"orders": {".read": true,"$orderId": {".write": true,"id": {".validate": "!newData.exists() || (newData.isString() && newData.val().length > 0)"},"customerName": {".validate": "!newData.exists() || (newData.isString() && newData.val().length >= 2)"},"customerPhone": {".validate": "!newData.exists() || (newData.isString() && newData.val().length >= 10)"},"customerEmail": {".validate": "!newData.exists() || (newData.isString() && newData.val().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i))"},"productName": {".validate": "!newData.exists() || newData.isString()"},"productPrice": {".validate": "!newData.exists() || newData.isString()"},"address": {".validate": "!newData.exists() || newData.isString()"},"district": {".validate": "!newData.exists() || newData.isString()"},"city": {".validate": "!newData.exists() || newData.isString()"},"status": {".validate": "!newData.exists() || (newData.isString() && newData.val().matches(/^(pending|confirmed|preparing|ready|shipped|delivered|cancelled)$/))"},"createdAt": {".validate": "!newData.exists() || newData.isString()"},"updatedAt": {".validate": "!newData.exists() || newData.isString()"},"history": {".validate": "!newData.exists() || newData.hasChildren()"},"notes": {".validate": "!newData.exists() || newData.isString()"},"deliveryType": {".validate": "!newData.exists() || newData.isString()"},"location": {".validate": "!newData.exists() || newData.isString()"},"latitude": {".validate": "!newData.exists() || newData.isString()"},"longitude": {".validate": "!newData.exists() || newData.isString()"},"courier": {".validate": "!newData.exists() || newData.hasChildren(['email', 'name'])","email": {".validate": "newData.isString()"},"name": {".validate": "newData.isString()"},"phone": {".validate": "!newData.exists() || newData.isString()"},"assignedAt": {".validate": "!newData.exists() || newData.isString()"}},"queuePosition": {".validate": "!newData.exists() || newData.isNumber()"},"totalAmount": {".validate": "!newData.exists() || newData.isNumber()"},"paymentMethod": {".validate": "!newData.exists() || newData.isString()"},"paymentStatus": {".validate": "!newData.exists() || newData.isString()"},".indexOn": ["status","createdAt","customerPhone","customerEmail","district"]}},"couriers": {".read": "auth != null",".write": "auth != null","$courierId": {"email": {".validate": "!newData.exists() || newData.isString()"},"name": {".validate": "!newData.exists() || newData.isString()"},"phone": {".validate": "!newData.exists() || newData.isString()"},"location": {".read": true,".write": "auth != null","latitude": {".validate": "!newData.exists() || newData.isNumber()"},"longitude": {".validate": "!newData.exists() || newData.isNumber()"},"timestamp": {".validate": "!newData.exists() || newData.isString()"},"accuracy": {".validate": "!newData.exists() || newData.isNumber()"}},"activeOrders": {".read": "auth != null",".write": "auth != null","$orderId": {"trackingCode": {".validate": "!newData.exists() || newData.isString()"},"assignedAt": {".validate": "!newData.exists() || newData.isString()"}}},"stats": {".validate": "!newData.exists() || newData.hasChildren()"},"isActive": {".validate": "!newData.exists() || newData.isBoolean()"},".indexOn": ["email","name","isActive"]}},"locations": {".read": true,"$emailKey": {".write": "auth != null","latitude": {".validate": "newData.isNumber()"},"longitude": {".validate": "newData.isNumber()"},"timestamp": {".validate": "newData.isString()"},"accuracy": {".validate": "!newData.exists() || newData.isNumber()"},"speed": {".validate": "!newData.exists() || newData.isNumber()"},"heading": {".validate": "!newData.exists() || newData.isNumber()"}}}}}
```

### 4️⃣ Sağ üstteki "PUBLISH" butonuna tıkla

### 5️⃣ Admin panelini yenile ve tekrar dene!

---

## 📝 DEĞİŞİKLİK

**Eklenen Email:**
- `hüseyinataş@gmail.com` (Türkçe karakterli)

**Neden Gerekli:**
Firebase'deki email listesinde Türkçe karakterli email adresi yoktu, bu yüzden admin olarak tanınmıyordunuz.

---

## 📁 Alternatif Dosyalar

- `FIREBASE_RULES_COPY_PASTE.json` - Tek satır (copy-paste için)
- `FIREBASE_RULES_GUNCEL.json` - Okunabilir format
- `database.rules.json` - Lokal dosya (güncellendi)

---

## ✅ Başarı Kontrolü

Deployment sonrası:
1. Admin paneline giriş yap (hüseyinataş@gmail.com)
2. Ürünler, siparişler yüklenmeli
3. "Yeni Ürün" ekleyebilmelisin
4. Tüm admin fonksiyonları çalışmalı

🎉 İyi çalışmalar!
