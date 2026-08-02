import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getDatabase, ref, onValue, get, set, remove } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

// Firebase config
import { firebaseConfig } from '../../admin/firebase-config.js';

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

let map = null;
let courierMarker = null;
let customerMarker = null;
let routeLine = null;
let courierCircle = null;
let watchId = null;
let currentOrder = null;
let locationUpdateInterval = null;
let wakeLock = null;
let currentUser = null;
let mapInitialized = false;

// Admin emails
const ADMIN_EMAILS = [
  'huseyinatas@gmail.com',
  'hüseyinataş@gmail.com',
  '2sthillman@gmail.com',
  'admin@zirveeimza.com'
];

// Auth state listener
onAuthStateChanged(auth, (user) => {
  currentUser = user;
  console.log('Auth durumu:', user ? user.email : 'Giriş yok');
});

// Status translations
const statusMap = {
  pending: { text: 'Sipariş Alındı', class: 'status-pending', icon: '•' },
  confirmed: { text: 'Onaylandı', class: 'status-confirmed', icon: '•' },
  preparing: { text: 'Hazırlanıyor', class: 'status-preparing', icon: '•' },
  ready: { text: 'Teslimata Hazır', class: 'status-ready', icon: '•' },
  shipped: { text: 'Yolda', class: 'status-shipped', icon: '•' },
  delivered: { text: 'Teslim Edildi', class: 'status-delivered', icon: '•' },
  cancelled: { text: 'İptal Edildi', class: 'status-cancelled', icon: '•' }
};

// Search form
document.getElementById('searchForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const searchInput = document.getElementById('trackingCode').value.trim();
  const messageDiv = document.getElementById('searchMessage');
  const resultDiv = document.getElementById('trackingResult');
  
  if (!searchInput) {
    messageDiv.innerHTML = '<div class="alert alert-error">Lütfen takip kodu girin!</div>';
    return;
  }
  
  messageDiv.innerHTML = '<div class="alert alert-info"><div class="loading"></div> Sipariş sorgulanıyor...</div>';
  resultDiv.style.display = 'none';
  
  try {
    const ordersRef = ref(database, 'orders');
    const snapshot = await get(ordersRef);
    
    if (snapshot.exists()) {
      const allOrders = snapshot.val();
      let foundOrder = null;
      let foundOrderId = null;
      
      const searchUpper = searchInput.toUpperCase();
      
      // 1. Önce trackingCode ile ara
      for (const [orderId, orderData] of Object.entries(allOrders)) {
        if (orderData.trackingCode && orderData.trackingCode.toUpperCase() === searchUpper) {
          foundOrder = orderData;
          foundOrderId = orderId;
          break;
        }
      }
      
      // 2. Bulunamadıysa, order ID ile ara (backward compatibility)
      if (!foundOrder && allOrders[searchInput]) {
        foundOrder = allOrders[searchInput];
        foundOrderId = searchInput;
      }
      
      if (foundOrder) {
        messageDiv.innerHTML = '';
        currentOrder = { id: foundOrderId, ...foundOrder };
        displayOrderInfo(currentOrder);
        resultDiv.style.display = 'block';
        
        // Realtime updates
        startRealtimeTracking(foundOrderId);
        
        // Scroll to result
        setTimeout(() => {
          resultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      } else {
        messageDiv.innerHTML = '<div class="alert alert-error">Takip kodu bulunamadı. Lütfen kontrol edip tekrar deneyin.</div>';
      }
    } else {
      messageDiv.innerHTML = '<div class="alert alert-error">Henüz kayıtlı sipariş bulunmamaktadır.</div>';
    }
  } catch (error) {
    console.error('Tracking error:', error);
    messageDiv.innerHTML = '<div class="alert alert-error">Bir hata oluştu. Lütfen tekrar deneyin.</div>';
  }
});

// Display order information
function displayOrderInfo(order) {
  // Takip kodunu göster - trackingCode varsa onu, yoksa ID'yi göster
  const displayCode = order.trackingCode || order.id;
  document.getElementById('orderCode').textContent = displayCode;
  
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
  
  displayQueueInfo(order);
  displayTimeline(order);
  
  if (order.courier) {
    displayCourierInfo(order.courier);
  }
  
  // Haritayı sadece shipped durumunda göster (delivered veya cancelled değilse)
  if (order.status === 'shipped') {
    initMap(order);
  } else {
    // Teslim edildi veya iptal edildi ise haritayı gizle
    const mapSection = document.getElementById('mapSection');
    if (mapSection) {
      mapSection.style.display = 'none';
    }
  }
}

// Display queue information
function displayQueueInfo(order) {
  const queueDiv = document.getElementById('queueInfo');
  
  if (order.status === 'shipped' && order.queuePosition && order.queuePosition > 1) {
    queueDiv.innerHTML = `
      <div class="alert alert-info">
        Teslimatçı ${order.queuePosition}. müşteriye teslimat yapıyor. Siz ${order.queuePosition === 2 ? 'sonraki' : (order.queuePosition - 1) + '. sırada'} teslimat noktasısınız.
        ${order.estimatedArrival ? `<br><strong>Tahmini varış:</strong> ${formatTime(order.estimatedArrival)}` : ''}
      </div>
    `;
  } else if (order.status === 'shipped' && order.queuePosition === 1) {
    queueDiv.innerHTML = `
      <div class="alert alert-success">
        Teslimatçı size doğru geliyor! ${order.estimatedArrival ? `<strong>Tahmini varış:</strong> ${formatTime(order.estimatedArrival)}` : ''}
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
  
  const initial = courier.name ? courier.name.charAt(0).toUpperCase() : 'T';
  const displayName = ADMIN_EMAILS.includes(courier.email) ? 'Teslimatçı' : (courier.name || 'Teslimatçı');
  
  document.getElementById('courierAvatar').textContent = initial;
  document.getElementById('courierName').textContent = displayName;
  document.getElementById('courierPhone').textContent = courier.phone || '-';
}


// Initialize map with Leaflet
function initMap(order) {
  console.log('🗺️ initMap çağrıldı', order);
  
  const mapSection = document.getElementById('mapSection');
  if (!mapSection) {
    console.error('❌ mapSection elementi bulunamadı!');
    return;
  }
  
  mapSection.style.display = 'block';
  console.log('✅ mapSection gösterildi');
  
  const customerLat = order.latitude || 41.0082;
  const customerLng = order.longitude || 28.9784;
  
  console.log('📍 Müşteri konumu:', customerLat, customerLng);
  
  if (!map) {
    console.log('🆕 Yeni harita oluşturuluyor...');
    
    if (typeof L === 'undefined') {
      console.error('❌ Leaflet yüklenmemiş!');
      alert('HATA: Leaflet kütüphanesi yüklenemedi. Sayfayı yenileyin.');
      return;
    }
    
    console.log('✅ Leaflet versiyonu:', L.version);
    
    const mapDiv = document.getElementById('map');
    if (!mapDiv) {
      console.error('❌ map div bulunamadı!');
      return;
    }
    
    console.log('📏 Map div boyutu:', mapDiv.offsetWidth, 'x', mapDiv.offsetHeight);
    
    try {
      map = L.map('map', {
        center: [customerLat, customerLng],
        zoom: 14,
        zoomControl: true,
        scrollWheelZoom: true,
        preferCanvas: false,
        fadeAnimation: false,
        zoomAnimation: true,
        markerZoomAnimation: true
      });
      
      console.log('✅ Map nesnesi oluşturuldu');
      
      // Minimal ve temiz harita katmanı (CartoDB Positron)
      const tileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        subdomains: 'abcd',
        maxZoom: 20
      });
      
      tileLayer.addTo(map);
      
      tileLayer.on('loading', function() {
        console.log('🔄 Tile\'lar yükleniyor...');
      });
      
      tileLayer.on('load', function() {
        console.log('✅ Tile\'lar yüklendi');
      });
      
      tileLayer.on('tileerror', function(error) {
        console.error('❌ Tile yükleme hatası:', error);
      });
      
      console.log('✅ Tile layer eklendi (CartoDB Light)');
      
      // Force map size recalculation multiple times
      setTimeout(() => {
        map.invalidateSize();
        console.log('✅ Map invalidateSize (100ms)');
      }, 100);
      
      setTimeout(() => {
        map.invalidateSize();
        console.log('✅ Map invalidateSize (500ms)');
      }, 500);
      
      setTimeout(() => {
        map.invalidateSize();
        map.setView([customerLat, customerLng], 14);
        console.log('✅ Map invalidateSize + setView (1000ms)');
      }, 1000);
      
    } catch (error) {
      console.error('❌ Harita oluşturma hatası:', error);
      alert('Harita oluşturulamadı: ' + error.message);
      return;
    }
  }
  
  // Customer marker - Simple modern dot with pulse
  if (!customerMarker) {
    console.log('📍 Müşteri marker ekleniyor...');
    
    const customerIcon = L.divIcon({
      className: 'custom-marker-customer',
      html: `
        <div style="position:relative;width:32px;height:32px;display:flex;align-items:center;justify-content:center;">
          <!-- Outer glow ring -->
          <div style="
            position: absolute;
            width: 32px;
            height: 32px;
            background: rgba(99, 102, 241, 0.2);
            border-radius: 50%;
            animation: pulse 2s ease-in-out infinite;
          "></div>
          
          <!-- Main dot -->
          <div style="
            position: relative;
            width: 20px;
            height: 20px;
            background: #6366f1;
            border: 3px solid #ffffff;
            border-radius: 50%;
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
            z-index: 10;
          "></div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16]
    });
    
    customerMarker = L.marker([customerLat, customerLng], {
      icon: customerIcon,
      title: 'Teslimat Adresi',
      zIndexOffset: 1000
    }).addTo(map);
    
    customerMarker.bindPopup(`
      <div style="padding:14px;min-width:220px;font-family:system-ui,-apple-system,sans-serif;background:var(--surface-strong);border-radius:12px;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
          <div style="width:12px;height:12px;background:#6366f1;border-radius:50%;"></div>
          <strong style="color:#6366f1;font-size:16px;">Teslimat Adresi</strong>
        </div>
        <span style="color:var(--text-secondary);font-size:14px;line-height:1.5;">${order.address}</span>
      </div>
    `, { closeButton: false });
    
    console.log('✅ Müşteri marker eklendi');
  }
  
  console.log('🎉 initMap tamamlandı');
}

// Update courier location
function updateCourierLocation(locationData, customerLat, customerLng) {
  const courierLat = locationData.latitude;
  const courierLng = locationData.longitude;
  
  if (!courierMarker) {
    const courierIcon = L.divIcon({
      className: 'custom-marker-courier',
      html: `
        <div style="position:relative;width:40px;height:40px;display:flex;align-items:center;justify-content:center;">
          <!-- Pulse ring 1 -->
          <div style="
            position: absolute;
            width: 100%;
            height: 100%;
            background: rgba(16, 185, 129, 0.3);
            border-radius: 50%;
            animation: ripple 2.5s ease-out infinite;
          "></div>
          
          <!-- Pulse ring 2 -->
          <div style="
            position: absolute;
            width: 100%;
            height: 100%;
            background: rgba(16, 185, 129, 0.3);
            border-radius: 50%;
            animation: ripple 2.5s ease-out 1.25s infinite;
          "></div>
          
          <!-- Main courier dot -->
          <div style="
            position: relative;
            width: 24px;
            height: 24px;
            background: #10b981;
            border: 4px solid #ffffff;
            border-radius: 50%;
            box-shadow: 0 4px 16px rgba(16, 185, 129, 0.5);
            z-index: 10;
          "></div>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    });
    
    courierMarker = L.marker([courierLat, courierLng], {
      icon: courierIcon,
      title: 'Teslimatçı',
      zIndexOffset: 2000
    }).addTo(map);
    
    courierMarker.bindPopup(`
      <div style="padding:14px;min-width:220px;font-family:system-ui,-apple-system,sans-serif;background:var(--surface-strong);border-radius:12px;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
          <div style="width:12px;height:12px;background:#10b981;border-radius:50%;animation:pulse 2s ease-in-out infinite;"></div>
          <strong style="color:#10b981;font-size:16px;">Teslimatçı</strong>
        </div>
        <div style="color:var(--text-secondary);font-size:13px;margin-top:6px;">Canlı konum takibi</div>
        <div style="color:var(--text-muted);font-size:12px;margin-top:4px;">Doğruluk: ~${Math.round(locationData.accuracy || 0)}m</div>
      </div>
    `, { closeButton: false });
    
    courierCircle = L.circle([courierLat, courierLng], {
      radius: Math.min(locationData.accuracy || 50, 80),
      color: '#10b981',
      fillColor: '#10b981',
      fillOpacity: 0.15,
      weight: 2,
      opacity: 0.4
    }).addTo(map);
    
  } else {
    // Smooth marker transition
    courierMarker.setLatLng([courierLat, courierLng]);
    
    if (courierCircle) {
      courierCircle.setLatLng([courierLat, courierLng]);
      courierCircle.setRadius(Math.min(locationData.accuracy || 50, 100));
    }
  }
  
  // Draw route line with OSRM routing
  drawRoute(courierLat, courierLng, customerLat, customerLng);
  
  // Fit bounds only on first load
  if (!mapInitialized) {
    setTimeout(() => {
      const bounds = L.latLngBounds([
        [courierLat, courierLng],
        [customerLat, customerLng]
      ]);
      map.fitBounds(bounds, { 
        padding: [60, 60],
        maxZoom: 15
      });
      mapInitialized = true;
    }, 500);
  }
  
  // Calculate distance
  const distance = calculateDistance(courierLat, courierLng, customerLat, customerLng);
  const distanceInfo = document.getElementById('distanceInfo');
  
  let distanceHTML = '';
  if (distance < 0.1) {
    distanceHTML = `<div style="font-size:1.2rem;font-weight:700;color:var(--success);margin-bottom:4px;">Teslimatçı geldi!</div>
                    <div style="font-size:0.9rem;color:var(--text-muted);">${(distance * 1000).toFixed(0)} metre</div>`;
  } else if (distance < 0.5) {
    distanceHTML = `<div style="font-size:1.1rem;font-weight:700;color:var(--success);margin-bottom:4px;">Teslimatçı çok yakınınızda!</div>
                    <div style="font-size:0.9rem;color:var(--text-muted);">${(distance * 1000).toFixed(0)} metre</div>`;
  } else if (distance < 2) {
    distanceHTML = `<div style="font-size:1.1rem;font-weight:600;color:#fbbf24;margin-bottom:4px;">Teslimatçı yaklaşıyor...</div>
                    <div style="font-size:0.9rem;color:var(--text-muted);">${distance.toFixed(1)} km</div>`;
  } else {
    distanceHTML = `<div style="font-size:1rem;font-weight:600;margin-bottom:4px;">Teslimatçı yolda</div>
                    <div style="font-size:0.9rem;color:var(--text-muted);">${distance.toFixed(1)} km</div>`;
  }
  
  distanceInfo.innerHTML = distanceHTML;
  
  checkProximityNotification(locationData, customerLat, customerLng);
}

// Start realtime tracking
function startRealtimeTracking(trackingCode) {
  const orderRef = ref(database, `orders/${trackingCode}`);
  
  onValue(orderRef, (snapshot) => {
    if (snapshot.exists()) {
      const order = { id: trackingCode, ...snapshot.val() };
      currentOrder = order;
      
      const status = statusMap[order.status] || statusMap.pending;
      document.getElementById('orderStatus').innerHTML = `
        <div class="status-badge ${status.class}">
          <span>${status.icon}</span>
          <span>${status.text}</span>
        </div>
      `;
      
      displayQueueInfo(order);
      displayTimeline(order);
      
      // Shipped durumunda harita ve konum takibi
      if (order.status === 'shipped' && order.courier) {
        const courierEmail = order.courier.email;
        const emailKey = courierEmail.replace(/[.@]/g, '_');
        
        if (!map) {
          initMap(order);
        }
        
        const locationRef = ref(database, `locations/${emailKey}`);
        onValue(locationRef, (locationSnap) => {
          if (locationSnap.exists()) {
            const locationData = locationSnap.val();
            const customerLat = order.latitude || 41.0082;
            const customerLng = order.longitude || 28.9784;
            
            updateCourierLocation(locationData, customerLat, customerLng);
          }
        });
        
        if (currentUser) {
          const userEmail = currentUser.email;
          if (userEmail === courierEmail || ADMIN_EMAILS.includes(userEmail)) {
            console.log('Kullanıcı teslimatçı - konum tracking başlatılıyor');
            setTimeout(() => {
              startLocationTracking(userEmail);
            }, 1000);
          }
        }
      } else if (order.status === 'delivered' || order.status === 'cancelled') {
        // Teslim edildi veya iptal edildi - haritayı gizle
        const mapSection = document.getElementById('mapSection');
        if (mapSection) {
          mapSection.style.display = 'none';
        }
        
        // Konum takibini durdur
        stopLocationTracking();
        
        console.log('📦 Sipariş durumu:', order.status, '- Harita gizlendi');
      }
    }
  });
}

// Start location tracking
async function startLocationTracking(email) {
  console.log('Konum takibi başlatılıyor:', email);
  
  if (!('geolocation' in navigator)) {
    console.error('Geolocation desteklenmiyor');
    alert('Tarayıcınız konum servisleri desteklemiyor!');
    return;
  }
  
  try {
    const permission = await navigator.permissions.query({ name: 'geolocation' });
    
    if (permission.state === 'denied') {
      alert('Konum izni reddedildi!\n\nTarayıcı ayarlarından konum iznini açmanız gerekiyor.');
      return;
    }
    
    console.log('Konum izin durumu:', permission.state);
  } catch (err) {
    console.warn('Permission API desteklenmiyor:', err);
  }
  
  try {
    if ('wakeLock' in navigator) {
      wakeLock = await navigator.wakeLock.request('screen');
      console.log('Wake Lock aktif');
      
      wakeLock.addEventListener('release', () => {
        console.log('Wake Lock serbest bırakıldı');
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
    (position) => {
      updateLocationToFirebase(email, position);
    },
    (error) => {
      console.error('İlk konum alınamadı:', error.message);
      handleLocationError(error);
    },
    options
  );
  
  watchId = navigator.geolocation.watchPosition(
    (position) => {
      updateLocationToFirebase(email, position);
    },
    (error) => {
      console.error('Konum hatası:', error.message);
      handleLocationError(error);
    },
    options
  );
  
  locationUpdateInterval = setInterval(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        updateLocationToFirebase(email, position);
      },
      (error) => {
        console.error('Manuel konum güncellemesi başarısız:', error.message);
      },
      options
    );
  }, 10000);
  
  console.log('Konum takibi aktif (Watch ID:', watchId, ')');
  
  if (currentUser && currentUser.email === email) {
    showNotification('Konum Paylaşımı Aktif', 'Konumunuz müşteri ile paylaşılıyor.');
  }
}

// Update location to Firebase
function updateLocationToFirebase(email, position) {
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
    console.log('Konum güncellendi:', {
      lat: locationData.latitude.toFixed(6),
      lng: locationData.longitude.toFixed(6),
      accuracy: Math.round(locationData.accuracy) + 'm'
    });
  }).catch((error) => {
    console.error('Konum kaydetme hatası:', error);
  });
}

// Handle location error
function handleLocationError(error) {
  let errorMsg = '';
  
  switch(error.code) {
    case error.PERMISSION_DENIED:
      errorMsg = 'Konum izni reddedildi!';
      break;
    case error.POSITION_UNAVAILABLE:
      errorMsg = 'Konum bilgisi alınamıyor.';
      break;
    case error.TIMEOUT:
      errorMsg = 'Konum alma zaman aşımına uğradı.';
      break;
    default:
      errorMsg = 'Bilinmeyen bir konum hatası oluştu.';
  }
  
  console.error('Konum hatası:', errorMsg);
}

// Stop location tracking
function stopLocationTracking() {
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
  }
  
  if (locationUpdateInterval) {
    clearInterval(locationUpdateInterval);
    locationUpdateInterval = null;
  }
  
  if (wakeLock) {
    wakeLock.release().then(() => {
      wakeLock = null;
    });
  }
}

// Check proximity notification
let lastProximityAlert = null;

function checkProximityNotification(locationData, customerLat, customerLng) {
  const courierLat = locationData.latitude;
  const courierLng = locationData.longitude;
  
  const distance = calculateDistance(courierLat, courierLng, customerLat, customerLng);
  
  if (distance < 0.5 && lastProximityAlert !== 'close') {
    showNotification('Teslimatçı Yakınınızda!', 'Teslimatçı 500 metre içerisinde.');
    lastProximityAlert = 'close';
  } else if (distance < 2 && lastProximityAlert === null) {
    showNotification('Teslimatçı Yaklaşıyor', `Teslimatçı ${distance.toFixed(1)} km uzaklıkta.`);
    lastProximityAlert = 'approaching';
  }
}

// Show notification
function showNotification(title, body) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, { body });
  }
}

// Request notification permission
if ('Notification' in window) {
  if (Notification.permission === 'default') {
    Notification.requestPermission().then(permission => {
      console.log('Notification permission:', permission);
    });
  }
}

// Draw route line with OSRM routing
async function drawRoute(courierLat, courierLng, customerLat, customerLng) {
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${courierLng},${courierLat};${customerLng},${customerLat}?overview=full&geometries=geojson`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
      const route = data.routes[0];
      const coordinates = route.geometry.coordinates.map(coord => [coord[1], coord[0]]);
      
      if (routeLine) {
        map.removeLayer(routeLine);
      }
      
      // Draw main route line
      routeLine = L.polyline(coordinates, {
        color: '#6366f1',
        weight: 5,
        opacity: 0.85,
        smoothFactor: 1,
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(map);
      
      // Add white border for better visibility
      L.polyline(coordinates, {
        color: '#ffffff',
        weight: 7,
        opacity: 0.5,
        smoothFactor: 1,
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(map).bringToBack();
      
      return;
    }
  } catch (error) {
    console.warn('OSRM routing failed, using straight line:', error);
  }
  
  // Fallback: straight line with dashed pattern
  if (routeLine) {
    map.removeLayer(routeLine);
  }
  
  // White border
  L.polyline([
    [courierLat, courierLng],
    [customerLat, customerLng]
  ], {
    color: '#ffffff',
    weight: 7,
    opacity: 0.5,
    lineCap: 'round'
  }).addTo(map).bringToBack();
  
  // Main line
  routeLine = L.polyline([
    [courierLat, courierLng],
    [customerLat, customerLng]
  ], {
    color: '#6366f1',
    weight: 5,
    opacity: 0.85,
    dashArray: '15, 10',
    lineCap: 'round'
  }).addTo(map);
}

// Calculate distance (Haversine formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
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

// Page visibility change
document.addEventListener('visibilitychange', async () => {
  if (document.hidden) {
    console.log('Sayfa arka planda');
  } else {
    console.log('Sayfa ön planda');
    
    // Fix map rendering when page becomes visible
    if (map) {
      setTimeout(() => {
        map.invalidateSize();
      }, 200);
    }
    
    if (currentUser && currentOrder && currentOrder.status === 'shipped' && currentOrder.courier) {
      const courierEmail = currentOrder.courier.email;
      if ((currentUser.email === courierEmail || ADMIN_EMAILS.includes(currentUser.email)) && watchId === null) {
        console.log('Tracking yeniden başlatılıyor');
        await startLocationTracking(currentUser.email);
      }
    }
  }
});

// Window resize handler
let resizeTimeout;
window.addEventListener('resize', () => {
  if (map) {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      map.invalidateSize();
    }, 200);
  }
});

// Page unload - Stop tracking immediately
window.addEventListener('beforeunload', () => {
  stopLocationTracking();
  
  // Konum verisini Firebase'den temizle
  if (currentUser) {
    const emailKey = currentUser.email.replace(/[.@]/g, '_');
    const locationRef = ref(database, `locations/${emailKey}`);
    remove(locationRef).catch(() => {});
  }
});

// Check URL params for auto-search
const urlParams = new URLSearchParams(window.location.search);
const autoTrackingCode = urlParams.get('kod');

if (autoTrackingCode) {
  document.getElementById('trackingCode').value = autoTrackingCode;
  document.getElementById('searchForm').dispatchEvent(new Event('submit'));
}
