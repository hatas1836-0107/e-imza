# 🚀 Performans Test & Deployment Checklist

## ✅ Deployment Öncesi Kontroller

### 1. **Dosya Kontrolü**
- [x] `site/.htaccess` - Apache cache headers
- [x] `site/_headers` - Netlify/Vercel headers  
- [x] `vercel.json` - Vercel özel ayarlar
- [x] `site/service-worker.js` - PWA desteği
- [x] `site/assets/css/critical.css` - Critical CSS
- [x] `site/assets/js/lazyload.js` - Lazy loading

### 2. **HTML Optimizasyonları**
- [x] Font preload eklendi
- [x] CSS async loading (media="print" onload)
- [x] JavaScript defer attribute
- [x] Firebase SDK defer ile yükleniyor
- [x] Service Worker kaydı eklendi

### 3. **CSS Optimizasyonları**
- [x] Font import CSS'den kaldırıldı
- [x] Mobil responsive düzeltmeleri
- [x] Overflow-x sorunları çözüldü
- [x] Animation optimizasyonları
- [x] Will-change property'leri eklendi

### 4. **Caching Stratejisi**
- [x] Static assets: 1 yıl (immutable)
- [x] CSS/JS: 1 ay
- [x] HTML: no-cache
- [x] Font files: 1 yıl (immutable)

## 🔍 Test Adımları

### A. PageSpeed Insights Testi
1. **Mobil Test**
   ```
   https://pagespeed.web.dev/analysis/https-e-imza-vercel-app/rmugqnbv1x?form_factor=mobile
   ```
   - ✅ FCP < 1.8s
   - ✅ LCP < 2.5s
   - ✅ TBT < 200ms
   - ✅ CLS < 0.1
   - ✅ SI < 3.4s

2. **Desktop Test**
   ```
   https://pagespeed.web.dev/analysis/https-e-imza-vercel-app/rmugqnbv1x?form_factor=desktop
   ```
   - ✅ Tüm metrikler yeşil
   - ✅ Skor 90+

### B. Browser DevTools Test
1. **Network Tab**
   - Cache-Control header'ları kontrol
   - Gzip compression aktif mi?
   - Resource yükleme sırası doğru mu?
   - Waterfall analizi

2. **Performance Tab**
   - Main thread activity
   - Long tasks analizi
   - Layout shifts

3. **Coverage Tab**
   - Unused CSS/JS oranı
   - Kritik olmayan kaynaklar

### C. Lighthouse Audit
```bash
# CLI ile test
npx lighthouse https://e-imza.vercel.app --view
```

### D. Real Device Test
- [ ] iPhone Safari
- [ ] Android Chrome
- [ ] iPad Safari
- [ ] Desktop Chrome
- [ ] Desktop Firefox

## 📊 Metrik Hedefleri

| Metrik | Mobil Hedef | Desktop Hedef |
|--------|-------------|---------------|
| **Performance Score** | 80-90 | 90-100 |
| **First Contentful Paint** | < 1.8s | < 1.0s |
| **Largest Contentful Paint** | < 2.5s | < 1.5s |
| **Total Blocking Time** | < 200ms | < 100ms |
| **Cumulative Layout Shift** | < 0.1 | < 0.05 |
| **Speed Index** | < 3.4s | < 2.0s |

## 🛠️ Deploy Komutları

### Vercel Deploy
```bash
# Normal deploy
vercel --prod

# Force rebuild (cache temizleme)
vercel --prod --force

# Preview deploy (test için)
vercel
```

### Cache Temizleme
```bash
# Vercel cache purge
vercel --prod --force

# Browser cache temizleme
- DevTools > Network > Disable cache
- Hard reload: Ctrl+Shift+R (Windows) / Cmd+Shift+R (Mac)
```

## 🎯 Deployment Sonrası Kontroller

### 1. **Headers Kontrolü**
```bash
curl -I https://e-imza.vercel.app/

# Beklenen output:
# Cache-Control: public, max-age=0, must-revalidate
# X-Frame-Options: DENY
# X-Content-Type-Options: nosniff
```

### 2. **Asset Headers**
```bash
curl -I https://e-imza.vercel.app/assets/css/style.css

# Beklenen output:
# Cache-Control: public, max-age=2592000
```

### 3. **Service Worker**
- Chrome DevTools > Application > Service Workers
- "Update on reload" işaretli mi?
- Cache storage doldu mu?

### 4. **Font Loading**
- Chrome DevTools > Network > Font tab
- Preload çalışıyor mu?
- Display swap aktif mi?

## 🚨 Sorun Giderme

### Eğer Performans Artmadıysa:

1. **Cache Sorunu**
   ```bash
   # Vercel cache temizle
   vercel --prod --force
   
   # Browser cache temizle
   - Incognito mode'da test et
   - DevTools > Network > Disable cache
   ```

2. **Headers Uygulanmadıysa**
   - Vercel Dashboard > Settings > Headers
   - `vercel.json` formatını kontrol et
   - Redeploy yap

3. **CSS Blocking**
   - Critical CSS inline edildi mi?
   - Async loading çalışıyor mu?
   - Console'da hata var mı?

4. **JavaScript Execution**
   - Defer attribute'ler var mı?
   - Script load order doğru mu?
   - Long tasks var mı?

## 📈 Monitoring & Analytics

### PageSpeed Insights API
```javascript
// Otomatik monitoring için
const url = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://e-imza.vercel.app';
fetch(url).then(res => res.json()).then(data => {
  console.log('Performance Score:', data.lighthouseResult.categories.performance.score * 100);
});
```

### Google Analytics Web Vitals
```html
<!-- GA4 event tracking -->
<script>
gtag('event', 'web_vitals', {
  'name': 'LCP',
  'value': lcpValue,
  'event_label': 'Largest Contentful Paint'
});
</script>
```

## 🔄 Sürekli İyileştirme

### Haftalık
- [ ] PageSpeed test
- [ ] Real user metrics kontrolü
- [ ] Error log incelemesi

### Aylık
- [ ] Lighthouse audit
- [ ] Dependency güncellemeleri
- [ ] Bundle size analizi
- [ ] Image optimization review

### Yıllık
- [ ] Major framework update
- [ ] Architecture review
- [ ] CDN provider comparison

---

**Son Test Tarihi**: [Deployment sonrası eklenecek]
**Vercel Domain**: https://e-imza.vercel.app
**Test URL**: https://pagespeed.web.dev/analysis/https-e-imza-vercel-app/rmugqnbv1x
