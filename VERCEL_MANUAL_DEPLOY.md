# ⚡ Vercel Manuel Deploy Rehberi

## 🚨 SORUN
Git push yapılıyor ama Vercel otomatik deploy **ÇALIŞMIYOR**!

**Neden?**
- Vercel Git ayarlarında "Çekme İsteği Yorumları" veya "depo_dağıtım_Olayları" kapalı olabilir
- Production branch yanlış seçilmiş olabilir
- Deployment protection aktif olabilir

---

## ✅ ÇÖZÜM 1: VERCEL DASHBOARD'DAN MANUEL DEPLOY (EN HIZLI)

### Adım 1: Vercel Dashboard'a Gidin
https://vercel.com/dashboard

### Adım 2: Projeyi Seçin
- "stimza" veya "e-imza" projenizi tıklayın

### Adım 3: Deployments Sekmesine Gidin
- Üst menüden **"Deployments"** tıklayın

### Adım 4: Redeploy Yapın
1. En son deployment'ın sağında **3 nokta (...)** menüsüne tıklayın
2. **"Redeploy"** seçeneğini tıklayın
3. Açılan popup'ta:
   - ❌ **"Use existing Build Cache"** İŞARETİNİ KALDIRIN (önemli!)
   - ✅ **"Redeploy"** butonuna tıklayın

### Adım 5: Deploy'u İzleyin
- Deploy başlayacak
- Süre: ~2-3 dakika
- "Building" → "Deploying" → "Ready" olacak

---

## ✅ ÇÖZÜM 2: GIT AYARLARINI DÜZELTİN (KALICI ÇÖZÜM)

### Adım 1: Project Settings
https://vercel.com/dashboard > Project > Settings

### Adım 2: Git Ayarlarını Kontrol Edin

#### A) Production Branch
1. Settings > **Git**
2. **"Production Branch"** bölümünü bulun
3. Branch: **main** olmalı ✅
4. Değilse düzeltin ve **Save**

#### B) Deploy Hooks (Otomatik Deploy)
1. Settings > **Git**
2. Aşağı kaydırın: **"Deploy Hooks"** veya **"Git Integration"**
3. Şunları kontrol edin:
   - ✅ **"Automatically Deploy on Push"** → AÇIK olmalı
   - ✅ **"Deploy on Pull Request"** → AÇIK olmalı (opsiyonel)
   - ✅ **"Deploy on Commit"** → AÇIK olmalı

#### C) Ignored Build Step
1. Settings > **Git** > **Ignored Build Step**
2. Eğer bir komut varsa (örn: `git diff HEAD^ HEAD --quiet`):
   - Bunu SİLİN veya `exit 1` yapın (her zaman deploy olması için)

#### D) Root Directory
1. Settings > **General** > **Root Directory**
2. Eğer `site` veya başka bir klasör seçiliyse:
   - **`.` (root)** olarak değiştirin
   - Çünkü `site/` klasörü zaten rewrite'larla yönetiliyor

### Adım 3: Save ve Test
1. Ayarları kaydedin
2. GitHub'a bir commit yapın:
   ```bash
   git commit --allow-empty -m "test: Vercel auto-deploy"
   git push origin main
   ```
3. Vercel Dashboard'da yeni deployment görünmeli

---

## ✅ ÇÖZÜM 3: GIT INTEGRATION'I YENİDEN BAĞLAYIN

### Adım 1: Integration'ı Kaldırın
1. Vercel Dashboard > Settings > **Git**
2. **"Disconnect"** butonuna tıklayın
3. Onaylayın

### Adım 2: Yeniden Bağlayın
1. Settings > **Git**
2. **"Connect Git Repository"**
3. GitHub seçin
4. Repository seçin: **hatas1836-0107/e-imza**
5. Branch: **main**
6. **Connect**

### Adım 3: İlk Deploy
- Otomatik olarak ilk deploy başlayacak
- Bu deploy tüm değişiklikleri içerecek

---

## 🔍 DEPLOY DURUMUNU KONTROL ETME

### GitHub Commits
Her commit'te şu bilgiyi görebilirsiniz:
- ✅ Yeşil tik: Deploy başarılı
- ⏳ Sarı daire: Deploy devam ediyor
- ❌ Kırmızı X: Deploy başarısız

### Vercel Dashboard
https://vercel.com/dashboard > Deployments
- Son deployment'ların listesini görebilirsiniz
- Her deployment'a tıklayarak log görebilirsiniz

### Deployment URL'i Test Etme
Deploy tamamlandığında:
```
https://www.imzaistanbul.com/sitemap.xml
https://www.imzaistanbul.com/robots.txt
```
Bu URL'leri açın ve yeni içeriği görün

---

## 🆘 SORUN GİDERME

### "Build Failed" Hatası
**Log'u kontrol edin:**
1. Vercel Dashboard > Deployment > Tıklayın
2. **"View Function Logs"** veya **"Build Logs"**
3. Hatayı görün ve düzeltin

**Yaygın Hatalar:**
- `vercel.json` syntax hatası
- `site/` klasörü bulunamıyor
- Node.js version uyumsuzluğu

### Deploy Başlamıyor
**GitHub Webhook Kontrolü:**
1. GitHub Repo > Settings > **Webhooks**
2. Vercel webhook'u görüyor musunuz?
3. Son delivery'ler başarılı mı? (yeşil tik)
4. Değilse webhook'u silin ve Vercel'den yeniden bağlayın

### Cache Sorunu
**Hard Refresh:**
- Tarayıcıda: `Ctrl + Shift + R` (Windows) veya `Cmd + Shift + R` (Mac)
- Cache temizle ve yeniden yükle

---

## 📋 ŞU ANDA YAPILMASI GEREKEN

### Hemen Şimdi (5 dakika)
1. ✅ Vercel Dashboard'a git
2. ✅ Deployments > Son deployment > **Redeploy** (cache olmadan)
3. ✅ Deploy tamamlanmasını bekle (2-3 dk)
4. ✅ Test et: https://www.imzaistanbul.com/sitemap.xml

### Sonra (10 dakika)
1. Settings > Git ayarlarını kontrol et
2. "Automatically Deploy on Push" AÇIK yap
3. Test commit at

---

## 📞 DESTEK

Eğer hiçbir şey çalışmazsa:
1. Vercel Support: https://vercel.com/help
2. Vercel Discord: https://vercel.com/discord
3. GitHub Issues: Repository'de issue aç

---

## ✨ SONUÇ

Deploy tamamlandığında şunlar canlıda olacak:
- ✅ Yeni sitemap.xml (2026-08-17 tarihli)
- ✅ Optimize edilmiş robots.txt
- ✅ Güvenlik header'ları (vercel.json)
- ✅ Popup tamamen kaldırılmış
- ✅ Logo favicon'ları güncel

**Deploy URL'i test edin:**
https://www.imzaistanbul.com/

**Beklenen Deploy Süresi:** 2-3 dakika
