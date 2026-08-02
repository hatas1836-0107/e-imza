/**
 * Premium Products Renderer with WebGL Shader Background
 * Features:
 * - Animated WebGL shader background (like the reference design)
 * - Renders Firebase products as modern glassmorphic cards
 * - Theme-aware (dark/light mode support)
 * - Responsive and performant
 * - Graceful fallback if WebGL unavailable
 */

(function() {
  'use strict';

  // Initialize WebGL background
  function initProductsBackground(canvasId, fallbackId) {
    const canvas = document.getElementById(canvasId);
    const fallback = document.getElementById(fallbackId);
    
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      antialias: true,
      alpha: false,
      depth: false,
      stencil: false,
      preserveDrawingBuffer: false,
      powerPreference: 'default'
    }) || canvas.getContext('experimental-webgl');

    if (!gl) {
      // WebGL not supported - keep CSS fallback
      if (fallback) fallback.style.display = 'block';
      canvas.remove();
      return;
    }

    if (fallback) fallback.style.display = 'none';

    // Vertex shader
    const VERT = `
      attribute vec2 aPosition;
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    // Fragment shader - animated gradient circles
    const FRAG = `
      precision mediump float;
      uniform float iTime;
      uniform vec2 iResolution;
      uniform vec3 uBackgroundColor;
      uniform int uTheme;

      mat2 rotate2d(float angle) {
        float c = cos(angle), s = sin(angle);
        return mat2(c, -s, s, c);
      }

      float variation(vec2 v1, vec2 v2, float strength, float speed) {
        return sin(dot(normalize(v1), normalize(v2)) * strength + iTime * speed) / 100.0;
      }

      vec3 paintCircle(vec2 uv, vec2 center, float rad, float width) {
        vec2 diff = center - uv;
        float len = length(diff);
        len += variation(diff, vec2(0., 1.), 5., 2.);
        len -= variation(diff, vec2(1., 0.), 5., 2.);
        float circle = smoothstep(rad - width, rad, len) - smoothstep(rad, rad + width, len);
        return vec3(circle);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / iResolution.xy;
        uv.x *= 1.5;
        uv.x -= 0.25;

        float mask = 0.0;
        float radius = 0.35;
        vec2 center = vec2(0.5);

        mask += paintCircle(uv, center, radius, 0.035).r;
        mask += paintCircle(uv, center, radius - 0.018, 0.01).r;
        mask += paintCircle(uv, center, radius + 0.018, 0.005).r;

        vec2 v = rotate2d(iTime) * uv;
        
        // Theme-aware colors
        vec3 foregroundColor;
        if (uTheme == 1) {
          // Light theme - softer colors
          foregroundColor = vec3(v.x * 0.4 + 0.3, v.y * 0.4 + 0.4, 0.85 - v.y * v.x * 0.2);
        } else {
          // Dark theme - vibrant colors
          foregroundColor = vec3(v.x, v.y, 0.7 - v.y * v.x);
        }

        vec3 color = mix(uBackgroundColor, foregroundColor, mask);
        color = mix(color, vec3(1.), paintCircle(uv, center, radius, 0.003).r);

        gl_FragColor = vec4(color, 1.);
      }
    `;

    function compileShader(type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        return null;
      }
      return shader;
    }

    const vs = compileShader(gl.VERTEX_SHADER, VERT);
    const fs = compileShader(gl.FRAGMENT_SHADER, FRAG);
    
    if (!vs || !fs) return;

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Setup geometry
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1, 1, -1, -1, 1,
      -1, 1, 1, -1, 1, 1
    ]), gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const iTimeLoc = gl.getUniformLocation(program, 'iTime');
    const iResLoc = gl.getUniformLocation(program, 'iResolution');
    const bgLoc = gl.getUniformLocation(program, 'uBackgroundColor');
    const themeLoc = gl.getUniformLocation(program, 'uTheme');

    // Theme detection
    function getTheme() {
      return document.documentElement.getAttribute('data-theme') === 'light' ? 1 : 0;
    }

    function updateTheme() {
      const isLight = getTheme();
      gl.uniform1i(themeLoc, isLight);
      if (isLight) {
        gl.uniform3fv(bgLoc, new Float32Array([0.98, 0.984, 0.988])); // Light background
      } else {
        gl.uniform3fv(bgLoc, new Float32Array([0.043, 0.055, 0.102])); // Dark background - matches homepage #0b0e1a
      }
    }

    updateTheme();

    // Watch for theme changes
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    // Responsive canvas sizing
    function getDPR() {
      const isSmall = window.innerWidth <= 768;
      const cap = isSmall ? 1.5 : 2;
      return Math.min(window.devicePixelRatio || 1, cap);
    }

    let rafId = null;
    let resizeRaf = null;

    function resize() {
      const dpr = getDPR();
      const w = Math.floor(window.innerWidth * dpr);
      const h = Math.floor(window.innerHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    }

    function renderFrame(timeMs) {
      gl.uniform1f(iTimeLoc, timeMs * 0.001);
      gl.uniform2f(iResLoc, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    function loop(t) {
      renderFrame(t);
      rafId = requestAnimationFrame(loop);
    }

    function start() {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(loop);
    }

    function stop() {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }

    resize();

    // Handle reduced motion preference
    const reduceMotion = window.matchMedia && 
                         window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      renderFrame(0); // Static frame
    } else {
      start();

      // Pause when tab hidden
      document.addEventListener('visibilitychange', function() {
        if (document.hidden) stop();
        else start();
      });

      window.addEventListener('blur', stop);
      window.addEventListener('focus', function() {
        if (!document.hidden) start();
      });
    }

    // Handle resize
    window.addEventListener('resize', function() {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(function() {
        resize();
        if (reduceMotion) renderFrame(0);
      });
    }, { passive: true });

    window.addEventListener('orientationchange', function() {
      setTimeout(resize, 200);
    });
  }

  // Render product cards from Firebase data
  function renderPremiumProducts(products, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const grid = container.querySelector('.products-grid');
    if (!grid) return;

    // Handle empty state
    if (!products || products.length === 0) {
      grid.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:var(--text-muted);">
          <p style="font-size:1.1rem;margin-bottom:8px;">Şu anda gösterilecek ürün bulunmuyor.</p>
          <p style="font-size:0.9rem;">Lütfen daha sonra tekrar kontrol edin.</p>
        </div>
      `;
      return;
    }

    // Set data attribute for centering logic
    grid.setAttribute('data-count', products.length);

    // Generate cards
    const cardsHTML = products.map((product, index) => {
      const isPopular = index === 1 && products.length >= 3;
      const popularClass = isPopular ? ' popular' : '';
      const badgeHTML = isPopular ? '<div class="product-badge">En Popüler</div>' : '';
      const btnVariant = isPopular ? 'primary' : 'secondary';

      // Product image (if available)
      const imageHTML = product.imageUrl ? `
        <div class="product-image">
          <img src="${product.imageUrl}" alt="${product.name}" loading="lazy" />
        </div>
      ` : '';

      // VAT label logic:
      // If vatIncluded is FALSE (switch OFF) -> show "+KDV"
      // If vatIncluded is TRUE (switch ON) -> don't show anything
      const vatLabel = product.vatIncluded !== true 
        ? '<span class="period">+KDV</span>' 
        : '';

      // Features
      const features = (product.features || [])
        .map(f => `
          <li>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 6 9 17l-5-5"/>
            </svg>
            <span>${f}</span>
          </li>
        `)
        .join('');

      return `
        <div class="product-card-premium${popularClass}" style="animation-delay:${index * 0.1}s;">
          ${badgeHTML}
          ${imageHTML}
          <div class="product-content">
            <h2>${product.name || 'Ürün'}</h2>
            <div class="desc">${product.description || ''}</div>
            <div class="product-price">
              <span class="amount">${Number(product.price || 0).toLocaleString('tr-TR')}₺</span>
              ${vatLabel}
            </div>
            <div class="product-divider"></div>
            <ul class="product-features">${features}</ul>
            <a href="./iletisim.html?product=${encodeURIComponent(product.name)}&price=${product.price}" class="product-btn product-btn-${btnVariant}">
              Sipariş Oluştur
            </a>
          </div>
        </div>
      `;
    }).join('');

    grid.innerHTML = cardsHTML;
  }

  // Export functions globally
  window.initProductsBackground = initProductsBackground;
  window.renderPremiumProducts = renderPremiumProducts;

})();
