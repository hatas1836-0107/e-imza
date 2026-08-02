const admin = require('firebase-admin');
const serviceAccount = require('./e-imza-4c867-firebase-adminsdk-fbsvc-fa3d0863ee.json');
const rules = require('./database.rules.json');

// Initialize admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://e-imza-4c867-default-rtdb.firebaseio.com'
});

console.log('🚀 Firebase Rules Deployment Started...\n');
console.log('📋 Rules to deploy:');
console.log(JSON.stringify(rules, null, 2));
console.log('\n⚠️  MANUAL DEPLOYMENT REQUIRED:');
console.log('\n1. Go to: https://console.firebase.google.com/project/e-imza-4c867/database/e-imza-4c867-default-rtdb/rules');
console.log('2. Replace the rules with the content from database.rules.json');
console.log('3. Click "Publish"\n');

process.exit(0);
