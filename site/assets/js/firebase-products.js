// Firebase Products Integration for Frontend
// Bu dosya Firebase'den ürünleri çeker ve sitede gösterir

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getDatabase, ref, onValue } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

// Firebase config'i import et
import { firebaseConfig } from '../admin/firebase-config.js';

// Firebase'i başlat
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

/**
 * Firebase'den aktif ürünleri yükler
 * @param {Function} callback - Ürünler yüklendiğinde çağrılacak fonksiyon
 */
export function loadProducts(callback) {
  const productsRef = ref(database, 'products');
  
  onValue(productsRef, (snapshot) => {
    const productsData = snapshot.val() || {};
    
    // Ürünleri array'e çevir ve sadece aktif olanları filtrele
    const activeProducts = Object.entries(productsData)
      .map(([id, data]) => ({ id, ...data }))
      .filter(product => product.status === 'active')
      .sort((a, b) => (a.price || 0) - (b.price || 0)); // Fiyata göre sırala
    
    if (callback) {
      callback(activeProducts);
    }
  }, (error) => {
    console.error('Firebase ürün yükleme hatası:', error);
    if (callback) {
      callback([]); // Hata durumunda boş array döndür
    }
  });
}

/**
 * Ürünleri HTML kart olarak render eder
 * @param {Array} products - Ürün listesi
 * @param {HTMLElement} container - Render edilecek container
 */
export function renderProductCards(products, container) {
  if (!container) return;
  
  if (products.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:40px;color:#7d81a0;">
        <p>Şu anda görüntülenebilecek ürün bulunmuyor.</p>
        <p style="font-size:0.9rem;margin-top:10px;">Lütfen daha sonra tekrar kontrol edin.</p>
      </div>
    `;
    return;
  }
  
  let html = '<div class="grid grid-3 reveal-stagger">';
  
  products.forEach((product, index) => {
    const isFeatured = index === 1 && products.length >= 3; // Ortadaki ürün featured
    const cardClass = isFeatured ? 'price-card card glass featured reveal' : 'price-card card glass reveal';
    
    // Özellikleri listele
    const featuresList = (product.features || [])
      .map(feature => `
        <li>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 6 9 17l-5-5"/>
          </svg> 
          ${feature}
        </li>
      `)
      .join('');
    
    const buttonClass = isFeatured ? 'btn btn-primary btn-block' : 'btn btn-ghost btn-block';
    
    // Fiyat gösterimi - showPrice kontrolü
    const priceDisplay = product.showPrice !== false
      ? `<div class="price-value">${product.price}₺<span>+KDV</span></div>
         <div class="price-note">${product.duration} geçerli</div>`
      : `<div class="price-value" style="font-size:1rem;color:#7d81a0;">Fiyat için iletişime geçin</div>`;
    
    html += `
      <div class="${cardClass}" style="--i:${index}">
        <div class="price-name">${product.name}</div>
        ${priceDisplay}
        ${product.description ? `<p style="font-size:0.85rem;color:#7d81a0;margin:10px 0;">${product.description}</p>` : ''}
        <ul class="price-features">
          ${featuresList}
        </ul>
        <a href="/iletisim.html" class="${buttonClass}">Teklif Al</a>
      </div>
    `;
  });
  
  html += '</div>';
  
  container.innerHTML = html;
  
  // Animasyonları tetikle (reveal class varsa)
  setTimeout(() => {
    container.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('active');
    });
  }, 100);
}

/**
 * Fiyatlandırma sayfası için özel render
 * Mevcut HTML'e göre uyarlanmış
 */
export function initPricingPage() {
  // Container'ı bul (fiyatlandırma sayfasında grid-3 içindeki kartlar)
  const pricingSection = document.querySelector('.section .grid.grid-3.reveal-stagger');
  
  if (!pricingSection) {
    console.log('Fiyatlandırma bölümü bulunamadı, Firebase entegrasyonu atlandı.');
    return;
  }
  
  // Loading indicator göster
  const loadingHTML = `
    <div style="text-align:center;padding:40px;grid-column:1/-1;">
      <div style="display:inline-block;width:30px;height:30px;border:3px solid rgba(79,70,229,0.2);border-radius:50%;border-top-color:#4f46e5;animation:spin 0.8s linear infinite;"></div>
      <p style="margin-top:16px;color:#7d81a0;">Ürünler yükleniyor...</p>
    </div>
  `;
  
  pricingSection.innerHTML = loadingHTML;
  
  // Ürünleri yükle
  loadProducts((products) => {
    if (products.length > 0) {
      // Firebase'den gelen ürünlerle değiştir
      renderProductCards(products, pricingSection.parentElement);
    } else {
      // Ürün yoksa varsayılan içeriği geri yükle
      console.log('Firebase\'den ürün bulunamadı, varsayılan içerik gösteriliyor.');
      pricingSection.innerHTML = `
        <div style="text-align:center;padding:40px;grid-column:1/-1;">
          <p style="color:#7d81a0;">Ürünler yüklenemedi. Varsayılan fiyatlar gösteriliyor.</p>
        </div>
      `;
    }
  });
}

// Sayfa yüklendiğinde otomatik başlat
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPricingPage);
} else {
  initPricingPage();
}
