/* ============================================================
   ZİRVE E-İMZA — Ortak Script
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Toast Notification System ---------- */
  function showToast(title, message, type = 'info') {
    var container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    var icons = {
      success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>',
      error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6m0-6 6 6"/></svg>',
      warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 2 22h20L12 2Z"/><path d="M12 9v5m0 4h.01"/></svg>',
      info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></svg>'
    };

    var toast = document.createElement('div');
    toast.className = 'toast toast-' + type;
    toast.innerHTML = 
      '<div class="toast-icon">' + icons[type] + '</div>' +
      '<div class="toast-content">' +
        '<div class="toast-title">' + title + '</div>' +
        '<div class="toast-message">' + message + '</div>' +
      '</div>' +
      '<button class="toast-close" aria-label="Kapat">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>' +
      '</button>';

    container.appendChild(toast);
    
    setTimeout(function() { toast.classList.add('show'); }, 10);

    var closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', function() { removeToast(toast); });

    setTimeout(function() { removeToast(toast); }, 5000);
  }

  function removeToast(toast) {
    toast.classList.add('hide');
    toast.classList.remove('show');
    setTimeout(function() { 
      if (toast.parentNode) toast.parentNode.removeChild(toast); 
    }, 300);
  }

  /* ---------- Tema (dark/light) ---------- */
  var root = document.documentElement;
  var THEME_KEY = "zirve-eimza-theme";

  function applyTheme(theme) {
    if (theme === "light") {
      root.setAttribute("data-theme", "light");
    } else {
      root.setAttribute("data-theme", "dark");
    }
  }

  var savedTheme = null;
  try { savedTheme = localStorage.getItem(THEME_KEY); } catch (e) {}
  if (!savedTheme) {
    savedTheme = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }
  applyTheme(savedTheme);

  document.addEventListener("DOMContentLoaded", function () {
    var toggles = document.querySelectorAll(".theme-toggle");
    toggles.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var current = root.getAttribute("data-theme") === "light" ? "dark" : "light";
        applyTheme(current);
        try { localStorage.setItem(THEME_KEY, current); } catch (e) {}
      });
    });

    /* ---------- Mobil menü + Smooth scroll ---------- */
    var navToggle = document.querySelector(".nav-toggle");
    var drawer = document.querySelector(".mobile-drawer");
    var drawerClose = document.querySelector(".drawer-close");
    function openDrawer() { if (drawer) { drawer.classList.add("open"); document.body.style.overflow = "hidden"; } }
    function closeDrawer() { if (drawer) { drawer.classList.remove("open"); document.body.style.overflow = ""; } }
    if (navToggle) navToggle.addEventListener("click", openDrawer);
    if (drawerClose) drawerClose.addEventListener("click", closeDrawer);
    if (drawer) {
      drawer.querySelectorAll("a").forEach(function (a) { 
        a.addEventListener("click", function(e) {
          closeDrawer();
          // Eğer link aynı sayfa içi anchor ise smooth scroll
          var href = a.getAttribute("href");
          if (href && href.startsWith("#")) {
            e.preventDefault();
            var target = document.querySelector(href);
            if (target) {
              target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }
        }); 
      });
    }
    
    /* Tüm anchor linklere smooth scroll ekle */
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener("click", function(e) {
        var href = this.getAttribute("href");
        if (href === "#") return;
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          closeDrawer(); // Mobil menü açıksa kapat
        }
      });
    });

    /* ---------- Scroll reveal + card 3D tilt effect ---------- */
    var revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && revealEls.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.14, rootMargin: "0px 0px -40px 0px" });
      revealEls.forEach(function (el, i) {
        el.style.setProperty("--i", i % 8);
        io.observe(el);
      });
    } else {
      revealEls.forEach(function (el) { el.classList.add("in"); });
    }
    
    /* Card 3D tilt on hover (desktop only) */
    if (window.innerWidth > 860) {
      document.querySelectorAll(".card").forEach(function(card) {
        card.addEventListener("mousemove", function(e) {
          var rect = card.getBoundingClientRect();
          var x = e.clientX - rect.left;
          var y = e.clientY - rect.top;
          var centerX = rect.width / 2;
          var centerY = rect.height / 2;
          var rotateX = (y - centerY) / 20;
          var rotateY = (centerX - x) / 20;
          card.style.transform = "translateY(-8px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";
        });
        card.addEventListener("mouseleave", function() {
          card.style.transform = "";
        });
      });
    }

    /* ---------- Accordion (SSS) ---------- */
    document.querySelectorAll(".accordion-item").forEach(function (item) {
      var q = item.querySelector(".accordion-q");
      var a = item.querySelector(".accordion-a");
      if (!q || !a) return;
      q.addEventListener("click", function () {
        var isOpen = item.classList.contains("open");
        item.closest(".accordion")?.querySelectorAll(".accordion-item.open").forEach(function (openItem) {
          if (openItem !== item) {
            openItem.classList.remove("open");
            openItem.querySelector(".accordion-a").style.maxHeight = null;
            openItem.querySelector(".accordion-q").setAttribute("aria-expanded", "false");
          }
        });
        if (isOpen) {
          item.classList.remove("open");
          a.style.maxHeight = null;
          q.setAttribute("aria-expanded", "false");
        } else {
          item.classList.add("open");
          a.style.maxHeight = a.scrollHeight + "px";
          q.setAttribute("aria-expanded", "true");
        }
      });
    });

    /* ---------- Testimonials Carousel ---------- */
    var carousel = document.querySelector(".testimonials-carousel");
    if (carousel) {
      var slides = carousel.querySelectorAll(".testimonial-slide");
      var dotsContainer = carousel.querySelector(".carousel-dots");
      
      if (!dotsContainer || slides.length === 0) return;
      
      var currentIndex = 0;
      var autoplayInterval;
      var isMobile = window.innerWidth < 768;
      
      // Create dots
      function createDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = "";
        
        slides.forEach(function(_, index) {
          var dot = document.createElement("button");
          dot.className = "carousel-dot";
          dot.setAttribute("aria-label", "Yorum " + (index + 1));
          if (index === 0) dot.classList.add("active");
          
          (function(idx) {
            dot.addEventListener("click", function() { goToSlide(idx); });
          })(index);
          
          dotsContainer.appendChild(dot);
        });
      }
      
      // Update dots
      function updateDots() {
        if (!dotsContainer) return;
        var dots = dotsContainer.querySelectorAll(".carousel-dot");
        dots.forEach(function(dot, index) {
          if (index === currentIndex) {
            dot.classList.add("active");
          } else {
            dot.classList.remove("active");
          }
        });
      }
      
      // Update slides
      function updateSlides() {
        isMobile = window.innerWidth < 768;
        
        slides.forEach(function(slide, index) {
          slide.classList.remove("active");
          
          if (isMobile) {
            // Mobile: show only current slide
            if (index === currentIndex) {
              slide.classList.add("active");
            }
          } else {
            // Desktop: show 3 slides (current index and 2 after)
            var visibleIndices = [
              currentIndex,
              (currentIndex + 1) % slides.length,
              (currentIndex + 2) % slides.length
            ];
            
            if (visibleIndices.indexOf(index) !== -1) {
              slide.classList.add("active");
            }
          }
        });
        
        updateDots();
      }
      
      // Go to slide
      function goToSlide(index) {
        currentIndex = index;
        updateSlides();
        resetAutoplay();
      }
      
      // Next slide
      function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlides();
      }
      
      // Start autoplay
      function startAutoplay() {
        stopAutoplay();
        autoplayInterval = setInterval(nextSlide, 5000);
      }
      
      // Stop autoplay
      function stopAutoplay() {
        if (autoplayInterval) {
          clearInterval(autoplayInterval);
          autoplayInterval = null;
        }
      }
      
      // Reset autoplay
      function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
      }
      
      // Initialize
      createDots();
      updateSlides();
      startAutoplay();
      
      // Pause on hover
      carousel.addEventListener("mouseenter", stopAutoplay);
      carousel.addEventListener("mouseleave", startAutoplay);
      
      // Handle resize
      var resizeTimer;
      window.addEventListener("resize", function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
          updateSlides();
        }, 150);
      });
      
      // Touch swipe support
      var touchStartX = 0;
      var touchEndX = 0;
      
      carousel.addEventListener("touchstart", function(e) {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });
      
      carousel.addEventListener("touchend", function(e) {
        touchEndX = e.changedTouches[0].screenX;
        var diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > 50) {
          if (diff > 0) {
            nextSlide();
          } else {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlides();
          }
          resetAutoplay();
        }
      }, { passive: true });
    }

    /* ---------- Sayaç animasyonu (istatistikler) ---------- */
    var statNums = document.querySelectorAll(".stat-num[data-count]");
    if (statNums.length && "IntersectionObserver" in window) {
      var counted = new WeakSet();
      var statIo = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !counted.has(entry.target)) {
            counted.add(entry.target);
            animateCount(entry.target);
          }
        });
      }, { threshold: 0.5 });
      statNums.forEach(function (el) { statIo.observe(el); });
    }
    function animateCount(el) {
      var target = parseFloat(el.getAttribute("data-count"));
      var suffix = el.getAttribute("data-suffix") || "";
      var duration = 1400;
      var start = null;
      function step(ts) {
        if (!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var value = Math.floor(eased * target);
        el.textContent = value.toLocaleString("tr-TR") + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString("tr-TR") + suffix;
      }
      requestAnimationFrame(step);
    }

    /* ---------- Yukarı çık + header küçülme + parallax + modern scroll efektleri ---------- */
    var fabTop = document.querySelector(".fab-top");
    var header = document.querySelector(".site-header");
    var meshBg = document.querySelector(".mesh-bg");
    var heroSection = document.querySelector(".hero");
    var grainOverlay = document.querySelector(".grain-overlay");
    
    // Scroll animasyon değişkenleri
    var lastScrollY = 0;
    var ticking = false;
    
    function updateScrollEffects() {
      var y = window.scrollY || window.pageYOffset;
      var scrollProgress = y / (document.documentElement.scrollHeight - window.innerHeight);
      var windowHeight = window.innerHeight;
      
      // Yukarı çık butonu
      if (fabTop) fabTop.classList.toggle("show", y > 480);
      
      // Header shadow - Dinamik opacity
      if (header) {
        var shadowOpacity = Math.min(y / 100, 1);
        header.style.boxShadow = y > 12 ? "0 6px 24px rgba(0,0,0," + (0.18 * shadowOpacity) + ")" : "none";
      }
      
      // Hero scroll efekti KAPALI - artık herhangi bir scroll animasyonu yok
      // Elementler normal kalacak, opacity ve position değişmeyecek
      
      // Mesh Background - Gelişmiş parallax ve rotate
      if (meshBg) {
        var translateY = y * 0.4; // Daha hızlı hareket
        var rotate = scrollProgress * 5; // Scroll ile hafif döndürme (0-5deg)
        var scale = 1 + (scrollProgress * 0.1); // Scroll ile hafif büyüme
        meshBg.style.transform = "translateY(" + translateY + "px) rotate(" + rotate + "deg) scale(" + scale + ")";
        
        // Opacity - Sayfa aşağı indikçe soluklaş
        var opacity = Math.max(0.3, 1 - (y / (windowHeight * 2)));
        meshBg.style.opacity = opacity;
      }
      
      // Grain Overlay - Scroll ile dinamik opacity
      if (grainOverlay) {
        var grainOpacity = 0.035 + (scrollProgress * 0.015);
        grainOverlay.style.opacity = Math.min(grainOpacity, 0.05);
      }
      
      // Hero Section - Parallax KAPALI (artık hareket etmeyecek)
      // Scroll yapınca elementler normal kalacak
      
      // Kartlar için scroll-triggered animations
      var revealCards = document.querySelectorAll('.card:not(.revealed)');
      revealCards.forEach(function(card) {
        var rect = card.getBoundingClientRect();
        var cardMiddle = rect.top + (rect.height / 2);
        
        if (cardMiddle < windowHeight * 0.85) {
          card.classList.add('revealed');
          
          // Hafif parallax her karta
          var cardOffset = (rect.top - windowHeight) * 0.05;
          card.style.transform = "translateY(" + cardOffset + "px)";
        }
      });
      
      ticking = false;
    }
    
    function requestTick() {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollEffects);
        ticking = true;
      }
    }
    
    window.addEventListener("scroll", requestTick, { passive: true });
    
    // İlk yükleme
    updateScrollEffects();
    
    if (fabTop) fabTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

    /* ---------- İlçe filtresi (bölgeler sayfası) - Geliştirilmiş ---------- */
    var districtSearch = document.querySelector("#districtSearch");
    if (districtSearch) {
      var districtGrid = document.querySelector("#districtGrid");
      var districtCards = districtGrid ? districtGrid.querySelectorAll(".card") : [];
      var noResultsMessage = null;
      
      // Türkçe karakter normalize fonksiyonu
      function turkishToLower(text) {
        return text
          .replace(/İ/g, 'i')
          .replace(/I/g, 'ı')
          .replace(/Ş/g, 'ş')
          .replace(/Ğ/g, 'ğ')
          .replace(/Ü/g, 'ü')
          .replace(/Ö/g, 'ö')
          .replace(/Ç/g, 'ç')
          .toLowerCase();
      }
      
      districtSearch.addEventListener("input", function () {
        var term = turkishToLower(this.value.trim());
        var visibleCount = 0;
        
        districtCards.forEach(function (card) {
          var name = turkishToLower(card.querySelector("h3")?.textContent || "");
          var isMatch = name.indexOf(term) !== -1;
          
          if (isMatch || term === "") {
            card.style.display = "flex";
            visibleCount++;
          } else {
            card.style.display = "none";
          }
        });
        
        // Sonuç bulunamadı mesajı
        if (visibleCount === 0 && term !== "") {
          if (!noResultsMessage) {
            noResultsMessage = document.createElement("div");
            noResultsMessage.style.cssText = "grid-column:1/-1;text-align:center;padding:60px 20px;";
            noResultsMessage.innerHTML = 
              '<div style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:40px;max-width:500px;margin:0 auto;">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:48px;height:48px;color:#7d81a0;margin-bottom:16px;"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>' +
              '<h3 style="color:#f3f4f8;margin-bottom:8px;font-size:1.1rem;">İlçe bulunamadı</h3>' +
              '<p style="color:#7d81a0;font-size:0.95rem;line-height:1.6;">Aradığınız ilçe bulunamadı. Farklı bir kelime deneyin veya tüm listeyi görüntüleyin.</p>' +
              '</div>';
            districtGrid.appendChild(noResultsMessage);
          }
          noResultsMessage.style.display = "block";
        } else if (noResultsMessage) {
          noResultsMessage.style.display = "none";
        }
        
        // Arama yapıldığında scroll animasyonunu kaldır
        if (term !== "") {
          districtCards.forEach(function(card) {
            card.style.animation = "none";
          });
        } else {
          districtCards.forEach(function(card, i) {
            card.style.animation = "";
            card.style.setProperty("--i", i % 8);
          });
        }
      });
      
      // Arama kutusuna focus olduğunda placeholder animasyonu
      districtSearch.addEventListener("focus", function() {
        this.style.borderColor = "rgba(79,70,229,0.5)";
        this.style.boxShadow = "0 0 0 3px rgba(79,70,229,0.15)";
      });
      
      districtSearch.addEventListener("blur", function() {
        this.style.borderColor = "";
        this.style.boxShadow = "";
      });
      
      // İlk yüklemede arama kutusuna otomatik focus (opsiyonel)
      if (window.location.hash && window.location.hash.startsWith("#")) {
        setTimeout(function() {
          var targetId = window.location.hash.substring(1);
          var targetCard = document.getElementById(targetId);
          if (targetCard) {
            targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
            targetCard.style.animation = "none";
            targetCard.style.transform = "translateY(-4px)";
            targetCard.style.boxShadow = "0 12px 40px rgba(79,70,229,0.3)";
            setTimeout(function() {
              targetCard.style.animation = "";
              targetCard.style.transform = "";
              targetCard.style.boxShadow = "";
            }, 2000);
          }
        }, 300);
      }
    }

    /* ---------- İletişim formu -> WhatsApp entegrasyonu ---------- */
    var quoteForm = document.querySelector("#quoteForm");
    if (quoteForm) {
      quoteForm.addEventListener("submit", function (e) {
        e.preventDefault();
        
        // Form verilerini topla
        var adSoyad = (document.getElementById("adSoyad")?.value || "").trim();
        var telefon = (document.getElementById("telefon")?.value || "").trim();
        var eposta = (document.getElementById("eposta")?.value || "").trim();
        var ilce = (document.getElementById("ilce")?.value || "").trim();
        var hizmetTuru = (document.getElementById("hizmetTuru")?.value || "").trim();
        var teslimat = (document.getElementById("teslimat")?.value || "").trim();
        var mesaj = (document.getElementById("mesaj")?.value || "").trim();
        
        // Konum bilgisi varsa al
        var addressInput = document.getElementById("addressInput");
        var konum = addressInput ? addressInput.value.trim() : "";
        
        // Form doğrulama
        if (!adSoyad || !telefon || !ilce) {
          showToast('Hata', 'Lütfen tüm zorunlu alanları doldurun.', 'error');
          return;
        }
        
        // Ürün/Hizmet bilgilerini detaylı ekle
        var urunDetaylari = {
          'Bireysel E-İmza': '1 yıl geçerli, akıllı kart + okuyucu dahil, e-Devlet uyumlu',
          'Kurumsal E-İmza': '2 yıl geçerli, kurumsal kullanım, toplu başvuru desteği',
          'Mobil İmza': '1 yıl geçerli, fiziksel kart gerektirmez, SMS onaylı',
          'Yenileme': 'Mevcut e-imza yenileme işlemi'
        };
        
        var teslimatDetaylari = {
          'Aynı Gün Kurye': 'Kurye ile aynı gün elden teslim, ortalama 45 dakika',
          'Bilgisayardan Online Teslim': 'Uzaktan kurulum ile anında teslim',
          'Emin Değilim': 'Seçenekler hakkında bilgi almak istiyorum'
        };
        
        // WhatsApp mesajını formatla - Emoji olmadan, düz metin
        var whatsappMessage = "*E-IMZA TEKLIF TALEBI*\n\n";
        whatsappMessage += "=== MUSTERI BILGILERI ===\n";
        whatsappMessage += "*Ad Soyad:* " + adSoyad + "\n";
        whatsappMessage += "*Telefon:* " + telefon + "\n";
        if (eposta) whatsappMessage += "*E-posta:* " + eposta + "\n";
        whatsappMessage += "*Ilce:* " + ilce + ", Istanbul\n";
        if (konum) {
          whatsappMessage += "*Konum/Adres:* " + konum + "\n";
        }
        whatsappMessage += "\n";
        
        whatsappMessage += "=== TALEP DETAYLARI ===\n";
        whatsappMessage += "*Hizmet Turu:* " + hizmetTuru + "\n";
        if (urunDetaylari[hizmetTuru]) {
          whatsappMessage += "_" + urunDetaylari[hizmetTuru] + "_\n";
        }
        whatsappMessage += "\n*Teslimat Tercihi:* " + teslimat + "\n";
        if (teslimatDetaylari[teslimat]) {
          whatsappMessage += "_" + teslimatDetaylari[teslimat] + "_\n";
        }
        
        if (mesaj) {
          whatsappMessage += "\n=== MUSTERI MESAJI ===\n" + mesaj + "\n";
        }
        
        whatsappMessage += "\n---\n_Bu mesaj zirveeimza.com teklif formundan gonderilmistir._\n";
        whatsappMessage += "_Tarih: " + new Date().toLocaleString('tr-TR') + "_";
        
        // WhatsApp linkini oluştur
        var whatsappNumber = "905453863407";
        var whatsappURL = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(whatsappMessage);
        
        // Kullanıcıya bilgi ver
        showToast('Başarılı', 'Talebiniz WhatsApp\'a iletiliyor...', 'success');
        
        // Form bilgilerini göster
        var formSummary = document.createElement('div');
        formSummary.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(11,14,26,0.98);border:1px solid rgba(79,70,229,0.4);border-radius:20px;padding:30px;max-width:500px;width:90%;z-index:10001;box-shadow:0 20px 60px rgba(0,0,0,0.5);';
        formSummary.innerHTML = '<h3 style="color:#818cf8;margin-bottom:16px;font-size:1.2rem;">Teklif Talebiniz Hazır</h3>' +
          '<p style="color:#b6bad0;margin-bottom:20px;line-height:1.6;">Aşağıdaki bilgilerle WhatsApp\'a yönlendirileceksiniz:</p>' +
          '<div style="background:rgba(255,255,255,0.05);padding:16px;border-radius:12px;margin-bottom:20px;font-size:0.9rem;line-height:1.8;">' +
          '<strong style="color:#f3f4f8;">Ad Soyad:</strong> <span style="color:#b6bad0;">' + adSoyad + '</span><br>' +
          '<strong style="color:#f3f4f8;">Telefon:</strong> <span style="color:#b6bad0;">' + telefon + '</span><br>' +
          (eposta ? '<strong style="color:#f3f4f8;">E-posta:</strong> <span style="color:#b6bad0;">' + eposta + '</span><br>' : '') +
          '<strong style="color:#f3f4f8;">İlçe:</strong> <span style="color:#b6bad0;">' + ilce + '</span><br>' +
          (konum ? '<strong style="color:#f3f4f8;">Konum:</strong> <span style="color:#b6bad0;">' + (konum.length > 50 ? konum.substring(0, 50) + '...' : konum) + '</span><br>' : '') +
          '<strong style="color:#f3f4f8;">Hizmet:</strong> <span style="color:#b6bad0;">' + hizmetTuru + '</span><br>' +
          '<strong style="color:#f3f4f8;">Teslimat:</strong> <span style="color:#b6bad0;">' + teslimat + '</span>' +
          '</div>' +
          '<div style="display:flex;gap:12px;">' +
          '<button id="confirmWhatsApp" style="flex:1;padding:12px;background:linear-gradient(135deg,#4f46e5,#7c3aed);border:none;border-radius:12px;color:#fff;font-weight:600;cursor:pointer;font-size:0.95rem;">WhatsApp\'ı Aç</button>' +
          '<button id="cancelWhatsApp" style="flex:1;padding:12px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);border-radius:12px;color:#b6bad0;font-weight:600;cursor:pointer;font-size:0.95rem;">İptal</button>' +
          '</div>';
        
        document.body.appendChild(formSummary);
        
        // Overlay ekle
        var overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:10000;backdrop-filter:blur(4px);';
        document.body.appendChild(overlay);
        
        // Buton event listener'ları
        document.getElementById('confirmWhatsApp').addEventListener('click', function() {
          window.open(whatsappURL, '_blank');
          document.body.removeChild(formSummary);
          document.body.removeChild(overlay);
          quoteForm.reset();
          showToast('Gönderildi', 'WhatsApp penceresi açıldı. Mesajınızı kontrol edip gönderin.', 'success');
        });
        
        document.getElementById('cancelWhatsApp').addEventListener('click', function() {
          document.body.removeChild(formSummary);
          document.body.removeChild(overlay);
          showToast('İptal', 'Talep iptal edildi.', 'info');
        });
        
        // Overlay'e tıklayınca kapat
        overlay.addEventListener('click', function() {
          document.body.removeChild(formSummary);
          document.body.removeChild(overlay);
        });
      });
    }
    
    /* ---------- Dinamik Google Maps (İletişim sayfası) + Geolocation ---------- */
    var showMapBtn = document.querySelector("#showMapBtn");
    var getCurrentLocationBtn = document.querySelector("#getCurrentLocation");
    var addressInput = document.querySelector("#addressInput");
    var mapFrame = document.querySelector("#mapFrame");
    var mapContainer = document.querySelector("#mapContainer");
    
    function showMap(address) {
      if (!address) {
        showToast('Uyarı', 'Lütfen bir adres girin veya konumunuzu alın.', 'warning');
        return;
      }
      var encodedAddress = encodeURIComponent(address);
      mapFrame.src = "https://www.google.com/maps?q=" + encodedAddress + "&output=embed";
      mapContainer.classList.add('show');
      setTimeout(function() {
        mapContainer.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 100);
    }
    
    if (showMapBtn && addressInput && mapFrame && mapContainer) {
      showMapBtn.addEventListener("click", function() {
        var address = addressInput.value.trim();
        if (!address) {
          address = "İstanbul, Türkiye";
        }
        showMap(address);
        showToast('Başarılı', 'Harita yükleniyor...', 'success');
      });
      
      // Enter tuşuyla da çalışsın
      addressInput.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
          e.preventDefault();
          showMapBtn.click();
        }
      });
    }
    
    // Geolocation - Konumumu Al - Geliştirilmiş Reverse Geocoding
    if (getCurrentLocationBtn) {
      getCurrentLocationBtn.addEventListener("click", function() {
        if (!navigator.geolocation) {
          showToast('Hata', 'Tarayıcınız konum hizmetlerini desteklemiyor.', 'error');
          return;
        }
        
        showToast('Bilgi', 'Konumunuz alınıyor...', 'info');
        getCurrentLocationBtn.disabled = true;
        getCurrentLocationBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>Alınıyor...';
        
        navigator.geolocation.getCurrentPosition(
          function(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            
            // Reverse Geocoding - Koordinatları adrese çevir
            showToast('Bilgi', 'Adres bilgisi alınıyor...', 'info');
            
            fetch('https://nominatim.openstreetmap.org/reverse?format=json&lat=' + lat + '&lon=' + lon + '&zoom=18&addressdetails=1&accept-language=tr')
              .then(function(response) { return response.json(); })
              .then(function(data) {
                var address = '';
                
                if (data && data.address) {
                  var addr = data.address;
                  
                  // Türkiye için adres formatı
                  var parts = [];
                  if (addr.road) parts.push(addr.road);
                  if (addr.house_number) parts.push('No: ' + addr.house_number);
                  if (addr.neighbourhood) parts.push(addr.neighbourhood);
                  if (addr.suburb) parts.push(addr.suburb);
                  if (addr.district) parts.push(addr.district);
                  if (addr.quarter) parts.push(addr.quarter);
                  if (addr.city_district) parts.push(addr.city_district);
                  if (addr.city || addr.province) parts.push(addr.city || addr.province);
                  
                  address = parts.length > 0 ? parts.join(', ') : data.display_name;
                } else {
                  address = data.display_name || (lat + ', ' + lon);
                }
                
                // Adresi input'a yaz
                addressInput.value = address;
                addressInput.setAttribute('data-coords', lat + ',' + lon);
                
                // Haritayı göster
                showMap(lat + ',' + lon);
                showToast('Başarılı', 'Konumunuz: ' + address.split(',').slice(0, 2).join(','), 'success');
                
                getCurrentLocationBtn.disabled = false;
                getCurrentLocationBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>Konumumu Al';
              })
              .catch(function(error) {
                console.error('Geocoding error:', error);
                // Hata durumunda koordinatları kullan
                var coords = lat + ',' + lon;
                addressInput.value = coords;
                showMap(coords);
                showToast('Uyarı', 'Adres bilgisi alınamadı, koordinatlar kullanılıyor.', 'warning');
                
                getCurrentLocationBtn.disabled = false;
                getCurrentLocationBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>Konumumu Al';
              });
          },
          function(error) {
            var errorMsg = 'Konum alınamadı.';
            if (error.code === 1) errorMsg = 'Konum izni reddedildi.';
            else if (error.code === 2) errorMsg = 'Konum bilgisi mevcut değil.';
            else if (error.code === 3) errorMsg = 'Zaman aşımı.';
            
            showToast('Hata', errorMsg, 'error');
            getCurrentLocationBtn.disabled = false;
            getCurrentLocationBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>Konumumu Al';
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          }
        );
      });
    }
  });
})();


/* ============================================================
   CUSTOM CURSOR
   ============================================================ */
(function() {
  'use strict';
  
  const cursor = document.querySelector('.custom-cursor');
  const cursorDot = document.querySelector('.custom-cursor-dot');
  
  if (!cursor || !cursorDot) return;
  
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let dotX = 0;
  let dotY = 0;
  
  // Mouse hareket takibi
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  // Smooth cursor animasyonu
  function animate() {
    // Cursor (outer circle) - smooth follow
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    // Dot (inner circle) - faster follow
    dotX += (mouseX - dotX) * 0.25;
    dotY += (mouseY - dotY) * 0.25;
    cursorDot.style.left = dotX + 'px';
    cursorDot.style.top = dotY + 'px';
    
    requestAnimationFrame(animate);
  }
  
  animate();
  
  // Hover effect - tıklanabilir elementlerde büyür
  const hoverElements = 'a, button, input, textarea, select, .card, .btn, .custom-select-trigger, .select-modal-item';
  
  document.querySelectorAll(hoverElements).forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-hover');
      cursorDot.classList.add('cursor-hover');
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-hover');
      cursorDot.classList.remove('cursor-hover');
    });
  });
  
  // Click effect - pulse animasyonu
  document.addEventListener('mousedown', () => {
    cursor.classList.add('cursor-click');
    cursorDot.classList.add('cursor-click');
  });
  
  document.addEventListener('mouseup', () => {
    cursor.classList.remove('cursor-click');
    cursorDot.classList.remove('cursor-click');
  });
  
  // Sayfa dışına çıkınca gizle
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorDot.style.opacity = '0';
  });
  
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorDot.style.opacity = '1';
  });
  
  // Dinamik elementler için (modal, etc.)
  const observer = new MutationObserver(() => {
    document.querySelectorAll(hoverElements).forEach(el => {
      if (!el.dataset.cursorInit) {
        el.dataset.cursorInit = 'true';
        
        el.addEventListener('mouseenter', () => {
          cursor.classList.add('cursor-hover');
          cursorDot.classList.add('cursor-hover');
        });
        
        el.addEventListener('mouseleave', () => {
          cursor.classList.remove('cursor-hover');
          cursorDot.classList.remove('cursor-hover');
        });
      }
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
})();
