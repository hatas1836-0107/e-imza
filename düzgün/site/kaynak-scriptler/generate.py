# -*- coding: utf-8 -*-
import os

SITE_DIR = "/home/claude/site"
DOMAIN = "https://www.zirveeimza.com"
PHONE_DISPLAY = "0850 255 06 06"
PHONE_TEL = "+908502550606"
WHATSAPP_NUMBER = "905000000000"  # DEĞİŞTİRİN: gerçek WhatsApp numaranız (ülke kodu + alan kodu + numara, boşluksuz)
EMAIL = "info@zirveeimza.com"
FORM_ENDPOINT = "https://formsubmit.co/info@zirveeimza.com"  # DEĞİŞTİRİN: kendi e-posta adresiniz

WA_TEXT_GENERIC = "Merhaba%2C%20e-imza%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
WA_LINK = f"https://wa.me/{WHATSAPP_NUMBER}?text={WA_TEXT_GENERIC}"

# ---------------------------------------------------------------
# İkon kütüphanesi (inline SVG, currentColor)
# ---------------------------------------------------------------
ICONS = {
"shield": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></svg>',
"clock": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>',
"bike": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17 10 8h4l3 5m-9 0h9m-4-9h3l2 4"/></svg>',
"laptop": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M2 20h20"/></svg>',
"check": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
"check-circle": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="m9 12 2 2 4-4"/></svg>',
"star": '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17.6l-6.1 3.3 1.5-6.8-5.2-4.6 6.9-.7L12 2.5z"/></svg>',
"arrow-right": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>',
"arrow-left": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5m6-6-6 6 6 6"/></svg>',
"chevron-up": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>',
"plus": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>',
"phone": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .6 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.5 2.9.6a2 2 0 0 1 1.7 2Z"/></svg>',
"mail": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>',
"map-pin": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
"sun": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4"/></svg>',
"moon": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>',
"menu": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
"x": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
"whatsapp": '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.36 5.07L2 22l5.1-1.33A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2Zm0 18.1c-1.63 0-3.15-.44-4.46-1.2l-.32-.19-3.02.79.8-2.94-.2-.31A8.09 8.09 0 1 1 20.09 12 8.1 8.1 0 0 1 12 20.1Zm4.44-6.06c-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.93-1.19a7.24 7.24 0 0 1-1.34-1.66c-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02 0 1.19.87 2.34.99 2.5.12.16 1.71 2.61 4.14 3.66.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z"/></svg>',
"folder": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/></svg>',
"lock": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
"users": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
"building": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M6 21V7l6-4 6 4v14M9 9h1m4 0h1m-6 4h1m4 0h1m-6 4h1m4 0h1"/></svg>',
"file-check": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 15l2 2 4-4"/></svg>',
"truck": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7V8Z"/><circle cx="5.5" cy="18.5" r="1.5"/><circle cx="18.5" cy="18.5" r="1.5"/></svg>',
"zap": '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 3 14h7l-1 8 11-14h-7l0-6Z"/></svg>',
"search": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
"badge": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 4 5v6c0 5 3.4 8.4 8 10 4.6-1.6 8-5 8-10V5l-8-3Z"/><path d="m9 12 2 2 4-4"/></svg>',
"key": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6M15.5 7.5 19 11m-5-1.5L17.5 13"/></svg>',
"smartphone": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/></svg>',
"stamp": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 0 0-3 3c0 1.5 1 2 1 3.5S9 12 9 12h6s-1-1-1-2.5 1-2 1-3.5a3 3 0 0 0-3-3Z"/><path d="M5 21h14M6 21v-3a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3M9 12v4h6v-4"/></svg>',
}

def icon(name, cls=""):
    svg = ICONS[name]
    if cls:
        svg = svg.replace("<svg ", f'<svg class="{cls}" ', 1)
    return svg

# ---------------------------------------------------------------
# Sayfa listesi (ana menü sırası)
# ---------------------------------------------------------------
NAV_PAGES = [
    ("index.html", "Ana Sayfa"),
    ("hizmetlerimiz.html", "Hizmetlerimiz"),
    ("fiyatlandirma.html", "Fiyatlandırma"),
    ("bolgeler.html", "Hizmet Bölgeleri"),
    ("hakkimizda.html", "Hakkımızda"),
    ("sss.html", "S.S.S."),
    ("iletisim.html", "İletişim"),
]

DISTRICTS = [
    "Adalar","Arnavutköy","Ataşehir","Avcılar","Bağcılar","Bahçelievler","Bakırköy",
    "Başakşehir","Bayrampaşa","Beşiktaş","Beykoz","Beylikdüzü","Beyoğlu","Büyükçekmece",
    "Çatalca","Çekmeköy","Esenler","Esenyurt","Eyüpsultan","Fatih","Gaziosmanpaşa",
    "Güngören","Kadıköy","Kağıthane","Kartal","Küçükçekmece","Maltepe","Pendik",
    "Sancaktepe","Sarıyer","Silivri","Sultanbeyli","Sultangazi","Şile","Şişli",
    "Tuzla","Ümraniye","Üsküdar","Zeytinburnu",
]

def head(title, description, canonical, extra_jsonld=""):
    return f"""<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title}</title>
<meta name="description" content="{description}">
<link rel="canonical" href="{canonical}">
<meta name="theme-color" content="#0b0e1a">
<meta name="robots" content="index, follow">
<meta name="author" content="Zirve E-İmza">
<meta name="geo.region" content="TR-34">
<meta name="geo.placename" content="İstanbul">
<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{description}">
<meta property="og:url" content="{canonical}">
<meta property="og:site_name" content="Zirve E-İmza">
<meta property="og:locale" content="tr_TR">
<meta property="og:image" content="{DOMAIN}/assets/img/og-cover.jpg">
<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{title}">
<meta name="twitter:description" content="{description}">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%234f46e5'/%3E%3Cstop offset='1' stop-color='%237c3aed'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='24' height='24' rx='6' fill='url(%23g)'/%3E%3Cpath d='M5 16 c3-6 5 -2 7 -7 c1.5 3 2 5 3.5 2' stroke='white' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="/assets/css/style.css">
{extra_jsonld}
</head>
"""

ORG_JSONLD = f"""<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Zirve E-İmza",
  "image": "{DOMAIN}/assets/img/og-cover.jpg",
  "url": "{DOMAIN}/",
  "telephone": "{PHONE_TEL}",
  "email": "{EMAIL}",
  "priceRange": "₺₺",
  "areaServed": {DISTRICTS},
  "address": {{
    "@type": "PostalAddress",
    "addressLocality": "İstanbul",
    "addressCountry": "TR"
  }},
  "openingHoursSpecification": [{{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    "opens": "09:00",
    "closes": "19:00"
  }}],
  "sameAs": []
}}
</script>"""

def header(active):
    links = []
    for href, label in NAV_PAGES:
        current = ' aria-current="page"' if href == active else ""
        links.append(f'<a href="/{href}"{current}>{label}</a>')
    nav_links = "\n        ".join(links)

    mobile_links = []
    for href, label in NAV_PAGES:
        current = ' aria-current="page"' if href == active else ""
        mobile_links.append(f'<a href="/{href}"{current}>{label}</a>')
    mobile_nav_links = "\n        ".join(mobile_links)

    return f"""<a class="skip-link" href="#main">İçeriğe geç</a>
<div class="mesh-bg" aria-hidden="true"></div>
<div class="grain-overlay" aria-hidden="true"></div>

<header class="site-header">
  <div class="container">
    <a href="/index.html" class="brand">
      <span class="brand-mark">{icon('zap')}</span>
      <span>Zirve E-İmza<small>Aynı Gün Kurye ile Teslim</small></span>
    </a>
    <nav class="main-nav" aria-label="Ana menü">
        {nav_links}
    </nav>
    <div class="header-actions">
      <button class="theme-toggle" type="button" aria-label="Görünümü değiştir">
        <span class="icon-sun">{icon('sun')}</span>
        <span class="icon-moon">{icon('moon')}</span>
      </button>
      <a href="/fiyatlandirma.html" class="btn btn-ghost btn-sm">Fiyatlar</a>
      <a href="tel:{PHONE_TEL}" class="btn btn-primary btn-sm">{icon('phone')}Hemen Ara</a>
      <button class="nav-toggle" type="button" aria-label="Menüyü aç">{icon('menu')}</button>
    </div>
  </div>
</header>

<div class="mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobil menü">
  <div class="drawer-top">
    <a href="/index.html" class="brand">
      <span class="brand-mark">{icon('zap')}</span>
      <span>Zirve E-İmza</span>
    </a>
    <button class="drawer-close" type="button" aria-label="Menüyü kapat">{icon('x')}</button>
  </div>
  <nav aria-label="Mobil menü">
    {mobile_nav_links}
  </nav>
  <div class="drawer-cta">
    <a href="{WA_LINK}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-block">{icon('whatsapp')}WhatsApp'tan Yaz</a>
    <a href="tel:{PHONE_TEL}" class="btn btn-primary btn-block">{icon('phone')}{PHONE_DISPLAY}</a>
  </div>
</div>
"""

def slugify_district(d):
    d = d.lower()
    for a, b in [("ı","i"),("ğ","g"),("ü","u"),("ş","s"),("ö","o"),("ç","c")]:
        d = d.replace(a, b)
    return d

def footer():
    district_links = "".join([f'<li><a href="/bolgeler.html#{slugify_district(d)}">{d}</a></li>' for d in DISTRICTS[:8]])
    return f"""<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-col footer-brand">
        <a href="/index.html" class="brand" style="margin-bottom:14px;">
          <span class="brand-mark">{icon('zap')}</span>
          <span>Zirve E-İmza</span>
        </a>
        <p>Bireysel ve kurumsal nitelikli elektronik imzanızı bilgisayarınıza anında teslim ediyor, dilerseniz aynı gün kurye ile elden ulaştırıyoruz. İstanbul'un 39 ilçesinde hizmet veriyoruz.</p>
        <div class="footer-social">
          <a href="{WA_LINK}" target="_blank" rel="noopener" class="glass" aria-label="WhatsApp">{icon('whatsapp')}</a>
          <a href="tel:{PHONE_TEL}" class="glass" aria-label="Telefon">{icon('phone')}</a>
          <a href="mailto:{EMAIL}" class="glass" aria-label="E-posta">{icon('mail')}</a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Kurumsal</h4>
        <ul>
          <li><a href="/hakkimizda.html">Hakkımızda</a></li>
          <li><a href="/hizmetlerimiz.html">Hizmetlerimiz</a></li>
          <li><a href="/fiyatlandirma.html">Fiyatlandırma</a></li>
          <li><a href="/sss.html">Sıkça Sorulan Sorular</a></li>
          <li><a href="/iletisim.html">İletişim</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Hizmet Bölgeleri</h4>
        <ul>
          {district_links}
          <li><a href="/bolgeler.html">Tüm ilçeleri gör →</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Yasal</h4>
        <ul>
          <li><a href="/kullanim-kosullari.html">Kullanım Koşulları</a></li>
          <li><a href="/gizlilik-politikasi.html">Gizlilik Politikası &amp; KVKK</a></li>
          <li><a href="/iletisim.html">Bize Ulaşın</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© <span id="year"></span> Zirve E-İmza. Tüm hakları saklıdır.</span>
      <div class="legal-links">
        <a href="/kullanim-kosullari.html">Kullanım Koşulları</a>
        <a href="/gizlilik-politikasi.html">Gizlilik Politikası</a>
      </div>
    </div>
  </div>
</footer>

<div class="float-stack">
  <button class="fab-top glass" aria-label="Yukarı çık">{icon('chevron-up')}</button>
  <a href="{WA_LINK}" target="_blank" rel="noopener" class="fab-whatsapp" aria-label="WhatsApp ile yazın">{icon('whatsapp')}</a>
</div>

<script>document.getElementById('year').textContent = new Date().getFullYear();</script>
<script src="/assets/js/main.js"></script>
</body>
</html>"""

def page(filename, title, description, main_html, extra_jsonld=""):
    canonical = f"{DOMAIN}/{filename}"
    html = head(title, description, canonical, extra_jsonld) + "<body>\n" + header(filename) + '\n<main id="main">\n' + main_html + "\n</main>\n" + footer()
    with open(os.path.join(SITE_DIR, filename), "w", encoding="utf-8") as f:
        f.write(html)
    print("yazıldı:", filename)
