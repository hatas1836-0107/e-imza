const admin = require('firebase-admin');
const fs = require('fs');

// Initialize Firebase Admin
const serviceAccount = require('./e-imza-4c867-firebase-adminsdk-fbsvc-fa3d0863ee.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'e-imza-4c867.appspot.com'
});

console.log('📦 Firebase Storage Rules Deploy\n');
console.log('⚠️  Storage rules manuel olarak deploy edilmelidir.');
console.log('\n📋 Yapılacaklar:');
console.log('1. Firebase Console\'a gidin: https://console.firebase.google.com/project/e-imza-4c867/storage/rules');
console.log('2. storage.rules dosyasındaki kuralları kopyalayın');
console.log('3. Console\'da "Yayınla" butonuna tıklayın\n');

const rules = fs.readFileSync('storage.rules', 'utf8');
console.log('📄 Storage Rules:\n');
console.log(rules);
console.log('\n✅ Bu kuralları Firebase Console\'a yapıştırın!');
