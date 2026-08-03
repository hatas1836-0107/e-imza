/**
 * Navigation Liquid Fill Effect
 * Tema butonundan başlayarak organik liquid yayılma animasyonu
 */

class NavLiquidEffect {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.animationFrame = null;
    this.isAnimating = false;
    this.startX = 0;
    this.startY = 0;
    
    this.init();
  }

  init() {
    // Canvas oluştur
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'nav-liquid-canvas';
    this.canvas.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 2;
    `;
    
    this.ctx = this.canvas.getContext('2d', { alpha: true });
    
    // Header container'a ekle
    const headerContainer = document.querySelector('.site-header .container');
    if (headerContainer) {
      headerContainer.appendChild(this.canvas);
      this.resizeCanvas();
      this.setupEventListeners();
    }
  }

  resizeCanvas() {
    const container = this.canvas.parentElement;
    if (container) {
      const rect = container.getBoundingClientRect();
      this.canvas.width = rect.width;
      this.canvas.height = rect.height;
    }
  }

  setupEventListeners() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('mouseenter', (e) => this.startEffect(e));
      themeToggle.addEventListener('mouseleave', () => this.stopEffect());
    }

    window.addEventListener('resize', () => this.resizeCanvas());
  }

  startEffect(e) {
    // Butonun container içindeki pozisyonunu al
    const container = this.canvas.parentElement;
    const containerRect = container.getBoundingClientRect();
    const buttonRect = e.target.getBoundingClientRect();
    
    this.startX = buttonRect.left + buttonRect.width / 2 - containerRect.left;
    this.startY = buttonRect.top + buttonRect.height / 2 - containerRect.top;
    
    this.particles = [];
    this.isAnimating = true;
    this.createParticles();
    this.animate();
  }

  stopEffect() {
    this.isAnimating = false;
    this.fadeOut();
  }

  createParticles() {
    const particleCount = 80;
    const isDark = !document.documentElement.hasAttribute('data-theme') || 
                   document.documentElement.getAttribute('data-theme') === 'dark';
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const speed = 0.5 + Math.random() * 1.5;
      
      this.particles.push({
        x: this.startX,
        y: this.startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 20 + Math.random() * 30,
        alpha: 0,
        targetAlpha: isDark ? 0.15 + Math.random() * 0.1 : 0.08 + Math.random() * 0.06,
        life: 1,
        maxLife: 1,
        color: isDark ? 
          `rgba(255, 255, 255, ${0.15 + Math.random() * 0.1})` : 
          `rgba(15, 23, 42, ${0.08 + Math.random() * 0.06})`
      });
    }
  }

  animate() {
    if (!this.isAnimating && this.particles.every(p => p.alpha < 0.01)) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      return;
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Particle'ları güncelle ve çiz
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      
      // Pozisyon güncelle
      p.x += p.vx;
      p.y += p.vy;
      
      // Yavaşlama efekti
      p.vx *= 0.99;
      p.vy *= 0.99;
      
      // Alpha güncelle
      if (this.isAnimating) {
        p.alpha += (p.targetAlpha - p.alpha) * 0.08;
      } else {
        p.alpha *= 0.92;
      }
      
      // Radius büyütme
      if (this.isAnimating) {
        p.radius += 0.8;
      }
      
      // Çiz
      this.ctx.beginPath();
      const gradient = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
      gradient.addColorStop(0, p.color.replace(/[\d.]+\)$/, `${p.alpha})`));
      gradient.addColorStop(0.5, p.color.replace(/[\d.]+\)$/, `${p.alpha * 0.5})`));
      gradient.addColorStop(1, p.color.replace(/[\d.]+\)$/, '0)'));
      
      this.ctx.fillStyle = gradient;
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Canvas dışına çıkanları temizle
      if (p.x < -p.radius || p.x > this.canvas.width + p.radius ||
          p.y < -p.radius || p.y > this.canvas.height + p.radius) {
        if (!this.isAnimating) {
          this.particles.splice(i, 1);
        }
      }
    }

    // Blur efekti için ekstra katman
    if (this.particles.length > 0) {
      this.ctx.globalCompositeOperation = 'destination-over';
      this.ctx.filter = 'blur(15px)';
      
      this.particles.forEach(p => {
        this.ctx.beginPath();
        this.ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${p.alpha * 0.3})`);
        this.ctx.arc(p.x, p.y, p.radius * 1.5, 0, Math.PI * 2);
        this.ctx.fill();
      });
      
      this.ctx.filter = 'none';
      this.ctx.globalCompositeOperation = 'source-over';
    }

    this.animationFrame = requestAnimationFrame(() => this.animate());
  }

  fadeOut() {
    // Tüm particle'ların alpha değerini düşür
    this.particles.forEach(p => {
      p.targetAlpha = 0;
    });
  }
}

// Sayfa yüklendiğinde başlat
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new NavLiquidEffect();
  });
} else {
  new NavLiquidEffect();
}
