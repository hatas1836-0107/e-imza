# Ürün Ekleme ve Görüntüleme Talimatları

## Sorun Özeti
Admin panelinde ürünler var ancak düzenlenince Firebase'e kaydedilmiyor ve ana sayfa/fiyatlandırma sayfasında gösterilmiyor. Mock veriler kullanılıyordu.

## Yapılan Değişiklikler

### 1. Fiyatlandırma Sayfası Güncellendi
- `düzgün/site/fiyatlandirma.html` artık Firebase'den gerçek zamanlı ürün verilerini çekiyor
- Hardcoded ürünler kaldırıldı
- Admin panelinde ürün ekleme/düzenleme/silme işlemleri otomatik olarak fiyatlandırma sayfasına yansıyor

### 2. Admin Paneli Zaten Hazırdı
- `site/admin/index-modern.html` zaten Firebase entegrasyonuna sahip
- Görsel ekleme özelliği çalışıyor
- Ürün düzenleme tam fonksiyonel

## Nasıl Kullanılır

### Adım 1: Admin Paneline Giriş
1. Tarayıcıda `http://localhost:8001/site/admin/index-modern.html` adresine gidin
2. Yetkili admin email ile giriş yapın:
   - huseyinatas@gmail.com
   - huseyin.atas@gmail.com
   - admin@zirveeimza.com
   - 2sthillman@gmail.com

### Adım 2: İlk Ürünleri Ekleyin
Seçenek A - Manuel Ekleme (Önerilen):
1. Admin panelinde "Yeni Ürün" butonuna tıklayın
2. Ürün bilgilerini doldurun:
   - **Ürün Adı**: Örn: "Bireysel E-İmza - 1 Yıl"
   - **Fiyat**: 1250
   - **Süre**: 1 yıl
   - **Açıklama**: Bireysel nitelikli e-imza
   - **Özellikler** (virgülle ayırın): Akıllı kart + okuyucu dahil, Bilgisayara online kurulum, Telefonla kurulum desteği
   - **Ürün Aktif**: İşaretli olsun
   - **Görsel**: İsteğe bağlı (varsa ekleyin)
3. "Ürünü Ekle" butonuna tıklayın
4. Diğer paketler için tekrarlayın (2 Yıl: 1850₺, 3 Yıl: 2450₺)

Seçenek B - Otomatik Yükleme:
1. Tarayıcıda `düzgün/site/init-products.html` adresini açın
2. "Ürünleri Yükle" butonuna tıklayın
3. 4 adet örnek ürün otomatik olarak Firebase'e yüklenecek

### Adım 3: Fiyatlandırma Sayfasında Görüntüleyin
1. Tarayıcıda `http://localhost:8001/düzgün/site/fiyatlandirma.html` adresine gidin
2. Ürünler artık Firebase'den gerçek zamanlı olarak görüntüleniyor
3. Admin panelinde yaptığınız değişiklikler anında yansır

## Ürün Kartlarında Görsel Gösterimi
- Admin panelinde ürün düzenlerken "Görsel" alanından resim yükleyebilirsiniz
- Görseller otomatik sıkıştırılıp Firebase'e kaydedilir (harici depolama gerekmez)
- Fiyatlandırma sayfasında ürün kartlarının üst kısmında gösterilir
- Görsel yoksa sadece metin bilgiler gösterilir

## Önemli Notlar

### Firebase Güvenlik Kuralları
- **products**: Herkes okuyabilir (`read: true`), sadece admin yazabilir
- **orders**: Herkes okuyabilir ve yazabilir (sipariş formu için)
- **couriers**: Sadece giriş yapmış kullanıcılar görebilir

### Görsel Ekleme
- Görseller base64 formatında Firebase'de saklanır
- Maksimum boyut: ~220KB (otomatik sıkıştırılır)
- Desteklenen formatlar: JPG, PNG, WebP
- Ürün kartlarında 150px yüksekliğinde gösterilir

### Gerçek Zamanlı Güncelleme
- Admin panelinde yapılan her değişiklik anında Firebase'e kaydedilir
- Fiyatlandırma sayfası Firebase'i dinlediği için otomatik güncellenir
- Sayfa yenilemek gerekmez - gerçek zamanlı senkronizasyon

## Sorun Giderme

### "Ürünler yüklenirken bir hata oluştu" Hatası
- Firebase kurallarının doğru olduğundan emin olun
- Tarayıcı konsolunda detaylı hata mesajını kontrol edin
- Internet bağlantınızı kontrol edin

### Ürünler Görünmüyor
- Admin panelinde en az bir ürünün "Aktif" durumda olduğundan emin olun
- Tarayıcı konsolunu açıp hata mesajı olup olmadığını kontrol edin
- Cache'i temizleyip sayfayı yenileyin (Ctrl+F5)

### Görseller Görünmüyor
- Görsel boyutunun çok büyük olmadığından emin olun (max 5MB kaynak dosya)
- PNG/JPG formatında olduğundan emin olun
- Tarayıcı konsolunda base64 hataları olup olmadığını kontrol edin

## Test Adımları

1. ✅ Admin paneline giriş yapabiliyorum
2. ✅ Yeni ürün ekleyebiliyorum
3. ✅ Ürün düzenleyebiliyorum
4. ✅ Ürün silebiliyorum
5. ✅ Görsel ekleyebiliyorum
6. ✅ Fiyatlandırma sayfasında ürünler görünüyor
7. ✅ Admin panelindeki değişiklikler fiyatlandırma sayfasına yansıyor
8. ✅ Görseller doğru gösteriliyor

## Sonraki Adımlar

1. İlk ürünleri ekleyin (Seçenek A veya B)
2. Görselleri ekleyin (opsiyonel)
3. Fiyatları ve açıklamaları ihtiyacınıza göre düzenleyin
4. Ana sayfada ürün kartı göstermek isterseniz benzer bir entegrasyon ekleyelim
5. Gerçek domain'e deploy etmeden önce tüm ürünlerin doğru olduğunu kontrol edin
