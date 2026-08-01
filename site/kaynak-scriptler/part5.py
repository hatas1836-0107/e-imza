# -*- coding: utf-8 -*-
from generate import *

DISCLAIMER_BOX = f"""<div class="glass" style="padding:20px 26px;margin-bottom:34px;border-color:rgba(232,163,61,.4);">
  <p style="margin:0;font-size:.87rem;"><strong>Not:</strong> Bu sayfadaki metin genel bir taslak/örnek şablon olarak hazırlanmıştır. Yayına almadan önce güncel mevzuata (KVKK, 5070 sayılı Elektronik İmza Kanunu, Mesafeli Sözleşmeler Yönetmeliği vb.) uygunluğunu bir hukuk danışmanına kontrol ettirmenizi öneririz.</p>
</div>"""

# =====================================================================
# KULLANIM KOŞULLARI
# =====================================================================
KULLANIM_MAIN = f"""
<section class="page-hero">
  <div class="container">
    <div class="breadcrumbs"><a href="/index.html">Ana Sayfa</a>{icon('arrow-right')}<span>Kullanım Koşulları</span></div>
    <span class="eyebrow"><span class="dot"></span> Yasal</span>
    <h1>Kullanım Koşulları</h1>
    <p class="hero-lead">Son güncelleme: 31 Temmuz 2026</p>
  </div>
</section>

<section class="section" style="padding-top:10px;">
  <div class="container" style="max-width:820px;">
    {DISCLAIMER_BOX}
    <div class="glass legal-toc reveal">
      <h4 style="margin:0 0 6px;font-size:.82rem;text-transform:uppercase;letter-spacing:.05em;color:var(--text-muted);">İçindekiler</h4>
      <a href="#taraflar">1. Taraflar ve Tanımlar</a>
      <a href="#hizmet-kapsami">2. Hizmet Kapsamı</a>
      <a href="#basvuru-teslimat">3. Başvuru ve Teslimat Süreci</a>
      <a href="#odeme-iptal">4. Ödeme, İptal ve İade</a>
      <a href="#kullanici-yukumlulukleri">5. Kullanıcı Yükümlülükleri</a>
      <a href="#fikri-mulkiyet">6. Fikri Mülkiyet</a>
      <a href="#sorumluluk">7. Sorumluluğun Sınırlandırılması</a>
      <a href="#uyusmazlik">8. Uyuşmazlıkların Çözümü</a>
      <a href="#degisiklikler">9. Değişiklikler</a>
      <a href="#iletisim-madde">10. İletişim</a>
    </div>

    <div class="legal-content reveal">
      <h2 id="taraflar">1. Taraflar ve Tanımlar</h2>
      <p>İşbu Kullanım Koşulları ("Koşullar"), <strong>zirveeimza.com</strong> alan adı üzerinden yayın yapan Zirve E-İmza ("Şirket", "Biz") ile internet sitesini ziyaret eden veya hizmetlerinden faydalanan gerçek/tüzel kişi ("Kullanıcı", "Müşteri") arasındaki ilişkiyi düzenler. Siteyi kullanarak bu koşulları kabul etmiş sayılırsınız.</p>

      <h2 id="hizmet-kapsami">2. Hizmet Kapsamı</h2>
      <p>Şirket; nitelikli elektronik imza başvurularının yönlendirilmesi, aracılık edilmesi, bilgisayara online teslim ve İstanbul il sınırları içinde kurye ile elden teslimat hizmetlerini sunar. Nitelikli elektronik imzanın bizzat üretimi, ilgili mevzuat uyarınca yetkilendirilmiş Elektronik Sertifika Hizmet Sağlayıcıları (ESHS) tarafından gerçekleştirilir; Şirket bu süreçte başvuru, teslimat ve destek hizmeti sunan bir aracı/hizmet sağlayıcı konumundadır.</p>

      <h2 id="basvuru-teslimat">3. Başvuru ve Teslimat Süreci</h2>
      <ul>
        <li>Başvuru sırasında verilen kimlik ve iletişim bilgilerinin doğruluğundan Kullanıcı sorumludur.</li>
        <li>Aynı gün kurye teslimatı, başvurunun onaylanma saatine, kurye yoğunluğuna ve bölgeye göre değişkenlik gösterebilir; kesin bir teslimat saati taahhüdü niteliğinde değildir.</li>
        <li>Bilgisayardan online teslimde, kurulumun sağlıklı yapılabilmesi için Kullanıcının uzaktan bağlantıya ve gerekli donanıma sahip olması gerekir.</li>
      </ul>

      <h2 id="odeme-iptal">4. Ödeme, İptal ve İade</h2>
      <p>Ödemeler; kredi kartı, banka havalesi/EFT veya kapıda ödeme yöntemleriyle alınabilir. Nitelikli elektronik imza, kişiye özel üretilen ve kişiselleştirilen bir ürün olduğundan, üretim/başvuru süreci başladıktan sonra iptal ve iade koşulları ilgili mevzuat (Mesafeli Sözleşmeler Yönetmeliği'nin cayma hakkı istisnaları dahil) çerçevesinde değerlendirilir. Kurye teslimatı öncesinde iptal talepleri için bizimle iletişime geçmeniz yeterlidir.</p>

      <h2 id="kullanici-yukumlulukleri">5. Kullanıcı Yükümlülükleri</h2>
      <p>Kullanıcı; siteyi ve hizmetleri hukuka, ahlaka ve iyi niyet kurallarına uygun şekilde kullanmayı, üçüncü kişilerin haklarını ihlal etmemeyi ve başvuru sırasında verdiği bilgilerin doğruluğunu kabul eder.</p>

      <h2 id="fikri-mulkiyet">6. Fikri Mülkiyet</h2>
      <p>Sitede yer alan marka, logo, metin, görsel ve tasarım unsurları Şirkete aittir veya Şirket tarafından lisanslı olarak kullanılmaktadır. İzinsiz çoğaltılamaz ve dağıtılamaz.</p>

      <h2 id="sorumluluk">7. Sorumluluğun Sınırlandırılması</h2>
      <p>Şirket, kurye teslimat sürelerindeki gecikmelerden kaynaklanabilecek, kendi kusuru bulunmayan aksaklıklar (trafik, hava koşulları, mücbir sebepler vb.) nedeniyle doğabilecek dolaylı zararlardan sorumlu tutulamaz. Nitelikli elektronik imzanın teknik üretim sürecine ilişkin sorumluluk, ilgili ESHS'nin kendi hizmet şartlarına tabidir.</p>

      <h2 id="uyusmazlik">8. Uyuşmazlıkların Çözümü</h2>
      <p>İşbu Koşullardan doğabilecek uyuşmazlıklarda Türkiye Cumhuriyeti kanunları uygulanır; İstanbul (Anadolu/Avrupa) Mahkemeleri ve İcra Daireleri yetkilidir.</p>

      <h2 id="degisiklikler">9. Değişiklikler</h2>
      <p>Şirket, işbu Koşulları dilediği zaman güncelleyebilir. Güncel metin her zaman bu sayfada yayınlanır ve yayın tarihi itibarıyla yürürlüğe girer.</p>

      <h2 id="iletisim-madde">10. İletişim</h2>
      <p>Sorularınız için <a href="mailto:{EMAIL}">{EMAIL}</a> adresinden veya <a href="/iletisim.html">iletişim sayfamızdan</a> bize ulaşabilirsiniz.</p>
    </div>
  </div>
</section>
"""

page("kullanim-kosullari.html",
     "Kullanım Koşulları | Zirve E-İmza",
     "Zirve E-İmza web sitesi ve hizmetlerinin kullanım koşulları, başvuru, teslimat, ödeme ve sorumluluk hükümleri.",
     KULLANIM_MAIN)

# =====================================================================
# GİZLİLİK POLİTİKASI / KVKK
# =====================================================================
GIZLILIK_MAIN = f"""
<section class="page-hero">
  <div class="container">
    <div class="breadcrumbs"><a href="/index.html">Ana Sayfa</a>{icon('arrow-right')}<span>Gizlilik Politikası</span></div>
    <span class="eyebrow"><span class="dot"></span> Yasal</span>
    <h1>Gizlilik Politikası &amp; KVKK Aydınlatma Metni</h1>
    <p class="hero-lead">Son güncelleme: 31 Temmuz 2026</p>
  </div>
</section>

<section class="section" style="padding-top:10px;">
  <div class="container" style="max-width:820px;">
    {DISCLAIMER_BOX}
    <div class="glass legal-toc reveal">
      <h4 style="margin:0 0 6px;font-size:.82rem;text-transform:uppercase;letter-spacing:.05em;color:var(--text-muted);">İçindekiler</h4>
      <a href="#veri-sorumlusu">1. Veri Sorumlusu</a>
      <a href="#toplanan-veriler">2. Toplanan Kişisel Veriler</a>
      <a href="#isleme-amaci">3. Kişisel Verilerin İşlenme Amacı</a>
      <a href="#aktarim">4. Kişisel Verilerin Aktarılması</a>
      <a href="#saklama">5. Saklama Süresi</a>
      <a href="#haklariniz">6. KVKK Kapsamındaki Haklarınız</a>
      <a href="#cerezler">7. Çerezler (Cookies)</a>
      <a href="#veri-guvenligi">8. Veri Güvenliği</a>
      <a href="#iletisim-gizlilik">9. İletişim</a>
    </div>

    <div class="legal-content reveal">
      <h2 id="veri-sorumlusu">1. Veri Sorumlusu</h2>
      <p>6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca kişisel verileriniz; veri sorumlusu sıfatıyla Zirve E-İmza tarafından aşağıda açıklanan kapsamda işlenmektedir.</p>

      <h2 id="toplanan-veriler">2. Toplanan Kişisel Veriler</h2>
      <ul>
        <li>Kimlik bilgileri (ad, soyad, T.C. kimlik numarası — yalnızca e-imza başvurusu kapsamında)</li>
        <li>İletişim bilgileri (telefon, e-posta, adres/ilçe)</li>
        <li>Talep ve başvuru formunda paylaşılan diğer bilgiler</li>
        <li>Site kullanımına ilişkin teknik veriler (çerezler aracılığıyla)</li>
      </ul>

      <h2 id="isleme-amaci">3. Kişisel Verilerin İşlenme Amacı</h2>
      <p>Kişisel verileriniz; e-imza başvurunuzun alınması, ilgili Elektronik Sertifika Hizmet Sağlayıcısına yönlendirilmesi, kurye teslimat sürecinin planlanması, faturalandırma, müşteri destek hizmetlerinin yürütülmesi ve yasal yükümlülüklerin yerine getirilmesi amacıyla işlenir.</p>

      <h2 id="aktarim">4. Kişisel Verilerin Aktarılması</h2>
      <p>Kişisel verileriniz; e-imza üretimini gerçekleştiren yetkili ESHS'ler, kurye/teslimat ekiplerimiz, ödeme kuruluşları ve yasal olarak yetkili kamu kurum ve kuruluşlarıyla, yalnızca hizmetin ifası için gerekli ölçüde paylaşılır. Verileriniz pazarlama amacıyla üçüncü taraflara satılmaz.</p>

      <h2 id="saklama">5. Saklama Süresi</h2>
      <p>Kişisel verileriniz, ilgili mevzuatta öngörülen süreler ve hizmetin gerektirdiği makul süre boyunca saklanır; bu sürelerin sonunda silinir, yok edilir veya anonim hale getirilir.</p>

      <h2 id="haklariniz">6. KVKK Kapsamındaki Haklarınız</h2>
      <p>KVKK'nın 11. maddesi uyarınca; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme, yurt içinde/yurt dışında aktarıldığı üçüncü kişileri bilme, eksik/yanlış işlenmişse düzeltilmesini isteme, silinmesini/yok edilmesini isteme ve itiraz etme haklarına sahipsiniz. Bu haklarınızı kullanmak için <a href="/iletisim.html">iletişim sayfamızdan</a> bize ulaşabilirsiniz.</p>

      <h2 id="cerezler">7. Çerezler (Cookies)</h2>
      <p>Sitemiz; görünüm tercihinizi (aydınlık/karanlık tema) hatırlamak gibi işlevsel amaçlarla tarayıcınızda yerel depolama kullanabilir. Bu veriler üçüncü taraflarla paylaşılmaz ve kimliğinizi doğrudan ifşa etmez.</p>

      <h2 id="veri-guvenligi">8. Veri Güvenliği</h2>
      <p>Kişisel verilerinizin hukuka aykırı erişim, kayıp veya ifşasına karşı gerekli teknik ve idari tedbirler alınmaktadır.</p>

      <h2 id="iletisim-gizlilik">9. İletişim</h2>
      <p>Gizlilik politikamıza ilişkin sorularınız için <a href="mailto:{EMAIL}">{EMAIL}</a> adresinden veya <a href="/iletisim.html">iletişim sayfamızdan</a> bize ulaşabilirsiniz.</p>
    </div>
  </div>
</section>
"""

page("gizlilik-politikasi.html",
     "Gizlilik Politikası ve KVKK Aydınlatma Metni | Zirve E-İmza",
     "Zirve E-İmza KVKK aydınlatma metni: kişisel verilerin toplanması, işlenme amacı, aktarımı, saklanması ve haklarınız.",
     GIZLILIK_MAIN)

print("Bölüm 5 tamamlandı: kullanim-kosullari + gizlilik-politikasi")

# =====================================================================
# robots.txt ve sitemap.xml
# =====================================================================
ALL_PAGES = [p for p, _ in NAV_PAGES] + ["kullanim-kosullari.html", "gizlilik-politikasi.html"]

with open(f"{SITE_DIR}/robots.txt", "w", encoding="utf-8") as f:
    f.write(f"User-agent: *\nAllow: /\n\nSitemap: {DOMAIN}/sitemap.xml\n")

sitemap_urls = "\n".join([
    f"""  <url>
    <loc>{DOMAIN}/{p}</loc>
    <changefreq>weekly</changefreq>
    <priority>{"1.0" if p == "index.html" else "0.8"}</priority>
  </url>""" for p in ALL_PAGES
])
with open(f"{SITE_DIR}/sitemap.xml", "w", encoding="utf-8") as f:
    f.write(f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{sitemap_urls}
</urlset>""")

print("robots.txt ve sitemap.xml oluşturuldu")
