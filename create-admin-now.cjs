const { initializeApp, cert } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const serviceAccount = require('./e-imza-4c867-firebase-adminsdk-fbsvc-fa3d0863ee.json');

// Firebase Admin başlat
initializeApp({
  credential: cert(serviceAccount),
  databaseURL: 'https://e-imza-4c867-default-rtdb.firebaseio.com'
});

async function createAdminUser() {
  const email = 'huseyinatas@gmail.com';
  const password = 'admin123456';
  
  try {
    // Önce kullanıcı var mı kontrol et
    try {
      const existingUser = await getAuth().getUserByEmail(email);
      console.log('✅ Kullanıcı zaten mevcut:', existingUser.email);
      console.log('UID:', existingUser.uid);
      console.log('Email verified:', existingUser.emailVerified);
      console.log('\n🔐 GİRİŞ BİLGİLERİ:');
      console.log('Email:', email);
      console.log('Password:', password);
      return;
    } catch (error) {
      if (error.code !== 'auth/user-not-found') {
        throw error;
      }
      console.log('📝 Kullanıcı bulunamadı, oluşturuluyor...');
    }
    
    // Kullanıcı yoksa oluştur
    const userRecord = await getAuth().createUser({
      email: email,
      password: password,
      emailVerified: true,
      disabled: false
    });
    
    console.log('✅ Admin kullanıcı oluşturuldu!');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('UID:', userRecord.uid);
    console.log('\n🔐 Artık bu bilgilerle giriş yapabilirsiniz!');
    
  } catch (error) {
    console.error('❌ Hata:', error.message);
  }
  
  process.exit(0);
}

createAdminUser();
