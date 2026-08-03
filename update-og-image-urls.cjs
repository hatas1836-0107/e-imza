const fs = require('fs');
const path = require('path');

// Vercel'de host edilen OG image (site/og-image.png)
const VERCEL_URL = 'https://e-imza.vercel.app/og-image.png';

// Firebase Storage URL (opsiyonel - admin panelinden yüklenirse)
const FIREBASE_STORAGE_BASE = 'https://firebasestorage.googleapis.com/v0/b/e-imza-4c867.appspot.com/o/';
const OG_IMAGE_PATH = 'og-images%2Fog-image.png';
const FIREBASE_URL = `${FIREBASE_STORAGE_BASE}${OG_IMAGE_PATH}?alt=media`;

// Kullanılacak URL - Vercel'i kullan (dosya zaten orada)
const FINAL_URL = VERCEL_URL;

const htmlFiles = [
  'site/index.html',
  'site/hakkimizda.html',
  'site/hizmetlerimiz.html',
  'site/fiyatlandirma.html',
  'site/bolgeler.html',
  'site/iletisim.html',
  'site/takip.html',
  'site/sss.html',
  'site/gizlilik-politikasi.html',
  'site/kullanim-kosullari.html'
];

console.log('🔄 OG Image URL\'leri güncelleniyor...\n');
console.log(`📸 Yeni URL: ${FINAL_URL}\n`);

htmlFiles.forEach(file => {
  if (!fs.existsSync(file)) {
    console.log(`⚠️  ${file} bulunamadı, atlanıyor...`);
    return;
  }

  let content = fs.readFileSync(file, 'utf8');
  let updated = false;

  // OG image URL'sini güncelle
  const ogImageRegex = /<meta property="og:image" content="([^"]+)">/g;
  if (ogImageRegex.test(content)) {
    content = content.replace(ogImageRegex, `<meta property="og:image" content="${FINAL_URL}">`);
    updated = true;
  }

  // Secure URL'yi güncelle
  const ogSecureRegex = /<meta property="og:image:secure_url" content="([^"]+)">/g;
  if (ogSecureRegex.test(content)) {
    content = content.replace(ogSecureRegex, `<meta property="og:image:secure_url" content="${FINAL_URL}">`);
    updated = true;
  }

  // Twitter image URL'sini güncelle
  const twitterImageRegex = /<meta name="twitter:image" content="([^"]+)">/g;
  if (twitterImageRegex.test(content)) {
    content = content.replace(twitterImageRegex, `<meta name="twitter:image" content="${FINAL_URL}">`);
    updated = true;
  }

  if (updated) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`✅ ${file} güncellendi`);
  } else {
    console.log(`ℹ️  ${file} - değişiklik yapılmadı`);
  }
});

console.log('\n✨ Tüm dosyalar işlendi!');
console.log('\n📋 Sonraki adımlar:');
console.log('1. Firebase Storage\'a og-image.png yükleyin (Admin Panel kullanarak)');
console.log('2. Veya manuel olarak Firebase Console\'dan yükleyin');
console.log('3. Sosyal medyada test edin (Facebook Debugger, Twitter Card Validator)');
