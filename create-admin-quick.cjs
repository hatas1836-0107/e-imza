const { initializeApp, cert } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');

const serviceAccount = require('./e-imza-4c867-firebase-adminsdk-fbsvc-fa3d0863ee.json');

initializeApp({
  credential: cert(serviceAccount)
});

async function createAdmin() {
  try {
    console.log('🔐 Admin kullanıcı oluşturuluyor...\n');
    
    const email = 'huseyinatas@gmail.com';
    const password = 'Admin123456';
    
    try {
      // Önce var mı kontrol et
      const user = await getAuth().getUserByEmail(email);
      console.log('✅ Admin kullanıcı zaten var!');
      console.log('📧 Email:', user.email);
      console.log('🆔 UID:', user.uid);
      console.log('\n🔑 Şifre:', password);
      console.log('\n💡 Bu bilgilerle giriş yapabilirsiniz.');
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        // Yoksa oluştur
        const userRecord = await getAuth().createUser({
          email: email,
          password: password,
          emailVerified: true,
          disabled: false
        });
        
        console.log('✅ Admin kullanıcı oluşturuldu!');
        console.log('📧 Email:', userRecord.email);
        console.log('🆔 UID:', userRecord.uid);
        console.log('\n🔑 Giriş Bilgileri:');
        console.log('   Email:', email);
        console.log('   Şifre:', password);
        console.log('\n💡 Bu bilgilerle admin panele giriş yapabilirsiniz!');
      } else {
        throw error;
      }
    }
    
    // Alternatif admin de oluştur
    const altEmail = 'admin@zirveeimza.com';
    const altPassword = 'ZirveAdmin2026';
    
    try {
      await getAuth().getUserByEmail(altEmail);
      console.log('\n✅ Alternatif admin zaten var:', altEmail);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        await getAuth().createUser({
          email: altEmail,
          password: altPassword,
          emailVerified: true,
          disabled: false
        });
        console.log('\n✅ Alternatif admin oluşturuldu!');
        console.log('📧 Email:', altEmail);
        console.log('🔑 Şifre:', altPassword);
      }
    }
    
    console.log('\n🎉 Hazır! Artık admin panele giriş yapabilirsiniz.');
    console.log('🔗 http://localhost:8000/site/admin/');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Hata:', error.message);
    process.exit(1);
  }
}

createAdmin();
