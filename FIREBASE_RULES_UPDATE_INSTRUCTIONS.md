# Firebase Rules Güncelleme Talimatları

## OG Image Yönetimi İçin Rules Güncelleme

Admin paneline OG Image yönetimi eklendi. Şimdi Firebase Database Rules'ı güncellemeniz gerekiyor.

### Adım 1: Firebase Console'a Gidin
https://console.firebase.google.com/project/e-imza-4c867/database/e-imza-4c867-default-rtdb/rules

### Adım 2: Rules'ı Kopyalayın
`database.rules.json` dosyasının içeriğini kopyalayın.

### Adım 3: Console'da Değiştirin
Firebase Console'daki Rules sekmesinde, mevcut rules'ı silin ve yeni rules'ı yapıştırın.

### Adım 4: Publish
"Publish" butonuna tıklayarak rules'ı yayınlayın.

---

## Yapılan Değişiklikler

### 1. Admin Panel Bokeh Arka Plan ✅
- Glassmorphism kartların altında güzel gradient bokeh efekti
- Mor, mavi, yeşil tonlarda animasyonlu arka plan
- Kartlar artık daha modern ve premium görünüyor

### 2. OG Image Yönetimi Admin Panel İçinde ✅
- Artık ayrı sayfa yerine "OG Image" tab'ı altında
- Görsel yükleme, önizleme ve silme özellikleri
- Firebase `settings/ogImage` path'ine kaydediliyor

### 3. Firebase Rules Güncellemesi ⏳
- `settings/ogImage` için read/write izinleri eklendi
- Sadece yetkili admin'ler güncelleyebilir
- Herkes okuyabilir (public read)

---

## Sonraki Adımlar

1. ✅ Firebase Console'dan rules'ı güncelleyin
2. ✅ Admin paneli test edin: https://e-imza.vercel.app/admin/index-modern.html
3. ✅ OG Image tab'ına tıklayın ve bir görsel yükleyin
4. ✅ Sosyal medyada paylaşım önizlemesini kontrol edin

---

## Sorun Giderme

### "Permission Denied" Hatası
- Firebase Console'dan rules'ı güncellediniz mi?
- Admin email'inizle giriş yaptınız mı?

### Görsel Yüklenmiyor
- Dosya boyutu 5MB'dan küçük mü?
- Dosya formatı image/* mı? (jpg, png, webp, etc.)

### Bokeh Arka Plan Görünmüyor
- Tarayıcı cache'ini temizleyin (Ctrl+Shift+R)
- Vercel deployment tamamlandı mı?

---

**Tüm değişiklikler GitHub'a push edildi ve Vercel otomatik deploy edecek!**
