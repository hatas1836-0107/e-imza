# -*- coding: utf-8 -*-
from generate import *

# =====================================================================
# ANA SAYFA
# =====================================================================
INDEX_MAIN = f"""
<section class="hero">
  <div class="container hero-grid">
    <div>
      <span class="eyebrow"><span class="dot"></span> İstanbul'un 39 ilçesinde aynı gün teslimat</span>
      <h1>İmzanız hazır. <span class="grad-text">Bugün kapınızda.</span></h1>
      <p class="hero-lead">Nitelikli elektronik imzanızı (e-imza) online başvuru ile bilgisayarınıza anında teslim ediyor, isterseniz kurye ile aynı gün elinize ulaştırıyoruz. Bireysel, kurumsal ve mobil imza çözümleri tek noktadan.</p>
      <div class="hero-cta-row">
        <a href="/fiyatlandirma.html" class="btn btn-primary btn-lg">Fiyatları İncele{icon('arrow-right')}</a>
        <a href="{WA_LINK}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-lg">{icon('whatsapp')}WhatsApp'tan Yaz</a>
      </div>
      <div class="trust-row">
        <span class="trust-item">{icon('shield')}5070 Sayılı Kanuna Uygun</span>
        <span class="trust-item">{icon('lock')}KVKK Uyumlu Süreç</span>
        <span class="trust-item">{icon('clock')}Aynı Gün Kurye Seçeneği</span>
      </div>
    </div>
    <div class="signature-stage glass reveal">
      <svg viewBox="0 0 420 340" aria-hidden="true">
        <defs>
          <linearGradient id="sigGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#818cf8"/>
            <stop offset="0.55" stop-color="#a855f7"/>
            <stop offset="1" stop-color="#e8a33d"/>
          </linearGradient>
        </defs>
        <path class="sig-path" d="M40 230 C 70 120, 110 120, 120 200 C 128 260, 150 260, 165 190 C 178 130, 200 120, 215 180 C 225 220, 245 230, 260 190 C 275 150, 300 150, 305 190 C 312 240, 340 245, 360 200 C 372 175, 385 170, 395 175" />
      </svg>
      <div class="sig-seal">{icon('stamp')}</div>
      <div class="sig-badge b1 glass">{icon('check-circle')} Onaylandı</div>
      <div class="sig-badge b2 glass">{icon('bike')} Kurye yolda</div>
      <div class="sig-badge b3 glass">{icon('clock')} 45 dk içinde</div>
    </div>
  </div>
</section>

<section class="section-tight">
  <div class="container">
    <div class="glass reveal" style="padding:36px 40px;">
      <div class="stat-row">
        <div class="stat"><div class="stat-num" data-count="39">0</div><div class="stat-label">İstanbul ilçesinde hizmet</div></div>
        <div class="stat"><div class="stat-num" data-count="45" data-suffix=" dk">0</div><div class="stat-label">Ortalama kurye teslim süresi*</div></div>
        <div class="stat"><div class="stat-num" data-count="7" data-suffix="/24">0</div><div class="stat-label">Online başvuru imkanı</div></div>
        <div class="stat"><div class="stat-num" data-count="98" data-suffix="%">0</div><div class="stat-label">Aynı gün teslim oranı*</div></div>
      </div>
    </div>
    <p style="text-align:center;font-size:.76rem;margin-top:14px;">*Bölgeye ve trafik yoğunluğuna göre değişebilir.</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head reveal">
      <span class="badge-soft badge-indigo">Hizmetlerimiz</span>
      <h2>İki teslimat şekli, tek profesyonel süreç</h2>
      <p>İster ofisinizden çıkmadan online teslim alın, ister kurye ile elinize teslim edilsin — süreç baştan sona aynı titizlikle yürütülür.</p>
    </div>
    <div class="grid grid-3 reveal-stagger">
      <div class="card glass reveal" style="--i:0">
        <div class="card-icon">{icon('laptop')}</div>
        <h3>Bilgisayardan Online Teslim</h3>
        <p>Kimlik doğrulama ve başvurunuzun ardından e-imzanız uzaktan kurulum desteğiyle bilgisayarınıza aynı gün tanımlanır.</p>
      </div>
      <div class="card glass reveal" style="--i:1">
        <div class="card-icon">{icon('bike')}</div>
        <h3>Aynı Gün Kurye Teslimatı</h3>
        <p>İstanbul'un 39 ilçesine kurye ile elden teslimat yapıyoruz. Sabah başvuran müşterilerimiz aynı gün akıllı kart ve okuyucusuna kavuşur.</p>
      </div>
      <div class="card glass reveal" style="--i:2">
        <div class="card-icon">{icon('building')}</div>
        <h3>Kurumsal Toplu Başvuru</h3>
        <p>Şirketler için çoklu personel başvurusu, tek fatura ve tek yetkili üzerinden yönetilen toplu e-imza organizasyonu.</p>
      </div>
    </div>
  </div>
</section>

<section class="section" style="padding-top:0;">
  <div class="container">
    <div class="section-head reveal">
      <span class="badge-soft badge-amber">Süreç</span>
      <h2>Üç adımda imzanız elinizde</h2>
      <p>Başvurudan teslimata kadar her adımı sizin için sadeleştirdik.</p>
    </div>
    <div class="grid grid-3 steps reveal-stagger">
      <div class="step reveal" style="--i:0">
        <div class="step-num">1</div>
        <h3>Online Başvuru</h3>
        <p>Formu doldurun ya da WhatsApp'tan yazın; kimlik ve TC bilgilerinizle başvurunuzu birlikte tamamlayalım.</p>
      </div>
      <div class="step reveal" style="--i:1">
        <div class="step-num">2</div>
        <h3>Doğrulama &amp; Onay</h3>
        <p>Elektronik Sertifika Hizmet Sağlayıcısı süreçlerine uygun kimlik doğrulaması yapılır, ödemeniz alınır.</p>
      </div>
      <div class="step reveal" style="--i:2">
        <div class="step-num">3</div>
        <h3>Teslimat</h3>
        <p>Bilgisayarınıza uzaktan tanımlama ya da kurye ile aynı gün elden teslim — tercih sizin.</p>
      </div>
    </div>
  </div>
</section>

<section class="section" style="padding-top:0;">
  <div class="container">
    <div class="glass reveal" style="padding:50px;display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center;">
      <div>
        <span class="badge-soft badge-emerald">{icon('map-pin')} Hizmet Bölgesi</span>
        <h2 style="margin-top:16px;">İstanbul'un her ilçesine ulaşıyoruz</h2>
        <p>Kadıköy'den Silivri'ye, Beşiktaş'tan Sancaktepe'ye — kurye ağımız 39 ilçenin tamamını kapsar.</p>
        <a href="/bolgeler.html" class="btn btn-ghost">Tüm ilçeleri gör{icon('arrow-right')}</a>
      </div>
      <div class="district-cloud">
        {"".join(f'<span class="district-chip glass">{icon("map-pin")}{d}</span>' for d in DISTRICTS[:14])}
        <span class="district-chip glass" style="font-weight:700;">+{len(DISTRICTS)-14} ilçe daha</span>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head reveal">
      <span class="badge-soft badge-indigo">Neden Zirve E-İmza</span>
      <h2>Hız kadar güvenlik de önceliğimiz</h2>
    </div>
    <div class="grid grid-4 reveal-stagger">
      <div class="card glass reveal" style="--i:0"><div class="card-icon">{icon('shield')}</div><h3>Mevzuata Tam Uyum</h3><p>5070 Sayılı Elektronik İmza Kanunu ve ilgili yönetmeliklere uygun süreç yönetimi.</p></div>
      <div class="card glass reveal" style="--i:1"><div class="card-icon">{icon('lock')}</div><h3>Veri Güvenliği</h3><p>Kimlik ve başvuru bilgileriniz KVKK'ya uygun şekilde işlenir ve korunur.</p></div>
      <div class="card glass reveal" style="--i:2"><div class="card-icon">{icon('truck')}</div><h3>Kendi Kurye Ağımız</h3><p>Üçüncü parti kargoya bağlı kalmadan, takip edilebilir kendi kurye operasyonumuz.</p></div>
      <div class="card glass reveal" style="--i:3"><div class="card-icon">{icon('users')}</div><h3>Canlı Destek</h3><p>Telefon ve WhatsApp üzerinden başvurunuzun her adımında yanınızdayız.</p></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head reveal">
      <span class="badge-soft badge-amber">{icon('star')} Müşteri Yorumları</span>
      <h2>Bugüne kadar imza atanlar ne diyor?</h2>
    </div>
    <div class="testi-track-wrap reveal">
      <div class="testi-track">
        <div class="testi-card glass">
          <div class="testi-stars">{icon('star')}{icon('star')}{icon('star')}{icon('star')}{icon('star')}</div>
          <p class="testi-quote">"Sabah WhatsApp'tan yazdım, öğleden sonra kurye kapıya geldi. Kurumsal imza yenilememizi tek günde hallettik."</p>
          <div class="testi-person"><span class="testi-avatar">E.K</span><div><strong>E. K.</strong><span>Kadıköy · Kurumsal Müşteri</span></div></div>
        </div>
        <div class="testi-card glass">
          <div class="testi-stars">{icon('star')}{icon('star')}{icon('star')}{icon('star')}{icon('star')}</div>
          <p class="testi-quote">"E-Devlet işlemleri için acil imzaya ihtiyacım vardı, aynı gün Beşiktaş'a kurye gönderdiler. Kurulumu da telefonda anlattılar."</p>
          <div class="testi-person"><span class="testi-avatar">M.T</span><div><strong>M. T.</strong><span>Beşiktaş · Bireysel Müşteri</span></div></div>
        </div>
        <div class="testi-card glass">
          <div class="testi-stars">{icon('star')}{icon('star')}{icon('star')}{icon('star')}{icon('star')}</div>
          <p class="testi-quote">"15 personel için toplu başvuru yaptık, tek fatura tek muhatap ile süreç çok rahat ilerledi."</p>
          <div class="testi-person"><span class="testi-avatar">S.Y</span><div><strong>S. Y.</strong><span>Ümraniye · İK Sorumlusu</span></div></div>
        </div>
        <div class="testi-card glass">
          <div class="testi-stars">{icon('star')}{icon('star')}{icon('star')}{icon('star')}{icon('star')}</div>
          <p class="testi-quote">"Online form üzerinden başvurdum, bilgisayarıma uzaktan kuruldu, hiç dışarı çıkmadım."</p>
          <div class="testi-person"><span class="testi-avatar">A.D</span><div><strong>A. D.</strong><span>Şişli · Serbest Muhasebeci</span></div></div>
        </div>
        <div class="testi-card glass">
          <div class="testi-stars">{icon('star')}{icon('star')}{icon('star')}{icon('star')}{icon('star')}</div>
          <p class="testi-quote">"Silivri'ye kadar geldiler, telefon desteğiyle e-imza kurulumu 10 dakika sürdü."</p>
          <div class="testi-person"><span class="testi-avatar">B.C</span><div><strong>B. C.</strong><span>Silivri · Bireysel Müşteri</span></div></div>
        </div>
      </div>
      <div class="testi-nav"></div>
      <div class="testi-arrows">
        <button class="testi-arrow prev glass" aria-label="Önceki">{icon('arrow-left')}</button>
        <button class="testi-arrow next glass" aria-label="Sonraki">{icon('arrow-right')}</button>
      </div>
    </div>
    <p style="text-align:center;font-size:.76rem;margin-top:18px;">Yukarıdaki yorumlar örnek gösterim amaçlıdır; canlıya almadan önce gerçek müşteri geri bildirimleriyle güncelleyin.</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="cta-banner glass reveal">
      <h2>Bugün başvurun, bugün teslim alın</h2>
      <p style="max-width:52ch;margin:0 auto;">Formu doldurun, WhatsApp'tan yazın ya da hemen arayın — İstanbul'un neresinde olursanız olun size ulaşalım.</p>
      <div class="cta-row">
        <a href="/iletisim.html" class="btn btn-ghost btn-lg">Teklif Formu{icon('arrow-right')}</a>
        <a href="{WA_LINK}" target="_blank" rel="noopener" class="btn btn-lg" style="background:#fff;color:#4f46e5;">{icon('whatsapp')}WhatsApp'tan Yaz</a>
      </div>
    </div>
  </div>
</section>
"""

page("index.html",
     "E-İmza Başvurusu ve Aynı Gün Kurye Teslimatı | Zirve E-İmza İstanbul",
     "İstanbul'un 39 ilçesinde aynı gün kurye ile e-imza teslimatı. Nitelikli elektronik imza başvurusu online, bilgisayara anında teslim. Hemen fiyat alın.",
     INDEX_MAIN,
     extra_jsonld=ORG_JSONLD)

# =====================================================================
# HİZMETLERİMİZ
# =====================================================================
HIZMETLER_MAIN = f"""
<section class="page-hero">
  <div class="container">
    <div class="breadcrumbs"><a href="/index.html">Ana Sayfa</a>{icon('arrow-right')}<span>Hizmetlerimiz</span></div>
    <span class="eyebrow"><span class="dot"></span> Hizmetlerimiz</span>
    <h1>Bireysel, kurumsal ve mobil <span class="grad-text">e-imza çözümleri</span></h1>
    <p class="hero-lead">İhtiyacınıza göre teslimat şeklini siz seçin: bilgisayarınıza uzaktan kurulum ya da kurye ile elden teslim.</p>
  </div>
</section>

<section class="section" style="padding-top:20px;">
  <div class="container">
    <div class="grid grid-2 reveal-stagger">
      <div class="card glass reveal" style="--i:0">
        <div class="card-icon">{icon('key')}</div>
        <h3>Bireysel Nitelikli E-İmza</h3>
        <p>E-Devlet işlemleri, sözleşme imzalama, resmi başvurular ve günlük kullanım için 1-2-3 yıllık nitelikli elektronik imza kartı ve okuyucusu.</p>
      </div>
      <div class="card glass reveal" style="--i:1">
        <div class="card-icon">{icon('building')}</div>
        <h3>Kurumsal E-İmza</h3>
        <p>Şirket yetkilileri ve personeli için toplu başvuru, tek fatura ve yetkili üzerinden yönetilen kurumsal imza organizasyonu.</p>
      </div>
      <div class="card glass reveal" style="--i:2">
        <div class="card-icon">{icon('smartphone')}</div>
        <h3>Mobil İmza Yönlendirme</h3>
        <p>GSM operatörünüz üzerinden mobil imza tanımlama sürecinde başvuru ve yönlendirme desteği.</p>
      </div>
      <div class="card glass reveal" style="--i:3"><div class="card-icon">{icon('file-check')}</div>
        <h3>Zaman Damgası &amp; Yenileme</h3>
        <p>Süresi dolan e-imzalarınızın yenilenmesi ve zaman damgası hizmeti başvurularında aracılık.</p>
      </div>
    </div>
  </div>
</section>

<section class="section" style="padding-top:0;">
  <div class="container">
    <div class="section-head left reveal">
      <span class="badge-soft badge-amber">Teslimat Şekli</span>
      <h2>İki teslimat seçeneği, aynı özen</h2>
    </div>
    <div class="grid grid-2 reveal-stagger">
      <div class="card glass reveal" style="--i:0">
        <div class="card-icon">{icon('laptop')}</div>
        <h3>Bilgisayardan Online Teslim</h3>
        <p style="margin-bottom:16px;">Uzaktan bağlantı desteğiyle e-imza sürücüleri kurulur, kartınız/okuyucunuz kargo ile adresinize gönderilir ya da mevcut cihazınıza tanımlama yapılır.</p>
        <ul class="price-features">
          <li>{icon('check')} Uzaktan kurulum desteği</li>
          <li>{icon('check')} Adım adım telefon rehberliği</li>
          <li>{icon('check')} Türkiye geneli kargo seçeneği</li>
        </ul>
      </div>
      <div class="card glass reveal" style="--i:1">
        <div class="card-icon">{icon('bike')}</div>
        <h3>Aynı Gün Kurye Teslimatı</h3>
        <p style="margin-bottom:16px;">İstanbul sınırları içinde kendi kurye ekibimiz belgeleriniz ve imza kartınızı elden adresinize ulaştırır, kurulumu yerinde tamamlar.</p>
        <ul class="price-features">
          <li>{icon('check')} İstanbul'un 39 ilçesine hizmet</li>
          <li>{icon('check')} Aynı gün teslim önceliği</li>
          <li>{icon('check')} Yerinde kurulum ve test</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="section" style="padding-top:0;">
  <div class="container">
    <div class="section-head reveal">
      <span class="badge-soft badge-indigo">Kimler Kullanır</span>
      <h2>E-imza kimler için gerekli?</h2>
    </div>
    <div class="grid grid-4 reveal-stagger">
      <div class="card glass reveal" style="--i:0"><h3>Şirket Yetkilileri</h3><p>E-fatura, e-defter ve resmi kurum işlemleri için.</p></div>
      <div class="card glass reveal" style="--i:1"><h3>Serbest Meslek</h3><p>Mali müşavir, avukat, mimar ve mühendisler için.</p></div>
      <div class="card glass reveal" style="--i:2"><h3>İhale &amp; Kamu İşleri</h3><p>EKAP üzerinden ihaleye katılan firmalar için.</p></div>
      <div class="card glass reveal" style="--i:3"><h3>Bireysel Kullanıcılar</h3><p>E-Devlet, banka ve sözleşme işlemleri için.</p></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="cta-banner glass reveal">
      <h2>Hangi paketin size uygun olduğuna karar veremediniz mi?</h2>
      <p>Bir mesaj yeter — ihtiyacınıza en uygun paketi birlikte belirleyelim.</p>
      <div class="cta-row">
        <a href="/fiyatlandirma.html" class="btn btn-ghost btn-lg">Fiyatları Gör{icon('arrow-right')}</a>
        <a href="{WA_LINK}" target="_blank" rel="noopener" class="btn btn-lg" style="background:#fff;color:#4f46e5;">{icon('whatsapp')}WhatsApp'tan Yaz</a>
      </div>
    </div>
  </div>
</section>
"""

page("hizmetlerimiz.html",
     "E-İmza Hizmetleri | Bireysel, Kurumsal ve Mobil İmza | Zirve E-İmza",
     "Bireysel, kurumsal ve mobil e-imza başvurusu. Bilgisayardan online teslim ya da İstanbul'un tüm ilçelerine aynı gün kurye ile teslimat.",
     HIZMETLER_MAIN)

print("Bölüm 2 tamamlandı: index + hizmetlerimiz")
