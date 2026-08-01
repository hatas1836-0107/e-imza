# 🔥 Firebase Admin Panel Kurulum Rehberi

## 📋 İçindekiler
1. [Firebase Projesi Oluşturma](#1-firebase-projesi-oluşturma)
2. [Firebase Yapılandırması](#2-firebase-yapılandırması)
3. [Authentication Kurulumu](#3-authentication-kurulumu)
4. [Realtime Database Kurulumu](#4-realtime-database-kurulumu)
5. [Admin Kullanıcı Oluşturma](#5-admin-kullanıcı-oluşturma)
6. [Güvenlik Kuralları](#6-güvenlik-kuralları)
7. [Test ve Kullanım](#7-test-ve-kullanım)

---

## 1. Firebase Projesi Oluşturma

### Adım 1.1: Firebase Console'a Giriş
1. https://console.firebase.google.com adresine gidin
2. Google hesabınızla giriş yapın
3. "Add project" butonuna tıklayın

### Adım 1.2: Proje Ayarları
1. **Project name**: `e-imza` veya `zirve-eimza` yazın
2. **Google Analytics**: İsteğe bağlı (önerilir)
3. "Create project" butonuna tıklayın
4. Proje hazır olduğunda "Continue" tıklayın

---

## 2. Firebase Yapılandırması

### Adım 2.1: Web App Ekleme
1. Firebase Console'da projenizin ana sayfasında
2. "</>" (Web) ikonuna tıklayın
3. **App nickname**: `Zirve E-İmza Admin` yazın
4. "Register app" tıklayın

### Adım 2.2: Config Bilgilerini Alma
Firebase size şu şekilde bir config verecek:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD...",
  authDomain: "e-imza.firebaseapp.com",
  projectId: "e-imza",
  storageBucket: "e-imza.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abc123",
  databaseURL: "https://e-imza-default-rtdb.firebaseio.com"
};
```

### Adım 2.3: Config'i Projeye Ekle
1. `site/admin/firebase-config.js` dosyasını açın
2. Yukarıdaki bilgileri kopyalayıp yapıştırın:

```javascript
export const firebaseConfig = {
  apiKey: "BURAYA_API_KEY",
  authDomain: "BURAYA_AUTH_DOMAIN",
  projectId: "BURAYA_PROJECT_ID",
  storageBucket: "BURAYA_STORAGE_BUCKET",
  messagingSenderId: "BURAYA_MESSAGING_SENDER_ID",
  appId: "BURAYA_APP_ID",
  databaseURL: "BURAYA_DATABASE_URL"
};
```

---

## 3. Authentication Kurulumu

### Adım 3.1: Authentication Aktifleştirme
1. Firebase Console'da sol menüden **"Authentication"** seçin
2. "Get started" butonuna tıklayın

### Adım 3.2: Email/Password Aktifleştirme
1. **"Sign-in method"** sekmesine gidin
2. **"Email/Password"** satırına tıklayın
3. **"Enable"** toggle'ını açın
4. "Save" tıklayın

---

## 4. Realtime Database Kurulumu

### Adım 4.1: Database Oluşturma
1. Sol menüden **"Realtime Database"** seçin
2. "Create Database" butonuna tıklayın
3. **Location**: En yakın bölgeyi seçin (örn: europe-west1)
4. **Security rules**: "Start in test mode" seçin (geçici)
5. "Enable" tıklayın

### Adım 4.2: Database URL'i Alma
Database oluşturulduktan sonra üstte göreceksiniz:
```
https://e-imza-default-rtdb.firebaseio.com/
```

Bu URL'i `firebase-config.js` içindeki `databaseURL` alanına ekleyin.

---

## 5. Admin Kullanıcı Oluşturma

### Yöntem 1: Firebase Console'dan (Önerilen)

1. Authentication > Users sekmesine gidin
2. "Add user" butonuna tıklayın
3. **Email**: `admin@zirveeimza.com`
4. **Password**: Güçlü bir şifre belirleyin (örn: `Admin123!@#`)
5. "Add user" tıklayın

### Yöntem 2: Console üzerinden

Firebase Console > Project Overview > Project settings > Service accounts
1. "Database secrets" tab'ine gidin
2. "Show" tıklayın ve secret'i kopyalayın

---

## 6. Güvenlik Kuralları

### Adım 6.1: Realtime Database Rules

1. Realtime Database > Rules sekmesine gidin
2. Aşağıdaki kuralları yapıştırın:

```json
{
  "rules": {
    "products": {
      ".read": true,
      ".write": "auth != null"
    },
    ".read": false,
    ".write": false
  }
}
```

**Açıklama:**
- `"products": { ".read": true }` → Ürünler herkes tarafından okunabilir (site için)
- `".write": "auth != null"` → Sadece giriş yapmış kullanıcılar yazabilir
- Diğer her şey kapalı (güvenlik)

### Adım 6.2: Publish Rules
"Publish" butonuna tıklayın.

---

## 7. Test ve Kullanım

### Test Adımları

1. **Admin Panel Açma**
   ```
   http://localhost:8000/site/admin/index.html
   ```
   veya
   ```
   https://yourdomain.com/site/admin/
   ```

2. **Giriş Yapma**
   - Email: `admin@zirveeimza.com`
   - Password: Oluşturduğunuz şifre

3. **Ürün Ekleme Testi**
   - "+ Yeni Ürün Ekle" butonuna tıklayın
   - Formu doldurun:
     - **Ürün Adı**: Bireysel E-İmza
     - **Fiyat**: 1250
     - **Süre**: 1 yıl
     - **Açıklama**: Akıllı kart + okuyucu dahil
     - **Özellikler**: 
       ```
       Akıllı kart + okuyucu dahil
       Online kurulum desteği
       E-Devlet uyumlu
       Telefon desteği
       ```
   - "Kaydet" tıklayın

4. **Database Kontrolü**
   - Firebase Console > Realtime Database
   - `products` node'unu görmelisiniz
   - Eklediğiniz ürün orada olmalı

---

## 🎯 Admin Panel Özellikleri

### ✅ Mevcut Özellikler

1. **Giriş/Çıkış**
   - Email/Password authentication
   - Güvenli oturum yönetimi

2. **Dashboard**
   - Toplam ürün sayısı
   - Aktif ürün sayısı
   - Toplam gelir hesaplama
   - Son güncelleme zamanı

3. **Ürün Yönetimi**
   - ✅ Ürün ekleme
   - ✅ Ürün düzenleme
   - ✅ Ürün silme
   - ✅ Durum değiştirme (Aktif/Pasif)
   - ✅ Gerçek zamanlı senkronizasyon

4. **Responsive Tasarım**
   - Mobil uyumlu
   - Tablet uyumlu
   - Desktop optimize

---

## 🔌 Frontend Entegrasyonu

Ürünleri sitenizde göstermek için:

```javascript
// site/assets/js/products.js (yeni dosya)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getDatabase, ref, onValue } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

// Config'i import et
import { firebaseConfig } from '../admin/firebase-config.js';

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Ürünleri yükle
function loadProducts() {
  const productsRef = ref(database, 'products');
  
  onValue(productsRef, (snapshot) => {
    const products = snapshot.val() || {};
    const activeProducts = Object.values(products)
      .filter(p => p.status === 'active');
    
    displayProducts(activeProducts);
  });
}

function displayProducts(products) {
  // Ürünleri HTML'e render et
  const container = document.getElementById('productsContainer');
  
  products.forEach(product => {
    const html = `
      <div class="product-card">
        <h3>${product.name}</h3>
        <p class="price">${product.price}₺</p>
        <p>${product.description}</p>
        <ul>
          ${product.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
      </div>
    `;
    container.innerHTML += html;
  });
}

// Sayfa yüklendiğinde çalıştır
loadProducts();
```

---

## 🚨 Güvenlik Notları

### ⚠️ ÖNEMLİ!

1. **API Keys Public**
   - Firebase API keys frontend'de görünür (normal)
   - Güvenlik database rules ile sağlanır
   - API key'leri gizlemenize gerek yok

2. **Admin Şifresi**
   - Güçlü şifre kullanın
   - Şifreyi kimseyle paylaşmayın
   - Düzenli olarak değiştirin

3. **Database Rules**
   - Yazma yetkisini sadece auth kullanıcılara verin
   - Production'da test mode'u kapatın

4. **HTTPS Kullanımı**
   - Production'da mutlaka HTTPS kullanın
   - Firebase Hosting kullanabilirsiniz

---

## 📝 Sık Sorulan Sorular

### S: Firebase ücretsiz mi?
**C:** Evet! Spark (Free) planı başlangıç için yeterli:
- 10GB Realtime Database
- 50K/day okuma
- 20K/day yazma
- 100 eşzamanlı bağlantı

### S: Birden fazla admin ekleyebilir miyim?
**C:** Evet! Authentication > Users'dan yeni kullanıcılar ekleyin.

### S: Ürünleri sitede nasıl gösteririm?
**C:** Yukarıdaki "Frontend Entegrasyonu" bölümüne bakın.

### S: Database'i yedekleyebilir miyim?
**C:** Evet! Realtime Database > Data > Export JSON

---

## 🎉 Tamamlandı!

Admin paneliniz hazır! Artık:
- ✅ Ürün ekleyebilirsiniz
- ✅ Fiyatları güncelleyebilirsiniz
- ✅ Özellikleri değiştirebilirsiniz
- ✅ Gerçek zamanlı yönetebilirsiniz

**Admin Panel URL:** `http://localhost:8000/site/admin/index.html`

**Sorularınız için:** GitHub Issues veya email ile ulaşın.

---

**Son Güncelleme:** 2026-01-08
