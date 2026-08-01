/* ============================================================
   ZİRVE E-İMZA — Ortak Script
   ============================================================ */
(function () {
  "use strict";

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

    /* ---------- Mobil menü ---------- */
    var navToggle = document.querySelector(".nav-toggle");
    var drawer = document.querySelector(".mobile-drawer");
    var drawerClose = document.querySelector(".drawer-close");
    function openDrawer() { if (drawer) { drawer.classList.add("open"); document.body.style.overflow = "hidden"; } }
    function closeDrawer() { if (drawer) { drawer.classList.remove("open"); document.body.style.overflow = ""; } }
    if (navToggle) navToggle.addEventListener("click", openDrawer);
    if (drawerClose) drawerClose.addEventListener("click", closeDrawer);
    if (drawer) {
      drawer.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeDrawer); });
    }

    /* ---------- Scroll reveal ---------- */
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

    /* ---------- Testimonial slider ---------- */
    var track = document.querySelector(".testi-track");
    if (track) {
      var cards = track.querySelectorAll(".testi-card");
      var dotsWrap = document.querySelector(".testi-nav");
      var perView = window.innerWidth >= 860 ? 3 : 1;
      var index = 0;
      var maxIndex = Math.max(0, cards.length - perView);

      function renderDots() {
        if (!dotsWrap) return;
        dotsWrap.innerHTML = "";
        for (var i = 0; i <= maxIndex; i++) {
          var d = document.createElement("button");
          d.className = "testi-dot" + (i === index ? " active" : "");
          d.setAttribute("aria-label", "Yorum grubu " + (i + 1));
          d.addEventListener("click", function (idx) { return function () { goTo(idx); }; }(i));
          dotsWrap.appendChild(d);
        }
      }
      function goTo(i) {
        index = Math.max(0, Math.min(i, maxIndex));
        var pct = (100 / perView) * index;
        track.style.transform = "translateX(-" + pct + "%)";
        renderDots();
      }
      document.querySelectorAll(".testi-arrow.next").forEach(function (b) { b.addEventListener("click", function () { goTo(index + 1 > maxIndex ? 0 : index + 1); }); });
      document.querySelectorAll(".testi-arrow.prev").forEach(function (b) { b.addEventListener("click", function () { goTo(index - 1 < 0 ? maxIndex : index - 1); }); });
      renderDots();

      var autoplay = setInterval(function () { goTo(index + 1 > maxIndex ? 0 : index + 1); }, 5200);
      track.closest(".testi-track-wrap").addEventListener("mouseenter", function () { clearInterval(autoplay); });

      window.addEventListener("resize", function () {
        var newPerView = window.innerWidth >= 860 ? 3 : 1;
        if (newPerView !== perView) {
          perView = newPerView;
          maxIndex = Math.max(0, cards.length - perView);
          goTo(0);
        }
      });
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

    /* ---------- Yukarı çık + header küçülme ---------- */
    var fabTop = document.querySelector(".fab-top");
    var header = document.querySelector(".site-header");
    window.addEventListener("scroll", function () {
      var y = window.scrollY || window.pageYOffset;
      if (fabTop) fabTop.classList.toggle("show", y > 480);
      if (header) header.style.boxShadow = y > 12 ? "0 6px 24px rgba(0,0,0,.18)" : "none";
    }, { passive: true });
    if (fabTop) fabTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

    /* ---------- İlçe filtresi (bölgeler sayfası) ---------- */
    var districtSearch = document.querySelector("#districtSearch");
    if (districtSearch) {
      districtSearch.addEventListener("input", function () {
        var term = this.value.trim().toLocaleLowerCase("tr-TR");
        document.querySelectorAll(".district-chip").forEach(function (chip) {
          var name = chip.textContent.trim().toLocaleLowerCase("tr-TR");
          chip.style.display = name.indexOf(term) !== -1 ? "flex" : "none";
        });
      });
    }

    /* ---------- İletişim formu -> WhatsApp'a yönlendirme yardımcı metni ---------- */
    var quoteForm = document.querySelector("#quoteForm");
    if (quoteForm) {
      quoteForm.addEventListener("submit", function () {
        var status = quoteForm.querySelector(".form-status");
        if (status) status.textContent = "Talebiniz alınıyor, birkaç saniye içinde yönlendirileceksiniz…";
      });
    }
  });
})();
