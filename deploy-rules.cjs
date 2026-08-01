// Firebase Database Rules'ı REST API ile deploy eden script
const https = require('https');
const fs = require('fs');

// Service account yükle
const serviceAccount = require('./e-imza-4c867-firebase-adminsdk-fbsvc-fa3d0863ee.json');

// Rules dosyasını oku
const rules = JSON.parse(fs.readFileSync('./database.rules.json', 'utf8'));

console.log('🔒 Firebase Database Rules deploy ediliyor...\n');

// Google Auth token al
async function getAccessToken() {
  const { GoogleAuth } = require('google-auth-library');
  const auth = new GoogleAuth({
    credentials: serviceAccount,
    scopes: [
      'https://www.googleapis.com/auth/firebase.database',
      'https://www.googleapis.com/auth/firebase'
    ]
  });
  const client = await auth.getClient();
  const token = await client.getAccessToken();
  return token.token;
}

async function deployRules() {
  try {
    const token = await getAccessToken();
    const projectId = serviceAccount.project_id;
    
    // Rules'u JSON string'e çevir
    const rulesJson = JSON.stringify(rules, null, 2);
    
    console.log('📋 Deploy edilecek rules:');
    console.log(rulesJson);
    console.log('\n🚀 Deploy başlatılıyor...\n');
    
    // Firebase REST API endpoint
    const options = {
      hostname: projectId + '.firebaseio.com',
      path: '/.settings/rules.json?access_token=' + token,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(rulesJson)
      }
    };
    
    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          if (res.statusCode === 200) {
            console.log('✅ Rules başarıyla deploy edildi!\n');
            console.log('📊 Sonuç:', data);
            console.log('\n🎉 İşlem tamamlandı!');
            console.log('\n📝 Yapılanlar:');
            console.log('   ✓ products: Herkes okuyabilir, adminler yazabilir');
            console.log('   ✓ orders: Herkes okuyabilir, giriş yapanlar yazabilir');
            console.log('   ✓ couriers: Sadece giriş yapanlar erişebilir');
            console.log('\n🔗 Kontrol için:');
            console.log('   https://console.firebase.google.com/project/' + projectId + '/database/rules');
            resolve();
          } else {
            console.error('❌ Deploy başarısız!');
            console.error('Status:', res.statusCode);
            console.error('Response:', data);
            reject(new Error('Rules deploy edilemedi'));
          }
        });
      });
      
      req.on('error', (error) => {
        console.error('❌ İstek hatası:', error.message);
        reject(error);
      });
      
      req.write(rulesJson);
      req.end();
    });
    
  } catch (error) {
    console.error('❌ Hata:', error.message);
    process.exit(1);
  }
}

deployRules().then(() => {
  console.log('\n✅ Script başarıyla tamamlandı!');
  process.exit(0);
}).catch((error) => {
  console.error('\n❌ Script hatası:', error.message);
  process.exit(1);
});
