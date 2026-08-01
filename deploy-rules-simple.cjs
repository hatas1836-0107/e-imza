const https = require('https');
const fs = require('fs');

// Read rules
const rules = JSON.parse(fs.readFileSync('./database.rules.json', 'utf8'));

console.log('📤 Deploying database rules...\n');

// Firebase REST API - update rules
const data = JSON.stringify(rules);

const options = {
  hostname: 'e-imza-4c867-default-rtdb.firebaseio.com',
  path: '/.settings/rules.json?auth=YOUR_DATABASE_SECRET',
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

console.log('⚠️  Database secret gerekli!');
console.log('Firebase Console > Project Settings > Service Accounts > Database Secrets\n');
console.log('Alternatif: Firebase Console\'dan manuel olarak güncelleyin:');
console.log('https://console.firebase.google.com/project/e-imza-4c867/database/e-imza-4c867-default-rtdb/rules\n');
console.log('Yapıştırılacak kurallar:\n');
console.log(JSON.stringify(rules, null, 2));

process.exit(0);
