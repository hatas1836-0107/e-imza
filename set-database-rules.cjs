// Firebase Realtime Database Rules'ı ayarlayan script
const { initializeApp, cert } = require('firebase-admin/app');
const { getDatabase } = require('firebase-admin/database');

const serviceAccount = require('./e-imza-4c867-firebase-adminsdk-fbsvc-fa3d0863ee.json');

initializeApp({
  credential: cert(serviceAccount),
  databaseURL: "https://e-imza-4c867-default-rtdb.firebaseio.com"
});

const db = getDatabase();

// Güvenlik kuralları - Admin kullanıcıların yazmasına izin ver
const rules = {
  "rules": {
    "products": {
      ".read": true,
      ".write": "auth != null && (auth.token.email == 'huseyinatas@gmail.com' || auth.token.email == 'hüseyinataş@gmail.com' || auth.token.email == 'admin@zirveeimza.com')",
      ".indexOn": ["status", "price"]
    },
    "orders": {
      ".read": true,
      ".write": "auth != null",
      "$orderId": {
        ".indexOn": ["status", "createdAt", "customerPhone"]
      }
    },
    "couriers": {
      ".read": "auth != null",
      ".write": "auth != null",
      "$courierId": {
        "location": {
          ".read": true
        },
        ".indexOn": ["email"]
      }
    }
  }
};

async function setRules() {
  console.log('🔒 Database Rules ayarlanıyor...\n');
  
  try {
    // Not: Admin SDK ile rules direkt set edilemez
    // Rules'ı Firebase Console'dan manuel olarak ayarlamanız gerekiyor
    
    console.log('📋 Aşağıdaki Rules\'ı kopyalayın:\n');
    console.log('════════════════════════════════════════════════════════');
    console.log(JSON.stringify(rules, null, 2));
    console.log('════════════════════════════════════════════════════════\n');
    
    console.log('📍 Nereden ayarlanır:');
    console.log('   1. Firebase Console > Realtime Database');
    console.log('   2. "Rules" sekmesine gidin');
    console.log('   3. Yukarıdaki kuralları yapıştırın');
    console.log('   4. "Publish" tıklayın\n');
    
    console.log('🔗 Direkt Link:');
    console.log('   https://console.firebase.google.com/project/e-imza-4c867/database/e-imza-4c867-default-rtdb/rules\n');
    
    // Test için örnek veri oluştur
    console.log('✅ Veriler kontrolü yapılıyor...\n');
    
    const productsRef = db.ref('products');
    const productsSnapshot = await productsRef.once('value');
    const productsData = productsSnapshot.val();
    
    if (productsData) {
      console.log(`✅ ${Object.keys(productsData).length} ürün mevcut`);
    } else {
      console.log('⚠️  Ürün bulunamadı, firebase-init-data.cjs çalıştırın');
    }
    
    const ordersRef = db.ref('orders');
    const ordersSnapshot = await ordersRef.once('value');
    const ordersData = ordersSnapshot.val();
    
    if (ordersData) {
      console.log(`✅ ${Object.keys(ordersData).length} sipariş mevcut`);
    } else {
      console.log('⚠️  Sipariş bulunamadı');
    }
    
    const couriersRef = db.ref('couriers');
    const couriersSnapshot = await couriersRef.once('value');
    const couriersData = couriersSnapshot.val();
    
    if (couriersData) {
      console.log(`✅ ${Object.keys(couriersData).length} kurye mevcut\n`);
    } else {
      console.log('⚠️  Kurye bulunamadı\n');
    }
    
    console.log('🎉 Database hazır!\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ HATA:', error.message);
    process.exit(1);
  }
}

setRules();
