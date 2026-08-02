const admin = require('firebase-admin');
const fs = require('fs');

// Service account key
const serviceAccount = require('./e-imza-4c867-firebase-adminsdk-fbsvc-fa3d0863ee.json');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://e-imza-4c867-default-rtdb.firebaseio.com'
});

console.log('🚀 Firebase Admin SDK initialized');
console.log('📤 Deploying database rules...\n');

// Read rules
const rules = JSON.parse(fs.readFileSync('./database.rules.json', 'utf8'));

// Firebase Admin SDK doesn't support deploying rules directly
// We need to use Firebase REST API with a token

async function deployRules() {
  try {
    // Get access token
    const token = await admin.credential.applicationDefault().getAccessToken();
    
    console.log('✅ Access token acquired');
    console.log('⚠️  Firebase Admin SDK doesn\'t support rule deployment directly.');
    console.log('\n📋 Please deploy manually via Firebase Console:');
    console.log('https://console.firebase.google.com/project/e-imza-4c867/database/e-imza-4c867-default-rtdb/rules\n');
    console.log('Or use Firebase CLI: firebase deploy --only database\n');
    console.log('Updated rules are in: database.rules.json\n');
    
    // Show the rules that need to be deployed
    console.log('Kurallar güncellendi. Lütfen Firebase Console\'dan manuel deploy edin.');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

deployRules();
