import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getDatabase, ref, set, update, onValue, get } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

import { firebaseConfig } from './firebase-config.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

let currentCourier = null;
let locationWatchId = null;
let isLocationSharing = false;
let activeOrders = [];

// Auth check
onAuthStateChanged(auth, async (user) => {
  if (user) {
    // Check if user is courier
    const courierRef = ref(database, `couriers/${user.email.replace(/[.@]/g, '_')}`);
    const snapshot = await get(courierRef);
    
    if (snapshot.exists()) {
      currentCourier = { email: user.email, ...snapshot.val() };
      document.getElementById('courierName').textContent = currentCourier.name;
      loadActiveOrders();
    } else {
      alert('Bu hesap kurye hesabı değil!');
      await signOut(auth);
      window.location.href = 'index.html';
    }
  } else {
    window.location.href = 'index.html';
  }
});

// Logout
window.logout = async () => {
  if (confirm('Çıkış yapmak istediğinize emin misiniz?')) {
    if (isLocationSharing) {
      stopLocationSharing();
    }
    await signOut(auth);
  }
};

// Toggle location sharing
window.toggleLocationSharing = () => {
  if (isLocationSharing) {
    stopLocationSharing();
  } else {
    startLocationSharing();
  }
};

// Start location sharing
function startLocationSharing() {
  if (!navigator.geolocation) {
    alert('Tarayıcınız konum paylaşımını desteklemiyor!');
    return;
  }
  
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  const messageDiv = document.getElementById('locationMessage');
  messageDiv.innerHTML = '<div class="alert alert-success">📍 Konum izni isteniyor...</div>';
  
  locationWatchId = navigator.geolocation.watchPosition(
    (position) => {
      const location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: new Date().toISOString()
      };
      
      updateCourierLocation(location);
      
      if (!isLocationSharing) {
        isLocationSharing = true;
        updateLocationUI();
        messageDiv.innerHTML = '<div class="alert alert-success">✅ Konum paylaşımı aktif! Müşteriler konumunuzu görebilir.</div>';
      }
    },
    (error) => {
      console.error('Location error:', error);
      let errorMsg = 'Konum alınamadı!';
      
      if (error.code === 1) {
        errorMsg = 'Konum izni reddedildi. Lütfen tarayıcı ayarlarından izin verin.';
      } else if (error.code === 2) {
        errorMsg = 'Konum bilgisi alınamıyor. GPS aktif mi kontrol edin.';
      }
      
      messageDiv.innerHTML = `<div class="alert alert-error">❌ ${errorMsg}</div>`;
      isLocationSharing = false;
      updateLocationUI();
    },
    options
  );
}

// Stop location sharing
function stopLocationSharing() {
  if (locationWatchId) {
    navigator.geolocation.clearWatch(locationWatchId);
    locationWatchId = null;
  }
  
  isLocationSharing = false;
  updateLocationUI();
  
  // Clear location from database
  if (currentCourier) {
    const courierRef = ref(database, `couriers/${currentCourier.email.replace(/[.@]/g, '_')}/location`);
    set(courierRef, null);
    
    // Also clear from all active orders
    activeOrders.forEach(order => {
      const orderRef = ref(database, `orders/${order.trackingCode}/courier/location`);
      set(orderRef, null);
    });
  }
  
  document.getElementById('locationMessage').innerHTML = '<div class="alert alert-error">Konum paylaşımı durduruldu.</div>';
}

// Update courier location in database
async function updateCourierLocation(location) {
  if (!currentCourier) return;
  
  try {
    // Update courier's location
    const courierRef = ref(database, `couriers/${currentCourier.email.replace(/[.@]/g, '_')}/location`);
    await set(courierRef, location);
    
    // Update location in all active orders
    activeOrders.forEach(async (order) => {
      const orderRef = ref(database, `orders/${order.trackingCode}/courier/location`);
      await set(orderRef, location);
    });
  } catch (error) {
    console.error('Update location error:', error);
  }
}

// Update location UI
function updateLocationUI() {
  const statusEl = document.getElementById('locationStatus');
  const btnEl = document.getElementById('toggleLocationBtn');
  
  if (isLocationSharing) {
    statusEl.textContent = '✅ Konum Paylaşımı Aktif';
    statusEl.className = 'location-status active';
    btnEl.textContent = '⏸️ Konum Paylaşımını Durdur';
    btnEl.className = 'btn btn-danger';
  } else {
    statusEl.textContent = '❌ Konum Paylaşımı Kapalı';
    statusEl.className = 'location-status inactive';
    btnEl.textContent = '📍 Konum Paylaşımını Başlat';
    btnEl.className = 'btn btn-success';
  }
}

// Load active orders
function loadActiveOrders() {
  if (!currentCourier) return;
  
  const courierOrdersRef = ref(database, `couriers/${currentCourier.email.replace(/[.@]/g, '_')}/activeOrders`);
  
  onValue(courierOrdersRef, async (snapshot) => {
    const ordersData = snapshot.val() || {};
    const orderPromises = Object.keys(ordersData).map(async (trackingCode) => {
      const orderRef = ref(database, `orders/${trackingCode}`);
      const orderSnap = await get(orderRef);
      if (orderSnap.exists()) {
        return { trackingCode, ...orderSnap.val() };
      }
      return null;
    });
    
    activeOrders = (await Promise.all(orderPromises)).filter(o => o !== null && o.status !== 'delivered');
    renderOrders();
  });
}

// Render orders
function renderOrders() {
  const container = document.getElementById('ordersContainer');
  
  if (activeOrders.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:40px;color:var(--text-muted);">
        <p>Şu anda aktif teslimat yok.</p>
      </div>
    `;
    return;
  }
  
  // Sort by queue position
  activeOrders.sort((a, b) => (a.queuePosition || 999) - (b.queuePosition || 999));
  
  let html = '<div class="orders-list">';
  
  activeOrders.forEach((order, index) => {
    html += `
      <div class="order-card">
        <div class="order-header">
          <div class="order-code">${order.trackingCode}</div>
          <div style="background:${index === 0 ? 'var(--success)' : 'var(--warning)'};color:white;padding:4px 12px;border-radius:999px;font-size:0.85rem;">
            ${index === 0 ? '🎯 Şu an' : `Sıra ${index + 1}`}
          </div>
        </div>
        <div class="order-info">
          <strong>${order.customerName}</strong><br>
          📞 ${order.customerPhone}<br>
          📦 ${order.productName}<br>
          📍 ${order.address}
        </div>
        <div class="order-actions">
          <button class="btn btn-success" onclick="completeDelivery('${order.trackingCode}')">
            ✅ Teslim Edildi
          </button>
          <button class="btn" style="background:var(--surface);color:var(--text);" onclick="openNavigation('${order.latitude}', '${order.longitude}')">
            🗺️ Yol Tarifi
          </button>
        </div>
      </div>
    `;
  });
  
  html += '</div>';
  container.innerHTML = html;
}

// Complete delivery
window.completeDelivery = async (trackingCode) => {
  if (!confirm('Bu teslimatı tamamlandı olarak işaretlemek istediğinize emin misiniz?')) {
    return;
  }
  
  try {
    const orderRef = ref(database, `orders/${trackingCode}`);
    const snapshot = await get(orderRef);
    
    if (!snapshot.exists()) {
      alert('Sipariş bulunamadı!');
      return;
    }
    
    const order = snapshot.val();
    const history = order.history || [];
    
    history.push({
      status: 'Teslim Edildi',
      timestamp: new Date().toISOString(),
      note: `${currentCourier.name} tarafından teslim edildi.`
    });
    
    await update(orderRef, {
      status: 'delivered',
      deliveredAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      history
    });
    
    // Remove from courier's active orders
    const courierOrderRef = ref(database, `couriers/${currentCourier.email.replace(/[.@]/g, '_')}/activeOrders/${trackingCode}`);
    await set(courierOrderRef, null);
    
    // Update queue positions for remaining orders
    await updateQueuePositions();
    
    alert('✅ Teslimat tamamlandı!');
  } catch (error) {
    console.error('Complete delivery error:', error);
    alert('❌ Bir hata oluştu: ' + error.message);
  }
};

// Update queue positions
async function updateQueuePositions() {
  const remaining = activeOrders.filter(o => o.status !== 'delivered');
  
  for (let i = 0; i < remaining.length; i++) {
    const orderRef = ref(database, `orders/${remaining[i].trackingCode}`);
    await update(orderRef, {
      queuePosition: i + 1
    });
  }
}

// Open navigation
window.openNavigation = (lat, lng) => {
  const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  window.open(url, '_blank');
};

// Auto-start location sharing if was active before
const wasSharing = localStorage.getItem('locationSharing') === 'true';
if (wasSharing) {
  setTimeout(() => {
    startLocationSharing();
  }, 1000);
}

// Save location sharing state
window.addEventListener('beforeunload', () => {
  localStorage.setItem('locationSharing', isLocationSharing.toString());
});

// Keep screen awake (optional, requires Wake Lock API)
let wakeLock = null;

async function requestWakeLock() {
  try {
    if ('wakeLock' in navigator) {
      wakeLock = await navigator.wakeLock.request('screen');
      console.log('Screen wake lock active');
    }
  } catch (err) {
    console.log('Wake lock error:', err);
  }
}

// Request wake lock when location sharing starts
if (isLocationSharing) {
  requestWakeLock();
}
