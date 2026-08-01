import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getDatabase, ref, set, get, update, remove, onValue, push } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js';

// Firebase config'i import et
import { firebaseConfig } from './firebase-config.js';

console.log('Firebase başlatılıyor...');
console.log('Config:', firebaseConfig);

// Firebase'i başlat
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);

console.log('Firebase başlatıldı');

// Google Provider
const googleProvider = new GoogleAuthProvider();

// Global state
let currentUser = null;
let products = {};
let selectedImage = null;

// Admin emails
const ADMIN_EMAILS = [
  'huseyinatas@gmail.com',
  'hüseyinataş@gmail.com',
  '2sthillman@gmail.com',
  'admin@zirveeimza.com'
];

console.log('Auth durumu kontrol ediliyor...');

// Başlangıçta loading göster
document.getElementById('dashboard').style.display = 'none';
document.getElementById('loginScreen').style.display = 'none';

// Auth pending check
const authPending = sessionStorage.getItem('authPending');
if (authPending) {
  console.log('⏳ Auth bekleniyor, sessionStorage temizleniyor...');
  sessionStorage.removeItem('authPending');
}

// Auth state listener
onAuthStateChanged(auth, (user) => {
  console.log('🔥 Auth state changed:', user ? user.email : 'No user');
  console.log('🔥 Auth state - Full user object:', user);
  
  if (user) {
    currentUser = user;
    console.log('✅ Kullanıcı oturum açmış:', user.email);
    console.log('✅ User UID:', user.uid);
    console.log('✅ Email verified:', user.emailVerified);
    console.log('📊 Dashboard gösteriliyor...');
    
    // Login ekranını gizle
    document.getElementById('loginScreen').style.display = 'none';
    
    // Dashboard'ı göster
    const dashboard = document.getElementById('dashboard');
    dashboard.style.display = 'block';
    dashboard.classList.add('active');
    console.log('✅ Dashboard display:', window.getComputedStyle(dashboard).display);
    
    // Kullanıcı bilgilerini göster
    document.getElementById('userEmail').textContent = user.email;
    
    if (user.photoURL) {
      const avatar = document.getElementById('userAvatar');
      avatar.src = user.photoURL;
      avatar.style.display = 'block';
    }
    
    // Verileri yükle
    console.log('📦 Ürünler yükleniyor...');
    loadProducts();
    console.log('📋 Siparişler yükleniyor...');
    loadOrders();
    console.log('🚚 Kuryeler yükleniyor...');
    loadCouriers();
  } else {
    currentUser = null;
    console.log('❌ Kullanıcı oturum açmamış');
    
    // Dashboard'ı gizle
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('dashboard').classList.remove('active');
    
    // Giriş sayfasına yönlendir
    console.log('🔐 Giriş sayfasına yönlendiriliyor...');
    window.location.href = '/site/giris.html';
  }
});

// Google Login
document.getElementById('googleLoginBtn')?.addEventListener('click', async () => {
  const btnText = document.getElementById('googleBtnText');
  const messageDiv = document.getElementById('loginMessage');
  
  btnText.innerHTML = '<div class="loading"></div>';
  messageDiv.innerHTML = '';
  
  try {
    await signInWithPopup(auth, googleProvider);
    showMessage(messageDiv, 'Google ile giriş başarılı!', 'success');
  } catch (error) {
    console.error('Google login error:', error);
    let errorMessage = 'Google ile giriş başarısız!';
    
    if (error.code === 'auth/popup-closed-by-user') {
      errorMessage = 'Giriş penceresi kapatıldı.';
    } else if (error.code === 'auth/popup-blocked') {
      errorMessage = 'Pop-up engellendi. Lütfen tarayıcı ayarlarınızı kontrol edin.';
    }
    
    showMessage(messageDiv, errorMessage, 'error');
    btnText.textContent = 'Google ile Devam Et';
  }
});

// Email/Password Login
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const btnText = document.getElementById('loginBtnText');
  const messageDiv = document.getElementById('loginMessage');
  
  btnText.innerHTML = '<div class="loading"></div>';
  messageDiv.innerHTML = '';
  
  try {
    await signInWithEmailAndPassword(auth, email, password);
    showMessage(messageDiv, 'Giriş başarılı! Yönlendiriliyorsunuz...', 'success');
  } catch (error) {
    console.error('Login error:', error);
    let errorMessage = 'Giriş başarısız!';
    
    if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
      errorMessage = 'E-posta veya şifre hatalı!';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Geçersiz e-posta adresi!';
    } else if (error.code === 'auth/too-many-requests') {
      errorMessage = 'Çok fazla başarısız deneme. Lütfen daha sonra tekrar deneyin.';
    } else if (error.code === 'auth/invalid-credential') {
      errorMessage = 'Geçersiz e-posta veya şifre!';
    }
    
    showMessage(messageDiv, errorMessage, 'error');
    btnText.textContent = 'E-posta ile Giriş';
  }
});

// Logout
window.logout = async () => {
  if (confirm('Çıkış yapmak istediğinize emin misiniz?')) {
    await signOut(auth);
  }
};

// Show/Hide screens
function showLogin() {
  console.log('👉 showLogin() çağrıldı');
  const loginScreen = document.getElementById('loginScreen');
  const dashboard = document.getElementById('dashboard');
  
  console.log('loginScreen element:', loginScreen);
  console.log('dashboard element:', dashboard);
  
  loginScreen.style.display = 'flex';
  dashboard.classList.remove('active');
  console.log('✅ Giriş ekranı gösterildi');
}

function showDashboard() {
  console.log('👉 showDashboard() çağrıldı');
  const loginScreen = document.getElementById('loginScreen');
  const dashboard = document.getElementById('dashboard');
  
  console.log('loginScreen element:', loginScreen);
  console.log('dashboard element:', dashboard);
  
  loginScreen.style.display = 'none';
  dashboard.classList.add('active');
  
  console.log('Dashboard classList:', dashboard.classList);
  console.log('Dashboard display:', window.getComputedStyle(dashboard).display);
  
  // Kullanıcı bilgilerini göster
  document.getElementById('userEmail').textContent = currentUser.email;
  
  if (currentUser.photoURL) {
    const avatar = document.getElementById('userAvatar');
    avatar.src = currentUser.photoURL;
    avatar.style.display = 'block';
  }
  
  console.log('✅ Dashboard gösterildi');
}

// Load products
function loadProducts() {
  console.log('📦 Ürünler yükleniyor...');
  const productsRef = ref(database, 'products');
  
  onValue(productsRef, (snapshot) => {
    console.log('📦 Firebase products snapshot:', snapshot.val());
    products = snapshot.val() || {};
    console.log('📦 Products:', Object.keys(products).length, 'ürün');
    renderProducts();
    updateStats();
  }, (error) => {
    console.error('❌ Products yükleme hatası:', error);
  });
}

// Render products
function renderProducts() {
  const container = document.getElementById('productsContainer');
  
  if (Object.keys(products).length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:40px;color:var(--text-muted);">
        <p>Henüz ürün eklenmemiş.</p>
        <button class="btn btn-primary" onclick="openAddProductModal()" style="margin-top:16px;">İlk Ürünü Ekle</button>
      </div>
    `;
    return;
  }
  
  const productsArray = Object.entries(products).map(([id, data]) => ({ id, ...data }));
  
  let html = '<div class="products-grid">';
  
  productsArray.forEach(product => {
    const statusBadge = product.status === 'active' 
      ? '<span class="badge badge-success">Aktif</span>' 
      : '<span class="badge badge-warning">Pasif</span>';
    
    const imageHTML = product.imageUrl 
      ? `<img src="${product.imageUrl}" alt="${product.name}">`
      : '<div style="font-size:2rem;opacity:0.3;">IMG</div>';
    
    const featuresList = (product.features || [])
      .slice(0, 3)
      .map(f => `<li>${f}</li>`)
      .join('');
    
    html += `
      <div class="product-card">
        <div class="product-image">${imageHTML}</div>
        <div class="product-name">${product.name}</div>
        <div class="product-price">${product.price}₺ <span style="font-size:0.7rem;color:var(--text-muted);">+KDV</span></div>
        <div class="product-meta">
          <span>⏱ ${product.duration}</span>
          <span>${statusBadge}</span>
        </div>
        ${product.description ? `<p style="font-size:0.85rem;color:var(--text-muted);margin:4px 0;">${product.description}</p>` : ''}
        ${featuresList ? `<ul class="product-features">${featuresList}</ul>` : ''}
        <div class="product-actions">
          <button class="btn btn-secondary" onclick="editProduct('${product.id}')">Düzenle</button>
          <button class="btn btn-danger" onclick="deleteProduct('${product.id}', '${product.name}')">Sil</button>
        </div>
      </div>
    `;
  });
  
  html += '</div>';
  container.innerHTML = html;
}

// Update statistics
function updateStats() {
  const productsArray = Object.values(products);
  const total = productsArray.length;
  const active = productsArray.filter(p => p.status === 'active').length;
  const revenue = productsArray.reduce((sum, p) => sum + (parseFloat(p.price) || 0), 0);
  
  document.getElementById('totalProducts').textContent = total;
  document.getElementById('activeProducts').textContent = active;
  document.getElementById('totalRevenue').textContent = revenue.toLocaleString('tr-TR') + '₺';
  document.getElementById('lastUpdate').textContent = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
}

// Image Preview
document.getElementById('productImage')?.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  
  // Max 5MB
  if (file.size > 5 * 1024 * 1024) {
    alert('Görsel boyutu çok büyük! Maksimum 5MB olmalıdır.');
    e.target.value = '';
    return;
  }
  
  selectedImage = file;
  
  const reader = new FileReader();
  reader.onload = (e) => {
    const preview = document.getElementById('imagePreview');
    preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
    preview.classList.add('has-image');
  };
  reader.readAsDataURL(file);
});

// Upload Image to Storage
async function uploadProductImage(file, productId) {
  if (!file) return null;
  
  try {
    const imageRef = storageRef(storage, `products/${productId}/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(imageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Image upload error:', error);
    throw error;
  }
}

// Delete Image from Storage
async function deleteProductImage(imageUrl) {
  if (!imageUrl || !imageUrl.includes('firebase')) return;
  
  try {
    const imageRef = storageRef(storage, imageUrl);
    await deleteObject(imageRef);
  } catch (error) {
    console.error('Image delete error:', error);
  }
}

// Open add product modal
window.openAddProductModal = () => {
  document.getElementById('modalTitle').textContent = 'Yeni Ürün Ekle';
  document.getElementById('productForm').reset();
  document.getElementById('productId').value = '';
  document.getElementById('productImageUrl').value = '';
  document.getElementById('modalMessage').innerHTML = '';
  
  const preview = document.getElementById('imagePreview');
  preview.innerHTML = `
    <div class="image-placeholder">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
      <div>Görsel seçin</div>
    </div>
  `;
  preview.classList.remove('has-image');
  selectedImage = null;
  
  document.getElementById('productModal').classList.add('active');
};

// Open edit product modal
window.editProduct = (productId) => {
  const product = products[productId];
  if (!product) return;
  
  document.getElementById('modalTitle').textContent = 'Ürünü Düzenle';
  document.getElementById('productId').value = productId;
  document.getElementById('productName').value = product.name;
  document.getElementById('productPrice').value = product.price;
  document.getElementById('productDuration').value = product.duration;
  document.getElementById('productDescription').value = product.description || '';
  document.getElementById('productFeatures').value = (product.features || []).join('\n');
  document.getElementById('productStatus').value = product.status;
  document.getElementById('productImageUrl').value = product.imageUrl || '';
  document.getElementById('modalMessage').innerHTML = '';
  
  const preview = document.getElementById('imagePreview');
  if (product.imageUrl) {
    preview.innerHTML = `<img src="${product.imageUrl}" alt="${product.name}">`;
    preview.classList.add('has-image');
  } else {
    preview.innerHTML = `
      <div class="image-placeholder">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
        <div>Görsel seçin</div>
      </div>
    `;
    preview.classList.remove('has-image');
  }
  
  selectedImage = null;
  document.getElementById('productModal').classList.add('active');
};

// Close product modal
window.closeProductModal = () => {
  document.getElementById('productModal').classList.remove('active');
  document.getElementById('productForm').reset();
  selectedImage = null;
};

// Save product
document.getElementById('productForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const productId = document.getElementById('productId').value;
  const name = document.getElementById('productName').value.trim();
  const price = parseFloat(document.getElementById('productPrice').value);
  const duration = document.getElementById('productDuration').value.trim();
  const description = document.getElementById('productDescription').value.trim();
  const features = document.getElementById('productFeatures').value
    .split('\n')
    .map(f => f.trim())
    .filter(f => f.length > 0);
  const status = document.getElementById('productStatus').value;
  const oldImageUrl = document.getElementById('productImageUrl').value;
  
  const btnText = document.getElementById('saveBtnText');
  const messageDiv = document.getElementById('modalMessage');
  
  btnText.innerHTML = '<div class="loading"></div>';
  messageDiv.innerHTML = '';
  
  try {
    let imageUrl = oldImageUrl;
    
    // Yeni görsel yüklenmişse
    if (selectedImage) {
      const tempId = productId || `temp_${Date.now()}`;
      imageUrl = await uploadProductImage(selectedImage, tempId);
      
      // Eski görseli sil
      if (oldImageUrl) {
        await deleteProductImage(oldImageUrl);
      }
    }
    
    const productData = {
      name,
      price,
      duration,
      description,
      features,
      status,
      imageUrl: imageUrl || '',
      updatedAt: new Date().toISOString()
    };
    
    if (productId) {
      // Update existing product
      const productRef = ref(database, `products/${productId}`);
      await update(productRef, productData);
      showMessage(messageDiv, 'Ürün başarıyla güncellendi!', 'success');
    } else {
      // Add new product
      const productsRef = ref(database, 'products');
      const newProductRef = push(productsRef);
      await set(newProductRef, {
        ...productData,
        createdAt: new Date().toISOString()
      });
      showMessage(messageDiv, 'Ürün başarıyla eklendi!', 'success');
    }
    
    selectedImage = null;
    
    setTimeout(() => {
      closeProductModal();
    }, 1500);
    
  } catch (error) {
    console.error('Save error:', error);
    showMessage(messageDiv, 'Bir hata oluştu: ' + error.message, 'error');
  } finally {
    btnText.textContent = 'Kaydet';
  }
});

// Delete product
window.deleteProduct = async (productId, productName) => {
  if (!confirm(`"${productName}" ürününü silmek istediğinize emin misiniz?\n\nBu işlem geri alınamaz!`)) {
    return;
  }
  
  try {
    const product = products[productId];
    
    // Görseli sil
    if (product.imageUrl) {
      await deleteProductImage(product.imageUrl);
    }
    
    // Ürünü sil
    const productRef = ref(database, `products/${productId}`);
    await remove(productRef);
    
    alert('Ürün başarıyla silindi!');
  } catch (error) {
    console.error('Delete error:', error);
    alert('Silme işlemi başarısız: ' + error.message);
  }
};

// Helper: Show message
function showMessage(container, message, type) {
  const className = type === 'success' ? 'alert-success' : 'alert-error';
  container.innerHTML = `<div class="alert ${className}">${message}</div>`;
}

// İlk admin kullanıcısını oluştur (sadece bir kez çalışacak)
async function createInitialAdmin() {
  const adminEmail = 'hüseyinataş@gmail.com';
  const adminPassword = 'hüseyinataş1234';
  
  try {
    await createUserWithEmailAndPassword(auth, adminEmail, adminPassword);
    console.log('Admin kullanıcı oluşturuldu:', adminEmail);
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('Admin kullanıcı zaten mevcut');
    } else {
      console.error('Admin oluşturma hatası:', error);
    }
  }
}

// Sayfa yüklendiğinde admin kullanıcısını oluştur
// Not: Bu sadece ilk defa çalıştırılmalı, sonra yoruma alınabilir
// createInitialAdmin();


// ==================== ORDERS MANAGEMENT ====================

// Generate tracking code
function generateTrackingCode() {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 9000) + 1000;
  return `ZE-${year}-${random}`;
}

// Create new order
window.createOrder = async (orderData) => {
  try {
    const trackingCode = generateTrackingCode();
    const orderRef = ref(database, `orders/${trackingCode}`);
    
    const order = {
      ...orderData,
      id: trackingCode,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      history: [{
        status: 'Sipariş Alındı',
        timestamp: new Date().toISOString(),
        note: 'Sipariş sistemimize kaydedildi.'
      }]
    };
    
    await set(orderRef, order);
    return trackingCode;
  } catch (error) {
    console.error('Create order error:', error);
    throw error;
  }
};

// Update order status
window.updateOrderStatus = async (trackingCode, newStatus, note = '', courierData = null) => {
  try {
    const orderRef = ref(database, `orders/${trackingCode}`);
    const snapshot = await get(orderRef);
    
    if (!snapshot.exists()) {
      throw new Error('Sipariş bulunamadı');
    }
    
    const order = snapshot.val();
    const history = order.history || [];
    
    const statusTexts = {
      pending: 'Sipariş Alındı',
      confirmed: 'Sipariş Onaylandı',
      preparing: 'Hazırlanıyor',
      ready: 'Teslimata Hazır',
      shipped: 'Yola Çıktı',
      delivered: 'Teslim Edildi',
      cancelled: 'İptal Edildi'
    };
    
    history.push({
      status: statusTexts[newStatus] || newStatus,
      timestamp: new Date().toISOString(),
      note: note || ''
    });
    
    const updates = {
      status: newStatus,
      updatedAt: new Date().toISOString(),
      history
    };
    
    if (courierData && newStatus === 'shipped') {
      updates.courier = courierData;
    }
    
    await update(orderRef, updates);
    return true;
  } catch (error) {
    console.error('Update order status error:', error);
    throw error;
  }
};

// Load orders
window.loadOrders = () => {
  const ordersRef = ref(database, 'orders');
  
  onValue(ordersRef, (snapshot) => {
    const ordersData = snapshot.val() || {};
    window.allOrders = ordersData;
    if (typeof renderOrders === 'function') {
      renderOrders(ordersData);
    }
  });
};

// Assign courier to order
window.assignCourier = async (trackingCode, courierEmail) => {
  try {
    // Get courier info
    const courierRef = ref(database, `couriers/${courierEmail.replace(/[.@]/g, '_')}`);
    const courierSnap = await get(courierRef);
    
    if (!courierSnap.exists()) {
      throw new Error('Kurye bulunamadı');
    }
    
    const courier = courierSnap.val();
    
    await updateOrderStatus(trackingCode, 'shipped', 'Kurye atandı ve teslimat başladı.', {
      email: courierEmail,
      name: courier.name,
      phone: courier.phone
    });
    
    // Add order to courier's active orders
    const courierOrderRef = ref(database, `couriers/${courierEmail.replace(/[.@]/g, '_')}/activeOrders/${trackingCode}`);
    await set(courierOrderRef, {
      trackingCode,
      assignedAt: new Date().toISOString()
    });
    
    return true;
  } catch (error) {
    console.error('Assign courier error:', error);
    throw error;
  }
};


// Render orders
function renderOrders(ordersData) {
  const container = document.getElementById('ordersContainer');
  
  if (!ordersData || Object.keys(ordersData).length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:40px;color:var(--text-muted);">
        <p>Henüz sipariş yok.</p>
        <button class="btn btn-primary" onclick="openAddOrderModal()" style="margin-top:16px;">İlk Siparişi Oluştur</button>
      </div>
    `;
    return;
  }
  
  const ordersArray = Object.entries(ordersData).map(([id, data]) => ({ id, ...data }));
  ordersArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  const statusBadges = {
    pending: { text: 'Bekliyor', class: 'badge-warning', bg: 'rgba(245,158,11,0.2)', color: '#fbbf24' },
    confirmed: { text: 'Onaylandı', class: 'badge-success', bg: 'rgba(59,130,246,0.2)', color: '#60a5fa' },
    preparing: { text: 'Hazırlanıyor', class: 'badge-warning', bg: 'rgba(245,158,11,0.2)', color: '#fbbf24' },
    ready: { text: 'Hazır', class: 'badge-success', bg: 'rgba(34,197,94,0.2)', color: '#4ade80' },
    shipped: { text: 'Yolda', class: 'badge-primary', bg: 'rgba(139,92,246,0.2)', color: '#a78bfa' },
    delivered: { text: 'Teslim Edildi', class: 'badge-success', bg: 'rgba(34,197,94,0.2)', color: '#4ade80' },
    cancelled: { text: 'İptal', class: 'badge-danger', bg: 'rgba(244,63,94,0.2)', color: '#fb7185' }
  };
  
  let html = `
    <div style="margin-bottom:24px;padding:20px;background:var(--surface);border:1px solid var(--border);border-radius:12px;">
      <div id="adminLocationStatus" style="display:flex;align-items:center;gap:10px;margin-bottom:16px;padding:12px;background:rgba(255,255,255,0.03);border-radius:8px;">
        <div id="adminLocationDot" style="width:12px;height:12px;border-radius:50%;background:var(--text-muted);"></div>
        <span id="adminLocationText" style="font-size:0.9rem;color:var(--text-muted);">Konum Paylaşımı Kapalı</span>
      </div>
      <button id="adminStartDeliveryBtn" class="start-delivery-btn">
        <div class="progress"></div>
        <div class="text">Yola Çıkıyorum (Basılı Tut)</div>
      </button>
    </div>
  `;
  
  html += '<div style="overflow-x:auto;"><table style="width:100%;border-collapse:collapse;">';
  html += `
    <thead>
      <tr style="border-bottom:1px solid var(--border);">
        <th style="padding:12px;text-align:left;color:var(--text-muted);font-size:0.9rem;">Takip Kodu</th>
        <th style="padding:12px;text-align:left;color:var(--text-muted);font-size:0.9rem;">Müşteri</th>
        <th style="padding:12px;text-align:left;color:var(--text-muted);font-size:0.9rem;">Ürün</th>
        <th style="padding:12px;text-align:left;color:var(--text-muted);font-size:0.9rem;">Durum</th>
        <th style="padding:12px;text-align:left;color:var(--text-muted);font-size:0.9rem;">Tarih</th>
        <th style="padding:12px;text-align:left;color:var(--text-muted);font-size:0.9rem;">İşlemler</th>
      </tr>
    </thead>
    <tbody>
  `;
  
  ordersArray.forEach(order => {
    const status = statusBadges[order.status] || statusBadges.pending;
    const date = new Date(order.createdAt).toLocaleDateString('tr-TR');
    
    html += `
      <tr style="border-bottom:1px solid var(--border);">
        <td style="padding:12px;"><strong style="color:var(--primary);">${order.id}</strong></td>
        <td style="padding:12px;">${order.customerName}<br><small style="color:var(--text-muted);">${order.customerPhone}</small></td>
        <td style="padding:12px;">${order.productName}</td>
        <td style="padding:12px;"><span style="background:${status.bg};color:${status.color};padding:4px 12px;border-radius:999px;font-size:0.85rem;">${status.text}</span></td>
        <td style="padding:12px;">${date}</td>
        <td style="padding:12px;">
          <button class="btn btn-secondary" style="padding:6px 12px;font-size:0.85rem;margin-right:4px;" onclick="viewOrderDetails('${order.id}')">Detay</button>
          ${order.status !== 'delivered' && order.status !== 'cancelled' ? 
            `<button class="btn btn-primary" style="padding:6px 12px;font-size:0.85rem;" onclick="updateOrderModal('${order.id}')">Güncelle</button>` : ''}
        </td>
      </tr>
    `;
  });
  
  html += '</tbody></table></div>';
  container.innerHTML = html;
  
  // Re-attach event listeners after rendering
  setTimeout(initAdminDeliveryButton, 100);
}

// View order details
window.viewOrderDetails = async (trackingCode) => {
  const orderRef = ref(database, `orders/${trackingCode}`);
  const snapshot = await get(orderRef);
  
  if (!snapshot.exists()) {
    alert('Sipariş bulunamadı!');
    return;
  }
  
  const order = snapshot.val();
  
  // Open tracking page in new tab
  window.open(`/site/takip.html?kod=${trackingCode}`, '_blank');
};

// Update order modal
window.updateOrderModal = async (trackingCode) => {
  const orderRef = ref(database, `orders/${trackingCode}`);
  const snapshot = await get(orderRef);
  
  if (!snapshot.exists()) {
    alert('Sipariş bulunamadı!');
    return;
  }
  
  const order = snapshot.val();
  
  const newStatus = prompt(`Sipariş durumunu güncelleyin:\n\nMevcut: ${order.status}\n\nYeni durum seçenekleri:\n- confirmed (Onaylandı)\n- preparing (Hazırlanıyor)\n- ready (Hazır)\n- shipped (Yolda)\n- delivered (Teslim Edildi)\n- cancelled (İptal)\n\nYeni durum:`, order.status);
  
  if (!newStatus) return;
  
  const validStatuses = ['confirmed', 'preparing', 'ready', 'shipped', 'delivered', 'cancelled'];
  if (!validStatuses.includes(newStatus)) {
    alert('Geçersiz durum!');
    return;
  }
  
  if (newStatus === 'shipped') {
    const courierEmail = prompt('Kurye e-postasını girin:\n(Kurye sistemde kayıtlı olmalıdır)');
    if (courierEmail) {
      try {
        await assignCourier(trackingCode, courierEmail);
        alert('Kurye atandı ve sipariş yola çıktı!');
      } catch (error) {
        alert('Hata: ' + error.message);
      }
    }
  } else {
    const note = prompt('Not eklemek ister misiniz? (İsteğe bağlı)');
    try {
      await updateOrderStatus(trackingCode, newStatus, note || '');
      alert('Sipariş durumu güncellendi!');
    } catch (error) {
      alert('Hata: ' + error.message);
    }
  }
};

// Tab switching
window.switchTab = (tabName) => {
  // Hide all tabs
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.style.display = 'none';
  });
  
  // Remove active from all buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Show selected tab
  document.getElementById(tabName + 'Tab').style.display = 'block';
  
  // Add active to clicked button
  event.target.classList.add('active');
  
  // Load data for tab
  if (tabName === 'orders') {
    loadOrders();
  } else if (tabName === 'couriers') {
    loadCouriers();
  }
};

// Load couriers
window.loadCouriers = () => {
  const couriersRef = ref(database, 'couriers');
  
  onValue(couriersRef, (snapshot) => {
    const couriersData = snapshot.val() || {};
    renderCouriers(couriersData);
  });
};

// Render couriers
function renderCouriers(couriersData) {
  const container = document.getElementById('couriersContainer');
  
  if (!couriersData || Object.keys(couriersData).length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:40px;color:var(--text-muted);">
        <p>Henüz kurye eklenmemiş.</p>
        <button class="btn btn-primary" onclick="openAddCourierModal()" style="margin-top:16px;">İlk Kuryeyi Ekle</button>
      </div>
    `;
    return;
  }
  
  const couriersArray = Object.entries(couriersData).map(([id, data]) => ({ id, ...data }));
  
  let html = '<div style="display:grid;gap:20px;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));">';
  
  couriersArray.forEach(courier => {
    const isActive = courier.location ? true : false;
    const activeOrders = courier.activeOrders ? Object.keys(courier.activeOrders).length : 0;
    
    html += `
      <div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
          <div style="width:50px;height:50px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--secondary));display:flex;align-items:center;justify-content:center;font-size:1.5rem;font-weight:700;">
            ${courier.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 style="font-size:1.1rem;margin-bottom:4px;">${courier.name}</h3>
            <p style="font-size:0.85rem;color:var(--text-muted);">${courier.email}</p>
          </div>
        </div>
        <div style="font-size:0.9rem;color:var(--text-muted);margin-bottom:12px;">
          ${courier.phone}<br>
          Aktif Teslimat: ${activeOrders}<br>
          ${isActive ? 
            '<span style="color:var(--success);">Konum Aktif</span>' : 
            '<span style="color:var(--text-muted);">Konum Pasif</span>'}
        </div>
        <button class="btn btn-danger" style="width:100%;padding:8px;font-size:0.85rem;" onclick="deleteCourier('${courier.id}', '${courier.name}')">Sil</button>
      </div>
    `;
  });
  
  html += '</div>';
  container.innerHTML = html;
}

// Add courier modal
window.openAddCourierModal = () => {
  const name = prompt('Kurye adı:');
  if (!name) return;
  
  const email = prompt('Kurye e-postası:\n(Giriş için kullanılacak)');
  if (!email || !email.includes('@')) {
    alert('Geçerli bir e-posta adresi girin!');
    return;
  }
  
  const phone = prompt('Telefon numarası:');
  if (!phone) return;
  
  const password = prompt('Şifre:\n(Minimum 6 karakter)');
  if (!password || password.length < 6) {
    alert('Şifre en az 6 karakter olmalıdır!');
    return;
  }
  
  addCourier(name, email, phone, password);
};

// Add courier
async function addCourier(name, email, phone, password) {
  try {
    // Create auth user
    await createUserWithEmailAndPassword(auth, email, password);
    
    // Add to database
    const courierRef = ref(database, `couriers/${email.replace(/[.@]/g, '_')}`);
    await set(courierRef, {
      name,
      email,
      phone,
      createdAt: new Date().toISOString(),
      activeOrders: {}
    });
    
    alert('Kurye başarıyla eklendi!\n\nGiriş Bilgileri:\nE-posta: ' + email + '\nŞifre: ' + password);
  } catch (error) {
    console.error('Add courier error:', error);
    if (error.code === 'auth/email-already-in-use') {
      alert('Bu e-posta adresi zaten kullanımda!');
    } else {
      alert('Hata: ' + error.message);
    }
  }
}

// Delete courier
window.deleteCourier = async (courierId, courierName) => {
  if (!confirm(`${courierName} kuryesini silmek istediğinize emin misiniz?`)) {
    return;
  }
  
  try {
    const courierRef = ref(database, `couriers/${courierId}`);
    await remove(courierRef);
    alert('Kurye silindi!');
  } catch (error) {
    console.error('Delete courier error:', error);
    alert('Hata: ' + error.message);
  }
};

// Add order modal
window.openAddOrderModal = () => {
  const customerName = prompt('Müşteri adı:');
  if (!customerName) return;
  
  const customerPhone = prompt('Müşteri telefonu:');
  if (!customerPhone) return;
  
  const customerEmail = prompt('Müşteri e-postası:');
  if (!customerEmail) return;
  
  const productName = prompt('Ürün adı:');
  if (!productName) return;
  
  const address = prompt('Teslimat adresi:');
  if (!address) return;
  
  const latitude = prompt('Enlem (latitude):');
  const longitude = prompt('Boylam (longitude):');
  
  const orderData = {
    customerName,
    customerPhone,
    customerEmail,
    productName,
    address,
    latitude: parseFloat(latitude) || 41.0082,
    longitude: parseFloat(longitude) || 28.9784
  };
  
  createOrder(orderData).then(trackingCode => {
    alert(`Sipariş oluşturuldu!\n\nTakip Kodu: ${trackingCode}\n\nMüşteriye bu kodu gönderin.`);
  }).catch(error => {
    alert('Hata: ' + error.message);
  });
};

// Initialize orders and couriers loading - removed, now called from onAuthStateChanged


// ==================== MODAL FUNCTIONS ====================

// Order Modal
window.openAddOrderModal = () => {
  const modal = document.getElementById('orderModal');
  const productSelect = document.getElementById('orderProduct');
  
  // Ürünleri dropdown'a ekle
  productSelect.innerHTML = '<option value="">Ürün seçin</option>';
  Object.values(products).forEach(product => {
    if (product.status === 'active') {
      productSelect.innerHTML += `<option value="${product.name}">${product.name} - ${product.price}₺</option>`;
    }
  });
  
  document.getElementById('orderForm').reset();
  document.getElementById('orderModalMessage').innerHTML = '';
  modal.classList.add('active');
};

window.closeOrderModal = () => {
  document.getElementById('orderModal').classList.remove('active');
};

// Order Form Submit
document.getElementById('orderForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const btnText = document.getElementById('orderSaveBtnText');
  const messageDiv = document.getElementById('orderModalMessage');
  
  btnText.innerHTML = '<div class="loading"></div>';
  messageDiv.innerHTML = '';
  
  const orderData = {
    customerName: document.getElementById('orderCustomerName').value.trim(),
    customerPhone: document.getElementById('orderCustomerPhone').value.trim(),
    customerEmail: document.getElementById('orderCustomerEmail').value.trim(),
    productName: document.getElementById('orderProduct').value,
    address: document.getElementById('orderAddress').value.trim(),
    latitude: parseFloat(document.getElementById('orderLatitude').value) || 41.0082,
    longitude: parseFloat(document.getElementById('orderLongitude').value) || 28.9784
  };
  
  try {
    const trackingCode = await createOrder(orderData);
    messageDiv.innerHTML = `<div class="alert alert-success">Sipariş oluşturuldu!<br><strong>Takip Kodu: ${trackingCode}</strong><br>Bu kodu müşteriye gönderin.</div>`;
    
    setTimeout(() => {
      closeOrderModal();
      switchTab('orders');
    }, 3000);
  } catch (error) {
    console.error('Order creation error:', error);
    messageDiv.innerHTML = `<div class="alert alert-error">Hata: ${error.message}</div>`;
  } finally {
    btnText.textContent = 'Sipariş Oluştur';
  }
});

// Update Order Modal
window.openUpdateOrderModal = async (trackingCode) => {
  const modal = document.getElementById('updateOrderModal');
  const orderRef = ref(database, `orders/${trackingCode}`);
  const snapshot = await get(orderRef);
  
  if (!snapshot.exists()) {
    alert('Sipariş bulunamadı!');
    return;
  }
  
  const order = snapshot.val();
  
  document.getElementById('updateOrderId').value = trackingCode;
  document.getElementById('updateOrderCode').value = trackingCode;
  document.getElementById('updateOrderStatus').value = order.status;
  document.getElementById('updateOrderNote').value = '';
  document.getElementById('updateOrderMessage').innerHTML = '';
  
  modal.classList.add('active');
};

window.closeUpdateOrderModal = () => {
  document.getElementById('updateOrderModal').classList.remove('active');
};

// Update Order Form Submit
document.getElementById('updateOrderForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const trackingCode = document.getElementById('updateOrderId').value;
  const newStatus = document.getElementById('updateOrderStatus').value;
  const note = document.getElementById('updateOrderNote').value.trim();
  const btnText = document.getElementById('updateOrderBtnText');
  const messageDiv = document.getElementById('updateOrderMessage');
  
  btnText.innerHTML = '<div class="loading"></div>';
  messageDiv.innerHTML = '';
  
  try {
    await updateOrderStatus(trackingCode, newStatus, note);
    
    messageDiv.innerHTML = '<div class="alert alert-success">Sipariş durumu güncellendi!</div>';
    
    setTimeout(() => {
      closeUpdateOrderModal();
    }, 1500);
    
  } catch (error) {
    console.error('Update error:', error);
    messageDiv.innerHTML = `<div class="alert alert-error">Hata: ${error.message}</div>`;
  } finally {
    btnText.textContent = 'Güncelle';
  }
});

// Courier Modal
window.openAddCourierModal = () => {
  const modal = document.getElementById('courierModal');
  document.getElementById('courierForm').reset();
  document.getElementById('courierModalMessage').innerHTML = '';
  modal.classList.add('active');
};

window.closeCourierModal = () => {
  document.getElementById('courierModal').classList.remove('active');
};

// Courier Form Submit
document.getElementById('courierForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const name = document.getElementById('courierName').value.trim();
  const email = document.getElementById('courierEmail').value.trim();
  const phone = document.getElementById('courierPhone').value.trim();
  const password = document.getElementById('courierPassword').value;
  
  const btnText = document.getElementById('courierSaveBtnText');
  const messageDiv = document.getElementById('courierModalMessage');
  
  btnText.innerHTML = '<div class="loading"></div>';
  messageDiv.innerHTML = '';
  
  try {
    // Create auth user
    await createUserWithEmailAndPassword(auth, email, password);
    
    // Add to database
    const courierRef = ref(database, `couriers/${email.replace(/[.@]/g, '_')}`);
    await set(courierRef, {
      name,
      email,
      phone,
      createdAt: new Date().toISOString(),
      activeOrders: {}
    });
    
    messageDiv.innerHTML = `<div class="alert alert-success">Kurye eklendi!<br><strong>Email:</strong> ${email}<br><strong>Şifre:</strong> ${password}</div>`;
    
    setTimeout(() => {
      closeCourierModal();
    }, 3000);
    
  } catch (error) {
    console.error('Courier creation error:', error);
    let errorMsg = error.message;
    if (error.code === 'auth/email-already-in-use') {
      errorMsg = 'Bu e-posta adresi zaten kullanımda!';
    }
    messageDiv.innerHTML = `<div class="alert alert-error">Hata: ${errorMsg}</div>`;
  } finally {
    btnText.textContent = 'Kurye Ekle';
  }
});

// Update renderOrders to use modal
window.updateOrderModal = (trackingCode) => {
  openUpdateOrderModal(trackingCode);
};

console.log('Tüm modal fonksiyonları yüklendi');


// ==================== ADMIN DELIVERY SYSTEM ====================

let adminWatchId = null;
let adminWakeLock = null;
let adminLocationInterval = null;
let isAdminTracking = false;

let adminHoldTimer = null;
let adminHoldProgress = 0;

function initAdminDeliveryButton() {
  const adminStartBtn = document.getElementById('adminStartDeliveryBtn');
  if (!adminStartBtn) return;
  
  const adminProgress = adminStartBtn.querySelector('.progress');
  const adminBtnText = adminStartBtn.querySelector('.text');
  
  // Remove old listeners
  adminStartBtn.replaceWith(adminStartBtn.cloneNode(true));
  const newBtn = document.getElementById('adminStartDeliveryBtn');
  const newProgress = newBtn.querySelector('.progress');
  const newBtnText = newBtn.querySelector('.text');
  
  newBtn.addEventListener('mousedown', (e) => startAdminHolding(e, newBtn, newProgress, newBtnText));
  newBtn.addEventListener('touchstart', (e) => startAdminHolding(e, newBtn, newProgress, newBtnText));
  newBtn.addEventListener('mouseup', (e) => stopAdminHolding(e, newProgress));
  newBtn.addEventListener('mouseleave', (e) => stopAdminHolding(e, newProgress));
  newBtn.addEventListener('touchend', (e) => stopAdminHolding(e, newProgress));
  newBtn.addEventListener('touchcancel', (e) => stopAdminHolding(e, newProgress));
  
  // Restore state if tracking
  if (isAdminTracking) {
    newBtn.classList.add('tracking');
    newBtnText.textContent = 'Konum Paylaşılıyor (Durdurmak için bas)';
    newProgress.style.width = '100%';
  }
}

function startAdminHolding(e, btn, progress, btnText) {
  e.preventDefault();
  
  if (isAdminTracking) {
    stopAdminLocationTracking();
    return;
  }
  
  adminHoldProgress = 0;
  adminHoldTimer = setInterval(() => {
    adminHoldProgress += 2;
    progress.style.width = adminHoldProgress + '%';
    
    if (adminHoldProgress >= 100) {
      clearInterval(adminHoldTimer);
      activateAdminTracking(btn, btnText, progress);
    }
  }, 20);
}

function stopAdminHolding(e, progress) {
  if (adminHoldTimer) {
    clearInterval(adminHoldTimer);
    adminHoldTimer = null;
  }
  
  if (!isAdminTracking) {
    progress.style.width = '0%';
  }
}

async function activateAdminTracking(btn, btnText, progress) {
  isAdminTracking = true;
  btn.classList.add('tracking');
  btnText.textContent = 'Konum Paylaşılıyor (Durdurmak için bas)';
  progress.style.width = '100%';
  
  updateAdminLocationUI();
  await startAdminLocationTracking(currentUser.email);
}

function updateAdminLocationUI() {
  const statusDiv = document.getElementById('adminLocationStatus');
  const dot = document.getElementById('adminLocationDot');
  const text = document.getElementById('adminLocationText');
  
  if (!statusDiv || !dot || !text) return;
  
  if (isAdminTracking) {
    statusDiv.style.borderColor = 'var(--success)';
    statusDiv.style.background = 'rgba(34, 197, 94, 0.1)';
    dot.style.background = 'var(--success)';
    dot.style.animation = 'pulse 2s ease-in-out infinite';
    text.textContent = 'Konum Paylaşımı Aktif - Müşteriler konumunuzu görebilir';
    text.style.color = 'var(--success)';
  } else {
    statusDiv.style.borderColor = 'var(--border)';
    statusDiv.style.background = 'rgba(255,255,255,0.03)';
    dot.style.background = 'var(--text-muted)';
    dot.style.animation = 'none';
    text.textContent = 'Konum Paylaşımı Kapalı';
    text.style.color = 'var(--text-muted)';
  }
}

async function startAdminLocationTracking(email) {
  console.log('Admin konum takibi başlatılıyor:', email);
  
  if (!('geolocation' in navigator)) {
    alert('Tarayıcınız konum servisleri desteklemiyor!');
    return;
  }
  
  // Konum izni kontrolü
  try {
    const permission = await navigator.permissions.query({ name: 'geolocation' });
    
    if (permission.state === 'denied') {
      alert('❌ Konum izni reddedildi!\n\n📍 Tarayıcı ayarlarından konum iznini açmanız gerekiyor.\n\n🔧 Ayarlar → Site Ayarları → Konum → İzin Ver');
      isAdminTracking = false;
      stopAdminLocationTracking();
      return;
    }
    
    console.log('✓ Konum izin durumu:', permission.state);
  } catch (err) {
    console.warn('Permission API desteklenmiyor:', err);
  }
  
  // Wake Lock - Ekran kilitliyken bile konum alsın
  try {
    if ('wakeLock' in navigator) {
      adminWakeLock = await navigator.wakeLock.request('screen');
      console.log('✓ Wake Lock aktif - Arka planda konum alınacak');
      
      adminWakeLock.addEventListener('release', () => {
        console.log('⚠ Wake Lock serbest bırakıldı');
        // Otomatik yeniden başlat
        if (isAdminTracking && 'wakeLock' in navigator) {
          navigator.wakeLock.request('screen').then(wl => {
            adminWakeLock = wl;
            console.log('✓ Wake Lock yeniden başlatıldı');
          }).catch(err => console.warn('Wake Lock yeniden başlatılamadı:', err));
        }
      });
    }
  } catch (err) {
    console.warn('⚠ Wake Lock başarısız:', err);
  }
  
  const options = {
    enableHighAccuracy: true, // GPS kullan
    maximumAge: 0, // Cache kullanma, her zaman yeni konum al
    timeout: 15000 // 15 saniye timeout
  };
  
  // İlk konum
  navigator.geolocation.getCurrentPosition(
    (position) => {
      updateAdminLocationToFirebase(email, position);
      console.log('✓ İlk konum alındı');
    },
    (error) => {
      console.error('❌ İlk konum alınamadı:', error.message);
      handleLocationError(error);
    },
    options
  );
  
  // Sürekli izleme (watchPosition)
  adminWatchId = navigator.geolocation.watchPosition(
    (position) => {
      updateAdminLocationToFirebase(email, position);
    },
    (error) => {
      console.error('❌ Konum hatası:', error.message);
      handleLocationError(error);
    },
    options
  );
  
  // Manuel güncelleme (backup) - Her 5 saniyede bir
  adminLocationInterval = setInterval(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        updateAdminLocationToFirebase(email, position);
      },
      (error) => {
        console.error('⚠ Manuel güncelleme başarısız:', error.message);
      },
      options
    );
  }, 5000);
  
  console.log('✓ Admin konum takibi aktif (Watch ID:', adminWatchId, ')');
}

function handleLocationError(error) {
  let errorMsg = '';
  
  switch(error.code) {
    case error.PERMISSION_DENIED:
      errorMsg = '❌ Konum izni reddedildi!\n\n📍 Lütfen tarayıcı ayarlarından konum iznini açın.';
      alert(errorMsg);
      stopAdminLocationTracking();
      break;
    case error.POSITION_UNAVAILABLE:
      errorMsg = '⚠ Konum bilgisi alınamıyor.';
      console.warn(errorMsg);
      break;
    case error.TIMEOUT:
      errorMsg = '⏱ Konum alma zaman aşımına uğradı.';
      console.warn(errorMsg);
      break;
    default:
      errorMsg = '❌ Bilinmeyen bir konum hatası oluştu.';
      console.error(errorMsg);
  }
}

async function startAdminLocationTracking(email) {
  console.log('Admin konum takibi başlatılıyor:', email);
  
  if (!('geolocation' in navigator)) {
    alert('Tarayıcınız konum servisleri desteklemiyor!');
    return;
  }
  
  try {
    const permission = await navigator.permissions.query({ name: 'geolocation' });
    
    if (permission.state === 'denied') {
      alert('Konum izni reddedildi!\n\nTarayıcı ayarlarından konum iznini açmanız gerekiyor.');
      isAdminTracking = false;
      updateAdminLocationUI();
      return;
    }
  } catch (err) {
    console.warn('Permission API desteklenmiyor');
  }
  
  try {
    if ('wakeLock' in navigator) {
      adminWakeLock = await navigator.wakeLock.request('screen');
      console.log('Admin Wake Lock aktif');
      
      adminWakeLock.addEventListener('release', () => {
        console.log('Admin Wake Lock serbest bırakıldı');
      });
    }
  } catch (err) {
    console.warn('Wake Lock başarısız:', err);
  }
  
  const options = {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 15000
  };
  
  navigator.geolocation.getCurrentPosition(
    (position) => updateAdminLocationToFirebase(email, position),
    (error) => console.error('İlk konum alınamadı:', error.message),
    options
  );
  
  adminWatchId = navigator.geolocation.watchPosition(
    (position) => updateAdminLocationToFirebase(email, position),
    (error) => console.error('Konum hatası:', error.message),
    options
  );
  
  adminLocationInterval = setInterval(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => updateAdminLocationToFirebase(email, position),
      (error) => console.error('Manuel güncelleme başarısız:', error.message),
      options
    );
  }, 5000);
  
  console.log('Admin konum takibi aktif');
}

function updateAdminLocationToFirebase(email, position) {
  const locationData = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
    accuracy: position.coords.accuracy,
    speed: position.coords.speed || 0,
    heading: position.coords.heading || 0,
    timestamp: new Date().toISOString(),
    lastUpdate: Date.now()
  };
  
  const emailKey = email.replace(/[.@]/g, '_');
  const locationRef = ref(database, `locations/${emailKey}`);
  
  set(locationRef, locationData).then(() => {
    console.log('Admin konum güncellendi');
  }).catch((error) => {
    console.error('Admin konum kaydetme hatası:', error);
  });
}

function stopAdminLocationTracking() {
  isAdminTracking = false;
  
  const adminStartBtn = document.getElementById('adminStartDeliveryBtn');
  if (adminStartBtn) {
    adminStartBtn.classList.remove('tracking');
    const btnText = adminStartBtn.querySelector('.text');
    const progress = adminStartBtn.querySelector('.progress');
    if (btnText) btnText.textContent = 'Yola Çıkıyorum (Basılı Tut)';
    if (progress) progress.style.width = '0%';
  }
  
  if (adminWatchId !== null) {
    navigator.geolocation.clearWatch(adminWatchId);
    adminWatchId = null;
  }
  
  if (adminLocationInterval) {
    clearInterval(adminLocationInterval);
    adminLocationInterval = null;
  }
  
  if (adminWakeLock) {
    adminWakeLock.release().then(() => {
      adminWakeLock = null;
    });
  }
  
  updateAdminLocationUI();
  console.log('Admin konum takibi durduruldu');
}

console.log('Admin teslimat sistemi yüklendi');

// Page visibility change - Arka planda bile konum alsın
document.addEventListener('visibilitychange', async () => {
  if (document.hidden) {
    console.log('📱 Sayfa arka planda - konum tracking devam ediyor');
  } else {
    console.log('📱 Sayfa ön planda');
    
    // Eğer tracking aktifse ve watchId yoksa yeniden başlat
    if (isAdminTracking && adminWatchId === null) {
      console.log('🔄 Tracking yeniden başlatılıyor');
      await startAdminLocationTracking(currentUser.email);
    }
  }
});

// Page unload - Tracking aktifse durdurma
window.addEventListener('beforeunload', (e) => {
  if (isAdminTracking) {
    // Kullanıcıyı uyar
    e.preventDefault();
    e.returnValue = 'Konum paylaşımı aktif! Sayfayı kapatırsanız müşteriler konumunuzu göremeyecek.';
  }
});
