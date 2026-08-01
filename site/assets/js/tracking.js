import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getDatabase, ref, onValue, get } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

// Firebase config
import { firebaseConfig } from '../../admin/firebase-config.js';

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

let map = null;
let courierMarker = null;
let customerMarker = null;
let routeLine = null;
let watchId = null;
let currentOrder = null;

// Status translations
const statusMap = {
  pending: { text: 'Sipariş Alındı', class: 'status-pending', icon: '📝' },
  confirmed: { text: 'Onaylandı', class: 'status-confirmed', icon: '✅' },
  preparing: { text: 'Hazırlanıyor', class: 'status-preparing', icon: '📦' },
  ready: { text: 'Teslimata Hazır', class: 'status-ready', icon: '✔️' },
  shipped: { text: 'Yolda', class: 'status-shipped', icon: '🚚' },
  delivered: { text: 'Teslim Edildi', class: 'status-delivered', icon: '🎉' },
  cancelled: { text: 'İptal Edildi', class: 'status-cancelled', icon: '❌' }
};

// Search form
document.getElementById('searchForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const trackingCode = document.getElementById('trackingCode').value.trim().toUpperCase();
  const messageDiv = document.getElementById('searchMessage');
  const resultDiv = document.getElementById('trackingResult');
  
  messageDiv.innerHTML = '<div class="alert alert-info"><div class="loading"></div> Sipariş sorgulanıyor...</div>';
  resultDiv.style.display = 'none';
  
  try {
    const orderRef = ref(database, `orders/${trackingCode}`);
    const snapshot = await get(orderRef);
    
    if (snapshot.exists()) {
      messageDiv.innerHTML = '';
      currentOrder = { id: trackingCode, ...snapshot.val() };
      displayOrderInfo(currentOrder);
      resultDiv.style.display = 'block';
      
      // Realtime updates
      startRealtimeTracking(trackingCode);
      
      // Scroll to result
      resultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      messageDiv.innerHTML = '<div class="alert alert-error">❌ Takip kodu bulunamadı. Lütfen kontrol edip tekrar deneyin.</div>';
    }
  } catch (error) {
    console.error('Tracking error:', error);
    messageDiv.innerHTML = '<div class="alert alert-error">❌ Bir hata oluştu. Lütfen tekrar deneyin.</div>';
  }
});

// Display order information
function displayOrderInfo(order) {
  document.getElementById('orderCode').textContent = order.id;
  
  const status = statusMap[order.status] || statusMap.pending;
  document.getElementById('orderStatus').innerHTML = `
    <div class="status-badge ${status.class}">
      <span>${status.icon}</span>
      <span>${status.text}</span>
    </div>
  `;
  
  document.getElementById('orderInfo').innerHTML = `
    <div class="info-item">
      <h4>Müşteri</h4>
      <p>${order.customerName}</p>
    </div>
    <div class="info-item">
      <h4>Telefon</h4>
      <p>${order.customerPhone}</p>
    </div>
    <div class="info-item">
      <h4>Ürün</h4>
      <p>${order.productName}</p>
    </div>
    <div class="info-item">
      <h4>Sipariş Tarihi</h4>
      <p>${formatDate(order.createdAt)}</p>
    </div>
    <div class="info-item">
      <h4>Teslimat Adresi</h4>
      <p>${order.address}</p>
    </div>
  `;
  
  // Queue information
  displayQueueInfo(order);
  
  // Timeline
  displayTimeline(order);
  
  // Courier info
  if (order.courier) {
    displayCourierInfo(order.courier);
  }
  
  // Map
  if (order.status === 'shipped' && order.courier && order.courier.location) {
    initMap(order);
  }
}

// Display queue information
function displayQueueInfo(order) {
  const queueDiv = document.getElementById('queueInfo');
  
  if (order.status === 'shipped' && order.queuePosition && order.queuePosition > 1) {
    queueDiv.innerHTML = `
      <div class="alert alert-info">
        ℹ️ Kurye ${order.queuePosition}. müşteriye teslimat yapıyor. Siz ${order.queuePosition === 2 ? 'sonraki' : (order.queuePosition - 1) + '. sırada'} teslimat noktasısınız.
        ${order.estimatedArrival ? `<br><strong>Tahmini varış:</strong> ${formatTime(order.estimatedArrival)}` : ''}
      </div>
    `;
  } else if (order.status === 'shipped' && order.queuePosition === 1) {
    queueDiv.innerHTML = `
      <div class="alert alert-success">
        🎯 Kurye size doğru geliyor! ${order.estimatedArrival ? `<strong>Tahmini varış:</strong> ${formatTime(order.estimatedArrival)}` : ''}
      </div>
    `;
  } else {
    queueDiv.innerHTML = '';
  }
}

// Display timeline
function displayTimeline(order) {
  const timelineDiv = document.getElementById('timeline');
  const history = order.history || [];
  
  let html = '<h3 style="margin-bottom:20px;">Sipariş Geçmişi</h3>';
  
  history.forEach((item, index) => {
    const isActive = index === history.length - 1;
    html += `
      <div class="timeline-item ${isActive ? 'active' : ''}">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <h4>${item.status}</h4>
          <p>${formatDateTime(item.timestamp)}</p>
          ${item.note ? `<p style="margin-top:4px;">${item.note}</p>` : ''}
        </div>
      </div>
    `;
  });
  
  timelineDiv.innerHTML = html;
}

// Display courier info
function displayCourierInfo(courier) {
  const courierSection = document.getElementById('courierSection');
  courierSection.style.display = 'block';
  
  const initial = courier.name ? courier.name.charAt(0).toUpperCase() : 'K';
  document.getElementById('courierAvatar').textContent = initial;
  document.getElementById('courierName').textContent = courier.name || 'Kurye';
  document.getElementById('courierPhone').textContent = courier.phone || '-';
}

// Initialize map
function initMap(order) {
  const mapSection = document.getElementById('mapSection');
  mapSection.style.display = 'block';
  
  const customerLat = order.latitude || 41.0082;
  const customerLng = order.longitude || 28.9784;
  
  if (!map) {
    map = L.map('map').setView([customerLat, customerLng], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(map);
  }
  
  // Customer marker
  if (!customerMarker) {
    customerMarker = L.marker([customerLat, customerLng], {
      icon: L.divIcon({
        className: 'custom-marker',
        html: '<div style="background:#4f46e5;color:white;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;border:3px solid white;box-shadow:0 2px 10px rgba(0,0,0,0.3);">📍</div>',
        iconSize: [40, 40],
        iconAnchor: [20, 40]
      })
    }).addTo(map);
    
    customerMarker.bindPopup(`<b>Teslimat Adresi</b><br>${order.address}`);
  }
  
  // Courier marker
  if (order.courier && order.courier.location) {
    updateCourierLocation(order.courier.location, customerLat, customerLng);
  }
}

// Update courier location
function updateCourierLocation(courierLocation, customerLat, customerLng) {
  const courierLat = courierLocation.latitude;
  const courierLng = courierLocation.longitude;
  
  if (!courierMarker) {
    courierMarker = L.marker([courierLat, courierLng], {
      icon: L.divIcon({
        className: 'custom-marker',
        html: '<div style="background:#22c55e;color:white;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;border:3px solid white;box-shadow:0 2px 10px rgba(0,0,0,0.3);animation:pulse 2s ease-in-out infinite;">🚚</div>',
        iconSize: [40, 40],
        iconAnchor: [20, 40]
      })
    }).addTo(map);
    
    courierMarker.bindPopup('<b>Kurye</b><br>Anlık konum');
  } else {
    courierMarker.setLatLng([courierLat, courierLng]);
  }
  
  // Draw route line
  if (routeLine) {
    map.removeLayer(routeLine);
  }
  
  routeLine = L.polyline([
    [courierLat, courierLng],
    [customerLat, customerLng]
  ], {
    color: '#4f46e5',
    weight: 3,
    opacity: 0.7,
    dashArray: '10, 10'
  }).addTo(map);
  
  // Fit bounds to show both markers
  const bounds = L.latLngBounds([
    [courierLat, courierLng],
    [customerLat, customerLng]
  ]);
  map.fitBounds(bounds, { padding: [50, 50] });
  
  // Calculate and display distance
  const distance = calculateDistance(courierLat, courierLng, customerLat, customerLng);
  const distanceInfo = document.getElementById('distanceInfo');
  
  if (distance < 0.5) {
    distanceInfo.innerHTML = `<span style="color:var(--success);font-weight:600;">🎯 Kurye çok yakınınızda! (${(distance * 1000).toFixed(0)} metre)</span>`;
  } else if (distance < 2) {
    distanceInfo.innerHTML = `<span style="color:var(--warning);font-weight:600;">🚚 Kurye yaklaşıyor... (${distance.toFixed(1)} km)</span>`;
  } else {
    distanceInfo.innerHTML = `<span style="font-weight:600;">📍 Kurye mesafesi: ${distance.toFixed(1)} km</span>`;
  }
}

// Start realtime tracking
function startRealtimeTracking(trackingCode) {
  const orderRef = ref(database, `orders/${trackingCode}`);
  
  onValue(orderRef, (snapshot) => {
    if (snapshot.exists()) {
      const order = { id: trackingCode, ...snapshot.val() };
      currentOrder = order;
      
      // Update status
      const status = statusMap[order.status] || statusMap.pending;
      document.getElementById('orderStatus').innerHTML = `
        <div class="status-badge ${status.class}">
          <span>${status.icon}</span>
          <span>${status.text}</span>
        </div>
      `;
      
      // Update queue info
      displayQueueInfo(order);
      
      // Update timeline
      displayTimeline(order);
      
      // Update courier location
      if (order.status === 'shipped' && order.courier && order.courier.location) {
        if (!map) {
          initMap(order);
        } else {
          const customerLat = order.latitude || 41.0082;
          const customerLng = order.longitude || 28.9784;
          updateCourierLocation(order.courier.location, customerLat, customerLng);
        }
        
        // Show notification if courier is close
        checkProximityNotification(order);
      }
    }
  });
}

// Check proximity notification
let lastProximityAlert = null;

function checkProximityNotification(order) {
  if (!order.courier || !order.courier.location) return;
  
  const courierLat = order.courier.location.latitude;
  const courierLng = order.courier.location.longitude;
  const customerLat = order.latitude || 41.0082;
  const customerLng = order.longitude || 28.9784;
  
  const distance = calculateDistance(courierLat, courierLng, customerLat, customerLng);
  
  // Alert when within 500m (only once)
  if (distance < 0.5 && lastProximityAlert !== 'close') {
    showNotification('🎯 Kurye Yakınınızda!', 'Kurye 500 metre içerisinde. Hazır olun!');
    lastProximityAlert = 'close';
  }
  // Alert when within 2km (only once)
  else if (distance < 2 && lastProximityAlert === null) {
    showNotification('🚚 Kurye Yaklaşıyor', `Kurye ${distance.toFixed(1)} km uzaklıkta.`);
    lastProximityAlert = 'approaching';
  }
}

// Show notification
function showNotification(title, body) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: '/assets/img/logo.png',
      badge: '/assets/img/logo.png'
    });
  }
}

// Request notification permission
if ('Notification' in window && Notification.permission === 'default') {
  Notification.requestPermission();
}

// Calculate distance between two points (Haversine formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Format date
function formatDate(timestamp) {
  if (!timestamp) return '-';
  const date = new Date(timestamp);
  return date.toLocaleDateString('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

// Format time
function formatTime(timestamp) {
  if (!timestamp) return '-';
  const date = new Date(timestamp);
  return date.toLocaleTimeString('tr-TR', {
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Format date time
function formatDateTime(timestamp) {
  if (!timestamp) return '-';
  const date = new Date(timestamp);
  return date.toLocaleString('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Check URL params for auto-search
const urlParams = new URLSearchParams(window.location.search);
const autoTrackingCode = urlParams.get('kod');

if (autoTrackingCode) {
  document.getElementById('trackingCode').value = autoTrackingCode;
  document.getElementById('searchForm').dispatchEvent(new Event('submit'));
}
