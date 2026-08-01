// Admin ve kurye kullanıcılarını oluşturan script
const { initializeApp, cert } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');

const serviceAccount = require('./e-imza-4c867-firebase-adminsdk-fbsvc-fa3d0863ee.json');

initializeApp({
  credential: cert(serviceAccount),
  databaseURL: "https://e-imza-4c867-default-rtdb.firebaseio.com"
});

const auth = getAuth();

async function createUsers() {
  console.log('🔐 Kullanıcılar oluşturuluyor...\n');

  try {
    // Admin kullanıcı
    console.log('👨‍💼 Admin kullanıcısı oluşturuluyor...');
    try {
      const adminUser = await auth.createUser({
        email: 'hüseyinataş@gmail.com',
        password: 'hüseyinataş1234',
        displayName: 'Hüseyin Ataş',
        emailVerified: true
      });
      console.log('✅ Admin oluşturuldu!');
      console.log('   Email: hüseyinataş@gmail.com');
      console.log('   Şifre: hüseyinataş1234');
      console.log('   UID:', adminUser.uid, '\n');
    } catch (error) {
      if (error.code === 'auth/email-already-exists') {
        console.log('ℹ️  Admin kullanıcı zaten mevcut\n');
      } else {
        throw error;
      }
    }

    // Kurye kullanıcı
    console.log('🚗 Kurye kullanıcısı oluşturuluyor...');
    try {
      const courierUser = await auth.createUser({
        email: 'kurye@zirveeimza.com',
        password: 'kurye123',
        displayName: 'Test Kurye',
        emailVerified: true
      });
      console.log('✅ Kurye oluşturuldu!');
      console.log('   Email: kurye@zirveeimza.com');
      console.log('   Şifre: kurye123');
      console.log('   UID:', courierUser.uid, '\n');
    } catch (error) {
      if (error.code === 'auth/email-already-exists') {
        console.log('ℹ️  Kurye kullanıcı zaten mevcut\n');
      } else {
        throw error;
      }
    }

    console.log('═══════════════════════════════════════════════');
    console.log('🎉 KULLANICILAR HAZIR!');
    console.log('═══════════════════════════════════════════════\n');

    console.log('🚀 ŞİMDİ DENEYEBİLİRSİNİZ:\n');
    
    console.log('1️⃣  ADMIN PANELİ:');
    console.log('   URL: http://localhost:8000/site/admin/index.html');
    console.log('   Email: hüseyinataş@gmail.com');
    console.log('   Şifre: hüseyinataş1234\n');

    console.log('2️⃣  KURYE PANELİ:');
    console.log('   URL: http://localhost:8000/site/admin/kurye.html');
    console.log('   Email: kurye@zirveeimza.com');
    console.log('   Şifre: kurye123\n');

    console.log('3️⃣  SİPARİŞ TAKİP:');
    console.log('   URL: http://localhost:8000/site/takip.html?kod=ZE-2024-1001\n');

    console.log('📝 NOT:');
    console.log('   - Authentication etkinleştirilmeli (Email/Password + Google)');
    console.log('   - Database Rules ayarlanmalı');
    console.log('   - Storage Rules ayarlanmalı\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ HATA:', error.message);
    process.exit(1);
  }
}

createUsers();
