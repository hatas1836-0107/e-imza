# Zirve E-İmza — Web Sitesi

Bu paket, çok sayfalı, SEO uyumlu, glassmorphism/gradyan tasarımlı, aydınlık-karanlık tema destekli, mobil optimize bir e-imza kurumsal web sitesidir. React/framework kullanılmadı — **saf HTML + CSS + JavaScript** ile inşa edildi. Bunun nedeni basit: arama motorları için en güvenilir, en hızlı yüklenen ve herhangi bir standart hosting/sunucuda (Node.js gerektirmeden) çalışabilen yapı budur; ekstra bir build/deploy süreci gerekmez.

## Sayfalar
- `index.html` — Ana sayfa
- `hizmetlerimiz.html` — Hizmetler
- `fiyatlandirma.html` — Fiyatlandırma
- `bolgeler.html` — İstanbul'un 39 ilçesi (yerel SEO)
- `hakkimizda.html` — Hakkımızda
- `sss.html` — Sıkça Sorulan Sorular (FAQ schema dahil)
- `iletisim.html` — İletişim formu + harita
- `kullanim-kosullari.html`, `gizlilik-politikasi.html` — Yasal sayfalar (**taslak**, aşağıya bakın)

## Yayına almadan önce MUTLAKA değiştirin
1. **Telefon numarası** — Şu an `0850 255 06 06` (örnek). Tüm dosyalarda `tel:` bağlantılarını ve görünen numarayı güncelleyin.
2. **WhatsApp numarası** — `assets` dışındaki üretim script'inde `WHATSAPP_NUMBER = "905000000000"` satırı örnektir; gerçek numaranızla değiştirip siteyi yeniden üretin (bkz. "Nasıl güncellenir").
3. **E-posta** — `info@zirveeimza.com` örnektir.
4. **Alan adı** — `DOMAIN = "https://www.zirveeimza.com"`; canonical, sitemap ve JSON-LD bu adresi kullanıyor.
5. **Form gönderim adresi** — İletişim formu [FormSubmit.co](https://formsubmit.co) kullanır (`FORM_ENDPOINT`). Kendi e-posta adresinizi yazın; FormSubmit ilk gönderimde onay e-postası ister.
6. **Fiyatlar** — `fiyatlandirma.html` içindeki tutarlar **örnektir**, güncel ESHS tarifelerinize göre güncelleyin.
7. **Müşteri yorumları** — Ana sayfadaki yorumlar **örnek/placeholder**'dır. Yayına almadan önce gerçek müşteri geri bildirimleriyle değiştirin (sahte yorum yayınlamak haksız rekabet/tüketici mevzuatına aykırı olabilir).
8. **Yasal sayfalar** — Kullanım Koşulları ve Gizlilik Politikası genel bir taslaktır; bir hukuk danışmanına onaylatmanız önerilir.
9. **Google Haritalar** — İletişim sayfasındaki harita genel "İstanbul" görünümündedir; gerçek ofis adresiniz varsa kendi Google Maps yerleştirme (embed) linkinizle değiştirin.
10. **OG görseli** — `assets/img/og-cover.jpg` dosyası eklenmedi; sosyal medya paylaşım görseli için 1200x630 px bir görsel ekleyin.

## Nasıl güncellenir (toplu değişiklik)
Tüm sayfalar `kaynak-scriptler/` klasöründeki Python betikleriyle (`generate.py`, `part2.py`…`part5.py`) üretildi. Telefon, WhatsApp, e-posta, fiyat gibi tekrar eden bilgileri tek yerden (`generate.py` başındaki değişkenler) değiştirip `python3 part2.py && python3 part3.py && python3 part4.py && python3 part5.py` komutunu çalıştırarak tüm siteyi yeniden üretebilirsiniz (Python 3 gerektirir, sunucuda çalıştırmanız gerekmez — sadece güncelleme yaparken). Tek tek HTML dosyalarını da doğrudan düzenleyebilirsiniz; her sayfa bağımsız, çalışan bir HTML dosyasıdır.

## Yerelde önizleme
Dosyaları doğrudan çift tıklayarak açarsanız `/assets/...` gibi kök-göreli yollar çalışmayabilir. Bunun yerine bir yerel sunucu başlatın:
```
cd site
python3 -m http.server 8000
```
sonra tarayıcıda `http://localhost:8000/index.html` adresini açın.

## Yayınlama
Klasördeki tüm dosyaları (assets dahil) herhangi bir hosting/sunucunun kök dizinine (örn. `public_html`) yükleyin. Statik dosyalar olduğu için Node.js, veritabanı veya özel sunucu gerektirmez.

## SEO notları
- Her sayfada benzersiz `<title>`, meta açıklama, canonical, Open Graph etiketleri var.
- `sitemap.xml` ve `robots.txt` hazır; Google Search Console'a alan adınızı ekleyip sitemap'i gönderin.
- SSS sayfasında FAQ, ana sayfa ve iletişimde ProfessionalService yapılandırılmış verisi (JSON-LD) var.
- Gerçek "e-imza" aramalarında üst sıraya çıkmak; teknik SEO kadar geri bağlantı (backlink), Google İşletme Profili kaydı ve düzenli içerik üretimini de gerektirir — bunlar bu paketin kapsamı dışındadır.

Son güncelleme: 2025-01-26 - WhatsApp numarası güncellendi: 905453863407
