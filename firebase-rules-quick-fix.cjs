const https = require('https');
const serviceAccount = require('./e-imza-4c867-firebase-adminsdk-fbsvc-fa3d0863ee.json');

async function updateRules() {
  const { GoogleAuth } = require('google-auth-library');
  
  try {
    console.log('🔧 Firebase Rules güncelleniyor...\n');
    
    // Token al
    const auth = new GoogleAuth({
      credentials: serviceAccount,
      scopes: ['https://www.googleapis.com/auth/firebase.database']
    });
    
    const client = await auth.getClient();
    const token = await client.getAccessToken();
    
    const rules = {
      "rules": {
        "products": {
          ".read": true,
          ".write": "auth != null",
          ".indexOn": ["status", "price", "createdAt"]
        },
        "orders": {
          ".read": true,
          ".write": true,
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
    
    const rulesStr = JSON.stringify(rules);
    
    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'e-imza-4c867-default-rtdb.firebaseio.com',
        path: '/.settings/rules.json?access_token=' + token.token,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(rulesStr)
        }
      };
      
      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          if (res.statusCode === 200) {
            console.log('✅ Rules başarıyla güncellendi!\n');
            console.log('📋 Yeni Rules:');
            console.log(JSON.stringify(rules, null, 2));
            console.log('\n✅ orders artık herkese açık, müşteriler sipariş oluşturabilir!');
            resolve();
          } else {
            console.error('❌ HTTP', res.statusCode);
            console.error(data);
            reject(new Error('Güncelleme başarısız'));
          }
        });
      });
      
      req.on('error', reject);
      req.write(rulesStr);
      req.end();
    });
    
  } catch (error) {
    console.error('❌ Hata:', error.message);
    throw error;
  }
}

updateRules()
  .then(() => {
    console.log('\n🎉 Tamamlandı! Şimdi formu tekrar deneyin.');
    process.exit(0);
  })
  .catch(err => {
    console.error('\n❌ Başarısız:', err.message);
    console.log('\n📝 Manuel olarak güncelleme yapın:');
    console.log('   1. https://console.firebase.google.com/project/e-imza-4c867/database/e-imza-4c867-default-rtdb/rules');
    console.log('   2. FIREBASE_CONSOLE_RULES.txt içeriğini yapıştırın');
    console.log('   3. Publish tıklayın');
    process.exit(1);
  });
