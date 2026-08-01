# 🔥 Firebase Kurulum - Adım Adım Talimatlar

## ✅ Mevcut Durum

Projenizde şunlar hazır:
- ✅ Firebase bağımlılıkları yüklenmiş (`package.json`)
- ✅ Admin panel UI oluşturulmuş (`site/admin/index.html`)
- ✅ Admin panel logic hazır (`site/admin/admin.js`)
- ✅ Service account dosyanız mevcut (`e-imza-4c867-firebase-adminsdk-fbsvc-fa3d0863ee.json`)
- ✅ Firebase config başlangıç dosyası güncellenmiş

## 🎯 Yapılması Gerekenler

### ADIM 1: Firebase Console'a Giriş

1. Tarayıcınızda açın: https://console.firebase.google.com
2. Google hesabınızla giriş yapın
3. **"e-imza-4c867"** projesini bulun ve tıklayın

### ADIM 2: Web App Config Bilgilerini Alma

1. Firebase Console'da sol üstte **⚙️ (Settings)** ikonuna tıklayın
2. **"Project settings"** seçeneğine tıklayın
3. Aşağı kaydırın, **"Your apps"** bölümüne gidin
4. Eğer web app yoksa:
   - **"</>"** (Web) ikonuna tıklayın
   - App nickname: `Zirve E-İmza Web`
   - **"Register app"** tıklayın
5. **"Config"** yazısını bulun ve Firebase SDK snippet'i görün
6. Şu bilgileri kopyalayın:

```javascript
const firebaseConfig = {
  apiKey: "...",           // Bu değeri kopyalayın
  authDomain: "...",       // Bu değeri kopyalayın
  projectId: "e-imza-4c867", // ✅ Zaten doğru
  storageBucket: "...",    // Bu değeri kopyalayın
  messagingSenderId: "...", // Bu değeri kopyalayın
  appId: "...",            // Bu değeri kopyalayın
  databaseURL: "..."       // Bu değeri kopyalayın
};
```

### ADIM 3: firebase-config.js Dosyasını Güncelleme

1. VS Code'da `site/admin/firebase-config.js` dosyasını açın
2. ADIM 2'de kopyaladığınız değerleri yapıştırın
3. Dosyayı kaydedin (Ctrl+S / Cmd+S)

**Örnek:**
```javascript
export const firebaseConfig = {
  apiKey: "AIzaSyD...xYz123",  // Firebase'den kopyalanan gerçek değer
  authDomain: "e-imza-4c867.firebaseapp.com",
  projectId: "e-imza-4c867",
  storageBucket: "e-imza-4c867.firebasestorage.app",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456",
  databaseURL: "https://e-imza-4c867-default-rtdb.firebaseio.com"
};
```

### ADIM 4: Authentication Aktifleştirme

1. Firebase Console'da sol menüden **"Authentication"** seçin
2. **"Get started"** butonuna tıklayın (ilk kez açıyorsanız)
3. **"Sign-in method"** tab'ine gidin
4. **"Email/Password"** satırını bulun ve tıklayın
5. **"Enable"** toggle'ını açın (mavi yapın)
6. **"Save"** butonuna tıklayın

### ADIM 5: Realtime Database Oluşturma

1. Sol menüden **"Realtime Database"** seçin
2. **"Create Database"** butonuna tıklayın
3. **Database location**: 
   - Tercih: `europe-west1 (Belgium)` (Türkiye'ye en yakın)
   - Veya herhangi bir bölge seçin
4. **Security rules**: **"Start in test mode"** seçin (geçici)
5. **"Enable"** butonuna tıklayın

### ADIM 6: Database URL Kontrolü

1. Database oluşturulduktan sonra üstte URL göreceksiniz:
   ```
   https://e-imza-4c867-default-rtdb.firebaseio.com/
   ```
2. Bu URL'nin `firebase-config.js` dosyasındaki `databaseURL` ile aynı olduğundan emin olun

### ADIM 7: Admin Kullanıcı Oluşturma

1. Sol menüden **"Authentication"** seçin
2. **"Users"** tab'inde olduğunuzdan emin olun
3. **"Add user"** butonuna tıklayın
4. Bilgileri girin:
   - **Email**: `admin@zirveeimza.com`
   - **Password**: Güçlü bir şifre (örn: `Admin2026!@#ZirveEimza`)
   - **Not**: Bu şifreyi bir yere kaydedin!
5. **"Add user"** butonuna tıklayın

### ADIM 8: Güvenlik Kurallarını Ayarlama

1. **Realtime Database** sayfasına gidin
2. **"Rules"** tab'ine tıklayın
3. Mevcut kuralları silin ve şunu yapıştırın:

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

4. **"Publish"** butonuna tıklayın
5. Uyarı çıkarsa **"Publish"** onaylayın

**Açıklama:**
- `products` node'u herkes okuyabilir (site ziyaretçileri için)
- Sadece giriş yapmış kullanıcılar yazabilir (admin için)
- Diğer her şey kapalı (güvenlik)

### ADIM 9: Projeyi Test Etme

#### 9.1 Development Server Başlatma

Terminal'de:
```bash
npm run admin
```

Veya:
```bash
npm start
```

#### 9.2 Admin Panel Açma

Tarayıcınızda:
```
http://localhost:8000/site/admin/index.html
```

#### 9.3 Giriş Yapma

- **Email**: `admin@zirveeimza.com`
- **Password**: ADIM 7'de belirlediğiniz şifre

#### 9.4 İlk Ürünü Ekleme

1. Giriş yaptıktan sonra **"+ Yeni Ürün Ekle"** butonuna tıklayın
2. Formu doldurun:

**Örnek Ürün 1: Bireysel E-İmza**
```
Ürün Adı: Bireysel E-İmza
Fiyat: 1250
Geçerlilik Süresi: 1 yıl
Açıklama: Akıllı kart + okuyucu dahil, e-Devlet uyumlu, aynı gün teslimat
Özellikler:
Akıllı kart + okuyucu dahil
Online kurulum desteği
E-Devlet uyumlu
Telefon desteği
Aynı gün teslimat
Durum: Aktif
```

3. **"Kaydet"** butonuna tıklayın
4. "Ürün başarıyla eklendi!" mesajını görmeli

**Örnek Ürün 2: Kurumsal E-İmza**
```
Ürün Adı: Kurumsal E-İmza
Fiyat: 3500
Geçerlilik Süresi: 1 yıl
Açıklama: Şirketler için özel e-imza çözümü, toplu kullanım
Özellikler:
Akıllı kart + okuyucu dahil
Toplu kullanım desteği
E-Fatura entegrasyonu
7/24 kurumsal destek
Yerinde kurulum
Durum: Aktif
```

**Örnek Ürün 3: Mobil İmza**
```
Ürün Adı: Mobil İmza
Fiyat: 850
Geçerlilik Süresi: 1 yıl
Açıklama: Cep telefonu ile kullanım, kart okuyucu gerekmez
Özellikler:
Kart okuyucu gerekmez
Mobil uygulama dahil
Anında aktivasyon
7/24 telefon desteği
E-Devlet uyumlu
Durum: Aktif
```

### ADIM 10: Database Kontrolü

1. Firebase Console'da **Realtime Database** sayfasına gidin
2. **"Data"** tab'inde olduğunuz emin olun
3. **"products"** node'unu görmelisiniz
4. Eklediğiniz ürünleri göreceksiniz:

```json
{
  "products": {
    "-O1abc123xyz": {
      "name": "Bireysel E-İmza",
      "price": 1250,
      "duration": "1 yıl",
      ...
    }
  }
}
```

## ✅ Kurulum Tamamlandı!

Artık:
- ✅ Admin paneli çalışıyor
- ✅ Ürün ekleyip düzenleyebilirsiniz
- ✅ Firebase Realtime Database bağlantısı aktif
- ✅ Güvenlik kuralları aktif

## 🎯 Sonraki Adımlar

### 1. Ana Sitede Ürünleri Gösterme

`site/index.html` veya `site/fiyatlandirma.html` dosyasına Firebase'den ürünleri çekecek kod ekleyebilirsiniz.

Örnek kod için: `ADMIN_KURULUM.md` dosyasının **"Frontend Entegrasyonu"** bölümüne bakın.

### 2. Production Deployment

Firebase Hosting kullanarak:
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### 3. Domain Bağlama

Firebase Console > Hosting > Add custom domain

## ❗ Sorun Giderme

### "Permission denied" hatası alıyorum

**Çözüm**: 
1. Realtime Database > Rules kontrol edin
2. Kuralların doğru yazıldığından emin olun
3. Admin panelinde giriş yaptığınızdan emin olun

### "Module not found" hatası

**Çözüm**:
```bash
npm install
```

### Admin paneli açılmıyor

**Çözüm**:
1. Development server'ın çalıştığından emin olun: `npm start`
2. Doğru URL'yi kullanın: `http://localhost:8000/site/admin/index.html`
3. Browser console'da hata var mı kontrol edin (F12)

### Giriş yapamıyorum

**Çözüm**:
1. Firebase Console > Authentication > Users'da kullanıcının olduğundan emin olun
2. Email ve şifreyi doğru girdiğinizden emin olun
3. `firebase-config.js` dosyasının doğru olduğundan emin olun

### Ürün ekleyemiyorum

**Çözüm**:
1. Database kurallarını kontrol edin
2. Browser console'da hata mesajını okuyun
3. `databaseURL` değerinin doğru olduğundan emin olun

## 📞 Yardım

Sorun devam ediyorsa:
1. Browser console'u açın (F12 > Console tab)
2. Hata mesajını kopyalayın
3. Firebase Console > Project settings > General'da tüm bilgilerin doğru olduğundan emin olun

---

**Hazırlayan**: Kiro AI
**Tarih**: 2026-08-01
**Proje**: e-imza-4c867
