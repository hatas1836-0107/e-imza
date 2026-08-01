# Google ile Giriş Sorunu Çözümü

## Problem
Google ile giriş yapamıyorum.

## Çözüm

### 1. Firebase Console'da Authorized Domains Kontrolü

1. [Firebase Console](https://console.firebase.google.com/) 'a git
2. Projenizi seçin: **e-imza-4c867**
3. Sol menüden **Authentication** > **Settings** > **Authorized domains**
4. Şu domain'lerin ekli olduğundan emin olun:
   - `localhost`
   - `127.0.0.1`
   - Eğer canlıda çalıştırıyorsanız: `zirveeimza.com`

### 2. Local Test İçin

Firebase Hosting Emulator kullanın:

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase serve
```

Sonra `http://localhost:5000/site/giris.html` adresine gidin.

### 3. Admin Email Listesi

Şu anda sadece bu emailler admin olabilir:

- `huseyinatas@gmail.com`
- `hüseyinataş@gmail.com` (otomatik normalize edilir)
- `admin@zirveeimza.com`

### 4. Google ile Giriş Test

1. Google ile Giriş butonuna tıklayın
2. Google hesabınızı seçin
3. Eğer emailiniz admin listesindeyse → Admin paneline yönlendirilirsiniz
4. Eğer emailiniz listede değilse → "Yetkisiz Erişim" hatası alırsınız

### 5. Email/Password ile Giriş

**Admin Hesabı:**
- Email: `huseyinatas@gmail.com` VEYA `hüseyinataş@gmail.com`
- Şifre: `Admin123456`

İlk kez giriş yapıyorsanız, admin.js'deki `createInitialAdmin()` fonksiyonunu yorumdan çıkarın ve sayfayı yenileyin.

## Debugging

Browser Console'u açın (F12) ve şu hataları kontrol edin:

```
auth/unauthorized-domain
auth/popup-blocked
auth/cancelled-popup-request
```

Bu hatalardan biri görünüyorsa Firebase Console'da authorized domains'i kontrol edin.

## Notlar

- Türkçe karakterli email kullanabilirsiniz (ü, ş, ğ, etc.)
- Input validation kapatıldı, browser hata vermez
- Otomatik email normalizasyonu var
- Her iki giriş sayfası da aynı kontrolleri yapıyor:
  - `/site/giris.html`
  - `/site/admin/index.html`
