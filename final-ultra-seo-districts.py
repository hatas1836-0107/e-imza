#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
🔥 FİNAL SEO BOMBASI - RAKİPLERİN ÖNÜNE GEÇ 🔥
- Her ilçe için TEK TEK özel arama kelimeleri
- Blog section ULTRA GENİŞ - tüm sorular
- Modern tasarım - Inter font, perfect spacing
- Firebase fiyatlar DOĞRU
"""

districts = {
    "umraniye-e-imza": {
        "name": "Ümraniye",
        "lat": "41.0214",
        "lon": "29.1058",
        "neighborhoods": ["Armağanevler", "Aşağı Dudullu", "Atakent", "Aydınevler", "Çakmak", "Çamlık", "Dumlupınar", "Esenevler", "Esenkent", "Finans Merkezi", "Göğüşlü", "Hekimbaşı", "İnkılap", "İstiklal", "Kazım Karabekir", "Küçükbakkalköy", "Madenler", "Mehmet Akif", "Necip Fazıl", "Parseller", "Saray", "Site", "Şerifali", "Tantavi", "Tatlısu", "Topağacı", "Yamanevler", "Yenişehir", "Yukarı Dudullu"],
        "popular": ["Finans Merkezi", "Küçükbakkalköy", "Çakmak"],
        "keywords": "Ümraniye e-imza, Ümraniye e-imza nereden alınır, Ümraniye e-imza fiyatları, Ümraniye aynı gün e-imza, Ümraniye kurye e-imza, Ümraniye Finans Merkezi e-imza, Ümraniye Küçükbakkalköy e-imza, Ümraniye Çakmak e-imza, Ümraniye e-imza satan yerler, Ümraniye online e-imza başvurusu, Ümraniye e-imza ücreti, Ümraniye SGK e-imza, Ümraniye noter e-imza, Ümraniye e-fatura e-imza, Ümraniye nitelikli elektronik imza, Ümraniye e-imza kurulumu, Ümraniye e-imza teslimatı"
    },
    "kadikoy-e-imza": {
        "name": "Kadıköy",
        "lat": "40.9901",
        "lon": "29.0251",
        "neighborhoods": ["19 Mayıs", "Acıbadem", "Bostancı", "Caferağa", "Caddebostan", "Erenköy", "Fenerbahçe", "Feneryolu", "Fikirtepe", "Göztepe", "Hasanpaşa", "Koşuyolu", "Kozyatağı", "Moda", "Osmanağa", "Rasimpaşa", "Sahrayıcedit", "Suadiye", "Zühtüpaşa"],
        "popular": ["Moda", "Bostancı", "Acıbadem"],
        "keywords": "Kadıköy e-imza, Kadıköy e-imza nereden alınır, Kadıköy e-imza fiyatları, Kadıköy Moda e-imza, Kadıköy Bostancı e-imza, Kadıköy Acıbadem e-imza, Kadıköy aynı gün e-imza, Kadıköy kurye e-imza, Kadıköy e-imza satan yerler, Kadıköy online e-imza, Kadıköy SGK e-imza, Kadıköy noter e-imza, Kadıköy e-fatura, Kadıköy nitelikli elektronik imza, Kadıköy e-imza başvurusu, Kadıköy e-imza kurulumu"
    },
    "besiktas-e-imza": {
        "name": "Beşiktaş",
        "lat": "41.0422",
        "lon": "29.0070",
        "neighborhoods": ["Abbasağa", "Akatlar", "Arnavutköy", "Bebek", "Etiler", "Gayrettepe", "Konaklar", "Levent", "Levazım", "Mecidiye", "Muradiye", "Nisbetiye", "Ortaköy", "Sinanpaşa", "Türkali", "Ulus", "Vişnezade", "Yıldız"],
        "popular": ["Levent", "Etiler", "Ortaköy"],
        "keywords": "Beşiktaş e-imza, Beşiktaş e-imza nereden alınır, Beşiktaş Levent e-imza, Beşiktaş Etiler e-imza, Beşiktaş Ortaköy e-imza, Beşiktaş aynı gün e-imza, Beşiktaş kurye e-imza, Beşiktaş e-imza fiyatları, Beşiktaş e-imza satan yerler, Beşiktaş online e-imza başvurusu, Beşiktaş SGK e-imza, Beşiktaş noter e-imza, Beşiktaş nitelikli elektronik imza, Beşiktaş e-fatura e-imza, Beşiktaş e-imza kurulumu"
    },
    "sisli-e-imza": {
        "name": "Şişli",
        "lat": "41.0602",
        "lon": "28.9876",
        "neighborhoods": ["19 Mayıs", "Ayazağa", "Bomonti", "Cumhuriyet", "Esentepe", "Eskişehir", "Feriköy", "Fulya", "Gülbahar", "Halaskargazi", "Harbiye", "İnönü", "Kaptanpaşa", "Kuştepe", "Mecidiyeköy", "Meşrutiyet", "Teşvikiye"],
        "popular": ["Mecidiyeköy", "Osmanbey", "Nişantaşı"],
        "keywords": "Şişli e-imza, Şişli e-imza nereden alınır, Şişli Mecidiyeköy e-imza, Şişli Osmanbey e-imza, Şişli Nişantaşı e-imza, Şişli aynı gün e-imza, Şişli kurye e-imza, Şişli e-imza fiyatları, Şişli e-imza satan yerler, Şişli online e-imza, Şişli SGK e-imza, Şişli noter e-imza, Şişli nitelikli elektronik imza, Şişli e-fatura, Şişli e-imza başvurusu"
    },
}

# ULTRA MODERN TEMPLATE - PERFECT SPACING, INTER FONT
template = '''<!DOCTYPE html>
<html lang="tr">
<head>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-315P2FGR91"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-315P2FGR91');</script>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{{DISTRICT}} E-İmza | {{POPULAR_1}}, {{POPULAR_2}}, {{POPULAR_3}} | Aynı Gün Teslimat</title>
<meta name="description" content="{{DISTRICT}} e-imza aynı gün ücretsiz kurye teslimatı. {{ALL_NEIGHBORHOODS}} ve tüm İstanbul'a hizmet. Online başvuru, 2-4 saat teslimat, Firebase'den güncel fiyatlar.">
<meta name="keywords" content="{{KEYWORDS}}">
<link rel="canonical" href="https://www.imzaistanbul.com/{{FILE}}">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"LocalBusiness","name":"İmza İstanbul - {{DISTRICT}}","telephone":"+905453863407","address":{"@type":"PostalAddress","addressLocality":"{{DISTRICT}}","addressRegion":"İstanbul"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.9","reviewCount":"127"}}</script>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/style.css">
<link rel="stylesheet" href="assets/css/products-premium.css">
<style>
*{font-family:'Inter',sans-serif!important}
body{letter-spacing:-0.01em}
h1,h2,h3{font-weight:800;letter-spacing:-0.03em}
.hero-lead{font-size:1.25rem;line-height:1.8;font-weight:500}
.section{padding:120px 0}
.section-head{margin-bottom:80px}
.section-head h2{font-size:clamp(2rem,5vw,3.5rem);margin-bottom:20px}
.section-head p{font-size:1.2rem;color:#94a3b8;font-weight:500}
@keyframes spin{to{transform:rotate(360deg)}}
.neighborhood-tag{background:rgba(99,102,241,0.08);border:2px solid rgba(99,102,241,0.2);padding:18px 24px;border-radius:16px;text-align:center;font-weight:700;color:#f8fafc;font-size:15px;transition:all 0.4s cubic-bezier(0.4,0,0.2,1);letter-spacing:-0.01em}
.neighborhood-tag:hover{background:rgba(99,102,241,0.15);border-color:rgba(99,102,241,0.4);transform:translateY(-6px) scale(1.02);box-shadow:0 12px 40px rgba(99,102,241,0.25)}
.neighborhood-tag.popular{background:linear-gradient(135deg,#6366f1,#a855f7);color:#fff;border:none;box-shadow:0 8px 30px rgba(99,102,241,0.4)}
.neighborhood-tag.popular:hover{transform:translateY(-8px) scale(1.05);box-shadow:0 16px 50px rgba(99,102,241,0.5)}
.blog-card{transition:all 0.5s cubic-bezier(0.4,0,0.2,1)}
.blog-card:hover{transform:translateY(-12px);box-shadow:0 20px 60px rgba(0,0,0,0.3)}
.blog-card h3{font-size:1.5rem;font-weight:800;margin:24px 0 16px;line-height:1.3}
.blog-card p{font-size:1.05rem;line-height:1.7;color:#94a3b8;margin-bottom:24px}
.blog-img{width:100%;height:280px;border-radius:16px;margin-bottom:24px;position:relative;overflow:hidden}
.blog-img::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 50%,rgba(0,0,0,0.7) 100%)}
</style>
</head>
<body>
<div class="custom-cursor"></div>
<div class="custom-cursor-dot"></div>
<div class="mesh-bg"><div class="spotlight spotlight-1"></div><div class="spotlight spotlight-2"></div><div class="spotlight spotlight-3"></div></div>
<div class="grain-overlay"></div>
<header class="site-header"><div class="container"><a href="anasayfa" class="brand"><span class="brand-mark"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 3 14h7l-1 8 11-14h-7l0-6Z"/></svg></span><span>İmza İstanbul<small>Tüm İstanbul'a Teslimat</small></span></a><nav class="main-nav"><a href="anasayfa">Ana Sayfa</a><a href="hizmetlerimiz">Hizmetler</a><a href="fiyatlandirma">Fiyatlar</a><a href="bolgeler">Bölgeler</a><a href="iletisim">İletişim</a></nav></div></header>
<section class="hero"><div class="container"><span class="eyebrow"><span class="dot"></span> {{DISTRICT}} / İSTANBUL - TÜM İSTANBUL'A TESLİMAT</span><h1>{{DISTRICT}} E-İmza<br><span class="grad-text">Tüm İstanbul'a Aynı Gün</span></h1><p class="hero-lead">{{POPULAR_1}}, {{POPULAR_2}}, {{POPULAR_3}} ve tüm İstanbul ilçelerine ücretsiz kurye teslimatı. Firebase'den güncel fiyatlar.</p><div class="hero-cta-row"><a href="#fiyatlar" class="btn btn-primary btn-lg">Firebase Fiyatları Gör</a><a href="https://wa.me/905453863407?text={{DISTRICT}}%20e-imza" class="btn btn-whatsapp btn-lg">WhatsApp Destek</a></div><div class="trust-row"><span class="trust-item">İstanbul'un 39 İlçesine</span><span class="trust-item">2-4 Saat Teslimat</span><span class="trust-item">Firebase Güncel Fiyat</span></div></div></section>
<section class="section-tight"><div class="container"><div class="glass reveal" style="padding:48px 50px"><div class="stat-row"><div class="stat"><div class="stat-num">39</div><div class="stat-label">İstanbul İlçesi</div></div><div class="stat"><div class="stat-num">2-4h</div><div class="stat-label">Teslimat</div></div><div class="stat"><div class="stat-num">₺0</div><div class="stat-label">Kurye</div></div><div class="stat"><div class="stat-num">4.9★</div><div class="stat-label">Puan</div></div></div></div></div></section>
<section class="section"><div class="container"><div class="section-head reveal"><span class="badge-soft badge-indigo">Teslimat Bölgeleri</span><h2>{{DISTRICT}} ve Tüm İstanbul</h2><p>{{DISTRICT}} başta olmak üzere İstanbul'un 39 ilçesine ücretsiz aynı gün kurye teslimatı</p></div><div class="glass reveal" style="padding:60px 50px"><h3 style="text-align:center;font-size:1.8rem;margin-bottom:40px;font-weight:800">{{DISTRICT}} Mahalleleri</h3><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px">{{NEIGHBORHOOD_HTML}}</div></div></div></section>
<section class="products-premium-section" id="fiyatlar"><canvas id="bgCanvas" class="products-bg-canvas"></canvas><div class="products-container"><div class="products-hero"><h1>{{DISTRICT}} <span class="accent">Firebase Güncel Fiyatlar</span></h1><p>Dinamik fiyatlandırma sistemi ile her zaman güncel fiyatlar</p></div><div id="productsLoading" style="text-align:center;padding:80px 20px"><div style="display:inline-block;width:56px;height:56px;border:5px solid rgba(79,70,229,0.2);border-radius:50%;border-top-color:#4f46e5;animation:spin 0.8s linear infinite"></div><p style="margin-top:24px;font-size:1.1rem;font-weight:600">Firebase'den fiyatlar yükleniyor...</p></div><div id="productsContainer" style="display:none"><div class="products-grid"></div></div></div></section>
<section class="section" style="background:rgba(15,23,42,0.4)"><div class="container"><div class="section-head reveal"><span class="badge-soft badge-indigo">E-İmza Rehberi</span><h2>{{DISTRICT}} E-İmza <span class="grad-text">Kapsamlı Rehber</span></h2><p>E-imza hakkında bilmeniz gereken her şey - fiyatlar, kullanım, başvuru</p></div><div class="grid grid-3 reveal-stagger"><div class="card glass blog-card reveal" style="--i:0"><div class="blog-img" style="background:linear-gradient(135deg,#667eea,#764ba2);display:flex;align-items:center;justify-content:center"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" style="width:100px;height:100px"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg></div><h3>{{DISTRICT}} E-İmza Nereden Alınır?</h3><p>{{DISTRICT}} {{POPULAR_1}}, {{POPULAR_2}}, {{POPULAR_3}} ve tüm İstanbul'a aynı gün kurye teslimatı. Online başvuru, 2-4 saat teslim.</p><a href="blog-e-imza-nedir" class="btn btn-ghost">Detaylı Okuyun →</a></div><div class="card glass blog-card reveal" style="--i:1"><div class="blog-img" style="background:linear-gradient(135deg,#f093fb,#f5576c);display:flex;align-items:center;justify-content:center"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" style="width:100px;height:100px"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div><h3>E-İmza Fiyatları 2026 - Firebase Güncel</h3><p>Firebase Realtime Database'den güncel fiyatlar. 1 yıllık, 2 yıllık, 3 yıllık paketler. Kurye ücretsiz, kurulum dahil.</p><a href="fiyatlandirma" class="btn btn-ghost">Fiyatları Görüntüle →</a></div><div class="card glass blog-card reveal" style="--i:2"><div class="blog-img" style="background:linear-gradient(135deg,#4facfe,#00f2fe);display:flex;align-items:center;justify-content:center"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" style="width:100px;height:100px"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div><h3>SGK E-İmza Başvurusu</h3><p>SGK işlemleri için nitelikli elektronik imza nasıl alınır? Gerekli belgeler, başvuru süreci, kurulum adımları.</p><a href="blog-sgk-e-imza" class="btn btn-ghost">SGK E-İmza Rehberi →</a></div><div class="card glass blog-card reveal" style="--i:3"><div class="blog-img" style="background:linear-gradient(135deg,#43e97b,#38f9d7);display:flex;align-items:center;justify-content:center"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" style="width:100px;height:100px"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div><h3>E-Fatura ve E-Arşiv</h3><p>E-fatura ve e-arşiv fatura için nitelikli elektronik imza zorunluluğu. Hangi firmalar kullanmalı? Nasıl başvurulur?</p><a href="blog-e-fatura" class="btn btn-ghost">E-Fatura Rehberi →</a></div><div class="card glass blog-card reveal" style="--i:4"><div class="blog-img" style="background:linear-gradient(135deg,#fa709a,#fee140);display:flex;align-items:center;justify-content:center"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" style="width:100px;height:100px"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg></div><h3>Aynı Gün Teslimat Nasıl Olur?</h3><p>Sabah 13:00'e kadar başvurun, akşam elinizde olsun. İstanbul'un 39 ilçesine 2-4 saat kurye garantisi.</p><a href="blog-ayni-gun-teslimat" class="btn btn-ghost">Teslimat Detayları →</a></div><div class="card glass blog-card reveal" style="--i:5"><div class="blog-img" style="background:linear-gradient(135deg,#a8edea,#fed6e3);display:flex;align-items:center;justify-content:center"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" style="width:100px;height:100px"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div><h3>E-İmza Kullanım Alanları</h3><p>Noter, SGK, vergi dairesi, bankacılık, sözleşme imzalama, e-ihale, e-defter. Nitelikli elektronik imza nerede kullanılır?</p><a href="blog-kullanim-alanlari" class="btn btn-ghost">Kullanım Alanları →</a></div></div></div></section>
<footer class="footer"><div class="container"><div class="footer-brand">İmza İstanbul</div><p class="footer-tagline">İstanbul'un 39 İlçesine Aynı Gün E-İmza Teslimatı</p><div class="footer-phone"><a href="tel:+905453863407">0 545 386 34 07</a></div><div class="footer-links"><a href="anasayfa">Ana Sayfa</a><a href="hizmetlerimiz">Hizmetler</a><a href="fiyatlandirma">Firebase Fiyatlar</a><a href="bolgeler">39 İlçe</a><a href="hakkimizda">Hakkımızda</a><a href="iletisim">İletişim</a></div></div></footer>
<div class="float-stack"><a href="https://wa.me/905453863407?text={{DISTRICT}}%20e-imza" class="fab-whatsapp"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.36 5.07L2 22l5.1-1.33A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2Z"/></svg></a></div>
<script src="assets/js/main.js"></script>
<script src="assets/js/products-premium.js"></script>
<script type="module">import{initializeApp}from'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';import{getDatabase,ref,onValue}from'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';const app=initializeApp({apiKey:"AIzaSyADykV8-GjNNoK30CUkPlqCNMjR7Ggc1M8",databaseURL:"https://e-imza-4c867-default-rtdb.firebaseio.com",projectId:"e-imza-4c867"});const db=getDatabase(app);if(window.initProductsBackground)window.initProductsBackground('bgCanvas');onValue(ref(db,'products'),(s)=>{const d=s.val()||{};const p=Object.entries(d).map(([id,data])=>({id,...data})).filter(x=>x.status==='active').sort((a,b)=>(a.price||0)-(b.price||0));document.getElementById('productsLoading').style.display='none';document.getElementById('productsContainer').style.display='block';if(window.renderPremiumProducts)window.renderPremiumProducts(p,'productsContainer');});</script>
</body>
</html>'''

print("🔥🔥🔥 FİNAL SEO BOMBASI OLUŞTURULUYOR 🔥🔥🔥\n")
print("✨ ÖZELLİKLER:")
print("  🎯 HER İLÇE İÇİN TEK TEK ÖZEL ARAMA KELİMELERİ")
print("  📝 BLOG SECTION ULTRA GENİŞ - 6 MAKALE KARTI")
print("  🎨 INTER FONT - PERFECT SPACING - MODERN TASARIM")
print("  💰 FİREBASE DİNAMİK FİYATLAR")
print("  🌍 TÜM İSTANBUL'A TESLİMAT VURGUSU")
print("  🚀 RAKİPLERİN ÖNÜNE GEÇME MOD AKTİF\n")

for file, data in districts.items():
    name = data["name"]
    neighborhoods = data["neighborhoods"]
    popular = data["popular"]
    keywords = data["keywords"]
    
    # Neighborhood HTML
    n_html = ""
    for n in neighborhoods:
        if n in popular:
            n_html += f'<div class="neighborhood-tag popular">{n} ⭐</div>'
        else:
            n_html += f'<div class="neighborhood-tag">{n}</div>'
    
    all_neighborhoods = ", ".join(neighborhoods[:12])
    
    # Replace
    content = template
    content = content.replace('{{DISTRICT}}', name)
    content = content.replace('{{FILE}}', file)
    content = content.replace('{{KEYWORDS}}', keywords)
    content = content.replace('{{ALL_NEIGHBORHOODS}}', all_neighborhoods)
    content = content.replace('{{POPULAR_1}}', popular[0])
    content = content.replace('{{POPULAR_2}}', popular[1] if len(popular) > 1 else popular[0])
    content = content.replace('{{POPULAR_3}}', popular[2] if len(popular) > 2 else popular[0])
    content = content.replace('{{NEIGHBORHOOD_HTML}}', n_html)
    
    # Save
    filepath = f"site/{file}.html"
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ {name} - {len(neighborhoods)} mahalle - SEO BOMBA + 6 Blog + Inter Font")

print(f"\n🎉 4 İLÇE TEST EDİLDİ - FİNAL SEO BOMBASI HAZIR!")
print("\nŞİMDİ KONTROL ET VE ONAYLA, SONRA TÜM 37 İLÇEYİ YAPARIZ! 🚀")
