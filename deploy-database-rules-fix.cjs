#!/usr/bin/env node

const https = require('https');
const fs = require('fs');

// Read service account
const serviceAccount = JSON.parse(fs.readFileSync('./e-imza-4c867-firebase-adminsdk-fbsvc-fa3d0863ee.json', 'utf8'));

// Read database rules
const rules = JSON.parse(fs.readFileSync('./database.rules.json', 'utf8'));

// Get access token
function getAccessToken() {
  return new Promise((resolve, reject) => {
    const jwt = require('jsonwebtoken');
    
    const now = Math.floor(Date.now() / 1000);
    const claim = {
      iss: serviceAccount.client_email,
      sub: serviceAccount.client_email,
      aud: 'https://oauth2.googleapis.com/token',
      iat: now,
      exp: now + 3600,
      scope: 'https://www.googleapis.com/auth/firebase.database'
    };

    const token = jwt.sign(claim, serviceAccount.private_key, { algorithm: 'RS256' });

    const postData = `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${token}`;

    const options = {
      hostname: 'oauth2.googleapis.com',
      path: '/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data).access_token);
        } else {
          reject(new Error(`Token fetch failed: ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

// Deploy rules
async function deployRules(accessToken) {
  return new Promise((resolve, reject) => {
    const rulesJson = JSON.stringify(rules);

    const options = {
      hostname: 'e-imza-4c867-default-rtdb.firebaseio.com',
      path: '/.settings/rules.json?access_token=' + accessToken,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(rulesJson)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log('✅ Database rules deployed successfully!');
          console.log('Response:', data);
          resolve(data);
        } else {
          console.error('❌ Deploy failed with status:', res.statusCode);
          console.error('Response:', data);
          reject(new Error(`Deploy failed: ${data}`));
        }
      });
    });

    req.on('error', (err) => {
      console.error('❌ Request error:', err);
      reject(err);
    });

    req.write(rulesJson);
    req.end();
  });
}

// Main
(async () => {
  try {
    console.log('🔑 Getting access token...');
    const token = await getAccessToken();
    console.log('✅ Token obtained');

    console.log('📤 Deploying database rules...');
    await deployRules(token);
    console.log('✅ All done!');
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
})();
