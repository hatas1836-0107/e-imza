# -*- coding: utf-8 -*-
import json
from generate import *

# =====================================================================
# SSS
# =====================================================================
FAQS = [
    ("E-imza nedir, e-Devlet şifresinden farkı nedir?",
     "Nitelikli elektronik imza, ıslak imzayla aynı hukuki geçerliliğe sahip, kimliğinizi doğrulayan bir akıllı karttır. e-Devlet şifresi yalnızca devlet portalına giriş sağlarken, e-imza sözleşme, e-fatura, e-defter ve resmi belgelerde ıslak imza yerine geçer."),
    ("Aynı gün kurye teslimatı gerçekten mümkün mü?",
     "Evet. Saat 13:00'e kadar tamamlanan ve onaylanan başvurularda, İstanbul sınırları içinde aynı gün kurye teslimatı önceliği tanıyoruz. Yoğun bölgelerde ve trafik durumuna göre teslim saati değişebilir."),
    ("Hangi belgeler gerekli?",
     "Bireysel başvuru için TC kimlik kartı yeterlidir. Kurumsal başvurularda şirket yetkilisinin kimliği ve imza sirküleri istenir. Başvuru sırasında size özel gereken belgeleri tek tek bildiririz."),
    ("Kurye ücreti ne kadar, hangi ilçelere gidiliyor?",
     "Kurye ücreti bulunduğunuz ilçeye göre değişiklik gösterir. İstanbul'un 39 ilçesinin tamamına hizmet veriyoruz; net tutarı öğrenmek için iletişim formunu doldurmanız veya WhatsApp'tan yazmanız yeterli."),
    ("Bilgisayarıma nasıl kurulum yapılıyor?",
     "Online teslim tercih ederseniz, uzaktan bağlantı yazılımı üzerinden adım adım kurulum gerçekleştirilir. Kurye teslimatında ise kurulum yerinde, kurye eşliğinde tamamlanır ve test edilir."),
    ("E-imzamın süresi doldu, nasıl yenilerim?",
     "Süresi dolan e-imzanız için yeni başvuru sürecine benzer şekilde yenileme işlemi başlatılır. Mevcut kartınızın yenilenip yenilenemeyeceğini de başvuru sırasında sizinle paylaşırız."),
    ("Kurumsal toplu başvuru nasıl işliyor?",
     "5 ve üzeri personel için toplu başvurularda tek yetkili üzerinden süreç yönetilir, tek fatura kesilir ve indirimli fiyatlandırma uygulanır. Detaylar için bizimle iletişime geçebilirsiniz."),
    ("Ödemeyi nasıl yapabilirim?",
     "Kredi kartı, banka havalesi/EFT ve kapıda ödeme seçenekleri sunuyoruz. Kurye teslimatında kapıda ödeme de mümkündür; tercihinizi başvuru sırasında belirtmeniz yeterli."),
    ("Verilerim ne kadar güvende?",
     "Başvuru sırasında paylaştığınız kimlik ve iletişim bilgileri yalnızca e-imza başvuru süreci için kullanılır ve KVKK'ya uygun şekilde saklanır. Detaylar için Gizlilik Politikamızı inceleyebilirsiniz."),
]

faq_items = "".join([
    f"""<div class="accordion-item glass">
      <button class="accordion-q" aria-expanded="false">
        <h3>{q}</h3>
        <span class="plus">{icon('plus')}</span>
      </button>
      <div class="accordion-a"><div class="accordion-a-inner">{a}</div></div>
    </div>"""
    for q, a in FAQS
])

FAQ_JSONLD_DATA = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}}
        for q, a in FAQS
    ]
}
FAQ_JSONLD = f'<script type="application/ld+json">\n{json.dumps(FAQ_JSONLD_DATA, ensure_ascii=False, indent=2)}\n</script>'

SSS_MAIN = f"""
<section class="page-hero">
  <div class="container">
    <div class="breadcrumbs"><a href="/index.html">Ana Sayfa</a>{icon('arrow-right')}<span>S.S.S.</span></div>
    <span class="eyebrow"><span class="dot"></span> Sıkça Sorulan Sorular</span>
    <h1>Merak ettikleriniz <span class="grad-text">burada</span></h1>
    <p class="hero-lead">Aradığınız cevabı bulamadıysanız WhatsApp'tan yazın, birkaç dakika içinde yanıtlayalım.</p>
  </div>
</section>

<section class="section" style="padding-top:10px;">
  <div class="container" style="max-width:820px;">
    <div class="accordion reveal">
      {faq_items}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="cta-banner glass reveal">
      <h2>Sorunuz mu var?</h2>
      <p>Formu doldurun ya da WhatsApp'tan doğrudan yazın, size en kısa sürede dönelim.</p>
      <div class="cta-row">
        <a href="/iletisim.html" class="btn btn-ghost btn-lg">İletişim Formu{icon('arrow-right')}</a>
        <a href="{WA_LINK}" target="_blank" rel="noopener" class="btn btn-lg" style="background:#fff;color:#4f46e5;">{icon('whatsapp')}WhatsApp'tan Yaz</a>
      </div>
    </div>
  </div>
</section>
"""

page("sss.html",
     "Sıkça Sorulan Sorular | E-İmza ve Kurye Teslimatı | Zirve E-İmza",
     "E-imza başvurusu, aynı gün kurye teslimatı, fiyatlar, ödeme ve KVKK hakkında sık sorulan sorular ve yanıtları.",
     SSS_MAIN,
     extra_jsonld=FAQ_JSONLD)

# =====================================================================
# İLETİŞİM
# =====================================================================
ILETISIM_MAIN = f"""
<section class="page-hero">
  <div class="container">
    <div class="breadcrumbs"><a href="/index.html">Ana Sayfa</a>{icon('arrow-right')}<span>İletişim</span></div>
    <span class="eyebrow"><span class="dot"></span> İletişim</span>
    <h1>Size ulaşalım, <span class="grad-text">süreci başlatalım</span></h1>
    <p class="hero-lead">Formu doldurun, WhatsApp'tan yazın ya da doğrudan arayın — İstanbul'un neresinde olursanız olun size dönüş yapalım.</p>
  </div>
</section>

<section class="section" style="padding-top:10px;">
  <div class="container">
    <div class="grid" style="grid-template-columns:1.3fr 1fr;gap:36px;align-items:start;">
      <div class="glass reveal" style="padding:40px;">
        <h2 style="margin-bottom:6px;">Teklif Formu</h2>
        <p style="margin-bottom:26px;">Bilgilerinizi bırakın, ilçenize göre net fiyat ve en yakın kurye saatini size iletelim.</p>
        <form id="quoteForm" action="{FORM_ENDPOINT}" method="POST">
          <input type="hidden" name="_subject" value="Zirve E-İmza — Yeni Teklif Talebi">
          <input type="hidden" name="_captcha" value="true">
          <input type="hidden" name="_next" value="{DOMAIN}/iletisim.html?basarili=1">
          <div class="form-grid">
            <div class="form-field">
              <label for="adSoyad">Ad Soyad</label>
              <input type="text" id="adSoyad" name="Ad Soyad" placeholder="Adınız Soyadınız" required>
            </div>
            <div class="form-field">
              <label for="telefon">Telefon</label>
              <input type="tel" id="telefon" name="Telefon" placeholder="05xx xxx xx xx" required>
            </div>
            <div class="form-field">
              <label for="eposta">E-posta</label>
              <input type="email" id="eposta" name="E-posta" placeholder="ornek@eposta.com">
            </div>
            <div class="form-field">
              <label for="ilce">İlçe</label>
              <select id="ilce" name="İlçe" required>
                <option value="">İlçenizi seçin</option>
                {"".join(f'<option value="{d}">{d}</option>' for d in DISTRICTS)}
              </select>
            </div>
            <div class="form-field">
              <label for="hizmetTuru">Hizmet Türü</label>
              <select id="hizmetTuru" name="Hizmet Türü">
                <option>Bireysel E-İmza</option>
                <option>Kurumsal E-İmza</option>
                <option>Mobil İmza</option>
                <option>Yenileme</option>
              </select>
            </div>
            <div class="form-field">
              <label for="teslimat">Teslimat Tercihi</label>
              <select id="teslimat" name="Teslimat Tercihi">
                <option>Aynı Gün Kurye</option>
                <option>Bilgisayardan Online Teslim</option>
                <option>Emin Değilim</option>
              </select>
            </div>
            <div class="form-field full">
              <label for="mesaj">Mesajınız</label>
              <textarea id="mesaj" name="Mesaj" placeholder="Eklemek istediğiniz bir not var mı?"></textarea>
            </div>
          </div>
          <button type="submit" class="btn btn-primary btn-lg" style="margin-top:22px;">Talebi Gönder{icon('arrow-right')}</button>
          <p class="form-status mono" style="margin-top:10px;"></p>
          <p class="form-note">Form gönderildiğinde bilgileriniz yalnızca teklif hazırlamak amacıyla kullanılır. Detaylar için <a href="/gizlilik-politikasi.html">Gizlilik Politikamızı</a> inceleyebilirsiniz.</p>
        </form>
      </div>

      <div>
        <div class="glass reveal" style="padding:32px;margin-bottom:22px;">
          <div class="contact-info-row">
            <div class="contact-info-icon">{icon('phone')}</div>
            <div><h4>Telefon</h4><a href="tel:{PHONE_TEL}">{PHONE_DISPLAY}</a></div>
          </div>
          <div class="contact-info-row">
            <div class="contact-info-icon">{icon('whatsapp')}</div>
            <div><h4>WhatsApp</h4><a href="{WA_LINK}" target="_blank" rel="noopener">Hemen yazın</a></div>
          </div>
          <div class="contact-info-row">
            <div class="contact-info-icon">{icon('mail')}</div>
            <div><h4>E-posta</h4><a href="mailto:{EMAIL}">{EMAIL}</a></div>
          </div>
          <div class="contact-info-row">
            <div class="contact-info-icon">{icon('map-pin')}</div>
            <div><h4>Hizmet Bölgesi</h4><span>İstanbul'un 39 ilçesi</span></div>
          </div>
          <div class="contact-info-row">
            <div class="contact-info-icon">{icon('clock')}</div>
            <div><h4>Çalışma Saatleri</h4><span>Hafta içi &amp; Cumartesi 09:00–19:00</span></div>
          </div>
        </div>
        <div class="glass map-frame reveal">
          <iframe src="https://www.google.com/maps?q=%C4%B0stanbul&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="İstanbul hizmet bölgesi haritası"></iframe>
        </div>
      </div>
    </div>
  </div>
</section>
"""

page("iletisim.html",
     "İletişim | Zirve E-İmza — Teklif Formu, Telefon ve WhatsApp",
     "Zirve E-İmza ile iletişime geçin: teklif formu, telefon, WhatsApp ve e-posta üzerinden hemen ulaşın. İstanbul'un 39 ilçesine aynı gün kurye.",
     ILETISIM_MAIN,
     extra_jsonld=ORG_JSONLD)

print("Bölüm 4 tamamlandı: sss + iletisim")
