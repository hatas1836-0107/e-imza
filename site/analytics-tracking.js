/**
 * Google Analytics 4 - Gelişmiş Olay Takibi
 * Tüm önemli kullanıcı etkileşimlerini otomatik izler
 */

// Sayfa görüntüleme (otomatik)
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

// Telefon tıklama takibi
document.addEventListener('DOMContentLoaded', function() {
  // Telefon numaralarını izle
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
  phoneLinks.forEach(link => {
    link.addEventListener('click', function() {
      gtag('event', 'phone_call', {
        'event_category': 'contact',
        'event_label': this.href.replace('tel:', ''),
        'value': 1
      });
    });
  });

  // WhatsApp tıklama takibi
  const whatsappLinks = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]');
  whatsappLinks.forEach(link => {
    link.addEventListener('click', function() {
      gtag('event', 'whatsapp_click', {
        'event_category': 'contact',
        'event_label': 'WhatsApp İletişim',
        'value': 1
      });
    });
  });

  // Form gönderimi takibi
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const formName = this.id || this.className || 'unknown_form';
      gtag('event', 'form_submit', {
        'event_category': 'engagement',
        'event_label': formName,
        'value': 1
      });
    });
  });

  // Sipariş butonları takibi
  const orderButtons = document.querySelectorAll('button[data-product], .order-btn, .siparis-btn');
  orderButtons.forEach(button => {
    button.addEventListener('click', function() {
      const productName = this.getAttribute('data-product') || this.textContent;
      gtag('event', 'begin_checkout', {
        'event_category': 'ecommerce',
        'event_label': productName,
        'value': 1
      });
    });
  });

  // CTA (Call to Action) tıklama takibi
  const ctaButtons = document.querySelectorAll('.cta-btn, [data-cta]');
  ctaButtons.forEach(button => {
    button.addEventListener('click', function() {
      gtag('event', 'cta_click', {
        'event_category': 'engagement',
        'event_label': this.textContent.trim(),
        'value': 1
      });
    });
  });

  // Scroll derinliği takibi
  let scrollDepth25 = false, scrollDepth50 = false, scrollDepth75 = false, scrollDepth100 = false;
  
  window.addEventListener('scroll', function() {
    const scrollPercent = (window.scrollY + window.innerHeight) / document.body.scrollHeight * 100;
    
    if (scrollPercent >= 25 && !scrollDepth25) {
      scrollDepth25 = true;
      gtag('event', 'scroll', {
        'event_category': 'engagement',
        'event_label': '25%',
        'value': 25
      });
    }
    if (scrollPercent >= 50 && !scrollDepth50) {
      scrollDepth50 = true;
      gtag('event', 'scroll', {
        'event_category': 'engagement',
        'event_label': '50%',
        'value': 50
      });
    }
    if (scrollPercent >= 75 && !scrollDepth75) {
      scrollDepth75 = true;
      gtag('event', 'scroll', {
        'event_category': 'engagement',
        'event_label': '75%',
        'value': 75
      });
    }
    if (scrollPercent >= 100 && !scrollDepth100) {
      scrollDepth100 = true;
      gtag('event', 'scroll', {
        'event_category': 'engagement',
        'event_label': '100%',
        'value': 100
      });
    }
  });

  // Dış link tıklama takibi
  const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="imzaistanbul.com"])');
  externalLinks.forEach(link => {
    link.addEventListener('click', function() {
      gtag('event', 'outbound_link', {
        'event_category': 'engagement',
        'event_label': this.href,
        'value': 1
      });
    });
  });

  // Video izleme (varsa)
  const videos = document.querySelectorAll('video, iframe[src*="youtube"], iframe[src*="vimeo"]');
  videos.forEach(video => {
    video.addEventListener('play', function() {
      gtag('event', 'video_play', {
        'event_category': 'engagement',
        'event_label': this.src || this.currentSrc || 'unknown',
        'value': 1
      });
    });
  });

  // Fiyat kartı görüntüleme
  const priceCards = document.querySelectorAll('[data-price]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const price = entry.target.getAttribute('data-price');
        const productName = entry.target.getAttribute('data-product') || 'unknown';
        gtag('event', 'view_item', {
          'event_category': 'ecommerce',
          'event_label': productName,
          'value': parseFloat(price) || 0,
          'currency': 'TRY'
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  priceCards.forEach(card => observer.observe(card));
});

// Sayfa çıkış anında (bounce rate hesaplaması için)
let sessionStartTime = Date.now();
window.addEventListener('beforeunload', function() {
  const sessionDuration = (Date.now() - sessionStartTime) / 1000; // saniye
  if (sessionDuration > 30) { // 30 saniyeden fazla kalırsa
    gtag('event', 'engaged_session', {
      'event_category': 'engagement',
      'event_label': 'Session Duration',
      'value': Math.round(sessionDuration)
    });
  }
});
