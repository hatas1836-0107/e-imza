/**
 * Navigation Liquid Fill Effect - Optimized
 * Mobil ve düşük performanslı cihazlarda devre dışı
 */

class NavLiquidEffect {
  constructor() {
    // Performans kontrolleri
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    this.isLowPerf = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Mobil veya düşük performansta devre dışı
    if (this.isMobile || this.isLowPerf || this.reducedMotion) {
      console.log('NavLiquid: Disabled (mobile/low-perf)');
      return;
    }
    
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.animationFrame = null;
    this.isAnimating = false;
    this.startX = 0;
    this.startY = 0;
    this.destroyed = false;
    
    this.init();
  }

  init() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'nav-liquid-canvas';
    this.canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:2;will-change:transform';
    
    // Canvas optimizasyonu
    this.ctx = this.canvas.getContext('2d', { 
      alpha: true,
      desynchronized: true,
      willReadFrequently: false
    });
    
    const header = document.querySelector('.site-header .container');
    if (header) {
      header.appendChild(this.canvas);
      this.resizeCanvas();
      this.setupEvents();
    }
  }

  resizeCanvas() {
    if (this.destroyed) return;
    const container = this.canvas?.parentElement;
    if (container) {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.canvas.width = rect.width * dpr;
      this.canvas.height = rect.height * dpr;
      this.canvas.style.width = rect.width + 'px';
      this.canvas.style.height = rect.height + 'px';
      this.ctx.scale(dpr, dpr);
    }
  }

  setupEvents() {
    const btn = document.querySelector('.theme-toggle');
    if (btn) {
      btn.addEventListener('mouseenter', (e) => this.start(e), { passive: true });
      btn.addEventListener('mouseleave', () => this.stop(), { passive: true });
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => this.resizeCanvas(), 150);
    }, { passive: true });
    
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && this.isAnimating) this.stop();
    }, { passive: true });
  }

  start(e) {
    if (this.destroyed) return;
    const container = this.canvas.parentElement;
    const cRect = container.getBoundingClientRect();
    const bRect = e.target.getBoundingClientRect();
    
    this.startX = bRect.left + bRect.width / 2 - cRect.left;
    this.startY = bRect.top + bRect.height / 2 - cRect.top;
    
    this.particles = [];
    this.isAnimating = true;
    this.createParticles();
    this.animate();
  }

  stop() {
    this.isAnimating = false;
    this.particles.forEach(p => p.targetAlpha = 0);
  }

  createParticles() {
    const count = 50;
    const isDark = !document.documentElement.hasAttribute('data-theme') || 
                   document.documentElement.getAttribute('data-theme') === 'dark';
    
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const speed = 0.5 + Math.random() * 1.5;
      
      this.particles.push({
        x: this.startX,
        y: this.startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 20 + Math.random() * 30,
        alpha: 0,
        targetAlpha: isDark ? 0.12 + Math.random() * 0.08 : 0.06 + Math.random() * 0.04,
        color: isDark ? 'rgba(255,255,255,' : 'rgba(15,23,42,'
      });
    }
  }

  animate() {
    if (this.destroyed) return;
    
    if (!this.isAnimating && this.particles.every(p => p.alpha < 0.01)) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame);
        this.animationFrame = null;
      }
      return;
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.99;
      p.vy *= 0.99;
      
      if (this.isAnimating) {
        p.alpha += (p.targetAlpha - p.alpha) * 0.08;
        p.radius += 0.8;
      } else {
        p.alpha *= 0.92;
      }
      
      if (p.alpha > 0.01) {
        this.ctx.beginPath();
        const grad = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        grad.addColorStop(0, p.color + p.alpha + ')');
        grad.addColorStop(0.5, p.color + (p.alpha * 0.5) + ')');
        grad.addColorStop(1, p.color + '0)');
        this.ctx.fillStyle = grad;
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fill();
      }
      
      if ((p.x < -p.radius || p.x > this.canvas.width + p.radius ||
           p.y < -p.radius || p.y > this.canvas.height + p.radius) && !this.isAnimating) {
        this.particles.splice(i, 1);
      }
    }

    // Blur layer
    if (this.particles.length > 0 && this.particles.some(p => p.alpha > 0.01)) {
      this.ctx.globalCompositeOperation = 'destination-over';
      this.ctx.filter = 'blur(12px)';
      
      this.particles.forEach(p => {
        if (p.alpha > 0.01) {
          this.ctx.beginPath();
          this.ctx.fillStyle = p.color + (p.alpha * 0.25) + ')';
          this.ctx.arc(p.x, p.y, p.radius * 1.3, 0, Math.PI * 2);
          this.ctx.fill();
        }
      });
      
      this.ctx.filter = 'none';
      this.ctx.globalCompositeOperation = 'source-over';
    }

    this.animationFrame = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    this.destroyed = true;
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
    if (this.canvas?.parentElement) {
      this.canvas.parentElement.removeChild(this.canvas);
    }
    this.particles = [];
  }
}

// Init
let navLiquid = null;
function initLiquid() {
  if (navLiquid) return;
  if (document.querySelector('.site-header .container')) {
    navLiquid = new NavLiquidEffect();
  } else {
    setTimeout(initLiquid, 100);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLiquid);
} else {
  initLiquid();
}

window.addEventListener('beforeunload', () => {
  if (navLiquid?.destroy) navLiquid.destroy();
});
