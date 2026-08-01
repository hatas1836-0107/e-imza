// Firebase Database Rules'ı programatik olarak güncelleyen script
const https = require('https');
const serviceAccount = require('./e-imza-4c867-firebase-adminsdk-fbsvc-fa3d0863ee.json');

const rules = {
  "rules": {
    "products": {
      ".read": true,
      ".write": "auth != null && (auth.token.email == 'huseyinatas@gmail.com' || auth.token.email == 'hüseyinataş@gmail.com' || auth.token.email == 'admin@zirveeimza.com')",
      ".indexOn": ["status", "price", "createdAt"]
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

// Get OAuth token
async function getAccessToken() {
  const { GoogleAuth } = require('google-auth-library');
  const auth = new GoogleAuth({
    credentials: serviceAccount,
    scopes: ['https://www.googleapis.com/auth/firebase.database']
  });
  const client = await auth.getClient();
  const token = await client.getAccessToken();
  return token.token;
}

async function updateRules() {
  try {
    console.log('🔒 Firebase Database Rules güncelleniyor...\n');
    
    const token = await getAccessToken();
    const projectId = serviceAccount.project_id;
    
    const rulesJson = JSON.stringify(rules, null, 2);
    
    const options = {
      hostname: projectId + '.firebaseio.com',
      path: '/.settings/rules.json?access_token=' + token,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': rulesJson.length
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
            console.log('✅ Rules başarıyla güncellendi!\n');
            console.log('📋 Yeni Rules:');
            console.log(rulesJson);
            resolve();
          } else {
            console.error('❌ Hata:', res.statusCode);
            console.error(data);
            reject(new Error('Rules güncellenemedi'));
          }
        });
      });
      
      req.on('error', (error) => {
        console.error('❌ İstek hatası:', error);
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

updateRules().then(() => {
  console.log('\n🎉 Tamamlandı!');
  process.exit(0);
});
