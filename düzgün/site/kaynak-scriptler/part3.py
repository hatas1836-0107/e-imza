# -*- coding: utf-8 -*-
from generate import *

# =====================================================================
# FİYATLANDIRMA
# =====================================================================
FIYAT_MAIN = f"""
<section class="page-hero">
  <div class="container">
    <div class="breadcrumbs"><a href="/index.html">Ana Sayfa</a>{icon('arrow-right')}<span>Fiyatlandırma</span></div>
    <span class="eyebrow"><span class="dot"></span> Fiyatlandırma</span>
    <h1>Şeffaf fiyatlar, <span class="grad-text">sürpriz yok</span></h1>
    <p class="hero-lead">Aşağıdaki tutarlar örnek liste fiyatıdır ve ESHS güncel tarifelerine göre değişebilir. Kesin fiyat için formu doldurun ya da WhatsApp'tan yazın.</p>
  </div>
</section>

<section class="section" style="padding-top:10px;">
  <div class="container">
    <div class="grid grid-3 reveal-stagger">
      <div class="price-card card glass reveal" style="--i:0">
        <div class="price-name">1 Yıllık</div>
        <div class="price-value">1.250₺<span>+KDV</span></div>
        <div class="price-note">Bireysel nitelikli e-imza</div>
        <ul class="price-features">
          <li>{icon('check')} Akıllı kart + okuyucu dahil</li>
          <li>{icon('check')} Bilgisayara online kurulum</li>
          <li>{icon('check')} Telefonla kurulum desteği</li>
        </ul>
        <a href="/iletisim.html" class="btn btn-ghost btn-block">Teklif Al</a>
      </div>
      <div class="price-card card glass featured reveal" style="--i:1">
        <div class="price-name">2 Yıllık</div>
        <div class="price-value">1.850₺<span>+KDV</span></div>
        <div class="price-note">En çok tercih edilen süre</div>
        <ul class="price-features">
          <li>{icon('check')} Akıllı kart + okuyucu dahil</li>
          <li>{icon('check')} Aynı gün kurye önceliği</li>
          <li>{icon('check')} Yerinde kurulum ve test</li>
          <li>{icon('check')} Ücretsiz telefon desteği</li>
        </ul>
        <a href="/iletisim.html" class="btn btn-primary btn-block">Teklif Al</a>
      </div>
      <div class="price-card card glass reveal" style="--i:2">
        <div class="price-name">3 Yıllık</div>
        <div class="price-value">2.450₺<span>+KDV</span></div>
        <div class="price-note">Uzun vadeli kullanım için</div>
        <ul class="price-features">
          <li>{icon('check')} Akıllı kart + okuyucu dahil</li>
          <li>{icon('check')} Aynı gün kurye önceliği</li>
          <li>{icon('check')} Yenileme hatırlatma servisi</li>
        </ul>
        <a href="/iletisim.html" class="btn btn-ghost btn-block">Teklif Al</a>
      </div>
    </div>
    <p style="text-align:center;font-size:.78rem;margin-top:22px;">Fiyatlara akıllı kart ve okuyucu dahildir. Örnek/başlangıç fiyatlarıdır; güncel tarife için bizimle iletişime geçin.</p>
  </div>
</section>

<section class="section" style="padding-top:0;">
  <div class="container">
    <div class="section-head left reveal">
      <span class="badge-soft badge-indigo">Ek Hizmetler</span>
      <h2>İhtiyacınıza göre ekleyin</h2>
    </div>
    <div class="glass reveal" style="padding:10px 30px;">
      <div class="addon-row"><span>Aynı gün kurye ile elden teslimat (İstanbul içi)</span><strong>150₺'den başlayan</strong></div>
      <div class="addon-row"><span>Kurumsal toplu başvuru (5+ personel), kişi başı</span><strong>İndirimli — teklif alın</strong></div>
      <div class="addon-row"><span>Mali mühür / zaman damgası yönlendirme</span><strong>Teklif alın</strong></div>
      <div class="addon-row"><span>Süresi dolan imza yenileme</span><strong>Standart fiyatlar geçerli</strong></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head reveal">
      <span class="badge-soft badge-amber">Merak Edilenler</span>
      <h2>Fiyatlara neler dahil?</h2>
    </div>
    <div class="grid grid-3 reveal-stagger">
      <div class="card glass reveal" style="--i:0"><div class="card-icon">{icon('badge')}</div><h3>Akıllı Kart &amp; Okuyucu</h3><p>Tüm paketlerde donanım dahildir, ayrıca ücretlendirilmez.</p></div>
      <div class="card glass reveal" style="--i:1"><div class="card-icon">{icon('laptop')}</div><h3>Kurulum Desteği</h3><p>Uzaktan ya da yerinde kurulum, ek ücrete tabi değildir.</p></div>
      <div class="card glass reveal" style="--i:2"><div class="card-icon">{icon('bike')}</div><h3>Kurye Ücreti</h3><p>Bölgeye göre değişir; teklif formunda ilçenizi belirtin, net tutarı iletelim.</p></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="cta-banner glass reveal">
      <h2>Size özel net fiyat 5 dakikada</h2>
      <p>İlçenizi ve ihtiyacınızı belirtin, size en uygun paketin kesin fiyatını hemen iletelim.</p>
      <div class="cta-row">
        <a href="/iletisim.html" class="btn btn-ghost btn-lg">Teklif Formu{icon('arrow-right')}</a>
        <a href="{WA_LINK}" target="_blank" rel="noopener" class="btn btn-lg" style="background:#fff;color:#4f46e5;">{icon('whatsapp')}WhatsApp'tan Yaz</a>
      </div>
    </div>
  </div>
</section>
"""

page("fiyatlandirma.html",
     "E-İmza Fiyatları 2026 | 1-2-3 Yıllık Paketler | Zirve E-İmza",
     "Bireysel ve kurumsal e-imza fiyatları, aynı gün kurye ücretleri ve kampanyalar. Formu doldurun, size özel net fiyat teklifini hemen alın.",
     FIYAT_MAIN)

# =====================================================================
# BÖLGELER
# =====================================================================
district_cards = "".join([
    f'<div class="card glass reveal" id="{slugify_district(d)}" style="--i:{i%8}"><div class="card-icon">{icon("map-pin")}</div><h3>{d}</h3><p>{d} bölgesine aynı gün kurye ile e-imza teslimatı yapıyoruz.</p></div>'
    for i, d in enumerate(DISTRICTS)
])

BOLGELER_MAIN = f"""
<section class="page-hero">
  <div class="container">
    <div class="breadcrumbs"><a href="/index.html">Ana Sayfa</a>{icon('arrow-right')}<span>Hizmet Bölgeleri</span></div>
    <span class="eyebrow"><span class="dot"></span> Hizmet Bölgeleri</span>
    <h1>İstanbul'un <span class="grad-text">39 ilçesine</span> aynı gün teslimat</h1>
    <p class="hero-lead">Avrupa ve Anadolu yakasının tamamında kurye ağımız var. İlçenizi aşağıdan arayın veya listeden bulun.</p>
    <div class="form-field" style="max-width:380px;margin-top:10px;">
      <input type="text" id="districtSearch" placeholder="İlçe ara… (ör. Kadıköy)" aria-label="İlçe ara">
    </div>
  </div>
</section>

<section class="section" style="padding-top:10px;">
  <div class="container">
    <div class="grid grid-4 reveal-stagger" id="districtGrid">
      {district_cards}
    </div>
  </div>
</section>

<section class="section" style="padding-top:0;">
  <div class="container">
    <div class="glass reveal" style="padding:44px;">
      <div class="grid grid-3">
        <div><h3>{icon('clock')} Aynı Gün Teslim</h3><p>Saat 13:00'e kadar onaylanan başvurularda aynı gün teslim önceliği tanırız.</p></div>
        <div><h3>{icon('truck')} Kendi Kurye Ekibimiz</h3><p>Üçüncü parti kargo firmasına bağlı kalmadan kendi ekibimizle teslimat yaparız.</p></div>
        <div><h3>{icon('phone')} Yerinde Destek</h3><p>Kurye kurulumu yerinde test eder, sorularınızı anında yanıtlar.</p></div>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="cta-banner glass reveal">
      <h2>İlçeniz listede mi, emin değil misiniz?</h2>
      <p>Bize yazın, en yakın kurye saatini birlikte planlayalım.</p>
      <div class="cta-row">
        <a href="/iletisim.html" class="btn btn-ghost btn-lg">İletişime Geç{icon('arrow-right')}</a>
        <a href="{WA_LINK}" target="_blank" rel="noopener" class="btn btn-lg" style="background:#fff;color:#4f46e5;">{icon('whatsapp')}WhatsApp'tan Yaz</a>
      </div>
    </div>
  </div>
</section>
"""

page("bolgeler.html",
     "Hizmet Bölgeleri | İstanbul'un 39 İlçesine E-İmza Kurye Teslimatı",
     "Kadıköy, Beşiktaş, Şişli, Ümraniye, Üsküdar ve İstanbul'un tüm ilçelerine aynı gün e-imza kurye teslimatı. İlçenizi seçin, hemen başvurun.",
     BOLGELER_MAIN)

# =====================================================================
# HAKKIMIZDA
# =====================================================================
HAKKIMIZDA_MAIN = f"""
<section class="page-hero">
  <div class="container">
    <div class="breadcrumbs"><a href="/index.html">Ana Sayfa</a>{icon('arrow-right')}<span>Hakkımızda</span></div>
    <span class="eyebrow"><span class="dot"></span> Hakkımızda</span>
    <h1>E-imzayı <span class="grad-text">erişilebilir ve hızlı</span> kılmak için varız</h1>
    <p class="hero-lead">Zirve E-İmza, bireylerin ve şirketlerin nitelikli elektronik imza süreçlerini sadeleştirmek amacıyla kuruldu. Amacımız; başvurudan teslimata kadar tüm süreci güvenli, hızlı ve şeffaf hale getirmek.</p>
  </div>
</section>

<section class="section" style="padding-top:10px;">
  <div class="container">
    <div class="grid grid-3 reveal-stagger">
      <div class="card glass reveal" style="--i:0"><div class="card-icon">{icon('zap')}</div><h3>Misyonumuz</h3><p>E-imza başvurusunu karmaşık bir bürokrasiden çıkarıp, tek bir mesajla başlatılabilen bir hizmete dönüştürmek.</p></div>
      <div class="card glass reveal" style="--i:1"><div class="card-icon">{icon('shield')}</div><h3>Değerlerimiz</h3><p>Mevzuata tam uyum, veri gizliliği ve müşteriye karşı şeffaf iletişim önceliğimizdir.</p></div>
      <div class="card glass reveal" style="--i:2"><div class="card-icon">{icon('truck')}</div><h3>Farkımız</h3><p>Kendi kurye operasyonumuz sayesinde teslimat sürecini uçtan uca kontrol ediyor, aynı gün teslim sözü veriyoruz.</p></div>
    </div>
  </div>
</section>

<section class="section" style="padding-top:0;">
  <div class="container">
    <div class="grid" style="grid-template-columns:1fr 1fr;gap:44px;align-items:center;">
      <div class="reveal">
        <span class="badge-soft badge-indigo">Süreç Yaklaşımımız</span>
        <h2 style="margin-top:14px;">Her başvuru aynı titizlikle yönetilir</h2>
        <div class="value-list" style="margin-top:24px;">
          <div class="timeline-item">
            <span class="tl-num">01</span>
            <div><h4 style="margin-bottom:4px;">Doğru Bilgilendirme</h4><p>Hangi e-imza türüne ihtiyacınız olduğunu birlikte netleştiriyoruz.</p></div>
          </div>
          <div class="timeline-item">
            <span class="tl-num">02</span>
            <div><h4 style="margin-bottom:4px;">Güvenli Doğrulama</h4><p>Kimlik doğrulama adımları mevzuata tam uyumlu şekilde yürütülür.</p></div>
          </div>
          <div class="timeline-item">
            <span class="tl-num">03</span>
            <div><h4 style="margin-bottom:4px;">Zamanında Teslimat</h4><p>Seçtiğiniz teslimat yöntemiyle e-imzanız söz verilen sürede elinizde olur.</p></div>
          </div>
        </div>
      </div>
      <div class="glass reveal" style="padding:40px;">
        <div class="stat-row" style="flex-direction:column;gap:22px;align-items:flex-start;">
          <div class="stat" style="text-align:left;"><div class="stat-num" data-count="39">0</div><div class="stat-label">İlçede aktif kurye hizmeti</div></div>
          <div class="divider-fade" style="width:100%;"></div>
          <div class="stat" style="text-align:left;"><div class="stat-num" data-count="3">0</div><div class="stat-label">Farklı e-imza süresi seçeneği (1-2-3 yıl)</div></div>
          <div class="divider-fade" style="width:100%;"></div>
          <div class="stat" style="text-align:left;"><div class="stat-num" data-count="7" data-suffix="/24">0</div><div class="stat-label">Online başvuru ve WhatsApp desteği</div></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="cta-banner glass reveal">
      <h2>Bizimle çalışmak ister misiniz?</h2>
      <p>Kurumsal anlaşmalar, toplu başvurular veya iş birlikleri için bize ulaşın.</p>
      <div class="cta-row">
        <a href="/iletisim.html" class="btn btn-ghost btn-lg">İletişime Geç{icon('arrow-right')}</a>
        <a href="tel:{PHONE_TEL}" class="btn btn-lg" style="background:#fff;color:#4f46e5;">{icon('phone')}{PHONE_DISPLAY}</a>
      </div>
    </div>
  </div>
</section>
"""

page("hakkimizda.html",
     "Hakkımızda | Zirve E-İmza İstanbul",
     "Zirve E-İmza; İstanbul genelinde bireysel ve kurumsal e-imza başvurusu ile aynı gün kurye teslimatı sunan bir hizmet markasıdır.",
     HAKKIMIZDA_MAIN)

print("Bölüm 3 tamamlandı: fiyatlandirma + bolgeler + hakkimizda")
