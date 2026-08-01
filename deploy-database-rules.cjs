const admin = require('firebase-admin');
const fs = require('fs');

// Initialize Firebase Admin
const serviceAccount = require('./e-imza-4c867-firebase-adminsdk-fbsvc-fa3d0863ee.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://e-imza-4c867-default-rtdb.firebaseio.com'
});

// Read rules from database.rules.json
const rules = JSON.parse(fs.readFileSync('./database.rules.json', 'utf8'));

console.log('Deploying database rules...');
console.log(JSON.stringify(rules, null, 2));

// Deploy rules using REST API
const https = require('https');

async function deployRules() {
  try {
    // Get access token
    const token = await admin.credential.applicationDefault().getAccessToken();
    
    const options = {
      hostname: 'e-imza-4c867-default-rtdb.firebaseio.com',
      path: '/.settings/rules.json',
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token.access_token}`,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log('✅ Database rules deployed successfully!');
        } else {
          console.error('❌ Failed to deploy rules:', res.statusCode, data);
        }
        process.exit(res.statusCode === 200 ? 0 : 1);
      });
    });

    req.on('error', (error) => {
      console.error('❌ Error deploying rules:', error.message);
      process.exit(1);
    });

    req.write(JSON.stringify(rules));
    req.end();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

deployRules();
