/* ============================================================
   SİPARİŞ YÖNETİMİ - Statik Ürünler için
   ============================================================ */
(function() {
  'use strict';
  
  // Firebase config
  const firebaseConfig = {
    apiKey: "AIzaSyADykV8-GjNNoK30CUkPlqCNMjR7Ggc1M8",
    authDomain: "e-imza-4c867.firebaseapp.com",
    databaseURL: "https://e-imza-4c867-default-rtdb.firebaseio.com",
    projectId: "e-imza-4c867",
    storageBucket: "e-imza-4c867.firebasestorage.app",
    messagingSenderId: "856535109805",
    appId: "1:856535109805:web:39f6fa2e23275f7be77624"
  };
  
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  const db = firebase.database();
  
  // Order Modal Management
  window.openOrderModal = function(productData) {
    const modal = document.getElementById('orderModal');
    const productNameEl = document.getElementById('selected-product-name');
    
    document.getElementById('selectedProductName').value = productData.name;
    document.getElementById('selectedProductPrice').value = productData.price;
    
    productNameEl.textContent = productData.name;
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => modal.classList.add('active'), 10);
  };
  
  window.closeOrderModal = function() {
    const modal = document.getElementById('orderModal');
    modal.classList.remove('active');
    
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = '';
      document.getElementById('orderForm').reset();
      document.getElementById('location-status').textContent = '';
      document.getElementById('locationLatitude').value = '';
      document.getElementById('locationLongitude').value = '';
      
      // Hide and clear map
      const mapPreview = document.getElementById('mapPreview');
      const mapFrame = document.getElementById('mapFrame');
      mapPreview.style.display = 'none';
      mapFrame.src = '';
    }, 300);
  };
  
  // Close modal on overlay click
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('order-modal-overlay') || 
        e.target.classList.contains('order-modal-close')) {
      closeOrderModal();
    }
  });
  
  // Custom Select Handler
  const districts = [
    'Adalar', 'Arnavutköy', 'Ataşehir', 'Avcılar', 'Bağcılar', 'Bahçelievler', 
    'Bakırköy', 'Başakşehir', 'Bayrampaşa', 'Beşiktaş', 'Beykoz', 'Beylikdüzü',
    'Beyoğlu', 'Büyükçekmece', 'Çatalca', 'Çekmeköy', 'Esenler', 'Esenyurt',
    'Eyüpsultan', 'Fatih', 'Gaziosmanpaşa', 'Güngören', 'Kadıköy', 'Kağıthane',
    'Kartal', 'Küçükçekmece', 'Maltepe', 'Pendik', 'Sancaktepe', 'Sarıyer',
    'Silivri', 'Sultanbeyli', 'Sultangazi', 'Şile', 'Şişli', 'Tuzla',
    'Ümraniye', 'Üsküdar', 'Zeytinburnu'
  ];
  
  const deliveryTypes = [
    { value: 'courier', label: 'Aynı Gün Kurye Teslimatı' },
    { value: 'online', label: 'Bilgisayardan Online Teslim' }
  ];
  
  let currentSelectTarget = null;
  let currentSelectType = null;
  
  function openSelectModal(type, title, options, hasSearch = false) {
    const modal = document.getElementById('selectModal');
    const modalTitle = document.getElementById('selectModalTitle');
    const list = document.getElementById('selectModalList');
    const searchWrapper = document.getElementById('selectSearchWrapper');
    const searchInput = document.getElementById('selectModalSearch');
    
    currentSelectType = type;
    modalTitle.textContent = title;
    searchWrapper.style.display = hasSearch ? 'flex' : 'none';
    searchInput.value = '';
    
    renderSelectOptions(options);
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    setTimeout(() => modal.classList.add('active'), 10);
  }
  
  function renderSelectOptions(options) {
    const list = document.getElementById('selectModalList');
    const hiddenInput = document.getElementById(currentSelectType === 'district' ? 'customerDistrict' : 'deliveryType');
    const currentValue = hiddenInput.value;
    
    list.innerHTML = '';
    
    options.forEach(option => {
      const item = document.createElement('div');
      item.className = 'select-modal-item';
      
      if (typeof option === 'string') {
        item.textContent = option;
        if (option === currentValue) item.classList.add('selected');
        item.addEventListener('click', () => selectOption(option, option));
      } else {
        item.textContent = option.label;
        if (option.value === currentValue) item.classList.add('selected');
        item.addEventListener('click', () => selectOption(option.value, option.label));
      }
      
      list.appendChild(item);
    });
  }
  
  function selectOption(value, label) {
    const hiddenInput = document.getElementById(currentSelectType === 'district' ? 'customerDistrict' : 'deliveryType');
    const trigger = document.getElementById(currentSelectType === 'district' ? 'districtTrigger' : 'deliveryTrigger');
    const valueSpan = trigger.querySelector('.custom-select-value');
    
    hiddenInput.value = value;
    valueSpan.textContent = label;
    valueSpan.classList.remove('placeholder');
    
    closeSelectModal();
  }
  
  function closeSelectModal() {
    const modal = document.getElementById('selectModal');
    modal.classList.remove('active');
    
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }, 300);
  }
  
  // District Select
  document.getElementById('districtTrigger')?.addEventListener('click', () => {
    openSelectModal('district', 'İlçe Seçin', districts, true);
  });
  
  // Delivery Type Select
  document.getElementById('deliveryTrigger')?.addEventListener('click', () => {
    openSelectModal('delivery', 'Teslimat Tercihi', deliveryTypes, false);
  });
  
  // Select Modal Close
  document.querySelector('.select-modal-close')?.addEventListener('click', closeSelectModal);
  document.querySelector('.select-modal-overlay')?.addEventListener('click', closeSelectModal);
  
  // Select Modal Search
  document.getElementById('selectModalSearch')?.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredDistricts = districts.filter(d => d.toLowerCase().includes(searchTerm));
    renderSelectOptions(filteredDistricts);
  });
  
  // Get Location Button
  document.getElementById('getLocationBtn')?.addEventListener('click', function() {
    const btn = this;
    const statusEl = document.getElementById('location-status');
    const addressField = document.getElementById('customerAddress');
    const mapPreview = document.getElementById('mapPreview');
    const mapFrame = document.getElementById('mapFrame');
    
    if (!navigator.geolocation) {
      statusEl.textContent = '❌ Tarayıcınız konum hizmetlerini desteklemiyor.';
      statusEl.style.color = '#ef4444';
      return;
    }
    
    btn.disabled = true;
    btn.textContent = 'Alınıyor...';
    statusEl.textContent = '📍 Konumunuz alınıyor...';
    statusEl.style.color = '#818cf8';
    
    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        
        // Save coordinates to hidden fields
        document.getElementById('locationLatitude').value = lat;
        document.getElementById('locationLongitude').value = lon;
        
        statusEl.textContent = '✅ Konum alındı. Adres bilgisi getiriliyor...';
        
        // Show and update map with Google Maps embed - modern and clean
        mapPreview.style.display = 'block';
        mapFrame.src = `https://maps.google.com/maps?q=${lat},${lon}&hl=tr&z=16&output=embed`;
        
        // Reverse geocoding - Get address from coordinates
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1&accept-language=tr`)
          .then(res => res.json())
          .then(data => {
            if (data && data.address) {
              const addr = data.address;
              let addressText = '';
              
              if (addr.road) addressText += addr.road;
              if (addr.house_number) addressText += ' No:' + addr.house_number;
              if (addr.neighbourhood || addr.suburb) addressText += ', ' + (addr.neighbourhood || addr.suburb);
              if (addr.quarter) addressText += ', ' + addr.quarter;
              if (addr.district) addressText += ', ' + addr.district;
              
              if (addressText) {
                addressField.value = addressText.trim();
                statusEl.textContent = '✅ Konum ve adres başarıyla alındı!';
                statusEl.style.color = '#10b981';
              } else {
                statusEl.textContent = `✅ Konum alındı. Lütfen adresi manuel girin.`;
                statusEl.style.color = '#f59e0b';
              }
            } else {
              statusEl.textContent = `✅ Konum alındı. Lütfen adresi manuel girin.`;
              statusEl.style.color = '#f59e0b';
            }
          })
          .catch(error => {
            console.error('Reverse geocoding error:', error);
            statusEl.textContent = `✅ Konum kaydedildi. Lütfen adresi manuel girin.`;
            statusEl.style.color = '#f59e0b';
          })
          .finally(() => {
            btn.disabled = false;
            btn.textContent = 'Konumumu Al';
          });
      },
      error => {
        console.error('Geolocation error:', error);
        btn.disabled = false;
        btn.textContent = 'Konumumu Al';
        
        if (error.code === error.PERMISSION_DENIED) {
          statusEl.textContent = '❌ Konum izni reddedildi. Lütfen tarayıcı ayarlarından izin verin.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          statusEl.textContent = '❌ Konum bilgisi alınamadı.';
        } else {
          statusEl.textContent = '❌ Konum alınırken bir hata oluştu.';
        }
        statusEl.style.color = '#ef4444';
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  });
  
  // Order Form Submit
  document.getElementById('orderForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
      id: 'ZE-' + new Date().getFullYear() + '-' + Math.floor(Math.random() * 100000).toString().padStart(5, '0'),
      productName: document.getElementById('selectedProductName').value,
      productPrice: document.getElementById('selectedProductPrice').value,
      customerName: document.getElementById('customerName').value,
      customerPhone: document.getElementById('customerPhone').value,
      customerEmail: document.getElementById('customerEmail').value,
      district: document.getElementById('customerDistrict').value,
      address: document.getElementById('customerAddress').value,
      deliveryType: document.getElementById('deliveryType').value,
      notes: document.getElementById('orderNotes').value || '',
      latitude: document.getElementById('locationLatitude').value || '',
      longitude: document.getElementById('locationLongitude').value || '',
      location: '',
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Create location string for Firebase (with coordinates)
    if (formData.latitude && formData.longitude) {
      formData.location = formData.latitude + ',' + formData.longitude;
    }
    
    console.log('📦 Sipariş verisi hazırlandı:', formData);
    
    // Save to Firebase
    const submitBtn = this.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<div style="width:16px;height:16px;border:2px solid rgba(255,255,255,0.3);border-top-color:#fff;border-radius:50%;animation:spin 0.6s linear infinite;"></div> Kaydediliyor...';
    
    db.ref('orders/' + formData.id).set(formData)
      .then(() => {
        console.log('✅ Sipariş Firebase\'e kaydedildi:', formData.id);
        console.log('Firebase yolu:', 'orders/' + formData.id);
        
        // Create WhatsApp message (WITHOUT coordinates, only address)
        const waMessage = createWhatsAppMessage(formData);
        const waUrl = `https://wa.me/905453863407?text=${encodeURIComponent(waMessage)}`;
        
        // Show success and redirect
        alert('✅ Siparişiniz başarıyla oluşturuldu!\n\nSipariş No: ' + formData.id + '\n\nWhatsApp üzerinden iletişime geçiliyor...');
        window.open(waUrl, '_blank');
        
        closeOrderModal();
        
        // Optional: Show order tracking info
        setTimeout(() => {
          if (confirm('Siparişinizi takip etmek ister misiniz?')) {
            window.location.href = `takip.html?order=${formData.id}`;
          }
        }, 1000);
      })
      .catch(error => {
        console.error('❌ Sipariş kayıt hatası:', error);
        console.error('Hata detayı:', error.code, error.message);
        console.error('Gönderilen veri:', formData);
        alert('❌ Sipariş kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.\n\nHata: ' + error.message);
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m-6-6 6 6-6 6"/></svg> Sipariş Oluştur';
      });
  });
  
  // Create WhatsApp message (WITHOUT coordinates)
  function createWhatsAppMessage(order) {
    let msg = `*YENİ SİPARİŞ*\n\n`;
    msg += `*Sipariş No:* ${order.id}\n`;
    msg += `*Ürün:* ${order.productName}\n`;
    
    // Sadece productPrice varsa ve geçerli bir değerse fiyatı ekle
    if (order.productPrice && order.productPrice !== 'null' && order.productPrice !== 'undefined' && order.productPrice !== '') {
      msg += `*Fiyat:* ${parseFloat(order.productPrice).toLocaleString('tr-TR')} ₺ +KDV\n`;
    }
    
    msg += `\n=== MÜŞTERİ BİLGİLERİ ===\n`;
    msg += `*Ad Soyad:* ${order.customerName}\n`;
    msg += `*Telefon:* ${order.customerPhone}\n`;
    msg += `*E-posta:* ${order.customerEmail}\n`;
    msg += `*İlçe:* ${order.district}, İstanbul\n`;
    msg += `*Adres:* ${order.address}\n\n`;
    msg += `*Teslimat:* ${order.deliveryType === 'courier' ? 'Aynı Gün Kurye' : 'Online Teslim'}\n`;
    
    if (order.notes) {
      msg += `\n*Not:* ${order.notes}\n`;
    }
    
    msg += `\n---\n`;
    msg += `_Tarih: ${new Date(order.createdAt).toLocaleString('tr-TR')}_`;
    
    // NOT: Koordinatlar WhatsApp'a GİTMİYOR, sadece Firebase'de kalıyor
    
    return msg;
  }
  
})();
