// Firebase Realtime Database'e örnek veriler ekleyen script
const { initializeApp, cert } = require('firebase-admin/app');
const { getDatabase } = require('firebase-admin/database');

// Service account dosyasını yükle
const serviceAccount = require('./e-imza-4c867-firebase-adminsdk-fbsvc-fa3d0863ee.json');

// Firebase Admin SDK'yı başlat
initializeApp({
  credential: cert(serviceAccount),
  databaseURL: "https://e-imza-4c867-default-rtdb.firebaseio.com"
});

const db = getDatabase();

async function initializeData() {
  console.log('🔥 Firebase Realtime Database başlatılıyor...\n');

  try {
    // 1. Örnek Ürünler
    console.log('📦 Ürünler ekleniyor...');
    const productsRef = db.ref('products');
    
    const products = {
      'product_1': {
        name: 'Bireysel E-İmza - 1 Yıl',
        price: 1250,
        duration: '1 yıl',
        description: 'Akıllı kart + okuyucu dahil, e-Devlet uyumlu',
        features: [
          'Akıllı kart + okuyucu dahil',
          'Online kurulum desteği',
          'E-Devlet uyumlu',
          'Telefon desteği',
          'Aynı gün teslimat'
        ],
        status: 'active',
        imageUrl: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      'product_2': {
        name: 'Bireysel E-İmza - 2 Yıl',
        price: 1850,
        duration: '2 yıl',
        description: 'En çok tercih edilen paket',
        features: [
          'Akıllı kart + okuyucu dahil',
          'Aynı gün kurye önceliği',
          'Yerinde kurulum ve test',
          'Ücretsiz telefon desteği',
          '2 yıl geçerli'
        ],
        status: 'active',
        imageUrl: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      'product_3': {
        name: 'Bireysel E-İmza - 3 Yıl',
        price: 2450,
        duration: '3 yıl',
        description: 'Uzun vadeli kullanım için ekonomik',
        features: [
          'Akıllı kart + okuyucu dahil',
          'Aynı gün kurye önceliği',
          'Yenileme hatırlatma servisi',
          '3 yıl geçerli',
          'En ekonomik paket'
        ],
        status: 'active',
        imageUrl: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      'product_4': {
        name: 'Kurumsal E-İmza',
        price: 3500,
        duration: '1 yıl',
        description: 'Şirketler için özel e-imza çözümü',
        features: [
          'Toplu kullanım desteği',
          'E-Fatura entegrasyonu',
          '7/24 kurumsal destek',
          'Yerinde kurulum',
          'Özel eğitim'
        ],
        status: 'active',
        imageUrl: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    };

    await productsRef.set(products);
    console.log('✅ 4 ürün eklendi!\n');

    // 2. Örnek Sipariş
    console.log('🚚 Örnek sipariş ekleniyor...');
    const ordersRef = db.ref('orders');
    
    const sampleOrder = {
      'ZE-2024-1001': {
        id: 'ZE-2024-1001',
        customerName: 'Test Müşteri',
        customerPhone: '0532 123 45 67',
        customerEmail: 'test@example.com',
        productName: 'Bireysel E-İmza - 1 Yıl',
        address: 'Ataşehir, İstanbul',
        latitude: 40.9829,
        longitude: 29.1244,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        history: [
          {
            status: 'Sipariş Alındı',
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            note: 'Sipariş sistemimize kaydedildi.'
          },
          {
            status: 'Sipariş Onaylandı',
            timestamp: new Date().toISOString(),
            note: 'Siparişiniz onaylandı, hazırlık aşamasına geçildi.'
          }
        ]
      }
    };

    await ordersRef.set(sampleOrder);
    console.log('✅ Örnek sipariş eklendi! (Takip kodu: ZE-2024-1001)\n');

    // 3. Örnek Kurye
    console.log('👤 Örnek kurye ekleniyor...');
    const couriersRef = db.ref('couriers');
    
    const sampleCourier = {
      'kurye_zirveeimza_com': {
        name: 'Test Kurye',
        email: 'kurye@zirveeimza.com',
        phone: '0532 999 88 77',
        createdAt: new Date().toISOString(),
        activeOrders: {}
      }
    };

    await couriersRef.set(sampleCourier);
    console.log('✅ Örnek kurye eklendi!\n');

    console.log('═══════════════════════════════════════════════');
    console.log('🎉 TÜM VERİLER BAŞARIYLA EKLENDİ!');
    console.log('═══════════════════════════════════════════════\n');

    console.log('📋 ÖZET:');
    console.log('  ✅ 4 Ürün');
    console.log('  ✅ 1 Örnek Sipariş (ZE-2024-1001)');
    console.log('  ✅ 1 Örnek Kurye\n');

    console.log('🔑 GİRİŞ BİLGİLERİ:');
    console.log('  Admin: hüseyinataş@gmail.com / hüseyinataş1234');
    console.log('  Kurye: kurye@zirveeimza.com / kurye123 (Firebase Auth\'ta oluşturulmalı)\n');

    console.log('🌐 URL\'LER:');
    console.log('  Ana Site: http://localhost:8000/site/index.html');
    console.log('  Admin Panel: http://localhost:8000/site/admin/index.html');
    console.log('  Kurye Panel: http://localhost:8000/site/admin/kurye.html');
    console.log('  Takip: http://localhost:8000/site/takip.html?kod=ZE-2024-1001\n');

    console.log('✨ Firebase Console\'da kontrol edin:');
    console.log('   https://console.firebase.google.com/project/e-imza-4c867/database\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ HATA:', error);
    process.exit(1);
  }
}

// Scripti çalıştır
initializeData();
