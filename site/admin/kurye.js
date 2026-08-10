import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getDatabase, ref, get, update, onValue, set } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';
import { firebaseConfig } from './firebase-config.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

let currentUser = null;
let watchId = null;
let wakeLock = null;
let locationUpdateInterval = null;
let isTracking = false;
let myActiveOrders = [];

const ADMIN_EMAILS = [
  'huseyinatas@gmail.com',
  'hüseyinataş@gmail.com',
  '2sthillman@gmail.com',
  'admin@zirveeimza.com'
];

// Auth state listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
    showDashboard();
    loadOrders();
  } else {
    currentUser = null;
    showLogin();
  }
});

// Login
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
  } catch (error) {
    console.error('Login error:', error);
    let errorMessage = 'Giriş başarısız!';
    
    if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
      errorMessage = 'E-posta veya şifre hatalı!';
    } else if (error.code === 'auth/invalid-credential') {
      errorMessage = 'Geçersiz e-posta veya şifre!';
    }
    
    messageDiv.innerHTML = `<div class="alert alert-error">${errorMessage}</div>`;
    btnText.textContent = 'Giriş Yap';
  }
});

// Logout
window.logout = async () => {
  if (confirm('Çıkış yapmak istediğinize emin misiniz?')) {
    stopLocationTracking();
    await signOut(auth);
  }
};

function showLogin() {
  document.getElementById('loginScreen').style.display = 'flex';
  document.getElementById('dashboard').classList.remove('active');
}

function showDashboard() {
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('dashboard').classList.add('active');
  document.getElementById('userEmail').textContent = currentUser.email;
}

// "Yola Çıkıyorum" button with hold-to-activate
const startBtn = document.getElementById('startDeliveryBtn');
const progress = startBtn?.querySelector('.progress');
const btnText = startBtn?.querySelector('.text');

let holdTimer = null;
let holdProgress = 0;

startBtn?.addEventListener('mousedown', startHolding);
startBtn?.addEventListener('touchstart', startHolding);
startBtn?.addEventListener('mouseup', stopHolding);
startBtn?.addEventListener('mouseleave', stopHolding);
startBtn?.addEventListener('touchend', stopHolding);
startBtn?.addEventListener('touchcancel', stopHolding);

function startHolding(e) {
  e.preventDefault();
  
  if (isTracking) {
    // Already tracking, stop it
    stopLocationTracking();
    return;
  }
  
  holdProgress = 0;
  holdTimer = setInterval(() => {
    holdProgress += 2;
    progress.style.width = holdProgress + '%';
    
    if (holdProgress >= 100) {
      clearInterval(holdTimer);
      activateTracking();
    }
  }, 20); // 2% every 20ms = 1 second total
}

function stopHolding() {
  if (holdTimer) {
    clearInterval(holdTimer);
    holdTimer = null;
  }
  
  if (!isTracking) {
    progress.style.width = '0%';
  }
}

async function activateTracking() {
  if (myActiveOrders.length === 0) {
    alert('Lütfen önce bir sipariş alın!');
    progress.style.width = '0%';
    return;
  }
  
  isTracking = true;
  startBtn.classList.add('tracking');
  btnText.textContent = 'Konum Paylaşılıyor (Durdurmak için bas)';
  progress.style.width = '100%';
  
  updateLocationUI();
  await startLocationTracking(currentUser.email);
}

function updateLocationUI() {
  const statusDiv = document.getElementById('locationStatus');
  const dot = statusDiv.querySelector('.location-dot');
  const text = statusDiv.querySelector('span');
  
  if (isTracking) {
    statusDiv.classList.add('active');
    dot.classList.add('active');
    text.textContent = 'Konum Paylaşımı Aktif - Konumunuz müşteri ile paylaşılıyor';
  } else {
    statusDiv.classList.remove('active');
    dot.classList.remove('active');
    text.textContent = 'Konum Paylaşımı Kapalı';
  }
}

// Start location tracking
async function startLocationTracking(email) {
  console.log('Konum takibi başlatılıyor:', email);
  
  if (!('geolocation' in navigator)) {
    alert('Tarayıcınız konum servisleri desteklemiyor!');
    return;
  }
  
  try {
    const permission = await navigator.permissions.query({ name: 'geolocation' });
    
    if (permission.state === 'denied') {
      alert('Konum izni reddedildi!\n\nTarayıcı ayarlarından konum iznini açmanız gerekiyor.');
      isTracking = false;
      updateLocationUI();
      return;
    }
  } catch (err) {
    console.warn('Permission API desteklenmiyor');
  }
  
  // Wake Lock
  try {
    if ('wakeLock' in navigator) {
      wakeLock = await navigator.wakeLock.request('screen');
      console.log('Wake Lock aktif - arka planda bile konum alınacak');
      
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
  
  // İlk konum
  navigator.geolocation.getCurrentPosition(
    (position) => updateLocationToFirebase(email, position),
    (error) => console.error('İlk konum alınamadı:', error.message),
    options
  );
  
  // Sürekli izleme
  watchId = navigator.geolocation.watchPosition(
    (position) => updateLocationToFirebase(email, position),
    (error) => console.error('Konum hatası:', error.message),
    options
  );
  
  // Manuel güncelleme (backup)
  locationUpdateInterval = setInterval(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => updateLocationToFirebase(email, position),
      (error) => console.error('Manuel güncelleme başarısız:', error.message),
      options
    );
  }, 5000); // 5 saniyede bir
  
  console.log('Konum takibi aktif');
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
    console.log('✓ Konum güncellendi:', 
      Math.round(locationData.latitude * 10000) / 10000,
      Math.round(locationData.longitude * 10000) / 10000
    );
  }).catch((error) => {
    console.error('Konum kaydetme hatası:', error);
  });
}

// Stop location tracking
function stopLocationTracking() {
  isTracking = false;
  startBtn.classList.remove('tracking');
  btnText.textContent = 'Yola Çıkıyorum (Basılı Tut)';
  progress.style.width = '0%';
  
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
  
  updateLocationUI();
  console.log('Konum takibi durduruldu');
}

// Load orders
function loadOrders() {
  const ordersRef = ref(database, 'orders');
  
  onValue(ordersRef, (snapshot) => {
    const ordersData = snapshot.val() || {};
    const ordersArray = Object.entries(ordersData).map(([id, data]) => ({ id, ...data }));
    
    // Bekleyen siparişler (courier atanmamış veya hazır)
    const pendingOrders = ordersArray.filter(o => 
      ['confirmed', 'preparing', 'ready'].includes(o.status) && !o.courier
    );
    
    // Benim siparişlerim
    myActiveOrders = ordersArray.filter(o => 
      o.courier && o.courier.email === currentUser.email && o.status === 'shipped'
    );
    
    renderOrders(pendingOrders);
    renderMyOrders(myActiveOrders);
  });
}

// Render pending orders
function renderOrders(orders) {
  const container = document.getElementById('ordersContainer');
  
  if (orders.length === 0) {
    container.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:40px;">Şu anda bekleyen sipariş yok.</p>';
    return;
  }
  
  let html = '';
  orders.forEach(order => {
    html += `
      <div class="order-card">
        <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:12px;">
          <div>
            <strong style="font-size:1.1rem;color:var(--primary);">${order.id}</strong>
            <span class="badge-new" style="margin-left:8px;">YENİ</span>
          </div>
          <span style="font-size:0.85rem;color:var(--text-muted);">${formatDate(order.createdAt)}</span>
        </div>
        <div style="margin-bottom:12px;">
          <strong style="font-size:0.95rem;">${order.customerName}</strong><br>
          <span style="color:var(--text-muted);font-size:0.9rem;">${order.customerPhone}</span>
        </div>
        <div style="margin-bottom:12px;font-size:0.9rem;">
          <strong>Ürün:</strong> ${order.productName}
        </div>
        <div style="margin-bottom:16px;color:var(--text-muted);font-size:0.9rem;">
          <strong>Adres:</strong> ${order.address}
        </div>
        <button class="btn btn-primary btn-block" onclick="takeOrder('${order.id}')">
          Siparişi Al
        </button>
      </div>
    `;
  });
  
  container.innerHTML = html;
}

// Render my orders
function renderMyOrders(orders) {
  const section = document.getElementById('myOrders');
  const container = document.getElementById('myOrdersContainer');
  
  if (orders.length === 0) {
    section.style.display = 'none';
    return;
  }
  
  section.style.display = 'block';
  
  let html = '';
  orders.forEach(order => {
    html += `
      <div class="order-card active">
        <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:12px;">
          <strong style="font-size:1.1rem;color:var(--success);">${order.id}</strong>
          <span style="color:var(--success);font-weight:600;">Teslimat Yapılıyor</span>
        </div>
        <div style="margin-bottom:12px;">
          <strong style="font-size:0.95rem;">${order.customerName}</strong><br>
          <span style="color:var(--text-muted);font-size:0.9rem;">${order.customerPhone}</span>
        </div>
        <div style="margin-bottom:12px;color:var(--text-muted);font-size:0.9rem;">
          ${order.address}
        </div>
        <button class="btn btn-success btn-block" onclick="completeDelivery('${order.id}')">
          Teslim Edildi
        </button>
      </div>
    `;
  });
  
  container.innerHTML = html;
}

// Take order
window.takeOrder = async (trackingCode) => {
  if (!confirm('Bu siparişi almak istediğinize emin misiniz?')) {
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
    
    const courierName = ADMIN_EMAILS.includes(currentUser.email) ? 'Admin' : currentUser.displayName || currentUser.email;
    
    history.push({
      status: 'Yola Çıktı',
      timestamp: new Date().toISOString(),
      note: `${courierName} tarafından sipariş alındı ve teslimat başlatıldı.`
    });
    
    await update(orderRef, {
      status: 'shipped',
      courier: {
        email: currentUser.email,
        name: courierName,
        phone: currentUser.phoneNumber || '-'
      },
      queuePosition: 1,
      updatedAt: new Date().toISOString(),
      history
    });
    
    alert('Sipariş üzerinize alındı!\n\n"Yola Çıkıyorum" butonuna basılı tutarak konum paylaşımını başlatın.');
  } catch (error) {
    console.error('Take order error:', error);
    alert('Hata: ' + error.message);
  }
};

// Complete delivery
window.completeDelivery = async (trackingCode) => {
  if (!confirm('Teslimatı tamamlamak istediğinize emin misiniz?')) {
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
      note: 'Sipariş başarıyla teslim edildi.'
    });
    
    await update(orderRef, {
      status: 'delivered',
      updatedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      history
    });
    
    alert('Teslimat tamamlandı!');
    
    // Eğer başka aktif sipariş yoksa tracking'i durdur
    setTimeout(() => {
      if (myActiveOrders.length <= 1) {
        stopLocationTracking();
      }
    }, 1000);
    
  } catch (error) {
    console.error('Complete delivery error:', error);
    alert('Hata: ' + error.message);
  }
};

// Format date
function formatDate(timestamp) {
  if (!timestamp) return '-';
  const date = new Date(timestamp);
  return date.toLocaleString('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Page visibility change
document.addEventListener('visibilitychange', async () => {
  if (document.hidden) {
    console.log('Sayfa arka planda - konum tracking devam ediyor');
  } else {
    console.log('Sayfa ön planda');
    
    if (isTracking && watchId === null) {
      console.log('Tracking yeniden başlatılıyor');
      await startLocationTracking(currentUser.email);
    }
  }
});

// Page unload
window.addEventListener('beforeunload', () => {
  if (isTracking && myActiveOrders.length > 0) {
    // Don't stop tracking if there are active orders
    return;
  }
  stopLocationTracking();
});
