/* ============================================================
   ÜRÜN YÖNETİMİ - ADMIN
   ============================================================ */
(function() {
  'use strict';
  
  const db = firebase.database();
  const auth = firebase.auth();
  
  // Auth check
  auth.onAuthStateChanged(user => {
    if (!user) {
      window.location.href = '../giris.html';
      return;
    }
    
    document.getElementById('userEmail').textContent = user.email;
    loadProducts();
  });
  
  // Load products
  function loadProducts() {
    const productsList = document.getElementById('productsList');
    
    db.ref('products').on('value', snapshot => {
      if (!snapshot.exists()) {
        productsList.innerHTML = `
          <div style="text-align:center;padding:40px;color:#7d81a0;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:48px;height:48px;margin-bottom:12px;opacity:0.5;"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            <p>Henüz ürün eklenmemiş.</p>
          </div>
        `;
        return;
      }
      
      const products = [];
      snapshot.forEach(child => {
        products.push({ id: child.key, ...child.val() });
      });
      
      // Sort by createdAt desc
      products.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      
      productsList.innerHTML = products.map(product => renderProductItem(product)).join('');
      
      // Add event listeners
      document.querySelectorAll('.btn-edit-product').forEach(btn => {
        btn.addEventListener('click', () => editProduct(btn.dataset.id));
      });
      
      document.querySelectorAll('.btn-delete-product').forEach(btn => {
        btn.addEventListener('click', () => deleteProduct(btn.dataset.id, btn.dataset.name));
      });
      
      document.querySelectorAll('.btn-toggle-status').forEach(btn => {
        btn.addEventListener('click', () => toggleProductStatus(btn.dataset.id, btn.dataset.status));
      });
    });
  }
  
  function renderProductItem(product) {
    const statusClass = product.status === 'active' ? 'badge-active' : 'badge-inactive';
    const statusText = product.status === 'active' ? 'Aktif' : 'Pasif';
    const itemClass = product.status === 'active' ? '' : 'inactive';
    const popularBadge = product.popular ? '<span class="badge badge-popular">Popüler</span>' : '';
    const priceVisibilityBadge = product.showPrice !== false 
      ? '<span class="badge" style="background:rgba(16,185,129,0.2);color:#10b981;">💰 Fiyat Göster</span>' 
      : '<span class="badge" style="background:rgba(239,68,68,0.2);color:#ef4444;">🚫 Fiyat Gizli</span>';
    
    return `
      <div class="product-item ${itemClass}">
        <div class="product-info">
          <h4>${product.name} ${popularBadge} ${priceVisibilityBadge} <span class="badge ${statusClass}">${statusText}</span></h4>
          <p>${product.description || 'Açıklama yok'}</p>
          <div class="product-meta">
            <span><strong>${parseFloat(product.price || 0).toLocaleString('tr-TR')} ₺</strong></span>
            ${product.priceNote ? `<span>${product.priceNote}</span>` : ''}
            <span style="color:#7d81a0;font-size:0.8rem;">${new Date(product.createdAt).toLocaleDateString('tr-TR')}</span>
          </div>
        </div>
        <div class="product-actions">
          <button class="btn btn-primary btn-icon btn-edit-product" data-id="${product.id}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            Düzenle
          </button>
          <button class="btn btn-ghost btn-icon btn-toggle-status" data-id="${product.id}" data-status="${product.status}">
            ${product.status === 'active' ? '👁️ Pasifleştir' : '✅ Aktifleştir'}
          </button>
          <button class="btn btn-danger btn-icon btn-delete-product" data-id="${product.id}" data-name="${product.name}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            Sil
          </button>
        </div>
      </div>
    `;
  }
  
  // Form submit
  document.getElementById('productForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const productId = document.getElementById('productId').value;
    const isEdit = !!productId;
    
    const productData = {
      name: document.getElementById('productName').value.trim(),
      category: document.getElementById('productCategory').value.trim() || 'PAKET',
      price: parseFloat(document.getElementById('productPrice').value),
      description: document.getElementById('productDescription').value.trim(),
      features: document.getElementById('productFeatures').value.trim(),
      priceNote: document.getElementById('productPriceNote').value.trim(),
      status: document.getElementById('productStatus').value,
      popular: document.getElementById('productPopular').checked,
      showPrice: document.getElementById('productShowPrice').checked,
      updatedAt: new Date().toISOString()
    };
    
    if (!isEdit) {
      productData.createdAt = new Date().toISOString();
    }
    
    const saveBtn = this.querySelector('button[type="submit"]');
    saveBtn.disabled = true;
    saveBtn.innerHTML = '<div style="width:16px;height:16px;border:2px solid rgba(255,255,255,0.3);border-top-color:#fff;border-radius:50%;animation:spin 0.6s linear infinite;margin:0 auto;"></div>';
    
    const ref = isEdit ? db.ref('products/' + productId) : db.ref('products').push();
    
    ref.set(productData)
      .then(() => {
        alert(isEdit ? '✅ Ürün güncellendi!' : '✅ Ürün eklendi!');
        resetForm();
      })
      .catch(error => {
        console.error('Save error:', error);
        alert('❌ Hata: ' + error.message);
      })
      .finally(() => {
        saveBtn.disabled = false;
        saveBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg> Kaydet';
      });
  });
  
  // Edit product
  window.editProduct = function(productId) {
    db.ref('products/' + productId).once('value', snapshot => {
      const product = snapshot.val();
      if (!product) return;
      
      document.getElementById('formTitle').textContent = 'Ürünü Düzenle';
      document.getElementById('productId').value = productId;
      document.getElementById('productName').value = product.name;
      document.getElementById('productCategory').value = product.category || '';
      document.getElementById('productPrice').value = product.price;
      document.getElementById('productDescription').value = product.description || '';
      document.getElementById('productFeatures').value = product.features || '';
      document.getElementById('productPriceNote').value = product.priceNote || '';
      document.getElementById('productStatus').value = product.status || 'active';
      document.getElementById('productPopular').checked = product.popular || false;
      document.getElementById('productShowPrice').checked = product.showPrice !== false; // Default true
      
      // Scroll to form
      document.querySelector('.product-form').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };
  
  // Delete product
  window.deleteProduct = function(productId, productName) {
    if (!confirm(`"${productName}" ürününü silmek istediğinizden emin misiniz?\n\nBu işlem geri alınamaz.`)) {
      return;
    }
    
    db.ref('products/' + productId).remove()
      .then(() => {
        alert('✅ Ürün silindi!');
      })
      .catch(error => {
        console.error('Delete error:', error);
        alert('❌ Silme hatası: ' + error.message);
      });
  };
  
  // Toggle product status
  window.toggleProductStatus = function(productId, currentStatus) {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    
    db.ref('products/' + productId).update({
      status: newStatus,
      updatedAt: new Date().toISOString()
    })
    .then(() => {
      console.log('Status updated:', newStatus);
    })
    .catch(error => {
      console.error('Status update error:', error);
      alert('❌ Durum güncellenemedi: ' + error.message);
    });
  };
  
  // Reset form
  window.resetForm = function() {
    document.getElementById('formTitle').textContent = 'Yeni Ürün Ekle';
    document.getElementById('productForm').reset();
    document.getElementById('productId').value = '';
  };
  
})();
